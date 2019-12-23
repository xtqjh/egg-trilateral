/*
 Navicat MySQL Data Transfer

 Source Server         : 47.108.50.127
47.108.50.127
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 47.108.50.127
 Source Database       : notes

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : utf-8

 Date: 12/21/2019 15:30:14 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `zc_took`
-- ----------------------------
DROP TABLE IF EXISTS `zc_took`;
CREATE TABLE `zc_took` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '收货省',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '收货市',
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '收货区',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '收货地址',
  `votes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '票数',
  `pieces` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '件数',
  `party_B_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '收货单位名称',
  `party_A_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '发货方单位',
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `time` (`create_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11910 DEFAULT CHARSET=utf8;
