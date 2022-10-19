import { config } from "https://deno.land/std/dotenv/mod.ts";
import { resolve, fromFileUrl, dirname } from "https://deno.land/std/path/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const env = await config({ path: resolve(__dirname, "..", ".env") });

export const Routes = {
  baseUrl: env.BASE_URL,
  login: `${env.BASE_URL}/login`,
  logout: `${env.BASE_URL}/logout`,
  signUp: `${env.BASE_URL}/signup`,
  protected: {
    dashboard: `${env.BASE_URL}/dashboard`,
  },
};
