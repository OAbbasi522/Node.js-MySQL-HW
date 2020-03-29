DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon; 

USE bamazon;
CREATE TABLE products (
item_id INT auto_increment NOT NULL,
product_name VARCHAR (50) NOT NULL, 
department_name VARCHAR (50) NOT NULL,
price DECIMAL (10,2) NOT NULL, 
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Muffler", "Exhaust", 210.99, 13),
("Turbo", "Engine", 1529.99, 21),
("Headlight", "Exterior", 279.89, 37),
("Sunvisor", "Interior", 37.99, 12),
("Header", "Engine", 599.99, 17),
("Wiring Harness", "Electronics", 149.99, 19),
("Taillight", "Exterior", 249.99, 22),
("Piston", "Engine", 299.99, 44),
("Catalytic Converter", "Exhaust", 609.99, 12),
("Wheels", "Exterior", 210.99, 33);

SELECT * FROM products;