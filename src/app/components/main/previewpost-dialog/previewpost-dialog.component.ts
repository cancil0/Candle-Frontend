import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-previewpost-dialog',
  templateUrl: './previewpost-dialog.component.html',
  styleUrls: ['./previewpost-dialog.component.scss']
})
export class PreviewpostDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }
}