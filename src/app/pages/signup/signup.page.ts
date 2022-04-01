import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationMessages = {
    names: [{type:'required', message:'Veuillez entrer votre nom complet'}],
    phone: [{type:'required', message:'Veuillez entrer votre numéro de téléphone'}],
    email: [
      {type: 'required',message:'Veuillez entrer votre adresse-mail'},
      {type:'pattern', meesage:'Email incorrect, veuillez réessayer'}
    ],
    password: [
      {type: 'required', message: 'Mot de passe requis'},
      {type:'minlength', message: 'Le mot de passe doit contenir au minimum 6 caractères'}
    ]
};

  validationFormUser: FormGroup;
  loading: any;

  constructor(private formbuilder: FormBuilder, private authService: AuthService,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private router: Router, private navCtr: NavController) { }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      names: new FormControl('', Validators.compose([
        Validators.required
      ])),

      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  registerUser(value){
    this.showalert();
    try {
      this.authService.userRegistration(value).then( response => {
        console.log(response);
        if(response.user) {
          response.user.updateProfile({
            displayName: value.names,
            email: value.email,
            phoneNumber: value.phone
          });
          // this.loading.dismiss();
          this.router.navigate(['loginscreen']);
        }
        }, error => {
          // this.loading.dismiss();
          this.errorLoading(error.message);
        });
    } catch(erro) {
      console.log(erro);
    }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header: 'Error Registering',
      message,
      buttons:[{
        text:'ok',
        handler: () => {
        this.navCtr.navigateBack(['signup']);
        }
      }]
    });
    await loading.present();
  }


  async showalert(){
    const load = await this.loadingCtrl.create({
      message: 'Veuillez patienter ...',
    });
    load.present();
  }
}
