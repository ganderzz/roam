import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import Layout from "~/components/Layout.tsx";
import { supabaseClient } from "~/utils/supabaseClient.ts";
import { getAccessToken } from "~/utils/auth.ts";
import { Routes } from "~/utils/routes.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { user, error } = await supabaseClient.auth.api.getUser(getAccessToken(req));

    if (user) {
      return Response.redirect(Routes.protected.dashboard);
    }

    return await ctx.render({ user, error });
  },
};

export default function Home(props: PageProps) {
  const user = props.data?.user;

  return <Layout user={user}>Welcome to Roam!</Layout>;
}
