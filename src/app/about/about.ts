import { Component, ViewChild, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { MenuController, IonSlides, Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../about-popover/about-popover';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DOCUMENT } from '@angular/common';
import { darkStyle } from './map-dark-style';
import myConfig from './../../config';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage implements AfterViewInit {


  // constructor(public popoverCtrl: PopoverController,public router: Router, public storage: Storage) { }



  // export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public popoverCtrl: PopoverController, public router: Router, public storage: Storage,
    // public confData: ConferenceData,
    public platform: Platform) { }

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      myConfig.googleMapApiKey
    );

    let map;

    let mapData = [
      {
        "name": "Kinsale, Ireland",
        "lat": 51.7059,
        "lng": -8.5222,
        zoom:8,
        "center": true
      }
    ]


    // this.confData.getMap().subscribe((mapData: any) => {
    const mapEle = this.mapElement.nativeElement;

    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8
    // });


    map = new googleMaps.Map(mapEle, {
      center:  {lat:51.7059, lng: -8.5222},
      zoom: 12,
      styles: style
    });

    // mapData.forEach((markerData: any) => {
    //   const infoWindow = new googleMaps.InfoWindow({
    //     content: `<h5>${markerData.name}</h5>`
    //   });

    //   const marker = new googleMaps.Marker({
    //     position: markerData,
    //     map,
    //     title: markerData.name
    //   });

    //   marker.addListener('click', () => {
    //     infoWindow.open(map, marker);
    //   });
    // });

    googleMaps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
    //});

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({ styles: darkStyle });
          } else if (map) {
            map.setOptions({ styles: [] });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });

    function getGoogleMaps(apiKey: string): Promise<any> {
      const win = window as any;
      const googleModule = win.google;
      if (googleModule && googleModule.maps) {
        return Promise.resolve(googleModule.maps);
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${myConfig.googleMapApiKey}&v=3.39`;
        // script.src = `htt?ps://maps.googleapis.com/maps/api/js?key=${myConfig.googleMapApiKey}&v=3.31`;
        // script.src = `https://maps.googleapis.com/maps/api/js?v=3.39&key=${myConfig.googleMapApiKey}&callback=initMap`
        // script.src = `https://maps.googleapis.com/maps/api/js?key=${myConfig.googleMapApiKey}&callback=initMap`
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
          const googleModule2 = win.google;
          if (googleModule2 && googleModule2.maps) {
            resolve(googleModule2.maps);
          } else {
            reject('google maps not available');
          }
        };
      });
    }
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

}
