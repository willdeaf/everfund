export enum INTERVAL {
  DAY = 'day', 
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export type SuccessResponse = {
  /** Donation Id ie d_XXXXXXX */
  id: string
  /** Supporter details */
  support?: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    email?: string
    address?: {
      line1: string
      line2?: string
      postcode: string
      city: string
      country: string
    }
  }
  /** Donation Type */
  type?: "SINGLE" | "MONTHLY"
  /** Aggreed to gift aid */
  agreededToGiftAid: boolean
  contactByPhone: boolean
  contactByPost: boolean
  contactByEmail: boolean
  donation?: {
    donationAmount?: number
    coveredProcessingFee?: boolean
    isDomesticCard?: boolean
    isSameCurrency?: boolean
  }
}

export type ModalProps = {
  /** @deprecated use code field instead */
  donationLink?: string
  /** Donation Widget Code get from the dashboard */
  code: string

  domain?: string
  /** Will close donation modal once payment has succeeded */
  closeOnSuccess?: boolean | null
  onSuccess(data: SuccessResponse): void
  onFailure(data: Record<string, any>): void
  onClose(): void
}


export type CreateArgs = {
  paymentDestinationId: string,
  amount: number,
  currency?: string,
  paymentType: string,
  recurringArguments?: {
    interval: INTERVAL,
    intervalCount: number
  },
  liveMode: boolean,
  giftAid?: {
    title: string,
    firstName: string,
    city: string,
    county?: string,
    line1: string,
    line2?: string,
    postalCode?: string,
    state: string
  },
  gdprMarketingConsent?: {
    phoneNumber: boolean,
    email: boolean,
    homeAddress: boolean,
  },
  metadata?: [
    {
      id: string,
      value: string
    }
  ]
}

export type doAjaxArgs = {
  url: string,
  data?: {},
  httpMethod: string,
}

export type UpdateArgs = {
  id: string,
  amount?: number,
  paymentType?: string,
  recurringArguments?: {
    interval: INTERVAL,
    intervalCount: number
  },
  giftAid?: {
    title: string,
    firstName: string,
    city: string,
    county?: string,
    line1: string,
    line2?: string,
    postalCode?: string,
    state: string
  },
  gdprMarketingConsent?: {
    phoneNumber: boolean,
    email: boolean,
    homeAddress: boolean,
  },
  metadata?: [
    {
      id: string,
      value: string
    }
  ]
}
