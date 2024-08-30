import { turso } from "$lib/server/db.js";
import { LibsqlError, type ResultSet } from "@libsql/client";
import { error, fail } from "@sveltejs/kit";
import { nanoid } from "nanoid";
import { createTOTPKeyURI } from "@oslojs/otp";

export const actions = {
  default: async function ({ request }) {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    if (!email || !name) {
      fail(400, { error: "please enter a valid email and name" });
    }

    let result: ResultSet;

    try {
      result = await turso.execute({
        sql: "insert into users (email, name) values (?, ?) returning user_id",
        args: [email.toLocaleLowerCase(), name],
      });
    } catch (err) {
      if (err instanceof LibsqlError && err.code === "SQLITE_CONSTRAINT") {
        return fail(409, { error: "email already exists" });
      }
      return fail(500, { error: "unknown error, my bad" });
    }

    const { user_id } = result.rows[0];
    const totpSecretKey = nanoid(60); // i should use crypto.randomBytes but node:crypto doesn't work on cf and this is for demonstration purposes so ..

    try {
      await turso.execute({
        sql: "insert into totp_keys (totp_key, user_id) values (?, ?)",
        args: [totpSecretKey, user_id],
      });
    } catch (err) {
      console.log(err);
      error(500, "unknown TOTP key generation error has occured");
    }

    const totpUri = createTOTPKeyURI(
      "Miloudi's TOTP factory",
      email,
      new Uint8Array(Buffer.from(totpSecretKey)),
      30,
      6
    );

    return { totpUri };
  },
};
