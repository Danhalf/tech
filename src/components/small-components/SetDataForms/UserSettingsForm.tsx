import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as UserService from '../../../services/user.service';

interface UserSettingsFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ openDialog, handleCloseDialog, handleUploadData, uid }): JSX.Element => {
  const [settings, setSettings] = useState<any>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSettings({
        ...settings,
        [name]: name === 'created' || name === 'updated' ? parseInt(value) : value,
      });
    },
    [settings]
  );

  const onSubmit = useCallback(() => {
    handleUploadData(settings);
    handleCloseDialog();
  }, [settings]);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserSettings(uid).then(
        (response) => {
          const { status, error, info, message, ...settingsProp } = response.data;
          setSettings(settingsProp.settings);
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

  if (!settings) {
    return <></>;
  }
  return <div></div>;
};
