import Footer from "@/components/atoms/footer/Footer";
import Navbar from "@/components/organisms/navbar/Navbar";
import UserProductWrapper from "@/components/organisms/user/UserProductWrapper";

interface DetailUserProductPageParams {
  params: Promise<{ id: string }>;
}

export default async function DetailUserProductPage({
  params,
}: DetailUserProductPageParams) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <UserProductWrapper id={id} />
      <Footer />
    </>
  );
}
