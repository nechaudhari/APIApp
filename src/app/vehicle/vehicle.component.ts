import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { VehicleModule } from './vehicle.module';
import { VehicleModel } from './vehicle.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {

  formValue!: FormGroup;
  vehicleData: any;
  selectedVehicle: any;
  vehicleDetails: any;
  showAdd! : boolean;
  showUpdate! : boolean;

  vehicleModelObj : VehicleModel= new VehicleModel();

  constructor(private formbuilder: FormBuilder, private api: ApiService){}

  ngOnInit(){
    this. formValue = this.formbuilder.group({
      company: [''],
      model: [''],
      cost: [''],
      color: [''],
      owner: [''],
      reg_no: [''],
      mob_no: [''],
      address: ['']
    })

    this.getAllVehicles();
  }

  clickAddVehicle(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postVehicle(){
    this.vehicleModelObj.company = this.formValue.value.company;
    this.vehicleModelObj.model = this.formValue.value.model;
    this.vehicleModelObj.cost = this.formValue.value.cost;
    this.vehicleModelObj.color = this.formValue.value.color;
    this.vehicleModelObj.owner = this.formValue.value.owner;
    this.vehicleModelObj.reg_no = this.formValue.value.reg_no;
    this.vehicleModelObj.mob_no = this.formValue.value.mob_no;
    this.vehicleModelObj.address = this.formValue.value.address;

    this.api.postVehicle(this.vehicleModelObj)
    .subscribe((res: any) => {
      console.log(res);
      alert("Data added sucessfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllVehicles();
    },
      (    err: any) =>{
      alert("Something went wrong");
    });
  }

  getAllVehicles(){
    this.api.getVehicle()
    .subscribe(res =>{
      this.vehicleData = res;
    });
  }

  deleteVehicle(row: any){
    this.api.deleteVehicle(row.id)
    .subscribe(res => {
        alert("Vehicle deleted");
        this.formValue.reset();
        this.getAllVehicles();
    });
  }

  getVehicleDetails(id: number) {
    this.api.getVehicleDetails(id).subscribe(res => {
      this.vehicleDetails = res;
    });
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.vehicleModelObj.id = row.id;
    this.formValue.controls['company'].setValue(row.company);
    this.formValue.controls['model'].setValue(row.model);
    this.formValue.controls['cost'].setValue(row.cost);
    this.formValue.controls['color'].setValue(row.color);
    this.formValue.controls['owner'].setValue(row.owner);
    this.formValue.controls['reg_no'].setValue(row.reg_no);
    this.formValue.controls['mob_no'].setValue(row.mob_no);
    this.formValue.controls['address'].setValue(row.address);
  }

  updateVehicleDetails(){
    this.vehicleModelObj.company = this.formValue.value.company;
    this.vehicleModelObj.model = this.formValue.value.model;
    this.vehicleModelObj.cost = this.formValue.value.cost;
    this.vehicleModelObj.color = this.formValue.value.color;
    this.vehicleModelObj.owner = this.formValue.value.owner;
    this.vehicleModelObj.reg_no = this.formValue.value.reg_no;
    this.vehicleModelObj.mob_no = this.formValue.value.mob_no;
    this.vehicleModelObj.address = this.formValue.value.address;

    this.api.updateVehicle(this.vehicleModelObj, this.vehicleModelObj.id)
    .subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllVehicles();
    })
  }
  
}
