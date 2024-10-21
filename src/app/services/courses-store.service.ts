import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CoursesService } from "./courses.service";

interface Course {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
  duration: number;
  authors: string[];
}

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<any[]>([]);
  private authors$$ = new BehaviorSubject<any[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<any[]> = this.courses$$.asObservable();
  public authors$: Observable<any[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        tap((courses) => {
          this.courses$$.next(courses);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  createCourse(course: Course): void {
    this.coursesService
      .createCourse(course)
      .pipe(
        tap((newCourse) => {
          const currentCourses = this.courses$$.getValue();
          this.courses$$.next([...currentCourses, newCourse]);
        })
      )
      .subscribe();
  }

  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: Course): void {
    this.coursesService
      .editCourse(id, course)
      .pipe(
        tap((updatedCourse) => {
          const currentCourses = this.courses$$.getValue();
          const updatedCourses = currentCourses.map((c) =>
            c.id === id ? updatedCourse : c
          );
          this.courses$$.next(updatedCourses);
        })
      )
      .subscribe();
  }

  deleteCourse(id: string): void {
    this.coursesService
      .deleteCourse(id)
      .pipe(
        tap(() => {
          const currentCourses = this.courses$$.getValue();
          const updatedCourses = currentCourses.filter((c) => c.id !== id);
          this.courses$$.next(updatedCourses);
        })
      )
      .subscribe();
  }

  filterCourses(value: string): void {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(value)
      .pipe(
        tap((filteredCourses) => {
          this.courses$$.next(filteredCourses);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  getAllAuthors(): void {
    this.coursesService
      .getAllAuthors()
      .pipe(
        tap((authors) => {
          this.authors$$.next(authors);
        })
      )
      .subscribe();
  }

  createAuthor(name: string): void {
    this.coursesService
      .createAuthor(name)
      .pipe(
        tap((newAuthor) => {
          const currentAuthors = this.authors$$.getValue();
          this.authors$$.next([...currentAuthors, newAuthor]);
        })
      )
      .subscribe();
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }
}
