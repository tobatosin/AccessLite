import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3'; // Import Web3 library
import realEstateAbi from '../../../contracts/realEstateAbi.json';

function Real() {
    const [properties, setProperties] = useState([]);

    const ipfsUrls = [
        'ipfs://bafybeifwptb23ec322k2q3k3ysz5vxwvhuo5xyui73aexqtamocvtdnrde',
        'ipfs://bafkreie4wm24icgvvkcodvlgu7aybhykhy4urfrirrdmiqu3y5ujur3lxa',
        'ipfs://bafkreieh35pe6qzmrznv44dfsh7esfsxukuzsb2kvj7jm25fbt4bdzgfvu',
        'ipfs://bafkreihllip47mzkl56o2zkoce64efbsikbx4w3tu376zfw427dfqhctea'
    ];

    const me = ipfsUrls[0].split('ipfs://')[1];

    // Now 'me' will dynamically take the value from the first URL in the ipfsUrls array


    // Construct the IPFS URL
    ;
    const ipfsHashes = [
        'bafkreidskcjwtnof5v6wynbygkmfsnt4a42qtch4evgpuctleglca3puvy',
        'bafkreidskcjwtnof5v6wynbygkmfsnt4a42qtch4evgpuctleglca3puvy',
        'bafkreiajphnp4ow37xha7jssvykzecgwekktyz5v7lp65db65vtx2tkepy',
        'bafkreidskcjwtnof5v6wynbygkmfsnt4a42qtch4evgpuctleglca3puvy',
        'bafkreidskcjwtnof5v6wynbygkmfsnt4a42qtch4evgpuctleglca3puvy',
        'bafkreidskcjwtnof5v6wynbygkmfsnt4a42qtch4evgpuctleglca3puvy',

        // Add other IPFS hashes here
    ];

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const fetchedProperties = await Promise.all(ipfsHashes.map(async (hash) => {
                    const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
                    return response.data;
                }));
                setProperties(fetchedProperties);
            } catch (error) {
                console.error('Error fetching property details:', error);
                // Set an empty array if there's an error to prevent rendering issues
                setProperties([]);
            }
        };
        fetchPropertyDetails();
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

    const renderProperties = () => {
        return properties.map((property, index) => (
            <div className="col mb-4" key={index}>
                <div className="card h-100 shadow">
                    <img src={`https://ipfs.io/ipfs/${me}`} className="card-img-top" alt={property.name} />
                    <div className="card-body">
                        <h5 className="card-title">{property.name}</h5>
                        <p className="card-text"><strong>Address:</strong> {property.address}</p>
                        <h4>{property.attributes[0].value} ETH</h4>
                        <p>
                            <strong>{property.attributes[2].value}</strong> bds |
                            <strong>{property.attributes[3].value}</strong> ba |
                            <strong>{property.attributes[4].value}</strong> sqft
                        </p>
                        <button className="btn btn-secondary mt-3" onClick={() => buyTokens(index)}>Buy Tokens</button>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container-fluid bg-white">
            <div className="container mt-5 bg-white">
                <div className="text-dark fs-3 fw-bold mb-3">Offices</div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {properties.length > 0 ? renderProperties() : <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}

export default Real;
