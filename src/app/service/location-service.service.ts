import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  HostUrl = environment.HostUrl;
  // LocationUrl= "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&";
  LocationUrl : string = "/getAddress.php";
  CordinateUrl: string = "/getCordinate.php";
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

  

  getAddress(lng:string,lat:string):any{
    let body = new FormData();
    body.append('lng', lng);
    body.append('lat', lat);
    return this.http.post<any>(this.HostUrl+this.LocationUrl,body).pipe();
  }
  
  getCordinate(address:string):any{
    let body = new FormData();
    body.append('address', address);
    return this.http.post<any>(this.HostUrl+this.CordinateUrl,body).pipe();
  }
}
