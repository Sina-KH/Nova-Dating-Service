import { ITag, ITagProps, ITagStatus, ITagType, TagModel } from '@/models/tag';

async function upsert(doc: ITag) {
    return TagModel.findOneAndUpdate(
        {
            _id: doc._id
        },
        doc,
        {
            new: true,
            upsert: true
        }
    );
}

async function list(type: ITagType, language: string) {
    const arr = await TagModel.find(
        {
            type,
            status: ITagStatus.active
        },
        ITagProps.general
    ).lean();
    return arr.map((it) => {
        return {
            ...it,
            name: it.names[language] || it.names['en'],
            names: undefined
        };
    });
}

const TagRepo = {
    upsert,
    list
};
export default TagRepo;
