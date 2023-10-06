import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender, IUserProps, IUserSearchFilters, IUserStatus, UserModel } from '@/models/user';
import { ITag } from '@/models/tag';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { newUUID } from '@/helpers/stringHelpers';
import { ageToDate, calculateAge } from '@/helpers/dateHelpers';

async function findByID(userID: Identifier<IUser>, props: IUserProps | string) {
    return UserModel.findOne(
        {
            _id: userID,
            status: IUserStatus.active
        },
        props
    );
}

async function findByPublicID(userID: Identifier<IUser>, props: IUserProps | string) {
    return UserModel.findOne(
        {
            pID: userID,
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
        pID: newUUID(),
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

async function setInterests(userID: Identifier<IUser>, interests: Identifier<ITag>[], props: IUserProps) {
    return UserModel.findOneAndUpdate(
        {
            _id: userID
        },
        {
            interests
        },
        {
            new: true,
            projection: props
        }
    );
}

async function setStatus(userID: Identifier<IUser>, status: IUserStatus) {
    return UserModel.findOneAndUpdate(
        {
            _id: userID
        },
        {
            status
        },
        {
            new: true
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

async function setSearchFilters(userID: Identifier<IUser>, searchFilters: IUserSearchFilters) {
    await UserModel.updateOne(
        {
            _id: userID
        },
        {
            searchFilters
        }
    );
}

interface SearchProps {
    excludeIdentifiers?: Identifier<IUser>[];
    searchInterests?: Identifier<ITag>[];
    searchGenders?: IUserGender[];
    searchAgeFrom?: number;
    searchAgeTo?: number;
}
async function search({
    excludeIdentifiers,
    searchInterests,
    searchGenders,
    searchAgeFrom,
    searchAgeTo
}: SearchProps): Promise<Partial<IUser>[]> {
    const filters: FilterQuery<IUser> = {
        status: IUserStatus.active
    };
    if (excludeIdentifiers?.length) filters._id = { $nin: excludeIdentifiers };
    if (searchInterests?.length) {
        filters.interests = { $in: searchInterests };
    }
    if (searchGenders?.length) {
        filters.gender = { $in: searchGenders };
    }
    if (searchAgeFrom) {
        filters.birthdate = { $lte: ageToDate(searchAgeFrom) };
    }
    if (searchAgeTo) {
        filters.birthdate = {
            ...filters.birthdate,
            $gte: ageToDate(searchAgeTo)
        };
    }
    const users = await UserModel.find(filters, IUserProps.public + ' birthdate')
        .sort({ updatedAt: -1 })
        .limit(10)
        .lean();
    return users.map((it) => {
        return {
            ...it,
            age: it.birthdate ? calculateAge(it.birthdate) : undefined
        };
    });
}

const UserRepo = {
    findByID,
    findByPublicID,
    upsert,
    setGender,
    setInterests,
    setStatus,
    edit,
    setSearchFilters,

    search
};
export default UserRepo;
