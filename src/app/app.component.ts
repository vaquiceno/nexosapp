import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from './usuario';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Nexos mercancia";
  public productos: Producto[];
  public usuarios: Usuario[];
  public editProducto: Producto;
  public deleteProducto: Producto;

  private useridCurrent: number;

  constructor (private productoService: ProductoService, private usuarioService: UsuarioService){}

  ngOnInit(){
    this.getProductos();
    this.getUsuarios();
  }

  public getProductos(): void {
    this.productoService.getProductos().subscribe(
      (response: Producto[]) => {
        this.productos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProducto(addForm: NgForm): void {
    var productoSend = {
      id : null,
      nombre : addForm.value.nombre,
      cantidad : addForm.value.cantidad,
      fechaIngreso : addForm.value.fechaIngreso,
      usuario : {
        id: addForm.value.usuario,
        nombre: null,
        edad: null,
        cargoname: null,
        fechaIngreso: null
      }
    };
    //alert(JSON.stringify(productoSend));
    if (!addForm.value.usuario){
      alert("Elige un usuario para esta operación");
      return;
    }
    document.getElementById('add-producto-form').click();
    this.productoService.addProducto(productoSend).subscribe(
      (response: Producto) => {
        this.getProductos();
        addForm.reset();
        alert("Producto creado");
      },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 412:      //no autorizado
              alert("Error: Fecha mayor o igual a la actual y/o nombre del producto ya existe.");
              break;
          default:     
              alert(error.message);
              break;
        }
        addForm.reset();
      }
    );
  }

  public onUpdateProducto(editForm: NgForm): void {
    var productoSend = {
      id : editForm.value.id,
      nombre : editForm.value.nombre,
      cantidad : editForm.value.cantidad,
      fechaIngreso : editForm.value.fechaIngreso,
      usuario : {
        id: editForm.value.usuarioid,
        nombre: null,
        edad: null,
        cargoname: null,
        fechaIngreso: null
      }
    };
    if (!editForm.value.usuario){
      alert("Elige un usuario para esta operación");
      return;
    }
    document.getElementById('edit-producto-form').click();
    this.productoService.updateProducto(productoSend, editForm.value.usuario).subscribe(
      (response: Producto) => {
        this.getProductos();
        alert("Producto modificado");
      },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 412:      
              alert("Error: Fecha mayor o igual a la actual y/o nombre del producto ya existe.");
              break;
          default:     
              alert(error.message);
              break;
        }
      }
    );
  }

  public onDeleteProducto(productoid: number): void {
    if (!this.useridCurrent){
      alert("Elige un usuario para esta operación");
      return;
    }

    this.productoService.deleteProducto(productoid, this.useridCurrent).subscribe(
      (response: void) => {
        this.getProductos();
        alert("Producto eliminado exitosamente");
      },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:      //no autorizado
              alert("Este producto solo puede ser eliminado por su creador");
              break;
          default:     
              alert(error.message);
              break;
        }
      }
    );
  }

  public searchProductos(key: string): void {
    console.log(key);
    const results: Producto[] = [];
    for (const producto of this.productos) {
      if (producto.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || producto.cantidad.toString().indexOf(key.toLowerCase()) !== -1
      || producto.fechaIngreso.toString().indexOf(key.toLowerCase()) !== -1
      || producto.usuario.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || producto.usuario.cargoname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(producto);
      }
    }
    this.productos = results;
    if (results.length === 0 || !key) {
      this.getProductos();
    }
  }

  public onOpenModal(producto: Producto, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductoModal');
    }
    if (mode === 'edit') {
      this.editProducto = producto;
      button.setAttribute('data-target', '#updateProductoModal');
    }
    if (mode === 'delete') {
      this.deleteProducto = producto;
      button.setAttribute('data-target', '#deleteProductoModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onChange(deviceValue) {
      this.useridCurrent = deviceValue;
  }

}
