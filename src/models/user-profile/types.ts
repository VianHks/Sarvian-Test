export interface UserProfileDataModel {
  'id': string
  'name': string
  'phone': string | null
  'email': string
  'address': string
  'gender': string
  'profile_picture': string | null
  'date_of_birth': Date | string
  'created_date': Date | string
  'verified_email': boolean
  'verified_phone': boolean
}

export interface PhotoEditorModel {
  'file': File | null
  'fileName': string
  'size': number
  'typeFile': string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'base64Image': any | string
}

export interface UserModel {
  profile?: UserProfileDataModel
  photoeditor?: PhotoEditorModel
}

export enum UserActionType {
  GetUserDetail = '⌘➝App➝Home➝GetUserDetail',
  Photoeditor = '⌘➝App➝Home➝Photoeditor',
  PhotoeditorDelete = '⌘➝Menu➝PhotoeditorDelete'
}

export type UserAction = {
  data: UserModel
  type: UserActionType.GetUserDetail
} | {
  data: UserModel
  type: UserActionType.Photoeditor
} | {
  data: UserModel
  type: UserActionType.PhotoeditorDelete
};
