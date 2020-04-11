-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bwniwqurrlvpqsbnncix-mysql.services.clever-cloud.com:3306
-- Generation Time: Dec 27, 2019 at 11:51 PM
-- Server version: 8.0.13-3
-- PHP Version: 7.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pseasy`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `number` varchar(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sheet`
--

CREATE TABLE `sheet` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `reference` varchar(200) NOT NULL,
  `version` varchar(10) NOT NULL,
  `updatedDate` datetime NOT NULL,
  `title` varchar(400) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `content` text CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `level` int(11) DEFAULT NULL,
  `idCategory` int(10) NOT NULL,
  `createdAdminDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `sheet`
--
ALTER TABLE `sheet`
  -- ADD PRIMARY KEY (`id`),
  -- ADD UNIQUE KEY `IDX_abe5090fb6d0efce53b95ac93e` (`reference`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;



CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE `user` CHANGE `ip` `ip` VARCHAR(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL; 

CREATE TABLE `visit` (
  `id` int(11) NOT NULL,
  `idUser` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idUser) REFERENCES user(id)
) 
ALTER TABLE `visit` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;



--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
