"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/modules/auth/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const onSignOut = async () => {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={onSignOut}>
      <LogOut className="h-4 w-4" />
      Выйти
    </Button>
  );
}
