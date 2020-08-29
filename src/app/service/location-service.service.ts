import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  LocationUrl= "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&";
  CordinateUrl = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?category=&outFields=*&forStorage=false&f=pjson&SingleLine=";
  constructor(private http: HttpClient) { }

  getCurrentLocation(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  getAddress(lng,lat):any{
    return this.http.get<any>(`${this.LocationUrl}location=${lng},${lat}`).pipe();
  }
  getCordinate(address:string):any{
    return this.http.get<any>(this.CordinateUrl+address).pipe();
  }
}
