import BaseResource from "../base"

class Donations extends BaseResource {
  async createElements(payment_intent_secret: any) {
    const appearance = {
      theme: "flat",
      variables: {
        fontWeightNormal: "500",
        borderRadius: "2px",
        colorBackground: "white",
        colorPrimary: "#1fb292",
        colorPrimaryText: "white",
        spacingGridRow: "15px",
      },
      rules: {
        ".Label": {
          marginBottom: "6px",
        },
        ".Tab, .Input, .Block": {
          padding: "12px",
          border: "1px solid #000",
        },
      },
    }

    return await this.client.stripeClient.createElements({
      appearance,
      clientSecret: payment_intent_secret,
    })
  }

  async create(elements: any) {
    return await this.client.stripeClient.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://localhost:1234/",
      },
    })
  }
}

export default Donations
