import Footer from "@/components/atoms/footer/Footer";
import Navbar from "@/components/organisms/navbar/Navbar";
import ProductDetailWrapper from "@/components/organisms/product/ProductWrapperContent";

interface ProductDetailPageParams {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <ProductDetailWrapper id={id} />
      <Footer />
    </>
  );
}
