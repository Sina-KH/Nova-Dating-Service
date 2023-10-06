import { Identifier } from '@/helpers/aliases';
import { IUser, IUserStatus } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import { ITag, ITagType } from '@/models/tag';
import { tagValidationLogic } from '@/logic/tag/tagValidationLogic';

export async function setInterestsLogic(userID: Identifier<IUser>, interests: Identifier<ITag>[]) {
    await tagValidationLogic(interests, ITagType.interests);
    const updatedUser = await UserRepo.setInterests(userID, interests);
    if (!updatedUser) throw new Error();

    // check if user data is completed, and set user status active
    const isUserDataCompleted =
        (updatedUser.firstName || updatedUser.lastName) &&
        updatedUser.birthdate &&
        updatedUser.gender &&
        updatedUser.interests.length;
    if (isUserDataCompleted) {
        await UserRepo.setStatus(userID, IUserStatus.active);
    }
}
