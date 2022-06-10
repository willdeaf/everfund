import { doAjax } from "../utils/doAjax"

type params = {}

type settings = {
  baseURL?: string
}

//@ts-ignore
const list = async (_params: params, settings?: settings) => {
  const url = (settings?.baseURL || "http://localhost:4567") + "/items"
  const httpMethod = "GET"
  try {
    return (await doAjax({ url, httpMethod })).data
  } catch (err) {
    console.error(err)
    throw Error("something went wrong")
  }
}

export default list
