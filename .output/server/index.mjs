globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/404-lMjH16hM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c4-0eClOfz3JeJKF/1Ylka/gp7qrAg"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 708,
    "path": "../public/assets/404-lMjH16hM.js"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"47e-ice+v6U27QRdcLXXRwxKzLVV23s"',
    "mtime": "2026-04-19T16:25:36.956Z",
    "size": 1150,
    "path": "../public/favicon.ico"
  },
  "/assets/_short-Fu-8wPXg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c3-Nak6ad74Roa3XwM5j7loT1j4s1A"',
    "mtime": "2026-04-19T16:25:35.948Z",
    "size": 707,
    "path": "../public/assets/_short-Fu-8wPXg.js"
  },
  "/KennyCV.pdf": {
    "type": "application/pdf",
    "etag": '"9b76-Is4Vz98IKWivP1w8gHm1FJhIvO0"',
    "mtime": "2026-04-19T16:25:36.956Z",
    "size": 39798,
    "path": "../public/KennyCV.pdf"
  },
  "/assets/blog.index-lePIsrL0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d87-1SONx5pbcRloJrueb9XHR3R7TtY"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 3463,
    "path": "../public/assets/blog.index-lePIsrL0.js"
  },
  "/assets/blog._slug-DCv42QZS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ab2-2Jz5Zd6miudLayLv6yHnCKW+x1Q"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 2738,
    "path": "../public/assets/blog._slug-DCv42QZS.js"
  },
  "/assets/dashboard-DeuLpcIz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dcb-hXbWfjQgX7jk/KJPTI7th3i5geE"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 3531,
    "path": "../public/assets/dashboard-DeuLpcIz.js"
  },
  "/assets/globals-BNSsMKgE.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"8801-BGPBXzDaxn//d9O8FCu26wHzQHA"',
    "mtime": "2026-04-19T16:25:35.948Z",
    "size": 34817,
    "path": "../public/assets/globals-BNSsMKgE.css"
  },
  "/assets/index-BcN45GJd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21a6-/KXmTlpgnUcRzk3Px5WbE8x8ZJI"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 8614,
    "path": "../public/assets/index-BcN45GJd.js"
  },
  "/assets/newsletter-form-CRQxBei0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"374f-XuVmBe1ODVJkFkRG8N1khI0mxic"',
    "mtime": "2026-04-19T16:25:35.948Z",
    "size": 14159,
    "path": "../public/assets/newsletter-form-CRQxBei0.js"
  },
  "/assets/photography-zSrDTYvi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"806-OWKYkx73EhkyIsH2wVXWTyZNqpE"',
    "mtime": "2026-04-19T16:25:35.946Z",
    "size": 2054,
    "path": "../public/assets/photography-zSrDTYvi.js"
  },
  "/assets/profile-CJJtZdwq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e08-nfMfe23Je9Wk9YKYVB/NyNDfewQ"',
    "mtime": "2026-04-19T16:25:35.947Z",
    "size": 3592,
    "path": "../public/assets/profile-CJJtZdwq.js"
  },
  "/assets/project._slug-Cm2fmSL_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"85e-uO2yd42mNsXuICKw3HKJ6MHYj2g"',
    "mtime": "2026-04-19T16:25:35.948Z",
    "size": 2142,
    "path": "../public/assets/project._slug-Cm2fmSL_.js"
  },
  "/assets/projects-BSBYisTw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f50-a83ZgB6Nxukh8Fuy/XpBJbGRgVc"',
    "mtime": "2026-04-19T16:25:35.945Z",
    "size": 3920,
    "path": "../public/assets/projects-BSBYisTw.js"
  },
  "/assets/slashes-B-NbpWzA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"59e-HeQh5nQTArsHEVv/oAOQ7nh4x2k"',
    "mtime": "2026-04-19T16:25:35.948Z",
    "size": 1438,
    "path": "../public/assets/slashes-B-NbpWzA.js"
  },
  "/images/devops.svg": {
    "type": "image/svg+xml",
    "etag": '"2f9a-d9z7t7rs47D+AArQq2D9v0SzyzM"',
    "mtime": "2026-04-19T16:25:36.939Z",
    "size": 12186,
    "path": "../public/images/devops.svg"
  },
  "/images/error404.svg": {
    "type": "image/svg+xml",
    "etag": '"17db-huItU3eZCNgHyNYqgUnSFbXuHf4"',
    "mtime": "2026-04-19T16:25:36.906Z",
    "size": 6107,
    "path": "../public/images/error404.svg"
  },
  "/images/extras.svg": {
    "type": "image/svg+xml",
    "etag": '"485e-PulAFz1O63HUiUvB6LsHj9Ke6xY"',
    "mtime": "2026-04-19T16:25:36.932Z",
    "size": 18526,
    "path": "../public/images/extras.svg"
  },
  "/images/favicon.png": {
    "type": "image/png",
    "etag": '"25bc-Xbdn1S0JAqP7Q6gv5z6ZyTRvvlo"',
    "mtime": "2026-04-19T16:25:36.933Z",
    "size": 9660,
    "path": "../public/images/favicon.png"
  },
  "/images/front-end.svg": {
    "type": "image/svg+xml",
    "etag": '"5ed0-znoVoCCfdFXCmT+sz73/5MdpwPg"',
    "mtime": "2026-04-19T16:25:36.934Z",
    "size": 24272,
    "path": "../public/images/front-end.svg"
  },
  "/images/github.svg": {
    "type": "image/svg+xml",
    "etag": '"b0a-AZSVjUF4HnrRVlSj8xXUBtJR3YE"',
    "mtime": "2026-04-19T16:25:36.934Z",
    "size": 2826,
    "path": "../public/images/github.svg"
  },
  "/images/backend.svg": {
    "type": "image/svg+xml",
    "etag": '"8aab-pH7g0nBpGfBXfBpaRFtJMXwxen8"',
    "mtime": "2026-04-19T16:25:36.932Z",
    "size": 35499,
    "path": "../public/images/backend.svg"
  },
  "/assets/index-MH4s8CYS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"48792-GQ/n/jALpSgtmr/2WzBaD5CnEjs"',
    "mtime": "2026-04-19T16:25:35.946Z",
    "size": 296850,
    "path": "../public/assets/index-MH4s8CYS.js"
  },
  "/images/home-page.png": {
    "type": "image/png",
    "etag": '"4ba45-78eTdNzANn7U1HLsHB+GgpbONoA"',
    "mtime": "2026-04-19T16:25:36.945Z",
    "size": 309829,
    "path": "../public/images/home-page.png"
  },
  "/images/me.jpg": {
    "type": "image/jpeg",
    "etag": '"7067e-ubx0H7GiAaB0RPUpORClAvXR8Yo"',
    "mtime": "2026-04-19T16:25:36.953Z",
    "size": 460414,
    "path": "../public/images/me.jpg"
  },
  "/images/name.svg": {
    "type": "image/svg+xml",
    "etag": '"a12-rF/eznTRR3LUMYQsoT62yuPBjnU"',
    "mtime": "2026-04-19T16:25:36.937Z",
    "size": 2578,
    "path": "../public/images/name.svg"
  },
  "/images/profile.svg": {
    "type": "image/svg+xml",
    "etag": '"277b-yYI8bGqUajbmJfnj5W1RhEHBMuk"',
    "mtime": "2026-04-19T16:25:36.944Z",
    "size": 10107,
    "path": "../public/images/profile.svg"
  },
  "/images/time.svg": {
    "type": "image/svg+xml",
    "etag": '"ab4-LzQLrfbc2N4Lp/JUP/H7M7m66x0"',
    "mtime": "2026-04-19T16:25:36.948Z",
    "size": 2740,
    "path": "../public/images/time.svg"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayBlack.woff": {
    "type": "font/woff",
    "etag": '"8648-50u/huFzPMV49sX9NfDCDbSngiM"',
    "mtime": "2026-04-19T16:25:36.910Z",
    "size": 34376,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayBlack.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayBlackItalic.woff": {
    "type": "font/woff",
    "etag": '"9300-vrrSv8hzv/7vd4LBd/CMKKq++uU"',
    "mtime": "2026-04-19T16:25:36.910Z",
    "size": 37632,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayBlackItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayBold.woff": {
    "type": "font/woff",
    "etag": '"8c58-WpLT2IJa0rPJC53/s3LM3oBRuMA"',
    "mtime": "2026-04-19T16:25:36.950Z",
    "size": 35928,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayBold.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayBoldItalic.woff": {
    "type": "font/woff",
    "etag": '"9974-13K7xhtxrF/1V+a0BvQTOR8FR6Y"',
    "mtime": "2026-04-19T16:25:36.910Z",
    "size": 39284,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayBoldItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayLight.woff": {
    "type": "font/woff",
    "etag": '"8ae8-j6dWkqyetal5MO6pQSXMcO/Fg5E"',
    "mtime": "2026-04-19T16:25:36.915Z",
    "size": 35560,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayLight.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayLightItalic.woff": {
    "type": "font/woff",
    "etag": '"97c8-1D3W/OJd4jj/+uclR6eSZTF9txQ"',
    "mtime": "2026-04-19T16:25:36.912Z",
    "size": 38856,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayLightItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayMediu.woff": {
    "type": "font/woff",
    "etag": '"8940-fOfYfXSEMlOpF8hNQDJy2jsI1a8"',
    "mtime": "2026-04-19T16:25:36.915Z",
    "size": 35136,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayMediu.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayRoman.woff": {
    "type": "font/woff",
    "etag": '"8640-IjrRqu83ptG2DCXUVtcMz8u7wp8"',
    "mtime": "2026-04-19T16:25:36.926Z",
    "size": 34368,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayRoman.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayThin.woff": {
    "type": "font/woff",
    "etag": '"8708-/ngkCgA+0ResIakgBcQd0fZQlp4"',
    "mtime": "2026-04-19T16:25:36.926Z",
    "size": 34568,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayThin.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayRomanItalic.woff": {
    "type": "font/woff",
    "etag": '"914c-NawtreDgd9FTPhW6xWaCigfvid8"',
    "mtime": "2026-04-19T16:25:36.915Z",
    "size": 37196,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayRomanItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayXThin.woff": {
    "type": "font/woff",
    "etag": '"8d90-CkcV4/N+sN6J5Ga28huHVorBXs4"',
    "mtime": "2026-04-19T16:25:36.931Z",
    "size": 36240,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayXThin.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayXXThin.woff": {
    "type": "font/woff",
    "etag": '"88f8-1WfHGbiiuCzC62gx3izoiDkYlxk"',
    "mtime": "2026-04-19T16:25:36.931Z",
    "size": 35064,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayXXThin.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayThinItalic.woff": {
    "type": "font/woff",
    "etag": '"9230-odwK3qLww0eLFFXZFTLmDqJS800"',
    "mtime": "2026-04-19T16:25:36.925Z",
    "size": 37424,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayThinItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayMediumItalic.woff": {
    "type": "font/woff",
    "etag": '"94f8-01hZKtIko9IZVyacsndzdYKwle0"',
    "mtime": "2026-04-19T16:25:36.915Z",
    "size": 38136,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayMediumItalic.woff"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayXXThinItalic.woff": {
    "type": "font/woff",
    "etag": '"9284-BpSMnKz146gze2U6FplXj2AcvwQ"',
    "mtime": "2026-04-19T16:25:36.932Z",
    "size": 37508,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayXXThinItalic.woff"
  },
  "/neue-haas-grotesk-display/fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1011-ln70DYGTsfPXZY0sc7PSfINfB2w"',
    "mtime": "2026-04-19T16:25:36.931Z",
    "size": 4113,
    "path": "../public/neue-haas-grotesk-display/fonts.css"
  },
  "/neue-haas-grotesk-display/NeueHaasDisplayXThinItalic.woff": {
    "type": "font/woff",
    "etag": '"989c-JMX/2OltR50qk0R9HEuX0EBHAmc"',
    "mtime": "2026-04-19T16:25:36.925Z",
    "size": 39068,
    "path": "../public/neue-haas-grotesk-display/NeueHaasDisplayXThinItalic.woff"
  },
  "/images/me2.jpg": {
    "type": "image/jpeg",
    "etag": '"75e9c-X4CDnLXcKWUPNf81rIH4ShqNqEs"',
    "mtime": "2026-04-19T16:25:36.954Z",
    "size": 482972,
    "path": "../public/images/me2.jpg"
  },
  "/images/gifs/e-commerce-store.gif": {
    "type": "image/gif",
    "etag": '"51886-WhFKsEo+T1cgtAB8ioTMBmp0FA0"',
    "mtime": "2026-04-19T16:25:36.956Z",
    "size": 333958,
    "path": "../public/images/gifs/e-commerce-store.gif"
  },
  "/images/gifs/clever-advisor.gif": {
    "type": "image/gif",
    "etag": '"74d76-stzlJZwvp/3hdhxUZYP+BAdx5o8"',
    "mtime": "2026-04-19T16:25:36.955Z",
    "size": 478582,
    "path": "../public/images/gifs/clever-advisor.gif"
  },
  "/images/gifs/petitions-dashboard.gif": {
    "type": "image/gif",
    "etag": '"200768-Pa4DfY3JjUtQvizBwzWcwlrzUdM"',
    "mtime": "2026-04-19T16:25:36.960Z",
    "size": 2099048,
    "path": "../public/images/gifs/petitions-dashboard.gif"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _2NwDDc = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_fnMXUh = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_fnMXUh };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_2NwDDc)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
