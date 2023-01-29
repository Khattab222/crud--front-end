import React from "react";

export default function Products({ products, deleteProd, userId, updatProd }) {
  return (
    <>
      <tr>
        <td>{products.pName}</td>
        <td>{products.price}</td>

        <td>{products.pDescription}</td>
        <td>
          {userId === products.UserId ? (
            <button
              onClick={() => deleteProd(products.id)}
              className="btn btn-danger"
            >
              Delete <i className="fa-solid fa-trash-can"></i>
            </button>
          ) : (
            <i className="fa-solid text-danger fa-user-lock"></i>
          )}
        </td>
        <td>
          {userId === products.UserId ? (
            <button
              onClick={() => updatProd(products)}
              className=" btn btn-info"
            >
              Update <i className="fa-solid fa-pencil"></i>
            </button>
          ) : (
            <i className="fa-solid text-info fa-user-lock"></i>
          )}
        </td>
      </tr>
    </>
  );
}
