import checkouts from "./resources/checkouts"
import donations from "./resources/donations"
import payments from "./resources/payments"
import "core-js/features/array/includes"
import { init } from "./resources/init"
import items from "./resources/items"
import "core-js/features/array/fill"
import { version } from "./version"
import "core-js/features/promise"
import "core-js/features"
import "element-remove"

export default {
  donations,
  donationWidget: () => {
    console.warn("donationWidget not available in Headless Mode")
  },
  checkouts,
  init,
  items,
  payments,
  version,
}
