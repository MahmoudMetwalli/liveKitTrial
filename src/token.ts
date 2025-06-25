import { AccessToken } from "livekit-server-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({ origin: '*' })); // Adjust origin for production
app.use(express.json());

async function generateClientToken(roomName: any, participantName: any) {
  try {
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: participantName, ttl: "1h" }
    );
    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });
    return await token.toJwt();
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
}

app.post("/token", async (req: any, res: any) => {
  try {
    const { roomName, participantName } = req.body;
    if (!roomName || !participantName) {
      return res.status(400).json({ error: "roomName and participantName required" });
    }
    const token = await generateClientToken(roomName, participantName);
    console.log("Generated token for:", participantName);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(3001, () => {
  console.log("Token server running on http://localhost:3001");
});
