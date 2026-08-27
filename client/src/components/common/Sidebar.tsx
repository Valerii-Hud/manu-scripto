import useAuth, { type UseAuthProps } from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import type { INotification, IUser } from '../../types/interfaces';
import type { UseMutateFunction } from '@tanstack/react-query';
import * as React from 'react';
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Frame,
  LogOut,
  Map,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import NSvg from '../svgs/N';
import { Link } from 'react-router-dom';
interface ViewProps {
  notifications: INotification[];
  authUser: IUser;
  // eslint-disable-next-line
  logout: UseMutateFunction<any, Error, UseAuthProps, unknown>;
}

const SidebarBlock = () => {
  const { auth: logout, authUser } = useAuth();
  const { notifications } = useNotification();
  return (
    <AppSidebar
      notifications={notifications}
      authUser={authUser}
      logout={logout}
    />
  );
};

// const View = ({ notifications, authUser, logout }: ViewProps) => (
//   <div className="md:flex-[2_2_0] w-18 max-w-52">
//     <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
//       <Link to="/" className="flex justify-center md:justify-start">
//         <XSvg className="px-2 w-12 h-12  fill-primary hover:bg-stone-900 " />
//       </Link>
//       <ul className="flex flex-col gap-3 mt-4">
//         <li className="flex justify-center md:justify-start">
//           <Link
//             to="/"
//             className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//           >
//             <MdHomeFilled className="w-8 h-8" />
//             <span className="text-lg hidden md:block">Home</span>
//           </Link>
//         </li>
//         <li className="flex justify-center md:justify-start">
//           <Link
//             to="/notifications"
//             className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//           >
//             <IoNotifications className="w-6 h-6" />
//             <span className="text-lg hidden md:block">Notifications</span>

//             {notifications?.length >= 1 && (
//               <span className="indicator-item badge badge-secondary">
//                 {notifications?.length > 99
//                   ? '99+'
//                   : notifications?.length <= 99
//                     ? notifications?.length
//                     : null}
//               </span>
//             )}
//           </Link>
//         </li>

//         <li className="flex justify-center md:justify-start">
//           <Link
//             to={`/${authUser?.userName}`}
//             className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//           >
//             <FaUser className="w-6 h-6" />
//             <span className="text-lg hidden md:block">Profile</span>
//           </Link>
//         </li>
//       </ul>
//       {authUser && (
//         <Link
//           to={`/${authUser.userName}`}
//           className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
//         >
//           <div className="avatar hidden md:inline-flex">
//             <div className="w-8 rounded-full">
//               <img src={authUser?.profileImage || '/avatar-placeholder.png'} />
//             </div>
//           </div>
//           <div className="flex justify-between flex-1">
//             <div className="hidden md:block">
//               <p className="text-white font-bold text-sm w-20 truncate">
//                 {authUser?.fullName}
//               </p>
//               <p className="text-slate-500 text-sm">@{authUser?.userName}</p>
//             </div>
//             <BiLogOut
//               className="w-5 h-5 cursor-pointer"
//               onClick={(event) => {
//                 event.preventDefault();
//                 logout({ endpoint: 'logout' });
//               }}
//             />
//           </div>
//         </Link>
//       )}
//     </div>
//   </div>
// );

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

function AppName() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <NSvg fill="black" className="" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Noviagram</span>
              <span className="truncate text-xs">Free plan</span>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} />}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={<a href={subItem.url} />}>
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavUser({
  user,
  logout,
}: {
  user: IUser;
  //eslint-disable-next-line
  logout: UseMutateFunction<any, Error, UseAuthProps, unknown>;
}) {
  const { isMobile } = useSidebar();
  const fallBackUserName = String(
    user.userName[0] + user.userName[1]
  ).toUpperCase();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.profileImage} alt={user.userName} />
              <AvatarFallback className="rounded-lg">
                {fallBackUserName}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.userName}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.profileImage} alt={user.userName} />
                    <AvatarFallback className="rounded-lg">
                      {fallBackUserName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.userName}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={`/${user.userName}`}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ authUser, logout }: ViewProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <AppName />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={authUser} logout={logout} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}

export default SidebarBlock;
