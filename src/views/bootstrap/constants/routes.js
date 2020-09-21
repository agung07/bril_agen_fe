import React from 'react';

export const routes = [
  {
    path: '/agen_level_base_on_location',
    exact: true,
    name: 'Master Data Agen Level',
    component: React.lazy(() => import('../../agen_level_base_on_location/AgenLevelBaseOnLocation')),
  },
  {
    path: '/form_entry_data_agen',
    exact: true,
    name: 'Entry Data Agen',
    component: React.lazy(() => import('../../form_entry_data_agen/FormEntryDataAgen')),
  },
  {
    path: '/form_entry_data_struktur_agen',
    exact: true,
    name: 'Entry Data Struktur Agen',
    component: React.lazy(() => import('../../form_entry_data_struktur_data/FormEntryDataStrukturAgen')),
  },
]