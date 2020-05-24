-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  Dim 24 mai 2020 à 16:17
-- Version du serveur :  5.7.29-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pseasy`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `number` varchar(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `quizzAnswer`
--

CREATE TABLE `quizzAnswer` (
  `id` int(5) NOT NULL,
  `idQuestion` int(5) NOT NULL,
  `idUser` varchar(255) DEFAULT NULL,
  `answer1Choice` tinyint(1) DEFAULT NULL,
  `answer2Choice` tinyint(1) DEFAULT NULL,
  `answer3Choice` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `quizzQuestion`
--

CREATE TABLE `quizzQuestion` (
  `id` int(5) NOT NULL,
  `sheetReference` varchar(200) NOT NULL,
  `difficulty` int(1) NOT NULL,
  `question` varchar(512) NOT NULL,
  `explaination` varchar(2048) NOT NULL,
  `answer1` varchar(255) DEFAULT NULL,
  `answer2` varchar(255) DEFAULT NULL,
  `answer3` varchar(255) DEFAULT NULL,
  `answer1IsOk` tinyint(1) NOT NULL,
  `answer2IsOk` tinyint(1) NOT NULL,
  `answer3IsOk` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `quizzStat`
--

CREATE TABLE `quizzStat` (
  `id` int(5) NOT NULL,
  `idQuestion` int(5) NOT NULL,
  `nbAnswers` int(4) NOT NULL DEFAULT '0',
  `nbFirstOk` int(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sheet`
--

CREATE TABLE `sheet` (
  `id` int(4) NOT NULL,
  `reference` varchar(200) NOT NULL,
  `version` varchar(10) NOT NULL,
  `updatedDate` datetime NOT NULL,
  `title` varchar(400) NOT NULL,
  `content` text CHARACTER SET utf32 NOT NULL,
  `level` int(11) DEFAULT NULL,
  `idCategory` int(10) NOT NULL,
  `createdAdminDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `visit`
--

CREATE TABLE `visit` (
  `id` int(11) NOT NULL,
  `idUser` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Index pour la table `quizzAnswer`
--
ALTER TABLE `quizzAnswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idQuestion` (`idQuestion`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `quizzQuestion`
--
ALTER TABLE `quizzQuestion`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `quizzStat`
--
ALTER TABLE `quizzStat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idQuestion` (`idQuestion`);

--
-- Index pour la table `sheet`
--
ALTER TABLE `sheet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `quizzAnswer`
--
ALTER TABLE `quizzAnswer`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `quizzQuestion`
--
ALTER TABLE `quizzQuestion`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `quizzStat`
--
ALTER TABLE `quizzStat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sheet`
--
ALTER TABLE `sheet`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `quizzAnswer`
--
ALTER TABLE `quizzAnswer`
  ADD CONSTRAINT `quizzAnswer_ibfk_1` FOREIGN KEY (`idQuestion`) REFERENCES `quizzQuestion` (`id`),
  ADD CONSTRAINT `quizzAnswer_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `quizzStat`
--
ALTER TABLE `quizzStat`
  ADD CONSTRAINT `quizzStat_ibfk_1` FOREIGN KEY (`idQuestion`) REFERENCES `quizzQuestion` (`id`);

--
-- Contraintes pour la table `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;