"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import { Icon, LatLngExpression, latLng } from "leaflet";
import { MdRestaurant, MdDeliveryDining } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Extend the L.Icon.Default type to include _getIconUrl
declare module "leaflet" {
  namespace Icon {
    interface Default {
      _getIconUrl?: () => string;
    }
  }
  namespace Routing {
    function control(options: any): any;
  }
}

// Fix the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DeliveryMap = ({
  deliveries,
  restaurantPosition,
}: {
  deliveries: any[];
  restaurantPosition: LatLngExpression;
}) => {
  const [center, setCenter] = useState<LatLngExpression>([6.700071, -1.630783]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCenter([6.700071, -1.630783]); // Fallback to Kumasi coordinates
      }
    );
  }, []);

  const customIcon = new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(
      renderToStaticMarkup(<FaMapMarkerAlt size={20} color="red" />)
    )}`,
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const customIconRestaurant = new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(
      renderToStaticMarkup(<MdRestaurant size={20} color="blue" />)
    )}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  const customIconDeliverer = new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(
      renderToStaticMarkup(<MdDeliveryDining size={20} color="green" />)
    )}`,
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  const deliveryRoutes = useMemo(() => {
    return deliveries.map((delivery) => {
      const delivererLatLng = latLng(
        delivery.deliverer.position[0],
        delivery.deliverer.position[1]
      );
      const destinationLatLng = latLng(
        delivery.position[0],
        delivery.position[1]
      );
      const distance = delivererLatLng.distanceTo(destinationLatLng);
      return {
        ...delivery,
        distance,
        route: [delivererLatLng, destinationLatLng],
      };
    });
  }, [deliveries]);

  console.log(deliveryRoutes);

  function RoutingMachine({ delivery }: { delivery: any }) {
    const map = useMap();
    const routingControlRef = useRef<any>(null);

    useEffect(() => {
      if (!map) return;

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(
            delivery.deliverer.position[0],
            delivery.deliverer.position[1]
          ),
          L.latLng(delivery.position[0], delivery.position[1]),
        ],
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function () {
          return null;
        }, // This prevents marker creation
      }).addTo(map);

      // Hide the itinerary
      routingControlRef.current.hide();

      // Additional CSS to completely hide the itinerary
      const style = document.createElement("style");
      style.textContent = `
        .leaflet-control-container .leaflet-routing-container-hide {
          display: none;
        }
      `;
      document.head.append(style);

      return () => {
        if (map && routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }
        document.head.removeChild(style);
      };
    }, [map, delivery]);

    return null;
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={restaurantPosition} icon={customIconRestaurant}>
          <Popup>Restaurant Location</Popup>
        </Marker>

        {deliveryRoutes.map((delivery, index) => (
          <div key={index}>
            <Marker position={delivery.position} icon={customIcon}>
              <Popup>
                Order #{delivery.orderId} <br />
                Status: {delivery.status} <br />
                Distance: {(delivery.distance / 1000).toFixed(2)} km
              </Popup>
            </Marker>
            <Marker
              position={delivery.deliverer.position}
              icon={customIconDeliverer}
            >
              <Popup>Deliverer: {delivery.deliverer.name}</Popup>
            </Marker>
            <RoutingMachine delivery={delivery} />
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default DeliveryMap;
