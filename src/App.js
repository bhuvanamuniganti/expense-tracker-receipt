
import './App.css';
import { useState } from 'react';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


function App() {
  
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [itemsList, setItemsList] = useState([])
  const [category, setCategory] = useState("Food")



  
const createList = () => {
  const newItem = {
    price,
    description,
    date,
    category 
  };
  if (price !== "" && description !== "" && date !== ""){
  setItemsList([...itemsList, newItem]);
  }
  setPrice("");
  setDescription("");
  setDate("");
  setCategory("Food");
};


const handleDownload = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Expenses Report", 14, 15);

  const headers = [["Date", "Description", "Category", "Price"]];
  const rows = itemsList.map((exp) => [
    exp.date,
    exp.description,
    exp.category,
    exp.price,
  ]);

  const total = itemsList.reduce((sum, exp) => sum + Number(exp.price), 0);
  rows.push(["", "", "Total", total.toFixed(2)]);

  
  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 25,
    theme: "striped",
    styles: { halign: "left" },
    headStyles: { fillColor: [22, 160, 133] },
    columnStyles: {
      3: { halign: "right" },
    },
  });

  doc.save("expenses_report.pdf");
};


const handleDelete = (indexToRemove) => {
  const updatedList = itemsList.filter((_, index) => index !== indexToRemove);
  setItemsList(updatedList);
};
const total = itemsList.reduce((sum, item) => sum + Number(item.price), 0);


  
  return (
    <div className="App">
      <header className="App-header">
          <div className = "bg-container">
               <div className='headingBgContainer'>  
                  <div>
                      <h1 className = "heading"> Expense Tracker </h1>    
                      <p className='headPara'>Track and download your expenses easily!</p>
                   </div>
                   <div className='expences-container'>
                      <h2 className='totalLable'>Total Expenses</h2>
                      <h2 className = "price">{total}</h2>
                   </div>
                </div>
  
              <div className='addExpencesContainer'>         
                    <h1 className='addExpenceHeading'>Add Expense</h1>            
                    <div className = "addItemContainer">
                          <div className='priceContainer'>
                               <label>Rs.</label>
                                <input placeholder='Enter Price' value = {price} 
                                onChange= {e => setPrice(e.target.value)}/>
                           </div>
                            <div className = "descriptionContainer">
                                  <input placeholder="Enter Description Ex: Lunch" value={description}
  onChange={e => setDescription(e.target.value)}/>
                                 <label> <select value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="inputBox">
                                         <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Rent">Rent</option>
  <option value="Health">Health</option>
  <option value="Shopping">Shopping</option>
                                       </select>
                                       </label>
                              </div>
                              <div className='dateContainer'>
                              <input placeholder='Enter Date Ex: 24/07/2025' value={date}
  onChange={e => setDate(e.target.value)}/>
                              </div>
                              

                    </div>
                    <div >
                    <button className = "buttonContainer" onClick = {()=> createList()}>Add Expense</button>
                    </div>
              </div>
       <div className="expencesListContainer">
         <div className = "download-container">
                 <h1 style={{ margin: 0 }}>Expense List</h1>
              
                           <button onClick={handleDownload} className="downloadLink">
                              📥 Download Expenses List
                           </button>
               
         </div>

  <table className="expenseTable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Category</th>
        <th>Price</th>
        <th>Action</th> {/* New column for delete */}
      </tr>
    </thead>
    <tbody>
      {itemsList.map((item, index) => (
  <tr key={index}>
    <td>{item.date}</td>
    <td>{item.description}</td>
    <td>{item.category}</td>
    <td>Rs. {item.price}</td>
    <td className="deleteCell">
      <button className="deleteBtn" onClick={() => handleDelete(index)}>🗑️</button>
    </td>
  </tr>
))}

      {/* Total row */}
      <tr>
        <td colSpan="3" className="totalLabel">Total</td>
        <td>{total}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>


          </div>
           
        </header>
      
    </div>
  );
}

export default App;
