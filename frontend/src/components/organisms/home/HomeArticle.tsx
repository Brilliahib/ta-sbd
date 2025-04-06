import CardListArticle from "@/components/molecules/card/CardListArticle";

export default function HomeArticle() {
  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-lg font-bold md:text-xl">Artikel Terbaru</h1>
      <CardListArticle />
    </div>
  );
}
