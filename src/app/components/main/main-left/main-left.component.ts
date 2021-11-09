import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/user/tag.model';

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.component.html',
  styleUrls: ['./main-left.component.scss']
})
export class MainLeftComponent implements OnInit {
  Tags:Tag[] =[
    {
      tagName:'İstanbul',
    },
    {
      tagName:'Ankara',
    },
    {
      tagName:'Turkey',
    },
    {
      tagName:'America',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
