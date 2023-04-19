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
        sendQuery('select Name, ProductQuantity, Unit_price from add_to_cart, cart_items, product where add_to_cart.CustomerId = cart_items.customerId and cart_items.ProductId = Id and  add_to_cart.CustomerId = "C002880";', 'table1') 
        // console.log('heee', table1);
      }
    
      }
  

    async function handleClickTable2() {
        if (activeTable === 'table2') {
            setTable1([]);
            setTable2([]);
            setTable3([])
            setActiveTable('');
          } 
        else {
            await sendQuery('Insert into orders (OrderId, BranchOrderId, BranchCustomerId, TotalCost, Date) select "OP3", "B035170",  CustomerId, TotalCost, NOW()  from add_to_cart where add_to_cart.CustomerId = "C002880";', 'table2');
            await sendQuery('Insert into order_product_list (OrderId, ProductId, ProductName,ProductQuantity) select "OP3",  ProductId, Name, ProductQuantity from cart_items, product where cart_items.CustomerId = "C002880" and cart_items.ProductId = Id;', 'table2');
            await sendQuery('update add_to_cart set TotalCost = 0 where CustomerId = "C002880";', 'table2');
            await sendQuery('delete from cart_items where CustomerId = "C002880";', 'table2');
            await sendQuery('insert into customer_order_history values( "C002880" ,"OP3");', 'table2');
            // console.log("hhh", table2.map((items)=>({item,Name}))) 
        } 
    }
      
 
    function handleClickTable3() {
        if (activeTable === 'table3') {
          setTable1([]);
          setTable2([]);
          setTable3([])
          setActiveTable('');
        } else {
            sendQuery('select customer_order_history.OrderId as o, Date, ProductName, Unit_price, ProductQuantity, Unit_price*ProductQuantity as Amount from customer_order_history, order_product_list, orders, product where customer_order_history.OrderId = orders.OrderId and order_product_list.OrderId = customer_order_history.OrderId and order_product_list.ProductId = Id and CustomerId = "C002880" order by date;', 'table3')
          }
    }
  
    async function handleClickTable4(){ 
      if (activeTable === 'table4') {setActiveTable('');} 
       else{ await sendQuery('Insert into cart_items Values ("C002880", "P801211", "B032723", 4053);', 'table4');}
    }
    async function handleClickTable5(){
      if (activeTable === 'table5') {setActiveTable('');}       
      else {await sendQuery('delete from cart_items where CustomerId = "C002880" and ProductId ="P801211";','table5');}
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
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable4}>{activeTable === 'table4'  ? 'Back' : 'Add to cart'}</button>
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable5}>{activeTable === 'table5'  ? 'Back' : 'Remove from cart'}</button>

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
            {table3.map((item2) => (
              <tr key={`${item2.id}`}>
                <td>{item2.o}</td>
                <td>{item2.Date}</td>
                <td>{item2.ProductName}</td>
                <td>{item2.Unit_price}</td>
                <td>{item2.ProductQuantity}</td>
                <td>{item2.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );

}