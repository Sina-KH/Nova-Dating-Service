import { Exceptions } from './exceptions';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';

const en = {
    [Exceptions.notAuthorized]: 'You are not authorized',
    [Exceptions.badRequest]: 'Bad Request',
    [DictionaryKeys.openTheApp]: 'Open the dating mini-app right here, and enjoy finding new friends. 🍟🍷⚽️🙊',
    [DictionaryKeys.youGotAMatch]: '🎉 Your new match! 🥳',
    [DictionaryKeys.chatLink]: 'Start the chat right now! 😜'
};

export enum Language {
    en = 'en'
}

const Localization: { [key: string]: any } = {
    [Language.en]: en
};
export default Localization;
