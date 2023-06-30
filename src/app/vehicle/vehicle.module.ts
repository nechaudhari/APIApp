import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VehicleModule { 
  id: number = 0;
  company: string = '';
  model: string = '';
  cost: string = '';
  color: string = '';
  owner: string = '';
  reg_no: string = '';
  mob_no: string = '';
  address: string = '';

}
