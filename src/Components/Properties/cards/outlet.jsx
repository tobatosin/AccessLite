

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import PropertyImage1 from "../../../img/property-1.jpg";
import PropertyImage2 from "../../../img/property-2.jpg";
import PropertyImage3 from "../../../img/property-3.jpg";
import realEstateAbi from '../../../contracts/realEstateAbi.json';

function Outlets() {
    const [web3, setWeb3] = useState(null);
    const [properties, setProperties] = useState([]);
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        async function initWeb3() {
            try {
                if (window.ethereum) {
                    const web3 = new Web3(window.ethereum);
                    setWeb3(web3);
                    setConnected(false);
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


    const buyTokens = async (propertyIndex) => {
        // Connect to the Ethereum blockchain
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const web3 = window.web3;

            // Instantiate your smart contract
            const contractAddress = "0x5299edAe22d7D0E8590724e18424545D320468A2";
            const contract = new web3.eth.Contract(realEstateAbi, contractAddress);

            // Call the buyTokens function
            try {
                const accounts = await web3.eth.getAccounts();
                await contract.methods.buyTokens().send({ value: "10000000000", from: accounts[0] });
                alert("Tokens bought successfully for property " + propertyIndex);
            } catch (error) {
                console.error("Error buying tokens:", error);
                alert("Failed to buy tokens for property " + propertyIndex);
            }
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    };


    return (
        <div className="container-fluid bg-white" >
            <div className="container mt-5 bg-white">


                <div className="text-dark fs-3 fw-bold mb-3">Offices</div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {properties.map(property => (
                        <div key={property.id} className="col mb-4 wow fadeInUp " data-wow-delay="0.5s">
                            <div className="card">
                                <img src={property.image} className="card-img-top" alt={property.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{property.name}</h5>
                                    <p className="card-text">Price: ${property.price}</p>
                                    <p className="card-text">Description: {property.description}</p>
                                    <p className="card-text">Return per Token (Per Year): ${property.returnPerTokenPerYear}</p>
                                    <p className="card-text">Rental Amount: ${property.rentalAmount} per month</p>
                                    <div className="gap-3 d-flex">
                                        <Link to={`/properties/${property.id}`} className="btn btn-secondary ">View Details</Link>
                                        <button className="btn btn-secondary" onClick={() => buyTokens(property.id)}>Buy Tokens</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>


            </div>
        </div>

    );
}








export default Outlets;

