import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  validationUserMessage = {
    email:[
      { type:'required', message:'Veuillez entrer votre email' },
      { type:'pattern', message:'L\'email est incorrect, veuillez réessayer' }
    ],
    password:[
      { type:'required', message:'Veuillez entrer votre mot de passe' },
      { type:'minlength', message:'Le mot de passe doit comporter au moins 5 caractères ou plus' }
    ]
  };

  validationFormUser: FormGroup;

  constructor(public formbuilder: FormBuilder, public authservice: AuthService) { }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  loginUser(value) {
    console.log('Je suis connecté');
    try {
      this.authservice.loginFireAuth(value).then( resp => {
        console.log(resp);
      });
    } catch(err) {
      console.log(err);
    }
  }
}
