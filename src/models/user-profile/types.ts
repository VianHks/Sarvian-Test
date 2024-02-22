export interface UserProfileDataModel {
  id: string
  name: string
  phone: string | null
  email: string
  address: string
  gender: string
  profile_picture: string | null
  date_of_birth: Date | string
  created_date: Date | string
  verified_email: boolean
  verified_phone: boolean
}

export interface PhotoEditorModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  base64Image: any | string
  file: File | null
  fileName: string
  size: number
  typeFile: string
}

export interface ProvinceModel {
  raw: string
  verbose: string
}

export interface CountryAreaModel {
  data: ProvinceModel[]
}

export interface ProvincesModel {
  provinces: string[]
}

export interface CitiesModel {
  cities: string[]
}

export interface DistrictModel {
  districts: string[]
}

export interface SubDistrictModel {
  subdistricts: string[]
}

export interface AddressesModel {
  city: string
  cityArea: string
  companyName: string
  country: {
    code: string
    country: string
  }
  countryArea: string
  firstName: string
  id: string
  lastName: string
  phone: string
  postalCode: string
  streetAddress1: string
  streetAddress2: string
}

export interface AddressDetailModel {
  data: {
    user: {
      addresses: AddressesModel[]
      defaultBillingAddress: {
        id: string
      }
      defaultShippingAddress: {
        id: string
      }
      email: string
      firstName: string
      id: string
      lastName: string
    }
  }
}

export interface UpdateCustomer {

  data: {
    customerUpdate: {
      user: {
        firstName: string
        lastName: string
        metafields: {
          profileUrl: string
        }
      }
    }
  }

}
export interface UserModel {
  addressDetails?: AddressDetailModel
  cities?: CitiesModel
  district?: DistrictModel
  photoeditor?: PhotoEditorModel
  profile?: UserProfileDataModel
  province?: CountryAreaModel
  provinces?: ProvincesModel
  subdistrict?: SubDistrictModel
  updateCustomer?: UpdateCustomer
}

export enum UserActionType {
  GetUserDetail = '⌘➝App➝Home➝GetUserDetail',
  Photoeditor = '⌘➝App➝Home➝Photoeditor',
  PhotoeditorDelete = '⌘➝Menu➝PhotoeditorDelete',
  GetCountryArea = '⌘➝Profile➝GetCountryArea',
  GetCities = '⌘➝Profile➝GetCities',
  GetDistrict = '⌘➝Profile➝GetDistrict',
  GetSubDistrict = '⌘➝Profile➝GetSubDistrict',
  GetProvinces = '⌘➝Profile➝GetProvinces',
  GetAddressDetails = '⌘➝Profile➝GetAddressDetails',
  UpdateCustomer = '⌘➝Profile➝UpdateCustomer'
}

export type UserAction =
  {
    data: UserModel
    type: UserActionType.GetAddressDetails
  } | {
    data: UserModel
    type: UserActionType.GetCities
  } | {
    data: UserModel
    type: UserActionType.GetCountryArea
  } | {
    data: UserModel
    type: UserActionType.GetDistrict
  } | {
    data: UserModel
    type: UserActionType.GetProvinces
  } | {
    data: UserModel
    type: UserActionType.GetSubDistrict
  } | {
    data: UserModel
    type: UserActionType.GetUserDetail
  } | {
    data: UserModel
    type: UserActionType.Photoeditor
  } | {
    data: UserModel
    type: UserActionType.PhotoeditorDelete
  } | {
    data: UserModel
    type: UserActionType.UpdateCustomer
  };
