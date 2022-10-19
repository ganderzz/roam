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
      return ctx.render();
    }

    const firstName = data.get("fname");
    const lastName = data.get("lname");

    const response = await supabaseClient.auth.signUp(
      { email: email as string, password: password as string },
      { data: { firstName, lastName } }
    );

    if (response.error) {
      return ctx.render({ error: response.error });
    }

    return Response.redirect(Routes.baseUrl);
  },
};

export default function SignUp(props: PageProps) {
  const error = props.data?.error;

  return (
    <Layout>
      {error && <div class="mb-8 border-1 border-red-300 p-4 bg-red-200 text-red-900 rounded-md">{error.message}</div>}

      <form class="flex flex-col gap-4" method="post">
        <div class="w-full flex justify-between">
          <label htmlFor="email" class="w-1/4">
            Email:
          </label>

          <input autoFocus type="text" id="email" class="text-black w-3/4 px-4 py-2 rounded-md" name="email" />
        </div>

        <div class="w-full flex justify-between">
          <label htmlFor="password" class="w-1/4">
            Password:
          </label>
          <input type="password" id="password" class="text-black w-3/4 px-4 py-2 rounded-md" name="password" />
        </div>

        <div class="w-full flex justify-between">
          <label htmlFor="fname" class="w-1/4">
            First Name:
          </label>
          <input type="text" id="fname" class="text-black w-3/4 px-4 py-2 rounded-md" name="password" />
        </div>

        <div class="w-full flex justify-between">
          <label htmlFor="lname" class="w-1/4">
            Last Name:
          </label>
          <input type="text" id="lname" class="text-black w-3/4 px-4 py-2 rounded-md" name="password" />
        </div>

        <div class="w-full flex justify-end items-center mt-2">
          <a href="/login" class="mr-4">
            Login
          </a>
          <button type="submit" class="bg-blue-800 py-4 px-4 rounded-md font-bold hover:bg-blue-900 transition-all">
            Sign Up
          </button>
        </div>
      </form>
    </Layout>
  );
}
