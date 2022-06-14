import { INTERVAL } from "../types"
import type stripe from "stripe"

declare global {
  interface Window {
    Stripe: stripe
  }
}

// const LOADING_SCRIPTS = {}
// const CARD_ELEMENTS = {}
// const API = {}

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

// type settings = {
//   baseURL?: string
// }

// const createElements = async (params: {
//   config: any
//   card: { separateElements: any }
//   ideal: any
// }) => {
//   //@ts-ignore
//   const stripe = window.Stripe(
//     "pk_test"
//   )

//   // debugger
//   // console.log("============")
//   // console.log(params)
//   // console.log("============")
//   const elements = await stripe.elements(params)

//   return elements
// }

// export default createElements

//   options = opts || options;

const createElements = async (elementParams: {
  appearance: any
  clientSecret: string
}) => {
  // this.params = elementParams || {}
  //   const cart = await cartApi.methods(request, options).get()
  //   if (!cart) {
  //     throw new Error("Cart not found")
  //   }
  //   const payMethods = await settingsApi.methods(request, options).payments()

  //   if (payMethods.error) {
  //     throw new Error(payMethods.error)
  //   }
  //   await render(request, cart, payMethods, this.params)

  // elements = await stripe.elements(params)

  //@ts-ignore
  const stripe = window.Stripe()

  // debugger
  // console.log("============")
  // console.log(params)
  // console.log("============")
  const elements = await stripe.elements(elementParams)

  return elements
}

export default createElements
