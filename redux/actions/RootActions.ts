import { SAVE_JOURNAL } from './types/JournalActions.types';
import { RESET_APP } from "./types/RootActions.types";

export function resetApp() {
  const obj ={
    type: RESET_APP,
    payload: {},
  };
  return obj
}