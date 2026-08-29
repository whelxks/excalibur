import { activities } from "@/lib/mockData";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { StreamChat } from "stream-chat";

async function main() {
  const serverClient = StreamChat.getInstance(
    process.env.EXPO_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
  );

  const hosts = activities
    .flatMap((a) => a.hosts)
    .map((h) => ({
      id: h.id,
      name: h.name,
      image: h.image,
    }));

  await serverClient.upsertUsers(hosts);
  console.log(`Seeded ${hosts.length} host users`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
