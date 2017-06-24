-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games` ;

CREATE TABLE IF NOT EXISTS `games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL,
  `category` VARCHAR(45) NULL,
  `company` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `time` ;

CREATE TABLE IF NOT EXISTS `time` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `games_id` INT NOT NULL,
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `time_elapsed` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `games_id`),
  INDEX `fk_time_games_idx` (`games_id` ASC),
  CONSTRAINT `fk_time_games`
    FOREIGN KEY (`games_id`)
    REFERENCES `games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO event@localhost;
 DROP USER event@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'event'@'localhost' IDENTIFIED BY 'event';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'event'@'localhost';
GRANT SELECT, INSERT, TRIGGER ON TABLE * TO 'event'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `games`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `games` (`id`, `name`, `category`, `company`) VALUES (1, 'Hearth Stone', 'Card', 'Blizzard');

COMMIT;


-- -----------------------------------------------------
-- Data for table `time`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `time` (`id`, `games_id`, `start_time`, `end_time`, `time_elapsed`) VALUES (1, 1, '2017-06-23 11:40:00', '2017-06-23 14:40:00', NULL);

COMMIT;

