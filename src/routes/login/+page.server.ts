import { turso } from "$lib/server/db.js";
import { generateRandomString } from "$lib/server/util";
import { verifyTOTP } from "@oslojs/otp";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async function ({ request, cookies }) {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const totp = formData.get("totp") as string;

    if (!email) {
      return fail(400, { error: "please enter a valid email" });
    }

    if (!totp) {
      return fail(400, { error: "please enter a valid totp code" });
    }

    const { rows } = await turso.execute({
      sql: `SELECT user_id, totp_key FROM users
      JOIN totp_keys USING (user_id) 
      WHERE email = ?`,
      args: [email.toLocaleLowerCase()],
    });

    if (rows.length === 0) {
      return fail(404, { error: "no user found with this email" });
    }

    const { user_id, totp_key } = rows[0];

    const totpIsValid = verifyTOTP(
      new Uint8Array(Buffer.from(totp_key as string)),
      30,
      6,
      totp
    );

    if (!totpIsValid) {
      return fail(403, { error: "invalid or expired totp code, try again" });
    }

    // user is authenticated, generate session n stuff

    const session = generateRandomString();
    await insertSession({ user_id: user_id as number, session }),
      cookies.set("session", session, {
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
      });

    redirect(301, "/private");
  },
};

type InsertSessionInput = {
  user_id: number;
  session: string;
};

async function insertSession(input: InsertSessionInput) {
  await turso.execute({
    sql: "insert into sessions (user_id, session, expires_at) values (?, ?, datetime('now', '+30 days'))",
    args: [input.user_id, input.session],
  });
}
