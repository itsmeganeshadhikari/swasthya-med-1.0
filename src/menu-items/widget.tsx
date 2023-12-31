// assets
import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons-react';

// constant
const icons = {
    IconChartArcs,
    IconClipboardList,
    IconChartInfographic
};

// ==============================|| WIDGET MENU ITEMS ||============================== //

const widget = {
    id: 'widget',
    title: "widget",
    type: 'group',
    children: [
        {
            id: 'statistics',
            title: 'Statistics',
            type: 'item',
            url: '/widget/statistics',
            icon: icons.IconChartArcs
        },
        {
            id: 'data',
            title: 'Data',
            type: 'item',
            url: '/widget/data',
            icon: icons.IconClipboardList
        },
        {
            id: 'chart',
            title: 'Chart',
            type: 'item',
            url: '/widget/chart',
            icon: icons.IconChartInfographic
        }
    ]
};

export default widget;
