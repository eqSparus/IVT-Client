export type Link = {
  id?: string,
  icon: string,
  href: string
}

export type Department = {
  id?: string,
  title: string,
  slogan: string,
  phone: string,
  email: string,
  address: string,
  leaderId: string,
}

export type Direction = {
  id?: string,
  title: string,
  degree: string,
  form: string,
  duration: number,
  position: number,
}

export type EntrantPoint = {
  point: string,
}

export type EntrantItem = {
  name: string,
  points: Array<EntrantPoint>,
}

export type Entrant = {
  id?: string,
  title: string,
  items: Array<EntrantItem>,
}

export type AboutDepartment = {
  id?: string,
  title: string,
  description: string,
  icon?: string,
}

export type Teacher = {
  id?: string,
  pathImg: string,
  firstName: string,
  middleName: string,
  lastName: string,
  post: string,
  scientificDegree: string,
}
