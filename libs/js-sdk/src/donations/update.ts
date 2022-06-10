// import { CreateArgs } from "../types"

import { validateIntervalCount } from "../utils/valitate"
import { doAjax } from "../utils/doAjax"
import { INTERVAL } from "../types"

export type UpdateArgs = {
  id: string
  amount?: number
  paymentType?: string
  recurringArguments?: {
    interval: INTERVAL
    intervalCount: number
  }
  giftAid?: {
    title: string
    firstName: string
    city: string
    county?: string
    line1: string
    line2?: string
    postalCode?: string
    state: string
  }
  gdprMarketingConsent?: {
    phoneNumber: boolean
    email: boolean
    homeAddress: boolean
  }
  metadata?: [
    {
      id: string
      value: string
    }
  ]
}

const update = (
  {
    id,
    amount,
    paymentType,
    recurringArguments,
    giftAid,
    gdprMarketingConsent,
    metadata,
  }: UpdateArgs,
  { baseURL }: { baseURL: string }
) => {
  if (recurringArguments) {
    // will throw error if recurringArguments are invalid
    validateIntervalCount(
      recurringArguments.interval,
      recurringArguments.intervalCount
    )
  }

  const url = baseURL + "donations/" + id
  const data = {
    amount,
    paymentType,
    recurringArguments,
    giftAid,
    gdprMarketingConsent,
    metadata,
  }
  const httpMethod = "PUT"

  return doAjax({ url, data, httpMethod })
}

export default update
