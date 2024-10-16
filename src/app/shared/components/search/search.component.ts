import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder = "Input Text";
  @Output() search = new EventEmitter<string>();

  searchQuery = "";

  onSubmit() {
    this.search.emit(this.searchQuery);
  }
}
