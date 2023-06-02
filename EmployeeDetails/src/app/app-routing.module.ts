import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  {path:'', redirectTo:'add-employee',pathMatch:'full'},
  {path:'add-employee',component:AddEmployeeComponent},
  {path:'employee-detail',component:EmployeeDetailComponent},
  {path:'**',component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
