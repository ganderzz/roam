import { supabaseClient } from "~/utils/supabaseClient.ts";

export default () => (
  <form
    class="flex flex-col gap-4"
    onSubmit={async (e) => {
      e.preventDefault();
      const elems = e.currentTarget.elements;
      const email = elems.namedItem("email")?.value;
      const password = elems.namedItem("password")?.value;

      const response = await supabaseClient.auth.signIn({ email: email as string, password: password as string });
      document.cookie = `access_token=${response.data.access_token}`;
    }}
  >
    <div class="w-full flex justify-between">
      <label htmlFor="email" class="w-1/4">
        Email:
      </label>

      <input autoFocus name="email" type="text" id="email" class="text-black w-3/4 px-4 py-2 rounded-md" />
    </div>

    <div class="w-full flex justify-between">
      <label htmlFor="password" class="w-1/4">
        Password:
      </label>
      <input type="password" name="password" id="password" class="text-black w-3/4 px-4 py-2 rounded-md" />
    </div>

    <div class="w-full flex justify-end items-center mt-2">
      <a href="/signup" class="mr-4">
        Sign Up
      </a>
      <button type="submit" class="bg-blue-800 py-4 px-4 rounded-md font-bold hover:bg-blue-900 transition-all">
        Login
      </button>
    </div>
  </form>
);
