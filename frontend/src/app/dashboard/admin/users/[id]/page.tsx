import DashboardAdminDetailUsersWrapper from "@/components/organisms/dashboard/admin/users/DashboardAdminDetailUsersWrapper";

interface DashboardAdminDetailUsersPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDetailUsersPage({
  params,
}: DashboardAdminDetailUsersPageProps) {
  const { id } = await params;
  return (
    <div>
      <DashboardAdminDetailUsersWrapper id={id} />
    </div>
  );
}
