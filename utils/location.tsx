const GOOGLE_API_KEY = '';
interface ILocationProps {
  place: any;
}

// const Location: React.FunctionComponent = () => {

//   return (

//   );
// };

export function getMapPreview(lat: any, lon: any) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lon}
    &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat: any, lon: any) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
