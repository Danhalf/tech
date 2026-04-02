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

const formatIntlDateTime = (date: Date): string =>
    new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: false,
    }).format(date);

const normalizeServerDateInput = (raw: string): string => {
    let normalizedString = raw.trim();
    if (!normalizedString) {
        return normalizedString;
    }
    if (/^\d{4}-\d{2}-\d{2} \d/.test(normalizedString)) {
        normalizedString = normalizedString.replace(' ', 'T');
    }
    normalizedString = normalizedString.replace(/(\.\d{3})\d+(?=Z|[+-]|$)/, '$1');
    normalizedString = normalizedString.replace(/\+00(:00)?$/i, 'Z');
    return normalizedString;
};

export const formatServerDateForDisplay = (input: unknown): string => {
    if (input === null || input === undefined) {
        return '';
    }
    if (input instanceof Date) {
        return Number.isNaN(input.getTime()) ? '' : formatIntlDateTime(input);
    }
    if (typeof input === 'number') {
        const parsedFromNumber = new Date(input);
        return Number.isNaN(parsedFromNumber.getTime())
            ? String(input)
            : formatIntlDateTime(parsedFromNumber);
    }
    if (typeof input !== 'string') {
        return String(input);
    }
    const normalized = normalizeServerDateInput(input);
    const parsedFromString = new Date(normalized);
    if (Number.isNaN(parsedFromString.getTime())) {
        return input.trim();
    }
    return formatIntlDateTime(parsedFromString);
};
