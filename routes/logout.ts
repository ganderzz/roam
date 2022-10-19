import { Handlers, HandlerContext } from "$fresh/server.ts";
import { Routes } from "~/utils/routes.ts";
import { supabaseClient } from "~/utils/supabaseClient.ts";
import { getAccessToken } from "~/utils/auth.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const token = getAccessToken(req);
    const { error } = await supabaseClient.auth.api.signOut(token);

    if (error) {
      return new Response(error.message, {
        status: error.status,
      });
    }

    ctx.state["access_token"] = undefined;

    return new Response("", {
      status: 302,
      headers: {
        Location: Routes.baseUrl,
        "Set-Cookie": `access_token=${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });
  },
};
