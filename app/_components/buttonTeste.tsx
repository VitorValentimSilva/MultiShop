"use client";

import { signIn } from "next-auth/react";

export default function AuthButtons() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/" })}>
      Entrar com Google
    </button>
  );
}
