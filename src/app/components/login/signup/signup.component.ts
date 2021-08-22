import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SignupRequestDto } from 'src/app/models/login/signupRequestDto.model';
import { SignupResponseDto } from 'src/app/models/login/signupResponseDto.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup = new FormGroup({});
  signupRequestDto:SignupRequestDto = new SignupRequestDto();
  signupResponseDto:SignupResponseDto[] = [];

  hide:boolean = true;
  matcher = new ErrorStateMatcher();
  passwordMatcher = new ErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
    Object.keys(this.signupRequestDto).forEach(name=>{
      this.formGroup.addControl(name, new FormControl())
    });
   }

   signup(){

    if(this.formGroup.status !== 'VALID'){
      return
    }
    
    if(this.formGroup.controls['email'].value === this.formGroup.controls['secondryEmail'].value){
      //EKRANDA POP-UP ACILACAK VE ALMAK İSTEDİGİNİZ MAİL İLE YEDEK MAİL AYNI OLAMAZ YAZACAK. 'INFO'
      this.formGroup.controls['secondryEmail'].markAsTouched();
      
      return;
    }

   }

}
