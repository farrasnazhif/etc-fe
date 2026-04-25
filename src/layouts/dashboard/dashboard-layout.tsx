import DashboardFooter from "./dashboard-footer";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({
  withNavbar,
  withSidebar,
  withFooter,
  children,
}: {
  withNavbar?: boolean;
  withSidebar?: boolean;
  withFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {withNavbar && <DashboardNavbar />}

      <div className="flex flex-1">
        {withSidebar && <DashboardSidebar />}

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>

      {withFooter && <DashboardFooter />}
    </div>
  );
}
