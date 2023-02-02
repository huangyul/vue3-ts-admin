import type { ProxyOptions } from "vite";

type Proxylist = Array<[string, string]>;

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 *
 * @param list
 * @returns ProxyOptions
 */
export function generateProxy(list: Proxylist = []) {
  const res: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    res[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return res;
}
