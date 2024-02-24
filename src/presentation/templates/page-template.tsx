export function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-4 p-4 ">
      {children}
    </main>
  );
}
