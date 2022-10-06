import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ciudad = '';
  loading = false;
  query = false;
  temperatura = 0;
  humedad = 0;
  clima = 0;
  error = false;
  constructor(private _climaService: ClimaService) { }

  ngOnInit(): void {
  }

  obtenerClima(){
    this.query = false;
    this.loading = true;
    this._climaService.getClima(this.ciudad).subscribe(data =>
      {
      this.loading = false;
      this.query = true;
      this.temperatura = data.main.temp - 273;
      this.humedad = data.main.humidity;
      this.clima = data.weather[0].main;
      },error => {
      this.loading = false;
        this.errorFuncion();
      } );

  }
  errorFuncion(){
    this.error = true;
    setTimeout(() => {
      this.error = false; this.ciudad = '';
}, 3000);
  }
}
