import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Login() {

  const [recv, setRecv] = useState(false);
  const [dbInfo, setDbInfo] = useState({});

  //2 embedded queries
  const query1 = "SELECT * FROM admin WHERE name LIKE \"M%\"";
  const query2 = "SELECT VehicleId,Model \nFROM vehicle \nWHERE Brand=\"aut\"";
  
  

  return (
    <h1> HELLO TESTING </h1>
)
}
