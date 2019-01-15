export class FsDatePickerBaseComponent {

  public parentDirective: any = null;

  public clear($event?) {
    this.parentDirective.clear();
  }

  public close($event?) {
    this.parentDirective.close();
  }
}
