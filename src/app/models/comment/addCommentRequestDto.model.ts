export class AddCommentRequestDto{
    userId:string = '';
    postId: string = '';
    parentCommentId: string = '';
    commentText: string = '';
}