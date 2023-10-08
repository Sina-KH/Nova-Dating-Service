import { IMatch, IMatchProps, IMatchStatus, MatchModel } from '@/models/match';
import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { FilterQuery } from 'mongoose';

async function upsert(doc: IMatch) {
    return MatchModel.findOneAndUpdate(
        {
            firstUser: doc.firstUser,
            secondUser: doc.secondUser,
            status: doc.status
        },
        doc,
        {
            upsert: true
        }
    );
}

async function unMatch(firstUser: Identifier<IUser>, secondUser: Identifier<IUser>) {
    return MatchModel.updateOne(
        {
            firstUser: firstUser,
            secondUser: secondUser,
            status: IMatchStatus.matched
        },
        {
            status: IMatchStatus.unmatched
        }
    );
}

export async function findByUsers(
    firstUser: Identifier<IUser>,
    secondUser: Identifier<IUser>,
    props: IMatchProps,
    userProps: IUserProps | string
): Promise<Partial<IMatch>[]> {
    return MatchModel.aggregate([
        {
            $match: {
                firstUser,
                secondUser,
                status: IMatchStatus.matched
            }
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: 'users',
                let: { firstUser: '$firstUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$firstUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'firstUser'
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { secondUser: '$secondUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$secondUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'secondUser'
            }
        },
        {
            $project: props.split(' ').reduce((pValue, cValue) => {
                return { ...pValue, [cValue]: 1 };
            }, {})
        }
    ]);
}

async function findByUser(
    userID: Identifier<IUser>,
    before: ObjectIDType<IMatch> | undefined,
    props: IMatchProps,
    userProps: IUserProps
) {
    const matchFilters: FilterQuery<IMatch> = {
        $or: [{ firstUser: userID }, { secondUser: userID }],
        status: IMatchStatus.matched
    };
    if (before) matchFilters._id = { $lt: before };
    return MatchModel.aggregate([
        {
            $match: matchFilters
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: 'users',
                let: { firstUser: '$firstUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$firstUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'firstUser'
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { secondUser: '$secondUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$secondUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'secondUser'
            }
        },
        {
            $project: props.split(' ').reduce((pValue, cValue) => {
                return { ...pValue, [cValue]: 1 };
            }, {})
        }
    ]);
}

const ReactionRepo = {
    upsert,
    unMatch,
    findByUsers,
    findByUser
};
export default ReactionRepo;
