import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as UserService from '../../../services/user.service';
interface UserProfileFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  uid: string;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({ openDialog, handleCloseDialog, handleUploadData, uid }): JSX.Element => {
  const [profileInput, setProfileInput] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.getUserProfile(uid).then(
        (response) => {
          if (response.data.profile) setProfileInput(response.data.profile);
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

  return <div></div>;
};
