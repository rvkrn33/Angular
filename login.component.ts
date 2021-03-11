import { Component, OnInit} from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../shared-service/user.service';
import { LoginService } from '../../shared-service/login.service';

import { Sample } from '../../sample';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 // @Input() sam: Sample;

  invalidLogin = false

  user: User = {
    adminId: null,
    userId: null,
    userType: null,
    pass: null,
    userRemark: null,
    loginFlag: null
  };

  constructor(private _userService: UserService, private _router: Router, private loginService: LoginService) {
  }

  ngOnInit() {}
  
  loginForm() {
    console.log(this.user);
       this._userService.loginUser(this.user).subscribe((user) => {
         console.log(user);
         if (user.loginFlag) {
           sessionStorage.setItem('username', this.user.userId);
           sessionStorage.setItem('userType', this.user.userType);

           this.invalidLogin = true
           this._router.navigate(['/userList']);
         } else {
           this.invalidLogin = false
           this._router.navigate(['/']);
         }
    })
  }



  loginUser() {
    console.log("loginUser");
    let user = new User();
    this._userService.setter(user);
    this._router.navigate(['/login']);
  }

  backToHome() {

    this._router.navigate(['/userList']);
  }

}
