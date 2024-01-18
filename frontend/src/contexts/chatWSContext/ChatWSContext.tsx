/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable functional/no-return-void */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Socket } from 'socket.io-client';

const defaultValue = {
  emitSendMessage: async (message: string) => {},
  emitAddChannel: async (channel: object) => {},
  emitRemoveChannel: async (id: number) => {},
  emitRenameChannel: async (name: string, id: number) => {},
};

export const ChatWSContext = createContext(defaultValue);

interface WebSocketType {
  timeout: (timeout: number) => WebSocketType;
  emit: (event: string, data: any, callback: (error: any, response: any) => void) => Socket;
}

const ChatWSProvider = (
  { webSocket, children }: {webSocket: WebSocketType, children: React.ReactNode },
) => {
  const emitSendMessage = useCallback((message: string): Promise<void> =>
    new Promise((resolve, reject) => {
      webSocket.timeout(1000).emit('newMessage', message, (error, response) => {
        if (response?.status === 'ok') {
          resolve(response);
        } else {
          reject(error);
        }
      });
    }), [webSocket]);

  const emitAddChannel = useCallback((channel: object) : Promise<void> =>
    new Promise((resolve, reject) => {
      webSocket.timeout(1000).emit('newChannel', channel, (error, response) => {
        if (response?.status === 'ok') {
          resolve(response);
        } else {
          reject(error);
        }
      });
    }), [webSocket]);

  const emitRemoveChannel = useCallback((id: number): Promise<void> =>
    new Promise((resolve, reject) => {
      webSocket.timeout(1000).emit('removeChannel', { id }, (error, response) => {
        if (response?.status === 'ok') {
          resolve(response);
        } else {
          reject(error);
        }
      });
    }), [webSocket]);

  const emitRenameChannel = useCallback((name: string, id: number): Promise<void> =>
    new Promise((resolve, reject) => {
      webSocket.timeout(1000).emit('renameChannel', { name, id }, (error, response) => {
        if (response?.status === 'ok') {
          resolve(response);
        } else {
          reject(error);
        }
      });
    }), [webSocket]);

  const contextValue = useMemo(() => ({
    emitSendMessage,
    emitAddChannel,
    emitRemoveChannel,
    emitRenameChannel,
  }), [emitSendMessage, emitAddChannel, emitRemoveChannel, emitRenameChannel]);

  return (
    <ChatWSContext.Provider value={contextValue}>
      {children}
    </ChatWSContext.Provider>
  );
};

const useChatWS = () => useContext(ChatWSContext);

export { ChatWSProvider, useChatWS };
