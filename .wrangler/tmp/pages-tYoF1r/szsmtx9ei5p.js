// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_nuxt/*",
    "/",
    "/_payload.json",
    "/_robots.txt",
    "/about",
    "/admin",
    "/blog",
    "/book",
    "/contact",
    "/favicon.ico",
    "/gallery",
    "/logo-dark.svg",
    "/logo-light.svg",
    "/logo-wordmark-dark.svg",
    "/logo-wordmark-light.svg",
    "/og-image.png",
    "/quote",
    "/services",
    "/sitemap.xml",
    "/about/_payload.json",
    "/admin/login",
    "/blog/_payload.json",
    "/blog/ceramic-coating-benefits",
    "/blog/engine-bay-safety-cleaning",
    "/blog/leather-seat-care-tips",
    "/blog/mobile-detailing-checklist",
    "/book/_payload.json",
    "/contact/_payload.json",
    "/gallery/_payload.json",
    "/images/ceramic-coating.webp",
    "/images/complete-detailing.webp",
    "/images/deep-interior.webp",
    "/images/engine-bay.webp",
    "/images/exterior-detailing.webp",
    "/images/headlight-restoration.webp",
    "/images/hero-bmw.webp",
    "/images/luxury-car.webp",
    "/images/paint-polishing.webp",
    "/images/wheel-detail.webp",
    "/quote/_payload.json",
    "/services/_payload.json",
    "/services/complete-detailing",
    "/services/deep-interior",
    "/services/exterior",
    "/services/exterior-detailing",
    "/services/headlight-restoration",
    "/services/paint-polishing",
    "/services/paint-protection",
    "/blog/ceramic-coating-benefits/_payload.json",
    "/blog/engine-bay-safety-cleaning/_payload.json",
    "/blog/leather-seat-care-tips/_payload.json",
    "/blog/mobile-detailing-checklist/_payload.json",
    "/services/complete-detailing/_payload.json",
    "/services/deep-interior/_payload.json",
    "/services/exterior-detailing/_payload.json",
    "/services/exterior/_payload.json",
    "/services/headlight-restoration/_payload.json",
    "/services/paint-polishing/_payload.json",
    "/services/paint-protection/_payload.json"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\gomat\\Downloads\\DEV PROJECTS\\eddiaps\\.wrangler\\tmp\\pages-tYoF1r\\bundledWorker-0.6701010356243511.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\gomat\\Downloads\\DEV PROJECTS\\eddiaps\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\gomat\\Downloads\\DEV PROJECTS\\eddiaps\\.wrangler\\tmp\\pages-tYoF1r\\bundledWorker-0.6701010356243511.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=szsmtx9ei5p.js.map
