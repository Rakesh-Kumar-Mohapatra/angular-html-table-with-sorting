import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const API_URL =
'https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json';

@Injectable({
  providedIn: 'root',
})

export class CookiesService {

  constructor(private http: HttpClient) {}

  public get(): Observable<any> {
    return this.http.get(API_URL).pipe(map((res) => res));
  }

}