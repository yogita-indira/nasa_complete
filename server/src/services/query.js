const DEFAULT_PAGE_LIMIT = 1;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
    const limit = Math.abs(query.limit);
    const page = Math.abs(query.page);
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    };
}

export default getPagination;
