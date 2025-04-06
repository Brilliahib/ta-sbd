import CardDetailArticle from "@/components/molecules/card/CardDetailArticle";

interface ArticleDetailWrapperProps {
  slug: string;
}

export default function ArticleDetailWrapper({
  slug,
}: ArticleDetailWrapperProps) {
  return (
    <section className="py-10">
      <CardDetailArticle slug={slug} />
    </section>
  );
}
