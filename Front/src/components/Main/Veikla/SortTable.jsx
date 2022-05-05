import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../../api/lib/TransactionsAPI';
import './activitiesmain.css';


    
function SortTable(e, render) { 
  // e.prevendDefault()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
      getAllUsers().then((res) => {
          const userdata = res.data.data.transactions; //Fetch all existing data from database
          //setEditId(...userdata.map((data) => data._id)); //Take User Id
          //setId(...userdata.map((data) => data._id));
          //setIncomes(...userdata.map((data) => data.income)); //Take all User's incomes
          setExpenses(...userdata.map((data) => data.expense)); //Take all User's expenses
         // setLoading(false);
      });
  }, [render]);

    function searchDate() {
      var input_startDate, input_stopDate, table, tr, i;
    
      // get the values and convert to date
      input_startDate = new Date(document.getElementById("date-start").value);
      input_stopDate = new Date(document.getElementById("date-stop").value);
    
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
    
      for (i = 0; i < tr.length; i++) {
        // you need to get the text and convert to date
        let td_date = new Date(tr[i].getElementsByTagName("td")[0].textContent);
    
        // now you can compare dates correctly
        if (td_date) {
          if (td_date >= input_startDate && td_date <= input_stopDate) {
            // show the row by setting the display property
            tr[i].style.display = 'table-row;';
          } else {
            // hide the row by setting the display property
            tr[i].style.display = 'none';
          }
        }
    
      }
    }

  return (
  <div className='activitiestable border border-1 border-muted mx-auto my-4 p-5 shadow'>SortTable
  <br />
    <label className='text-start'>Pradžia</label>
      <input id="date-start"                      
        type='date'
          min='1990-01-01'
          max='2030-01-01'
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          lassName='border' ></input>

     <label className='text-start'>pabaiga</label>
      <input id="date-stop"                      
        type='date'
          defaultValue={today}
          min='1990-01-01'
          max='2030-01-01'
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          lassName='border' ></input>
             <div><button onClick={(e)=> searchDate(e)}>filter</button></div>
    </div>
      )}


export default SortTable