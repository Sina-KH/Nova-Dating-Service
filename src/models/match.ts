import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export interface IMatch {
    _id?: Schema.Types.ObjectId;

    firstUser: Identifier<IUser>;
    secondUser: Identifier<IUser>;

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: IMatchProps) => Partial<IMatch>;
}

const matchSchema = new Schema<IMatch>(
    {
        firstUser: String,
        secondUser: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);
matchSchema.methods.to = schemaToProps;

export const MatchModel = model<IMatch>('match', matchSchema);

export enum IMatchProps {}
