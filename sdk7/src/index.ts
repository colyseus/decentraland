import "./polyfill";
import { Client, Room } from "colyseus.js";

const client = new Client("https://127.0.0.1:2567");

export function main() {
  console.log("MAIN!");

  client.joinOrCreate("my_room").then((room: Room) => {
    console.log("Joined", room)
  }).catch((e) => {
    console.log("ERROR", e);
  });
}
