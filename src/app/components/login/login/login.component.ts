import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email:new FormControl('',Validators.email),
    password:new FormControl('', )
  });

  hide:boolean = true;
  matcher = new ErrorStateMatcher();

  constructor(private dialog:DialogService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login():void{
    if(!this.formGroup.valid){
      this.dialog.open('error', 'Login.Login.UnSuccessfulLogin');
      return;
    }

    this.dialog.open('success', 'Login.Login.SuccessLogin',false,true,true,1500).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
