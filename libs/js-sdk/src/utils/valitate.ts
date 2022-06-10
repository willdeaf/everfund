export enum INTERVAL {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const validateIntervalCount = (
  interval: INTERVAL,
  intervalCount: number
) => {
  let max = 0
  switch (interval) {
    case INTERVAL.DAY:
      max = 365
      break
    case INTERVAL.WEEK:
      max = 52
      break
    case INTERVAL.MONTH:
      max = 12
      break
    case INTERVAL.YEAR:
      max = 1
      break
  }
  const isValid = intervalCount > 0 && intervalCount < max
  if (!isValid) {
    throw new Error("everfund.donationWdget is only available in Headless Mode")
  }
}
