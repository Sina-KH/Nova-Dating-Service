import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { userNotifyLogic } from '@/logic/notify/userNotifyLogic';
import MatchRepo from '@/repos/matchRepo';
import { IMatchProps } from '@/models/match';

// called whenever two users are newly matched
export async function matchHappenedLogic(userIDs: Identifier<IUser>[]) {
    const match = await MatchRepo.findByUsers(userIDs[0], userIDs[1], IMatchProps.users, IUserProps.matchedUsers);

    // TODO:: send each user a message on robot

    // send match object on socket io
    for (const userID of userIDs) {
        await userNotifyLogic(userID, {
            event: 'match',
            data: {
                match: match
            }
        });
    }
}
