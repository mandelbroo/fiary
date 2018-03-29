module.exports = (collection) => {
	return {
		length: collection.length,
		totalCount: collection.pagination.rowCount,
		totalPages: collection.pagination.pageCount,
		collection: collection
	}
}
