import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup = new FormGroup({
    firstCtrl: new FormControl()
  });
  secondFormGroup: FormGroup= new FormGroup({
    secondCtrl: new FormControl()
  });
  constructor() { }

  ngOnInit(): void { }

}
