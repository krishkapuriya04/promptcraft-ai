function parseCommaList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildProjectQuery({ userId, query }) {
  const {
    search = "",
    categories = "",
    themes = "",
    tags = "",
    favorite,
    dateFrom,
    dateTo,
  } = query;

  const filters = { userId };
  const andClauses = [];

  if (search) {
    const regex = new RegExp(search, "i");
    andClauses.push({
      $or: [{ name: regex }, { prompt: regex }, { description: regex }],
    });
  }

  const categoryList = parseCommaList(categories);
  if (categoryList.length) {
    andClauses.push({ category: { $in: categoryList } });
  }

  const themeList = parseCommaList(themes);
  if (themeList.length) {
    andClauses.push({ theme: { $in: themeList } });
  }

  const tagList = parseCommaList(tags);
  if (tagList.length) {
    andClauses.push({ tags: { $in: tagList } });
  }

  if (favorite === "true" || favorite === "false") {
    andClauses.push({ isFavorite: favorite === "true" });
  }

  if (dateFrom || dateTo) {
    const dateFilter = {};
    if (dateFrom) dateFilter.$gte = new Date(dateFrom);
    if (dateTo) dateFilter.$lte = new Date(dateTo);
    andClauses.push({ createdAt: dateFilter });
  }

  if (andClauses.length) {
    filters.$and = andClauses;
  }

  return filters;
}

function buildProjectSort(sortBy = "updatedAt", sortOrder = "desc") {
  const allowedSortFields = new Set([
    "createdAt",
    "updatedAt",
    "name",
    "lastOpenedAt",
    "category",
  ]);
  const field = allowedSortFields.has(sortBy) ? sortBy : "updatedAt";
  const direction = sortOrder === "asc" ? 1 : -1;
  return { [field]: direction };
}

function buildPagination(query) {
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || "12", 10), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

module.exports = { buildProjectQuery, buildProjectSort, buildPagination };
