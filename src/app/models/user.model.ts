export class User {
  id!: string;
  fullName!: string;
  email!: string;
  isEmailVerified!: boolean;
  isPhoneVerified!: boolean;
  status!: string;
  role!: Role;
  createdAt!: Date;
  updatedAt!: Date;
  session!: Session;
  authTokenId!: string;
}

export class Role {
  id!: number;
  name!: string;
}

export class Session {
  accessToken!: string;
  refreshToken!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
