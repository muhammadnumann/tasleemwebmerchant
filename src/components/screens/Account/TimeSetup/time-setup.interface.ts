export interface ITimeSetupFormValues {
  days: Array<{ from: string; to: string }>
  store_timezone: string,

}

export type TypeTimeSetupWeek =
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'


export const WeekFormat = [
  [
    "sat_start",
    "sat_end",
  ],
  [
    "sun_start",
    "sun_end",
  ],
  [
    "mon_start",
    "mon_end",
  ],
  [
    "tue_start",
    "tue_end",
  ],
  [
    "wed_start",
    "wed_end",
  ],
  [
    "thu_start",
    "thu_end",
  ],
  [
    "fri_start",
    "fri_end",
  ]
]