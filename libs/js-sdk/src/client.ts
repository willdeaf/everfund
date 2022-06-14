import axios, { AxiosInstance, AxiosRequestHeaders } from "axios"
import { stripe_public_key } from "./resources/utils/keys"

export interface Config {
  baseUrl: string
  maxRetries: number
  apiKey?: string
}
export interface RequestOptions {
  timeout?: number
  numberOfRetries?: number
}

const defaultConfig = {
  maxRetries: 0,
  baseUrl: "http://localhost:5678",
}

export type RequestMethod = "DELETE" | "POST" | "GET"

// borrowed from medusa-js-sdk

class Client {
  private axiosClient: AxiosInstance
  public stripeClient: any
  public config: {
    baseUrl: string
    maxRetries: number
    apiKey?: string | undefined
  }

  constructor(config: Config) {
    /** @private @constant {AxiosInstance} */
    this.axiosClient = this.createClient({ ...defaultConfig, ...config })
    /** @public @constant {Stripe} */
    this.stripeClient = this.createStripeClient()
    /** @private @constant {Config} */
    this.config = { ...defaultConfig, ...config }
  }

  createClient(config: Config): AxiosInstance {
    const client = axios.create({
      baseURL: config.baseUrl,
    })

    return client
  }

  createStripeClient(): AxiosInstance {
    //@ts-ignore
    const stripe = window.Stripe(stripe_public_key)

    return stripe
  }

  normalizeHeaders(obj: object): Record<string, any> {
    if (!(obj && typeof obj === "object")) {
      return obj
    }

    return Object.keys(obj).reduce((result, header) => {
      result[this.normalizeHeader(header)] = obj[header]
      return result
    }, {})
  }

  // Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
  normalizeHeader(header: string): string {
    return header
      .split("-")
      .map(
        (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      )
      .join("-")
  }

  /**
   * Creates all the initial headers.
   * We add the idempotency key, if the request is configured to retry.
   * @param {object} userHeaders user supplied headers
   * @param {Types.RequestMethod} method request method
   * @param {string} path request path
   * @param {object} customHeaders user supplied headers
   * @return {object}
   */
  setHeaders(
    userHeaders: RequestOptions,
    _method: RequestMethod,
    _path: string,
    customHeaders: Record<string, any> = {}
  ): AxiosRequestHeaders {
    let defaultHeaders: Record<string, any> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }

    // if (this.config.apiKey && this.requiresAuthentication(path, method)) {
    //   defaultHeaders = {
    //     ...defaultHeaders,
    //     Authorization: `Bearer ${this.config.apiKey}`,
    //   }
    // }

    // only add idempotency key, if we want to retry
    // if (this.config.maxRetries > 0 && method === "POST") {
    //   defaultHeaders["Idempotency-Key"] = uuidv4()
    // }

    return Object.assign(
      {},
      defaultHeaders,
      this.normalizeHeaders(userHeaders),
      customHeaders
    )
  }

  /**
   * Axios request
   * @param {Types.RequestMethod} method request method
   * @param {string} path request path
   * @param {object} payload request payload
   * @param {RequestOptions} options axios configuration
   * @param {object} customHeaders custom request headers
   * @return {object}
   */
  async request(
    method: RequestMethod,
    path: string,
    payload: Record<string, any> | null = null,
    options: RequestOptions = {},
    customHeaders: Record<string, any> = {}
  ): Promise<any> {
    if (method === "POST" && !payload) {
      payload = {}
    }

    const reqOpts = {
      method,
      withCredentials: true,
      url: path,
      data: payload,
      json: true,
      headers: this.setHeaders(options, method, path, customHeaders),
    }

    // e.g. data = { cart: { ... } }, response = { status, headers, ... }
    const { data, ...response } = await this.axiosClient(reqOpts)

    // e.g. would return an object like of this shape { cart, response }
    return { ...data, response }
  }
}

export default Client
