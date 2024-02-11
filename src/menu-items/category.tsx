// import widget from "./widget";
// import application from './application';
// import forms from './forms';
// import elements from './elements';
// import pages from './pages';
// import utilities from './utilities';
// import support from './support';
// import other from './other';
import { NavItemType } from "../types";
import categoryType from "./categoryType";
// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [categoryType],
};

// const menuItems: { items: NavItemType[] } = {
//     items: [dashboard, widget, application, forms, elements, pages, utilities, support, other]
// };

export default menuItems;
