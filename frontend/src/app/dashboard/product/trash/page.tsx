import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardProductTrashWrapper from "@/components/organisms/dashboard/product/DashboardProductTrashWrapper";

export default function DashboardProductTrashPage() {
  return (
    <section>
      <DashboardTitle
        head="Produk Sampah"
        body="Menampilkan daftar produk yang masuk ke dalam sampah."
      />
      <DashboardProductTrashWrapper />
    </section>
  );
}
