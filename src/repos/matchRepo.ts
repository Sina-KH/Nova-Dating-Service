import { IMatch, IMatchProps, IMatchStatus, MatchModel } from '@/models/match';
import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';

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
    userProps: IUserProps
) {
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
                let: { secondUser: '$firstUser' },
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
    findByUsers
};
export default ReactionRepo;
