// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe(
  "pk_test_51FJzh0KqZmCfCER4NH2ycKeZM56Xn0wSgaI9QlIfZDQSqgcVuXbkqf39fl4Ey5Y9xfcxpLV6p98qIKFM6QA5Ur5y00nOEtnaNT"
)

// The items the customer wants to buy

let elements

initialize()
checkStatus()

document.querySelector("#payment-form").addEventListener("submit", handleSubmit)

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("http://localhost:4567/checkouts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      guest: true,
      cover_fees: false,
      card_locale: "US",
      item: {
        id: "i_cdmOvAS5sULG6BYaTKybmffF",
        interval: "single",
        amount: 2000,
        currency: "usd",
      },
    }),
  })
  const data = await response.json()
  console.log(data.data)
  const { payment_intent_secret } = data.data.payment

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
  elements = stripe.elements({
    appearance,
    clientSecret: payment_intent_secret,
  })

  const paymentElement = elements.create("payment")
  paymentElement.mount("#payment-element")
}

async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "https://localhost:1234/",
    },
  })

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message)
  } else {
    showMessage("An unexpected error occurred.")
  }

  setLoading(false)
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  )

  if (!clientSecret) {
    return
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

  switch (paymentIntent.status) {
    case "succeeded":
      hidePaymentForm()
      showMessage("Payment succeeded!")
      break
    case "processing":
      showMessage("Your payment is processing.")
      break
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.")
      break
    default:
      showMessage("Something went wrong.")
      break
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message")

  messageContainer.classList.remove("hidden")
  messageContainer.textContent = messageText

  setTimeout(function () {
    messageContainer.classList.add("hidden")
    messageText.textContent = ""
  }, 4000)
}

function hidePaymentForm() {
  document.querySelector("#payment-form")?.remove()
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true
    document.querySelector("#spinner").classList.remove("hidden")
    document.querySelector("#button-text").classList.add("hidden")
  } else {
    document.querySelector("#submit").disabled = false
    document.querySelector("#spinner").classList.add("hidden")
    document.querySelector("#button-text").classList.remove("hidden")
  }
}
