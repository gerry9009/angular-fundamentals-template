import { Component, Input } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() iconName: null | "trash" | "pencil" = null;
  @Input() buttonText: string | null = null;

  get selectedIcon(): IconProp | null {
    switch (this.iconName) {
      case "trash":
        return ["fas", "trash-alt"];
      case "pencil":
        return ["fas", "pencil"];
      default:
        return null;
    }
  }
}
