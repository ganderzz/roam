// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_500.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/dashboard/_middleware.ts";
import * as $4 from "./routes/dashboard/index.tsx";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/login.tsx";
import * as $7 from "./routes/logout.ts";
import * as $8 from "./routes/signup.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/GithubLogin.tsx";

const manifest = {
  routes: {
    "./routes/_500.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/joke.ts": $2,
    "./routes/dashboard/_middleware.ts": $3,
    "./routes/dashboard/index.tsx": $4,
    "./routes/index.tsx": $5,
    "./routes/login.tsx": $6,
    "./routes/logout.ts": $7,
    "./routes/signup.tsx": $8,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/GithubLogin.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
