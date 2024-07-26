import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { register } from '../model/formModal';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:3000/posts'; // URL to web API

  addEmployee(data:register){
   const  url="http://localhost:3000/posts"
  return this.http.post(url,data)
  }

  getEmployee(): Observable<any>{
    return this.http.get(this.apiUrl)
  }


  // deleteEmploy(dataId:any){
  //   debugger
  //   return this.http.delete(this.apiUrl,dataId)
  // }
  deleteEmploy(dataId:number){
    debugger
   return this.http.delete("http://localhost:3000/posts/"+dataId)
  }


  getQualification(){
    const url = "/assets/getOption.json"

    return this.http.get(url)
  }


  updateEmployee(data:register ,id:any){
    return this.http.put("http://localhost:3000/posts/"+id,data)
  }
}
