import Donations from "./resources/donations/new"
import Client from "./client"

class Everfund {
  private client: any
  public donations: any

  constructor(config: any) {
    this.client = new Client(config)
    this.donations = new Donations(this.client)
  }
}
export default Everfund
