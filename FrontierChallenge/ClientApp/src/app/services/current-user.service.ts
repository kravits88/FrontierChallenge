import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService extends BaseHttpService {

  url = "currentUser"

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    super();

    super.get().subscribe((response: any) => this.currentUserSubject.next(response));
  }

}
