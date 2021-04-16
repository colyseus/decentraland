import { Room, Client } from "colyseus";
import { Block, MyRoomState } from "./MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    // create first block 
    this.state.blocks.push(
      new Block().assign({
        x: 8,
        y: 1,
        z: 8,
      })
    );

    this.onMessage("touch-block", (client: Client, index: number) => {
      console.log("received touch-block:", index);
      this.createBlock(index + 1);
    });

  }

  createBlock(atIndex: number) {
    if (atIndex !== this.state.blocks.length) {
      console.log("can't create more than one block at same location.");
      return;
    }

    const previousBlock = this.state.blocks[atIndex - 1];
    const block = new Block();

    // set next block position
    const maxDistance = 4;
    block.assign({
      x: this._applyBoundaries(previousBlock.x - maxDistance + (Math.random() * (maxDistance * 2))), // 1-15
      y: 1 + atIndex,
      z: this._applyBoundaries(previousBlock.z - maxDistance + (Math.random() * (maxDistance * 2))), // 1-15
    });

    this.state.blocks.push(block);
  }

  _applyBoundaries(coord: number) {
    // ensure value is between 1 and 15.
    return Math.max(1, Math.min(15, coord));
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
  }

}
