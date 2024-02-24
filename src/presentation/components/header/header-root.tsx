export function Root({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex gap-2 text-gray-300 text-xl">{children}</header>
  );
}
