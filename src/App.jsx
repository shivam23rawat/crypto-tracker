import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";

import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error)=>{
        alert('An error has occurred in fetching the api')
      }) 
  },[]);

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(
    coin=>coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">
          Search a currency
        </h1>
        <form>
          <input type="text" list="data1" placeholder="Search" className="coin-input" onChange={handleChange} onFocus={(e)=>e.target.value=''}/>
          <datalist id="data1">
            {
              coins.map(coin=>
                {
                  return(
                  <option>{coin.name}</option>
                  )
                })
            }
          </datalist>

        </form>
      </div>
      {filteredCoins.map(coin=>{
        return (
          <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
        )
        })}
    </div>
  );
}

export default App;
