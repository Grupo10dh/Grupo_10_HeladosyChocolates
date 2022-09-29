-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema grupo10
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `grupo10` ;

-- -----------------------------------------------------
-- Schema grupo10
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `grupo10` DEFAULT CHARACTER SET utf8 ;
USE `grupo10` ;

-- -----------------------------------------------------
-- Table `grupo10`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo10`.`Usuarios` ;

CREATE TABLE IF NOT EXISTS `grupo10`.`Usuarios` (
  `id_usuario` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NULL,
  `usuario` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `telefono` VARCHAR(45) NULL,
  `contraseña` VARCHAR(200) NOT NULL,
  `ciudad` VARCHAR(45) NULL,
  `fecha_de_nacimiento` DATE NULL,
  `foto_de_perfil` VARCHAR(100) NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grupo10`.`Carrito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo10`.`Carrito` ;

CREATE TABLE IF NOT EXISTS `grupo10`.`Carrito` (
  `id_carrito` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `total` DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (`id_carrito`),
  INDEX `id_usuario_idx` (`id_usuario` ASC) ,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `grupo10`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grupo10`.`Categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo10`.`Categorias` ;

CREATE TABLE IF NOT EXISTS `grupo10`.`Categorias` (
  `id_categoria` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grupo10`.`Productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo10`.`Productos` ;

CREATE TABLE IF NOT EXISTS `grupo10`.`Productos` (
  `id_producto` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `precio_unidad` INT NOT NULL,
  `descuento` TINYINT(3) NULL,
  `imagen` VARCHAR(100) NULL,
  `stock` INT NULL,
  `id_categoria` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `id_categoria_idx` (`id_categoria` ASC) ,
  CONSTRAINT `id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `grupo10`.`Categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grupo10`.`Detalle_Orden`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grupo10`.`Detalle_Orden` ;

CREATE TABLE IF NOT EXISTS `grupo10`.`Detalle_Orden` (
  `id_detalle` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_producto` INT(10) UNSIGNED NOT NULL,
  `subtotal` DOUBLE NOT NULL,
  `cantidad` INT NOT NULL,
  `id_carrito` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_detalle`),
  INDEX `id_producto_idx` (`id_producto` ASC) ,
  INDEX `id_carrito_idx` (`id_carrito` ASC) ,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `grupo10`.`Productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_carrito`
    FOREIGN KEY (`id_carrito`)
    REFERENCES `grupo10`.`Carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
