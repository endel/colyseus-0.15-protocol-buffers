import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

import { MyProtoMessage } from "@myapp/shared";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage(0, (client, bytes) => {
      console.log("received (type `0`):", MyProtoMessage.decode(bytes));
    });

    this.onMessage("bytes", (client, bytes) => {
      console.log("received (type 'bytes'):", MyProtoMessage.decode(bytes));
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    // build protobuf message
    const message = new MyProtoMessage();
    message.bool = true;
    message.int32 = 200;
    message.str = "Hello world!";

    // send encoded protobuf bytes (as "bytes")
    client.sendBytes("bytes", MyProtoMessage.encode(message).finish());

    // send encoded protobuf bytes (as 0)
    client.sendBytes(0, MyProtoMessage.encode(message).finish());
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
