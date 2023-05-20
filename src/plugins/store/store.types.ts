import {
  AboutDepartment,
  Entrant,
  Direction,
  Link,
  Teacher,
  Department,
  Partner, Review,
} from '@/types/site.types';

export interface RootState {
  isLoadAllTeacher: boolean;
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

export interface PartnerState {
  partners: Array<Partner>;
}

export interface ReviewState {
  reviews: Array<Review>;
}
