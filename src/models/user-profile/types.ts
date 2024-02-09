export interface UserProfileDataModel {
  'id': string
  'name': string
  'phone': string | null
  'email': string
  'address': string
  'profile_picture': string | null
  'created_date': Date | string
  'verified_email': boolean
  'verified_phone': boolean
}

export interface UserModel {
  profile?: UserProfileDataModel
}

export enum UserActionType {
  GetUserDetail = '⌘➝App➝Home➝GetUserDetail'
}

export type UserAction = {
  data: UserModel
  type: UserActionType.GetUserDetail
};
