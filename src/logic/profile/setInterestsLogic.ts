import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import { ITag, ITagType } from '@/models/tag';
import { tagValidationLogic } from '@/logic/tag/tagValidationLogic';

export async function setInterestsLogic(userID: Identifier<IUser>, interests: Identifier<ITag>[]) {
    await tagValidationLogic(interests, ITagType.interests);
    await UserRepo.setInterests(userID, interests);
}
