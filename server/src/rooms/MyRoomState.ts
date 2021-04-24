import { Schema, Context, ArraySchema, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") name: string;
  @type("number") ranking: number;
}

export class Block extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
}

export class MyRoomState extends Schema {
  @type("number") countdown: number;
  @type([Block]) blocks = new ArraySchema<Block>();
  @type({ map: Player }) players = new MapSchema<Player>();
}
