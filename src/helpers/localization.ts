import { Exceptions } from './exceptions';

const en = {
    [Exceptions.notAuthorized]: 'You are not authorized',
    [Exceptions.badRequest]: 'Bad Request',
}

export enum Language {
    en = 'en',
}

const Localization: { [key: string]: any } = {
    [Language.en]: en,
};
export default Localization;
