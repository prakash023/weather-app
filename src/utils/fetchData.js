
 export default async function FetchWeatherData(url) {
const options = {method: 'GET', headers: {Accept: 'application/json'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  return data
} catch (error) {
  console.error(error);
}
 }

