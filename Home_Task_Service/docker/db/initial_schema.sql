-- Tabela ZipCode
CREATE TABLE ZipCode (
    Id SERIAL PRIMARY KEY,
    PostalCode VARCHAR(10) NOT NULL,
    City VARCHAR(255) NOT NULL
);

-- Tabela Home
CREATE TABLE Home (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    UserId INT NOT NULL,
    ZipCodeId INT NOT NULL,
    FOREIGN KEY (ZipCodeId) REFERENCES ZipCode(Id)
);

-- Tabela Residents
CREATE TABLE Residents (
    HomeId INT NOT NULL,
    UserId INT NOT NULL,
    PRIMARY KEY (HomeId, UserId),
    UNIQUE (UserId), -- Adiciona uma constraint única na coluna UserId
    FOREIGN KEY (HomeId) REFERENCES Home(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela TaskCategory
CREATE TABLE TaskCategory (
    Id SERIAL PRIMARY KEY,
    Description VARCHAR(255) NOT NULL
);

-- Tabela Task
CREATE TABLE Task (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description VARCHAR(255),
    Data DATE NOT NULL,
    State VARCHAR(255),
    Photo VARCHAR(255),
    HomeId INT NOT NULL,
    UserId INT NOT NULL,
    TaskCategoryId INT NOT NULL,
    FOREIGN KEY (HomeId) REFERENCES Home(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Residents(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (TaskCategoryId) REFERENCES TaskCategory(Id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabela TaskParticipants
CREATE TABLE TaskParticipants (
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    PRIMARY KEY (TaskId, UserId),
    FOREIGN KEY (TaskId) REFERENCES Task(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Residents(UserId) ON DELETE CASCADE ON UPDATE CASCADE
);
