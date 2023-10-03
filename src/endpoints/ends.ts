import UserGetTokenEnd from '@/endpoints/user/getTokenEnd';
import ProfileEditEnd from '@/endpoints/profile/editEnd';
import ProfileSetGenderEnd from '@/endpoints/profile/setGenderEnd';
import ProfileSetInterestsEnd from '@/endpoints/profile/setInterestsEnd';
import ProfileSetSearchFiltersEnd from '@/endpoints/profile/setSearchFiltersEnd';
import FileGetEnd from '@/endpoints/file/getEnd';
import TagListEnd from '@/endpoints/tag/listEnd';
import ExploreUsersEnd from '@/endpoints/explore/usersEnd';

const Ends = [
    UserGetTokenEnd,
    ProfileEditEnd,
    ProfileSetGenderEnd,
    ProfileSetInterestsEnd,
    ProfileSetSearchFiltersEnd,
    FileGetEnd,
    TagListEnd,
    ExploreUsersEnd
];

export default Ends;
