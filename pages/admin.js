import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

export default function Home() {


  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);

  const [activeTable, setActiveTable] = useState('');

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
        sendQuery('select BranchId ,EmployeeId, Name, ContactNum, Salary from branch, employee where BranchId = EmployeeBranchId and BranchId = "B029278";', 'table1')    }
    }
  

  function handleClickTable2() {
    if (activeTable === 'table2') {
        setTable1([]);
        setTable2([]);
        setTable3([])
        setActiveTable('');
    } else {
        sendQuery('select Branch_Id, Manager_Id, Name, ContactNum, Salary from manager, employee where Manager_Id = EmployeeId;', 'table2')    }
    }
    function handleClickTable3() {
        if (activeTable === 'table3') {
          setTable1([]);
          setTable2([]);
          setTable3([])
          setActiveTable('');
        } else {
            sendQuery('select  VehicleBranchId, VehicleId, Brand, Model, DriverId from vehicle where VehicleBranchId = "B290969";', 'table3')    }
    }
  

  return (
    <div>

        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable1}>{activeTable === 'table1' ? 'Back' : 'Branch Employee List'}</button>
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable2}>{activeTable === 'table2'  ? 'Back' : 'Branch Manager List'}</button>
        <button className='bg-emerald-500 p-2 rounded-md' onClick={handleClickTable3}>{activeTable === 'table3'  ? 'Back' : 'Branch Vehicle List'}</button>

            {activeTable === 'table1'  && (
            <table>
            <thead>
                <tr>
                <th>Branch Id</th>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Phone No.</th>
                <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                {table1.map((item) => (
                <tr key={`${item.id}`}>
                    <td>{item.BranchId}</td>
                    <td>{item.EmployeeId}</td>
                    <td>{item.Name}</td>
                    <td>{item.ContactNum}</td>
                    <td>{item.Salary}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        {activeTable === 'table2'&& (
        <table>
          <thead>
            <tr>
              <th>Branch Id</th>
              <th>Manager Id</th>
              <th>Manager Name</th>
              <th>Phone No.</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {table2.map((item) => (
              <tr key={`${item.id}`}>
                <td>{item.Branch_Id}</td>
                <td>{item.Manager_Id}</td>
                <td>{item.Name}</td>
                <td>{item.ContactNum}</td>
                <td>{item.Salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        {activeTable === 'table3'&& (
        <table>
          <thead>
            <tr>
              <th>Branch Id</th>
              <th>Vehicle Id</th>
              <th>Brand Name</th>
              <th>Model</th>
              <th>Driver Id</th>
            </tr>
          </thead>
          <tbody>
            {table3.map((item) => (
              <tr key={`${item.id}`}>
                <td>{item.VehicleBranchId}</td>
                <td>{item.VehicleId}</td>
                <td>{item.Brand}</td>
                <td>{item.Model}</td>
                <td>{item.DriverId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );

}