import Footer from "@/components/atoms/footer/Footer";
import ArticleDetailWrapper from "@/components/organisms/article/ArticleDetailWrapper";
import Navbar from "@/components/organisms/navbar/Navbar";

interface DetailArticlePageParams {
  params: Promise<{ slug: string }>;
}

export default async function DetailArticlePage({
  params,
}: DetailArticlePageParams) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <ArticleDetailWrapper slug={slug} />
      <Footer />
    </>
  );
}
