import { useState } from "react";
import axios from "axios";

export default function Location() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(data);

        await axios.post("http://localhost:5000/api/location", data);
      },
      (err) => {
        alert(err.message);
      }
    );
  };

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>

      {location && (
        <p>
          {location.latitude}, {location.longitude}
        </p>
      )}
    </div>
  );
}