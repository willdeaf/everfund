import everfund from "@everfund/js-sdk"

const everfundSDK = everfund()

const everfundHeadless = everfund({ headless: true })

console.log(everfundHeadless.create)

document.getElementById("donate-modal").addEventListener("click", () => {
  console.log("launch Everfund Modal")
  everfundSDK.donationWidget({
    code: "rjww",
    onSuccess: function (onSuccessPayload) {
      console.log(onSuccessPayload)
    },
    onFailure: function (error) {
      console.log(error)
    },
    onClose: function () {
      //
      console.log("Closed Modal")
    },
  })
}
)