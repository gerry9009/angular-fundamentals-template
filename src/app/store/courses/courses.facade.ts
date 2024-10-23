import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as CoursesSelectors from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { CoursesState } from "./courses.reducer";
import { Course } from "../courses.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  // Add your code here
  isAllCoursesLoading$ = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );
  isSingleCourseLoading$ = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );
  courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  // Methods to dispatch actions
  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(title: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title }));
  }

  editCourse(id: string, course: Course) {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
  }

  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
