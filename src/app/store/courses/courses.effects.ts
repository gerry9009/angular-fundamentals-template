import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CoursesActions from "./courses.actions";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  // Get All Courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Filtered Courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.courses$),
      mergeMap(([action, courses]) => {
        const filteredCourses = courses.filter((course) =>
          course.title.includes(action.title)
        );
        return of(
          CoursesActions.requestFilteredCoursesSuccess({
            courses: filteredCourses,
          })
        );
      }),
      catchError((error) =>
        of(CoursesActions.requestFilteredCoursesFail({ error: error.message }))
      )
    )
  );

  // Get Specific Course
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((course) =>
            CoursesActions.requestSingleCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete Course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Edit Course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((course) => CoursesActions.requestEditCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Create Course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) =>
            CoursesActions.requestCreateCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Redirect to Courses Page
  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => {
          this.router.navigate(["/courses"]);
        })
      ),
    { dispatch: false }
  );
}
