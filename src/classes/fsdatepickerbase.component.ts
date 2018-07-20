export class FsDatePickerBaseComponent {

  public parentDirective: any = null;

  clear($event?) {
    this.parentDirective.clear();
  }

  close($event?) {
    this.parentDirective.close();
  }
}
