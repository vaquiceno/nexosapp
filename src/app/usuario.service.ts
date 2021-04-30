import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Usuario} from './usuario';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiServerUrl}/api/v1/usuario/all`);
    }

}