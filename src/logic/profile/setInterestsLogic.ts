import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import { ITag } from '@/models/tag';

export async function setInterestsLogic(userID: Identifier<IUser>, interests: Identifier<ITag>[]) {
    await UserRepo.setInterests(userID, interests);
}
