import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Producto} from './producto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiServerUrl}/api/v1/producto/all`);
    }

    public addProducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(`${this.apiServerUrl}/api/v1/producto/add`, producto);
    }

    public updateProducto(producto: Producto, userid: number): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiServerUrl}/api/v1/producto/update/${userid}`, producto);
    }

    public deleteProducto(productoid: number, userid: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/producto/delete/${productoid}/${userid}`);
    }
}