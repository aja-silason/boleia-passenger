export interface UserOutput {
  id: string;
  firstName: string,
  lastName: string,
  phoneNumber: string,
  status: string,
  userWillBeSignedUntil: string,
  type: string,
  photoUrl?: string
}

export type DriverOuput = {
  id: string,
  identificationNumber: string,
  licenseNumber: string,
  status: string,
  user: {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    isDriver: boolean,
    createdAt: string,
    updatedAt: string,
    photoUrl: string
  },
  createdAt: string,
  updatedAt: string
}

export interface LoginOutput {
  id: string;
  firstName: string,
  lastName: string,
  phoneNumber: string,
  status: string,
  userWillBeSignedUntil: string,
  type: string,
  photoUrl?: string
}