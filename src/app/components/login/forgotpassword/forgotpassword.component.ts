import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup = new FormGroup({
    email:new FormControl('',Validators.email)
  });
  matcher = new ErrorStateMatcher();

  constructor(private dialog:DialogService,
              private router: Router) { }

  ngOnInit(): void {
  }

  forgotpass(){
    if(!this.formGroup.valid){
      this.dialog.open('error', 'Login.ForgotPassword.Error');
      return;
    }

    this.dialog.open('success', 'Login.ForgotPassword.Success',false,true,true,3000).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
