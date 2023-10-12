import { StatisticsTypes } from "./types";

export class StatisticsCalc {
    /**
     * Returns the Mean value for given array.
     * @param arrayOfNumbers - An array of number. 
     */
    private static getMeanValue(values: number[]): number {
        //Sum all values in the array and get the average value by divide it with length of array.
        const meanValue: number = values.reduce((total, val) => total + val, 0) / values.length;
        return meanValue;
    }

    /**
     * Returns the Median value for given array.
     * @param arrayOfNumbers - An array of number. 
     */
    private static getMedianValue(values: number[]): number {
        const sortedValues = values.sort();
        const valuesLength = sortedValues.length;
        let medianValue: number;
        if (valuesLength % 2 === 0) {
            //Get average of two middle values if given array is even length
            medianValue = (sortedValues[valuesLength / 2 - 1] + sortedValues[valuesLength / 2]) / 2;
        } else {
            //Get middle value if given array is odd length
            medianValue = sortedValues[Math.floor(valuesLength / 2)];
        }
        return medianValue;
    }

    /**
     * Returns the Mode value for given array.
     * @param arrayOfNumbers - An array of number. 
     */
    private static getModeValue(values: number[]): number[] {
        const valueCountsObj: { [key: string]: number } = {};
        //Storing counts of each value occurance in the values array
        values.forEach(key => (valueCountsObj[key] = valueCountsObj[key] + 1 || 1));

        let modes: number[] = [];
        let max = 0;
        //Checking and store the maximum counts of occurance in the modeCounts
        for (const key in valueCountsObj) {
            const value = parseFloat(key);
            const count = valueCountsObj[key];
            if (count > max) {
                modes = [value];
                max = count;
            } else if (count === max) modes.push(value);
        }
        //Returns the most occurred numbers. It will be array of numbers
        return modes;
    }

    /**
     * Returns Mean, Median and Mode Values for given array.
     * @param arrayOfNumbers - An array of number. 
     */
    public static getStatisticsValues(values: number[]): StatisticsTypes {
        const meanValue = this.getMeanValue(values);
        const medianValue = this.getMedianValue(values);
        const modeValue = this.getModeValue(values);
        //Calculate all three values above and return as Statistic Object.
        return { mean: meanValue, median: medianValue, mode: modeValue };
    }
}