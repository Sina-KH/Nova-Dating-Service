import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender, IUserProps, IUserStatus, UserModel } from '@/models/user';
import { ITag } from '@/models/tag';
import { UpdateQuery } from 'mongoose';

async function findByID(userID: Identifier<IUser>, props: IUserProps | string) {
    return UserModel.findOne(
        {
            _id: userID,
            status: IUserStatus.active
        },
        props
    );
}

async function upsert(userData: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}) {
    const userID = 't_' + userData.id.toString();
    const existingUser = await UserModel.findOneAndUpdate(
        {
            _id: userID
        },
        {
            languageCode: userData.language_code
        },
        {
            new: true
        }
    );
    if (existingUser) return existingUser;
    return UserModel.create({
        _id: userID,
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        languageCode: userData.language_code
    });
}

async function setGender(userID: Identifier<IUser>, gender: IUserGender) {
    await UserModel.updateOne(
        {
            _id: userID
        },
        {
            gender: gender
        }
    );
}

async function setInterests(userID: Identifier<IUser>, interests: Identifier<ITag>[]) {
    await UserModel.updateOne(
        {
            _id: userID
        },
        {
            interests
        }
    );
}

async function edit(
    userID: Identifier<IUser>,
    firstName: string,
    lastName: string,
    birthdate: Date,
    profilePhotoObj?: object
) {
    let update: UpdateQuery<IUser> = {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate
    };
    if (profilePhotoObj) update.photo = profilePhotoObj;
    await UserModel.updateOne(
        {
            _id: userID
        },
        update
    );
}

const UserRepo = {
    findByID,
    upsert,
    setGender,
    setInterests,
    edit
};
export default UserRepo;
