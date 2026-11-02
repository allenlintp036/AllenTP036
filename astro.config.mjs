// @ts-check
import { defineConfig } from 'astro/config';

// 網站目前部署在 GitHub Pages：https://allenlintp036.github.io/AllenTP036/
// 之後改用自己的網域時，把 site 換成網域，並刪掉 base 這一行。
export default defineConfig({
  site: 'https://allenlintp036.github.io',
  base: '/AllenTP036',
  trailingSlash: 'ignore',
});
