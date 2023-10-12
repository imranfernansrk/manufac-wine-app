import React, { useEffect, useState } from 'react';

import { TableType, StatisticsDataType } from "../../util/types";

import './CustomTable.css';

interface Props {
    measureName: string,
    tableData: StatisticsDataType
}

function CustomTable(props: Props) {
    const [tableName, setTableName] = useState<string>('');
    const [tableHeaders, setTableHeaders] = useState<string[]>([]);
    const [tableContent, setTableContent] = useState<TableType[]>([]);

    useEffect(() => {
        const { measureName, tableData } = props;
        const headers: string[] = Object.keys(tableData);
        const content: TableType[] = headers.map(headerName => {
            const { mean, median, mode } = tableData[headerName];
            //This session used to rounded off the values to 3 decimal places
            return {
                mean: mean.toFixed(3),
                median: median.toFixed(3),
                mode: mode.map(val => val.toFixed(3)),
            }
        });
        setTableName(measureName);
        setTableHeaders(headers);
        setTableContent(content);
    }, [props]);

    return (
        <div className="table-container">
            {tableContent && tableContent.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-header">Measure</th>
                            {tableHeaders.map((headerName: string, idx: number) => <th key={idx} className="table-header">{headerName}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-header">{tableName} Mean</td>
                            {tableContent.map((content: TableType, idx: number) => <td key={idx} className="table-data">{content.mean}</td>)}
                        </tr>
                        <tr>
                            <td className="table-header">{tableName} Median</td>
                            {tableContent.map((content: TableType, idx: number) => <td key={idx} className="table-data">{content.median}</td>)}
                        </tr>
                        <tr>
                            <td className="table-header">{tableName} Mode</td>
                            {tableContent.map((content: TableType, idx: number) => <td key={idx} className="table-data">{content.mode.join(', ')}</td>)}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>No {tableName} Data</div>
            )}
        </div>
    )
}

export default CustomTable;