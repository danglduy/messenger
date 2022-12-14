import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchChannels,
  selectGroupChannels,
} from '../../store/sidebar/sidebarSlice';
import { classNames } from '../../utils';

export function SidebarChannels() {
  const dispatch = useAppDispatch();
  const groupChannels = useAppSelector(selectGroupChannels);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <nav className="space-y-1 px-2 py-4">
      {groupChannels.map((groupChannel) => (
        <Link
          key={groupChannel.id}
          to={`/channels/${groupChannel.id}`}
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
        >
          {groupChannel.name}
        </Link>
      ))}
    </nav>
  );
}
