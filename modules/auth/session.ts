import { headers } from "next/headers";
import { auth } from "@/modules/auth/auth";

export const getServerSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};
