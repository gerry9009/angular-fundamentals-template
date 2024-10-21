import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { map, Observable } from "rxjs";

interface Course {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
  duration: number;
  authors: string[];
}

interface Author {
  id: string;
  name: string;
}

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private URL = "http://localhost:4000";

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  getAll(): Observable<Course[]> {
    return this.http
      .get<ApiResponse<Course[]>>(`${this.URL}/courses/all`)
      .pipe(map((response) => response.result));
  }

  createCourse(course: Course): Observable<Course> {
    const token = this.sessionStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    });

    return this.http
      .post<ApiResponse<Course>>(`${this.URL}/courses/add`, course, { headers })
      .pipe(map((response) => response.result));
  }

  editCourse(id: string, course: Course): Observable<Course> {
    const token = this.sessionStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    });

    return this.http
      .put<ApiResponse<Course>>(`${this.URL}/courses/${id}`, course, {
        headers,
      })
      .pipe(map((response) => response.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`${this.URL}/courses/${id}`)
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string): Observable<void> {
    const token = this.sessionStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    });

    return this.http
      .delete<ApiResponse<void>>(`${this.URL}/courses/${id}`, { headers })
      .pipe(map((response) => response.result));
  }

  filterCourses(value: string): Observable<Course[]> {
    return this.http
      .get<ApiResponse<Course[]>>(`${this.URL}/courses/filter?title=${value}`)
      .pipe(map((response) => response.result));
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http
      .get<ApiResponse<Author[]>>(`${this.URL}/authors/all`)
      .pipe(map((response) => response.result));
  }

  createAuthor(name: string): Observable<Author> {
    const token = this.sessionStorageService.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    });

    return this.http
      .post<ApiResponse<Author>>(
        `${this.URL}/authors/add`,
        { name },
        { headers }
      )
      .pipe(map((response) => response.result));
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http
      .get<ApiResponse<Author>>(`${this.URL}/authors/${id}`)
      .pipe(map((response) => response.result));
  }
}
