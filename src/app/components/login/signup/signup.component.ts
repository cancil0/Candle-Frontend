import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SignupRequestDto } from 'src/app/models/login/signupRequestDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { SignUpService } from 'src/app/services/loginService/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup = new FormGroup({});
  signupRequestDto:SignupRequestDto = new SignupRequestDto();

  hidepass:boolean = true;
  hiderepass:boolean = true;
  matcher = new ErrorStateMatcher();
  passwordMatcher = new ErrorStateMatcher();
  profileStatus = [
    {key:'C', description:this.translateService.instant('Login.SignUp.Confidential')}, 
    {key:'F', description:this.translateService.instant('Login.SignUp.Friend')}, 
    {key:'E', description:this.translateService.instant('Login.SignUp.Everyone')}
  ];
  constructor(private dialog:DialogService,
              private route:Router,
              private signUpService:SignUpService,
              private translateService:TranslateService) { }

  ngOnInit(): void {
    Object.keys(this.signupRequestDto).forEach(name=>{
      this.formGroup.addControl(name, new FormControl())
    });
    this.formGroup.addControl('repassword', new FormControl())
    this.formGroup.get('gender')?.setValue('M');
   }

   signup(){

    if(!this.formGroup.valid){
      this.dialog.open('error', 'Login.SignUp.Exception.FailedSignUp');
      return
    }
    
    if(this.formGroup.controls['email'].value === this.formGroup.controls['secondaryEmail'].value){
      this.dialog.open('error', 'Login.SignUp.Exception.MailComparison');
      this.formGroup.controls['secondaryEmail'].markAsTouched();
      
      return;
    }

    if(this.formGroup.controls['password'].value !== this.formGroup.controls['repassword'].value){
      this.dialog.open('error', 'Login.SignUp.Exception.PasswordsNotMatch');
      this.formGroup.controls['secondryEmail'].markAsTouched();
      
      return;
    }

    this.signupRequestDto = {
      email:this.formGroup.controls['email'].value,
      mobilePhone:this.formGroup.controls['mobilePhone'].value,
      name:this.formGroup.controls['name'].value,
      surName:this.formGroup.controls['surName'].value,
      password:this.formGroup.controls['password'].value,
      userName:this.formGroup.controls['userName'].value,
      secondaryEmail:this.formGroup.controls['secondaryEmail'].value,
      birthDate:this.formGroup.controls['birthDate'].value,
      gender:this.formGroup.controls['gender'].value,
      profileStatus:this.formGroup.controls['profileStatus'].value
    }

    this.signUpService.signUp(this.signupRequestDto).subscribe( res => {
      console.log(res)
      this.dialog.open('question', 'Login.SignUp.SuccessfulSingUpProceed').subscribe((result) => {
        if(result){
          this.route.navigateByUrl('/login');
        }else{
          window.location.reload();
        }
      })
    });
    
   }

}
