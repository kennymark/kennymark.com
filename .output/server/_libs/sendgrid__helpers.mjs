import require$$0 from "fs";
import require$$2 from "path";
import { r as requireCjs } from "./deepmerge.mjs";
var convertKeys;
var hasRequiredConvertKeys;
function requireConvertKeys() {
  if (hasRequiredConvertKeys) return convertKeys;
  hasRequiredConvertKeys = 1;
  convertKeys = function convertKeys2(obj, converter, ignored) {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("Non object passed to convertKeys: " + obj);
    }
    if (Array.isArray(obj)) {
      return obj;
    }
    if (!Array.isArray(ignored)) {
      ignored = [];
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const converted = converter(key);
        if (typeof obj[key] === "object" && obj[key] !== null) {
          if (!ignored.includes(key) && !ignored.includes(converted)) {
            obj[key] = convertKeys2(obj[key], converter, ignored);
          }
        }
        if (converted !== key) {
          obj[converted] = obj[key];
          delete obj[key];
        }
      }
    }
    return obj;
  };
  return convertKeys;
}
var strToCamelCase;
var hasRequiredStrToCamelCase;
function requireStrToCamelCase() {
  if (hasRequiredStrToCamelCase) return strToCamelCase;
  hasRequiredStrToCamelCase = 1;
  strToCamelCase = function strToCamelCase2(str) {
    if (typeof str !== "string") {
      throw new Error("String expected for conversion to snake case");
    }
    return str.trim().replace(/_+|\-+/g, " ").replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (Number(match) === 0) {
        return "";
      }
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };
  return strToCamelCase;
}
var toCamelCase;
var hasRequiredToCamelCase;
function requireToCamelCase() {
  if (hasRequiredToCamelCase) return toCamelCase;
  hasRequiredToCamelCase = 1;
  const convertKeys2 = requireConvertKeys();
  const strToCamelCase2 = requireStrToCamelCase();
  toCamelCase = function toCamelCase2(obj, ignored) {
    return convertKeys2(obj, strToCamelCase2, ignored);
  };
  return toCamelCase;
}
var strToSnakeCase;
var hasRequiredStrToSnakeCase;
function requireStrToSnakeCase() {
  if (hasRequiredStrToSnakeCase) return strToSnakeCase;
  hasRequiredStrToSnakeCase = 1;
  strToSnakeCase = function strToSnakeCase2(str) {
    if (typeof str !== "string") {
      throw new Error("String expected for conversion to snake case");
    }
    return str.trim().replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
      $1 = $1.trim().toLowerCase().replace("-", "");
      return ($1[0] === "_" ? "" : "_") + $1;
    }).slice(1);
  };
  return strToSnakeCase;
}
var toSnakeCase;
var hasRequiredToSnakeCase;
function requireToSnakeCase() {
  if (hasRequiredToSnakeCase) return toSnakeCase;
  hasRequiredToSnakeCase = 1;
  const convertKeys2 = requireConvertKeys();
  const strToSnakeCase2 = requireStrToSnakeCase();
  toSnakeCase = function toSnakeCase2(obj, ignored) {
    return convertKeys2(obj, strToSnakeCase2, ignored);
  };
  return toSnakeCase;
}
var deepClone;
var hasRequiredDeepClone;
function requireDeepClone() {
  if (hasRequiredDeepClone) return deepClone;
  hasRequiredDeepClone = 1;
  deepClone = function deepClone2(obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  return deepClone;
}
var attachment;
var hasRequiredAttachment;
function requireAttachment() {
  if (hasRequiredAttachment) return attachment;
  hasRequiredAttachment = 1;
  const toCamelCase2 = requireToCamelCase();
  const toSnakeCase2 = requireToSnakeCase();
  const deepClone2 = requireDeepClone();
  const fs = require$$0;
  const path = require$$2;
  class Attachment {
    /**
     * Constructor
     */
    constructor(data) {
      if (data) {
        this.fromData(data);
      }
    }
    /**
     * From data
     */
    fromData(data) {
      if (typeof data !== "object") {
        throw new Error("Expecting object for Mail data");
      }
      data = deepClone2(data);
      data = toCamelCase2(data);
      const {
        content,
        filename,
        type,
        disposition,
        contentId,
        filePath
      } = data;
      if (typeof content !== "undefined" && typeof filePath !== "undefined") {
        throw new Error(
          "The props 'content' and 'filePath' cannot be used together."
        );
      }
      this.setFilename(filename);
      this.setType(type);
      this.setDisposition(disposition);
      this.setContentId(contentId);
      this.setContent(filePath ? this.readFile(filePath) : content);
    }
    /**
     * Read a file and return its content as base64
     */
    readFile(filePath) {
      return fs.readFileSync(path.resolve(filePath));
    }
    /**
     * Set content
     */
    setContent(content) {
      if (typeof content === "string") {
        this.content = content;
        return;
      } else if (content instanceof Buffer && content.toString !== void 0) {
        this.content = content.toString();
        if (this.disposition === "attachment") {
          this.content = content.toString("base64");
        }
        return;
      }
      throw new Error("`content` expected to be either Buffer or string");
    }
    /**
     * Set content
     */
    setFileContent(content) {
      if (content instanceof Buffer && content.toString !== void 0) {
        this.content = content.toString("base64");
        return;
      }
      throw new Error("`content` expected to be Buffer");
    }
    /**
     * Set filename
     */
    setFilename(filename) {
      if (typeof filename === "undefined") {
        return;
      }
      if (filename && typeof filename !== "string") {
        throw new Error("String expected for `filename`");
      }
      this.filename = filename;
    }
    /**
     * Set type
     */
    setType(type) {
      if (typeof type === "undefined") {
        return;
      }
      if (typeof type !== "string") {
        throw new Error("String expected for `type`");
      }
      this.type = type;
    }
    /**
     * Set disposition
     */
    setDisposition(disposition) {
      if (typeof disposition === "undefined") {
        return;
      }
      if (typeof disposition !== "string") {
        throw new Error("String expected for `disposition`");
      }
      this.disposition = disposition;
    }
    /**
     * Set content ID
     */
    setContentId(contentId) {
      if (typeof contentId === "undefined") {
        return;
      }
      if (typeof contentId !== "string") {
        throw new Error("String expected for `contentId`");
      }
      this.contentId = contentId;
    }
    /**
     * To JSON
     */
    toJSON() {
      const { content, filename, type, disposition, contentId } = this;
      const json = { content, filename };
      if (typeof type !== "undefined") {
        json.type = type;
      }
      if (typeof disposition !== "undefined") {
        json.disposition = disposition;
      }
      if (typeof contentId !== "undefined") {
        json.contentId = contentId;
      }
      return toSnakeCase2(json);
    }
  }
  attachment = Attachment;
  return attachment;
}
var splitNameEmail;
var hasRequiredSplitNameEmail;
function requireSplitNameEmail() {
  if (hasRequiredSplitNameEmail) return splitNameEmail;
  hasRequiredSplitNameEmail = 1;
  splitNameEmail = function splitNameEmail2(str) {
    if (str.indexOf("<") === -1) {
      return ["", str];
    }
    let [name, email] = str.split("<");
    name = name.trim();
    email = email.replace(">", "").trim();
    return [name, email];
  };
  return splitNameEmail;
}
var emailAddress;
var hasRequiredEmailAddress;
function requireEmailAddress() {
  if (hasRequiredEmailAddress) return emailAddress;
  hasRequiredEmailAddress = 1;
  const splitNameEmail2 = requireSplitNameEmail();
  class EmailAddress {
    /**
    * Constructor
    */
    constructor(data) {
      if (data) {
        this.fromData(data);
      }
    }
    /**
     * From data
     */
    fromData(data) {
      if (typeof data === "string") {
        const [name2, email2] = splitNameEmail2(data);
        data = { name: name2, email: email2 };
      }
      if (typeof data !== "object") {
        throw new Error("Expecting object or string for EmailAddress data");
      }
      const { name, email } = data;
      this.setEmail(email);
      this.setName(name);
    }
    /**
     * Set name
     */
    setName(name) {
      if (typeof name === "undefined") {
        return;
      }
      if (typeof name !== "string") {
        throw new Error("String expected for `name`");
      }
      this.name = name;
    }
    /**
     * Set email (mandatory)
     */
    setEmail(email) {
      if (typeof email === "undefined") {
        throw new Error("Must provide `email`");
      }
      if (typeof email !== "string") {
        throw new Error("String expected for `email`");
      }
      this.email = email;
    }
    /**
    * To JSON
    */
    toJSON() {
      const { email, name } = this;
      const json = { email };
      if (name !== "") {
        json.name = name;
      }
      return json;
    }
    /**************************************************************************
     * Static helpers
     ***/
    /**
     * Create an EmailAddress instance from given data
     */
    static create(data) {
      if (Array.isArray(data)) {
        return data.filter((item) => !!item).map((item) => this.create(item));
      }
      if (data instanceof EmailAddress) {
        return data;
      }
      return new EmailAddress(data);
    }
  }
  emailAddress = EmailAddress;
  return emailAddress;
}
var wrapSubstitutions;
var hasRequiredWrapSubstitutions;
function requireWrapSubstitutions() {
  if (hasRequiredWrapSubstitutions) return wrapSubstitutions;
  hasRequiredWrapSubstitutions = 1;
  wrapSubstitutions = function wrap(substitutions, left = "{{", right = "}}") {
    if (Array.isArray(substitutions)) {
      return substitutions.map((subs) => wrap(subs, left, right));
    }
    const wrapped = {};
    for (const key in substitutions) {
      if (substitutions.hasOwnProperty(key)) {
        wrapped[left + key + right] = String(substitutions[key]);
      }
    }
    return wrapped;
  };
  return wrapSubstitutions;
}
var personalization;
var hasRequiredPersonalization;
function requirePersonalization() {
  if (hasRequiredPersonalization) return personalization;
  hasRequiredPersonalization = 1;
  const EmailAddress = requireEmailAddress();
  const toCamelCase2 = requireToCamelCase();
  const toSnakeCase2 = requireToSnakeCase();
  const deepClone2 = requireDeepClone();
  const deepMerge = requireCjs();
  const wrapSubstitutions2 = requireWrapSubstitutions();
  class Personalization {
    /**
     * Constructor
     */
    constructor(data) {
      this.to = [];
      this.cc = [];
      this.bcc = [];
      this.headers = {};
      this.customArgs = {};
      this.substitutions = {};
      this.substitutionWrappers = ["{{", "}}"];
      this.dynamicTemplateData = {};
      if (data) {
        this.fromData(data);
      }
    }
    /**
     * From data
     */
    fromData(data) {
      if (typeof data !== "object") {
        throw new Error("Expecting object for Mail data");
      }
      data = deepClone2(data);
      data = toCamelCase2(data, ["substitutions", "dynamicTemplateData", "customArgs", "headers"]);
      const {
        to,
        from,
        cc,
        bcc,
        subject,
        headers,
        customArgs,
        sendAt,
        substitutions,
        substitutionWrappers,
        dynamicTemplateData
      } = data;
      this.setTo(to);
      this.setFrom(from);
      this.setCc(cc);
      this.setBcc(bcc);
      this.setSubject(subject);
      this.setHeaders(headers);
      this.setSubstitutions(substitutions);
      this.setSubstitutionWrappers(substitutionWrappers);
      this.setCustomArgs(customArgs);
      this.setDynamicTemplateData(dynamicTemplateData);
      this.setSendAt(sendAt);
    }
    /**
     * Set subject
     */
    setSubject(subject) {
      if (typeof subject === "undefined") {
        return;
      }
      if (typeof subject !== "string") {
        throw new Error("String expected for `subject`");
      }
      this.subject = subject;
    }
    /**
     * Set send at
     */
    setSendAt(sendAt) {
      if (typeof sendAt === "undefined") {
        return;
      }
      if (!Number.isInteger(sendAt)) {
        throw new Error("Integer expected for `sendAt`");
      }
      this.sendAt = sendAt;
    }
    /**
     * Set to
     */
    setTo(to) {
      if (typeof to === "undefined") {
        return;
      }
      if (!Array.isArray(to)) {
        to = [to];
      }
      this.to = EmailAddress.create(to);
    }
    /**
     * Set from
     * */
    setFrom(from) {
      if (typeof from === "undefined") {
        return;
      }
      this.from = EmailAddress.create(from);
    }
    /**
     * Add a single to
     */
    addTo(to) {
      if (typeof to === "undefined") {
        return;
      }
      this.to.push(EmailAddress.create(to));
    }
    /**
     * Set cc
     */
    setCc(cc) {
      if (typeof cc === "undefined") {
        return;
      }
      if (!Array.isArray(cc)) {
        cc = [cc];
      }
      this.cc = EmailAddress.create(cc);
    }
    /**
     * Add a single cc
     */
    addCc(cc) {
      if (typeof cc === "undefined") {
        return;
      }
      this.cc.push(EmailAddress.create(cc));
    }
    /**
     * Set bcc
     */
    setBcc(bcc) {
      if (typeof bcc === "undefined") {
        return;
      }
      if (!Array.isArray(bcc)) {
        bcc = [bcc];
      }
      this.bcc = EmailAddress.create(bcc);
    }
    /**
     * Add a single bcc
     */
    addBcc(bcc) {
      if (typeof bcc === "undefined") {
        return;
      }
      this.bcc.push(EmailAddress.create(bcc));
    }
    /**
     * Set headers
     */
    setHeaders(headers) {
      if (typeof headers === "undefined") {
        return;
      }
      if (typeof headers !== "object" || headers === null) {
        throw new Error("Object expected for `headers`");
      }
      this.headers = headers;
    }
    /**
     * Add a header
     */
    addHeader(key, value) {
      if (typeof key !== "string") {
        throw new Error("String expected for header key");
      }
      if (typeof value !== "string") {
        throw new Error("String expected for header value");
      }
      this.headers[key] = value;
    }
    /**
     * Set custom args
     */
    setCustomArgs(customArgs) {
      if (typeof customArgs === "undefined") {
        return;
      }
      if (typeof customArgs !== "object" || customArgs === null) {
        throw new Error("Object expected for `customArgs`");
      }
      this.customArgs = customArgs;
    }
    /**
     * Add a custom arg
     */
    addCustomArg(key, value) {
      if (typeof key !== "string") {
        throw new Error("String expected for custom arg key");
      }
      if (typeof value !== "string") {
        throw new Error("String expected for custom arg value");
      }
      this.customArgs[key] = value;
    }
    /**
     * Set substitutions
     */
    setSubstitutions(substitutions) {
      if (typeof substitutions === "undefined") {
        return;
      }
      if (typeof substitutions !== "object") {
        throw new Error("Object expected for `substitutions`");
      }
      this.substitutions = substitutions;
    }
    /**
     * Add a substitution
     */
    addSubstitution(key, value) {
      if (typeof key !== "string") {
        throw new Error("String expected for substitution key");
      }
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error("String or Number expected for substitution value");
      }
      this.substitutions[key] = value;
    }
    /**
     * Reverse merge substitutions, preserving existing ones
     */
    reverseMergeSubstitutions(substitutions) {
      if (typeof substitutions === "undefined" || substitutions === null) {
        return;
      }
      if (typeof substitutions !== "object") {
        throw new Error(
          "Object expected for `substitutions` in reverseMergeSubstitutions"
        );
      }
      this.substitutions = Object.assign({}, substitutions, this.substitutions);
    }
    /**
     * Set substitution wrappers
     */
    setSubstitutionWrappers(wrappers) {
      if (typeof wrappers === "undefined" || wrappers === null) {
        return;
      }
      if (!Array.isArray(wrappers) || wrappers.length !== 2) {
        throw new Error(
          "Array expected with two elements for `substitutionWrappers`"
        );
      }
      this.substitutionWrappers = wrappers;
    }
    /**
     * Reverse merge dynamic template data, preserving existing ones
     */
    deepMergeDynamicTemplateData(dynamicTemplateData) {
      if (typeof dynamicTemplateData === "undefined" || dynamicTemplateData === null) {
        return;
      }
      if (typeof dynamicTemplateData !== "object") {
        throw new Error(
          "Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData"
        );
      }
      this.dynamicTemplateData = deepMerge(dynamicTemplateData, this.dynamicTemplateData);
    }
    /**
     * Set dynamic template data
     */
    setDynamicTemplateData(dynamicTemplateData) {
      if (typeof dynamicTemplateData === "undefined") {
        return;
      }
      if (typeof dynamicTemplateData !== "object") {
        throw new Error("Object expected for `dynamicTemplateData`");
      }
      this.dynamicTemplateData = dynamicTemplateData;
    }
    /**
     * To JSON
     */
    toJSON() {
      const {
        to,
        from,
        cc,
        bcc,
        subject,
        headers,
        customArgs,
        sendAt,
        substitutions,
        substitutionWrappers,
        dynamicTemplateData
      } = this;
      const json = { to };
      if (Array.isArray(cc) && cc.length > 0) {
        json.cc = cc;
      }
      if (Array.isArray(bcc) && bcc.length > 0) {
        json.bcc = bcc;
      }
      if (Object.keys(headers).length > 0) {
        json.headers = headers;
      }
      if (substitutions && Object.keys(substitutions).length > 0) {
        const [left, right] = substitutionWrappers;
        json.substitutions = wrapSubstitutions2(substitutions, left, right);
      }
      if (Object.keys(customArgs).length > 0) {
        json.customArgs = customArgs;
      }
      if (dynamicTemplateData && Object.keys(dynamicTemplateData).length > 0) {
        json.dynamicTemplateData = dynamicTemplateData;
      }
      if (typeof subject !== "undefined") {
        json.subject = subject;
      }
      if (typeof sendAt !== "undefined") {
        json.sendAt = sendAt;
      }
      if (typeof from !== "undefined") {
        json.from = from;
      }
      return toSnakeCase2(json, ["substitutions", "dynamicTemplateData", "customArgs", "headers"]);
    }
  }
  personalization = Personalization;
  return personalization;
}
var arrayToJson;
var hasRequiredArrayToJson;
function requireArrayToJson() {
  if (hasRequiredArrayToJson) return arrayToJson;
  hasRequiredArrayToJson = 1;
  arrayToJson = function arrayToJSON(arr) {
    return arr.map((item) => {
      if (typeof item === "object" && item !== null && typeof item.toJSON === "function") {
        return item.toJSON();
      }
      return item;
    });
  };
  return arrayToJson;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const DYNAMIC_TEMPLATE_CHAR_WARNING = `
Content with characters ', " or & may need to be escaped with three brackets
{{{ content }}}
See https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.`;
  constants = {
    DYNAMIC_TEMPLATE_CHAR_WARNING
  };
  return constants;
}
var validateSettings;
var hasRequiredValidateSettings;
function requireValidateSettings() {
  if (hasRequiredValidateSettings) return validateSettings;
  hasRequiredValidateSettings = 1;
  const validate = (parent, parentName, childName, childType) => {
    if (typeof parent === "undefined" || typeof parent[childName] === "undefined") {
      return;
    }
    if (typeof parent[childName] !== childType) {
      throw new Error(`${childType} expected for \`${parentName}.${childName}\``);
    }
  };
  validateSettings = {
    validateMailSettings(settings) {
      if (typeof settings !== "object") {
        throw new Error("Object expected for `mailSettings`");
      }
      const {
        bcc,
        bypassListManagement,
        bypassSpamManagement,
        bypassBounceManagement,
        bypassUnsubscribeManagement,
        footer,
        sandboxMode,
        spamCheck
      } = settings;
      validate(bcc, "bcc", "enable", "boolean");
      validate(bcc, "bcc", "email", "string");
      validate(bypassListManagement, "bypassListManagement", "enable", "boolean");
      validate(bypassSpamManagement, "bypassSpamManagement", "enable", "boolean");
      validate(bypassBounceManagement, "bypassBounceManagement", "enable", "boolean");
      validate(bypassUnsubscribeManagement, "bypassUnsubscribeManagement", "enable", "boolean");
      validate(footer, "footer", "enable", "boolean");
      validate(footer, "footer", "text", "string");
      validate(footer, "footer", "html", "string");
      validate(sandboxMode, "sandboxMode", "enable", "boolean");
      validate(spamCheck, "spamCheck", "enable", "boolean");
      validate(spamCheck, "spamCheck", "threshold", "number");
      validate(spamCheck, "spamCheck", "postToUrl", "string");
    },
    validateTrackingSettings(settings) {
      if (typeof settings !== "object") {
        throw new Error("Object expected for `trackingSettings`");
      }
      const {
        clickTracking,
        openTracking,
        subscriptionTracking,
        ganalytics
      } = settings;
      validate(clickTracking, "clickTracking", "enable", "boolean");
      validate(clickTracking, "clickTracking", "enableText", "boolean");
      validate(openTracking, "openTracking", "enable", "boolean");
      validate(openTracking, "openTracking", "substitutionTag", "string");
      validate(subscriptionTracking, "subscriptionTracking", "enable", "boolean");
      validate(subscriptionTracking, "subscriptionTracking", "text", "string");
      validate(subscriptionTracking, "subscriptionTracking", "html", "string");
      validate(subscriptionTracking, "subscriptionTracking", "substitutionTag", "string");
      validate(ganalytics, "ganalytics", "enable", "boolean");
      validate(ganalytics, "ganalytics", "utm_source", "string");
      validate(ganalytics, "ganalytics", "utm_medium", "string");
      validate(ganalytics, "ganalytics", "utm_term", "string");
      validate(ganalytics, "ganalytics", "utm_content", "string");
      validate(ganalytics, "ganalytics", "utm_campaign", "string");
    }
  };
  return validateSettings;
}
var mail;
var hasRequiredMail;
function requireMail() {
  if (hasRequiredMail) return mail;
  hasRequiredMail = 1;
  const EmailAddress = requireEmailAddress();
  const Personalization = requirePersonalization();
  const toCamelCase2 = requireToCamelCase();
  const toSnakeCase2 = requireToSnakeCase();
  const deepClone2 = requireDeepClone();
  const arrayToJSON = requireArrayToJson();
  const { DYNAMIC_TEMPLATE_CHAR_WARNING } = requireConstants();
  const { validateMailSettings, validateTrackingSettings } = requireValidateSettings();
  class Mail {
    /**
     * Constructor
     */
    constructor(data) {
      this.isDynamic = false;
      this.hideWarnings = false;
      this.personalizations = [];
      this.attachments = [];
      this.content = [];
      this.categories = [];
      this.headers = {};
      this.sections = {};
      this.customArgs = {};
      this.trackingSettings = {};
      this.mailSettings = {};
      this.asm = {};
      this.substitutions = null;
      this.substitutionWrappers = null;
      this.dynamicTemplateData = null;
      if (data) {
        this.fromData(data);
      }
    }
    /**
     * Build from data
     */
    fromData(data) {
      if (typeof data !== "object") {
        throw new Error("Expecting object for Mail data");
      }
      data = deepClone2(data);
      data = toCamelCase2(data, ["substitutions", "dynamicTemplateData", "customArgs", "headers", "sections"]);
      const {
        to,
        from,
        replyTo,
        cc,
        bcc,
        sendAt,
        subject,
        text,
        html,
        content,
        templateId,
        personalizations,
        attachments,
        ipPoolName,
        batchId,
        sections,
        headers,
        categories,
        category,
        customArgs,
        asm,
        mailSettings,
        trackingSettings,
        substitutions,
        substitutionWrappers,
        dynamicTemplateData,
        isMultiple,
        hideWarnings,
        replyToList
      } = data;
      this.setFrom(from);
      this.setReplyTo(replyTo);
      this.setSubject(subject);
      this.setSendAt(sendAt);
      this.setTemplateId(templateId);
      this.setBatchId(batchId);
      this.setIpPoolName(ipPoolName);
      this.setAttachments(attachments);
      this.setContent(content);
      this.setSections(sections);
      this.setHeaders(headers);
      this.setCategories(category);
      this.setCategories(categories);
      this.setCustomArgs(customArgs);
      this.setAsm(asm);
      this.setMailSettings(mailSettings);
      this.setTrackingSettings(trackingSettings);
      this.setHideWarnings(hideWarnings);
      this.setReplyToList(replyToList);
      if (this.isDynamic) {
        this.setDynamicTemplateData(dynamicTemplateData);
      } else {
        this.setSubstitutions(substitutions);
        this.setSubstitutionWrappers(substitutionWrappers);
      }
      this.addTextContent(text);
      this.addHtmlContent(html);
      if (personalizations) {
        this.setPersonalizations(personalizations);
      } else if (isMultiple && Array.isArray(to)) {
        to.forEach((to2) => this.addTo(to2, cc, bcc));
      } else {
        this.addTo(to, cc, bcc);
      }
    }
    /**
     * Set from email
     */
    setFrom(from) {
      if (this._checkProperty("from", from, [this._checkUndefined])) {
        if (typeof from !== "string" && typeof from.email !== "string") {
          throw new Error("String or address object expected for `from`");
        }
        this.from = EmailAddress.create(from);
      }
    }
    /**
     * Set reply to
     */
    setReplyTo(replyTo) {
      if (this._checkProperty("replyTo", replyTo, [this._checkUndefined])) {
        if (typeof replyTo !== "string" && typeof replyTo.email !== "string") {
          throw new Error("String or address object expected for `replyTo`");
        }
        this.replyTo = EmailAddress.create(replyTo);
      }
    }
    /**
     * Set subject
     */
    setSubject(subject) {
      this._setProperty("subject", subject, "string");
    }
    /**
     * Set send at
     */
    setSendAt(sendAt) {
      if (this._checkProperty("sendAt", sendAt, [this._checkUndefined, this._createCheckThatThrows(Number.isInteger, "Integer expected for `sendAt`")])) {
        this.sendAt = sendAt;
      }
    }
    /**
     * Set template ID, also checks if the template is dynamic or legacy
     */
    setTemplateId(templateId) {
      if (this._setProperty("templateId", templateId, "string")) {
        if (templateId.indexOf("d-") === 0) {
          this.isDynamic = true;
        }
      }
    }
    /**
     * Set batch ID
     */
    setBatchId(batchId) {
      this._setProperty("batchId", batchId, "string");
    }
    /**
     * Set IP pool name
     */
    setIpPoolName(ipPoolName) {
      this._setProperty("ipPoolName", ipPoolName, "string");
    }
    /**
     * Set ASM
     */
    setAsm(asm) {
      if (this._checkProperty("asm", asm, [this._checkUndefined, this._createTypeCheck("object")])) {
        if (typeof asm.groupId !== "number") {
          throw new Error("Expected `asm` to include an integer in its `groupId` field");
        }
        if (asm.groupsToDisplay && (!Array.isArray(asm.groupsToDisplay) || !asm.groupsToDisplay.every((group) => typeof group === "number"))) {
          throw new Error("Array of integers expected for `asm.groupsToDisplay`");
        }
        this.asm = asm;
      }
    }
    /**
     * Set personalizations
     */
    setPersonalizations(personalizations) {
      if (!this._doArrayCheck("personalizations", personalizations)) {
        return;
      }
      if (!personalizations.every((personalization2) => typeof personalization2 === "object")) {
        throw new Error("Array of objects expected for `personalizations`");
      }
      this.personalizations = [];
      personalizations.forEach((personalization2) => this.addPersonalization(personalization2));
    }
    /**
     * Add personalization
     */
    addPersonalization(personalization2) {
      if (this.isDynamic && personalization2.substitutions) {
        delete personalization2.substitutions;
      } else if (!this.isDynamic && personalization2.dynamicTemplateData) {
        delete personalization2.dynamicTemplateData;
      }
      if (!(personalization2 instanceof Personalization)) {
        personalization2 = new Personalization(personalization2);
      }
      if (this.isDynamic) {
        this.applyDynamicTemplateData(personalization2);
      } else {
        this.applySubstitutions(personalization2);
      }
      this.personalizations.push(personalization2);
    }
    /**
     * Convenience method for quickly creating personalizations
     */
    addTo(to, cc, bcc) {
      if (typeof to === "undefined" && typeof cc === "undefined" && typeof bcc === "undefined") {
        throw new Error("Provide at least one of to, cc or bcc");
      }
      this.addPersonalization(new Personalization({ to, cc, bcc }));
    }
    /**
     * Set substitutions
     */
    setSubstitutions(substitutions) {
      this._setProperty("substitutions", substitutions, "object");
    }
    /**
     * Set substitution wrappers
     */
    setSubstitutionWrappers(substitutionWrappers) {
      let lengthCheck = (propertyName, value) => {
        if (!Array.isArray(value) || value.length !== 2) {
          throw new Error("Array expected with two elements for `" + propertyName + "`");
        }
      };
      if (this._checkProperty("substitutionWrappers", substitutionWrappers, [this._checkUndefined, lengthCheck])) {
        this.substitutionWrappers = substitutionWrappers;
      }
    }
    /**
     * Helper which applies globally set substitutions to personalizations
     */
    applySubstitutions(personalization2) {
      if (personalization2 instanceof Personalization) {
        personalization2.reverseMergeSubstitutions(this.substitutions);
        personalization2.setSubstitutionWrappers(this.substitutionWrappers);
      }
    }
    /**
     * Helper which applies globally set dynamic_template_data to personalizations
     */
    applyDynamicTemplateData(personalization2) {
      if (personalization2 instanceof Personalization) {
        personalization2.deepMergeDynamicTemplateData(this.dynamicTemplateData);
      }
    }
    /**
     * Set dynamicTemplateData
     */
    setDynamicTemplateData(dynamicTemplateData) {
      if (typeof dynamicTemplateData === "undefined") {
        return;
      }
      if (typeof dynamicTemplateData !== "object") {
        throw new Error("Object expected for `dynamicTemplateData`");
      }
      if (!this.hideWarnings) {
        Object.values(dynamicTemplateData).forEach((value) => {
          if (/['"&]/.test(value)) {
            console.warn(DYNAMIC_TEMPLATE_CHAR_WARNING);
          }
        });
      }
      this.dynamicTemplateData = dynamicTemplateData;
    }
    /**
     * Set content
     */
    setContent(content) {
      if (this._doArrayCheck("content", content)) {
        if (!content.every((contentField) => typeof contentField === "object")) {
          throw new Error("Expected each entry in `content` to be an object");
        }
        if (!content.every((contentField) => typeof contentField.type === "string")) {
          throw new Error("Expected each `content` entry to contain a `type` string");
        }
        if (!content.every((contentField) => typeof contentField.value === "string")) {
          throw new Error("Expected each `content` entry to contain a `value` string");
        }
        this.content = content;
      }
    }
    /**
     * Add content
     */
    addContent(content) {
      if (this._checkProperty("content", content, [this._createTypeCheck("object")])) {
        this.content.push(content);
      }
    }
    /**
     * Add text content
     */
    addTextContent(text) {
      if (this._checkProperty("text", text, [this._checkUndefined, this._createTypeCheck("string")])) {
        this.addContent({
          value: text,
          type: "text/plain"
        });
      }
    }
    /**
     * Add HTML content
     */
    addHtmlContent(html) {
      if (this._checkProperty("html", html, [this._checkUndefined, this._createTypeCheck("string")])) {
        this.addContent({
          value: html,
          type: "text/html"
        });
      }
    }
    /**
     * Set attachments
     */
    setAttachments(attachments) {
      if (this._doArrayCheck("attachments", attachments)) {
        if (!attachments.every((attachment2) => typeof attachment2.content === "string")) {
          throw new Error("Expected each attachment to contain a `content` string");
        }
        if (!attachments.every((attachment2) => typeof attachment2.filename === "string")) {
          throw new Error("Expected each attachment to contain a `filename` string");
        }
        if (!attachments.every((attachment2) => !attachment2.type || typeof attachment2.type === "string")) {
          throw new Error("Expected the attachment's `type` field to be a string");
        }
        if (!attachments.every((attachment2) => !attachment2.disposition || typeof attachment2.disposition === "string")) {
          throw new Error("Expected the attachment's `disposition` field to be a string");
        }
        this.attachments = attachments;
      }
    }
    /**
     * Add attachment
     */
    addAttachment(attachment2) {
      if (this._checkProperty("attachment", attachment2, [this._checkUndefined, this._createTypeCheck("object")])) {
        this.attachments.push(attachment2);
      }
    }
    /**
     * Set categories
     */
    setCategories(categories) {
      let allElementsAreStrings = (propertyName, value) => {
        if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
          throw new Error("Array of strings expected for `" + propertyName + "`");
        }
      };
      if (typeof categories === "string") {
        categories = [categories];
      }
      if (this._checkProperty("categories", categories, [this._checkUndefined, allElementsAreStrings])) {
        this.categories = categories;
      }
    }
    /**
     * Add category
     */
    addCategory(category) {
      if (this._checkProperty("category", category, [this._createTypeCheck("string")])) {
        this.categories.push(category);
      }
    }
    /**
     * Set headers
     */
    setHeaders(headers) {
      this._setProperty("headers", headers, "object");
    }
    /**
     * Add a header
     */
    addHeader(key, value) {
      if (this._checkProperty("key", key, [this._createTypeCheck("string")]) && this._checkProperty("value", value, [this._createTypeCheck("string")])) {
        this.headers[key] = value;
      }
    }
    /**
     * Set sections
     */
    setSections(sections) {
      this._setProperty("sections", sections, "object");
    }
    /**
     * Set custom args
     */
    setCustomArgs(customArgs) {
      this._setProperty("customArgs", customArgs, "object");
    }
    /**
     * Set tracking settings
     */
    setTrackingSettings(settings) {
      if (typeof settings === "undefined") {
        return;
      }
      validateTrackingSettings(settings);
      this.trackingSettings = settings;
    }
    /**
     * Set mail settings
     */
    setMailSettings(settings) {
      if (typeof settings === "undefined") {
        return;
      }
      validateMailSettings(settings);
      this.mailSettings = settings;
    }
    /**
     * Set hide warnings
     */
    setHideWarnings(hide) {
      if (typeof hide === "undefined") {
        return;
      }
      if (typeof hide !== "boolean") {
        throw new Error("Boolean expected for `hideWarnings`");
      }
      this.hideWarnings = hide;
    }
    /**
     * To JSON
     */
    toJSON() {
      const {
        from,
        replyTo,
        sendAt,
        subject,
        content,
        templateId,
        personalizations,
        attachments,
        ipPoolName,
        batchId,
        asm,
        sections,
        headers,
        categories,
        customArgs,
        mailSettings,
        trackingSettings,
        replyToList
      } = this;
      const json = {
        from,
        subject,
        personalizations: arrayToJSON(personalizations)
      };
      if (Array.isArray(attachments) && attachments.length > 0) {
        json.attachments = arrayToJSON(attachments);
      }
      if (Array.isArray(categories) && categories.length > 0) {
        json.categories = categories.filter((cat) => cat !== "");
      }
      if (Array.isArray(content) && content.length > 0) {
        json.content = arrayToJSON(content);
      }
      if (Object.keys(headers).length > 0) {
        json.headers = headers;
      }
      if (Object.keys(mailSettings).length > 0) {
        json.mailSettings = mailSettings;
      }
      if (Object.keys(trackingSettings).length > 0) {
        json.trackingSettings = trackingSettings;
      }
      if (Object.keys(customArgs).length > 0) {
        json.customArgs = customArgs;
      }
      if (Object.keys(sections).length > 0) {
        json.sections = sections;
      }
      if (Object.keys(asm).length > 0) {
        json.asm = asm;
      }
      if (typeof replyTo !== "undefined") {
        json.replyTo = replyTo;
      }
      if (typeof sendAt !== "undefined") {
        json.sendAt = sendAt;
      }
      if (typeof batchId !== "undefined") {
        json.batchId = batchId;
      }
      if (typeof templateId !== "undefined") {
        json.templateId = templateId;
      }
      if (typeof ipPoolName !== "undefined") {
        json.ipPoolName = ipPoolName;
      }
      if (typeof replyToList !== "undefined") {
        json.replyToList = replyToList;
      }
      return toSnakeCase2(json, ["substitutions", "dynamicTemplateData", "customArgs", "headers", "sections"]);
    }
    /**************************************************************************
     * Static helpers
     ***/
    /**
     * Create a Mail instance from given data
     */
    static create(data) {
      if (Array.isArray(data)) {
        return data.filter((item) => !!item).map((item) => this.create(item));
      }
      if (data instanceof Mail) {
        return data;
      }
      return new Mail(data);
    }
    /**************************************************************************
     * helpers for property-setting checks
     ***/
    /**
     * Perform a set of checks on the new property value. Returns true if all
     * checks complete successfully without throwing errors or returning true.
     */
    _checkProperty(propertyName, value, checks) {
      return !checks.some((e) => e(propertyName, value));
    }
    /**
     * Set a property with normal undefined and type-checks
     */
    _setProperty(propertyName, value, propertyType) {
      let propertyChecksPassed = this._checkProperty(
        propertyName,
        value,
        [this._checkUndefined, this._createTypeCheck(propertyType)]
      );
      if (propertyChecksPassed) {
        this[propertyName] = value;
      }
      return propertyChecksPassed;
    }
    /**
     * Fail if the value is undefined.
     */
    _checkUndefined(propertyName, value) {
      return typeof value === "undefined";
    }
    /**
     * Create and return a function that checks for a given type
     */
    _createTypeCheck(propertyType) {
      return (propertyName, value) => {
        if (typeof value !== propertyType) {
          throw new Error(propertyType + " expected for `" + propertyName + "`");
        }
      };
    }
    /**
     * Create a check out of a callback. If the callback
     * returns false, the check will throw an error.
     */
    _createCheckThatThrows(check, errorString) {
      return (propertyName, value) => {
        if (!check(value)) {
          throw new Error(errorString);
        }
      };
    }
    /**
     * Set an array property after checking that the new value is an
     * array.
     */
    _setArrayProperty(propertyName, value) {
      if (this._doArrayCheck(propertyName, value)) {
        this[propertyName] = value;
      }
    }
    /**
     * Check that a value isn't undefined and is an array.
     */
    _doArrayCheck(propertyName, value) {
      return this._checkProperty(
        propertyName,
        value,
        [this._checkUndefined, this._createCheckThatThrows(Array.isArray, "Array expected for`" + propertyName + "`")]
      );
    }
    /**
     * Set the replyToList from email body
     */
    setReplyToList(replyToList) {
      if (this._doArrayCheck("replyToList", replyToList) && replyToList.length) {
        if (!replyToList.every((replyTo) => replyTo && typeof replyTo.email === "string")) {
          throw new Error("Expected each replyTo to contain an `email` string");
        }
        this.replyToList = replyToList;
      }
    }
  }
  mail = Mail;
  return mail;
}
var response;
var hasRequiredResponse;
function requireResponse() {
  if (hasRequiredResponse) return response;
  hasRequiredResponse = 1;
  class Response {
    constructor(statusCode, body, headers) {
      this.statusCode = statusCode;
      this.body = body;
      this.headers = headers;
    }
    toString() {
      return "HTTP " + this.statusCode + " " + this.body;
    }
  }
  response = Response;
  return response;
}
var responseError;
var hasRequiredResponseError;
function requireResponseError() {
  if (hasRequiredResponseError) return responseError;
  hasRequiredResponseError = 1;
  class ResponseError extends Error {
    /**
     * Constructor
     */
    constructor(response2) {
      super();
      const { headers, status, statusText, data } = response2;
      this.code = status;
      this.message = statusText;
      this.response = { headers, body: data };
      if (!this.stack) {
        Error.captureStackTrace(this, this.constructor);
      }
      const regex = new RegExp(process.cwd() + "/", "gi");
      this.stack = this.stack.replace(regex, "");
    }
    /**
     * Convert to string
     */
    toString() {
      const { body } = this.response;
      let err = `${this.message} (${this.code})`;
      if (body && Array.isArray(body.errors)) {
        body.errors.forEach((error) => {
          const message = error.message;
          const field = error.field;
          const help = error.help;
          err += `
  ${message}
    ${field}
    ${help}`;
        });
      }
      return err;
    }
    /**
     * Convert to simple object for JSON responses
     */
    toJSON() {
      const { message, code, response: response2 } = this;
      return { message, code, response: response2 };
    }
  }
  responseError = ResponseError;
  return responseError;
}
var statistics;
var hasRequiredStatistics;
function requireStatistics() {
  if (hasRequiredStatistics) return statistics;
  hasRequiredStatistics = 1;
  const toCamelCase2 = requireToCamelCase();
  const deepClone2 = requireDeepClone();
  const AggregatedByOptions = ["day", "week", "month"];
  const CountryOptions = ["us", "ca"];
  const SortByDirection = ["desc", "asc"];
  class Statistics {
    constructor(data) {
      this.startDate = null;
      this.endDate = null;
      this.aggregatedBy = null;
      if (data) {
        this.fromData(data);
      }
    }
    /**
     * Build from data
     */
    fromData(data) {
      if (typeof data !== "object") {
        throw new Error("Expecting object for Statistics data");
      }
      data = deepClone2(data);
      data = toCamelCase2(data, ["substitutions", "customArgs"]);
      const {
        startDate,
        endDate,
        aggregatedBy
      } = data;
      this.setStartDate(startDate);
      this.setEndDate(endDate);
      this.setAggregatedBy(aggregatedBy);
    }
    /**
     * Set startDate
     */
    setStartDate(startDate) {
      if (typeof startDate === "undefined") {
        throw new Error("Date expected for `startDate`");
      }
      if (new Date(startDate) === "Invalid Date" || isNaN(new Date(startDate))) {
        throw new Error("Date expected for `startDate`");
      }
      console.log(startDate);
      this.startDate = new Date(startDate).toISOString().slice(0, 10);
    }
    /**
     * Set endDate
     */
    setEndDate(endDate) {
      if (typeof endDate === "undefined") {
        this.endDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        return;
      }
      if (new Date(endDate) === "Invalid Date" || isNaN(new Date(endDate))) {
        throw new Error("Date expected for `endDate`");
      }
      this.endDate = new Date(endDate).toISOString().slice(0, 10);
    }
    /**
     * Set aggregatedBy
     */
    setAggregatedBy(aggregatedBy) {
      if (typeof aggregatedBy === "undefined") {
        return;
      }
      if (typeof aggregatedBy === "string" && AggregatedByOptions.includes(aggregatedBy.toLowerCase())) {
        this.aggregatedBy = aggregatedBy;
      } else {
        throw new Error("Incorrect value for `aggregatedBy`");
      }
    }
    /**
     * Get Global
     */
    getGlobal() {
      const { startDate, endDate, aggregatedBy } = this;
      return { startDate, endDate, aggregatedBy };
    }
    /**
     * Get Advanced
     */
    getAdvanced(country) {
      const json = this.getGlobal();
      if (typeof country === "undefined") {
        return json;
      }
      if (typeof country === "string" && CountryOptions.includes(country.toLowerCase())) {
        json.country = country;
      }
      return json;
    }
    /**
     * Get Advanced Mailbox Providers
     */
    getAdvancedMailboxProviders(mailBoxProviders) {
      const json = this.getGlobal();
      if (typeof mailBoxProviders === "undefined") {
        return json;
      }
      if (Array.isArray(mailBoxProviders) && mailBoxProviders.some((x) => typeof x !== "string")) {
        throw new Error("Array of strings expected for `mailboxProviders`");
      }
      json.mailBoxProviders = mailBoxProviders;
      return json;
    }
    /**
     * Get Advanced Browsers
     */
    getAdvancedBrowsers(browsers) {
      const json = this.getGlobal();
      if (typeof browsers === "undefined") {
        return json;
      }
      if (Array.isArray(browsers) && browsers.some((x) => typeof x !== "string")) {
        throw new Error("Array of strings expected for `browsers`");
      }
      json.browsers = browsers;
      return json;
    }
    /**
     * Get Categories
     */
    getCategories(categories) {
      if (typeof categories === "undefined") {
        throw new Error("Array of strings expected for `categories`");
      }
      if (!this._isValidArrayOfStrings(categories)) {
        throw new Error("Array of strings expected for `categories`");
      }
      const json = this.getGlobal();
      json.categories = categories;
      return json;
    }
    /**
     * Get Subuser
     */
    getSubuser(subusers) {
      if (typeof subusers === "undefined") {
        throw new Error("Array of strings expected for `subusers`");
      }
      if (!this._isValidArrayOfStrings(subusers)) {
        throw new Error("Array of strings expected for `subusers`");
      }
      const json = this.getGlobal();
      json.subusers = subusers;
      return json;
    }
    /**
     * Get Subuser Sum
     */
    getSubuserSum(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
      if (typeof sortByMetric !== "string") {
        throw new Error("string expected for `sortByMetric`");
      }
      if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
        throw new Error("desc or asc expected for `sortByDirection`");
      }
      if (typeof limit !== "number") {
        throw new Error("number expected for `limit`");
      }
      if (typeof offset !== "number") {
        throw new Error("number expected for `offset`");
      }
      const json = this.getGlobal();
      json.sortByMetric = sortByMetric;
      json.sortByDirection = sortByDirection;
      json.limit = limit;
      json.offset = offset;
      return json;
    }
    /**
     * Get Subuser Monthly
     */
    getSubuserMonthly(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
      if (typeof sortByMetric !== "string") {
        throw new Error("string expected for `sortByMetric`");
      }
      if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
        throw new Error("desc or asc expected for `sortByDirection`");
      }
      if (typeof limit !== "number") {
        throw new Error("number expected for `limit`");
      }
      if (typeof offset !== "number") {
        throw new Error("number expected for `offset`");
      }
      const json = this.getGlobal();
      json.sortByMetric = sortByMetric;
      json.sortByDirection = sortByDirection;
      json.limit = limit;
      json.offset = offset;
      return json;
    }
    _isValidArrayOfStrings(arr) {
      if (!Array.isArray(arr)) {
        return false;
      }
      if (arr.length < 1 || arr.some((x) => typeof x !== "string")) {
        return false;
      }
      return true;
    }
  }
  statistics = Statistics;
  return statistics;
}
var classes;
var hasRequiredClasses;
function requireClasses() {
  if (hasRequiredClasses) return classes;
  hasRequiredClasses = 1;
  const Attachment = requireAttachment();
  const EmailAddress = requireEmailAddress();
  const Mail = requireMail();
  const Personalization = requirePersonalization();
  const Response = requireResponse();
  const ResponseError = requireResponseError();
  const Statistics = requireStatistics();
  classes = {
    Attachment,
    EmailAddress,
    Mail,
    Personalization,
    Response,
    ResponseError,
    Statistics
  };
  return classes;
}
var mergeData;
var hasRequiredMergeData;
function requireMergeData() {
  if (hasRequiredMergeData) return mergeData;
  hasRequiredMergeData = 1;
  mergeData = function mergeData2(base, data) {
    if (typeof base !== "object" || base === null) {
      throw new Error("Not an object provided for base");
    }
    if (typeof data !== "object" || data === null) {
      throw new Error("Not an object provided for data");
    }
    const merged = Object.assign({}, base);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] && Array.isArray(data[key])) {
          merged[key] = data[key];
        } else if (data[key] && typeof data[key] === "object") {
          merged[key] = Object.assign({}, data[key]);
        } else if (data[key]) {
          merged[key] = data[key];
        }
      }
    }
    return merged;
  };
  return mergeData;
}
var helpers;
var hasRequiredHelpers$1;
function requireHelpers$1() {
  if (hasRequiredHelpers$1) return helpers;
  hasRequiredHelpers$1 = 1;
  const arrayToJSON = requireArrayToJson();
  const convertKeys2 = requireConvertKeys();
  const deepClone2 = requireDeepClone();
  const mergeData2 = requireMergeData();
  const splitNameEmail2 = requireSplitNameEmail();
  const toCamelCase2 = requireToCamelCase();
  const toSnakeCase2 = requireToSnakeCase();
  const wrapSubstitutions2 = requireWrapSubstitutions();
  helpers = {
    arrayToJSON,
    convertKeys: convertKeys2,
    deepClone: deepClone2,
    mergeData: mergeData2,
    splitNameEmail: splitNameEmail2,
    toCamelCase: toCamelCase2,
    toSnakeCase: toSnakeCase2,
    wrapSubstitutions: wrapSubstitutions2
  };
  return helpers;
}
var helpers_1;
var hasRequiredHelpers;
function requireHelpers() {
  if (hasRequiredHelpers) return helpers_1;
  hasRequiredHelpers = 1;
  const classes2 = requireClasses();
  const helpers2 = requireHelpers$1();
  helpers_1 = { classes: classes2, helpers: helpers2 };
  return helpers_1;
}
export {
  requireHelpers as r
};
