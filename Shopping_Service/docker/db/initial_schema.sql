
-- Tabela de Categorias de Itens
CREATE TABLE ItemCategory (
    Id SERIAL PRIMARY KEY,               -- Identificador único da categoria
    Description VARCHAR(255) NOT NULL    -- Descrição da categoria
);

-- Tabela de Listas de Compras
CREATE TABLE ShoppingList (
    Id SERIAL PRIMARY KEY,               -- Identificador único da lista de compras
    Title VARCHAR(255) NOT NULL,         -- Título da lista de compras
    StartDate DATE NOT NULL,             -- Data de início da lista
    EndDate DATE,                        -- Data de término da lista
    HomeId INT NOT NULL,                 -- ID da casa associada
    created_at TIMESTAMP DEFAULT NOW(),  -- Data de criação
    updated_at TIMESTAMP DEFAULT NOW()   -- Data de atualização
);

-- Tabela de Itens na Lista de Compras
CREATE TABLE ShoppingItem (
    Id SERIAL PRIMARY KEY,                -- Identificador único do item
    Description VARCHAR(255) NOT NULL,    -- Descrição do item
    State VARCHAR(255),                   -- Estado do item (ex.: "pendente", "comprado")
    Quantity FLOAT(10) DEFAULT 1,         -- Quantidade do item
    Price FLOAT(10),                      -- Preço do item
    ShoppingListId INT NOT NULL,          -- ID da lista de compras associada
    ItemCategoryId INT,                   -- ID da categoria do item
    created_at TIMESTAMP DEFAULT NOW(),   -- Data de criação
    updated_at TIMESTAMP DEFAULT NOW(),   -- Data de atualização
    -- Chave estrangeira para a lista de compras
    CONSTRAINT fk_shopping_list
        FOREIGN KEY (ShoppingListId) REFERENCES ShoppingList (Id)
        ON DELETE CASCADE,
    -- Chave estrangeira para a categoria
    CONSTRAINT fk_item_category
        FOREIGN KEY (ItemCategoryId) REFERENCES ItemCategory (Id)
        ON DELETE SET NULL
);

-- Índices opcionais para melhorar o desempenho
CREATE INDEX idx_shopping_list_home ON ShoppingList (HomeId);
CREATE INDEX idx_shopping_item_list ON ShoppingItem (ShoppingListId);
CREATE INDEX idx_shopping_item_category ON ShoppingItem (ItemCategoryId);

-- Mensagem de conclusão
DO $$ BEGIN RAISE NOTICE 'Script de criação da base de dados concluído com sucesso.'; END $$;
