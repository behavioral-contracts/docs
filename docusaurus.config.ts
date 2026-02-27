import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Behavioral Contracts',
  tagline: 'Runtime behavior specifications for npm packages',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://behavioral-contracts.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'behavioral-contracts',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/behavioral-contracts/docs/tree/main/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Behavioral Contracts',
      logo: {
        alt: 'Behavioral Contracts Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/behavioral-contracts/corpus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction/what-are-behavioral-contracts',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'CLI Reference',
              to: '/docs/cli-reference/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/behavioral-contracts/corpus/discussions',
            },
            {
              label: 'Contributing',
              href: '/docs/contributing/how-to-contribute',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Corpus',
              href: 'https://github.com/behavioral-contracts/corpus',
            },
            {
              label: 'CLI',
              href: 'https://github.com/behavioral-contracts/verify-cli',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Behavioral Contracts. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'typescript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
