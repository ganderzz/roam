import type { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
import { User } from "~/types/user.ts";
import { Routes } from "~/utils/routes.ts";
import { MenuLink } from "./MenuLink.tsx";

type Props = {
  children: ComponentChildren;
  title?: string;
  user?: User;
};

export default function ({ children, title, user }: Props) {
  return (
    <>
      <Head>
        <title>{title ?? "Roam"}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>

      <div class="h-screen dark:bg-gray-800 dark:text-white">
        <header class="bg-gray-500 dark:bg-gray-600 p-2 flex justify-between">
          <div class="w-1/6 font-bold">Roam</div>

          <nav class="flex w-5/6 justify-end">
            <MenuLink href={Routes.baseUrl}>Home</MenuLink>

            {!user ? (
              <MenuLink href={Routes.login}>Login</MenuLink>
            ) : (
              <>
                <MenuLink href={Routes.logout}>Logout</MenuLink>
              </>
            )}
          </nav>
        </header>

        <section class="w-full min-h-full flex text-base">{children}</section>
      </div>
    </>
  );
}
