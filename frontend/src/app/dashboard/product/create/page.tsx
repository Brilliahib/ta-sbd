import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardCreateProductContent from "@/components/organisms/dashboard/product/DashboardCreateProductContent";

export default function DashboardCreateProductPage() {
  return (
    <>
      <DashboardTitle
        head="Tambah Produk"
        body="Tambahkan produk anda disini"
      />
      <DashboardCreateProductContent />
    </>
  );
}
