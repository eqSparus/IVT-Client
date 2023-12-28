import {
  AboutDepartment,
  Direction,
  Entrant,
  Link,
  Partner,
  Review,
  Teacher,
} from '@/types/site.types';

export type EditTeacher = Omit<Teacher, 'id' | 'urlImg' | 'position'>

export type EditLink = Omit<Link, 'id'>

export type EditAboutDepartment = Omit<AboutDepartment, 'id'>

export type EditDirection = Omit<Direction, 'id' | 'position'>

export type EditEntrant = Omit<Entrant, 'id'>

export type EditPartner = Omit<Partner, 'id' | 'urlImg'>

export type EditReview = Omit<Review, 'id' | 'urlImg'>
