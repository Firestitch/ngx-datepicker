export class FsDatePickerBaseDialogComponent {

  public parentDirective: any = null;

  public clear($event?) {
    this.parentDirective.clear();
  }

  public close($event?) {
    this.parentDirective.close();
  }
}
