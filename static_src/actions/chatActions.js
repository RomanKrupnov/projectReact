export const ADD_CHAT = '@@chat/ADD_CHAT';
export const UPDATE_CHATS = '@@chat/UPDATE_CHATS';
export const ENABLE_CHAT_ATTENTION = '@@chat/ENABLE_CHAT_ATTENTION';
export const DISABLE_CHAT_ATTENTION = '@@chat/DISABLE_CHAT_ATTENTION';

export const addChat = (title, chatId = null) => ({
	type: ADD_CHAT,
	title,
	chatId
});

export const updateChats = (messageId, chatId, userName) => ({
	type: UPDATE_CHATS,
	messageId,
	chatId,
	userName
});

export const enableChatAttention = (chatId) => ({
	type: ENABLE_CHAT_ATTENTION,
	chatId,
});

export const disableChatAttention = (chatId) => ({
	type: DISABLE_CHAT_ATTENTION,
	chatId,
});