import { turso } from "$lib/server/db";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async function ({ event, resolve }) {
  const session = event.cookies.get("session");

  if (!session) {
    event.locals.user = null;
    return resolve(event);
  }

  const { rows } = await turso.execute({
    sql: `select user_id, name, email
       from sessions
       join users USING (user_id)
       where session = ? and expires_at > datetime('now')`,

    args: [session],
  });

  if (rows.length === 0) {
    event.locals.user = null;
    event.cookies.set("session", "", { path: "/", expires: new Date(0) });
    return resolve(event);
  }

  event.locals.user = rows[0] as any; // refactor user type into external file

  return await resolve(event);
};
