-- Primeiro, criar a tabela de listas de compras
CREATE TABLE IF NOT EXISTS shoppinglist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    homeId INTEGER NOT NULL,
    startDate TIMESTAMP WITH TIME ZONE,
    endDate TIMESTAMP WITH TIME ZONE
);

-- Depois, criar a tabela de categorias
CREATE TABLE IF NOT EXISTS itemcategory (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- Por último, criar a tabela de itens com as foreign keys
CREATE TABLE IF NOT EXISTS shoppingitem (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2),
    state VARCHAR(50) NOT NULL,
    shoppingListId INTEGER NOT NULL,
    itemCategoryId INTEGER NOT NULL,
    FOREIGN KEY (shoppingListId) REFERENCES shoppinglist(id),
    FOREIGN KEY (itemCategoryId) REFERENCES itemcategory(id)
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_shopping_item_list ON shoppingitem (shoppingListId);
CREATE INDEX IF NOT EXISTS idx_shopping_item_category ON shoppingitem (itemCategoryId);


