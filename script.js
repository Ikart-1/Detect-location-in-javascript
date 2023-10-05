const button = document.querySelector("button");

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (position && position.coords && position.coords.latitude && position.coords.longitude) {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            console.table(data.address);
          })
          .catch((error) => {
            console.error("Error fetching data from API:", error);
          });
      } else {
        console.error("Invalid geolocation data");
      }
    },
    (error) => {
      console.error("Error getting geolocation:", error);
    }
  );
});
