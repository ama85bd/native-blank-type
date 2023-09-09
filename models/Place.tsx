class Place {
  id: any;
  title: any;
  imageUri: any;
  address: any;
  location: any;
  constructor(title: any, imageUri: any, address: any, location: any) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
