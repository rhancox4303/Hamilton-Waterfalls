import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WaterfallsService } from './waterfalls.service';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 43.25011, lng: -79.84963};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  currentMarkerPositions: google.maps.LatLngLiteral[] = [];
  currentSelectedData:  Array<any> = [];
  infoWindowOutput: string
  constructor(httpClient: HttpClient,
    private waterfallService: WaterfallsService
    ) {
    
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOJIvbWDNnMFw0H_vZGBjg6oYp-J3JSQM', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  getWaterFalls(){
    this.currentSelectedData = this.waterfallService.getWaterFalls()
    this.drawMarkers()
  }

  drawMarkers(){
    this.currentSelectedData.forEach(waterfall => {
      this.currentMarkerPositions.push({lat: waterfall.LATITUDE, lng: waterfall.LONGITUDE})
    })
  }
  
  clearMarkers(){
    this.currentSelectedData =[]
    this.currentMarkerPositions = []
  }

  openInfoWindow(marker: MapMarker) {
    let waterfall = this.currentSelectedData.filter(waterfall => waterfall.LONGITUDE == marker.getPosition().lng() && waterfall.LATITUDE == marker.getPosition().lat());
    this.infoWindowOutput = waterfall[0].NAME
    this.infoWindow.open(marker);
  }

  onChangeEvent(event: any){
    this.clearMarkers()
    this.currentSelectedData = this.waterfallService.getWaterFalls().filter(waterfall => waterfall.NAME.includes(event.target.value))
    this.drawMarkers()
  }
}
