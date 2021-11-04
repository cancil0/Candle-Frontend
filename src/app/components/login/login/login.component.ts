import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginDto } from 'src/app/models/login/userLoginDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { environment } from 'src/environments/environment';

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
    password:'',
    mobilePhone:'', 
    userName:'',
    privateTokenKey :''
  };

  constructor(private router: Router,
              private loginService:LoginService,
              private route: ActivatedRoute,
              private dialogService:DialogService,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.userLoginDto = {
      email:this.formGroup.controls['email'].value,
      password:this.formGroup.controls['password'].value,
      mobilePhone:'',
      userName:'',
      privateTokenKey :environment.privateTokenKey
    }
    this.loginService.login(this.userLoginDto).subscribe(res =>{
      if(res.isSuccess){
        this.localStorageService.setToken(res.data);
        this.router.navigate(['/main']).then(()=>{
          window.location.reload();
        });
      }else{
        this.dialogService.open('error', 'Login.Login.Exception.WrongMailPassword');
      }
    },
    (error) => {
      this.dialogService.open('error', error);
    });
  }

}
