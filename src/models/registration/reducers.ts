// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/order
import type { TAction, TDispatch } from '@models/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/order
import {  UserActionType   } from '@models/user-profile/types';

import type { UserAction, UserModel, UserProfileDataModel } from '@models/user-profile/types';

const DEFAULT_USER_INFO: UserProfileDataModel = {
  id: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  gender: '',
  profile_picture: '',
  date_of_birth: '',
  created_date: '',
  verified_email: false,
  verified_phone: false
};

export const RegistrationDefault: UserModel = {
  profile: DEFAULT_USER_INFO
};

export const RegistrationReducer = (state: UserModel = RegistrationDefault, action: UserAction): UserModel => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export const RegistrationCommand = {
  createUserProfile: (payload: unknown): Promise<string | undefined> => {
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
