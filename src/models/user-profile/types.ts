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

export interface PhotoEditorModel {
  'file': File | null
  'fileName': string
  'size': number
  'typeFile': string
  'base64Image': string
}

export interface UserModel {
  profile?: UserProfileDataModel
  photoeditor: PhotoEditorModel
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
