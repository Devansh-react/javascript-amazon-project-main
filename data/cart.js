export let cart= JSON.parse(localStorage.getItem('cart'));
 if(!cart){
    cart=[{
        productID:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2
    },
    {
        productID:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2
    }];
 }



export function savelocalstorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
 export function removecartitem(productID){
    let newcart=[];

    cart.forEach((item) =>{
        if(productID !== item.productID){
            newcart.push(item);
        }
    })
     cart = newcart;
     savelocalstorage();

}