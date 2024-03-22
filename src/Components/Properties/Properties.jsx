import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import PropertyImage1 from "../../img/property-1.jpg";
import PropertyImage2 from "../../img/property-2.jpg";
import PropertyImage3 from "../../img/property-3.jpg";
import Apartment from "./cards/apartment";
import Outlets from "./cards/outlet";
import Office from "./cards/offices";

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

  const STATIC_TOKEN_PRICE = 20; // Assuming one token is equal to $20

  async function buyTokens(propertyId) {
    try {
      if (!connected) {
        throw new Error("Please install MetaMask or use a dapp browser.");
      }

      if (tokenAmount <= 0) {
        throw new Error("Please enter a valid token amount.");
      }

      if (!tokenPriceEther) {
        throw new Error("Token price in Ether is not available.");
      }

      // Calculate the amount in Ether
      const amountInEther = tokenAmount * STATIC_TOKEN_PRICE / STATIC_ETHER_PRICE;

      // Convert the amount to Wei
      const amountInWei = web3.utils.toWei(amountInEther.toString(), 'ether');
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const tokenSaleContract = new web3.eth.Contract(realEstateAbi, '0xF5EF9b554f6DF5aF8d1218913425FaF4dFDc31a8');

      // Pass the amount in Wei as an argument when calling buyTokens
      const transaction = await tokenSaleContract.methods.buyTokens(amountInWei).send({ from: account, value: amountInWei });
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Error buying tokens:", error);
    }
  }

  const handleTokenAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    console.log("Token Amount:", amount);
    setTokenAmount(amount);
  };

  return (
    <div className="container-fluid bg-white">
      {/* <div className="container mt-5 bg-white">
      
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {properties.map(property => (
            <div key={property.id} className="col mb-4 wow fadeInUp" data-wow-delay="0.5s">
              <div className="card">
                <img src={property.image} className="card-img-top" alt={property.name} />
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <p className="card-text">Price: ${property.price}</p>
                  <p className="card-text">Description: {property.description}</p>
                  <p className="card-text">Return per Token (Per Year): ${property.returnPerTokenPerYear}</p>
                  <p className="card-text">Rental Amount: ${property.rentalAmount} per month</p>
                  <div className="gap-3 d-flex">

                    <input
                      type="number"
                      className="form-control"
                      value={tokenAmount}
                      onChange={handleTokenAmountChange}
                    />
                    <button className="btn btn-secondary" onClick={() => buyTokens(property.id)}>Buy Tokens</button>
                  </div>

                  
                  <Link to={`/properties/${property.id}`} className="btn btn-secondary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <Apartment />
      <Office />
      <Outlets />
    </div>

  );
}

export default PropertyPage;
