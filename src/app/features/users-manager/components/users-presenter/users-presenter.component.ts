import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NEW_USER_ID, NEW_USER_PAGE } from 'src/app/core/constants/constants';

import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-presenter',
  templateUrl: './users-presenter.component.html',
  styleUrls: ['./users-presenter.component.css'],
})
export class UsersPresenterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  users: User[] = [];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.reloadUsers();
  }

  goToEditUser(id: number) {
    if (id === NEW_USER_ID) {
      this.router.navigate([NEW_USER_PAGE]);
    } else {
      this.router.navigate(['users', id]);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.usersService.deleteUserByID(id);
      this.reloadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  reloadUsers() {
    const newSubsc = this.usersService.getAllUsers().subscribe((r) => {
      this.users = r;
    });
    this.subscriptions.add(newSubsc);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
