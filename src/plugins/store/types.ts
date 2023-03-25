import { AboutDepartment, Entrant, Direction, Link, Teacher, Department } from '@/types/SiteContentTypes';

export interface RootState {
  version: string;
}

export interface AuthState {
  accessToken: null | string,
}

export interface DepartmentState {
  department: Department;
}

export interface SiteLinksState {
  links: Array<Link>;
}

export interface AboutState {
  abouts: Array<AboutDepartment>;
}

export interface DirectionState {
  directions: Array<Direction>;
}

export interface EntrantState {
  entrants: Array<Entrant>;
}

export interface TeacherState {
  teachers: Array<Teacher>;
}
