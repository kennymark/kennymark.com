import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { m as matter } from "../_libs/gray-matter.mjs";
import { t as timeRead } from "../_libs/read-time.mjs";
import { g as getAllArticles } from "./devblog-B8viLmY8.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/axios.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "fs";
import "../_libs/section-matter.mjs";
import "../_libs/kind-of.mjs";
import "../_libs/extend-shallow.mjs";
import "../_libs/is-extendable.mjs";
import "../_libs/js-yaml.mjs";
import "../_libs/strip-bom-string.mjs";
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
import "stream";
import "util";
import "../_libs/isbot.mjs";
import "zlib";
import "http";
import "https";
import "../_libs/follow-redirects.mjs";
import "url";
import "assert";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/ms.mjs";
const getPosts_createServerFn_handler = createServerRpc({
  id: "5d5a566eb1bdd1b20fbc39937cbed0aabc7d3ef0401c68d3df24d6b502dcce9c",
  name: "getPosts",
  filename: "src/routes/blog.index.tsx"
}, (opts) => getPosts.__executeServer(opts));
const getPosts = createServerFn({
  method: "GET"
}).handler(getPosts_createServerFn_handler, async () => {
  const articles = await getAllArticles();
  return articles.map((post) => {
    const meta = matter(post.markdown).data;
    return {
      title: meta.title ?? post.title,
      description: meta.description ?? post.description,
      slug: post.devToSlug,
      date: post.publishedAt,
      timeToRead: timeRead(post.markdown).m + 1
    };
  });
});
export {
  getPosts_createServerFn_handler
};
