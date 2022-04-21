import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {


  exform!: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'message' : new FormControl(null, [Validators.required, Validators.minLength(20)])

    })

  }

  reset(){
    this.exform.reset();
  }

  clicksub(){
    console.log(this.exform.value);
    this.exform.reset();
  }


  get name(){
    return this.exform.get('name');
  }

  get email(){
    return this.exform.get('email');
  }

  
  get message(){
    return this.exform.get('message');
  }
  

}
