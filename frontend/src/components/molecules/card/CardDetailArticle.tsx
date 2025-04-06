import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { thumbnail } from "@/data/data-article";
import Image from "next/image";

interface CardDetailArticleProps {
  slug: string;
}

export default function CardDetailArticle({ slug }: CardDetailArticleProps) {
  const article = thumbnail.find((item) => item.slug === slug);

  if (!article) {
    return (
      <p className="text-center text-gray-500">Artikel tidak ditemukan.</p>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="mx-auto max-w-3xl p-4">
        <Card className="border-0 p-0 shadow-none">
          <Image
            src={article.image_url}
            alt={article.title}
            width={800}
            height={450}
            className="h-60 w-full rounded-lg object-cover md:h-80"
          />
          <CardHeader className="px-0 md:px-6">
            <CardTitle className="text-center text-2xl font-semibold">
              {article.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            <div
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
