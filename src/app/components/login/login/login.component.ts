import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email:new FormControl('',[Validators.email, Validators.required]),
    password:new FormControl('', Validators.required)
  });

  hide:boolean = true;
  matcher = new ErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  login():void{
    if(this.formGroup.valid){
      
    }

  }

}
