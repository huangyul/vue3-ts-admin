import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import { resolve } from "path";
import { generateProxy } from "./build/vite/proxy";

const pathResolve = (dir: string) => {
  return resolve(__dirname, dir);
};

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // vite 获取环境变量的方式必须要这样
  // 设置第三个参数为""，加载所有环境变量，而不管开头是否为VITE
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "0.0.0.0",
      port: env.VITE_PORT as any,
      proxy: generateProxy(JSON.parse(env.VITE_PROXY)),
    },
    resolve: {
      alias: {
        "@": pathResolve("./src"),
      },
    },
    plugins: [vue()],
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。注意要配合JSON.stringify使用
    define: {
      __TEST_CONST__: JSON.stringify(pkg),
    },
    optimizeDeps: {
      include: ["element-plus/dist/locale/zh-cn.mjs"],
    },
  };
});
