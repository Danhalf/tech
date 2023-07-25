import * as React from 'react';
import { useCallback, useState } from 'react';

import * as UserService from '../../services/user.service';
// import { SetFormController } from './SetDataForms/SetFormController';
// import { CheckFormController } from './GetDataForms/CheckFormController';

interface UserMenuProps {
  uid: string;
  username: string;
}

export type SetDataType = 'Permissions' | 'User password' | 'User optional data' | 'Kill session' | 'Profile' | 'Settings';

export default function UserMenu({ uid, username }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openBasicMenuBool = Boolean(anchorEl);

  // const openDownloadMenuBool = Boolean(downloadAnchorEl);
  // const openUploadMenuBool = Boolean(uploadAnchorEl);
  // const openCheckMenuBool = Boolean(checkAnchorEl);

  // const openBasicMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = useCallback(() => {
  //   setAnchorEl(null);
  //   setDownloadAnchorEl(null);
  //   setUploadAnchorEl(null);
  //   setCheckAnchorEl(null);
  // }, []);

  // const openDownloadMenu = (event: React.MouseEvent<HTMLLIElement>) => {
  //   handleClose();
  //   setDownloadAnchorEl(event.currentTarget);
  // };

  // const openUploadMenu = (event: React.MouseEvent<HTMLLIElement>) => {
  //   handleClose();
  //   setUploadAnchorEl(event.currentTarget);
  // };

  // const openCheckMenu = (event: React.MouseEvent<HTMLLIElement>) => {
  //   handleClose();
  //   setCheckAnchorEl(event.currentTarget);
  // };

  // const handleClickOpenSetDialog = useCallback(() => {
  //   handleClose();
  //   setOpenSetDialog(true);
  // }, []);

  // const handleCloseSetDialog = useCallback(() => {
  //   setOpenSetDialog(false);
  // }, []);

  // const handleClickOpenGetDialog = useCallback(() => {
  //   handleClose();
  //   setOpenGetDialog(true);
  // }, []);

  // const handleCloseGetDialog = useCallback(() => {
  //   setOpenGetDialog(false);
  // }, []);

  // const handleClickOpenCheckDialog = useCallback(() => {
  //   handleClose();
  //   setOpenCheckDialog(true);
  // }, []);

  // const handleCloseCheckDialog = useCallback(() => {
  //   setOpenCheckDialog(false);
  // }, []);

  // const setUserDataType = useCallback((type: SetDataType | 'Session' | 'Token') => {
  //   setDataType(type);
  // }, []);

  // const setUserData = useCallback(
  //   async (data: any) => {
  //     let response: any;
  //     switch (dataType as SetDataType) {
  //       case 'Permissions':
  //         response = await UserService.setUserPermissions(uid, data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'User optional data':
  //         response = await UserService.setUserOptionalData(uid, data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Settings':
  //         response = await UserService.setUserSettings(uid, data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Profile':
  //         response = await UserService.setUserProfile(uid, data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'User password':
  //         response = await UserService.updateUser(uid, username, data.password).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Kill session':
  //         response = await UserService.killSession(data.id).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //     }
  //     setResponseData(response);
  //     setDataType(dataType);
  //     handleClickOpenGetDialog();
  //   },
  //   [dataType, uid]
  // );

  // const getUserData = useCallback(
  //   async (type: GetDataType) => {
  //     let response: any;
  //     switch (type) {
  //       case 'Permissions':
  //         response = await UserService.getUserPermissions(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Extended Info':
  //         response = await UserService.getUserExtendedInfo(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Locations':
  //         response = await UserService.getUserLocations(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Profile':
  //         response = await UserService.getUserProfile(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Settings':
  //         response = await UserService.getUserSettings(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Sessions':
  //         response = await UserService.listUserSessions(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Logins':
  //         response = await UserService.listUserLogins(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Subusers':
  //         response = await UserService.listSubusers(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Sales Persons':
  //         response = await UserService.listSalesPersons(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Short Info':
  //         response = await UserService.getUserShortInfo(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'All UI Permissions':
  //         response = await UserService.getAllUIPermissions(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'All UI Types':
  //         response = await UserService.getAllUITypes(uid).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //     }
  //     setResponseData(response);
  //     setDataType(type);
  //   },
  //   [uid]
  // );

  // const checkData = useCallback(
  //   async (data: string) => {
  //     let response: any;
  //     switch (dataType as 'Session' | 'Token') {
  //       case 'Session':
  //         response = await UserService.checkSession(data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //       case 'Token':
  //         response = await UserService.checkToken(data).then((response) => {
  //           return response.data;
  //         });
  //         break;
  //     }
  //     setResponseData(response);
  //     setDataType(dataType);
  //     handleClickOpenGetDialog();
  //   },
  //   [dataType, uid]
  // );
  return (
    <div style={{ flex: 3, width: '33%' }}>
      <button
        id="basic-button"
        aria-controls={openBasicMenuBool ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openBasicMenuBool ? 'true' : undefined}
        style={{ width: '100%' }}
      ></button>

      {/* <SetFormController
        openDialog={openSetDialog}
        handleCloseDialog={handleCloseSetDialog}
        handleUploadData={setUserData}
        type={dataType as SetDataType}
        uid={uid}
      />
      <CheckFormController
        openDialog={openCheckDialog}
        handleCloseDialog={handleCloseCheckDialog}
        handleUploadData={checkData}
        type={dataType as 'Session' | 'Token'}
        uid={uid}
      /> */}
    </div>
  );
}
