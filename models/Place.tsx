export class Place {
  id: any;
  title: any;
  imageUri: any;
  address: any;
  location: any;
  constructor(title: any, imageUri: any, location: any, id?: any) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lon: location.lon };
    this.id = id;
  }
}
