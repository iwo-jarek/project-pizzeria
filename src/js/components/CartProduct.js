import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct{
  constructor(menuProduct, element){
    const thisCartProduct = this;
    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.params = menuProduct.params;
    thisCartProduct.getElements(element);   
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
    // console.log(cartProduct);
  }

  getElements(element){
    const thisCartProduct = this;
    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = element.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = element.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = element.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = element.querySelector(select.cartProduct.remove);
    //console.log('this Product', thisCartProduct);
  } 
     
  getData(){
    const thisCartProduct = this;
    const newObject = {
      id: thisCartProduct.id,
      amount: thisCartProduct.amount,
      price: thisCartProduct.price,
      priceSingle: thisCartProduct.priceSingle,
      name: thisCartProduct.name,
      params: thisCartProduct.params
    };
    return newObject;
  }

  initAmountWidget(){
    const thisCartProduct = this;
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function(){
      thisCartProduct.amount = thisCartProduct.amountWidget.value;

      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amountWidget.value;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }
    
  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }
    
  initActions(){
    const  thisCart = this;
    thisCart.dom.edit.addEventListener('click', function(event){
      event.preventDefault();
    });
    thisCart.dom.remove.addEventListener('click', function(event){
      event.preventDefault();
      thisCart.remove();
    });
  }  
}

export default CartProduct;