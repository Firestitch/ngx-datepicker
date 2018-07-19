export class FsDatePickerBaseComponent {

  public parentDirective: any = null;

  clear() {
    this.parentDirective.clear();
  }

  close($event?) {
    this.parentDirective.close();
  }
}
