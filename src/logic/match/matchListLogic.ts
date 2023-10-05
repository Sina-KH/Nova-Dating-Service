import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { IMatch, IMatchProps } from '@/models/match';
import MatchRepo from '@/repos/matchRepo';

export async function matchListLogic(userID: Identifier<IUser>, before?: ObjectIDType<IMatch>) {
    const matches = await MatchRepo.findByUser(userID, before, IMatchProps.users, IUserProps.matchedUsers);
    return {
        matches
    };
}
