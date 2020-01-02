import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data/entities/user';
import { UserService } from 'src/app/data/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-environment-variables',
  templateUrl: './environment-variables.component.html',
  styleUrls: ['./environment-variables.component.css']
})
export class EnvironmentVariablesComponent implements OnInit {

  user: User
  disableSaveBtn: boolean = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
        user => this.user = this.convertUser(user)
      )
  }
  convertUser(user: User): User {
    if (user) {
      if (!user.settings) {
        user.settings = { sessionsListLoadAmount : 3, previousSetLoadAmount: 2 }
      }
    }

    return user;
  }

  onSettingsSave() {

    this.disableSaveBtn = true;

    this.userService.UpdateEnvironmentSettings(this.user).subscribe(
      isSuccess => {
        if (isSuccess)
          this.toastr.success('Updated Environment Settings');
        this.disableSaveBtn = false;
      }
    )
  }
}
