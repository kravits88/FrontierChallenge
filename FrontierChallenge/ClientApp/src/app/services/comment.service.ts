import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment } from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseHttpService {

  url = "comment";

  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$: Observable<Comment[]> = this.commentsSubject.asObservable();

  constructor() {
    super();
  }

  get(): Observable<Object> {
    super.get().subscribe((response: any) => this.commentsSubject.next(response));

    return this.comments$;
  }

  post(data: any): Observable<Object> {
    return super.post(data).pipe(tap(x=> this.get())); //TODO manipulate comments$ array with changes to avoid need for get all call
  }

  delete(id: number | string): Observable<Object> {
    return super.delete(id).pipe(tap(x => this.get())); //TODO manipulate comments$ array with changes to avoid need for get all call
  }

}
