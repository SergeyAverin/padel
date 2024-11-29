// const API_GET_IP = 'https://api.ipify.org?format=json'
// const API_GET_GEO = 'http://ip-api.com/json/'
interface ILocationData {
  latitude: number;
  longitude: number;
}
export const getGeo = () => {
  // const res_ip = await fetch(API_GET_IP)
  // const data_ip = await res_ip.json()
  // const ip = data_ip.ip
  // const res_geo = await fetch(API_GET_GEO + ip)
  // const data_geo = await res_geo.json()

  if (window.Telegram.WebApp.platform == "tdesktop") {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(`Город: ${data.city}, Страна: ${data.countryName}`);
          return {
            country: data.countryName,
            city: data.city,
          };
        });
    });
  } else {
    window.Telegram.WebApp.LocationManager.init(() => {
      window.Telegram.WebApp.LocationManager.getLocation(
        (data: null | ILocationData) => {
          alert(data.latitude);
          const lat = data.latitude;
          const lon = data.longitude;
          alert(lat);
          alert(lon);
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(`Город: ${data.city}, Страна: ${data.countryName}`);
              return {
                country: data.countryName,
                city: data.city,
              };
            });
        }
      );
    });
  }

  return {
    country: "",
    city: "",
  };
};
