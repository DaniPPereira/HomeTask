-- Tabela de Categorias de Itens
CREATE TABLE IF NOT EXISTS itemcategory (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- Tabela de Listas de Compras
CREATE TABLE IF NOT EXISTS shoppinglist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    homeId INTEGER NOT NULL,
    startDate TIMESTAMP WITH TIME ZONE,
    endDate TIMESTAMP WITH TIME ZONE
);

-- Tabela de Itens na Lista de Compras
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

-- Índices opcionais para melhorar o desempenho
CREATE INDEX idx_shopping_list_home ON shoppinglist (homeId);
CREATE INDEX idx_shopping_item_list ON shoppingitem (shoppingListId);
CREATE INDEX idx_shopping_item_category ON shoppingitem (itemCategoryId);

-- Mensagem de conclusão
DO $$ BEGIN RAISE NOTICE 'Script de criação da base de dados concluído com sucesso.'; END $$;
