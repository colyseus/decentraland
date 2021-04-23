import * as utils from '@dcl/ecs-scene-utils';
import * as ui from '@dcl/ui-scene-utils';
import { connect } from "./connection";
import { uiCanvas, updateLeaderboard } from './leaderboard';
import { floor } from './scene';
import { ambienceSound, clickSound, fallSound, finishSound1, finishSound2, newLeaderSound, countdownRestartSound, playLoop, playOnce, playOnceRandom } from './sound';

// play ambient music
playLoop(ambienceSound, 0.4);

updateLeaderboard(["- Nobody -"]);


//
// Connect to Colyseus server! 
// Set up the scene after connection has been established.
//
connect("my_room").then((room) => {
    log("Connected!");

    // create UI countdown
    const countdown = new ui.UICounter(0, -30, 30, Color4.White(), 50, false);

    let lastBlockTouched: number = 0;
    function onTouchBlock(y: number) {
        // send block index and player position to Colyseus server
        lastBlockTouched = y;
        room.send("touch-block", y);
    }

    function refreshLeaderboard() {
        // get all players names sorted by their ranking 
        const allPlayers = Array.from(room.state.players.values()).sort((a: any, b: any) => {
            return b.ranking - a.ranking;
        }).map((player: any, i: number) => `${i + 1}. ${player.name} - ${player.ranking}`);

        updateLeaderboard(allPlayers);
    }

    // The "floor" object was originally named "entity" from the Decentraland Builder.
    // I exported it from the "./scene" file to be able to attach custom behaviour.
    const floorTriggerShape = new utils.TriggerBoxShape(new Vector3(16, 2, 16), new Vector3(0, 3, 0));
    floor.addComponent(
        new utils.TriggerComponent(floorTriggerShape, {
            onCameraEnter: () => {
                if (lastBlockTouched > 2 && lastBlockTouched < 20) {
                    room.send("fall", Camera.instance.position);
                }
            },
        })
    )

    /// --- Spawner function ---
    function spawnCube(x: number, y: number, z: number) {
        // create the entity
        const cube = new Entity()

        // add a transform to the entity
        cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

        // add a shape to the entity
        const box = new BoxShape();
        box.withCollisions = true;
        cube.addComponent(box);

        // set random color/material for the cube
        const cubeMaterial = new Material()
        cubeMaterial.albedoColor = Color3.Random();
        cubeMaterial.metallic = Math.random();
        cubeMaterial.roughness = Math.random();
        cube.addComponent(cubeMaterial);

        // trigger configurations (Took from https://github.com/decentraland-scenes/switchboard-platforms/)
        const triggerShape = new utils.TriggerBoxShape(
            new Vector3(0.7, 1, 0.7), // size
            new Vector3(0, 2, 0) // position
        );

        // Button triggers
        cube.addComponent(
            new utils.TriggerComponent(triggerShape, {
                onCameraEnter: () => {
                    onTouchBlock(y);
                },
            })
        )

        // scale block from 0 to 1
        cube.addComponent(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 0.2));

        // play click sound
        const clickAudioSource = new AudioSource(clickSound);
        cube.addComponent(clickAudioSource);
        clickAudioSource.playOnce();

        // add the entity to the engine
        engine.addEntity(cube)

        return cube;
    }

    //
    // -- Colyseus / Schema callbacks -- 
    // https://docs.colyseus.io/state/schema/
    //
    let allBoxes: Entity[] = [];
    let lastBox: Entity;
    room.state.blocks.onAdd = (block: any, i: number) => {
        lastBox = spawnCube(block.x, block.y, block.z);
        allBoxes.push(lastBox);
    };

    let highestRanking = 0;
    let highestPlayer: any = undefined;
    room.state.players.onAdd = (player: any, sessionId: string) => {
        player.listen("ranking", (newRanking: number) => {
            if (newRanking > highestRanking) {
                if (player !== highestPlayer) {
                    highestPlayer = player;

                    playOnce(newLeaderSound);
                }
                highestRanking = newRanking;
            }

            refreshLeaderboard();
        });
    }

    // when a player leaves, remove it from the leaderboard.
    room.state.players.onRemove = () => {
        refreshLeaderboard();
    }

    room.state.listen("countdown", (num: number) => {
        countdown.set(num);
    })

    room.onMessage("start", () => {
        // remove all previous boxes
        allBoxes.forEach((box) => engine.removeEntity(box));
        allBoxes = [];

        lastBlockTouched = 0;
        highestRanking = 0;
        highestPlayer = undefined;

        countdown.show();
    });

    room.onMessage("fall", (atPosition) => {
        playOnce(fallSound, 1, new Vector3(atPosition.x, atPosition.y, atPosition.z));
    })

    room.onMessage("finished", () => {
        ui.displayAnnouncement(`${highestPlayer.name} wins!`, 8, Color4.White(), 60);
        playOnceRandom([finishSound1, finishSound2]);
        countdown.hide();
    });

    room.onMessage("restart", () => {
        playOnce(countdownRestartSound);
    });

    room.onLeave((code) => {
        log("onLeave, code =>", code);
    });

}).catch((err) => {
    error(err);

});

