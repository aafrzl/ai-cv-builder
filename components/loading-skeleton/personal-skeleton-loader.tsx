import { Skeleton } from "../ui/skeleton";

export default function PersonalSkeletonLoader() {
  return (
    <div>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div>
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-[30%] mt-4" />
    </div>
  );
}
