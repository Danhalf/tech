import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as UserService from './../../../services/user.service';

interface PermissionsFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const PermissionsForm: React.FC<PermissionsFormProps> = ({ openDialog, handleCloseDialog, handleUploadData, uid }): JSX.Element => {
  const [permissions, setPermissions] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
      const newPermissions = { ...permissions };
      newPermissions[propertyName] = event.target.checked ? 1 : 0;
      setPermissions(newPermissions);
    },
    [permissions]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(permissions);
    handleCloseDialog();
  }, [permissions]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserPermissions(uid).then(
        (response) => {
          const { status, useruid, error, info, message, ...onlyPermissions } = response.data;
          setPermissions(onlyPermissions);
          setLoaded(true);
          return response.data;
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          //setLoading(false);
          //setMessage(resMessage);
        }
      );
    }
  }, [uid]);

  if (!permissions) {
    return <></>;
  }

  return <div></div>;
};
