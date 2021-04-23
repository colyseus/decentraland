import * as utils from '@dcl/ecs-scene-utils';

//
// Most of the code on this file have been generated through Decentraland Builder.
// https://builder.decentraland.org/
//

export const _scene = new Entity('_scene')

const viewSourceBlock = new Entity('multicolorPattern')
engine.addEntity(viewSourceBlock)
viewSourceBlock.setParent(_scene)
const transform12 = new Transform({
  position: new Vector3(8, 0.7, 1.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
viewSourceBlock.addComponentOrReplace(transform12)
const gltfShape7 = new GLTFShape("models/multicolor_pattern.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
viewSourceBlock.addComponentOrReplace(gltfShape7)
viewSourceBlock.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)));
viewSourceBlock.addComponent(
    new OnPointerDown(
        () => openExternalURL("https://github.com/colyseus/decentraland"),
        { hoverText: "View source-code" }
    )
);

engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const largeRoundBrickGrassBed = new Entity('largeRoundBrickGrassBed')
engine.addEntity(largeRoundBrickGrassBed)
largeRoundBrickGrassBed.setParent(_scene)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
largeRoundBrickGrassBed.addComponentOrReplace(transform2)
const gltfShape = new GLTFShape("models/GrassPatchLarge_01/GrassPatchLarge_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
largeRoundBrickGrassBed.addComponentOrReplace(gltfShape)

export const floor = new Entity('entity')
engine.addEntity(floor)
floor.setParent(_scene)
const gltfShape2 = new GLTFShape("models/FloorBaseGrass_02/FloorBaseGrass_02.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
floor.addComponentOrReplace(gltfShape2)
const transform3 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
floor.addComponentOrReplace(transform3)

const dandelion = new Entity('dandelion')
engine.addEntity(dandelion)
dandelion.setParent(_scene)
const transform4 = new Transform({
  position: new Vector3(8, 0, 5.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dandelion.addComponentOrReplace(transform4)
const gltfShape3 = new GLTFShape("models/Grass_04/Grass_04.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
dandelion.addComponentOrReplace(gltfShape3)

const birdSNestFern = new Entity('birdSNestFern')
engine.addEntity(birdSNestFern)
birdSNestFern.setParent(_scene)
const transform5 = new Transform({
  position: new Vector3(5.5, 0, 8.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
birdSNestFern.addComponentOrReplace(transform5)
const gltfShape4 = new GLTFShape("models/Plant_01/Plant_01.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
birdSNestFern.addComponentOrReplace(gltfShape4)

const triSpikeGrass = new Entity('triSpikeGrass')
engine.addEntity(triSpikeGrass)
triSpikeGrass.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(6, 0, 9.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
triSpikeGrass.addComponentOrReplace(transform6)
const gltfShape5 = new GLTFShape("models/Grass_05/Grass05.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
triSpikeGrass.addComponentOrReplace(gltfShape5)

const triSpikeGrass2 = new Entity('triSpikeGrass2')
engine.addEntity(triSpikeGrass2)
triSpikeGrass2.setParent(_scene)
const transform7 = new Transform({
  position: new Vector3(10.5, 0, 8.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
triSpikeGrass2.addComponentOrReplace(transform7)
triSpikeGrass2.addComponentOrReplace(gltfShape5)

const grassRow = new Entity('grassRow')
engine.addEntity(grassRow)
grassRow.setParent(_scene)
const transform8 = new Transform({
  position: new Vector3(0.5, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 3)
})
grassRow.addComponentOrReplace(transform8)
const gltfShape6 = new GLTFShape("models/BushPatch_01/BushPatch_01.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
grassRow.addComponentOrReplace(gltfShape6)

const grassRow2 = new Entity('grassRow2')
engine.addEntity(grassRow2)
grassRow2.setParent(_scene)
const transform9 = new Transform({
  position: new Vector3(15.5, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 3)
})
grassRow2.addComponentOrReplace(transform9)
grassRow2.addComponentOrReplace(gltfShape6)

const grassRow3 = new Entity('grassRow3')
engine.addEntity(grassRow3)
grassRow3.setParent(_scene)
const transform10 = new Transform({
  position: new Vector3(8, 0, 15.5),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1.0000004768371582, 1, 3.000001907348633)
})
grassRow3.addComponentOrReplace(transform10)
grassRow3.addComponentOrReplace(gltfShape6)

const grassRow4 = new Entity('grassRow4')
engine.addEntity(grassRow4)
grassRow4.setParent(_scene)
const transform11 = new Transform({
  position: new Vector3(8, 0, 0.5),
  rotation: new Quaternion(1.7572238474294335e-15, -0.7071068286895752, 8.429369557916289e-8, -0.7071068286895752),
  scale: new Vector3(1.0000007152557373, 1, 3.0000038146972656)
})
grassRow4.addComponentOrReplace(transform11)
grassRow4.addComponentOrReplace(gltfShape6)