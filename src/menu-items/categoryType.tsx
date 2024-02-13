// third-party
import { FormattedMessage } from 'react-intl';

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
    title: <FormattedMessage id="All Categories" />,
    type: 'group',
    children: [
        {
            id: 'family-care',
            title: <FormattedMessage id="Family Care" />,
            type: 'collapse',
            icon: icons.IconCategory,
            children: [
                {
                    id: 'child-care',
                    title: <FormattedMessage id="Child Care" />,
                    type: 'item',
                    url: '/categories/family-care',
                    breadcrumbs: false,
                    icon: icons.IconFirstAidKit
                },
                {
                    id: 'men-care',
                    title: <FormattedMessage id="Men Care" />,
                    type: 'item',
                    url: '/categories/family-care',
                    icon: icons.IconPictureInPicture,
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default categoryType;
