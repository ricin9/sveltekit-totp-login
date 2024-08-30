import { redirect } from "@sveltejs/kit";

export async function load({ parent, locals }) {
  await parent();

  if (!locals.user) {
    redirect(302, "/login");
  }
}
