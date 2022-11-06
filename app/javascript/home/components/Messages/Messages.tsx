import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addMessage,
  fetchMessages,
  Message,
  selectMessagesState,
  sendMessage,
} from '../../store/messages/messagesSlice';
import { selectChannels } from '../../store/sidebar/sidebarSlice';
import Layout from '../Layout';
import consumer from '../../utils/actioncableConsumer';

type MessageListProps = {
  messages: Message[];
  show: boolean;
};

function MessageList({ messages, show }: MessageListProps) {
  if (!show) return null;

  return (
    <ul className="flex flex-col-reverse border h-full overflow-y-auto">
      {messages
        .map((message) => (
          <li key={message.id} className="text-gray-500 text-md">
            {message.user.name} - {message.content}
          </li>
        ))
        .reverse()}
      <li className="grow">
        {/* Dummy element to grow the messages list to the bottom of the page */}
      </li>
    </ul>
  );
}

export function Messages() {
  const dispatch = useAppDispatch();
  const { messages, channelId } = useAppSelector(selectMessagesState);
  const params = useParams();
  const channels = useAppSelector(selectChannels);
  const channel = useMemo(
    () => channels.find((channel) => channel.id === channelId),
    [channelId, channels]
  );

  const [messageContent, setMessageContent] = useState('');

  const messagesVisible = useMemo(() => {
    return String(channelId) === params.id;
  }, [channelId, params?.id]);

  const onMessageContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageContent(e.currentTarget.value);
    },
    []
  );

  const onSendMessage = useCallback(
    (_e: React.MouseEvent<HTMLButtonElement>) => {
      if (messageContent.trim().length > 0) {
        dispatch(
          sendMessage({ channelId, messageContent: messageContent.trim() })
        );
        setMessageContent('');
      }
    },
    [dispatch, channelId, messageContent]
  );

  useEffect(() => {
    if (params.id) {
      if (params.id !== String(channelId)) {
        dispatch(fetchMessages({ channelId: parseInt(params.id) }));
      }

      const subscriber = consumer.subscriptions.create(
        { channel: 'MessagesChannel', channel_id: params.id },
        {
          received(action: { type: 'ADD_MESSAGE'; payload: Message }) {
            switch (action.type) {
              case 'ADD_MESSAGE': {
                dispatch(addMessage(action.payload));
                break;
              }
              default:
                break;
            }
          },
        }
      );

      return () => {
        subscriber.unsubscribe();
      };
    }
  }, [dispatch, channelId, params?.id]);

  return (
    <Layout>
      <main className="h-[calc(100vh-80px)]">
        <div className="py-6 flex flex-col h-full">
          <div className="max-w-7xl px-4 sm:px-6 md:px-8 flex-none">
            <h1 className="text-2xl font-semibold text-gray-900">
              {channel?.name || ''}
            </h1>
          </div>
          <div className="max-w-7xl px-4 sm:px-6 md:px-8 flex-auto h-[calc(100%-80px)]">
            <MessageList messages={messages} show={messagesVisible} />
          </div>
          <div className="max-w-7xl px-4 sm:px-6 md:px-8 h-16 flex-none w-full flex items-center">
            <div className="w-full">
              <label htmlFor="message-content" className="sr-only">
                Message
              </label>
              <input
                type="text"
                name="message-content"
                id="message-content"
                value={messageContent}
                onChange={onMessageContentChange}
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder-slate-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={`Message ${channel?.name || ''}`}
              />
            </div>
            <button
              onClick={onSendMessage}
              disabled={messageContent.length === 0}
              className="mt-0 ml-3 w-auto text-sm inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
