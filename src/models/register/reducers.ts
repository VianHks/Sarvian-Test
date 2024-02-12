/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
import { API, apiFetch } from '@api/base';
import type { TAction, TDispatch } from '@models/types';

import { RegisterActionType } from './types';

import type { RegisterAction, RegisterDetail, RegisterModel } from './types';

const DEFAULT_REGISTER_DETAIL: RegisterDetail = {
  alamat: '',
  created_at: '',
  kategori_usaha: [],
  kode_pos: '',
  kota: '',
  nama_brand: '',
  nama_pemilik: '',
  nomor_telepon: '',
  provinsi: '',
  status: '',
  channelId: '',
  channelSlug: '',

  hastag: '',
  isHalal: true,
  delivery: false,
  dineIn: false,
  pickUp: false,
  preparationTime: '',
  name: '',
  noKtp: '',
  bankName: '',
  bankAccountNo: '',
  bankAccountName: '',
  profileImage: ''
};

const DEFAULT_REGISTER: RegisterModel = {
  detail: DEFAULT_REGISTER_DETAIL
};

// const URL_MINIO = `https://storage.tokrum.com`;
// const URL_APIGATEWAY = `${process.env.API_URL}/simplestorageservice/0.1/download?bucket=`;

const RegisterReducer = (
  state: RegisterModel = DEFAULT_REGISTER,
  action: RegisterAction
): RegisterModel => {
  switch (action.type) {
    case RegisterActionType.GetDetail:
      // eslint-disable-next-line no-case-declarations
      return { ...state, detail: action.data };

    default:
      return { ...state };
  }
};

const RegisterCommand = {
  getDetail: (token: string): TAction<RegisterAction, void> => {
    return (dispatch: TDispatch<RegisterAction>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return apiFetch(token).post(`/foodseller/0.1/register/get-detail`, { token }).then((response: any) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const data = response.data.data as RegisterDetail;

            dispatch({
              data,
              type: RegisterActionType.GetDetail
            });
          }
        }
      });
    };
  },
  updateVerification: (token: string): TAction<RegisterAction, void> => {
    return (dispatch: TDispatch<RegisterAction>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return apiFetch(token).post(`/foodseller/0.1/register/get-detail`, { token }).then((response: any) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const data = response.data.data as RegisterDetail;

            dispatch({
              data,
              type: RegisterActionType.GetDetail
            });
          }
        }
      });
    };
  },
  updateChannelMetadata: (data: any, token: string): TAction<RegisterAction, void> => {
    return () => {
      const payload = {
        token,
        metadataInput: [
          {
            key: 'dineIn',
            value: data.dineIn.toString()
          }, {
            key: 'pickUp',
            value: data.pickUp.toString()
          }, {
            key: 'delivery',
            value: data.delivery.toString()
          }, {
            key: 'dineIn',
            value: data.dineIn.toString()
          }, {
            key: 'hashtag',
            value: data.hashtag
          }, {
            key: 'bankName',
            value: data.bankName
          }, {
            key: 'bankAccountNo',
            value: data.bankAccountNo
          }, {
            key: 'bankAccountName',
            value: data.bankAccountName
          }, {
            key: 'preparationTime',
            value: data.preparationTime
          }, {
            key: 'isHalal',
            value: data.isHalal.toString()
          }, {
            key: 'profileImage',
            value: data.profileImage
          }
        ]
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return API('').put(`/foodseller/0.1/register/update-channel-metadata`, { ...payload }).then((response: any) => {
        if (response.status === 200) {
          console.debug(response.data);
        }
      });
    };
  }
};

export { RegisterReducer, RegisterCommand, DEFAULT_REGISTER };
