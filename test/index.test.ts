import {
  shortenCountyName,
  shortenPrefectureName,
  shortenProvinceName,
  isSameCountyName,
  isSamePrefectureName,
  isSameProvinceName,
  parseAddress
} from '../src';

test('shortenProvinceName', () => {
  expect(shortenProvinceName('江苏省')).toBe('江苏');
  expect(shortenProvinceName('上海市')).toBe('上海');
  expect(shortenProvinceName('内蒙古自治区')).toBe('内蒙古');
  expect(shortenProvinceName('广西壮族自治区')).toBe('广西');
  expect(shortenProvinceName('西藏自治区')).toBe('西藏');
  expect(shortenProvinceName('宁夏回族自治区')).toBe('宁夏');
  expect(shortenProvinceName('新疆维吾尔自治区')).toBe('新疆');
  expect(shortenProvinceName('香港特别行政区')).toBe('香港');
});

test('isSameProvinceName', () => {
  expect(isSameProvinceName('江苏省', '江苏')).toBeTruthy();
  expect(isSameProvinceName('上海市', '上海')).toBeTruthy();
  expect(isSameProvinceName('内蒙古自治区', '内蒙古')).toBeTruthy();
  expect(isSameProvinceName('广西壮族自治区', '广西')).toBeTruthy();
  expect(isSameProvinceName('西藏自治区', '西藏')).toBeTruthy();
  expect(isSameProvinceName('宁夏回族自治区', '宁夏')).toBeTruthy();
  expect(isSameProvinceName('新疆维吾尔自治区', '新疆')).toBeTruthy();
  expect(isSameProvinceName('香港特别行政区', '香港')).toBeTruthy();
});

test('shortenPrefectureName', () => {
  expect(shortenPrefectureName('南京市')).toBe('南京');
  expect(shortenPrefectureName('儋州市')).toBe('儋州');
  expect(shortenPrefectureName('乌鲁木齐市')).toBe('乌鲁木齐');

  expect(shortenPrefectureName('大兴安岭地区')).toBe('大兴安岭');
  expect(shortenPrefectureName('阿里地区')).toBe('阿里');
  expect(shortenPrefectureName('和田地区')).toBe('和田');
  expect(shortenPrefectureName('喀什地区')).toBe('喀什');
  expect(shortenPrefectureName('塔城地区')).toBe('塔城');
  expect(shortenPrefectureName('阿勒泰地区')).toBe('阿勒泰');
  expect(shortenPrefectureName('阿克苏地区')).toBe('阿克苏');

  expect(shortenPrefectureName('西双版纳傣族自治州')).toBe('西双版纳');
  expect(shortenPrefectureName('大理白族自治州')).toBe('大理');
  expect(shortenPrefectureName('伊犁哈萨克自治州')).toBe('伊犁');
  expect(shortenPrefectureName('博尔塔拉蒙古自治州')).toBe('博尔塔拉');
  expect(shortenPrefectureName('巴音郭楞蒙古自治州')).toBe('巴音郭楞');
  expect(shortenPrefectureName('克孜勒苏柯尔克孜自治州')).toBe('克孜勒苏');

  expect(shortenPrefectureName('锡林郭勒盟')).toBe('锡林郭勒');
  expect(shortenPrefectureName('阿拉善盟')).toBe('阿拉善');
  expect(shortenPrefectureName('兴安盟')).toBe('兴安');
});

test('isSamePrefectureName', () => {
  expect(isSamePrefectureName('南京市', '南京')).toBeTruthy();
  expect(isSamePrefectureName('儋州市', '儋州')).toBeTruthy();
  expect(isSamePrefectureName('乌鲁木齐市', '乌鲁木齐')).toBeTruthy();

  expect(isSamePrefectureName('大兴安岭地区', '大兴安岭')).toBeTruthy();
  expect(isSamePrefectureName('阿里地区', '阿里')).toBeTruthy();
  expect(isSamePrefectureName('和田地区', '和田')).toBeTruthy();
  expect(isSamePrefectureName('喀什地区', '喀什')).toBeTruthy();
  expect(isSamePrefectureName('塔城地区', '塔城')).toBeTruthy();
  expect(isSamePrefectureName('阿勒泰地区', '阿勒泰')).toBeTruthy();
  expect(isSamePrefectureName('阿克苏地区', '阿克苏')).toBeTruthy();

  expect(isSamePrefectureName('西双版纳傣族自治州', '西双版纳')).toBeTruthy();
  expect(isSamePrefectureName('大理白族自治州', '大理')).toBeTruthy();
  expect(isSamePrefectureName('伊犁哈萨克自治州', '伊犁')).toBeTruthy();
  expect(isSamePrefectureName('博尔塔拉蒙古自治州', '博尔塔拉')).toBeTruthy();
  expect(isSamePrefectureName('巴音郭楞蒙古自治州', '巴音郭楞')).toBeTruthy();
  expect(
    isSamePrefectureName('克孜勒苏柯尔克孜自治州', '克孜勒苏')
  ).toBeTruthy();

  expect(isSamePrefectureName('锡林郭勒盟', '锡林郭勒')).toBeTruthy();
  expect(isSamePrefectureName('阿拉善盟', '阿拉善')).toBeTruthy();
  expect(isSamePrefectureName('兴安盟', '兴安')).toBeTruthy();
});

test('shortenCountyName', () => {
  expect(shortenCountyName('景宁畲族自治县')).toBe('景宁');
  expect(shortenCountyName('酉阳土家族苗族自治县')).toBe('酉阳');
  expect(shortenCountyName('双江拉祜族佤族布朗族傣族自治县')).toBe('双江');
  expect(shortenCountyName('鄂伦春自治旗')).toBe('鄂伦春');
  expect(shortenCountyName('鄂温克族自治旗')).toBe('鄂温克族自治旗');

  expect(shortenCountyName('新宾县')).toBe('新宾');
  expect(shortenCountyName('新宾满族自治县')).toBe('新宾');

  expect(shortenCountyName('阜新市')).toBe('阜新');
  expect(shortenCountyName('阜新蒙古族自治县')).toBe('阜新');

  expect(shortenCountyName('崇义县')).not.toBe('义县');
  expect(shortenCountyName('义宁县')).not.toBe('义县');

  expect(shortenCountyName('神农架林区')).toBe('神农架');
});

test('isSameCountyName', () => {
  expect(isSameCountyName('景宁畲族自治县', '景宁')).toBeTruthy();
  expect(isSameCountyName('酉阳土家族苗族自治县', '酉阳')).toBeTruthy();
  expect(
    isSameCountyName('双江拉祜族佤族布朗族傣族自治县', '双江')
  ).toBeTruthy();
  expect(isSameCountyName('鄂伦春自治旗', '鄂伦春')).toBeTruthy();
  expect(isSameCountyName('鄂温克族自治旗', '鄂温克族自治旗')).toBeTruthy();

  expect(isSameCountyName('新宾县', '新宾')).toBeTruthy();
  expect(isSameCountyName('新宾满族自治县', '新宾')).toBeTruthy();

  expect(isSameCountyName('阜新市', '阜新')).toBeTruthy();
  expect(isSameCountyName('阜新蒙古族自治县', '阜新')).toBeTruthy();

  expect(isSameCountyName('崇义县', '义县')).toBeFalsy();
  expect(isSameCountyName('义宁县', '义县')).toBeFalsy();

  expect(isSameCountyName('神农架林区', '神农架')).toBeTruthy();
});

test('parseAddress', () => {
  expect(parseAddress('辽宁省阜新市太平区城南街道繁荣大街')).toEqual({
    country: '中国',
    province: '辽宁省',
    city: '阜新市',
    district: '太平区',
    town: '城南街道'
    // street: '繁荣大街',
    // streetNumber: ''
  });

  // expect(parseAddress('辽宁省阜新市太平区城南街道繁荣大街1号楼8号')).toEqual({
  //   country: '中国',
  //   province: '辽宁省',
  //   city: '阜新市',
  //   district: '太平区',
  //   town: '城南街道',
  //   street: '繁荣大街',
  //   streetNumber: '8号'
  // });

  expect(parseAddress('陕西省咸阳市彬县城关街道')).toEqual({
    country: '中国',
    province: '陕西省',
    city: '咸阳市',
    district: '彬县',
    town: '城关街道'
    // street: '',
    // streetNumber: ''
  });

  expect(parseAddress('江西省鹰潭市锦江镇兴安街')).toEqual({
    country: '中国',
    province: '江西省',
    city: '鹰潭市',
    district: '', // 余江区
    town: '锦江镇'
    // street: '兴安街',
    // streetNumber: ''
  });

  expect(parseAddress('江西省鹰潭市余江县横溪镇')).toEqual({
    country: '中国',
    province: '江西省',
    city: '鹰潭市',
    district: '余江县',
    town: '横溪镇'
    // street: '',
    // streetNumber: ''
  });

  expect(parseAddress('重庆市酉阳县桃花源镇')).toEqual({
    country: '中国',
    province: '重庆市',
    city: '重庆市',
    district: '酉阳县',
    town: '桃花源镇'
    // street: '',
    // streetNumber: ''
  });

  expect(parseAddress('中国江苏省南京市玄武区梅园新村街道')).toEqual({
    country: '中国',
    province: '江苏省',
    city: '南京市',
    district: '玄武区',
    town: '梅园新村街道'
    // street: '',
    // streetNumber: ''
  });

  expect(parseAddress('中国江苏省南京市玄武区环园东路')).toEqual({
    country: '中国',
    province: '江苏省',
    city: '南京市',
    district: '玄武区',
    town: ''
    // street: '环园东路',
    // streetNumber: ''
  });

  expect(parseAddress('江苏省兴化市昭阳镇')).toEqual({
    country: '中国',
    province: '江苏省',
    // city: '泰州市',
    city: '',
    district: '兴化市',
    town: '昭阳镇'
  });

  expect(parseAddress('江苏省宝应县安宜镇')).toEqual({
    country: '中国',
    province: '江苏省',
    // city: '扬州市',
    city: '',
    district: '宝应县',
    town: '安宜镇'
  });
});
