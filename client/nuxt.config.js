require("dotenv").config();
const { join } = require("path");
const { copySync, removeSync } = require("fs-extra");
export default {
  ssr: false,
  telemetry: false,
  srcDir: __dirname,
  /*
   ** Headers of the page
   */
  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + "/api",
    baseURL: process.env.API_URL || process.env.APP_URL,
    appName: process.env.APP_NAME || "Laravel Nuxt",
    appLocale: process.env.APP_LOCALE || "en",
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
    MIX_PUSHER_APP_KEY: process.env.PUSHER_APP_KEY
  },
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "red", continuous: true },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~plugins/axios" },
    { src: "~plugins/packages" },
    { src: "~plugins/refresh" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */

  build: {
    extractCSS: true,
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty"
      };
    }
  },

  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === "spa"
        ) {
          const publicDir = join(
            generator.nuxt.options.rootDir,
            "public",
            "_nuxt"
          );
          removeSync(publicDir);
          copySync(
            join(generator.nuxt.options.generate.dir, "_nuxt"),
            publicDir
          );
          copySync(
            join(generator.nuxt.options.generate.dir, "200.html"),
            join(publicDir, "index.html")
          );
          removeSync(generator.nuxt.options.generate.dir);
        }
      }
    }
  }
};
