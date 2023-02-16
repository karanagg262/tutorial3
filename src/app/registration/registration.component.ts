import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  title = 'Tutorial3';
  registrationForm: FormGroup;
  firstNameError = '';
  lastNameError = '';
  emailError = '';
  passwordError = '';
  confirmpasswordError = '';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(){
    this.registrationForm = new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit(registrationForm: FormGroup){
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmpasswordError = '';
    const check = this.checkControls();
    const check2 = this.checkPassword();
    if (this.registrationForm.valid && check && check2) {
      this.router.navigate(['/profile'],{ queryParams: registrationForm.value } );
    }
  }

  nameKeyPress(event: KeyboardEvent){
    if(!((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122))){
      event.preventDefault();
    }
  }
  checkPassword(){
    if(this.registrationForm.value.password != this.registrationForm.value.confirmpassword){
      this.passwordError = "Password should match."
      this.confirmpasswordError = "Password should match."
      return false;
    }
    if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]/.test(this.registrationForm.value.password)){
      this.passwordError = "Password should be alphanumeric and should contain special characters`."
      return false;
    }
     return true;
  }

  checkControls(){
    const errors = this.registrationForm.controls;
    let flag = false;
    for( const error in errors){
      if(this.registrationForm.controls['firstName'].errors?.['required']){
        this.firstNameError = "Please enter the First Name.";
        flag = true;
      }
      if(this.registrationForm.controls['lastName'].errors?.['required']){
        this.lastNameError = "Please enter the Last Name."
        flag = true;
      }
      if(this.registrationForm.controls['email'].errors?.['required']){
        this.emailError = "Please enter the E-mail.";
        flag = true;
      }
      if(this.registrationForm.controls['email'].errors?.['email']){
        this.emailError = "Please enter correct E-mail address";
        flag = true;
      }
      if(this.registrationForm.controls['password'].errors?.['required']){
        this.passwordError = "Please enter the Password."
        flag = true;
      }
      if(this.registrationForm.controls['password'].errors?.['minlength']){
        this.passwordError = "Password Length should be minimum 8 char long."
        flag = true;
      }
      if(this.registrationForm.controls['confirmpassword'].errors?.['required']){
        this.confirmpasswordError = "Please enter the confirm password.";
        flag = true;
      }
      if(this.registrationForm.controls['confirmpassword'].errors?.['minlength']){
        this.confirmpasswordError = "Password Length should be minimum 8 char long."
        flag = true;
      }
    }
    if(flag){
      return false;
    }
    return true;
  }

}
