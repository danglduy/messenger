import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../utils';

export function SidebarChannels() {
  return (
    <nav className="space-y-1 px-2 py-4">
      <Link
        to="/"
        className={classNames(
          'text-gray-300 hover:bg-gray-700 hover:text-white',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        )}
      >
        Channel 1
      </Link>
    </nav>
  );
}
