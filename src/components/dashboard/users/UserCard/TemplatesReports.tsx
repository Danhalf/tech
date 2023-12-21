import { TemplatesReports } from 'components/dashboard/common/TemplatesReports/TemplatesReports';

interface TemplatesReportsProps {
    useruid: string;
}

export const UserTemplatesReports = ({ useruid }: TemplatesReportsProps): JSX.Element => {
    return <TemplatesReports useruid={useruid} />;
};
