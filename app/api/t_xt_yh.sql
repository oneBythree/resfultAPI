/*
Navicat MySQL Data Transfer

Source Server         : main
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-12-22 17:57:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_xt_yh
-- ----------------------------
DROP TABLE IF EXISTS `t_xt_yh`;
CREATE TABLE `t_xt_yh` (
  `YH_ID` int(65) NOT NULL,
  `CZJS_DM` varchar(18) DEFAULT NULL,
  `YH_DM` varchar(18) NOT NULL,
  `YH_MC` varchar(50) NOT NULL,
  `MM` varchar(18) NOT NULL,
  `XB` char(1) DEFAULT NULL,
  `YH_LX` char(1) DEFAULT NULL,
  `YH_JS` varchar(18) DEFAULT NULL,
  `XH` int(65) DEFAULT NULL,
  `YX_BJ` char(1) DEFAULT NULL,
  `SC_BJ` char(1) DEFAULT NULL,
  `LR_RQ` datetime DEFAULT NULL,
  `XG_RQ` datetime DEFAULT NULL,
  `CZRY_ID` varchar(18) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `BZ` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`YH_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_xt_yh
-- ----------------------------
INSERT INTO `t_xt_yh` VALUES ('1', null, 'superadmin', '超级管理员', 'superadmin', '1', '0', null, null, '0', '0', '2014-12-13 13:36:21', '2014-12-13 13:46:18', null, null, null);
INSERT INTO `t_xt_yh` VALUES ('1331', null, 'sale', '管理员', 'sale', '1', '0', null, null, '0', '0', '2015-06-18 11:25:07', '2016-04-08 13:48:52', null, null, null);
INSERT INTO `t_xt_yh` VALUES ('1332', null, 'csc', 'csc', 'csc', '1', '0', null, null, '0', '1', '2015-10-26 16:14:16', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1333', null, 'cs', 'cs', 'cs', '1', '0', null, null, '0', '0', '2015-11-04 10:55:56', '2016-07-08 10:36:38', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1334', null, 'lssp', '管理员', 'lssp', '1', '0', null, null, '0', '0', '2016-08-01 14:56:44', '2016-08-02 15:29:29', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1335', null, 'lhy', '管理员', 'lhy', '1', '0', null, null, '0', '0', '2016-08-01 15:25:13', '2016-08-02 15:29:19', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1336', null, 'csf', '管理员', 'csf', '1', '0', null, null, '0', '0', '2016-08-01 15:58:29', '2016-08-02 15:29:08', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1337', null, 'wm', '管理员', 'wm', '1', '0', null, null, '0', '0', '2016-08-01 16:00:28', '2016-08-02 15:28:57', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1338', null, 'wmps', '管理员', 'wmps', '1', '0', null, null, '0', '0', '2016-08-02 10:47:13', '2016-08-02 15:28:48', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1339', null, 'ceshi', '管理员', 'ceshi', '1', '0', null, null, '0', '0', '2016-08-02 13:41:26', '2016-08-02 15:25:38', null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1340', null, 'heiliu', '黑六', 'heiliu', '1', '0', null, null, '0', '0', '2016-08-05 09:33:57', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1341', null, 'zgfs', '志广富庶', 'zgfs', '1', '0', null, null, '0', '0', '2016-08-05 09:41:14', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1342', null, 'yihao', '壹号食品', 'yihao', '1', '0', null, null, '0', '0', '2016-08-05 14:05:07', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1343', null, 'jkl', '京客隆配送中心', 'jkl', '1', '0', null, null, '0', '0', '2016-08-15 15:30:15', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1344', null, 'tany', '北京天安农业发展有限公司', 'tany', '1', '0', null, null, '0', '0', '2016-08-16 10:29:58', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1345', null, 'tanytest', 'yonghumingcheng', 'tanytest', '1', '2', null, null, '0', '1', '2016-08-16 11:04:28', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1346', null, 'bcy', '北京北菜园农业科技发展有限公司', 'bcy', '1', '0', null, null, '0', '0', '2016-08-19 15:07:50', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1347', null, 'lbln', '北京蓝波绿农科技有限公司', 'lbln', '1', '0', null, null, '0', '0', '2016-08-24 09:29:23', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1348', null, 'bgw', '百舸湾', 'bgw', '1', '0', null, null, '0', '0', '2016-10-08 15:18:57', '2016-10-08 15:19:00', null, null, null);
INSERT INTO `t_xt_yh` VALUES ('1349', null, 'shhl', '北京盛华宏林粮油批发市场', 'shhl', '1', '0', null, null, '0', '0', '2016-10-12 10:12:21', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1350', null, 'zt', '北京斋堂农业科技有限公司', 'zt', '1', '0', null, null, '0', '0', '2016-10-28 11:27:16', null, null, null, null);
INSERT INTO `t_xt_yh` VALUES ('1351', null, 'blq', 'blq', 'blq', '1', '0', null, null, '0', '0', '2016-12-19 11:30:08', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1352', null, 'shhllssc', 'shhllssc', 'shhllssc', '1', '0', null, null, '0', '0', '2016-12-19 14:55:00', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1353', null, 'blqls', 'blqls', 'blqls', '1', '0', null, null, '0', '0', '2016-12-20 13:25:53', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1354', null, 'dylpfsc', 'dylpfsc', 'dylpfsc', '1', '0', null, null, '0', '0', '2016-12-21 11:02:47', null, null, '', '');
INSERT INTO `t_xt_yh` VALUES ('1355', null, 'dyllst', 'dyllst', 'dyllst', '1', '0', null, null, '0', '0', '2016-12-21 11:03:03', null, null, '', '');
