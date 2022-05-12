import EverfundWidget from "./donationWidget"
import EverFundHeadless from "./headless"

const everfund = (headless?: boolean) => {
    if (headless) {
        return new EverFundHeadless()
    }
    return new EverfundWidget()
}

export default everfund