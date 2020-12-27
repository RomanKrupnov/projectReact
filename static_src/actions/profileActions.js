export const CHANGE_USER_NAME = '@@profile/CHANGE_USER_NAME';

export const changeUserName = (userName) => ({
	type: CHANGE_USER_NAME,
	userName,
});