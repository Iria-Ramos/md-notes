export const siteConfig = {
  title: `Markdown create, upload and edit project`,
  shortTitle: `MDProject`,
  image: '/icon.png',
  description: `Web page example for creating, editing and uploading .md file. It also check for grammar errors.`,
   navigation: [
    { name: 'Create', path: '/file/create' },
    { name: 'Edit', path: '/file/edit' },
    { name: 'Upload', path: '/file/upload' }
  ],
  social: {
    github: 'https://github.com/iria-ramos',
    linkedin: 'https://www.linkedin.com/in/iria-ramos-varela'
  },
  postsPerPage: 10,
  mainHeadTitle: 'Welcome to the MDProject',
  mainHeadDescription:
    'A project that lets you create, edit and upload .md files... It\'s a work in progress!',
  icons: {
    chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
    chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
    moreHorizontal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`
  },
  uploadHeadTitle: "Upload an .md file",
  uploadHeadDesc: "Upload your own .md files and choose where to store them (not implemented yet)"
} as const;
