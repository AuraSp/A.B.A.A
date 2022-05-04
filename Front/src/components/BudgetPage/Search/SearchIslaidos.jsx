import React, { useEffect, useState } from "react";

const SearchIslaidos = (props) => {


    Data.map((product) =>{
        console.log(product.name)
        console.log(props.searchTerm)
    })

  function clickedProduct(product) {
    props.setProduct(product);
  }

  return (
    <div>
      <h2>Searching For: {props.searchTerm}</h2>
      <div>
        {Data.map(
          (product) =>
            product.name
              .toLowerCase()
              .includes(props.searchTerm.toLowerCase()) && (
              <a
                href="#"
                onClick={(e) => {
                  clickedProduct(
                    product
                  );
                }}
              >
                {product.name}, Tags: {product.tags[0]} {product.tags[1]}{" "}
                {product.tags[2]} {product.tags[3]}, Price: {product.price}$
              </a>
            )
        )}
      </div>
    </div>
  );
};



export default SearchIslaidos;