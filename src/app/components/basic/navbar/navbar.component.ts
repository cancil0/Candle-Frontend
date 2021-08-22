import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  sidebar = new SidebarComponent();
  selectedLang: string = '';
  isSideBarOpen: boolean = false;
  languages: any[] = [
    { "code": "tr", "description": "Türkçe" },
    { "code": "en", "description": "English" }
  ];

  constructor() { }

  ngOnInit(): void {
    this.selectedLang = localStorage.getItem('lang') || 'en';
  }

  gett() {
  }

  selectLang(value: any) {
    if (value === localStorage.getItem('lang'))
      return

    localStorage.setItem('lang', value);
    window.location.reload();
  }

  sideBarOpen(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
