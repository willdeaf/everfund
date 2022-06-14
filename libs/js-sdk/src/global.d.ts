import stripe from "stripe"

declare global {
  interface Window {
    Stripe: stripe
  }
}
