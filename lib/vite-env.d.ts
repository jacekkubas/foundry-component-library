/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.frag" {
  const source: string;
  export default source;
}
