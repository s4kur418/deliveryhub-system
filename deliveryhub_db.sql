-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2025 at 11:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deliveryhub_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'Admin\r\n', 'admin@deliveryhub.com', '$2b$10$P/avTZlNxaRDTJy.1X0oouPVGzjyV3uws3P2zJcKqkTditxzQtC5q');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(100) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_name`, `email`, `phone_number`, `address`, `password`, `created_at`) VALUES
(7, 'Virgil Moreño', 'gamgambears14@gmail.com', NULL, NULL, '$2b$10$m/BEzmU491p3S9p.z31OXuF4s4LFKgbBpILI2q/Wcd4sv.gJbFYu2', '2025-10-24 00:00:00'),
(8, 'James Calonia', 'chuyygil@gmail.com', NULL, NULL, '$2b$10$P/avTZlNxaRDTJy.1X0oouPVGzjyV3uws3P2zJcKqkTditxzQtC5q', '2025-10-25 00:00:00'),
(9, 'Virgil Moreño', 'grazielmoreno@gmail.com', NULL, NULL, '$2b$10$58ZvD1JVJ3cuDe8QX2F/fOGbYTq/IIG2cfL4VSzzggIJ6XDHefl5q', '2025-10-26 00:00:00'),
(10, 'James Calonia', 'calonia@gmail.com', NULL, NULL, '$2b$10$oXKuvMxjLT5dTOGoZiy9uOijp2pHM2uO5Ggq7llSrcMKz5s3I/33i', '2025-10-29 23:18:45');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(20) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_number` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- CREATE ORDERS TABLE --------------------------------------------

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  customer_id INT NOT NULL,
  driver_id INT NULL, -- admin assigns later
  
  pickup_address VARCHAR(255) NOT NULL,
  delivery_address VARCHAR(255) NOT NULL,

  items TEXT NOT NULL,
  notes TEXT NULL,

  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,

  status ENUM(
    'pending',
    'assigned',
    'picked_up',
    'in_transit',
    'delivered',
    'cancelled'
  ) NOT NULL DEFAULT 'pending',

  order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  delivery_date DATETIME NULL,

  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL
);

ALTER TABLE orders
  ADD INDEX idx_customer (customer_id),
  ADD INDEX idx_driver (driver_id),
  ADD INDEX idx_status (status);