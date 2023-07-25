import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
interface UserOptionalDataFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
}

export const UserOptionalDataForm: React.FC<UserOptionalDataFormProps> = ({ openDialog, handleCloseDialog, handleUploadData }): JSX.Element => {
  const [optionalData, setOptionalData] = useState<any>({
    userName: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    state: '',
    ZIP: '',
    phone1: '',
    phone2: '',
    email1: '',
    email2: '',
    messager1: '',
    messager2: '',
    companyName: '',
    type: 0,
  });

  return <div></div>;
};
