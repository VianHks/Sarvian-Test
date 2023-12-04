import { HomeSharp, ListAltFilled, TextsmsOutlined } from '@nxweb/icons/material';

import type { NavItemsType } from '@layouts/types.js';

export const navigation: readonly NavItemsType[] = [
  {
    icon: <HomeSharp />,
    id: 'beranda',
    link: '/beranda',
    text: 'Beranda'
  },
  {
    icon: <ListAltFilled />,
    id: 'order-page',
    link: '/order',
    text: 'Pesanan'
  },
  {
    icon: <TextsmsOutlined />,
    id: 'chat-page',
    link: '/chat-list',
    text: 'Chat'
  }
];
