
// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp, IconFirstAidKit, IconCategory, IconScissors, IconMilk, IconMedicalCross, IconMedicineSyrup } from '@tabler/icons-react';

// constant
const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconForms,
    IconBorderAll,
    IconChartDots,
    IconStairsUp,
    IconFirstAidKit,
    IconScissors,
    IconMilk,
    IconCategory,
    IconMedicalCross,
    IconMedicineSyrup
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
                    id: 'surgical',
                    title: "Surgical",
                    type: 'item',
                    url: '/products/surgical',
                    icon: icons.IconScissors,
                    breadcrumbs: false
                },
                {
                    id: 'nutritional',
                    title: "Nutritional",
                    type: 'item',
                    url: '/products/nutritional',
                    icon: icons.IconMilk,
                    breadcrumbs: false
                },
                {
                    id: 'medicine',
                    title: "Medicine",
                    type: 'item',
                    url: '/products/medicine',
                    icon: icons.IconMedicineSyrup,
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default categoryType;
