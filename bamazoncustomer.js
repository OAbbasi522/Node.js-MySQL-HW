var mysql = require("mysql")
var inquirer = require("inquirer")
require("console.table")

var connection = mysql.createConnection({
 host: "localhost", 
 port:  3306,
 user: "root",
 password: "root",
 database: "bamazon"
})

connection.connect(function(err){
    if(err){
        console.error("error connecting: " + err.stack)
    }
    loadProducts()
})

function loadProducts(){
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err 
        console.table(res)
        promptCustomer(res)
    })
    
}

function promptCustomer(inventory){
inquirer.prompt([
    {
        type: "input",
        name: "choice",
        message: "What is the ID of the product you wish to purchase? [If you would like to quit, press q]",
        validate: function(val){
            return !isNaN(val) || val.toLowerCase() === "q" 
        }
    
    }
])
.then(function(val){
    checkifshouldExit(val.choice)
    var choiceID = parseInt(val.choice)
    var product = checkInventory(choiceID, inventory)
    if(product) {
        promptCustomerforQuantity(product)
    }
    else {
        loadProducts()
    }
})
}
function promptCustomerforQuantity(product){
    inquirer.prompt([
        {
            type: "input",
            name: "qantity",
            message: "How many would you like?",
            validate: function(val){
                return val > 0 || val.toLowerCase() === "q"
            }
        }
    ])
    .then(function(val){
        checkifshouldExit(val.quantity)
        var quantity = parseInt(val.qantity)
        if(quantity > product.stock_quantity){
            console.log("insufficient quantity")
            loadProducts()
        }
        else{
            makePurchase(product, quantity)
        }
    })
}

function makePurchase(product, quantity){
        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", 
        [quantity, product.item_id], 
        function(err, res){
            console.log("Successfully purchased " + quantity + " " + product.product_name)
            loadProducts()
        }
        )
}

function checkInventory(choiceID, inventory){
    for(var i = 0; i < inventory.length; i ++){
        if(inventory [i].item_id === choiceID){
            return inventory[i]
        }
    }
    return null
}

function checkifshouldExit(choice){
    if(choice ==="q"){
        console.log("Goodbye")
        process.exit(0)
    }
}