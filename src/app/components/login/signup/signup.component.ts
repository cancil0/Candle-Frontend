import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SignupRequestDto } from 'src/app/models/login/signupRequestDto.model';
import { SignupResponseDto } from 'src/app/models/login/signupResponseDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup = new FormGroup({});
  signupRequestDto:SignupRequestDto = new SignupRequestDto();
  signupResponseDto:SignupResponseDto[] = [];

  hidepass:boolean = true;
  hiderepass:boolean = true;
  matcher = new ErrorStateMatcher();
  passwordMatcher = new ErrorStateMatcher();

  constructor(private dialog:DialogService,
              private route:Router) { }

  ngOnInit(): void {
    Object.keys(this.signupRequestDto).forEach(name=>{
      this.formGroup.addControl(name, new FormControl())
    });
   }

   signup(){

    if(!this.formGroup.valid){
      this.dialog.open('error', 'Login.SignUp.Exception.FailedSignUp');
      return
    }
    
    if(this.formGroup.controls['email'].value === this.formGroup.controls['secondryEmail'].value){
      this.dialog.open('error', 'Login.SignUp.Exception.MailComparison');
      this.formGroup.controls['secondryEmail'].markAsTouched();
      
      return;
    }

    if(this.formGroup.controls['password'].value !== this.formGroup.controls['repassword'].value){
      this.dialog.open('error', 'Login.SignUp.Exception.PasswordsNotMatch');
      this.formGroup.controls['secondryEmail'].markAsTouched();
      
      return;
    }

    this.dialog.open('question', 'Login.SignUp.SuccessfulSingUpProceed').subscribe((result) => {
      if(result){
        this.route.navigateByUrl('/login');
      }else{
        window.location.reload();
      }
    })
   }

}
