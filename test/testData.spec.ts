const USER_1 = 't_12345';
const USER_2 = 't_123456';

export default {
    users: [
        {
            _id: USER_1,
            pID: 'user1_public_identifier',
            firstName: 'Sina',
            lastName: 'Khalili',
            languageCode: 'en',
            gender: 'male',
            status: 1,
            searchFilters: {
                searchInterests: ['i_photography'],
                searchGenders: ['female']
            }
        },
        {
            _id: USER_2,
            pID: 'user2_public_identifier',
            firstName: 'Micheal',
            lastName: 'Ananas',
            languageCode: 'en',
            gender: 'female',
            status: 1,
            searchFilters: {
                searchInterests: ['i_photography'],
                searchGenders: ['male']
            }
        }
    ],
    tags: [
        {
            _id: 'i_cats',
            type: 1,
            names: {
                en: 'Cats'
            },
            icon: '/assets/images/tags/i_cats.png',
            status: 1
        }
    ]
};
