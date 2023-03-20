import { AboutDepartment, Entrant, InformationDirection, Link, Teacher } from '@/api/model/ModelTypes';

export interface RootState {
  version: string;
}

export interface AuthState {
  accessToken: null | string,
  refreshToken: null | string,
}

export interface DepartmentState {
  id?: string,
  title: string,
  slogan: string,
  phone: string,
  email: string,
  address: string,
  leaderId: string,
}

export interface SiteLinksState {
  links: Array<Link>;
}

export interface AboutState {
  abouts: Array<AboutDepartment>;
}

export interface DirectionState {
  directions: Array<InformationDirection>;
}

export interface EntrantState {
  entrants: Array<Entrant>;
}

export interface TeacherState {
  teachers: Array<Teacher>;
}
