import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-2 pt-3">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      {[...Array(3)]?.map((_, index) => (
        <div
          key={index}
          className="p-2"
        >
          <Skeleton className="h-5 w-1/3 mb-1" />
          <div className="flex items-start justify-between">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <Skeleton className="h-3 w-full my-1" />
        </div>
      ))}
    </div>
  );
}
