export type InformationFaculty = {
    id: string,
    icon: string,
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

export type ConnectionTeacher = {
    id: string,
    logo: string,
    link: string
}

export type Teacher = {
    id: string,
    image: string,
    firstName: string,
    middleName: string,
    lastName: string,
    post: string,
    scientificDegree: string,
    phone: string,
    address: string,
    email: string,
    links: ConnectionTeacher[]
}
