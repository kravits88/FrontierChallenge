import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-commment-create',
  templateUrl: './commment-create.component.html',
  styleUrls: ['./commment-create.component.scss']
})
export class CommmentCreateComponent implements OnInit {

  @Input() replyingToComment: Comment | undefined;

  @Input() comment: Comment = {};

  placeHolder?: string;

  constructor(private commentService: CommentService) { }


  ngOnInit(): void {
    this.placeHolder = this.comment.id ? "Edit comment..." : "Add new comment..."
  }


  sendComment(): void {

    if (this.replyingToComment) {
      this.comment.replyingTo = this.replyingToComment.user?.userName;
      this.comment.replyingToId = this.replyingToComment.replyingToId || this.replyingToComment?.id;
    }

    this.commentService.post(this.comment).subscribe((response: any) => this.comment = {});
  }

}
