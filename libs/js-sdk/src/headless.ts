import "core-js/features/array/includes"
import "core-js/features/array/fill"
import { CreateArgs, UpdateArgs, doAjaxArgs, INTERVAL } from "./types"
import "core-js/features/promise"
import { version } from "./version"
import "core-js/features"
import "element-remove"



class EverfundHeadlessClient {
    private baseURL = 'https://api.everfund.io/rest/'
    version: string

    constructor() {
        this.version = version
    }


    public modal() {
        console.warn('modal not available in Headless Mode')
    }
    public donationWidget() {
        console.warn('donationWidget not available in Headless Mode')
    }


    public createDonation({
        paymentDestinationId,
        amount,
        currency,
        paymentType,
        recurringArguments,
        liveMode,
        giftAid,
        gdprMarketingConsent,
        metadata
    }: CreateArgs) {


        if (recurringArguments) {
            // will throw error if recurringArguments are invalid
            this.validateIntervalCount(recurringArguments.interval, recurringArguments.intervalCount)
        }

        const url = this.baseURL + 'donations'
        const data = {
            paymentDestinationId,
            amount,
            currency,
            paymentType,
            recurringArguments,
            liveMode,
            giftAid,
            gdprMarketingConsent,
            metadata
        }
        const httpMethod = 'POST'

        return this.doAjax({ url, data, httpMethod })
    }





    public updateDonation({
        id,
        amount,
        paymentType,
        recurringArguments,
        giftAid,
        gdprMarketingConsent,
        metadata
    }: UpdateArgs) {


        if (recurringArguments) {
            // will throw error if recurringArguments are invalid
            this.validateIntervalCount(recurringArguments.interval, recurringArguments.intervalCount)
        }

        const url = this.baseURL + 'donations/' + id
        const data = {
            amount,
            paymentType,
            recurringArguments,
            giftAid,
            gdprMarketingConsent,
            metadata
        }
        const httpMethod = 'PUT'

        return this.doAjax({ url, data, httpMethod })
    }


    public createSubscription() {

    }

    public createSupporter() {

    }

    public getAllDonations() {

    }

    public getDonationByID() {

    }


    public findDonationLinks() {

    }

    public findDonationLink() {

    }

    public updateDonationLink() {

    }

    public archiveDonationLink() {
        
    }

    private validateIntervalCount(interval: INTERVAL, intervalCount: number) {
        let max = 0
        switch (interval) {
            case INTERVAL.DAY:
                max = 365
                break;
            case INTERVAL.WEEK:
                max = 52
                break;
            case INTERVAL.MONTH:
                max = 12
                break;
            case INTERVAL.YEAR:
                max = 1
                break;
        }
        const isValid = (intervalCount > 0 && intervalCount < max)
        if (!isValid) {
            throw new Error('everfund.donationWdget is only available in Headless Mode');
        }
    }



    private async doAjax({ url, data, httpMethod }: doAjaxArgs) {
        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: httpMethod, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } catch (err) {
            throw new Error
        }
    }

}

export default EverfundHeadlessClient