import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireClient } from "./sendgrid__client.mjs";
import { r as requireHelpers } from "./sendgrid__helpers.mjs";
var mail$1 = { exports: {} };
var mailService;
var hasRequiredMailService;
function requireMailService() {
  if (hasRequiredMailService) return mailService;
  hasRequiredMailService = 1;
  const { Client } = requireClient();
  const { classes: { Mail } } = requireHelpers();
  class MailService {
    /**
     * Constructor
     */
    constructor() {
      this.setClient(new Client());
      this.setSubstitutionWrappers("{{", "}}");
      this.secretRules = [];
    }
    /**
     * Set client
     */
    setClient(client) {
      this.client = client;
      return this;
    }
    /**
     * SendGrid API key passthrough for convenience.
     */
    setApiKey(apiKey) {
      this.client.setApiKey(apiKey);
      return this;
    }
    /**
     * Twilio Email Auth passthrough for convenience.
     */
    setTwilioEmailAuth(username, password) {
      this.client.setTwilioEmailAuth(username, password);
    }
    /**
     * Set client timeout
     */
    setTimeout(timeout) {
      if (typeof timeout === "undefined") {
        return;
      }
      this.client.setDefaultRequest("timeout", timeout);
    }
    /**
     * Set substitution wrappers
     */
    setSubstitutionWrappers(left, right) {
      if (typeof left === "undefined" || typeof right === "undefined") {
        throw new Error("Must provide both left and right side wrappers");
      }
      if (!Array.isArray(this.substitutionWrappers)) {
        this.substitutionWrappers = [];
      }
      this.substitutionWrappers[0] = left;
      this.substitutionWrappers[1] = right;
      return this;
    }
    /**
     * Set secret rules for filtering the e-mail content
     */
    setSecretRules(rules) {
      if (!(rules instanceof Array)) {
        rules = [rules];
      }
      const tmpRules = rules.map(function(rule) {
        const ruleType = typeof rule;
        if (ruleType === "string") {
          return {
            pattern: new RegExp(rule)
          };
        } else if (ruleType === "object") {
          if (rule instanceof RegExp) {
            rule = {
              pattern: rule
            };
          } else if (rule.hasOwnProperty("pattern") && typeof rule.pattern === "string") {
            rule.pattern = new RegExp(rule.pattern);
          }
          try {
            rule.pattern.test("");
            return rule;
          } catch (err) {
          }
        }
      });
      this.secretRules = tmpRules.filter(function(val) {
        return val;
      });
    }
    /**
     * Check if the e-mail is safe to be sent
     */
    filterSecrets(body) {
      if (typeof body === "object" && !body.hasOwnProperty("content")) {
        return;
      }
      const self = this;
      body.content.forEach(function(data) {
        self.secretRules.forEach(function(rule) {
          if (rule.hasOwnProperty("pattern") && !rule.pattern.test(data.value)) {
            return;
          }
          let message = `The pattern '${rule.pattern}'`;
          if (rule.name) {
            message += `identified by '${rule.name}'`;
          }
          message += " was found in the Mail content!";
          throw new Error(message);
        });
      });
    }
    /**
     * Send email
     */
    send(data, isMultiple = false, cb) {
      if (typeof isMultiple === "function") {
        cb = isMultiple;
        isMultiple = false;
      }
      if (Array.isArray(data)) {
        const promise = Promise.all(data.map((item) => {
          return this.send(item, isMultiple);
        }));
        if (cb) {
          promise.then((result) => cb(null, result)).catch((error) => cb(error, null));
        }
        return promise;
      }
      try {
        if (typeof data.isMultiple === "undefined") {
          data.isMultiple = isMultiple;
        }
        if (typeof data.substitutionWrappers === "undefined") {
          data.substitutionWrappers = this.substitutionWrappers;
        }
        const mail2 = Mail.create(data);
        const body = mail2.toJSON();
        this.filterSecrets(body);
        const request = {
          method: "POST",
          url: "/v3/mail/send",
          headers: mail2.headers,
          body
        };
        return this.client.request(request, cb);
      } catch (error) {
        if (cb) {
          cb(error, null);
        }
        return Promise.reject(error);
      }
    }
    /**
     * Send multiple emails (shortcut)
     */
    sendMultiple(data, cb) {
      return this.send(data, true, cb);
    }
  }
  mailService = MailService;
  return mailService;
}
var mail;
var hasRequiredMail$1;
function requireMail$1() {
  if (hasRequiredMail$1) return mail;
  hasRequiredMail$1 = 1;
  const MailService = requireMailService();
  mail = new MailService();
  return mail;
}
var hasRequiredMail;
function requireMail() {
  if (hasRequiredMail) return mail$1.exports;
  hasRequiredMail = 1;
  const mailer = requireMail$1();
  const MailService = requireMailService();
  mail$1.exports = mailer;
  mail$1.exports.MailService = MailService;
  return mail$1.exports;
}
var mailExports = requireMail();
const sgMail = /* @__PURE__ */ getDefaultExportFromCjs(mailExports);
export {
  sgMail as s
};
