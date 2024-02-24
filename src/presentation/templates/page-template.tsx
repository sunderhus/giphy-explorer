export function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen gap-4 p-4 mx-auto w-xl border-r-violet-400 border-8 border-b-blue-400 border-t-yellow-400 border-l-green-400">
      {children}
      <div className="bg-red-500 w-14 h-24 fixed top-0 right-0 -translate-y-1/2 hidden sm:block rounded" />
    </main>
  );
}
