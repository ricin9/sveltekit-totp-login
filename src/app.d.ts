// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
    interface Locals {
      user: { user_id: number; name: string; email: string } | null;
    }
  }
}

export {};
