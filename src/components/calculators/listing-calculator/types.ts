export interface PaginationParams {
	page: number;
	size: number;
}

export interface PaginationResult<Result> {
	results: Result[];
	page: number;
	total: number;
}
