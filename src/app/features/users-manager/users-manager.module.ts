import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagerRoutingModule } from './users-manager-routing.module';
import { UsersPresenterComponent } from './components/users-presenter/users-presenter.component';
import { MatButtonModule } from '@angular/material/button';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    UsersPresenterComponent,
    UserItemComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    UsersManagerRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class UsersManagerModule { }
