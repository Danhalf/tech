export const RecordsPerPageSteps = [5, 10, 15, 20] as const;

export type RecordsPerPage = typeof RecordsPerPageSteps[number];
export const DefaultRecordsPerPage: RecordsPerPage = RecordsPerPageSteps[1];

export const VisiblePageCount = 3;
