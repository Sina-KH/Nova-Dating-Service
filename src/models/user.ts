import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { ITag } from '@/models/tag';

export enum IUserGender {
    male = 'male',
    female = 'female'
}

export enum IUserRole {
    superAdmin = 'superAdmin'
}

export enum IUserStatus {
    active = 1,
    inactive = 2
}

export interface IUserSearchFilters {
    searchInterests: Identifier<ITag>[];
    searchGenders: IUserGender[];
    searchAgeFrom?: number;
    searchAgeTo?: number;
}

export interface IUser {
    _id: Identifier<IUser>;
    pID: Identifier<IUser>;
    status: IUserStatus;

    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;

    photo: Schema.Types.Mixed;
    birthdate: Date;
    gender: IUserGender;
    interests: Identifier<ITag>[];

    searchFilters: IUserSearchFilters;

    createdAt: Date;
    lastVisit: Date;

    roles: IUserRole[];
    to?: (props: IUserProps) => Partial<IUser>;
}

const userSchema = new Schema<IUser>(
    {
        _id: String,
        pID: String,
        status: { type: Number, index: true, default: IUserStatus.active },

        firstName: String,
        lastName: String,
        username: String,
        languageCode: String,

        photo: Schema.Types.Mixed,
        birthdate: Date,
        gender: String,
        interests: [String],

        searchFilters: {
            searchInterests: [String],
            searchGenders: [String],
            searchAgeFrom: Number,
            searchAgeTo: Number
        },

        roles: { type: [String] },
        createdAt: Date,
        lastVisit: Date
    },
    {
        timestamps: false,
        versionKey: false
    }
);
userSchema.methods.to = schemaToProps;
userSchema.index({
    _id: 1,
    status: 1
});

export const UserModel = model<IUser>('user', userSchema);

export enum IUserProps {
    _id = '_id',
    system = '_id status roles lastVisit',
    self = '_id firstName lastName username languageCode photo birthdate gender interests',
    public = 'pID firstName lastName username photo gender interests',
    matchedUsers = '_id pID firstName lastName username photo gender interests',
    searchFilters = 'searchInterests searchGenders'
}
