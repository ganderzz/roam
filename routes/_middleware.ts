import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getAccessToken } from "~/utils/auth.ts";

export const handler = [
  async function (_req: Request, ctx: MiddlewareHandlerContext) {
    try {
      const result = await ctx.next();

      return result;
    } catch (error) {
      const response = new Response(JSON.stringify({ error }), { status: 500 });

      // @TODO: Add real logging
      console.log(response);

      return response;
    }
  },

  async function (req: Request, ctx: MiddlewareHandlerContext) {
    // Quick hack to get SupabaseClient to find the cookie for auth!
    (req as any).cookies = req.headers.get("cookie");

    return await ctx.next();
  },
];
