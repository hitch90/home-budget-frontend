import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import md5 = require('../services/md5.js');
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    authForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {
      this.authForm = this.formBuild();
  }
  
  formBuild() {
      return this.formBuilder.group({
          password: ['', Validators.required]
      });
  }

  saveAuth() {
      localStorage.setItem('status', 'true');
      localStorage.setItem('password', md5(this.authForm.getRawValue().password));
      this.router.navigate(['/']);
  }
}
