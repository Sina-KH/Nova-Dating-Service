import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { userNotifyLogic } from '@/logic/notify/userNotifyLogic';
import MatchRepo from '@/repos/matchRepo';
import { IMatchProps } from '@/models/match';
import { sendBotMessage } from '@/logic/bot/sendBotMessage';
import { localized } from '@/helpers/stringHelpers';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';
import { Language } from '@/helpers/localization';
import { IFile } from '@/models/file';

// called whenever two users are newly matched
export async function matchHappenedLogic(userIDs: Identifier<IUser>[]) {
    const matches = await MatchRepo.findByUsers(
        userIDs[0],
        userIDs[1],
        IMatchProps.users,
        // languageCode is used to create bot messages and will be removed from final response
        IUserProps.matchedUsers + ' languageCode'
    );
    if (!matches.length) throw new Error();
    const match = matches[0];

    // extract and remove language codes from final response
    const languageCodes = {
        [(<Partial<IUser>>match.firstUser)._id!]: (<Partial<IUser>>match.firstUser).languageCode,
        [(<Partial<IUser>>match.secondUser)._id!]: (<Partial<IUser>>match.secondUser).languageCode
    };
    delete (<Partial<IUser>>match.firstUser).languageCode;
    delete (<Partial<IUser>>match.secondUser).languageCode;
    const peerUsers = {
        [(<Partial<IUser>>match.firstUser)._id!]: <Partial<IUser>>match.secondUser,
        [(<Partial<IUser>>match.secondUser)._id!]: <Partial<IUser>>match.firstUser
    };

    // send match object on socket io
    for (const userID of userIDs) {
        await userNotifyLogic(userID, {
            event: 'match',
            data: {
                match: match
            }
        });

        // prepare match text message
        const peerUser = peerUsers[userID];
        const peerUserFullName = ((peerUser.firstName || '') + ' ' + (peerUser.lastName || '')).trim();

        // mark-down link to peer user
        const connectionLink = peerUser._id?.startsWith('t_')
            ? '[' + peerUserFullName + '](tg://user?id=' + peerUser._id?.substring(2) + ')'
            : peerUserFullName;

        // message to send
        const message =
            localized(DictionaryKeys.youGotAMatch, <Language>languageCodes[userID]) + '\n\n' + connectionLink;

        // prepare photo data
        const peerPhotoHash = (<IFile>(<unknown>peerUser.photo))?.hash;
        const peerPhotoURL = peerPhotoHash ? process.env.API_PATH + `file?hash=${peerPhotoHash}` : undefined;

        // trigger bot message send
        sendBotMessage(userID, { text: message, photo: { photoURL: peerPhotoURL } }, 'Markdown')
            .then(() => {})
            .catch((e) => {
                console.log(e);
            });
    }
}
