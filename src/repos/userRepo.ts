import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserGender, IUserProps, IUserStatus, UserModel } from '@/models/user';

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

const UserRepo = {
    findByID,
    upsert,
    setGender
};
export default UserRepo;
