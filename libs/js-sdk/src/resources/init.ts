// import get from "lodash/get"
import stripe from "stripe"

declare global {
  interface Window {
    Stripe: stripe
  }
}

const LOADING_SCRIPTS = {}
// const CARD_ELEMENTS = {}
// const API = {}

export const init = async () => {
  if (!window.Stripe) {
    await loadScript("stripe-js", "https://js.stripe.com/v3/")
    //@ts-ignore
  }
  //   await stripeElements(payMethods, params)
  // }
  //   }
  //   if (params.ideal) {
  //     if (!payMethods.card) {
  //       console.error(
  //         `Payment element error: credit card payments are disabled. See Payment settings in the Swell dashboard for details.`
  //       )
  //     } else if (!payMethods.ideal) {
  //       console.error(
  //         `Payment element error: iDEAL payments are disabled. See Payment settings in the Swell dashboard for details.`
  //       )
  //     } else if (payMethods.card.gateway === "stripe") {
  //       //@ts-ignore
  //       if (!window.Stripe) {
  //         await loadScript("stripe-js", "https://js.stripe.com/v3/")
  //       }
  //       await stripeElements(request, payMethods, params)
  //     }
  //   }
}

const loadScript = async (id: string, src: string) => {
  LOADING_SCRIPTS[id] =
    LOADING_SCRIPTS[id] ||
    new Promise<void>((resolve) => {
      const script = document.createElement("script")
      script.id = id
      script.src = src
      script.async = true
      script.type = "text/javascript"
      script.addEventListener(
        "load",
        () => {
          resolve()
          LOADING_SCRIPTS[id] = null
        },
        {
          once: true,
        }
      )
      document.head.appendChild(script)
    })
  return LOADING_SCRIPTS[id]
}

// async function stripeElements(
//   payMethods: { card: { publishable_key: any } },
//   params: { config: any; card: { separateElements: any }; ideal: any }
// ) {
//   const { publishable_key } = payMethods.card
//   //@ts-ignore
//   const stripe = window.Stripe(publishable_key)
//   const elements = stripe.elements(params.config)
//   const createElement = (type: string) => {
//     const elementParams =
//       get(params, `card[${type}]`) || params.card || params.ideal
//     const elementOptions = elementParams.options || {}
//     const element = elements.create(type, elementOptions)
//     element.mount(elementParams.elementId || `#${type}-element`)

//     elementParams.onChange && element.on("change", elementParams.onChange)
//     elementParams.onReady && element.on("ready", elementParams.onReady)
//     elementParams.onFocus && element.on("focus", elementParams.onFocus)
//     elementParams.onBlur && element.on("blur", elementParams.onBlur)
//     elementParams.onEscape && element.on("escape", elementParams.onEscape)
//     elementParams.onClick && element.on("click", elementParams.onClick)

//     if (type === "card" || type === "cardNumber" || type === "idealBank") {
//       //@ts-ignore
//       CARD_ELEMENTS.stripe = element
//     }
//   }
//   //@ts-ignore
//   API.stripe = stripe

//   if (params.ideal) {
//     createElement("idealBank")
//   } else if (params.card.separateElements) {
//     createElement("cardNumber")
//     createElement("cardExpiry")
//     createElement("cardCvc")
//   } else {
//     createElement("card")
//   }
// }
