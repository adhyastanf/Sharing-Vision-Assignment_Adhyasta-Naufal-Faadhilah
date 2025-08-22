import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import AppSidebar from '~/components/app-sidebar';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className='min-h-screen bg-gray-50 w-full py-6 px-4'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
