import React, { useState } from 'react'
import Link from "next/link"
import styles from '../styles/Home.module.css'

export default function Home() {

  const [recv, setRecv] = useState(false);
  const [dbInfo, setDbInfo] = useState({});

  async function sendQuery(sqlQuery) {
    const apiEndpoint = "http://localhost:3000/api/query";
    
    const query = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify ({
        q:sqlQuery,
      }),
    };
  
    const response = await fetch (apiEndpoint, query);
    const res = await response.json();
    // console.log(res.status());
    setRecv(true);
    setDbInfo([res.got]);
  }

  return (
    <div className='flex grid items-center justify-center h-full'>
      {/* <Link href="/login" passHref>
        <button 
        className='bg-emerald-500 p-2 rounded-md'
      //   onClick={(e) => {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     handleModalOpenerClick(field);
      //  }}
        >HELLLOOOOOO
        </button>
      </Link> */}

      <select className=''>
        <option> Select an option</option>
        <option value="1">XYZ</option>
        <option value="2">ABC</option>
        <option value="3">123</option>
        <option value="4">456</option>
      </select>
    </div>
  )
}
