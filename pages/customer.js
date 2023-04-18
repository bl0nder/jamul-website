import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from "next/link"
export default function Home() {


  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);
  const [activeTable, setActiveTable] = useState('');
  const [cartItems, setCartItems] = useState([]);

  async function sendQuery(sqlQuery, table) {
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


    if (table === 'table1') {
      setTable1(res.got);
    } else if (table === 'table2') {
        setTable2(res.got);
    }else if (table === 'table3') {
      setTable3(res.got);
    }

    setActiveTable(table);
    
  }
  function handleClickTable1() {
    if (activeTable === 'table1') {
      setTable1([]);
      setTable2([]);
      setTable3([])
      setActiveTable('');
    } else {
        sendQuery('select Name, ProductQuantity, Unit_price from add_to_cart, cart_items, product where add_to_cart.CustomerId = cart_items.customerId and cart_items.ProductId = Id and  add_to_cart.CustomerId = "C009410";', 'table1')    }
    }
  

    function handleClickTable2() {
        // 1. First, clear the cart for customer C00095
        sendQuery('delete from add_to_cart where CustomerId = "C009410";', 'table2');
        sendQuery('select * from cart_items where CustomerId = "C009410";', 'table2');
        console.log("table2:", table2);
        const totalCost = table2.reduce((acc, item) => acc + item.ProductQuantity * item.Unit_price, 0);
      }
      
  
    function handleClickTable3() {
        if (activeTable === 'table3') {
          setTable1([]);
          setTable2([]);
          setTable3([])
          setActiveTable('');
        } else {
            sendQuery('select customer_order_history.OrderId as o, Date, ProductName, Unit_price, ProductQuantity, Unit_price*ProductQuantity as Amount from customer_order_history, order_product_list, orders, product where customer_order_history.OrderId = orders.OrderId and order_product_list.OrderId = customer_order_history.OrderId and order_product_list.ProductId = Id and CustomerId = "C009410" order by date;', 'table3')    }
    }
  

  return (
    <div>
    <button className='bg-emerald-500 p-2 rounded-md'> Select Branch</button>

      { <Link href="/catalog" passHref>
        <button 
        className='bg-emerald-500 p-2 rounded-md'
      //   onClick={(e) => {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     handleModalOpenerClick(field);
      //  }}
        >Branch Catalog
        </button>
      </Link> }
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable1}>{activeTable === 'table1' ? 'Back' : 'View Cart'}</button>
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable2}>{activeTable === 'table2'  ? 'Back' : 'Place Order'}</button>
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable3}>{activeTable === 'table3'  ? 'Back' : 'View Order History'}</button>

            {activeTable === 'table1'  && (
            <table>
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {table1.map((item) => (
                <tr key={`${item.id}`}>
                    <td>{item.Name}</td>
                    <td>{item.Unit_price}</td>
                    <td>{item.ProductQuantity}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}

        {activeTable === 'table3'&& (
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {table3.map((item) => (
              <tr key={`${item.id}`}>
                <td>{item.o}</td>
                <td>{item.Date}</td>
                <td>{item.ProductName}</td>
                <td>{item.Unit_price}</td>
                <td>{item.ProductQuantity}</td>
                <td>{item.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );

}