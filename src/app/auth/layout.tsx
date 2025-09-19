export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-violet-100 to-rose-100 dark:from-cyan-950 dark:via-violet-900 dark:to-rose-950">
      {children}
    </main>
  );
}
