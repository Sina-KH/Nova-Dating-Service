import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { ITelegramUpdate } from '@/models/types/telegramTypes';
import { receivedBotUpdate } from '@/logic/bot/receivedBotUpdate';

interface IHookTelegramEndInput extends IEndInput, ITelegramUpdate {}

interface IHookTelegramEndResponse {}

const HookTelegramEnd: IEnd<IHookTelegramEndInput, IHookTelegramEndResponse> = {
    configuration: {
        access: IEndConfigAccess.public
    },
    method: IEndMethod.POST,
    url: '/hook/telegram_' + process.env.TELEGRAM_HOOK_KEY,
    schema: {
        body: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IHookTelegramEndInput
    ): Promise<IEndOutput<IHookTelegramEndResponse>> {
        await receivedBotUpdate({
            telegramUpdate: input
        });
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Telegram Bot Hook',
        description: 'Endpoint to receive telegram bot updates',
        sampleInput: {
            update_id: 1,
            message: {
                message_id: 0,
                date: 0,
                chat: {
                    id: 0,
                    type: 'private'
                }
            }
        }
    }
};

export default HookTelegramEnd;
