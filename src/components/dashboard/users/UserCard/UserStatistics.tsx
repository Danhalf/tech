import { TabDataWrapper } from 'components/dashboard/helpers/helpers';

interface UserStatisticsProps {
    data: string;
}

const EmptyJSON = [
    {
        data: 'empty',
    },
];

export const UserStatistics = ({ data }: UserStatisticsProps): JSX.Element => {
    return <TabDataWrapper data={data || JSON.stringify(EmptyJSON)} />;
};
