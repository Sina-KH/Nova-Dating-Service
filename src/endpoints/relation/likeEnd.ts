import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';

interface IRelationLikeEndInput extends IEndInput {}

interface IRelationLikeEndResponse {}

const RelationLikeEnd: IEnd<IRelationLikeEndInput, IRelationLikeEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/relation/like',
    schema: {
        body: {
            type: 'object',
            properties: {
                // INPUT_VALIDATION_HERE
            },
            required: []
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IRelationLikeEndInput
    ): Promise<IEndOutput<IRelationLikeEndResponse>> {
        // LOGIC_HERE
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Like a user',
        description: 'Called when a user likes another user',
        sampleInput: {}
    }
};

export default RelationLikeEnd;
