import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  goToLoginPage() {
    this.nav.navigateForward(['loginscreen']);
  }

  registerUser() {
    this.nav.navigateForward(['signup']);
  }
}
