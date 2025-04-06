import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { thumbnail } from "@/data/data-article";
import Image from "next/image";
import Link from "next/link";

export default function CardListArticle() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {thumbnail.map((article) => (
        <Link key={article.id} href={`/blog/${article.slug}`} passHref>
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <Image
              src={article.image_url}
              alt={article.title}
              width={400}
              height={250}
              className="h-40 w-full rounded-t-lg object-cover"
            />
            <CardHeader>
              <CardTitle className="line-clamp-2 leading-normal">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Baca selengkapnya →</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
