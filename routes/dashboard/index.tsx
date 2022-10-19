import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import Layout from "~/components/Layout.tsx";
import { supabaseClient } from "~/utils/supabaseClient.ts";
import { getAccessToken } from "~/utils/auth.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { user, error } = await supabaseClient.auth.api.getUser(getAccessToken(req));
    return await ctx.render({ user, error });
  },
};

export default function Dashboard(props: PageProps) {
  const user = props.data?.user;

  return (
    <Layout user={user}>
      <aside class="flex w-1/12 bg-gray-700 p-4">
        <ul>
          <li>Posts</li>
          <li>Settings</li>
        </ul>
      </aside>

      <section class="flex w-11/12 p-4">Do Styff</section>
    </Layout>
  );
}
