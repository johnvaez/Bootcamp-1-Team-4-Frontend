import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private customerServiceService: CustomerServiceService) { }

  form = new FormGroup({ identityType: new FormControl(), identityNumber: new FormControl() });
  submitted = false;
  show = false;
  error = false;
  customer: any;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      identityType: ['', Validators.required],
      identityNumber: ['', Validators.required]
    });

  }

  get validate() { return this.form.controls; }

  onSubmit() {

    this.show = false;
    this.error = false;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.customerServiceService.verifyAccount(this.form.value).subscribe(response => {

      this.onResetForm();
      this.customer = response;
      this.show = true;

    }, err => {
      if (!err.error.task) {
        this.error = true;
      }
    })

  }

  onResetForm(): void {
    this.form.reset();
  }

}
