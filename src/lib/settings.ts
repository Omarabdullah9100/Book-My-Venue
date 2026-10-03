/** Defaults for platform settings stored in the Setting table (admin-editable from M7). */
export const SETTING_DEFAULTS = {
  commissionPercent: 8,
  depositPercent: 20,
  holdMinutes: 10,
  requestResponseHours: 24,
} as const

export type SettingKey = keyof typeof SETTING_DEFAULTS
