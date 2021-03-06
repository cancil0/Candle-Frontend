import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ForgotPasswordRequestDto } from 'src/app/models/login/forgotPasswordRequestDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ForgotPasswordService } from 'src/app/services/loginService/forgotpassword.service';
import { ChangePasswordDialogComponent } from './changepassworddialog/changepassworddialog.component';
import { EnterPinDialogComponent } from './enterpindialog/enterpindialog.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  email:string = '';
  mobilePhone:string = '';
  userName:string = '';
  dialogRef:any;
  forgotPasswordRequestDto:ForgotPasswordRequestDto = {
    email:'',
    mobilePhone:'',
    userName:'',
    fileResources:{userName:'',date:'',cautionLine:'',secondsLine:'',time:''}
  }
  formGroup = new FormGroup({
    email:new FormControl(''),
    mobilePhone:new FormControl(''),
    userName:new FormControl('')
  
  });

  matcher = new ErrorStateMatcher();

  constructor(private dialog:DialogService,
              private matDialog:MatDialog,
              private router: Router,
              private translateService:TranslateService,
              private forgotPasswordService:ForgotPasswordService) { }

  ngOnInit(): void {
  }

  forgotpass(){
    this.email = this.formGroup.get('email')?.value;
    this.mobilePhone = this.formGroup.get('mobilePhone')?.value;
    this.userName = this.formGroup.get('userName')?.value;
    if(this.email == '' && this.mobilePhone == '' && this.userName == ''){
      this.dialog.open('error','Login.ForgotPassword.Exception.FillOneofThem');
      return;
    }
    this.forgotPasswordRequestDto ={
      email:this.email,
      mobilePhone:this.mobilePhone,
      userName:this.userName,
      fileResources:{
        userName:this.translateService.instant('Login.ForgotPassword.UserName'),
        date:this.translateService.instant('Login.ForgotPassword.Date'),
        time:this.translateService.instant('Login.ForgotPassword.Time'),
        cautionLine:this.translateService.instant('Login.ForgotPassword.CautionLine'),
        secondsLine:this.translateService.instant('Login.ForgotPassword.SecondsLine')
      }
    }
    this.forgotPasswordService.generatePinForgotPassword(this.forgotPasswordRequestDto).subscribe((res) => {
      if(res.isSuccess){
        this.userName = res.data;
        this.openEnterPinDialog();
      }else{
        this.dialog.open('error','Login.ForgotPassword.Exception.UserNotFound')
      }
    });

  }

  openEnterPinDialog(){
    this.dialogRef =  this.matDialog.open(EnterPinDialogComponent, {
                        disableClose: true,
                        autoFocus: true,
                        maxHeight: 500,
                        maxWidth: 500,
                        data: {
                          userName:this.userName
                        }
                      });

    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 60000)
    });
    this.dialogRef.afterClosed().subscribe((result: any)=>{
      if(result){
        this.openChangePasswordDialog();
      }
    });
  }

  openChangePasswordDialog(){
    this.dialogRef = this.matDialog.open(ChangePasswordDialogComponent, {
                        disableClose: true,
                        autoFocus: true,
                        data: {
                          userName:this.userName
                        }
                      });

    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 100000)
    });                  
    this.dialogRef.afterClosed().subscribe((result: any)=>{
      if(result){
        this.dialog.open('success','Login.ForgotPassword.SuccessChangedPassword').subscribe(() => {
          this.router.navigateByUrl('/login');
        });
      }
    });
  }
}
