export const NavLinksForGuest = [
  {
    id: "0",
    name: "Home",
    href: "/"
  },
  {
    id: 1,
    name: "Create Account",
    href: "/sign-up"
  },
  {
    id: 2,
    name: "Login",
    href: "/sign-in"
  },
  {
    id: 3,
    name: "About",
    href: "/about"
  },
  {
    id: 4,
    name: "Download Apk",
    href: "https://github.com/fazle-rabbi-dev/Spend-Sync/releases/download/apk/Spend-Sync.apk"
  }
  /*  {
    id: 4,
    name: "Privacy Policy",
    href: "/privacy-policy"
  },*/
  /*  {
    id: 5,
    name: "Source Code",
    href: "/privacy-policy"
  }*/
];

export const features = [
  {
    emoji: "💰",
    title: "Expense Tracking",
    description: "Keep track of all your expenses in one place."
  },
  {
    emoji: "📊",
    title: "Financial Insights",
    description: "Gain valuable insights into your spending habits."
  },
  /*  {
    emoji: "🎯",
    title: "Goal Setting",
    description: "Set financial goals and track your progress."
  },
  {
    emoji: "📅",
    title: "Calendar View",
    description: "Visualize your expenses with a calendar view."
  },*/
  {
    emoji: "🔒",
    title: "Secure",
    description: "Your data is encrypted and securely stored."
  },
  {
    emoji: "🚀",
    title: "Fast & Responsive",
    description: "Enjoy a lightning-fast and responsive user experience."
  },
  {
    emoji: "📥",
    title: "PDF Download",
    description: "Download your expenses as a PDF with filtering options."
  },
  {
    emoji: "🔍",
    title: "Search & Filter",
    description: "Easily search and filter your expenses to find what you need."
  }
];

export const tabItems = [
  {
    name: "Expenses",
    link: "/expenses",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>`
  },
  {
    name: "Home",
    link: "/dashboard",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  },
  {
    name: "Trash",
    link: "/trash",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`
  },
  {
    name: "Settings",
    link: "/settings",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
  }
];

export const modalFormFields = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "type", label: "Expense Type", type: "type", options: ["Private", "Public", "Personal"] },
  { name: "date", label: "Date", type: "date" }
];

export const authFormFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" }
];
