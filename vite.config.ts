import { defineConfig } from "vite";
import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function gatewayTemplate(): Plugin {
  return {
    name: "tetris-gateway-template",
    enforce: "pre",
    transform(source, id) {
      if (id.endsWith("/element-plus/lib/theme-chalk/index.css")) {
        // The gateway only publishes the WOFF source for Element Plus icons.
        return source.replace(
          ',url(fonts/element-icons.ttf) format("truetype")',
          "",
        );
      }
    },
    transformIndexHtml: {
      enforce: "pre",
      transform(html) {
        return {
          html: html
            .replace('<html lang="en">', '<html lang="en" class="demo-gateway">')
            .replace('content="index,follow"', 'content="noindex,nofollow"')
            .replace(/<script async src="https:\/\/pagead2\.googlesyndication\.com\/[^>]*><\/script>/, ""),
          tags: [
            { tag: "meta", attrs: { name: "chankay-shell", content: "v1" }, injectTo: "head" },
            { tag: "div", attrs: { "data-shell-slot": "header" }, injectTo: "body-prepend" },
            { tag: "div", attrs: { "data-shell-slot": "footer" }, injectTo: "body" },
          ],
        };
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const gateway = mode === "demo";
  const release = process.env.DEMO_RELEASE || "";
  if (gateway && !/^[a-f0-9]{40}$/.test(release)) {
    throw new Error("DEMO_RELEASE must be the full Git commit SHA.");
  }
  return {
    base: gateway
      ? `/tetris/_r/${release}/`
      : process.env.BASE_URL || "/",
    plugins: gateway ? [vue(), gatewayTemplate()] : [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
