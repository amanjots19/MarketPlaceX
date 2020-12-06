const { json } = require('body-parser');
const fs= require('fs');
const path=require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports=class cart{
    static addProduct(id){
        // Fetch the previous cart
        fs.readFile(p,(err,fileContent)=>{
            let cart={product:[],totalPrice:0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
        //Analyze the cart=> Find existing product
        const existingProductIndex=cart.products.find(prod=> prod.id===id);
        const existingProduct=cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            updatedProduct={...existingProduct};
            updatedProduct.qty=updatedProduct.qty+1;
            cart.products={...cart.products};
            cart.products[existingProductIndex]=updatedProduct;


        }else{
            updatedProduct={id:id,qty:1};
            cart.products=[...cart.products,updatedProduct];
        }
        cart.totalPrice=cart.totalPrice+ +productPrice;
        fs.writeFile(p, JSON.stringify(cart),err=>{
            console.log(err);
        });

        });
    }
}