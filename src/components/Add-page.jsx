import React from "react";
import AddProductHook from "../Hook/AddProduct-Hook";

import Products from "./Products";


export default function Addpage() {

const [userName,logOut,status,handleUpdat,handleSubmit,apierror,handleInputChange,product,validerror,loading,searchProduct,products,deleteProd,updatProd,userId] = AddProductHook()

  return (
    <div className="container  text-white p-5">
      <div className="d-flex mb-2 justify-content-between">
        <h2 className=" border rounded px-2  d-inline ">Welcome {userName}</h2>
      <button onClick={logOut}  className="btn text-black   btn-danger ">Log Out <i className="fa-solid  ms-2 fa-door-open"></i></button>
         
         </div>
     
     <form onSubmit={status === 'add product'?handleSubmit:handleUpdat}>
      {
        apierror?apierror.map((item,index) => <div key={index} className='alert alert-danger'>{item.message === 'pName must be unique'?'this product already exists' :item.message}{}</div>) :''
      }
     <label htmlFor="">productName :</label>
      <input type="text" onChange={handleInputChange} value={product.pName} name="pName" className="form-control my-3" id="productName" />
    {
       

        validerror.length>0?validerror.map((item,index) => item.context.label === 'pName'? <div key={index} className="alert alert-danger">{item.message}</div>:'') :'' 
    
    }
      <label htmlFor="">productDesc :</label>
      <input type="text" onChange={handleInputChange} value={product.pDescription} name="pDescription" className="form-control my-3" id="productDesc" />
      {
       

       validerror.length>0?validerror.map((item,index) => item.context.label === 'pDescription'? <div key={index} className="alert alert-danger">{item.message}</div>:'') :'' 
   
   }
      <label htmlFor="">productPrice :</label>
      <input type="number" onChange={handleInputChange} value={product.price} name="price" className="form-control my-3" id="productPrice" />
      {
       

       validerror.length>0?validerror.map((item,index) => item.context.label === 'price'? <div key={index} className="alert alert-danger">{item.message}</div>:'') :'' 
   
   }
    
      <button id="addproduct" className="btn btn-info">
        {
          loading === true?<div className='fas fa-spinner fa-spin'></div> : status
        }
        
      </button>
     </form>

      <div className="row px-2">
        <input
          onChange={searchProduct}
          placeholder="search....."
          id="serach"
          className=" form-control my-4 "
          type="text"
        />
      </div>

      <table className="table mt-4 text-center text-white">
        <thead className=" text-center ">
          <tr>
            <th>productName</th>
            <th>productPrice</th>

            <th>productDesc</th>
            <th>Delete </th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {products
            ? products.map((item, index) => (
                <Products key={index} deleteProd={deleteProd} updatProd={updatProd} userId={userId} products={item} />
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
