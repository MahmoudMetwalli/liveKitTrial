import { AccessToken, RoomServiceClient, ParticipantInfo, ParticipantInfo_State, Room, RoomCompositeOptions } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  "https://lk-latest.dragonteam.dev/",
  "APIcPrnfn94XvvV",
  "dEMb77ZH8xc0jnQMJopDvydYVdIHj3LLB5ysn1hE2PD"
);

// roomService.createRoom({
//   name: "test-room",
//   emptyTimeout: 0,
//   maxParticipants: 20,
//   metadata: "Test room for LiveKit trial",
// }).then((room) => {
//   console.log("Room created successfully:", room);
// }
// ).catch((error) => {
//   console.error("Error creating room:", error);
// }
// );

// roomService.createRoom({
//   name: "test-room-2",
//   emptyTimeout: 0,
//   maxParticipants: 10,
//   metadata: "Test room for LiveKit trial",
// }).then((room) => {
//   console.log("Room created successfully:", room);
// }
// ).catch((error) => {
//   console.error("Error creating room:", error);
// }
// );
roomService.createRoom({
  name: "test-room-3",
  emptyTimeout: 0,
  maxParticipants: 20,
  metadata: "Test room for LiveKit trial",
}).then((room) => {
  console.log("Room created successfully:", room);
}
).catch((error) => {
  console.error("Error creating room:", error);
}
);
// for (let i = 0; i < 10; i++) {
//   roomService.createRoom({
//     name: `test-room-${i}`,
//     emptyTimeout: 0,
//     maxParticipants: 20,
//     metadata: "Test room for LiveKit trial",
//   }).then((room) => {
//     console.log(`Room ${i} created successfully:`, room);
//   }).catch((error) => {
//     console.error(`Error creating room ${i}:`, error);
//   });
// }


roomService.listRooms().then((rooms) => {
  console.log("List of rooms:", rooms);
}
).catch((error) => {
  console.error("Error listing rooms:", error);
}
);
