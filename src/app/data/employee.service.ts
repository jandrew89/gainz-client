import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';  
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {  
    return this.http.get<Employee[]>(this.employeesUrl + 'Get')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getEmployee(id: string, cityName: string): Observable<Employee> {  
    if (id === '') {  
      return of(this.initializeEmployee());  
    }  
    const url = `${this.employeesUrl + 'Get'}/${id}/${cityName}`;  
    return this.http.get<Employee>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  createEmployee(employee: Employee): Observable<Employee> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Employee>(this.employeesUrl + 'CreateOrUpdate', employee, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  deleteEmployee(id: string, cityname: string): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.employeesUrl + 'Delete'}/${id}/${cityname}`;  
    return this.http.delete<Employee>(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updateEmployee(employee: Employee): Observable<Employee> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = this.employeesUrl + 'CreateOrUpdate';  
    return this.http.put<Employee>(url, employee, { headers: headers })  
      .pipe(  
        map(() => employee),  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
  
  private initializeEmployee(): Employee {  
    return {  
      id: null,  
      name: null,  
      address: null,  
      gender: null,  
      company: null,  
      designation: null,  
      cityname: null  
    };  
  }  
}
