import { TemplatesPrinted } from 'components/dashboard/common/TemplatesPrinted/TemplatesPrinted';
import { TabDataWrapper } from 'components/dashboard/helpers/helpers';

interface TemplatesPrintedFormProps {
    useruid: string;
}

export const UserTemplatesPrintedForm = ({ useruid }: TemplatesPrintedFormProps): JSX.Element => {
    return (
        <>
            <TemplatesPrinted useruid={useruid} />
        </>
    );
};
