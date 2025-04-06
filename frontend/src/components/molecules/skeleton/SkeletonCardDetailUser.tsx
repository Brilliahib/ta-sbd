import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardDetailUser() {
  return (
    <Card className="mb-12 rounded-none border-0 border-b pb-12 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12 border border-muted md:h-36 md:w-36">
              <AvatarFallback className="h-12 w-12 md:h-36 md:w-36">
                <Skeleton className="h-full w-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
