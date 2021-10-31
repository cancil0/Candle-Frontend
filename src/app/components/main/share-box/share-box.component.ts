import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/postService/post.service';
import { AddPostDto } from 'src/app/models/user/addPostDto.model';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { FileService } from 'src/app/services/fileSService/file.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewpostDialogComponent } from '../previewpost-dialog/previewpost-dialog.component';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-share-box',
  templateUrl: './share-box.component.html',
  styleUrls: ['./share-box.component.scss']
})
export class ShareBoxComponent implements OnInit {

  fileName:string = '';
  imgURL: any;
  file:any[] = [];
  addPostDto: AddPostDto ={
    content:'',
    medias:[],
    tags:[],
    userName:''
  }

  formGroup = new FormGroup({
    content:new FormControl('')
  });
  constructor(private postService:PostService,
              private dialogService:DialogService,
              private fileService:FileService,
              private userService:UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addPost(){
    this.addTag();
    this.addContent();
    this.addPostDto.userName = this.userService.userName;
    this.dialogService.open('info', 'Main.ShareBox.InfoBeforeShare',true).subscribe(() => {
      this.dialog.open(PreviewpostDialogComponent, {
        data: {
          userName: this.addPostDto.userName,
          imgURL:this.imgURL,
          tags:this.addPostDto.tags,
          content:this.addPostDto.content
        }
      }).afterClosed().subscribe(res => {
        if(res){
          if(this.file !== null){
            this.fileService.onFileSelected(this.file, this.addPostDto.userName)?.subscribe((fileRes) => {
              if(fileRes.isSuccess){
                fileRes.data.forEach((element:any) => {
                  this.addPostDto.medias.push({
                    caption: element.caption,
                    fileName:element.fileName,
                    fileSize:element.fileSize,
                    mediaType:element.mediaType,
                    index:element.index
                  });
                });
      
                this.postService.addPost(this.addPostDto).subscribe((postRes) => {
                  if(postRes.isSuccess){
                    this.dialogService.open('success', 'Main.ShareBox.SuccessSharing')
                    this.clear()
                  }else{
                    this.clear()
                    this.dialogService.open('error', 'Main.ShareBox.ErrorSharing')
                  }
                });
              }else{
                this.dialogService.open('error', 'Main.ShareBox.AddMedia');
                return
              }
            });
          } 
        }
      });
    });

  }

  addContent(){
    if(this.addPostDto.content === ''){
      let content = '';
      content = this.formGroup.get('content')?.value;   
      content.match(/(\#\S+\b)/ig)?.forEach(element =>{
        content = content.replace(element,'');
      });
      this.addPostDto.content = content.replace('  ', ' ');
    }
  }
  
  addTag(){
    if(this.addPostDto.tags.length === 0){
      let content = '';
      content = this.formGroup.get('content')?.value;
      content.match(/(\#\S+\b)/ig)?.forEach(element =>{
        this.addPostDto.tags.push({tagName:element.slice(1)});
      });
    }
  }

  onFileInput($event:any){
    this.file = $event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(this.file[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  clear(){
    this.file = [];
  }
}
