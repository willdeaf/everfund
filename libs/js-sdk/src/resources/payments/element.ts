import get from "lodash/get"

export const stripeElements = async (
  payMethods: { card: { publishable_key: any } },
  params: { config: any; card: { separateElements: any }; ideal: any }
) => {
  const { publishable_key } = payMethods.card
  //@ts-ignore
  const stripe = window.Stripe(publishable_key)
  const elements = stripe.elements(params.config)
  const createElement = (type: string) => {
    const elementParams =
      get(params, `card[${type}]`) || params.card || params.ideal
    const elementOptions = elementParams.options || {}
    const element = elements.create(type, elementOptions)
    element.mount(elementParams.elementId || `#${type}-element`)

    elementParams.onChange && element.on("change", elementParams.onChange)
    elementParams.onReady && element.on("ready", elementParams.onReady)
    elementParams.onFocus && element.on("focus", elementParams.onFocus)
    elementParams.onBlur && element.on("blur", elementParams.onBlur)
    elementParams.onEscape && element.on("escape", elementParams.onEscape)
    elementParams.onClick && element.on("click", elementParams.onClick)

    if (type === "card" || type === "cardNumber" || type === "idealBank") {
      //@ts-ignore
      CARD_ELEMENTS.stripe = element
    }
  }
  //@ts-ignore
  API.stripe = stripe

  if (params.ideal) {
    createElement("idealBank")
  } else if (params.card.separateElements) {
    createElement("cardNumber")
    createElement("cardExpiry")
    createElement("cardCvc")
  } else {
    createElement("card")
  }
}
