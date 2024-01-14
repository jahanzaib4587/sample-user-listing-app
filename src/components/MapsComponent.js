// MapComponent.js
import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({ address, google }) => {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setLocation({ lat: location.lat(), lng: location.lng() });
        setShowMap(true); // Automatically show the map when the location is obtained
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  }, [address, google]);

  return (
    <div>
      {showMap && (
        <Map
          google={google}
          zoom={14}
          style={{ width: "500px", height: "250px" }}
          initialCenter={location}
        >
          <Marker position={location} />
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDk2IpHzurzSnWwYZK9cjKXj28xkzSRAto", // Replace with your actual API key
})(MapContainer);
