import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginDto } from 'src/app/models/login/userLoginDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { UserService } from 'src/app/services/userService/user.service';
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
  isSendClicked:boolean = false;
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
              private localStorageService:LocalStorageService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.isSendClicked = true
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
        if(res.message === 'userisbanned'){
          this.dialogService.open('error', 'Login.Login.Exception.UserBanned');
        }else if(res.message === 'needconfirm'){
          this.dialogService.open('question', 'Login.Login.ActivateUser', true, true).subscribe((result) => {
            if(result){
              this.userService.activateUser(res.data).subscribe((avtivateUserRes) => {
                if(avtivateUserRes){
                  this.dialogService.close();
                  this.dialogService.open('info', 'Login.Login.UserActivated').subscribe(() => {
                    this.router.navigate(['/login']);
                  })
                }else{
                  this.dialogService.open('info', 'Common.Exception.Error')
                }
              })
            }
          });
        }else if(res.message === 'error'){
          this.dialogService.open('error', 'Login.Login.Exception.WrongMailPassword');
        }
        this.isSendClicked = false
      }
    },
    (error) => {
      this.isSendClicked = false
      this.dialogService.open('error', error);
    },);
  }

}
