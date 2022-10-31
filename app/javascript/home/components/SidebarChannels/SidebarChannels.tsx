import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchChannels, selectSidebar } from '../../store/sidebar/sidebarSlice';
import { classNames } from '../../utils';

export function SidebarChannels() {
  const dispatch = useAppDispatch();
  const { channels, channelsFetched } = useAppSelector(selectSidebar);

  useEffect(() => {
    if (!channelsFetched) {
      dispatch(fetchChannels());
    }
  }, [channelsFetched, dispatch]);

  return (
    <nav className="space-y-1 px-2 py-4">
      {channels.map((channel) => (
        <Link
          key={channel.id}
          to="/"
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
        >
          {channel.name}
        </Link>
      ))}
    </nav>
  );
}
