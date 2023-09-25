import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import { fileUploadLogic } from '@/logic/file/fileUploadLogic';
import { IFileType, IFileUseType } from '@/models/file';

export async function profileEditLogic(
    userID: Identifier<IUser>,
    firstName: string,
    lastName: string,
    birthdate: Date,
    photo: any
) {
    const profilePhotoObj = photo
        ? await fileUploadLogic(photo, IFileType.image, IFileUseType.profilePhoto, userID)
        : undefined;
    await UserRepo.edit(userID, firstName, lastName, birthdate, profilePhotoObj);
}
