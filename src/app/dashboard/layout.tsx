import NavBar from "./_components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-cyan-100 via-violet-100 to-rose-100 dark:from-cyan-950 dark:via-violet-900 dark:to-rose-950">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
