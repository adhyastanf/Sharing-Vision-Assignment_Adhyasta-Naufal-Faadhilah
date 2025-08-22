import { Eye, Home, PlusIcon } from 'lucide-react';

export const nav = [
  {
    title: 'All Posts',
    url: '/',
    icon: Home,
    isActive:true,
    items: [],
},
{
    title: 'Add New',
    url: '/add-new',
    isActive:false,
    items: [],
    icon: PlusIcon,
},
{
    title: 'Preview',
    url: '/preview',
    isActive:false,
    items: [],
    icon: Eye,
  },
];

export const CATEGORY_OPTIONS = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Health', label: 'Health' },
  { value: 'Education', label: 'Education' },
  { value: 'Business', label: 'Business' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Science', label: 'Science' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Lifestyle', label: 'Lifestyle' },
];