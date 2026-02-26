interface UserType {
  id: number
  name: string
  email: string
  ramal: string
  setor_id: number
  role_id: number
  password: string
  firstLogin: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
};

export type UserPostType = Pick<UserType, "name" | "email" | "ramal" | "setor_id" | "role_id"> 

export type UserOneGetType = UserType

export type ListUserType = Omit<UserType, "password">[]