import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./styles/Home.css";

const Home = () => {
  const uri = "https://zap4allserver.herokuapp.com/products";
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    await axios
      .get(uri)
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home">
      <div className="cards">
        {rows.map((row) => (
          <Card key={row._id} data={row} />
        ))}
      </div>
    </div>
  );
};

export default Home;
