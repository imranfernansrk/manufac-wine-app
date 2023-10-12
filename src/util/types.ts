export interface StatisticsTypes {
    mean: number,
    median: number,
    mode: number[],
}

export interface TableType {
    mean: string,
    median: string,
    mode: string[],
}

export interface StatisticsDataType {
    [key: string]: StatisticsTypes
}