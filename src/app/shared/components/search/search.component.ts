import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder = "Input Text";
  @Output() search = new EventEmitter<string>();

  searchText = "";

  onSubmit() {
    if (this.searchText.length >= 2) {
      this.search.emit(this.searchText);
      console.log(this.searchText);
    }
  }
}
