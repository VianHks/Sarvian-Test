import { apiFetch } from '@api/base';
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
  createUserProfile: (payload: unknown, token: string): Promise<string> => {
    return (
      apiFetch(token)
        .post(`/customer/registration`, payload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          if (response.status === 200) {
            return 'success';
          }

          return 'err';
        })
        .catch(() => {
          return 'err';
        })
    );
  }
};
