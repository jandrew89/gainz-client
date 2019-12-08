import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Equipment } from '../entities/equipment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private url = environment.liftUrl; 
  constructor(private http: HttpClient) { }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.url + 'Get');
  }

  getEqupimentByName(name: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.url + 'Get'}/${name}`)
      .pipe(catchError(this.handleError));
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
}
