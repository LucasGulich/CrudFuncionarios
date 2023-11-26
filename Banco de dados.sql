CREATE TABLE IF NOT EXISTS salarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Cargo VARCHAR(255),
    SalarioInicial DECIMAL(10, 2),
    SalarioAtual DECIMAL(10, 2)
);

-- Inserção de dados na tabela salarios
INSERT INTO salarios (Nome, Cargo, SalarioInicial, SalarioAtual)
VALUES 
	('Maria', 'Analista', 1500, 4500),
	('Lucas', 'Gerente', 2000, 6000),
	('João', 'Diretor', 3000, 7000.00),
	('Marcos', 'Analista', 1500, 4500),
    ('José', 'Suporte', 1300.00, 3000);

-- Ver funcionários
select * from salarios;
















