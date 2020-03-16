const commands = {
    "DELETE_BLOG": "DELETE_BLOG",
    "EDIT_BLOG": "EDIT_BLOG",
    "DELETE_DRAFT": "DELETE_DRAFT",
    "EDIT_DRAFT": "EDIT_DRAFT",
}

const createOption = (name, command) => ({ name, command });

const EDIT_BLOG = createOption('Edit Blog', commands.EDIT_BLOG);
const DELETE_BLOG = createOption('Delete Blog', commands.DELETE_BLOG);

const EDIT_DRAFT = createOption('Edit Draft', commands.EDIT_DRAFT);
const DELETE_DRAFT = createOption('Delete Draft', commands.DELETE_DRAFT);

export const draftedOptions = () => [EDIT_DRAFT, DELETE_DRAFT];
export const publishedOptions = () => [EDIT_BLOG, DELETE_BLOG];