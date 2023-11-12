import { SettingKey } from './UserConsts';

export const dealsGroup: readonly SettingKey[] = [SettingKey.DEAL_TYPE, SettingKey.DEAL_STATUS];

export const feesGroup: readonly SettingKey[] = [
    SettingKey.FEE_DEF_DOCUMENTATION,
    SettingKey.FEE_DEF_VEHICLE_PACK,
    SettingKey.FEE_DEF_TITLE,
    SettingKey.FEE_DEF_TAG,
    SettingKey.FEE_DEF_VEHICLE_PACK,
    SettingKey.FEE_DEF_VEHICLE_PACK,
    SettingKey.FEE_DEF_VEHICLE_PACK,
];

export const taxesGroup: readonly SettingKey[] = [SettingKey.TAX_DEF_STATE_VEHICLE_TAX_RATE];

export const stockNewGroup: readonly SettingKey[] = [
    SettingKey.STOCKNUM_PREFIX,
    SettingKey.STOCKNUM_SUFFIX,
    SettingKey.STOCKNUM_SEQUENTIAL,
];

export const stockTIGroup: readonly SettingKey[] = [
    SettingKey.STOCKNUMTI_SEQUENTIAL,
    SettingKey.STOCKNUMTI_FROM_SOLD_VEHICLE,
];

export const accountGroup: readonly SettingKey[] = [
    SettingKey.ACCOUNT_FIXED_DIGITS,
    SettingKey.ACCOUNT_LATE_FEE_GRACE_PERIOD,
    SettingKey.ACCOUNT_LATE_FEE_MAX,
    SettingKey.ACCOUNT_LATE_FEE_MIN,
    SettingKey.ACCOUNT_LATE_FEE_PERCENTAGE,
    SettingKey.ACCOUNT_PREFIX,
    SettingKey.ACCOUNT_START_NUMBER,
    SettingKey.ACCOUNT_SUFFIX,
];

export const contractGroup: readonly SettingKey[] = [
    SettingKey.CONTRACT_DEF_INTEREST_RATE,
    SettingKey.CONTRACT_PAYMENT_FREQUENCY,
];

export const leaseGroup: readonly SettingKey[] = [
    SettingKey.LEASE_TERM,
    SettingKey.LEASE_PAYMENT_FREQUENCY,
    SettingKey.LEASE_DEFAULT_MILEAGE,
    SettingKey.LEASE_MONEY_FACTOR,
    SettingKey.LEASE_OVERAGE_AMOUNT,
];
