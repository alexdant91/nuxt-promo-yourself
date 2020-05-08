const commands = {
    "DELETE_BLOG": "DELETE_BLOG",
    "EDIT_BLOG": "EDIT_BLOG",
    "DELETE_DRAFT": "DELETE_DRAFT",
    "EDIT_DRAFT": "EDIT_DRAFT",
    "TOGGLE_FEATURE": "TOGGLE_FEATURE",
}

const createOption = (name, command) => ({ name, command });

const EDIT_BLOG = createOption('Edit Blog', commands.EDIT_BLOG);
const DELETE_BLOG = createOption('Delete Blog', commands.DELETE_BLOG);
const FEATURE_BLOG = createOption('Feature Blog', commands.TOGGLE_FEATURE);
const UN_FEATURE_BLOG = createOption('Un-Feature Blog', commands.TOGGLE_FEATURE);

const EDIT_DRAFT = createOption('Edit Draft', commands.EDIT_DRAFT);
const DELETE_DRAFT = createOption('Delete Draft', commands.DELETE_DRAFT);

export const draftedOptions = () => [EDIT_DRAFT, DELETE_DRAFT];
export const publishedOptions = (isFeatured) => {
    const options = [EDIT_BLOG, DELETE_BLOG];
    isFeatured ? options.push(UN_FEATURE_BLOG) : options.push(FEATURE_BLOG)
    return options;
}