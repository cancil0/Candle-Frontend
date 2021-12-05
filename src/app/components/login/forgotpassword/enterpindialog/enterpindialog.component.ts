import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EnterPinForgotPassRequestDto } from 'src/app/models/login/enterPinForgotPassRequestDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ForgotPasswordService } from 'src/app/services/loginService/forgotpassword.service';

@Component({
  selector: 'app-enterpindialog',
  templateUrl: './enterpindialog.component.html',
  styleUrls: ['./enterpindialog.component.scss']
})
export class EnterPinDialogComponent implements OnInit {

  formGroup = new FormGroup({
    pin: new FormControl('')
  });
  pinDirectory:string = '';
  leftSecond:number = 60;
  enterPinForgotPassRequestDto:EnterPinForgotPassRequestDto = {
      userName:'',
      pin:''
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EnterPinDialogComponent>,
              private forgotPasswordService:ForgotPasswordService,
              private dialog:DialogService,
              private translateService:TranslateService) { }

  ngOnInit(): void {
    let directory = '';
    directory = this.translateService.instant('Login.ForgotPassword.PinDirectory');
    this.pinDirectory = directory.replace('{0}', this.data.userName);
    setInterval(() => {
      this.leftSecond = this.leftSecond - 1;
    }, 1000);
  }

  send(){
    this.enterPinForgotPassRequestDto.userName = this.data.userName;
    this.enterPinForgotPassRequestDto.pin = this.formGroup.get('pin')?.value;

    this.forgotPasswordService.enterPinForgotPassword(this.enterPinForgotPassRequestDto).subscribe((res) => {
      if(res.isSuccess){
        this.dialogRef.close(true);
      }else{
        this.dialog.open('error','Login.ForgotPassword.Exception.EnteredWrongPin')
      }
      
    });
  }
  
}
