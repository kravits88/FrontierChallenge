import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  comments$ = this.commentsService.comments$;
  currentUser$ = this.currentUserService.currentUser$;

  constructor(private commentsService: CommentService, private currentUserService: CurrentUserService) {
    this.commentsService.get().pipe(take(1)).subscribe();
  }

}
