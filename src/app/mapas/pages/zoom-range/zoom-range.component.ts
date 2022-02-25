import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width:100%;
      height: 100%;
    }

    .row {
      background-color: white;
      position:fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 5px;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number,number] = [-3.7471613288760164, 40.29673862597012];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID | referencia al elemento HTML
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => {
      const zoomAct = this.mapa.getZoom();
      this.zoomLevel = zoomAct;
    });

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event) => {
      const target = event.target;
      this.center = [target.getCenter().lng, target.getCenter().lat];
    });

  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomCambio(valor : string){
    console.log(valor);
    this.mapa.zoomTo(Number(valor));
  }

}
