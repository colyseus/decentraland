/// --- Set up a system ---
import * as utils from '@dcl/ecs-scene-utils'
import { connect } from "./connection"

connect("my_room").then((room) => {
  log("Connected!");

  function onTouchBlock(i: number) {
    // send block index to Colyseus server
    room.send("touch-block", i);
  }

  /// --- Spawner function ---
  function spawnCube(x: number, y: number, z: number, i: number) {
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
      new Vector3(1, 2.75, 1), // size
      new Vector3(0, 1, 0) // position
    );

    // Button triggers
    cube.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          onTouchBlock(i);
        },
      })
    )

    // add the entity to the engine
    engine.addEntity(cube)

    return cube
  }

  //
  // -- Colyseus / Schema callbacks -- 
  // https://docs.colyseus.io/state/schema/
  //
  room.state.blocks.onAdd = function(block: any, i: number) {
    spawnCube(block.x, block.y, block.z, i);
  };

}).catch((err) => {
  error(err);

});
