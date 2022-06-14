import EverfundWidget from "./donationWidget"
import EverfundHeadless from "./headless"

const everfund: {
  (headless: true): typeof EverfundHeadless
  (headless: false): typeof EverfundWidget
} = (headless: boolean): any => {
  if (headless) {
    return new EverfundHeadless({})
  }
  return new EverfundWidget()
}

export default everfund
