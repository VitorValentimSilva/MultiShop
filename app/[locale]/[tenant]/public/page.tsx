import AuthButtons from "@/app/_components/buttonTeste";
import { ModeToggle } from "@/app/_components/mode-toggle";
import { auth } from "@/app/_lib/auth/auth";

export default async function HomeTenantPublic() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ModeToggle />
        <p>teste HomeTenantPublic</p>
        <AuthButtons />

        <p>Welcome {session?.user?.name}!</p>
      </main>
    </div>
  );
}
