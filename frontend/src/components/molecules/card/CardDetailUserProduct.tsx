import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/user/user";
import { generateFallbackFromName } from "@/utils/generate-name";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CardDetailUserProductProps {
  data?: User;
}

export default function CardDetailUserProduct({
  data,
}: CardDetailUserProductProps) {
  return (
    <Card className="mb-6 rounded-none border-0 border-b pb-6 shadow-none md:mb-12 md:pb-12">
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-16 w-16 border border-muted md:h-36 md:w-36">
              <AvatarImage src={data?.name} />
              <AvatarFallback className="h-16 w-16 font-semibold text-gray-700 md:h-36 md:w-36 md:text-3xl">
                {generateFallbackFromName(data?.name ?? "")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="md:space-y-2">
            <h1 className="text-xl font-semibold">{data?.name}</h1>
            <p className="text-muted-foreground">
              Bergabung sejak {""}
              {format(data?.created_at ?? "", "MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
