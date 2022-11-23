import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { CurrentUserService } from '../services/current-user.service';
import { fadeAnimation } from '../app.animation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CommentService } from '../services/comment.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [fadeAnimation]
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment;

  currentUser$ = this.currentUserService.currentUser$;

  isReplying = false;
  isEditing = false;

  constructor(
    private currentUserService: CurrentUserService,
    private modalService: NgbModal,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  confirmDelete(): void {
    this.modalService.open(ConfirmModalComponent, { centered: true }).result.then((result) => {
      if (result === "yes")
      {
        this.commentService.delete(this.comment.id!).pipe(take(1)).subscribe();
      }
    }, (reason) => {
      //modal dismissed
    });
  }

  updateScore(amount: number): void {
    this.comment.score! += amount;
    this.commentService.post(this.comment).pipe(take(1)).subscribe();
  }

}
