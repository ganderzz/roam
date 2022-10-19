import { getCookies } from "https://deno.land/std/http/cookie.ts";

/**
 * For a given request, parse the access_token from cookies.
 */
export const getAccessToken = (request: Request): string => {
  return getCookies(request.headers)?.access_token ?? "";
};
