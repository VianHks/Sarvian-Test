import { API, apiFetch } from '@api/base';
import type { TAction, TDispatch } from '@models/types';

import {  UserActionType   } from './types';

import  profilePicture  from '@assets/images/girl_picture.jpg';

import type { AddressDetailModel, CitiesModel, CountryAreaModel, DistrictModel, PhotoEditorModel, ProvincesModel, SubDistrictModel, UpdateCustomer, UserAction, UserModel, UserProfileDataModel } from './types';

const DEFAULT_USER_INFO: UserProfileDataModel = {
  id: '1',
  name: 'Jan Doe',
  phone: '+62 821 008868888',
  email: 'Doe@gmail.com',
  address: 'Jalan, Majapahit I No.10',
  gender: 'Wanita',
  profile_picture: profilePicture,
  date_of_birth: '2020-01-01T00:00:00.000Z',
  created_date: '2024-02-06T00:00:00.000Z',
  verified_email: false,
  verified_phone: false
};

const DEFAULT_PHOTOEDITOR: PhotoEditorModel = {
  file: null,
  fileName: '',
  size: 0,
  typeFile: '',
  base64Image: ''
};

const DEFAULT_ADDRESS_DETAILS: AddressDetailModel = {
  data: {
    user: {
      addresses: [
        {
          city: '',
          cityArea: '',
          companyName: '',
          country: {
            code: '',
            country: ''
          },
          countryArea: '',
          firstName: '',
          id: '',
          lastName: '',
          phone: '',
          postalCode: '',
          streetAddress1: '',
          streetAddress2: ''
        }
      ],
      defaultBillingAddress: {
        id: ''
      },
      defaultShippingAddress: {
        id: ''
      },
      email: '',
      firstName: '',
      id: '',
      lastName: ''
    }
  }
};

const DEFAULT_UPDATE_CUSTOMER: UpdateCustomer = {
  data: {
    customerUpdate: {
      user: {
        firstName: '',
        lastName: '',
        metafields: {
          profileUrl: ''
        }
      }
    }
  }
};

export const UserDefault: UserModel = {
  addressDetails: DEFAULT_ADDRESS_DETAILS,
  cities: {
    cities: []
  },
  district: {
    districts: []
  },
  photoeditor: DEFAULT_PHOTOEDITOR,
  profile: DEFAULT_USER_INFO,
  province: {
    data: []
  },
  provinces: {
    provinces: []
  },
  subdistrict: {
    subdistricts: []
  },
  updateCustomer: DEFAULT_UPDATE_CUSTOMER
};

export const UsersReducer = (state: UserModel = UserDefault, action: UserAction): UserModel => {
  switch (action.type) {
    case UserActionType.GetUserDetail:
      return { ...state, ...action.data };
    case UserActionType.Photoeditor:
      return { ...state, ...action.data };
    case UserActionType.GetCities:
      return { ...state, ...action.data };
    case UserActionType.GetCountryArea:
      return { ...state, ...action.data };
    case UserActionType.GetDistrict:
      return { ...state, ...action.data };
    case UserActionType.GetSubDistrict:
      return { ...state, ...action.data };
    case UserActionType.GetProvinces:
      return { ...state, ...action.data };
    case UserActionType.GetAddressDetails:
      return { ...state, ...action.data };
    case UserActionType.UpdateCustomer:
      return { ...state, ...action.data };

    default:
      return { ...state };
  }
};

export const UserCommand = {
  getAddressDetails: (
    token: string
  ): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .post(`/foodbuyer/0.2/customer/addresses`, { token })
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                addressDetails: response.data as AddressDetailModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetAddressDetails
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetAddressDetails
              });
            }
          }
        });
    };
  },
  getCities: (
    province: string,
    token: string
  ): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .get(`/address/cities?province=${province}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                cities: response.data as CitiesModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetCities
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetCities
              });
            }
          }
        });
    };
  },
  getDistrict: (
    city: string,
    province: string,
    token: string
  ): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .get(`/address/districts?city=${city}&province=${province}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                district: response.data as DistrictModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetDistrict
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetDistrict
              });
            }
          }
        });
    };
  },
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
  getProvince: (token: string): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .get(`/address/country-area`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                province: response.data as CountryAreaModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetCountryArea
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetCountryArea
              });
            }
          }
        });
    };
  },
  getProvinces: (token: string): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .get(`/address/provinces`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                provinces: response.data as ProvincesModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetProvinces
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetProvinces
              });
            }
          }
        });
    };
  },
  getSubDistrict: (city: string, district: string, province: string, token: string): TAction<UserAction, void> => {
    return (dispatch: TDispatch<UserAction>) => {
      return apiFetch(token)
        .get(`/address/subdistricts?city=${city}&district=${district}&province=${province}`, {
          city,
          district,
          province
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const user: UserModel = {
                subdistrict: response.data as SubDistrictModel
              };

              dispatch({
                data: user,
                type: UserActionType.GetSubDistrict
              });
            } else {
              dispatch({
                data: UserDefault,
                type: UserActionType.GetSubDistrict
              });
            }
          }
        });
    };
  },
  postCreateAddress: (payload: unknown, token: string): Promise<string> => {
    return (
      apiFetch(token)
        .post(`/customer/address`, payload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          if (response.status === 200) {
            return 'ok';
          }

          return 'err';
        })
        .catch(() => {
          return 'err';
        })
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  },
  updatePhotoEditorData: (imageData: PhotoEditorModel | null) => {
    return (dispatch: TDispatch<UserAction>) => {
      // Const updatedData: PhotoEditorModel[] = [];

      const photoeditor: UserModel = {
        photoeditor: imageData || DEFAULT_PHOTOEDITOR
      };

      dispatch({
        data: photoeditor,
        type: UserActionType.Photoeditor
      });
    };
  },
  deletePhotoEditorData: (imageData: PhotoEditorModel) => {
    return (dispatch: TDispatch<UserAction>) => {
      const photoeditor: UserModel = {
        photoeditor: imageData
      };

      dispatch({
        data: photoeditor,
        type: UserActionType.PhotoeditorDelete
      });
    };
  },
  putUpdateCustomer: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).put(`/customer-update`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        const data: string = response?.data;

        if (response.status === 200) {
          return data || 'err';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  },
  uploadFile: (token: string, base64File: string, filename: string, custId: string, typeFile: string): Promise<string> => {
    const minioPayload = {
      body: {
        content_type: typeFile,
        data: base64File
      },
      bucket: `/treats-dev/buyer/${custId}`,
      filename
    };

    return API('').post(`/simplestorageservice/0.1/upload`, { ...minioPayload, token })
      .then((response: any) => {
        const data: string = response?.data?.message;
        const profileUrl = `https://apigateway-dev.tokrum.com:8081/simplestorageservice/0.1/download?bucket=/treats-dev/buyer/${custId}&filename=${filename}`;
        if (response.status === 200 && data) {
          return profileUrl || 'err';
        }

        return 'err';
      })
      .catch(() => {
        return 'err';
      });
  }
};
