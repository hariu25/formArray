import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from './api/api-service.service';
import { register } from './model/formModal';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'formArray-Project';
  registrationForm!: FormGroup;
  employeeData: register[] = [];
  qualificationList: any[] = [];
  buttonLabel = 'Submit';
  contactId: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiServiceService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      address: [''],
      qualification: [''],
      currentC: [''],
      id: [''],
      previousCompany: this.fb.array([]),
    });
    this.getEmploy();
    this.getQualify();
  }

  submit(data: any) {
    if (data.id === '') {
      this.addEmp();
    } else {
      this.updataData(data);
    }
  }

  addEmp() {
    const formValue = this.registrationForm.value;

    const valueData: register = {
      firstName: formValue.firstname,
      lastName: formValue.lastname,
      address: formValue.address,
      qualification: formValue.qualification,
      currentCompny: formValue.currentC,
      previousCompanies: formValue.previousCompany.map((data: any) => ({
        companyName: data.previousC,
        companyDate: data.previousDate,
      })),
    };
    this.api.addEmployee(valueData).subscribe((res) => {
      alert('Added SuccessFully');
    });
  }

  getEmploy() {
    this.api.getEmployee().subscribe((res: any) => {
      debugger;
      this.employeeData = res;
      console.log('Data', this.employeeData);
    });
  }

  deleteEmp(id: any) {
    debugger;
    this.api.deleteEmploy(id).subscribe((res) => {
      alert('Deleted Successfully ');
    });
  }

  getQualify() {
    this.api.getQualification().subscribe((res: any) => {
      this.qualificationList = res.data;

      console.log('qualification', this.qualificationList);
    });
  }

  onEdit(data: any) {
    console.log('data', data);
    this.buttonLabel = 'Update';
    this.registrationForm.patchValue({
      id: data.id,
      firstname: data.firstName,
      lastname: data.lastName,
      address: data.address,
      qualification: data.qualification,
      currentC: data.currentCompny,
    });
    debugger;
    this.previousCompany.clear(); // // Clear the previousCompanies form array

    // Populate the previousCompanies form array

    if (data.previousCompanies && data.previousCompanies.length > 0) {
      data.previousCompanies.forEach((element: any) => {
        this.previousCompany.push(
          this.fb.group({
            previousC: element.companyName,
            previousDate: element.companyDate,
          })
        );
      });
    } else {
      console.error('nothing is there');
    }
  }

  updataData(data: any) {
    const values = this.registrationForm.value;
    const dataValue: register = {
      id: values.id,
      firstName: values.firstname,
      lastName: values.lastname,
      address: values.address,
      qualification: values.qualification,
      currentCompny: values.currentC,
      previousCompanies: values.previousCompany.map((element: any) => ({
        companyName: element.previousC,
        companyDate: element.previousDate,
      })),
    };

    this.api.updateEmployee(dataValue, dataValue.id).subscribe((res) => {
      alert('Updated Successfully');
    });
  }

  get previousCompany() {
    return this.registrationForm.controls['previousCompany'] as FormArray;
  }

  onAdd() {
    const previousForm = this.fb.group({
      previousC: [''],
      previousDate: [''],
    });
    this.previousCompany.push(previousForm);
  }
}
