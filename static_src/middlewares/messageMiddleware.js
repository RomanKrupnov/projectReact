import { updateChats } from '../actions/chatActions';
import { sendMessage } from '../actions/messageActions';
import { enableChatAttention } from '../actions/chatActions';
import { disableChatAttention } from '../actions/chatActions';

export const sendMessageThunk = (message, messageId, userName, chatId) =>
	(dispatch) => {
		console.log('thunk');
		dispatch(sendMessage(message, messageId, userName));

		if (sessionStorage.getItem('robotTimer'))
			clearTimeout(sessionStorage.getItem('robotTimer'));

		if (userName !== 'Бот') {
			dispatch(enableChatAttention(chatId));
			const robotTimer = setTimeout(() => {
				dispatch(
					sendMessage(
						'Не приставай ко мне, я - бот!',
						messageId + 1,
						'Бот')
				);
				dispatch(
					updateChats(messageId + 1, chatId, 'Бот')
				);
			}, 1000);

			setTimeout(() => dispatch(disableChatAttention(chatId)), 3000);

			sessionStorage.setItem('robotTimer', robotTimer);

		}
	};
