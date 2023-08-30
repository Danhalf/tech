export const deepEqual = (firstObj: any, secondObj: any): boolean => {
    if (firstObj === secondObj) {
        return true
    }

    if (
        typeof firstObj !== 'object' ||
        firstObj === null ||
        typeof secondObj !== 'object' ||
        secondObj === null
    ) {
        return false
    }

    const firstKeys = Object.keys(firstObj)
    const secondKeys = Object.keys(secondObj)

    if (firstKeys.length !== secondKeys.length) {
        return false
    }

    for (const key of firstKeys) {
        if (!secondKeys.includes(key) || !deepEqual(firstObj[key], secondObj[key])) {
            return false
        }
    }

    return true
}

export const convertToNumberIfNumeric = (str: string): number | string => {
    const parsedNumber = Number.parseFloat(str)

    if (isNaN(parsedNumber)) {
        return str
    }

    return parsedNumber
}
