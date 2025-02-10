import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties")
      .then((res) => {
        console.log("API Response:", res.data); // Debugging output
        setProperties(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setProperties([]); // Prevent crashes on error
      });
  }, []);

  // Ensure filtering works safely
  const filteredProperties = (Array.isArray(properties) ? properties : []).filter((property) => 
    property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (location === "" || property?.location?.toLowerCase().includes(location.toLowerCase())) &&
    (minPrice === "" || property?.price >= parseFloat(minPrice)) &&
    (maxPrice === "" || property?.price <= parseFloat(maxPrice))
  );

  return (
    <div className="container">
      <h2>Properties</h2>

      {/* Search & Filters */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* Property List */}
      <div>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="card">
              <h3>{property.title}</h3>
              <p>{property.location} - ${property.price}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
