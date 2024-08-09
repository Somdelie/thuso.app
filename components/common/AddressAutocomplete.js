"use client";
import { useEffect, useRef } from "react";
export default function AddressAutocomplete({
  onPlaceSelected,
  bounds,
  ...props
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API library must be loaded.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        bounds: bounds || undefined, // Use the bounds if provided
        componentRestrictions: { country: "za" }, // Uncomment to restrict to a specific country
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [onPlaceSelected, bounds]);

  return <input ref={inputRef} {...props} />;
}
