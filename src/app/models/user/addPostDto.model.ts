import { Media } from "./media.model";
import { Tag } from "./tag.model";

export class AddPostDto {
    userName : string = '';
    content : string = '';
    medias : Media[] = [];
    tags : Tag[] = [];
}