import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Partner} from '../models/partner.model';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private apiUrl = '/api/partners';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl);
  }

  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`);
  }

  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.apiUrl, partner);
  }

  updatePartner(id: number, partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`${this.apiUrl}/${id}`, partner);
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}