function AllPizzas() {
  this.pizzas = [],
  this.currentId = 0
  this.price= 0;
}

AllPizzas.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
  this.price += pizza.price;
  return this.price;
}

AllPizzas.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AllPizzas.prototype.findPizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

AllPizzas.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.price-=this.pizzas[i].price;
        delete this.pizzas[i];
      }
    }
  };
}

// Business Logic for Contacts ---------
function Pizza(myPizza, mySize, myTopping) {
  this.pizzaType = myPizza,
  this.size = mySize,
  this.topping = myTopping,
  this.price =0
}
Pizza.prototype.pizzaPrice = function() {
  var pizzas = ['cheese','pepperoni','meatlover','supreme'];
  var sizes = ['small','medium','large'];
  var toppings = ['tnothing','tcheese','tolive','tmushroom','ttomato'];
  var prices= [7,8,10,9,10,12,10,12,15,10,12,15];
  var tprices= [0,1,2,2,1];
  for (i=0;i<pizzas.length;i++){
    for (j=0;j<sizes.length;j++){
      if (this.pizzaType===pizzas[i] && this.size===sizes[j]) {
        this.price= prices[i*3+j];
      };
    };
  };
  toppings.forEach(function(topping,tindex){
    if (this.topping ===topping) {
      this.price +=tprices[tindex];
    };
  });
  return this.price;
};


// User Interface Logic ---------
var allPizzas = new AllPizzas();

function showCurrentPizza(allPizzas) {
  var pizzaList = $("ul#order");
  var orderItem = "";
  allPizzas.pizzas.forEach(function(pizza) {
    orderItem += "<li id=" + pizza.id + ">" + pizza.pizzaType + "</li>";
  });
  pizzaList.html(orderItem);
};

function showPizza(pizzaId) {
  var pizza = allPizzas.findPizza(pizzaId);
  $("#show-pizza").show();
  $(".pizzaType").html(pizza.pizzaType);
  $(".size").html(pizza.size);
  $(".topping").html(pizza.topping);
  $(".price").html(pizza.price);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + pizza.id + ">Delete</button>");
}


function addListeners() {
  $("ul#order").on("click", "li", function() {
    showPizza(this.id);
    console.log(this);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    allPizzas.deletePizza(this.id);
    $(".pizza-price").text("The total price :"+allPizzas.price);
    $("#show-pizza").hide();
    showCurrentPizza(allPizzas);
  });
};


$(document).ready(function() {
  addListeners();
  $("form#new-pizza").submit(function(event) {
    event.preventDefault();
    var myPizza= $("#new-pizzaType").val();
    var mySize = $("#new-size").val();
    var myTopping = $("#new-topping").val();
    var newPizza = new Pizza(myPizza, mySize, myTopping);
    newPizza.pizzaPrice();
    allPizzas.addPizza(newPizza);
    $(".pizza-price").text("The total price :"+allPizzas.price);
    showCurrentPizza(allPizzas);
    console.log(newPizza);
    console.log(allPizzas);

  })
})
