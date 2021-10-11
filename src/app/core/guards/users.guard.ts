import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NEW_USER_PAGE } from '../constants/constants';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.usersService.getUsersCount().pipe(
      map((s) => {
        if (s === 0) {
          return this.router.parseUrl(NEW_USER_PAGE);
        }
        return true;
      })
    );
  }
}
