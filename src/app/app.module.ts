import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';

import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [ProductoService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
