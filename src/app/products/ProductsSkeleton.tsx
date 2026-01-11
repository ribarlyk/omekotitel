export function ProductsSkeleton() {
  return (
    <>
      <div className="mb-4 h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="aspect-square mb-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        ))}
      </div>
    </>
  );
}
