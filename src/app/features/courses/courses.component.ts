import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  isAdmin = false;

  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadUserData();
  }

  loadCourses() {
    this.coursesStoreService.getAll();
    this.coursesStoreService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  loadUserData() {
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  onSearch(searchQuery: string) {
    if (searchQuery) {
      this.coursesStoreService.filterCourses(searchQuery);
    } else {
      this.loadCourses();
    }
  }

  handleShow(id: string) {
    this.router.navigate([`/courses/${id}`]);
  }

  handleEdit(id: string) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  handleDelete(id: string) {
    this.coursesStoreService.deleteCourse(id);
  }

  handleAddCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
