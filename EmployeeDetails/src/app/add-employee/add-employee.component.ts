import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  title = "Angular Template-driven Forms";

  employee: any = {}; // Declare the 'employee' property

  // name!: string;
  // score: number | null = null;
  // email: string = '';

  // emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  @ViewChild('employeeForm') employeeForm!: NgForm;
  @ViewChild('submitButton') submitButton!: ElementRef;

  constructor() { }



  nameData() {
    console.log(this.employeeForm);
     
  }

 notValid(){
  console.log("not valid");
  if(this.employeeForm.invalid){   
  }
 }



  validateForm(): void {
    console.log("Form submitted");
    console.log(this.employeeForm);

    if (this.employeeForm.valid) {
      console.log('Form is valid');

      // Access the form values
      const { name, score, email } = this.employeeForm.value;

      // Perform further actions with the form values
      console.log('Name:', name);
      console.log('Score:', score);
      console.log('Email:', email);

      const employee = { name: name, score: score, email: email };
      console.log(employee);
      let employees: any[] = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.unshift(employee);

      localStorage.setItem('employees', JSON.stringify(employees));
      window.location.href = "/employee-detail";


    } 
    else {
      // Form is invalid, handle error or validation messages here
      console.log('Form is invalid');
    }
  }


  resetHandler(): void {
    this.employeeForm.resetForm();

    // this.name = '';
    // this.score = null;
    // this.email = '';

  }
}
