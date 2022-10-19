import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { supabaseClient } from "~/utils/supabaseClient.ts";
import { Routes } from "~/utils/routes.ts";
import { getAccessToken } from "~/utils/auth.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const auth = await supabaseClient.auth.api.getUser(getAccessToken(req));

  if (auth.error) {
    return Response.redirect(Routes.login);
  }

  ctx.state["user"] = auth.user;

  return await ctx.next();
}
