interface RegisterDetail {
  alamat: string
  created_at: string
  kategori_usaha: string[]
  kode_pos: string
  kota: string
  nama_brand: string
  nama_pemilik: string
  nomor_telepon: string
  provinsi: string
  status: string
  channelId: string
  channelSlug: string

  hastag: string
  isHalal: boolean
  delivery: boolean
  dineIn: boolean
  pickUp: boolean
  preparationTime: string
  name: string
  noKtp: string
  bankName: string
  bankAccountNo: string
  bankAccountName: string
  profileImage: string
}

interface RegisterModel {
  detail: RegisterDetail
}

enum RegisterActionType {
  GetDetail = '⌘➝Register➝GetDetail',
  UpdateVerification = '⌘➝Register➝UpdateVerification',
  UploadProfileImage = '⌘➝Register➝UploadProfilePhoto'
}

type RegisterAction = {
  data: RegisterDetail
  type: RegisterActionType.GetDetail
} | {
  data: RegisterDetail
  type: RegisterActionType.UpdateVerification

};

export { RegisterActionType };
export type { RegisterDetail, RegisterAction, RegisterModel };
