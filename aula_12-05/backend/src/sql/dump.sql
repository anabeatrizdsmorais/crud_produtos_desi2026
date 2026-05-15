CREATE SCHEMA `cadastro_pessoa` ;

CREATE TABLE `cadastro_pessoa`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `email` VARCHAR(226) NULL,
  `senha` CHAR(64) NULL,
  `cpf` BIGINT NULL,
  `aitvo` INT NULL DEFAULT 1,
  PRIMARY KEY (`idusuario`));
