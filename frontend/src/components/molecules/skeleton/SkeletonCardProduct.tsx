import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardProduct() {
  return (
    <div className="w-fit border-0 shadow-none">
      <Skeleton className="h-[250px] w-[250px] rounded-md" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
