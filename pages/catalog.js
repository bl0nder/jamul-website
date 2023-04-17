import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

export default function Home() {
  const [recv, setRecv] = useState(false);
  const [dbInfo, setDbInfo] = useState([]);

  async function sendQuery(sqlQuery) {
    const apiEndpoint = "/api/query";
    
    const query = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify ({
        q:sqlQuery,
      }),
    };
  
    const response = await fetch(apiEndpoint, query);
    const res = await response.json();
    setRecv(true);
    setDbInfo(res.got);
  }

  useEffect(() => {
    sendQuery('select BranchId, ProductId , Name, Unit_price, Quantity, Product_desc from branchcatalog, product where ProductId = Id and BranchId = "B029278";');
  }, []);

  return (
    <div>
      <h1>Branch Catalog</h1>
      {recv && (
        <table>
          <thead>
            <tr>
              <th>Branch Id</th>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Unit price</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dbInfo.map((item) => (
              <tr key={`${item.id}`}>
                <td>{item.BranchId}</td>
                <td>{item.ProductId}</td>
                <td>{item.Name}</td>
                <td>{item.Unit_price}</td>
                <td>{item.Quantity}</td>
                <td>{item.Product_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
