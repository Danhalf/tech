export type SortType = 'ASC' | 'DESC';

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

export interface UserSortParams extends SortParams {
    column: 'username';
}

export interface ServicesSortParams extends SortParams {
    column: 'name';
}
