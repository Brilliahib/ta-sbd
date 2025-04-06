import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardWrapper from "@/components/organisms/dashboard/DashboardWrapper";

export default function DashboardPage() {
  return (
    <section>
      <DashboardTitle
        head="Dashboard"
        body="Selamat datang di Dashboard Vintagee!"
      />
      <DashboardWrapper />
    </section>
  );
}
