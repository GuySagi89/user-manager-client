import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGuard } from 'src/app/core/guards/users.guard';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersPresenterComponent } from './components/users-presenter/users-presenter.component';

const routes: Routes = [
  {path: '', component: UsersPresenterComponent, canActivate: [UsersGuard]},
  {path: ':id', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagerRoutingModule { }
