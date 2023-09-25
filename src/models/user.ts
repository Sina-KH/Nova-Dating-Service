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

export interface IUser {
    _id: Identifier<IUser>;
    status: IUserStatus;

    firstName: string;
    lastName: string;
    username: string;
    languageCode: string;

    photo: Schema.Types.Mixed;
    birthdate: Date;
    gender: IUserGender;
    interests: Identifier<ITag>[];

    createdAt: Date;
    roles: IUserRole[];
    to?: (props: IUserProps) => Partial<IUser>;
}

const userSchema = new Schema<IUser>(
    {
        _id: String,
        status: { type: Number, index: true },

        firstName: String,
        lastName: String,
        username: String,
        languageCode: String,

        photo: Schema.Types.Mixed,
        birthdate: Date,
        gender: String,
        interests: [String],

        roles: { type: [String] },
        createdAt: Date
    },
    {
        timestamps: false,
        versionKey: false
    }
);
userSchema.methods.to = schemaToProps;
userSchema.index({
    telegramID: 1,
    status: 1
});

export const UserModel = model<IUser>('user', userSchema);

export enum IUserProps {
    system = '_id status roles',
    self = '_id firstName lastName username languageCode photo birthdate gender'
}
