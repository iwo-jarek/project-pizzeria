import {settings, select} from '../settings.js';

class AmountWidget{
  constructor(element){
    const thisWidget = this;
    const initialValue = settings.amountWidget.defaultValue;

    thisWidget.getElements(element);
    // thisWidget.setValue(settings.amountWidget.defaultValue);
    thisWidget.initActions();

    if(thisWidget.input.value){
      thisWidget.setValue(thisWidget.input.value);
    } else {
      thisWidget.setValue(initialValue);
    }
  }

  getElements(element){
    const thisWidget = this;
    thisWidget.element = element;
    thisWidget.input = element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = element.querySelector(select.widgets.amount.linkIncrease);
  }

  setValue(value){
    const thisWidget = this;
    const newValue = parseInt(value);
    if(thisWidget.value !== newValue && !isNaN(newValue)) {
      if(newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax){
        thisWidget.value = newValue;
        thisWidget.announce();
      }
    }
    thisWidget.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value-1);
    });
    thisWidget.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value+1);
    });
  }

  announce(){
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;