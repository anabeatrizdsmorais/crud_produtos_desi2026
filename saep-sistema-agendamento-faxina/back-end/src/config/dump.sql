CREATE TABLE `faxina_db`.`agendamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datahora` DATETIME NULL,
  `id_cliente` INT NULL,
  `id_funcionario` INT NULL,
  `observacao` VARCHAR(255) NULL,
  `logradouro` VARCHAR(100) NULL,
  `numero` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `uf` VARCHAR(45) NULL,
  `complemento` VARCHAR(45) NULL,
  `ativo` INT NULL DEFAULT 1,
  `cep` VARCHAR(45) NULL,
  `status` INT NULL,
  `telefone_celular` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `faxina_db`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `senha` VARCHAR(80) NULL,
  `tipo` INT NULL DEFAULT 1 COMMENT '1- funccionario, 2- cliente, 3-adm',
  PRIMARY KEY (`id`));