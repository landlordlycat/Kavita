export interface FileDimension {
    pageNumber: number;
    width: number;
    height: number;
}

export type DimensionMap = {[key: number]: {width: number, height: number, isWide: boolean}};