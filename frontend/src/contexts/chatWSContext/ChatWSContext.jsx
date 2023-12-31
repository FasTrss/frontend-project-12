import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export const ChatWSContext = createContext();

const ChatWSProvider = ({ webSocket, children }) => {
  const emitSendMessage = useCallback((message) => new Promise((resolve, reject) => {
    webSocket.timeout(1000).emit('newMessage', message, (error, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(error);
      }
    });
  }), [webSocket]);

  const emitAddChannel = useCallback((channel) => new Promise((resolve, reject) => {
    webSocket.timeout(1000).emit('newChannel', channel, (error, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(error);
      }
    });
  }), [webSocket]);

  const emitRemoveChannel = useCallback((id) => new Promise((resolve, reject) => {
    webSocket.timeout(1000).emit('removeChannel', { id }, (error, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(error);
      }
    });
  }), [webSocket]);

  const emitRenameChannel = useCallback((name, id) => new Promise((resolve, reject) => {
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
