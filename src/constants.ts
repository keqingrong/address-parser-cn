import { names as nationalityNames } from 'gb3304';

/**
 * 省级行政区划单位后缀，长后缀优先
 * 截至2019年10月，共包含：
 * 23个省、
 * 5个自治区、
 * 4个直辖市、
 * 2个特别行政区，
 * 合计34个省级行政单位。
 */
export const provincialLevelSuffixes = ['省', '市', '自治区', '特别行政区'];

/**
 * 地级行政单位后缀，长后缀优先
 * 截至2019年10月，共包含：
 * 293个地级市、
 * 7个地区、
 * 30个自治州、
 * 3个盟，
 * 合计333个地级行政单位。
 */
export const prefectureLevelSuffixes = ['市', '地区', '自治州', '盟'];

/*
 * 县级行政单位后缀，长后缀优先
 * 截至2019年10月，共包含：
 * 963个市辖区、
 * 382个县级市、
 * 1329个县、
 * 117个自治县、
 * 49个旗、
 * 3个自治旗、
 * 1个特区、
 * 1个林区，
 * 合计2845个县级单位。
 */
export const countyLevelSuffixes = [
  '特区',
  '林区',
  '区',
  '县级市',
  '市',
  '自治县',
  '县',
  '自治旗',
  '旗'
];

/**
 * 56个民族名称正则表达式
 */
export const nationalityNamesRegExp = new RegExp(
  `(${nationalityNames.join('|')})`,
  'g'
);

/**
 * 地级行政单位中的名族匹配
 * 伊犁哈萨克自治州
 * 博尔塔拉蒙古自治州
 * 巴音郭楞蒙古自治州
 * 克孜勒苏柯尔克孜自治州
 */
export const prefectureNationalityNamesRegExp = new RegExp(
  `(${nationalityNames.concat(['哈萨克', '蒙古', '柯尔克孜']).join('|')})`,
  'g'
);

/** 省级行政单位后缀匹配 */
export const provincialLevelSuffixRegExp = new RegExp(
  `(${[
    '省',
    '市',
    '维吾尔自治区',
    '壮族自治区',
    '回族自治区',
    '自治区',
    '特别行政区'
  ].join('|')})$`,
  'g'
);

/** 地级行政单位后缀匹配 */
export const prefectureLevelSuffixRegExp = new RegExp(
  `(${prefectureLevelSuffixes.join('|')})$`,
  'g'
);
