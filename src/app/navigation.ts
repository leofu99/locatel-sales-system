// src/app/navigation.ts
export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/client-form', label: 'Crear Cliente', icon: 'assignment_ind' },
  { path: '/product-form', label: 'Crear Producto', icon: 'create_new_folder' },
  {
    path: '/sale-form',
    label: 'Registrar  Venta',
    icon: 'attach_money',
  },

  {
    path: '/sales-list',
    label: 'Listado de Ventas',
    icon: 'format_list_bulleted',
  },
];
