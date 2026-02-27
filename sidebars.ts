import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-are-behavioral-contracts',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/your-first-scan',
        'getting-started/understanding-output',
        'getting-started/fixing-violations',
      ],
    },
    {
      type: 'category',
      label: 'Contract Schema',
      items: [
        'contract-schema/overview',
      ],
    },
    {
      type: 'category',
      label: 'AI Integration',
      items: [
        'ai-integration/using-with-claude',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/faq',
        'reference/license',
      ],
    },
  ],
};

export default sidebars;
