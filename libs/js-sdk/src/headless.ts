import "core-js/features/array/includes"
import "core-js/features/array/fill"
import donations from "./donations"
import { version } from "./version"
import "core-js/features/promise"
import payments from "./payments"
import { init } from "./init"
import items from "./items"
import "core-js/features"
import "element-remove"
// const createDonation = ({
//   paymentDestinationId,
//   amount,
//   currency,
//   paymentType,
//   recurringArguments,
//   liveMode,
//   giftAid,
//   gdprMarketingConsent,
//   metadata,
// }: CreateArgs) => {
//   console.log({
//     paymentDestinationId,
//     amount,
//     currency,
//     paymentType,
//     recurringArguments,
//     liveMode,
//     giftAid,
//     gdprMarketingConsent,
//     metadata,
//   })
//   // if (recurringArguments) {
//   //     // will throw error if recurringArguments are invalid
//   //     this.validateIntervalCount(recurringArguments.interval, recurringArguments.intervalCount)
//   // }

//   // const url = this.baseURL + 'donations'
//   // const data = {
//   //     paymentDestinationId,
//   //     amount,
//   //     currency,
//   //     paymentType,
//   //     recurringArguments,
//   //     liveMode,
//   //     giftAid,
//   //     gdprMarketingConsent,
//   //     metadata
//   // }
//   // const httpMethod = 'POST'

//   // return this.doAjax({ url, data, httpMethod })
//   return
// }

// public createSubscription() {

// }

// public createSupporter() {

// }

// public getAllDonations() {

// }

// public getDonationByID() {

// }

// public findDonationLinks() {

// }

// public findDonationLink() {

// }

// public updateDonationLink() {

// }

// public archiveDonationLink() {

// }

//@ts-ignore

export default {
  donations,
  donationWidget: () => {
    console.warn("donationWidget not available in Headless Mode")
  },
  init,
  items,
  payments,
  version,
}
