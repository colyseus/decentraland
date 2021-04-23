
export const ambienceSound = new AudioClip("sounds/ambience.mp3");
export const clickSound = new AudioClip("sounds/click.mp3");
export const newLeaderSound = new AudioClip("sounds/new-leader.mp3");
export const fallSound = new AudioClip("sounds/roblox-death-sound.mp3");
export const finishSound1 = new AudioClip("sounds/wow.mp3");
export const finishSound2 = new AudioClip("sounds/deja-vu.mp3");
export const countdownRestartSound = new AudioClip("sounds/countdown-restart.mp3");

function play(clip: AudioClip, volume: number, position = Camera.instance.position) {
    const entity = new Entity();
    const audio = new AudioSource(clip);
    audio.volume = volume;

    entity.addComponent(audio);
    entity.addComponent(new Transform({ position }));
    engine.addEntity(entity);

    return { audio, entity };
}

export function playLoop(clip: AudioClip, volume: number = 1) {
    const { audio, entity } = play(clip, volume);
    audio.playing = true;
    audio.loop = true;
}

export function playOnce(clip: AudioClip, volume: number = 1, position?: Vector3) {
    const { audio, entity } = play(clip, volume, position);

    // FIXME: this is probably not the best practice to remove an entity once the sound has finished...
    class SoundRemoverWhenFinished implements ISystem {
        totalTime: number = 0;
        update(dt: number) {
            if (this.totalTime > 7) { // play up to 7 seconds
                engine.removeEntity(entity);
                engine.removeSystem(removeSoundWhenFinished);
            }
            this.totalTime += dt;
            // ...
        }
    }
    const removeSoundWhenFinished = new SoundRemoverWhenFinished();

    audio.loop = false;
    audio.playOnce();

    engine.addSystem(removeSoundWhenFinished);
}

export function playOnceRandom(clips: AudioClip[], volume: number = 1) {
    // select a random sound to play
    playOnce(clips[Math.floor(Math.random() * clips.length)]);
}