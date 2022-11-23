import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { CommmentCreateComponent } from './commment-create/commment-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ArraySortDescPipe } from './pipes/sort.pipe';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentComponent,
    CommmentCreateComponent,
    ConfirmModalComponent,
    ArraySortDescPipe,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
