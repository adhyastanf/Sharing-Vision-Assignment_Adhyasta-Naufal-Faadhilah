import { Skeleton } from "~/components/ui/skeleton"

export function ArticlesListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-5 w-32" /> {/* Title */}
            <Skeleton className="h-4 w-full" /> {/* Excerpt line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Excerpt line 2 */}
            <Skeleton className="h-4 w-1/2" /> {/* Excerpt line 3 */}
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Skeleton className="h-8 w-24 rounded-md" /> {/* Page info */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  )
}
