import { webcrypto } from 'crypto';
import { Exceptions } from '@/helpers/exceptions';
import UserRepo from '@/repos/userRepo';
import { IUserProps } from '@/models/user';
import { signJWTToken } from '@/helpers/jwtHelpers';

interface TelegramInitData {
    user: string;
}
interface TelegramInitDataUser {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export async function getTokenLogic(hash: string) {
    const data = Object.fromEntries(new URLSearchParams(hash));
    const isValid = await isHashValid(data, process.env.BOT_TOKEN || '');
    if (!isValid) throw new Error(Exceptions.badRequest);

    const userData = (<TelegramInitData>(<unknown>data))?.user;
    if (!userData) throw new Error();
    const user = await UserRepo.upsert(<TelegramInitDataUser>JSON.parse(userData));
    const token = await signJWTToken({
        userID: user._id,
        lang: user.languageCode,
        exp: Math.floor(new Date().getTime() / 1000) + 10 * 60 * 60
    });

    return {
        session: {
            token
        },
        user: user.to!(IUserProps.self)
    };
}

async function isHashValid(data: Record<string, string>, botToken: string) {
    if (process.env.DOCS_ENV === 'true') return true;

    const encoder = new TextEncoder();

    const checkString = Object.keys(data)
        .filter((key) => key !== 'hash')
        .map((key) => `${key}=${data[key]}`)
        .sort()
        .join('\n');

    const secretKey = await webcrypto.subtle.importKey(
        'raw',
        encoder.encode('WebAppData'),
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign']
    );

    const secret = await webcrypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));

    const signatureKey = await webcrypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, true, [
        'sign'
    ]);

    const signature = await webcrypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));

    const hex = Buffer.from(signature).toString('hex');

    return data.hash === hex;
}
