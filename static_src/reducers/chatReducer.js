import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';
import { ADD_CHAT, ENABLE_CHAT_ATTENTION, DISABLE_CHAT_ATTENTION } from '../actions/chatActions';
import { UPDATE_CHATS } from '../actions/chatActions';
import { CHANGE_USER_NAME } from '../actions/profileActions';

const initialStore = {
	chats: {},
	messages: {},
	userName: 'User',
};

export default function chatReducer(store = initialStore, action) {
	switch (action.type) {
		case SEND_MESSAGE: {
			return update(store, {
				messages: {
					$merge: {
						...store.messages,
						[action.messageId]: {
							id: action.messageId,
							text: action.message,
							userName: action.userName,
						},
					}
				}
			});
		}
		case ADD_CHAT: {
			console.log(action.title);
			let id;
			action.chatId
				? id = action.chatId
				: id = Object.keys(store.chats).length + 1;

			return update(store, {
				chats: {
					$merge: {
						[id]: {
							id: id,
							title: action.title,
							messageList: []
						}
					}
				}
			});
		}
		case UPDATE_CHATS: {
			return update(store, {
				chats: {
					$merge: {
						[action.chatId]: {
							...store.chats[action.chatId],
							messageList: [
								...store.chats[action.chatId]['messageList'],
								action.messageId,
							],
						},

					}
				},
			});
		}
		case CHANGE_USER_NAME: {
			return update(store, {
				userName: {
					$set: action.userName
				}
			});
		}
		case ENABLE_CHAT_ATTENTION: {
			return update(store, {
				chats: {
					$merge: {
						[action.chatId]: {
							...store.chats[action.chatId],
							attention: true,
						}
					}
				}
			});
		};
		case DISABLE_CHAT_ATTENTION: {
			return update(store, {
				chats: {
					$merge: {
						[action.chatId]: {
							...store.chats[action.chatId],
							attention: false,
						}
					}
				}
			});
		};
		default:
			return store;
	}
}