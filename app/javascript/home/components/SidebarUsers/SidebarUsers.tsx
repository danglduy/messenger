import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { selectGlobal } from '../../store/global/globalSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createDirectConversation,
  fetchUsers,
  selectSidebar,
  setDirectChannelId,
} from '../../store/sidebar/sidebarSlice';
import { classNames } from '../../utils';

export function SidebarUsers() {
  const dispatch = useAppDispatch();
  const { users, directChannelsUserIds, directChannelId } =
    useAppSelector(selectSidebar);
  const { currentUser } = useAppSelector(selectGlobal);
  const navigate = useNavigate();

  const directUsersChannels: Record<number, number> = useMemo(() => {
    const usersChannels: Record<number, number> = {};

    // The result will be an object with keys are direct connected users and values are the direct channel id.
    Object.keys(directChannelsUserIds).forEach((channelId) => {
      directChannelsUserIds[channelId].forEach((userId: number) => {
        if (userId !== currentUser?.id) {
          usersChannels[userId] = parseInt(channelId);
        }
      });
    });

    return usersChannels;
  }, [currentUser?.id, directChannelsUserIds]);

  const onOpenDirectConversation = (userId: number) => {
    const channelId = directUsersChannels[userId];
    if (channelId) {
      navigate(`/channels/${channelId}`);
    } else {
      dispatch(createDirectConversation({ userId }));
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (directChannelId !== -1) {
      dispatch(setDirectChannelId({ directChannelId: -1 }));
      navigate(`/channels/${directChannelId}`);
    }
  }, [directChannelId, navigate, dispatch]);

  return (
    <nav className="space-y-1 px-2 py-4">
      {users.map((user) => {
        return !currentUser || user.id === currentUser.id ? null : (
          <span
            key={user.id}
            className={classNames(
              'text-gray-300 hover:bg-gray-700 hover:text-white',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              'hover:cursor-pointer'
            )}
            onClick={() => onOpenDirectConversation(user.id)}
          >
            {user.name}
          </span>
        );
      })}
    </nav>
  );
}
