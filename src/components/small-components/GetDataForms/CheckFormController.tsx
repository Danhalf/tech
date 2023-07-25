import React from "react";
import { CheckSessionForm } from "./CheckSessionForm";
import { CheckTokenForm } from "./CheckTokenForm";

interface CheckFormControllerProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleUploadData: (data: any) => void;
  type: "Session" | "Token";
  uid: string;
}

export const CheckFormController: React.FC<CheckFormControllerProps> = ({
  openDialog,
  handleCloseDialog,
  handleUploadData,
  type,
  uid,
}): JSX.Element => {
  if (!openDialog) return <></>;
  switch (type) {
    case "Session":
      return (
        <CheckSessionForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
          userUid={uid}
        />
      );
    case "Token":
      return (
        <CheckTokenForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleUploadData={handleUploadData}
        />
      );
    default:
      return <>not implemented yet</>;
  }
};
