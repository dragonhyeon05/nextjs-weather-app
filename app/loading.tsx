// app/loading.tsx
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl flex flex-col flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <LoaderCircle className="h-16 w-16 text-blue-500 animate-spin" />
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
            Memuat data cuaca...
          </p>
        </div>
      </div>
    </main>
  );
}