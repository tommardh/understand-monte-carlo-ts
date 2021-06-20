import type { IColumn } from './iColumn';

export interface IChartData {
    type: string;
    theme?: string;
    x?: string;
    columns: IColumn[];
}
