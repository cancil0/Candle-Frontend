import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/models/user/userDto.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
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

  returnUrl : string = '';
  hide:boolean = true;
  matcher = new ErrorStateMatcher();

  constructor(private dialog:DialogService,
              private route: ActivatedRoute,
              private router: Router,
              private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login(){
    if(!this.formGroup.valid){
      this.dialog.open('error', 'Login.Login.UnSuccessfulLogin');
      return;
    }
    const {email,password} = this.formGroup.getRawValue()

    await this.authService.logIn(email,password).toPromise().then(() => {
      this.router.navigateByUrl('/main').then(() => {
        window.location.reload();
      });
      
    })
    
  }

}
