import { requireAuth } from "@/lib/auth-guards";

export default async function Home() {
  await requireAuth();

  return (
     < >
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to Flux Board
        </h1>
        <p className="text-sm text-foreground/70 mt-1">
          Your central hub for projects and workspaces.
        </p>
      </div>

      {/* Stats / Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/20 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg">Projects</h2>
          <p className="text-foreground/70 mt-2">12 Active Projects</p>
        </div>
        <div className="bg-secondary/20 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg">Tasks</h2>
          <p className="text-foreground/70 mt-2">34 Pending Tasks</p>
        </div>
        <div className="bg-accent/20 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg">Team</h2>
          <p className="text-foreground/70 mt-2">8 Members Online</p>
        </div>
        <div className="bg-green-200/30 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <p className="text-foreground/70 mt-2">5 New Alerts</p>
        </div>
      </div>

      {/* Main Content / Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/80 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Website Redesign</h3>
          <p className="text-foreground/70 text-sm">
            Redesign the corporate website with a modern layout.
          </p>
        </div>
        <div className="bg-white/80 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Mobile App</h3>
          <p className="text-foreground/70 text-sm">
            Build a cross-platform mobile application for internal use.
          </p>
        </div>
        <div className="bg-white/80 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Marketing Campaign</h3>
          <p className="text-foreground/70 text-sm">
            Launch the Q4 marketing campaign and track analytics.
          </p>
        </div>
      </div>

      {/* Placeholder / Extra Section */}
      <div className="mt-8 p-6 rounded-lg bg-primary/15 h-64 flex items-center justify-center text-foreground/70 font-medium">
        Random placeholder content for future widgets
      </div>

      {/* Placeholder / Extra Section */}
      <div className="mt-8 p-6 rounded-lg bg-primary/10 h-64 flex items-center justify-center text-foreground/70 font-medium">
        Random placeholder content for future widgets 2
      </div>
    </>
  );
}
