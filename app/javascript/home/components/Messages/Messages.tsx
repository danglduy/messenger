import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchMessages,
  Message,
  selectMessagesState,
} from '../../store/messages/messagesSlice';
import Layout from '../Layout';

type MessageListProps = {
  messages: Message[];
  show: boolean;
};

function MessageList({ messages, show }: MessageListProps) {
  if (!show) return null;

  return <></>;
}

export function Messages() {
  const dispatch = useAppDispatch();
  const { messages, channelId } = useAppSelector(selectMessagesState);
  const params = useParams();

  useEffect(() => {
    if (params.id && params.id !== String(channelId)) {
      dispatch(fetchMessages({ channelId: parseInt(params.id) }));
    }
  }, [dispatch, channelId, params?.id]);

  const messagesVisible = useMemo(() => {
    return String(channelId) === params.id;
  }, [channelId, params?.id]);

  return (
    <Layout>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <MessageList messages={messages} show={messagesVisible} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
