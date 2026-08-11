export function PageSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-16 w-full bg-gray-200" />
      <div className="mx-auto mt-8 w-full max-w-4xl space-y-4 px-4">
        <div className="h-10 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
        <div className="mt-8 h-64 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
}
