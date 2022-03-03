import { Client } from "colyseus.js";
import { MyProtoMessage } from "@myapp/shared";

const client = new Client("ws://localhost:2567");
client.joinOrCreate("my_room").then(room => {
  console.log(room);

  room.onMessage(0, (bytes) => {
    // decode incoming protobuf bytes
    const message = MyProtoMessage.decode(bytes);
    console.log("received (type `0`):", message);

    // write html
    document.body.innerHTML = document.body.innerHTML
      + "<p><strong>received (type `0`):</strong> " + JSON.stringify(message) + "</p>";
  });

  room.onMessage("bytes", (bytes) => {
    // decode incoming protobuf bytes
    const message = MyProtoMessage.decode(bytes);
    console.log("received (type 'bytes'):", message);

    // write html
    document.body.innerHTML = document.body.innerHTML
      + "<p><strong>received (type 'bytes'):</strong> " + JSON.stringify(message) + "</p>";
  });

  // create protobuf message
  const message = new MyProtoMessage({
    bool: false,
    int32: 500,
    str: "Client sent hello!"
  });

  // send encoded protobuf bytes (as "bytes")
  room.sendBytes("bytes", MyProtoMessage.encode(message).finish());

  // send encoded protobuf bytes (as 0)
  room.sendBytes(0, MyProtoMessage.encode(message).finish());

}).catch(e => {
  console.error(e)
});