import { cache } from "react";

import { headers } from "next/headers";

import { auth } from "@/lib/server/auth";

import { Session } from "./auth-types";

export const getAuthSession: () => Promise<Session | null> = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});
