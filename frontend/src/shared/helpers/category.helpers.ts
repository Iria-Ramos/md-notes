export const categories = {
  cloud: {
    slug: 'cloud',
    name: 'Cloud',
    description: 'Cloud computing, platforms, and deployment strategies.',
    heading: 'Cloud Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Cloud category. Explore tips, tools, and best practices.',
  },
  refactoring: {
    slug: 'refactoring',
    name: 'Refactoring',
    description: 'Improve and modernize legacy code with proven patterns.',
    heading: 'Refactoring Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Refactoring category. Explore tips, tools, and best practices.',
  },
  devops: {
    slug: 'devops',
    name: 'DevOps',
    description: 'CI/CD pipelines, deployment tools, and cloud automation.',
    heading: 'DevOps Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the DevOps category. Explore tips, tools, and best practices.',
  },
  frontend: {
    slug: 'frontend',
    name: 'Frontend',
    description: 'Modern frontend tools, frameworks, and developer workflows.',
    heading: 'Frontend Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Frontend category. Explore tips, tools, and best practices.',
  },
  productivity: {
    slug: 'productivity',
    name: 'Productivity',
    description: 'Tips and tools to boost developer efficiency and focus.',
    heading: 'Productivity Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Productivity category. Explore tips, tools, and best practices.',
  },
  architecture: {
    slug: 'architecture',
    name: 'Architecture',
    description: 'Design scalable and maintainable software architectures.',
    heading: 'Architecture Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Architecture category. Explore tips, tools, and best practices.',
  },
  performance: {
    slug: 'performance',
    name: 'Performance',
    description: 'Speed up your apps with profiling, caching, and best practices.',
    heading: 'Performance Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Performance category. Explore tips, tools, and best practices.',
  },
  ui: {
    slug: 'ui',
    name: 'UI',
    description: 'Design systems, component libraries, and user interface patterns.',
    heading: 'UI Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the UI category. Explore tips, tools, and best practices.',
  },
  css: {
    slug: 'css',
    name: 'CSS',
    description: 'Modern CSS, styling architecture, and responsive design.',
    heading: 'CSS Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the CSS category. Explore tips, tools, and best practices.',
  },
  astro: {
    slug: 'astro',
    name: 'Astro',
    description: 'Build fast static websites using Astro’s modern architecture.',
    heading: 'Astro Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Astro category. Explore tips, tools, and best practices.',
  },
  'web-components': {
    slug: 'web-components',
    name: 'Web Components',
    description: 'Reusable native UI components with encapsulated logic and styles.',
  },
  typescript: {
    slug: 'typescript',
    name: 'TypeScript',
    description: 'Type-safe JavaScript, modern tooling, and typed APIs.',
    heading: 'TypeScript Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the TypeScript category. Explore tips, tools, and best practices.',
  },
  react: {
    slug: 'react',
    name: 'React',
    description: 'React components, Server Components, and ecosystem tooling.',
    heading: 'React Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the React category. Explore tips, tools, and best practices.',
  },
  threejs: {
    slug: 'threejs',
    name: 'Three.js',
    description: 'Build stunning 3D graphics and experiences in the browser.',
    heading: 'Three.js Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the Three.js category. Explore tips, tools, and best practices.',
  },
  javascript: {
    slug: 'javascript',
    name: 'JavaScript',
    description: 'Core language concepts, best practices, and modern JS techniques.',
    heading: 'JavaScript Articles and Guides',
    metaDescription: 'Read expert articles and tutorials in the JavaScript category. Explore tips, tools, and best practices.',
  },

} as const;

export type CategoryKey = keyof typeof categories;

export function isCategory(slug: string): slug is CategoryKey {
  return slug in categories;
}

export function getCategoryBySlug(slug: string): (typeof categories)[CategoryKey] | undefined {
  return isCategory(slug) ? categories[slug] : undefined;
}

export function getCategoryInfo(slug: string) {
  if (!isCategory(slug)) {
    throw new Error(`[getCategoryInfo] Unknown category: "${slug}"`);
  }
  return categories[slug];
}

export function getAllCategories() {
  return Object.values(categories);
}

export function getAllCategorySlugs(): CategoryKey[] {
  return Object.keys(categories) as CategoryKey[];
}