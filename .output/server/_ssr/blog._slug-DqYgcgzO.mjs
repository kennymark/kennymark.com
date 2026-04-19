import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { m as matter } from "../_libs/gray-matter.mjs";
import { t as timeRead } from "../_libs/read-time.mjs";
import { a as getArticleByPath } from "./devblog-B8viLmY8.mjs";
import { d as distExports } from "../_libs/mdx-bundler.mjs";
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
import "string_decoder";
import "../_libs/babel__runtime.mjs";
import "path";
import "../_libs/esbuild.mjs";
import "os";
import "child_process";
import "crypto";
import "tty";
import "../_libs/esbuild-plugins__node-resolve.mjs";
import "../_libs/escape-string-regexp.mjs";
import "module";
import "../_libs/resolve.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/path-parse.mjs";
import "../_libs/is-core-module.mjs";
import "../_libs/hasown.mjs";
import "../_libs/function-bind.mjs";
import "util";
import "../_libs/@fal-works/esbuild-plugin-global-externals+[...].mjs";
import "../_libs/uuid.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
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
import "../_libs/isbot.mjs";
import "zlib";
import "http";
import "https";
import "../_libs/follow-redirects.mjs";
import "url";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
const getPost_createServerFn_handler = createServerRpc({
  id: "c2f25d510aad2088e8bf029819d2e7a077384d741fd1e237ed1954e8c04bfe41",
  name: "getPost",
  filename: "src/routes/blog.$slug.tsx"
}, (opts) => getPost.__executeServer(opts));
const getPost = createServerFn({
  method: "GET"
}).inputValidator((slug) => slug).handler(getPost_createServerFn_handler, async ({
  data: slug
}) => {
  const post = await getArticleByPath(slug);
  if (!post?.body_markdown) return null;
  const parsed = matter(post.body_markdown);
  const mdx = await distExports.bundleMDX({
    source: parsed.content
  });
  return {
    slug,
    title: parsed.data?.title ?? post.title,
    description: parsed.data?.description ?? post.description,
    coverImage: parsed.data?.cover_image ?? post.cover_image,
    code: mdx.code,
    timeToRead: timeRead(post.body_markdown).m + 1,
    date: post.published_at
  };
});
export {
  getPost_createServerFn_handler
};
