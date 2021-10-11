import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
  @Input('user') user!: User;
  @Output('selected-id') selectedUser = new EventEmitter<number>();
  @Output('delete-user') deleteUser = new EventEmitter<number>();

  onDoubleClick(id: number) {
    this.selectedUser.emit(id);
  }

  onDeleteUser(id: number) {
    this.deleteUser.emit(id);
  }
}
