import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/),
      ]),
      checkbox: new FormControl(false, [Validators.requiredTrue]),
    }, passwordMatchingValidatior)}


  signUp(){
    console.log(this.registerForm.value);
    this.http.post<any>("http://localhost:3000/users", this.registerForm.value)
    .subscribe(res=>{
    alert('Registrazione avvenuta correttamente. Benvenuto!');
    this.registerForm.reset();
    this.router.navigate(['log-in']);
    })

  }

}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};

