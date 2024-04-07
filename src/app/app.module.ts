import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsGuard } from './userDetailsGuard';
import { MarkdownPipe } from 'src/utils/markdown.pipe';

const routes: Routes = [
  { path:'', component: UsersListComponent},
  { path:':id', component: UserDetailsComponent, canActivate: [UserDetailsGuard]},
  { path:'**', redirectTo: ''},
];
@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MarkdownPipe
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
