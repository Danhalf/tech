import { TabDataWrapper } from 'components/dashboard/helpers/helpers';

interface TemplatesReportsProps {
    data: string;
}

const EmptyJSON = [
    {
        templatesReportsData: 'empty',
    },
];

export const TemplatesReports = ({ data }: TemplatesReportsProps): JSX.Element => {
    return <TabDataWrapper data={data || JSON.stringify(EmptyJSON)} />;
};
