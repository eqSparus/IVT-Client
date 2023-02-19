export type Link = {
  id: string,
  name: string,
  href: string
}

export type InformationDepartment = {
  id: string,
  title: string,
  slogan: string,
  phone: string,
  email: string,
  address: string,
  links: Array<Link>
}

export type InformationFaculty = {
  id: string,
  title: string,
  description: string
}

export type InformationDirection = {
  id: string,
  title: string,
  degree: string,
  formTraining: string,
  durationTraining: string
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

export type InfoAboutDepartment = {
  id: string,
  address: string,
  phone: string,
  email: string
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
