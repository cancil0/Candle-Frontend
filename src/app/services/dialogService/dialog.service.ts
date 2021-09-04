import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/basic/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogRef: any;

  constructor(private dialog: MatDialog,
    private translate: TranslateService) { }

  open(type: string, resource: any = null, showCloseButton: boolean = false, disableClose: boolean = false, isTimeout: boolean = false, timeout: number = 10000): Observable<boolean> {

    if (resource == null) {
      resource = this.chooseDefaultResource(type);
    }

    this.dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: true,
      disableClose: disableClose,
      maxHeight: 1000,
      maxWidth: 1000,
      panelClass: type+'Dialog',
      data: {
        type: type,
        text: this.translate.instant(resource),
        closeButton: showCloseButton,
        yesNo: false
      }
    });

    if (isTimeout) {
      this.dialogRef.afterOpened().subscribe(() => {
        setTimeout(() => {
          this.dialogRef.close();
        }, timeout)
      });
    }

    return this.dialogRef.afterClosed();
  }

  close(): Observable<any> {
    this.dialogRef.close();
    return this.dialog.afterAllClosed;
  }

  private chooseDefaultResource(type:string):string{
    let resource = '';

    switch (type) {
      case 'success':
        resource = 'Basic.Dialog.Success';
        break;

      case 'error':
        resource = 'Basic.Dialog.Error';
        break;

      case 'info':
        resource = 'Basic.Dialog.Info';
        break;

      case 'question':
        resource = 'Basic.Dialog.Question';
        break;
    }

    return resource;
  }
}

//DIALOG INSTANCES

/* QUESTION
  this.dialog.open('question', null, true).subscribe((result) => {
    if(result){
      console.log("Result is", result); //true
    }else{
      console.log("Result is", result); //false
    }
  });
*/

/*SUCCESS
  this.dialog.open('success', 'Login Success',false,true,true,1000).subscribe(() => {
    this.router.navigateByUrl('/');
  });
*/

/*ERROR
  this.dialog.open('error', 'Login Failed',false,true,true).subscribe(() => {
    return;
  });
*/