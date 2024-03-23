import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import PropertyImage1 from "../../img/property-1.jpg";
import PropertyImage2 from "../../img/property-2.jpg";
import PropertyImage3 from "../../img/property-3.jpg";
import Apartment from "./cards/apartment";
import Outlets from "./cards/outlet";
import Office from "./cards/offices";
// import Practice from "./cards/practice";
// import Practice2 from "./cards/Practice2";

// import Practice from "./cards/practice";
// import Real from "./cards/real";

import realEstateAbi from '../../contracts/realEstateAbi.json';


function PropertyPage() {
  const [web3, setWeb3] = useState(null);
  const [properties, setProperties] = useState([]);
  const [connected, setConnected] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokenPriceEther, setTokenPriceEther] = useState(null); // State to hold token price in Ether
  const STATIC_ETHER_PRICE = 3500; // Static price for 1 Ether

  useEffect(() => {
    async function initWeb3() {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          setConnected(true);
        } else {
          console.log("Please install MetaMask or use a dapp browser.");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    }
    initWeb3();
  }, []);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // Fetch properties from an API or hardcoded data
        // For demonstration, let's assume we have hardcoded property data
        const propertiesData = [
          {
            id: 1,
            name: "Property 1",
            price: 100000,
            image: PropertyImage1,
            returnPerTokenPerYear: 500,
            rentalAmount: 2000
          },
          {
            id: 2,
            name: "Property 2",
            price: 150000,
            image: PropertyImage2,
            returnPerTokenPerYear: 600,
            rentalAmount: 2500
          },
          {
            id: 3,
            name: "Property 3",
            price: 200000,
            image: PropertyImage3,
            returnPerTokenPerYear: 800,
            rentalAmount: 3000
          }
          // Add more properties as needed
        ];
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);





  return (
    <div className="container-fluid bg-white">
      <Apartment />
      <Office />
      <Outlets />

      {/* <Practice /> */}
      {/* <Practice2 /> */}
      {/* <Practice /> */}


    </div>

  );
}

export default PropertyPage;
