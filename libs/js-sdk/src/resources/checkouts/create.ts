import { doAjax } from "../utils/doAjax"
import { INTERVAL } from "../types"

export type CreateArgs = {
  guest: boolean
  cover_fees: boolean
  card_locale: string
  item: {
    id: string
    interval: INTERVAL
    amount: number
    currency: string
  }
  // paymentDestinationId: string
  // amount: number
  // currency?: string
  // paymentType: string
  // recurringArguments?: {
  //   interval: INTERVAL
  //   intervalCount: number
  // }
  // liveMode: boolean
  // giftAid?: {
  //   title: string
  //   firstName: string
  //   city: string
  //   county?: string
  //   line1: string
  //   line2?: string
  //   postalCode?: string
  //   state: string
  // }
  // gdprMarketingConsent?: {
  //   phoneNumber: boolean
  //   email: boolean
  //   homeAddress: boolean
  // }
  // metadata?: [
  //   {
  //     id: string
  //     value: string
  //   }
  // ]
}

type settings = {
  baseURL?: string
}

const create = (data: CreateArgs, settings?: settings) => {
  const url = (settings?.baseURL || "http://localhost:4567") + "/checkouts"

  const httpMethod = "POST"

  return doAjax({ url, data, httpMethod })
}

export default create
