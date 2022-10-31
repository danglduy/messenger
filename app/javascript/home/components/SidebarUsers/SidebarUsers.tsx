import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers, selectSidebar } from '../../store/sidebar/sidebarSlice';
import { classNames } from '../../utils';

export function SidebarUsers() {
  const dispatch = useAppDispatch();
  const { users, usersFetched } = useAppSelector(selectSidebar);

  useEffect(() => {
    if (!usersFetched) {
      dispatch(fetchUsers());
    }
  }, [usersFetched, dispatch]);

  return (
    <nav className="space-y-1 px-2 py-4">
      {users.map((user) => (
        <Link
          key={user.id}
          to="/"
          className={classNames(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
        >
          {user.name}
        </Link>
      ))}
    </nav>
  );
}
