import { AccountCircleFilled, HomeSharp, ListAltFilled, TextsmsOutlined } from '@nxweb/icons/material';

import type { NavItemsType } from '@layouts/types.js';

export const navigation: readonly NavItemsType[] = [
  {
    icon: <HomeSharp size={32} />,
    id: 'beranda',
    link: '/beranda',
    text: 'Beranda'
  },
  {
    icon: <ListAltFilled size={32} />,
    id: 'order-page',
    link: '/order',
    text: 'Pesanan'
  },
  {
    icon: <TextsmsOutlined size={32} />,
    id: 'chat-page',
    link: '/chat-list',
    text: 'Chat'
  },
  {
    icon: <AccountCircleFilled size={32} />,
    id: 'profile',
    link: '/profile',
    text: 'Profil'
  }
];
