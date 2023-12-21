import { SettingKey } from './UserConsts';

export interface Settings {
    [SettingKey.USER_UID]: string;
    [SettingKey.CREATED]: string;
    [SettingKey.UPDATED]: string;
    [SettingKey.STOCKNUM_PREFIX]: string;
    [SettingKey.STOCKNUM_SUFFIX]: string;
    [SettingKey.STOCKNUM_FIXED_DIGITS]: number;
    [SettingKey.STOCKNUM_SEQUENTIAL]: number;
    [SettingKey.STOCKNUM_LAST_6_OF_VIN]: number;
    [SettingKey.STOCKNUM_LAST_8_OF_VIN]: number;
    [SettingKey.STOCKNUMTI_PREFIX]: string;
    [SettingKey.STOCKNUMTI_SUFFIX]: string;
    [SettingKey.STOCKNUMTI_SEQUENTIAL]: number;
    [SettingKey.STOCKNUMTI_FROM_SOLD_VEHICLE]: number;
    [SettingKey.STOCKNUMTI_LAST_6_OF_VIN]: number;
    [SettingKey.STOCKNUMTI_LAST_8_OF_VIN]: number;
    [SettingKey.STOCKNUMTI_FIXED_DIGITS]: number;
    [SettingKey.DEAL_TYPE]: number;
    [SettingKey.DEAL_STATUS]: number;
    [SettingKey.LEASE_TERM]: number;
    [SettingKey.LEASE_PAYMENT_FREQUENCY]: number;
    [SettingKey.INVENTORY_STATUS]: string;
    [SettingKey.SALE_TYPE]: string;
    [SettingKey.ACCOUNT_FIXED_DIGITS]: number;
    [SettingKey.ACCOUNT_LATE_FEE_GRACE_PERIOD]: number;
    [SettingKey.ACCOUNT_LATE_FEE_MAX]: number;
    [SettingKey.ACCOUNT_LATE_FEE_MIN]: number;
    [SettingKey.ACCOUNT_LATE_FEE_PERCENTAGE]: number;
    [SettingKey.ACCOUNT_PREFIX]: string;
    [SettingKey.ACCOUNT_START_NUMBER]: number;
    [SettingKey.ACCOUNT_SUFFIX]: string;
    [SettingKey.CONTRACT_DEF_INTEREST_RATE]: number;
    [SettingKey.CONTRACT_PAYMENT_FREQUENCY]: number;
    [SettingKey.FEE_DEF_DOCUMENTATION]: number;
    [SettingKey.FEE_DEF_SPARE_TAG]: number;
    [SettingKey.FEE_DEF_SPARE_TRANSFER_TAG]: number;
    [SettingKey.FEE_DEF_TAG]: number;
    [SettingKey.FEE_DEF_TITLE]: number;
    [SettingKey.FEE_DEF_TRANSFER]: number;
    [SettingKey.FEE_DEF_VEHICLE_PACK]: number;
    [SettingKey.INDEX]: number;
    [SettingKey.ITEM_UID]: string;
    [SettingKey.LEASE_DEFAULT_MILEAGE]: number;
    [SettingKey.LEASE_MONEY_FACTOR]: number;
    [SettingKey.LEASE_OVERAGE_AMOUNT]: number;
    [SettingKey.TAX_DEF_STATE_VEHICLE_TAX_RATE]: number;
}

export const disabledKeys: readonly SettingKey[] = [
    SettingKey.USER_UID,
    SettingKey.CREATED,
    SettingKey.UPDATED,
    SettingKey.INDEX,
    SettingKey.ITEM_UID,
];
export const textInputKeys: readonly SettingKey[] = [
    SettingKey.ACCOUNT_LATE_FEE_GRACE_PERIOD,
    SettingKey.ACCOUNT_LATE_FEE_MAX,
    SettingKey.ACCOUNT_LATE_FEE_MIN,
    SettingKey.ACCOUNT_LATE_FEE_PERCENTAGE,
    SettingKey.ACCOUNT_PREFIX,
    SettingKey.ACCOUNT_START_NUMBER,
    SettingKey.ACCOUNT_SUFFIX,
    SettingKey.CONTRACT_DEF_INTEREST_RATE,
    SettingKey.CONTRACT_PAYMENT_FREQUENCY,
    SettingKey.FEE_DEF_DOCUMENTATION,
    SettingKey.FEE_DEF_SPARE_TAG,
    SettingKey.FEE_DEF_SPARE_TRANSFER_TAG,
    SettingKey.FEE_DEF_TAG,
    SettingKey.FEE_DEF_TITLE,
    SettingKey.FEE_DEF_TRANSFER,
    SettingKey.FEE_DEF_VEHICLE_PACK,
    SettingKey.LEASE_DEFAULT_MILEAGE,
    SettingKey.LEASE_MONEY_FACTOR,
    SettingKey.LEASE_OVERAGE_AMOUNT,
    SettingKey.TAX_DEF_STATE_VEHICLE_TAX_RATE,
];

export const checkboxInputKeys: readonly SettingKey[] = [
    SettingKey.STOCKNUM_PREFIX,
    SettingKey.STOCKNUM_SUFFIX,
    SettingKey.STOCKNUMTI_PREFIX,
    SettingKey.STOCKNUMTI_SUFFIX,
    SettingKey.STOCKNUM_SEQUENTIAL,
    SettingKey.STOCKNUMTI_SEQUENTIAL,
    SettingKey.STOCKNUMTI_FROM_SOLD_VEHICLE,
];

export const rangeInputKeys: readonly SettingKey[] = [
    SettingKey.STOCKNUM_FIXED_DIGITS,
    SettingKey.STOCKNUMTI_FIXED_DIGITS,
    SettingKey.ACCOUNT_FIXED_DIGITS,
];

export const radioButtonsKeys: readonly SettingKey[] = [
    SettingKey.STOCKNUM_LAST_6_OF_VIN,
    SettingKey.STOCKNUM_LAST_8_OF_VIN,
    SettingKey.STOCKNUMTI_LAST_6_OF_VIN,
    SettingKey.STOCKNUMTI_LAST_8_OF_VIN,
    SettingKey.DEAL_TYPE,
    SettingKey.DEAL_STATUS,
    SettingKey.LEASE_TERM,
    SettingKey.LEASE_PAYMENT_FREQUENCY,
];

export const selectInputKeys: readonly SettingKey[] = [
    SettingKey.DEAL_STATUS,
    SettingKey.DEAL_TYPE,
    SettingKey.INVENTORY_STATUS,
    SettingKey.SALE_TYPE,
];

export interface UserSettingsResponse {
    settings: Settings;
    status: string;
}

export type UserSettingDeals =
    | 'listdealtypes'
    | 'listsaletypes'
    | 'listdealstatuses'
    | 'listinventorystatuses';
