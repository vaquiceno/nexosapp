import { Usuario } from "./usuario";

export interface Producto{
    id: number;
    nombre: string;
    cantidad: number;
    fechaIngreso: Date;
    usuario: Usuario;
}