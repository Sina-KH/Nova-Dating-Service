import { Types } from 'mongoose';

const USER_1 = new Types.ObjectId('000000000000111111111111');

export default {
    users: [
        {
            _id: USER_1,
            telegramID: '12345',
            firstName: 'Sina',
            lastName: 'Khalili',
            languageCode: 'en'
        }
    ]
};
