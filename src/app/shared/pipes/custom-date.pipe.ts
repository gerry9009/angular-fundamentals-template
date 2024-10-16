import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  // Add your code here
  transform(value: Date): string {
    const today = new Date(value);

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;
  }
}
