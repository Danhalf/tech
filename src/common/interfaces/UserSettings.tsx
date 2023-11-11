export const disabledKeys = ['useruid', 'created', 'updated'] as const;
export const textInputKeys = [
    'accountLateFeeGracePeriod',
    'accountLateFeeMax',
    'accountLateFeeMin',
    'accountLateFeePercentage',
    'accountPrefix',
    'accountStartNumber',
    'accountSuffix',
    'contractDefInterestRate',
    'contractPaymentFrequency',
    'feeDefDocumentation',
    'feeDefSpareTag',
    'feeDefSpareTransferTag',
    'feeDefTag',
    'feeDefTitle',
    'feeDefTransfer',
    'feeDefvehiclePack',
    'index',
    'itemuid',
    'leaseDefaultMileage',
    'leaseMoneyFactor',
    'leaseOverageAmount',
    'taxDefStateVehicleTaxRate',
] as const;
export const checkboxInputKeys = [
    'stocknumPrefix',
    'stocknumSuffix',
    'stocknumSequental',
    'stocknumtiSequental',
    'stocknumtiFromSoldVehicle',
] as const;
export const rangeInputKeys = ['stocknumFixedDigits', 'accountFixedDigits'] as const;
export const radioButtonsKeys = [
    ['stocknumLast6ofVIN', 'stocknumLast8ofVIN'],
    ['dealType', 'dealStatus'],
    ['leaseTerm', 'leasePaymentFrequency'],
] as const;
export const selectInputKeys = ['dealStatus', 'dealType', 'inventoryStatus', 'saleType'] as const;

export type DisabledKeys = typeof disabledKeys[number];
export type TextInputKeys = typeof textInputKeys[number];
export type CheckboxInputKeys = typeof checkboxInputKeys[number];
export type RangeInputKeys = typeof rangeInputKeys[number];
export type RadioButtonsKeys = typeof radioButtonsKeys[number][number];
export type SelectInputKeys = typeof selectInputKeys[number];

export interface Settings {
    useruid: string;
    created: string;
    updated: string;
    stocknumPrefix: string;
    stocknumSuffix: string;
    stocknumFixedDigits: number;
    stocknumSequental: number;
    stocknumtiSequental: number;
    stocknumtiFromSoldVehicle: number;
    stocknumLast6ofVIN: number;
    stocknumLast8ofVIN: number;
    dealType: number;
    dealStatus: number;
    leaseTerm: number;
    leasePaymentFrequency: number;
    inventoryStatus: string;
    saleType: string;
    accountFixedDigits: number;
    accountLateFeeGracePeriod: number;
    accountLateFeeMax: number;
    accountLateFeeMin: number;
    accountLateFeePercentage: number;
    accountPrefix: string;
    accountStartNumber: number;
    accountSuffix: string;
    contractDefInterestRate: number;
    contractPaymentFrequency: number;
    feeDefDocumentation: number;
    feeDefSpareTag: number;
    feeDefSpareTransferTag: number;
    feeDefTag: number;
    feeDefTitle: number;
    feeDefTransfer: number;
    feeDefvehiclePack: number;
    index: number;
    itemuid: string;
    leaseDefaultMileage: number;
    leaseMoneyFactor: number;
    leaseOverageAmount: number;
    taxDefStateVehicleTaxRate: number;
    [key: string]: string | number;
}

export interface UserSettingsResponse {
    settings: Settings;
    status: string;
}

export type UserSettingDeals =
    | 'listdealtypes'
    | 'listsaletypes'
    | 'listdealstatuses'
    | 'listinventorystatuses';
