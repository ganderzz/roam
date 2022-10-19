import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "~/components/Layout.tsx";
import { supabaseClient } from "~/utils/supabaseClient.ts";
import { Routes } from "~/utils/routes.ts";
import { getAccessToken } from "~/utils/auth.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx) {
    const token = getAccessToken(req);
    const response = await supabaseClient.auth.api.getUser(token);
    if (response.user) {
      return Response.redirect(Routes.baseUrl);
    }

    return ctx.render();
  },
  async POST(req: Request, ctx) {
    const data = await req.formData();

    const email = data.get("email");
    const password = data.get("password");

    if (!email && !password) {
      return ctx.render({ error: `Email or password are missing.` });
    }

    const loginResponse = await supabaseClient.auth.signIn({ email: email as string, password: password as string });

    if (loginResponse.error) {
      return ctx.render({ error: loginResponse.error });
    }

    return new Response("", {
      status: 302,
      headers: {
        Location: Routes.protected.dashboard,
        "Set-Cookie": `access_token=${loginResponse.session?.access_token}${
          loginResponse.session?.expires_at && `; Expires=${loginResponse.session?.expires_at}`
        }; Secure; HttpOnly`,
      },
    });
  },
};

export default function Login(props: PageProps) {
  const error = props.data?.error;

  return (
    <Layout>
      <section class="mx-auto mt-8">
        {error && (
          <div class="mb-8 border-1 border-red-300 p-4 bg-red-200 text-red-900 rounded-md">{error.message}</div>
        )}

        <form class="flex flex-col gap-4" method="post">
          <div class="w-full flex justify-between items-center">
            <label htmlFor="email" class="w-1/4">
              Email:
            </label>

            <input autoFocus name="email" type="text" id="email" class="text-black w-3/4 px-4 py-2 rounded-md" />
          </div>

          <div class="w-full flex justify-between items-center">
            <label htmlFor="password" class="w-1/4">
              Password:
            </label>
            <input type="password" name="password" id="password" class="text-black w-3/4 px-4 py-2 rounded-md" />
          </div>

          <div class="w-full flex justify-end items-center mt-2">
            <a href={Routes.signUp} class="mr-8">
              Sign Up
            </a>
            <button type="submit" class="bg-blue-800 py-4 px-4 rounded-md font-bold hover:bg-blue-900 transition-all">
              Login
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
