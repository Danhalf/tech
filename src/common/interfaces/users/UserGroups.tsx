/* eslint-disable no-unused-vars */
import { SettingKey } from './UserConsts';

export enum SettingGroup {
    DEALS = 'Deals',
    FEES = 'Fees',
    TAXES = 'Taxes',
    STOCK_NEW = 'Stock# for new inventory',
    STOCK_TI = 'Stock# for trade-in inventory',
    ACCOUNT = 'Account Settings',
    CONTRACT = 'Contract Settings',
    LEASE = 'Lease Settings',
    OTHER = 'Other Settings',
}

export const dealsGroup: readonly SettingKey[] = [SettingKey.DEAL_TYPE, SettingKey.DEAL_STATUS];

export const feesGroup: readonly SettingKey[] = [
    SettingKey.FEE_DEF_DOCUMENTATION,
    SettingKey.FEE_DEF_VEHICLE_PACK,
    SettingKey.FEE_DEF_TITLE,
    SettingKey.FEE_DEF_TAG,
    SettingKey.FEE_DEF_TRANSFER,
    SettingKey.FEE_DEF_SPARE_TAG,
    SettingKey.FEE_DEF_SPARE_TRANSFER_TAG,
];

export const taxesGroup: readonly SettingKey[] = [SettingKey.TAX_DEF_STATE_VEHICLE_TAX_RATE];

export const stockNewGroup: readonly SettingKey[] = [
    SettingKey.STOCKNUM_SEQUENTIAL,
    SettingKey.STOCKNUM_PREFIX,
    SettingKey.STOCKNUM_SUFFIX,
    SettingKey.STOCKNUM_LAST_6_OF_VIN,
    SettingKey.STOCKNUM_LAST_8_OF_VIN,
    SettingKey.STOCKNUM_FIXED_DIGITS,
];

export const stockTIGroup: readonly SettingKey[] = [
    SettingKey.STOCKNUMTI_SEQUENTIAL,
    SettingKey.STOCKNUMTI_FROM_SOLD_VEHICLE,
    SettingKey.STOCKNUMTI_PREFIX,
    SettingKey.STOCKNUMTI_SUFFIX,
    SettingKey.STOCKNUMTI_LAST_6_OF_VIN,
    SettingKey.STOCKNUMTI_LAST_8_OF_VIN,
    SettingKey.STOCKNUMTI_FIXED_DIGITS,
];

export const accountGroup: readonly SettingKey[] = [
    SettingKey.ACCOUNT_START_NUMBER,
    SettingKey.ACCOUNT_FIXED_DIGITS,
    SettingKey.ACCOUNT_PREFIX,
    SettingKey.ACCOUNT_SUFFIX,
    SettingKey.ACCOUNT_LATE_FEE_MIN,
    SettingKey.ACCOUNT_LATE_FEE_MAX,
    SettingKey.ACCOUNT_LATE_FEE_GRACE_PERIOD,
    SettingKey.ACCOUNT_LATE_FEE_PERCENTAGE,
];

export const contractGroup: readonly SettingKey[] = [
    SettingKey.CONTRACT_DEF_INTEREST_RATE,
    SettingKey.CONTRACT_PAYMENT_FREQUENCY,
];

export const leaseGroup: readonly SettingKey[] = [
    SettingKey.LEASE_MONEY_FACTOR,
    SettingKey.LEASE_DEFAULT_MILEAGE,
    SettingKey.LEASE_OVERAGE_AMOUNT,
    SettingKey.LEASE_TERM,
    SettingKey.LEASE_PAYMENT_FREQUENCY,
];
