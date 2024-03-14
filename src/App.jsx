import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from './Components/Hero/Hero';

import Properties from "./Components/Properties/Properties";
import My_Properties from "./Components/My_Properties/My_Properties";
import Transactions from "./Components/Transactions/Transactions";
import Footer from "./Components/Footer/Footer";
import PropertyDetails from "./Components/propertydetails/propertydetails";
import PropertyPage from "./Components/propertypage/propertypage";

import { useState, useEffect } from "react";

function App() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {

    const fetchedProperties = [

      { id: 1, name: "Property 1", price: 100000, description: "Description 1" },
      { id: 2, name: "Property 2", price: 150000, description: "Description 2" },
      { id: 3, name: "Property 3", price: 200000, description: "Description 3" }
    ];
    setProperties(fetchedProperties);
  }, []);

  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const saveState = (state) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar saveState={saveState} />
        <Routes>
          <Route path="/" element={<Hero state={state} />} />


          <Route path="transactions">
            <Route path=":userId" element={<Transactions state={state} />} />
          </Route>
          <Route path="/properties" element={<Properties state={state} />} />
          <Route path="/my_properties" element={<My_Properties state={state} />} />

          <Route path="/properties/:id" element={<PropertyDetails properties={properties} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;