import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginDto } from 'src/app/models/login/userLoginDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { LoginService } from 'src/app/services/loginService/login.service';

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

  returnUrl : string = '';
  hide:boolean = true;
  matcher = new ErrorStateMatcher();
  userLoginDto : UserLoginDto = {
    email:'',
    mobilePhone:'',
    password:'',
    userName:''
  };

  constructor(private router: Router,
              private loginService:LoginService,
              private route: ActivatedRoute,
              private dialogService:DialogService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.userLoginDto = {
      email:this.formGroup.controls['email'].value,
      mobilePhone:'',
      password:this.formGroup.controls['password'].value,
      userName:''
    }
    this.loginService.login(this.userLoginDto).subscribe(res =>{
      if(res.isSuccess){
        localStorage.setItem("token", res.data);
        this.router.navigate(['/main']).then(()=>{
          window.location.reload();
        });
      }
    },
    (error) => {
      this.dialogService.open('error', error);
    });
  }

}
