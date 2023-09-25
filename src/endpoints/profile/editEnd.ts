import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IUserGender } from '@/models/user';
import { setGenderLogic } from '@/logic/profile/setGenderLogic';
import { profileEditLogic } from '@/logic/profile/editLogic';

interface IProfileEditEndInput extends IEndInput {
    firstName: string;
    lastName: string;
    birthdate: string;
    photo: any;
}

interface IProfileEditEndResponse {}

const ProfileEditEnd: IEnd<IProfileEditEndInput, IProfileEditEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/profile/edit',
    schema: {
        body: {
            type: 'object',
            properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                birthdate: { type: 'string', format: 'date-time' },
                photo: { type: 'object' }
            },
            required: ['firstName', 'lastName', 'birthdate']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IProfileEditEndInput
    ): Promise<IEndOutput<IProfileEditEndResponse>> {
        await profileEditLogic(
            heads.loginObj!.userID!,
            input.firstName,
            input.lastName,
            new Date(input.birthdate),
            input.photo
        );
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Set Gender',
        description: 'Set gender in profile',
        sampleInput: {
            firstName: 'Sina',
            lastName: 'KH',
            birthdate: new Date(new Date().getTime() - 27 * 365 * 24 * 60 * 60 * 1000).toISOString(),
            photo: 'FORM_DATA__PROFILE_IMAGE_HERE'
        }
    }
};

export default ProfileEditEnd;
