import { INTERVAL } from "../types"

export type CreateArgs = {
  paymentDestinationId: string
  amount: number
  currency?: string
  paymentType: string
  recurringArguments?: {
    interval: INTERVAL
    intervalCount: number
  }
  liveMode: boolean
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

const create = ({
  paymentDestinationId,
  amount,
  currency,
  paymentType,
  recurringArguments,
  liveMode,
  giftAid,
  gdprMarketingConsent,
  metadata,
}: CreateArgs) => {
  console.log({
    paymentDestinationId,
    amount,
    currency,
    paymentType,
    recurringArguments,
    liveMode,
    giftAid,
    gdprMarketingConsent,
    metadata,
  })
  // if (recurringArguments) {
  //     // will throw error if recurringArguments are invalid
  //     this.validateIntervalCount(recurringArguments.interval, recurringArguments.intervalCount)
  // }

  // const url = this.baseURL + 'donations'
  // const data = {
  //     paymentDestinationId,
  //     amount,
  //     currency,
  //     paymentType,
  //     recurringArguments,
  //     liveMode,
  //     giftAid,
  //     gdprMarketingConsent,
  //     metadata
  // }
  // const httpMethod = 'POST'

  // return this.doAjax({ url, data, httpMethod })
  // return
}

export default create
