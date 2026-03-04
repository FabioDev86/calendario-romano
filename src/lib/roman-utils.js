import festivalsData from './festivals.json';

export const toRoman = (num) => {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '', i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
};

export const monthsLat = [
    "Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius",
    "Iulius", "Augustus", "September", "October", "November", "December"
];

export const weekDaysLat = [
    "Dies Solis", "Dies Lunae", "Dies Martis", "Dies Mercurii", "Dies Iovis", "Dies Veneris", "Dies Saturni"
];

export const festivals = festivalsData;

export const getRomanDate = (day, month, year) => {
    const isLateMonth = [2, 4, 6, 9].includes(month);
    const nonesDate = isLateMonth ? 7 : 5;
    const idesDate = isLateMonth ? 15 : 13;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const nextMonthIndex = (month + 1) % 12;
    const nextMonthName = monthsLat[nextMonthIndex].substring(0, 3) + ".";
    const currMonthName = monthsLat[month].substring(0, 3) + ".";

    if (day === 1) return `Kal. ${currMonthName}`;

    if (day < nonesDate) {
        const diff = nonesDate - day + 1;
        return diff === 2 ? `Prid. Non. ${currMonthName}` : `a.d. ${toRoman(diff)} Non. ${currMonthName}`;
    }

    if (day === nonesDate) return `Non. ${currMonthName}`;

    if (day < idesDate) {
        const diff = idesDate - day + 1;
        return diff === 2 ? `Prid. Id. ${currMonthName}` : `a.d. ${toRoman(diff)} Id. ${currMonthName}`;
    }

    if (day === idesDate) return `Id. ${currMonthName}`;

    const diff = daysInCurrentMonth - day + 2;
    return diff === 2 ? `Prid. Kal. ${nextMonthName}` : `a.d. ${toRoman(diff)} Kal. ${nextMonthName}`;
};
