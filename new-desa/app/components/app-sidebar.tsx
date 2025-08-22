import { Link, useLocation } from 'react-router';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { nav } from '~/constants/data';
import { Collapsible, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '~/lib/utils';

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin CMS Articles</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((items, index) => {
                const isActive = location.pathname === items.url;
                return (
                  <Collapsible defaultOpen className='group/collapsible' key={index}>
                    <SidebarMenuItem key={items.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link
                            key={items.title}
                            to={items.url}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                              isActive ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            )}
                          >
                            <items.icon className='h-4 w-4' />
                            {items.title}
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
