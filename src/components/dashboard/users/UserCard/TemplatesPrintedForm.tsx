import { TemplatesPrinted } from 'components/dashboard/common/TemplatesPrinted/TemplatesPrinted';

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
