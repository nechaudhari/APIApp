import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postVehicle(data: any){
    return this.http.post<any>("http://localhost:3000/vehicles", data)
    .pipe(map((res: any) => {
      return res;}))
  }

  getVehicle(){
    return this.http.get<any>("http://localhost:3000/vehicles")
    .pipe(map((res: any) => {
      return res;}))
  }

  updateVehicle(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/vehicles/"+id, data)
    .pipe(map((res: any) => {
      return res;}))
  }

  deleteVehicle(id: number) {
    return this.http.delete<any>("http://localhost:3000/vehicles/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getVehicleDetails(id: number) {
    return this.http.get<any>("http://localhost:3000/vehicles/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  

  
  
}
