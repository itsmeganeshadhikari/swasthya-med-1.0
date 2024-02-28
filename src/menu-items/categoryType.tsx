
// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp, IconFirstAidKit, IconCategory, IconScissors, IconMilk, IconMedicalCross, IconMedicineSyrup, IconHandMove, IconBabyBottle, IconBabyCarriage, IconBrandPeanut, } from '@tabler/icons-react';

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
    IconBabyCarriage,
    IconMilk,
    IconBrandPeanut,
    IconCategory,
    IconMedicalCross,
    IconMedicineSyrup,
    IconHandMove,
    IconBabyBottle
};

// ==============================|| UI FORMS MENU ITEMS ||============================== //

const categoryType = {
    id: 'category',
    // title: "All Category",
    type: 'group',
    icon: icons.IconBabyCarriage,
    breadcrumbs: true,
    children: [
        {
            id: 'all-category',
            title: 'All Category',
            type: 'collapse',
            icon: icons.IconBabyCarriage,
            breadcrumbs: false,
            children: [

                {
                    id: 'child-care',
                    title: "Child Care",
                    type: 'collapse',
                    icon: icons.IconScissors,
                    url: '/products/baby',
                    breadcrumbs: false,
                    children: [
                        {
                            id: 'milk',
                            title: "Milk",
                            type: 'item',
                            url: '/products/milk',
                            breadcrumbs: false,
                            icon: icons.IconFirstAidKit
                        },
                        {
                            id: 'supplement',
                            title: "Supplement",
                            type: 'item',
                            url: '/products/supplement',
                            icon: icons.IconMilk,
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
                            id: 'daiper',
                            title: "Daiper",
                            type: 'item',
                            url: '/products/daiper',
                            icon: icons.IconBabyCarriage,
                            breadcrumbs: false
                        }
                    ]
                },
                {
                    id: 'nutritional',
                    title: "Nutritional",
                    type: 'item',
                    icon: icons.IconMilk,
                    url: '/products/nutritional',
                    breadcrumbs: false,
                    // children: [
                    //     {
                    //         id: 'child-care',
                    //         title: "Child Care",
                    //         type: 'item',
                    //         url: '/products/baby',
                    //         breadcrumbs: false,
                    //         icon: icons.IconFirstAidKit
                    //     },
                    //     {
                    //         id: 'surgical',
                    //         title: "Surgical",
                    //         type: 'item',
                    //         url: '/products/surgical',
                    //         icon: icons.IconScissors,
                    //         breadcrumbs: false
                    //     },
                    //     {
                    //         id: 'nutritional',
                    //         title: "Nutritional",
                    //         type: 'item',
                    //         url: '/products/nutritional',
                    //         icon: icons.IconMilk,
                    //         breadcrumbs: false
                    //     },
                    //     {
                    //         id: 'medicine',
                    //         title: "Medicine",
                    //         type: 'item',
                    //         url: '/products/medicine',
                    //         icon: icons.IconMedicineSyrup,
                    //         breadcrumbs: false
                    //     }
                    // ]
                },
                {
                    id: 'medicine',
                    title: "Medicine",
                    type: 'item',
                    icon: icons.IconMedicineSyrup,
                    url: '/products/medicine',
                    breadcrumbs: false,
                    // children: [
                    //     {
                    //         id: 'child-care',
                    //         title: "Child Care",
                    //         type: 'item',
                    //         url: '/products/baby',
                    //         breadcrumbs: false,
                    //         icon: icons.IconFirstAidKit
                    //     },
                    //     {
                    //         id: 'surgical',
                    //         title: "Surgical",
                    //         type: 'item',
                    //         url: '/products/surgical',
                    //         icon: icons.IconScissors,
                    //         breadcrumbs: false
                    //     },
                    //     {
                    //         id: 'nutritional',
                    //         title: "Nutritional",
                    //         type: 'item',
                    //         url: '/products/nutritional',
                    //         icon: icons.IconMilk,
                    //         breadcrumbs: false
                    //     },
                    //     {
                    //         id: 'medicine',
                    //         title: "Medicine",
                    //         type: 'item',
                    //         url: '/products/medicine',
                    //         icon: icons.IconMedicineSyrup,
                    //         breadcrumbs: false
                    //     }
                    // ]
                },
            ]
        },

    ]
};

export default categoryType;
