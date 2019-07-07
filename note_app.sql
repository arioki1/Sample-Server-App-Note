/*
Navicat MySQL Data Transfer

Source Server         : arioki.online
Source Server Version : 50724
Source Host           : 127.0.0.1:3306
Source Database       : note_app

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-05-23 00:01:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category_note
-- ----------------------------
DROP TABLE IF EXISTS `category_note`;
CREATE TABLE `category_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of category_note
-- ----------------------------
INSERT INTO `category_note` VALUES ('1', 'Kategori 1', 'https://facebook.github.io/react-native/docs/assets/favicon.png');
INSERT INTO `category_note` VALUES ('2', 'Kategori 2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3rpV-t5Sg9jzs56KD-nsy4nqvtGwMlHUP1ViWy4NP9QoY-zx');
INSERT INTO `category_note` VALUES ('3', 'Sriwijaya ', 'https://seeklogo.com/images/S/sriwijaya-fc-logo-0A33D03880-seeklogo.com.png');

-- ----------------------------
-- Table structure for data_note
-- ----------------------------
DROP TABLE IF EXISTS `data_note`;
CREATE TABLE `data_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `note` text,
  `time` datetime DEFAULT NULL,
  `id_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=359 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of data_note
-- ----------------------------
INSERT INTO `data_note` VALUES ('1', 'Note 1', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('2', 'Note 2', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('3', 'Note 3', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('4', 'Note 4', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('5', 'Note 5', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('6', 'Note 6', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('7', 'Note 7', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('8', 'Note 8', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('9', 'Note 9', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('10', 'Note 10', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('11', 'Note 11', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('12', 'Note 12', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('13', 'Note 13', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('14', 'Note 14', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('15', 'Note 15', 'Kategori 1', '2019-05-23 09:58:53', '1');
INSERT INTO `data_note` VALUES ('16', 'Note 16', 'Kategori 2', '2019-05-23 09:58:53', '2');
INSERT INTO `data_note` VALUES ('17', 'Note 17', 'Kategori 2', '2019-05-23 09:58:54', '2');
INSERT INTO `data_note` VALUES ('18', 'Note 18', 'Kategori 2', '2019-05-23 09:58:55', '2');
INSERT INTO `data_note` VALUES ('19', 'Note 19', 'Kategori 2', '2019-05-23 09:58:56', '2');
INSERT INTO `data_note` VALUES ('20', 'Note 20', 'Kategori 2', '2019-05-23 09:58:57', '2');
INSERT INTO `data_note` VALUES ('21', 'Note 21', 'Kategori 2', '2019-05-23 09:58:58', '2');
INSERT INTO `data_note` VALUES ('22', 'Note 22', 'Kategori 2', '2019-05-23 09:58:59', '2');
INSERT INTO `data_note` VALUES ('23', 'Note 23', 'Kategori 2', '2019-05-23 10:04:49', '2');
INSERT INTO `data_note` VALUES ('24', 'Note 24', 'Kategori 2', '2019-05-23 10:04:52', '2');
INSERT INTO `data_note` VALUES ('25', 'Note 25', 'Kategori 2', '2019-05-23 10:04:55', '2');
INSERT INTO `data_note` VALUES ('26', 'Note 26', 'Kategori 2', '2019-05-23 10:05:04', '2');
INSERT INTO `data_note` VALUES ('27', 'Note 27', 'Kategori 2', '2019-05-23 10:05:07', '2');
INSERT INTO `data_note` VALUES ('28', 'Note 28', 'Kategori 2', '2019-05-23 10:05:10', '2');
INSERT INTO `data_note` VALUES ('29', 'Note 29', 'Kategori 2', '2019-05-23 10:05:12', '2');
INSERT INTO `data_note` VALUES ('30', 'Note 30', 'Kategori 2', '2019-05-23 10:05:13', '2');
INSERT INTO `data_note` VALUES ('31', 'Note 31', 'Kategori 2', '2019-05-23 10:05:15', '2');
INSERT INTO `data_note` VALUES ('32', 'Note 32', 'Kategori 2', '2019-05-23 10:05:18', '2');
INSERT INTO `data_note` VALUES ('33', 'Note 33', 'Kategori 2', '2019-05-23 10:05:30', '2');
INSERT INTO `data_note` VALUES ('34', 'Note 34', 'Kategori 2', '2019-05-23 10:05:28', '2');
INSERT INTO `data_note` VALUES ('35', 'Note 35', 'Kategori 2', '2019-05-23 10:05:26', '2');
INSERT INTO `data_note` VALUES ('37', 'Note 37', 'Kategori 2', '2019-05-23 10:05:22', '2');
INSERT INTO `data_note` VALUES ('345', 'Pertama ', 'Pertama ', '2019-07-05 09:05:04', '2');
INSERT INTO `data_note` VALUES ('346', 'Xcc', 'Ff', '2019-07-05 16:45:43', '2');
INSERT INTO `data_note` VALUES ('347', 'Terhir ', 'Deskrpisi', '2019-07-05 23:44:08', '1');
INSERT INTO `data_note` VALUES ('327', 'satu', 'satu', '2019-05-30 11:44:03', '1');
INSERT INTO `data_note` VALUES ('348', 'dua', 'dus', '2019-05-23 11:45:39', null);
INSERT INTO `data_note` VALUES ('349', 'xx', 'dd', '2019-05-29 11:47:03', null);
INSERT INTO `data_note` VALUES ('350', 'Judul2', 'Deskripsi 2', '2019-07-06 02:36:14', '2');
INSERT INTO `data_note` VALUES ('351', 'Judul baru ', 'Deskripsi ', '2019-07-06 03:25:40', '2');
INSERT INTO `data_note` VALUES ('352', 'Judul baru', 'Deskripsi baru ', '2019-07-06 03:27:45', '1');
INSERT INTO `data_note` VALUES ('353', 'Judul baru2', 'Deskripsi baru2', '2019-07-06 03:29:41', '2');
INSERT INTO `data_note` VALUES ('355', 'Judul33', 'Deskripsi 33', '2019-07-06 03:33:40', '6');
INSERT INTO `data_note` VALUES ('356', 'Terbaru ', 'Deskripsi ', '2019-07-06 03:39:47', '2');
INSERT INTO `data_note` VALUES ('358', 'Contoh2', 'Cotton2', '2019-07-06 08:10:46', '1');
SET FOREIGN_KEY_CHECKS=1;
