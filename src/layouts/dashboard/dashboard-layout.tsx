import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({
  withNavbar,
  withSidebar,

  children,
}: {
  withNavbar?: boolean;
  withSidebar?: boolean;

  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      {withNavbar && <DashboardNavbar />}

      <div className="flex flex-1">
        {withSidebar && <DashboardSidebar />}

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </main>
  );
}
