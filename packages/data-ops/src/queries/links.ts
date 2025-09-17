import { getDb } from "@/db/database";
import { links } from "@/drizzle-out/schema";
import { CreateLinkSchemaType } from "@/zod/links";
import { nanoid } from "nanoid";

export async function createLink(
  data: CreateLinkSchemaType & { accountId: string }
) {
  const { accountId, name } = data;
  // DB global setter to reduce boilerplate
  const db = getDb();
  // Used for URL ID
  const linkId = nanoid(10);
  await db.insert(links).values({
    linkId,
    accountId,
    name,
    destinations: JSON.stringify(data.destinations),
  });
  return linkId;
}
