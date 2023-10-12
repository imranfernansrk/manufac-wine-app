import React, { useEffect, useState } from 'react';
import CustomTable from "../../components/CustomTable/CustomTable";
import { StatisticsTypes, StatisticsDataType } from "../../util/types";
import rawWineData from "../../util/wineData.json";
import { StatisticsCalc } from "../../util/StatisticsCalc";

import './Dashboard.css';

function Dashboard() {
    const [wineData, setWineData] = useState<{ [key: string]: any }[]>([]);
    const [flavanoidsData, setFlavanoidsData] = useState<StatisticsDataType>({});
    const [gammaData, setGammaData] = useState<StatisticsDataType>({});

    useEffect(() => {
        setWineData(rawWineData);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (wineData && wineData.length > 0) {
            let flavanoidsClasses: any = {};
            let gammaClasses: any = {};
            wineData.forEach(data => {
                //Classify the Alcohol class and store the values of flavanoids and gamma
                const alcoholClass = `Class ${data.Alcohol}`;
                if (!flavanoidsClasses[alcoholClass]) {
                    flavanoidsClasses[alcoholClass] = [];
                }
                const flavanoidsValue = checkAndConvertNumber(data.Flavanoids);
                flavanoidsClasses[alcoholClass] = [...flavanoidsClasses[alcoholClass], flavanoidsValue];

                if (!gammaClasses[alcoholClass]) {
                    gammaClasses[alcoholClass] = [];
                }
                const gammaValue = getGammaValue(data);
                gammaClasses[alcoholClass] = [...gammaClasses[alcoholClass], gammaValue];
            });
            const flavanoidsTableData: StatisticsDataType = getTableDataFormat(flavanoidsClasses);
            setFlavanoidsData(flavanoidsTableData);
            const gammaTableData: StatisticsDataType = getTableDataFormat(gammaClasses);
            setGammaData(gammaTableData);
        }
        // eslint-disable-next-line
    }, [wineData]);

    //This function is used to convert the number if value is not integer
    const checkAndConvertNumber = (value: any): number => {
        const numValue = typeof value === "number" ? value :
            Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
        return numValue;
    }

    //This function is used to calculate the gamma property: (Ash * Hue) / Magnesium
    const getGammaValue = (data: any): number => {
        const ashValue = checkAndConvertNumber(data.Ash);
        const hueValue = checkAndConvertNumber(data.Hue);
        const magnesiumValue = checkAndConvertNumber(data.Magnesium);
        const gammaValue = (ashValue * hueValue) / magnesiumValue;
        return gammaValue;
    }

    //This function is used to convert the plain array into statistics values for table's content
    const getTableDataFormat = (data: { [key: string]: any }): StatisticsDataType => {
        const tableData: StatisticsDataType = {};
        Object.keys(data).forEach(alcoholClass => {
            const values = data[alcoholClass];
            const statValues: StatisticsTypes = StatisticsCalc.getStatisticsValues(values);
            tableData[alcoholClass] = statValues;
        });
        return tableData;
    }

    return (
        <div className="dashboard-root">
            <CustomTable key="flavanoids" measureName="Flavanoids" tableData={flavanoidsData} />
            <CustomTable key="gamma" measureName="Gamma" tableData={gammaData} />
        </div>
    )
}

export default Dashboard;