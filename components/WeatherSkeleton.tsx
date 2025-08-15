// components/WeatherSkeleton.tsx
export function WeatherSkeleton() {
  return (
    <div className="flex flex-col items-center text-center space-y-10 animate-pulse w-full max-w-sm">
      {/* Location Skeleton */}
      <div className="flex flex-col items-center space-y-2 w-full">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
        <div className="h-32 w-32 bg-slate-200 dark:bg-slate-700 rounded-full mt-2"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3 -mt-4"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
      </div>

      {/* Info Items Skeleton */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-12"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}