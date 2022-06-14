import { INTERVAL } from "../types"
import type stripe from "stripe"

declare global {
  interface Window {
    Stripe: stripe
  }
}

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

const create = async (data: CreateArgs) => {
  // let pk_key = process.env.STIPE_PUBLIC_KEY
  //@ts-ignore
  const stripe = window.Stripe(
    "pk_test_51FJzh0KqZmCfCER4NH2ycKeZM56Xn0wSgaI9QlIfZDQSqgcVuXbkqf39fl4Ey5Y9xfcxpLV6p98qIKFM6QA5Ur5y00nOEtnaNT"
  )

  return await stripe.confirmPayment({
    //@ts-ignore
    elements: data,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "https://localhost:1234/",
    },
  })
}

export default create
