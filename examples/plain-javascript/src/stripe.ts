import headlessSDK from "@everfund/js-sdk/src/index"

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

//@ts-ignore
const stripe = window.Stripe(
  "pk_test_51FJzh0KqZmCfCER4NH2ycKeZM56Xn0wSgaI9QlIfZDQSqgcVuXbkqf39fl4Ey5Y9xfcxpLV6p98qIKFM6QA5Ur5y00nOEtnaNT"
)

// The items the customer wants to buy

let elements

checkStatus()

const everfundHeadless = headlessSDK(true)

document
  .querySelector("#payment-form")
  .addEventListener("submit", step2handleSubmit)

document
  .querySelector("#step1-form")
  .addEventListener("submit", step1handleSubmit)

// ==========================
// Step 1
// ==========================
async function step1handleSubmit(e) {
  e.preventDefault()
  setLoading(true)

  var nameValue = document.getElementById("price").value
  console.log(nameValue)
  await step1Transition(nameValue)
}

// Fetches a payment intent and captures the client secret

// ==========================
// Step2Handle
// ==========================

async function step1Transition(donationAmount) {
  const container1 = document.querySelector("#step1-container")
  const container2 = document.querySelector("#step2-container")

  const timelineStep2Text = document.querySelector("#timeline-step-2-text")
  // await setStepsUI2()

  timelineStep2Text.classList.add("text-[#1fb292]")
  timelineStep2Text.classList.remove("text-gray-500")
  timelineStep2Text.classList.remove("group-hover:text-gray-700")

  await initializeStripeForm(donationAmount)
  container1.classList.add("hidden")
  container2.classList.remove("hidden")
}

async function initializeStripeForm(donationAmount) {
  debugger
  const createCheckoutResult = await everfundHeadless.checkouts.create({
    guest: true,
    cover_fees: false,
    card_locale: "GB",
    item: {
      id: "i_5G2Xr5qAcvjf54tuoDS1BfmB",
      interval: "single",
      amount: Number(donationAmount) * 100,
      currency: "gbp",
    },
  })

  console.log(createCheckoutResult)

  const { payment_intent_secret } = createCheckoutResult.data.payment

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

  // const appearance = {
  //   theme: "stripe",
  // }
  //   clientSecret: payment_intent_secret,
  elements = stripe.elements({
    appearance,
    clientSecret: payment_intent_secret,
  })

  const paymentElement = elements.create("payment")
  paymentElement.mount("#payment-element")

  //
  // elements = await everfundHeadless.donations.createElements({
  //   appearance,
  //   clientSecret: payment_intent_secret,
  // })
  //

  // const paymentElement = elements.create("payment")
  // paymentElement.mount("#payment-element")
}

async function step2handleSubmit(e) {
  e.preventDefault()
  setLoading(true)

  // const donation = await everfundHeadless...create(elements)

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

  await setLoading(false)
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
      moveTimelineForward("#timeline-step-2")
      moveTimelineForward("#timeline-step-3")
      showPaymentComplete()

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
// ==========================
// UI helpers
// ==========================

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message")

  messageContainer.classList.remove("hidden")
  messageContainer.textContent = messageText

  setTimeout(function () {
    messageContainer.classList.add("hidden")
    messageText.textContent = ""
  }, 4000)
}

// function showPaymentForm() {
//   const s1container = document.querySelector(`#step1-container`)
//   // const s2container = document.querySelector(`step2-container`)
//   s1container.classList.add("hidden")
//   // s2container.classList.remove("hidden")
// }

function showPaymentComplete() {
  const s1container = document.querySelector(`#step1-container`)
  const s2container = document.querySelector(`#step2-container`)
  const s3container = document.querySelector(`#step3-container`)
  s2container.classList.add("hidden")

  s1container.classList.contains("hidden") &&
    s1container.classList.add("hidden")
  s3container.classList.remove("hidden")
}

function moveTimelineForward(id) {
  const textDiv = document.querySelector(`${id}-text`)
  const borderDiv = document.querySelector(id)
  textDiv.classList.add("text-[#1fb292]")
  textDiv.classList.contains("text-gray-500") &&
    textDiv.classList.remove("text-gray-500")
  borderDiv.classList.add("border-[#1fb292]")
  textDiv.classList.contains("border-gray-200") &&
    borderDiv.classList.remove("border-gray-200")
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
