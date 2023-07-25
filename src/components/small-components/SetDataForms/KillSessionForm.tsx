import * as React from 'react';

import * as UserService from './../../../services/user.service';
import { useCallback, useEffect, useState } from 'react';
interface KillSessionFormProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  userUid: string;
}

export const KillSessionForm: React.FC<KillSessionFormProps> = ({ openDialog, handleCloseDialog, handleUploadData, userUid }): JSX.Element => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      const response = UserService.listUserSessions(userUid).then(
        (response) => {
          setSessions(response.data);
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
  }, [userUid]);

  if (loaded && !sessions.length) {
    return <></>;
  }
  return <div></div>;
};
