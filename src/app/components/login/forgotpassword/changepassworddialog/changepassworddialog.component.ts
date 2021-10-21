import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePasswordDto } from 'src/app/models/login/changePasswordDto.model';
import { ForgotPasswordService } from 'src/app/services/loginService/forgotpassword.service';

@Component({
  selector: 'app-changepassworddialog',
  templateUrl: './changepassworddialog.component.html',
  styleUrls: ['./changepassworddialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  hidepass:boolean = true;
  hiderepass:boolean = true;
  passwordMatcher = new ErrorStateMatcher();

  formGroup = new FormGroup({
    password: new FormControl(''),
    repassword: new FormControl('')
  });

  changePasswordDto:ChangePasswordDto = {
    userName:'',
    password:''
}
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private forgotPasswordService:ForgotPasswordService) { }

  ngOnInit(): void {
  }

  send(){
    let password = this.formGroup.get('password')?.value;
    let repassword = this.formGroup.get('repassword')?.value;
    
    if(password !== repassword){
      return;
    }

    this.changePasswordDto.userName = this.data.userName;
    this.changePasswordDto.password = password;

    this.forgotPasswordService.changePassword(this.changePasswordDto).subscribe((res) => {
      if(res.isSuccess){
        this.dialogRef.close(true);
      }
    });
  }
}
