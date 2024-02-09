import type { TAction, TDispatch } from '@models/types';

import {  UserActionType   } from './types';

import  profilePicture  from '@assets/images/girl_picture.jpg';

import type { UserAction, UserModel, UserProfileDataModel } from './types';

const DEFAULT_USER_INFO: UserProfileDataModel = {
  id: '1',
  name: 'Jan Doe',
  phone: '+62 821 008868888',
  email: 'Doe@gmail.com',
  address: 'Jalan, Majapahit I No.10',
  profile_picture: profilePicture,
  created_date: '2024-02-06T00:00:00.000Z',
  verified_email: false,
  verified_phone: false
};

export const UserDefault: UserModel = {
  profile: DEFAULT_USER_INFO
};

export const UsersReducer = (state: UserModel = UserDefault, action: UserAction): UserModel => {
  switch (action.type) {
    case UserActionType.GetUserDetail:
      return { ...state, ...action.data };

    default:
      return { ...state };
  }
};

export const UserCommand = {
  getProfileDetail: (): TAction<UserAction, void> => {
    // GetProfileDetail: (payload: unknown): TAction<HelpCenterAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return Promise.resolve().then(() => {
        const profile: UserModel = {
          profile: DEFAULT_USER_INFO
        };

        // If (response.status === 200) {
        dispatch({
          data: profile,
          type: UserActionType.GetUserDetail
        });
        // }
      });
    };
  },
  updateProfileInfo: (payload: unknown): Promise<string | undefined> => {
    // CreateTicket: async (payload: unknown, token: string): Promise<string | undefined> => {
    return Promise.resolve(payload).then(() => {
      /*
       * If (response.status === 200) {
       * notify.success(`Ticket successfully created`);
       */

      return 'ok';
      // }
    });
  }
};