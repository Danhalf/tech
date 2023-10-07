export type SortType = 'asc' | 'desc';

export interface UserQuery {
    skip?: number;
    top?: number;
    column?: 'username' | string;
    qry?: string;
    type?: SortType;
}

export interface SortParams {
    type: SortType;
}

export interface ServicesSortParams extends SortParams {
    column: 'name';
}
