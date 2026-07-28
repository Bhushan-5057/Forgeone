export const navLinks = {
  left: [
    { label: 'Home', path: '/' },
    {
      label: 'Company',
      children: [
        { label: 'About Us', path: '/about' },
        { label: 'Blogs', path: '/blogs' },
        { label: 'Case Studies', path: '/case-studies' },
      ],
    },
  ],
  right: [
    {
      label: 'Services',
      children: [
        { label: 'AI & ML', path: '/services/ai-ml' },
        { label: 'Mobile App Development', path: '/services/mobile-app-development' },
        { label: 'Custom Software Development', path: '/services/custom-software-development' },
        { label: 'Web Development', path: '/services/web-development' },
        { label: 'Cloud & DevOps', path: '/services/cloud-devops' },
        { label: 'QA & Testing', path: '/services/qa-testing' },
        { label: 'Data Security', path: '/services/data-security' },
      ],
    },
    { label: 'Contact Us', path: '/contact' },
  ],
}

export const servicesNav = navLinks.right.find((item) => item.label === 'Services').children

export const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
  { name: 'X', href: 'https://x.com', icon: 'Twitter' },
  { name: 'GitHub', href: 'https://github.com', icon: 'Github' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
]
