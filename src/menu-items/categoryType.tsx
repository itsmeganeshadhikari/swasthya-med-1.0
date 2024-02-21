
// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp, IconFirstAidKit, IconCategory } from '@tabler/icons-react';

// constant
const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconForms,
    IconBorderAll,
    IconChartDots,
    IconStairsUp,
    IconFirstAidKit,
    IconCategory
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const categoryType = {
    id: 'ui-forms',
    title: "All Categories",
    type: 'group',
    children: [
        {
            id: 'family-care',
            title: "Family Care",
            type: 'collapse',
            icon: icons.IconCategory,
            breadcrumbs: true,
            children: [
                {
                    id: 'child-care',
                    title: "Child Care",
                    type: 'item',
                    url: '/products/baby',
                    breadcrumbs: false,
                    icon: icons.IconFirstAidKit
                },
                {
                    id: 'men-care',
                    title: "Men Care",
                    type: 'item',
                    url: '/products/nipple',
                    icon: icons.IconPictureInPicture,
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default categoryType;
