// A cunstractor to keep all pizzas.
function AllPizzas() {
  this.pizzas = [],
  this.currentId = 0,
  this.price= 0
}
//This prototype will add pizzas to AllPizza object.
AllPizzas.prototype.addPizza = function(pizza) {
  this.currentId++;
  pizza.id = this.currentId;
  this.pizzas.push(pizza);
  this.price += pizza.price;
  return this.price;
};
//this prototype will find pizzas.
AllPizzas.prototype.findPizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  }
  return false;
};
// This prototype wil delete pizzas by using it's id.
AllPizzas.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.price-=this.pizzas[i].price;
        delete this.pizzas[i];
      }
    }
  }
};
// This Constructor will create a pizza.
function Pizza(myPizza, mySize, myTopping) {
  this.pizzaType = myPizza,
  this.size = mySize,
  this.topping = myTopping,
  this.price =0
};
// this one calculates the price of order
Pizza.prototype.pizzaPrice = function() {
  var pizzas = ['cheese','pepperoni','meatlover','supreme'];
  var sizes = ['small','medium','large'];
  var prices= [7,8,10,9,10,12,10,12,15,10,12,15];
  for (var i=0; i<pizzas.length; i++){
    for (var j=0; j<sizes.length; j++){
      if (this.pizzaType===pizzas[i] && this.size===sizes[j]) {
        this.price= prices[i*3+j];
      }
    }
  }
  this.price+=this.topping.length;
  return this.price;
};
// create an object to keep all pizzas
var allPizzas = new AllPizzas();
//it will add some li tags to ul one to show the items in order
function showCurrentPizza(allPizzas) {
  $("#footer").show();
  var pizzaList = $("ul#order");
  var orderItem = "";
  allPizzas.pizzas.forEach(function(pizza) {
    orderItem += "<li id=" + pizza.id + ">" + pizza.pizzaType + "</li>";
  });
  pizzaList.html(orderItem);
};
// it will show the detail of each pizza
function showPizza(pizzaId) {
  var pizza = allPizzas.findPizza(pizzaId);
  $("#show-pizza").show();
  $(".pizzaType").html(pizza.pizzaType);
  $(".size").html(pizza.size);
  $(".topping").html(pizza.topping);
  $(".price").html(pizza.price);
  $("#buttons").empty();
  $("#buttons").append("<button class='deleteButton' id=" + pizza.id + ">Delete</button>");
}
//this one add some event handler to menu items
function addMenuListeners (){
  var items= ['cheese','pepperoni','meat','supreme'];
  var descriptions=["Cheese Pizza: Made with classic marinara sauce topped with mozzarella cheese",
  "Pepperoni Pizza: Complete with mozzarella cheese and pepperoni",
  "Meat Lover's Pizza: Packed with pepperoni, Italian sausage, ham, bacon, season pork and beef",
  "Supreme Pizza: Including pepperoni, seasoned pork, beef, mushrooms, green bell peppers and red onions"]
  items.forEach(function(item, index){
    $('.'+item).click(function(){
      $(".pizza-img").attr("src","./img/"+item+"pizza.jpg");
      $(".pizza-description").text(descriptions[index])
    })
  });
}
// this will add some event handler to all items in order
function addItemListeners() {
  $("ul#order").on("click", "li", function() {
    showPizza(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    allPizzas.deletePizza(this.id);
    $(".pizza-price").text("The price : $"+allPizzas.price);
    $(".tax").text("Tax: $"+(allPizzas.price*0.1).toFixed(1));
    $(".total-price").text("The total price : $"+(allPizzas.price*1.1).toFixed(1));
    $("#show-pizza").hide();
    showCurrentPizza(allPizzas);
  });
  $('.delivery').click(function(){
    var address= prompt("Please Enter your address to delivery your order");
    $('.delivery-text').text("your order will be send to :"+address+". in 30 minute.")
  });

};
//main program
$(document).ready(function() {
  addMenuListeners();
  addItemListeners();
  $("form#new-pizza").submit(function(event) {
    event.preventDefault();
    var myPizza= $("#new-pizzaType").val();
    var mySize = $("#new-size").val();
    var myTopping = [];
    $("input:checkbox[name=new-topping]:checked").each(function(){
      myTopping.push($(this).val());
      $(this).prop('checked',false);
    });
    var newPizza = new Pizza(myPizza, mySize, myTopping);
    newPizza.pizzaPrice();
    allPizzas.addPizza(newPizza);
    $(".pizza-price").text("The total price :"+allPizzas.price);
    $(".tax").text("Tax: $"+(allPizzas.price*0.1).toFixed(1));
    $(".total-price").text("The total price : $"+(allPizzas.price*1.1).toFixed(1));
    showCurrentPizza(allPizzas);
  });
});
