import { Schema, Context, ArraySchema, type } from "@colyseus/schema";

export class Block extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
}

export class MyRoomState extends Schema {
  @type([Block]) blocks = new ArraySchema<Block>();
}
