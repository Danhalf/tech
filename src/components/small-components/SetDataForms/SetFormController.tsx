import React from 'react';
import { SetDataType } from '../UserMenu';
interface SetFormControllerProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  type: SetDataType;
  uid: string;
}

export const SetFormController: React.FC<SetFormControllerProps> = ({ openDialog, handleCloseDialog, handleUploadData, type, uid }): JSX.Element => {
  return <></>;
};
