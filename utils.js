const getTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const getLocation = (lati, long) => {
  const success = (position) => {
    lati.value = position.coords.latitude.toFixed(7);
    long.value = position.coords.longitude.toFixed(7);
    long.dispatchEvent(new Event("change", { bubbles: true }));
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, () => {});
  }
};
