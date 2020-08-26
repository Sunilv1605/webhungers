-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2020 at 07:49 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webhungers_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `created_date`) VALUES
(1, 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', '2020-08-25 04:56:07');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `discounted_price` int(11) NOT NULL,
  `inventory` int(11) NOT NULL,
  `is_featured` int(1) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0 for Inactive, 1 for Active',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `image`, `price`, `discounted_price`, `inventory`, `is_featured`, `status`, `created_date`, `modified_date`) VALUES
(1, 'Samsung Note 9', 'Camera: 12+12 MP Dual rear camera with Dual Optical image stabilization, Autofocus, 2x optical zoom | 8 MP front camera with Image recording, Touch focus and Face smile detection\r\nDisplay: 16.0 centimeters (6.3-inch) QHD+ capacitive touchscreen display with 1440x2960 pixels, 521 ppi pixel density and 18.5:9 aspect ratio\r\nMemory, Storage & SIM: 6GB RAM | 64GB storage expandable up to 256GB | Dual SIM with dual standby (4G+4G)\r\nOperating System and Processor: Android v7 Nougat operating system with 1.8GHz Exyn operating system 8895 10nm octa core processor\r\nBattery: 3300 mAH lithium ion battery\r\nWarranty: 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase\r\nIncluded in box: Travel adaptor, Data cable, Stereo headset, USB connector, Micro USB connector, S-Pen Acc and Clear cover\r\n', '61EM4uS-5iL._SR500,500_.jpg', 45000, 39999, 155, 0, 1, '2020-08-25 07:48:00', '2020-08-25 07:48:00'),
(2, 'Deserunt omnis velit updated', 'Lorem ipsum dolot sit anum ', '1583145174887.jpg', 555, 699, 47, 0, 1, '2020-08-25 08:56:10', '2020-08-25 08:56:10'),
(3, 'In minus eius duis v', 'Voluptas nostrud eiu', '61bqx-R+2VL._SL1290_.jpg', 450, 301, 23, 1, 1, '2020-08-25 08:59:18', '2020-08-25 08:59:18'),
(4, 'Eius laborum repudia', 'Sint ex nostrud proi', 'DigitalRain Logo_Transparent_Light_BG.png', 904, 558, 155, 1, 1, '2020-08-25 21:44:11', '2020-08-25 21:44:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
