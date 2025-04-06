import Footer from "@/components/atoms/footer/Footer";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import Navbar from "@/components/organisms/navbar/Navbar";
import PurchaseProductWrapper from "@/components/organisms/product/purchase/PurchaseProductWrapper";

interface CheckoutPageParams {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <SectionTitle
        head="Beli Produk"
        body="Beli produk berkualitas yang anda inginkan."
      />
      <PurchaseProductWrapper id={id} />
      <Footer />
    </>
  );
}
