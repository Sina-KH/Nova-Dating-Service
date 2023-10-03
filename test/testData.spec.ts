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
            _id: 'i_photography',
            type: 1,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.41693 2.02087C6.55103 1.75267 6.82516 1.58325 7.12502 1.58325H11.875C12.1749 1.58325 12.449 1.75267 12.5831 2.02087L13.5518 3.95825H16.2292C17.3222 3.95825 18.2084 4.84436 18.2084 5.93742V15.4374C18.2084 16.5305 17.3222 17.4166 16.2292 17.4166H2.77085C1.67779 17.4166 0.791687 16.5305 0.791687 15.4374V5.93742C0.791687 4.84436 1.67779 3.95825 2.77085 3.95825H5.44824L6.41693 2.02087ZM7.21846 3.95825H11.7816L11.3857 3.16659H7.6143L7.21846 3.95825ZM2.77085 5.54159C2.55224 5.54159 2.37502 5.71881 2.37502 5.93742V15.4374C2.37502 15.656 2.55224 15.8333 2.77085 15.8333H16.2292C16.4478 15.8333 16.625 15.656 16.625 15.4374V5.93742C16.625 5.71881 16.4478 5.54159 16.2292 5.54159H2.77085ZM5.54169 10.6874C5.54169 8.50128 7.31388 6.72909 9.50002 6.72909C11.6862 6.72909 13.4584 8.50128 13.4584 10.6874C13.4584 12.8736 11.6862 14.6458 9.50002 14.6458C7.31388 14.6458 5.54169 12.8736 5.54169 10.6874ZM9.50002 8.31242C8.18833 8.31242 7.12502 9.37573 7.12502 10.6874C7.12502 11.9991 8.18833 13.0624 9.50002 13.0624C10.8117 13.0624 11.875 11.9991 11.875 10.6874C11.875 9.37573 10.8117 8.31242 9.50002 8.31242Z"/>\n</svg>',
            names: {
                en: 'Photography'
            },
            status: 1
        }
    ]
};
