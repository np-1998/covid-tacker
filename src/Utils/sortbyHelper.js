
import { sortbyFilters } from "./constants";

export default function (sortby, data) {
    switch (sortby) {
        case sortbyFilters[0]:
            return getSortedArr(SortbyConfirmedCount, data);
        case sortbyFilters[1]:
            return getSortedArr(SortbyConfirmedCount, data).reverse();
        case sortbyFilters[2]:
            return getSortedArr(SortbyAffectedPercentange, data);
        case sortbyFilters[3]:
            return getSortedArr(SortbyAffectedPercentange, data).reverse();
        case sortbyFilters[4]:
            return getSortedArr(SortbyVaccinatedPercentange, data);
        case sortbyFilters[5]:
            return getSortedArr(SortbyVaccinatedPercentange, data).reverse();
        default:
            return data;
    }
}

const getSortedArr = (sortbyFunc, data) => {
    let temp = [...data];
    temp.sort(sortbyFunc);
    return temp
}

const getIndexValue = (a, b) => {
    switch (true) {
        case a < b:
            return -1;
        case a > b:
            return 1;
        default:
            return 0;
    }
}

const SortbyConfirmedCount = (a, b) => {
    let confirmed_a = a.total.confirmed ? a.total.confirmed : 0;
    let confirmed_b = b.total.confirmed ? b.total.confirmed : 0;
    return getIndexValue(confirmed_a, confirmed_b);
}

const SortbyAffectedPercentange = (a, b) => {
    return getIndexValue(a.affectedPercentage, b.affectedPercentage);
}

const SortbyVaccinatedPercentange = (a, b) => {
    return getIndexValue(a.vaccinatedPercentage, b.vaccinatedPercentage);
}
