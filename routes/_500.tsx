import { ErrorPageProps } from "$fresh/server.ts";

export default function Error(props: ErrorPageProps) {
  return (
    <div class="h-screen dark:bg-gray-800 dark:text-white">
      <div class="mx-auto max-w-screen-md pt-4">
        <h1 class="text-4xl font-bold">Whoops!</h1>
        {props.error?.toString()}
      </div>
    </div>
  );
}
