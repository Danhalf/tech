import * as React from 'react';
import { useCallback, useState } from 'react';
interface CheckTokenFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const CheckTokenForm: React.FC<CheckTokenFormProps> = ({ openDialog, handleCloseDialog, handleUploadData }): JSX.Element => {
  const [token, setToken] = useState<string>('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const onSubmit = useCallback(() => {
    handleUploadData(token);
    handleCloseDialog();
  }, [token]);

  return <div>CheckForm</div>;
};
