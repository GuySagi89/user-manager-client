import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { EMPTY_USER, NEW_USER_ID } from 'src/app/core/constants/constants';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import {
  maxCharactersValidator,
  minCharactersValidator,
  minWordsValidator,
} from 'src/app/core/validators/user-validators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  usersForm!: FormGroup;
  currentUser!: User;
  currentUser$!: Observable<User>;
  id!: number;
  id$!: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormBuilder,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.currentUser = EMPTY_USER;

    this.id = +this.route.snapshot.params['id'];
    try {
      if (isNaN(this.id) || (this.id <= 0 && this.id !== -1)) {
        this.router.navigate(['404']);
      }

      if (this.id !== NEW_USER_ID) {
        this.id$ = this.route.params.pipe(map((params) => +params.id));

        this.currentUser$ = this.id$.pipe(
          switchMap((id) => this.usersService.getUserByID(id))
        );

        this.currentUser = await this.currentUser$.pipe(first()).toPromise();
        if (!this.currentUser) {
          this.router.navigate(['404']);
        }
      }

      this.handleForm();
    } catch (error) {
      console.log(error);
    }
  }

  handleForm() {
    this.usersForm = this.formService.group({
      firstName: [
        this.currentUser.firstName,
        [Validators.required, minCharactersValidator(2), Validators.required],
      ],
      lastName: [
        this.currentUser.lastName,
        [Validators.required, minCharactersValidator(2), Validators.required],
      ],
      email: [
        this.currentUser.email,
        [
          Validators.required,
          minCharactersValidator(3),
          Validators.email,
          Validators.required,
        ],
      ],

      username: [
        this.currentUser.username,
        [Validators.required, minCharactersValidator(3), Validators.required],
      ],
      password: [
        this.currentUser.password,
        [Validators.required, minCharactersValidator(3), Validators.required],
      ],
    });
  }

  async saveForm() {
    try {
      if (this.usersForm.invalid) return;

      this.currentUser = { ...this.currentUser, ...this.usersForm.value };
      console.log(this.currentUser);
      if (this.id === NEW_USER_ID) {
        await this.usersService.addUser(this.currentUser);
      } else {
        await this.usersService.editUser(this.currentUser);
      }

      this.router.navigate(['users']);
    } catch (error) {}
  }
}
