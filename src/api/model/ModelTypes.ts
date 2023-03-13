export type User = {
  email: string,
  password: string
}

export type Tokens = {
  accessToken: string,
  refreshToken: string,
}

export type Link = {
  id?: string,
  icon: string,
  href: string
}

export type InformationDepartment = {
  title: string,
  slogan: string,
  phone: string,
  email: string,
  address: string,
}

export type InformationFaculty = {
  id: string,
  title: string,
  description: string
}

export type InformationDirection = {
  id?: string,
  title: string,
  degree: string,
  form: string,
  duration: number
}

export type InformationForEntrantItem = {
  id: string,
  title: string,
  descriptions: string[]
}

export type InformationForEntrant = {
  id: string,
  title: string,
  items: InformationForEntrantItem[]
}

export type AboutDepartment = {
  id?: string,
  title: string,
  description: string,
}

export type Teacher = {
  id: string,
  image: string,
  firstName: string,
  middleName: string,
  lastName: string,
  post: string,
  scientificDegree: string,
}
