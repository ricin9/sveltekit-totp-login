import { turso } from "$lib/server/db.js";
import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  const session = cookies.get("session");

  if (session) {
    await turso.execute({
      sql: "delete from sessions where session = ?",
      args: [session],
    });
    cookies.set("session", "", { path: "/", expires: new Date(0) });
  }
  redirect(302, "/");
}
