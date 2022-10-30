import React from 'react';
import { ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebar: boolean) => void;
};

const navigation = [
  { name: 'Users', href: '#', icon: UsersIcon, current: true },
  { name: 'Active', href: '#', icon: ClockIcon, current: false },
];

export function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      <DesktopSidebar navigation={navigation} />
    </>
  );
}
