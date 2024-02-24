// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons-react";
import { OverrideIcon } from "../types";

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface DashboardMenuProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    url: string;
    icon: OverrideIcon;
    breadcrumbs: boolean;
  }[];
}

const dashboard: DashboardMenuProps = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Default",
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "products",
      title: "Products",
      type: "item",
      url: "/e-commerce/products",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "listProduct",
      title: "Product List",
      type: "item",
      url: "/e-commerce/product-list",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "createProduct",
      title: "Create Product",
      type: "item",
      url: "/e-commerce/product-entry/new",
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
