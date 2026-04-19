import { r as requireAxios } from "./axios.mjs";
import { r as requireHelpers } from "./sendgrid__helpers.mjs";
var client$2 = { exports: {} };
const version = "7.7.0";
const require$$1 = {
  version
};
var client$1;
var hasRequiredClient$2;
function requireClient$2() {
  if (hasRequiredClient$2) return client$1;
  hasRequiredClient$2 = 1;
  const axios = requireAxios();
  const pkg = require$$1;
  const {
    helpers: {
      mergeData
    },
    classes: {
      Response,
      ResponseError
    }
  } = requireHelpers();
  const API_KEY_PREFIX = "SG.";
  const SENDGRID_BASE_URL = "https://api.sendgrid.com/";
  const TWILIO_BASE_URL = "https://email.twilio.com/";
  class Client {
    constructor() {
      this.auth = "";
      this.impersonateSubuser = "";
      this.defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "sendgrid/" + pkg.version + ";nodejs"
      };
      this.defaultRequest = {
        baseUrl: SENDGRID_BASE_URL,
        url: "",
        method: "GET",
        headers: {},
        maxContentLength: Infinity,
        // Don't limit the content length.
        maxBodyLength: Infinity
      };
    }
    setApiKey(apiKey) {
      this.auth = "Bearer " + apiKey;
      this.setDefaultRequest("baseUrl", SENDGRID_BASE_URL);
      if (!this.isValidApiKey(apiKey)) {
        console.warn(`API key does not start with "${API_KEY_PREFIX}".`);
      }
    }
    setTwilioEmailAuth(username, password) {
      const b64Auth = Buffer.from(username + ":" + password).toString("base64");
      this.auth = "Basic " + b64Auth;
      this.setDefaultRequest("baseUrl", TWILIO_BASE_URL);
      if (!this.isValidTwilioAuth(username, password)) {
        console.warn("Twilio Email credentials must be non-empty strings.");
      }
    }
    isValidApiKey(apiKey) {
      return this.isString(apiKey) && apiKey.trim().startsWith(API_KEY_PREFIX);
    }
    isValidTwilioAuth(username, password) {
      return this.isString(username) && username && this.isString(password) && password;
    }
    isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    setImpersonateSubuser(subuser) {
      this.impersonateSubuser = subuser;
    }
    setDefaultHeader(key, value) {
      if (key !== null && typeof key === "object") {
        Object.assign(this.defaultHeaders, key);
        return this;
      }
      this.defaultHeaders[key] = value;
      return this;
    }
    setDefaultRequest(key, value) {
      if (key !== null && typeof key === "object") {
        Object.assign(this.defaultRequest, key);
        return this;
      }
      this.defaultRequest[key] = value;
      return this;
    }
    createHeaders(data) {
      const headers = mergeData(this.defaultHeaders, data);
      if (typeof headers.Authorization === "undefined" && this.auth) {
        headers.Authorization = this.auth;
      }
      if (this.impersonateSubuser) {
        headers["On-Behalf-Of"] = this.impersonateSubuser;
      }
      return headers;
    }
    createRequest(data) {
      let options = {
        url: data.uri || data.url,
        baseUrl: data.baseUrl,
        method: data.method,
        data: data.body,
        params: data.qs,
        headers: data.headers
      };
      options = mergeData(this.defaultRequest, options);
      options.headers = this.createHeaders(options.headers);
      options.baseURL = options.baseUrl;
      delete options.baseUrl;
      return options;
    }
    request(data, cb) {
      data = this.createRequest(data);
      const promise = new Promise((resolve, reject) => {
        axios(data).then((response) => {
          return resolve([
            new Response(response.status, response.data, response.headers),
            response.data
          ]);
        }).catch((error) => {
          if (error.response) {
            if (error.response.status >= 400) {
              return reject(new ResponseError(error.response));
            }
          }
          return reject(error);
        });
      });
      if (cb && typeof cb !== "function") {
        throw new Error("Callback passed is not a function.");
      }
      if (cb) {
        return promise.then((result) => cb(null, result)).catch((error) => cb(error, null));
      }
      return promise;
    }
  }
  client$1 = Client;
  return client$1;
}
var client;
var hasRequiredClient$1;
function requireClient$1() {
  if (hasRequiredClient$1) return client;
  hasRequiredClient$1 = 1;
  const Client = requireClient$2();
  client = new Client();
  return client;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client$2.exports;
  hasRequiredClient = 1;
  const client2 = requireClient$1();
  const Client = requireClient$2();
  client$2.exports = client2;
  client$2.exports.Client = Client;
  return client$2.exports;
}
export {
  requireClient as r
};
