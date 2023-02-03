import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const routes = [];

// route white list
const WHITE_NAME_LIST: string[] = [];
// the base route should all be whitelist
const getRouteNames = (arr: any[]) => {
  arr.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
};
getRouteNames(routes);

const router = createRouter({
  routes: routes as unknown as RouteRecordRaw,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * keep only the routes in the whilelist
 */
function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App) {
  app.use(router);
}
