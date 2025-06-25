import { 
  RoomServiceClient, 
  CreateOptions,
  AccessToken,
  AccessTokenOptions,
  VideoGrant
} from "livekit-server-sdk";

const API_KEY = "API5ljeBKttnc6";
const API_SECRET = "oztN3LA7zZKmPjEceDn90jl5PCGP5FnwMJ9E";

function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
  const at = new AccessToken(API_KEY, API_SECRET, userInfo);
  at.ttl = '5m';
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);
  return at.toJwt();
}

const roomService = new RoomServiceClient(
  "http://79.72.13.76:7880/",
  "API5ljeBKttnc6",
  "oztN3LA7zZKmPjEceDn90jl5PCGP5FnwMJ9E"
);

const roomName = "test-room";
const createOptions: CreateOptions = {
  name: roomName,
  maxParticipants: 3,
  metadata: "Test room for LiveKit",
  emptyTimeout: 60, // in seconds Calculate Empty timeout based on when
  // was the meeting started and the proposed endtime
};
const accessTokenOptions: AccessTokenOptions = {
  identity: "admin-id-admin",
  ttl: 3600, // Token valid for 1 hour
  name: "Admin Name",
  metadata: "{role: 'admin'}",
  attributes: {
    role: "admin",
    customAttribute: "value"
  }
};

const videoGrant: VideoGrant = {
  room: "test-room",
  roomJoin: true,
  canPublish: true,
  canPublishData: true,
  canSubscribe: true,
};

async function main() {
  const room = await roomService.createRoom(createOptions);
  // console.log(`Room created: ${JSON.stringify(room)}`);
  const rooms = await roomService.listRooms([roomName]);
  const token = new AccessToken(
    "API5ljeBKttnc6",
    "oztN3LA7zZKmPjEceDn90jl5PCGP5FnwMJ9E",
    accessTokenOptions
  );
  token.addGrant(videoGrant);
  const jwt = await token.toJwt();
  console.log(`Access Token: ${jwt}`);
  console.log(`Room details: ${JSON.stringify(rooms)}`);
}

main().catch(console.error);
