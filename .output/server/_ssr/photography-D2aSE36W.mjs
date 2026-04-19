import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "zlib";
import "http";
import "https";
import "../_libs/follow-redirects.mjs";
import "url";
import "assert";
import "stream";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/ms.mjs";
import "util";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
const getPhotos_createServerFn_handler = createServerRpc({
  id: "72d21cfa9bf36b375a6838f9e5aad8242d47ec208ce0833b3d8e6d299e4ba840",
  name: "getPhotos",
  filename: "src/routes/photography.tsx"
}, (opts) => getPhotos.__executeServer(opts));
const getPhotos = createServerFn({
  method: "GET"
}).handler(getPhotos_createServerFn_handler, async () => {
  const clientID = process.env.UNSPLASH_ID;
  if (!clientID) return [];
  try {
    const req = await axios.get(`https://api.unsplash.com/users/kennymark/photos?client_id=${clientID}&per_page=36`);
    return req.data;
  } catch {
    return [];
  }
});
export {
  getPhotos_createServerFn_handler
};
