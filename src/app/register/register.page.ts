import { Component, OnInit } from '@angular/core';
import { Register } from './../model/register.model';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './../services/register.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  name!: string;
  myForm: NgForm = new NgForm([], []);

  //myForm: FormGroup;
  fullName!: string;
  //class!: string;
  password!: string;
  email!: string;
  phoneNumber!: string;
  activationCode!: string;


@ViewChild('myModal', { static: true }) myModal!: IonModal;

registrationForm: FormGroup;

registrationForm1: FormGroup;


get emailControl() {
  return this.myForm.control.get('email');
}

isRequiredError() {
  return this.emailControl?.hasError('required') && (this.emailControl.dirty || this.emailControl.touched);
}

isEmailError() {
  return this.emailControl?.hasError('email') && (this.emailControl.dirty || this.emailControl.touched);
}
performAction() {
  this.myModal.present();
}


  async onSubmit() {


    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();



    localStorage.setItem('fullname', this.registrationForm.value.fullName);

    if (this.registrationForm.valid) {

      const details : Register = {
        "name":"register",
      "param":{

        "fullname": this.registrationForm.value.fullName,
        "email": this.registrationForm.value.email,
          "phone": this.registrationForm.value.phoneNumber,
          "password": this.registrationForm.value.password,
          }
      };

      this.studentService.createRegister(details)
    .subscribe({
      next: (data) => {

        if(data.response.status == 200){
         // this.performAction();
          localStorage.setItem('user_id', data.response.result);
          console.log(localStorage.getItem("user_id"));
          loading.dismiss();
          this.presentAlert('Success Alert', 'Registration Successful Click Activate Button to Activate The Reader');
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error creating record:', error);
      }
    });

      //  console.log('Form data:', this.registrationForm.value);
      // TODO: Submit form data to server
    }
  }


  selectedSegment ='school';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private studentService: RegisterService, private router: Router,
    private loadingCtrl: LoadingController) {

    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      schoolName: ['', Validators.required],
      // class: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    this.registrationForm1 = this.formBuilder.group({
      fullName: ['', Validators.required],
      // class: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    // this.myForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    // });


  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }





  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Go to Class',
          cssClass: 'custom-alert-button',
          handler: () => {
            // Replace this URL with the one you want to navigate to
           // window.location.href = 'activate';
           this.router.navigateByUrl('class');
          }
        }
      ]
    });

    await alert.present();
  }



}
