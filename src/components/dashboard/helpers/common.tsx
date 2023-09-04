export const deepEqual = (first: any, second: any): boolean => {
    if (first === second) {
        return true;
    }

    if (
        typeof first !== 'object' ||
        first === null ||
        typeof second !== 'object' ||
        second === null
    ) {
        return false;
    }

    if (Array.isArray(first) !== Array.isArray(second)) {
        return false;
    }

    if (Array.isArray(first)) {
        if (first.length !== second.length) {
            return false;
        }

        for (let i = 0; i < first.length; i++) {
            if (!deepEqual(first[i], second[i])) {
                return false;
            }
        }
    } else {
        const firstKeys = Object.keys(first);
        const secondKeys = Object.keys(second);

        if (firstKeys.length !== secondKeys.length) {
            return false;
        }

        for (const key of firstKeys) {
            if (!secondKeys.includes(key) || !deepEqual(first[key], second[key])) {
                return false;
            }
        }
    }

    return true;
};

export const convertToNumberIfNumeric = (str: string): number | string => {
    const parsedNumber = Number.parseFloat(str);

    if (isNaN(parsedNumber)) {
        return str;
    }

    return parsedNumber;
};
