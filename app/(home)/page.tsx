import { requireAuth } from "@/lib/auth-guards";

export default async function Home() {
  await requireAuth();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <h1 className="text-amber-500 font-semibold text-2xl">Flux Board</h1>

      Protected Server Component
    </div>
  );
}
