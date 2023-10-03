import { IReaction, IReactionProps, ReactionModel } from '@/models/reaction';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

async function upsert(doc: IReaction) {
    return ReactionModel.findOneAndUpdate(
        {
            firstUser: doc.firstUser,
            secondUser: doc.secondUser
        },
        doc,
        {
            new: true,
            upsert: true
        }
    );
}

async function findByFirstUser(firstUserID: Identifier<IUser>, props: IReactionProps) {
    return ReactionModel.find(
        {
            firstUser: firstUserID
        },
        props
    );
}

const ReactionRepo = {
    upsert,
    findByFirstUser
};
export default ReactionRepo;
