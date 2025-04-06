import Footer from "@/components/atoms/footer/Footer";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import Navbar from "@/components/organisms/navbar/Navbar";
import ExchangeProductWrapper from "@/components/organisms/product/exchange/ExchangeProductWrapper";

interface ExchangePageParams {
  params: Promise<{ id: string }>;
}

export default async function ExchangePage({ params }: ExchangePageParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <SectionTitle
        head="Tukar Fashion"
        body="Tukar fashion yang anda inginkan dengan produk yang anda punya."
      />
      <ExchangeProductWrapper id={id} />
      <Footer />
    </>
  );
}
