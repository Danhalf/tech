import { TabDataWrapper } from 'components/dashboard/helpers/helpers';

interface TemplatesPrintedFormProps {
    data: string;
}

const EmptyJSON = [
    {
        templatesPrintedFormData: 'empty',
    },
];

export const TemplatesPrintedForm = ({ data }: TemplatesPrintedFormProps): JSX.Element => {
    return <TabDataWrapper data={data || JSON.stringify(EmptyJSON)} />;
};
