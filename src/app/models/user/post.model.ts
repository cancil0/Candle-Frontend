import { Like } from "./like.model";
import { Media } from "./media.model";
import { Tag } from "./tag.model";
import { Comment } from "./comment.model";

export class Post{
    id : string = '';
    userName: string = '';
    userId: string = '';
    content : string = '';
    createTime: Date = new Date();
    profilePhotoPath:string = '';
    medias : Media[] = [];
    tags : Tag[] = [];
    comments : Comment[] = [];
    likes : Like[] = [];
}