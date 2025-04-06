import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardProductUser() {
  return (
    <div className="w-full border-0 shadow-none">
      <Skeleton className="h-[250px] w-full rounded-md md:w-[250px]" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
