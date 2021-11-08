import { SET_DESCRIPTION } from './types/DescriptionActions.types';
import { DescriptionType } from "../../types";

export function setDescription(infoType: DescriptionType) {
    return {
        type: SET_DESCRIPTION,
        payload: infoType
    }
}