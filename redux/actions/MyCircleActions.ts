import { MyCircleFriend } from './../../types';
import { SET_MYCIRCLE_FRIENDS, SET_SENDING_PANIC_MESSAGE } from './types/MyCircleActions.types';

/**
 * Save friend info (with phone number) to MyCircle Object
 * @param {MyCircleFriend[]} - An array of MyCircleFriend objects
 * @returns
 */
// FIXME: Throws error if you manually specify type of 'friends' and try to call it, why?
export function setMyCircleFriends(friends: MyCircleFriend[]) {
    return {
        type: SET_MYCIRCLE_FRIENDS,
        payload: friends
    }
}

export function setIsSendingPanicMessage(isSendingPanicMessage: boolean) {
    return {
        type: SET_SENDING_PANIC_MESSAGE,
        payload: isSendingPanicMessage
    }
}