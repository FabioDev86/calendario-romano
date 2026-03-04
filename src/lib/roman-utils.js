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

export const festivals = {
    "0-1": "Kalendae Ianuariae",
    "0-9": "Agonalia",
    "0-11": "Carmentalia",
    "1-13": "Parentalia",
    "1-15": "Lupercalia",
    "1-23": "Terminalia",
    "1-27": "Equirria",
    "2-1": "Matronalia",
    "2-14": "Equirria",
    "2-15": "Idus Martiae",
    "2-17": "Liberalia",
    "2-19": "Quinquatrus",
    "3-1": "Veneralia",
    "3-12": "Cerialia",
    "3-21": "Parilia (Roma Condita)",
    "3-28": "Floralia",
    "4-1": "Bona Dea",
    "4-9": "Lemuria",
    "4-15": "Mercuralia",
    "5-9": "Vestalia",
    "5-20": "Summanalia",
    "6-5": "Poplifugia",
    "6-7": "Nonae Caprotinae",
    "6-23": "Neptunalia",
    "7-10": "Opalia",
    "7-13": "Vertumnalia",
    "7-23": "Volcanalia",
    "8-4": "Ludi Romani",
    "8-13": "Epulum Iovis",
    "9-11": "Meditrinalia",
    "9-15": "Equus October",
    "9-19": "Armilustrium",
    "10-13": "Epulum Iovis",
    "10-24": "Brumalia",
    "11-5": "Faunalia",
    "11-17": "Saturnalia",
    "11-25": "Dies Natalis Solis Invicti"
};

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
