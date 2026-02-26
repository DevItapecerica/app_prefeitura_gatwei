interface PermissionType {
  id: number
  role_id: number
  setor_id: number
  read: boolean
  write: boolean
  del: boolean
  edit: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
};

export type ListPermissionsType = PermissionType[]