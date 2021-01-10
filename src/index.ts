import { prefecturalCitiesOf202011 } from 'administrative-division-cn';
import {
  provincialLevelSuffixRegExp,
  prefectureLevelSuffixes,
  prefectureNationalityNamesRegExp,
  nationalityNamesRegExp,
  countyLevelSuffixes
} from './constants';

const __DEV__ = false;

/**
 * 缩短省级行政单位名称
 * 实现方式：去除名字中的单位后缀。
 * @example
 * '江苏省' -> '江苏'
 * '上海市' -> '上海'
 * '内蒙古自治区' -> '内蒙古'
 * '广西壮族自治区' -> '广西'
 * '西藏自治区' -> '西藏'
 * '宁夏回族自治区' -> '宁夏'
 * '新疆维吾尔自治区' -> '新疆'
 * '香港特别行政区' -> '香港'
 * @param provinceName - 省级行政单位名称
 */
export function shortenProvinceName(provinceName: string) {
  const result = provinceName.replace(provincialLevelSuffixRegExp, '');
  __DEV__ && console.log('[shortenProvinceName]', provinceName, result);
  return result;
}

/**
 * 缩短地级行政单位名称
 * 实现方式：如果是自治州，先去除自治州名字中的民族，然后去除地级行政单位名称（'市', '地区', '自治州', '盟'）。
 * @example
 * '南京市' -> '南京'
 * '儋州市' -> '儋州'
 * @param prefectureName - 地级行政单位名称
 */
export function shortenPrefectureName(prefectureName: string) {
  const prefectureSuffix = prefectureLevelSuffixes.find(
    suffix => prefectureName.lastIndexOf(suffix) > -1
  );
  const nameWithoutSuffix =
    prefectureSuffix === '自治州'
      ? prefectureName.replace(prefectureNationalityNamesRegExp, '')
      : prefectureName;
  const prefectureSuffixIndex = prefectureSuffix
    ? nameWithoutSuffix.indexOf(prefectureSuffix)
    : -1;
  const shortPrefectureName = prefectureSuffix
    ? nameWithoutSuffix.slice(0, prefectureSuffixIndex)
    : nameWithoutSuffix;
  __DEV__ &&
    console.log('[shortenPrefectureName]', prefectureName, shortPrefectureName);
  return shortPrefectureName;
}

/**
 * 缩短区县名称
 * 实现方式：先去除名字中的民族，然后去除县级行政单位名称；如果去除民族名称、行政单位名称后直接为空时，返回原名字。
 * @example
 * '新宾县' -> '新宾'
 * '新宾满族自治县' -> '新宾'
 * '景宁畲族自治县' -> '景宁'
 * '酉阳土家族苗族自治县' -> '酉阳'
 * '双江拉祜族佤族布朗族傣族自治县' -> '双江'
 * '鄂伦春自治旗' -> '鄂伦春'
 * '鄂温克族自治旗' -> '鄂温克族自治旗'
 * @param countyName - 县级行政单位名称
 */
export function shortenCountyName(countyName: string) {
  const shortCountyName = countyName.replace(nationalityNamesRegExp, '');
  const countySuffix = countyLevelSuffixes.find(
    suffix => shortCountyName.lastIndexOf(suffix) > -1
  );
  const tinyCountyName = countySuffix
    ? shortCountyName.slice(0, shortCountyName.indexOf(countySuffix))
    : shortCountyName;
  const result = tinyCountyName.length > 0 ? tinyCountyName : countyName;
  __DEV__ && console.log('[shortenCountyName]', countyName, result);
  return result;
}

/**
 * 判断两个名称是否相同
 * @param a
 * @param b
 * @param shorten
 */
export function isSameName(
  a: string,
  b: string,
  shorten: (str: string) => string = str => str
) {
  if (a === b) {
    return true;
  } else {
    const shortA = shorten(a);
    const shortB = shorten(b);
    if (shortA === shortB) {
      return true;
    } else if (shortA.length < shortB.length) {
      return shortB.indexOf(shortA) === 0 && shortA.length > 1;
    } else {
      return shortA.indexOf(shortB) === 0 && shortB.length > 1;
    }
  }
}

/**
 * 判断两个省级行政区是否相同
 * @example
 * isSameProvinceName('上海市', '上海') -> true
 * isSameProvinceName('新疆维吾尔自治区', '新疆') -> true
 * isSameProvinceName('香港特别行政区', '香港') -> true
 * @param a - 省级行政单位名称
 * @param b - 省级行政单位名称
 */
export function isSameProvinceName(a: string, b: string) {
  __DEV__ && console.log('[isSameProvinceName]', a, b);
  return isSameName(a, b, shortenProvinceName);
}

/**
 * 判断两个地级市是否相同
 * @example
 * isSamePrefectureName('南京市', '南京') -> true
 * @param a - 地级行政单位名称
 * @param b - 地级行政单位名称
 */
export function isSamePrefectureName(a: string, b: string) {
  __DEV__ && console.log('[isSamePrefectureName]', a, b);
  return isSameName(a, b, shortenPrefectureName);
}

/**
 * 判断两个区县是否相同
 * @example
 * isSameCountyName('新宾县', '新宾满族自治县') -> true
 * isSameCountyName('酉阳县', '酉阳土家族苗族自治县') -> true
 * isSameCountyName('阜新县', '阜新蒙古族自治县') -> true
 * @param a - 县级行政单位名称
 * @param b - 县级行政单位名称
 */
export function isSameCountyName(a: string, b: string) {
  __DEV__ && console.log('[isSameCountyName]', a, b);
  // TODO: 对县级市来说下面的判断是不准确的，需要维护别名列表
  return isSameName(a, b, shortenCountyName);
}

export interface AddressInfo {
  /** 国家 */
  country: string;
  /** 省/直辖市 */
  province: string;
  /** 地级市 */
  city: string;
  /** 区/县/县级市 */
  district: string;
  /** 乡/镇/街道 */
  town: string;
  /** 道路（街道？） */
  street?: string;
  /** 门牌号 */
  streetNumber?: string;
}

export interface AddressIndices {
  /** 国 */
  countryIndex: number;
  /** 省 */
  provinceIndex: number;
  /** 市 */
  cityIndex: number;
  /** 区 */
  districtIndex: number;
  /** 县 */
  countyIndex: number;
  /** 乡 */
  townshipIndex: number;
  /** 镇 */
  townIndex: number;
  /** 街道 */
  subDistrictIndex: number;
  /** 苏木 */
  sumuIndex: number;
}

/**
 * 解析地址，返回各组件索引
 * @param address
 */
export function parseAddressIndices(address: string): AddressIndices {
  const countryIndex = address.indexOf('国');
  const provinceIndex = address.indexOf('省');
  const cityIndex = address.indexOf('市');
  const districtIndex = address.indexOf('区');
  const countyIndex = address.indexOf('县');
  const townshipIndex = address.indexOf('乡');
  const townIndex = address.indexOf('镇');
  const subDistrictIndex = address.indexOf('街道');
  const sumuIndex = address.indexOf('苏木');
  return {
    countryIndex,
    provinceIndex,
    cityIndex,
    districtIndex,
    countyIndex,
    townshipIndex,
    townIndex,
    subDistrictIndex,
    sumuIndex
  };
}

/**
 * 解析地址（省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码）
 * @param address
 */
export function parseAddress(address: string) {
  const addressInfo: AddressInfo = {
    country: '中国',
    province: '',
    city: '',
    district: '',
    town: ''
  };
  const addressIndices = parseAddressIndices(address);
  const {
    countryIndex,
    provinceIndex,
    cityIndex,
    districtIndex,
    countyIndex,
    townshipIndex,
    townIndex,
    subDistrictIndex,
    sumuIndex
  } = addressIndices;
  // 国家
  if (
    countryIndex > -1 &&
    (provinceIndex > -1 ||
      cityIndex > -1 ||
      districtIndex > -1 ||
      countyIndex > -1)
  ) {
    addressInfo.country = address.slice(0, countryIndex + 1);
  }
  // 省
  if (provinceIndex > -1) {
    const provinceStartIndex = countryIndex > -1 ? countryIndex + 1 : 0;
    addressInfo.province = address.slice(provinceStartIndex, provinceIndex + 1);
  }
  // 地级市
  if (cityIndex > -1) {
    const cityStartIndex = provinceIndex > -1 ? provinceIndex + 1 : 0;
    addressInfo.city = address.slice(cityStartIndex, cityIndex + 1);
  }
  // 直辖市
  if (['北京市', '天津市', '上海市', '重庆市'].includes(addressInfo.city)) {
    addressInfo.province = addressInfo.city;
  }
  // 区
  if (districtIndex > -1) {
    const districtStartIndex =
      cityIndex > -1
        ? cityIndex + 1
        : addressInfo.province.length > 0
        ? address.indexOf(addressInfo.province) + addressInfo.province.length
        : 0;
    addressInfo.district = address.slice(districtStartIndex, districtIndex + 1);
  }
  // 县
  if (countyIndex > -1) {
    const countyStartIndex =
      cityIndex > -1
        ? cityIndex + 1
        : addressInfo.province.length > 0
        ? address.indexOf(addressInfo.province) + addressInfo.province.length
        : 0;
    addressInfo.district = address.slice(countyStartIndex, countyIndex + 1);
  }
  // 县级市
  if (addressInfo.city.length > 0 && addressInfo.district.length === 0) {
    const restAddress = address.slice(cityIndex + addressInfo.city.length + 1);
    const countyCityIndex = restAddress.indexOf('市');
    if (countyCityIndex > -1) {
      // 地址中存在两个市
      addressInfo.city = address.slice(cityIndex + 1, countyCityIndex + 1);
    } else {
      // 对比全国已有的293个地级市
      if (!prefecturalCitiesOf202011.includes(addressInfo.city)) {
        addressInfo.district = addressInfo.city;
        addressInfo.city = '';
      }
    }
  }
  // 乡级行政区，街道、镇、乡、民族乡、苏木、民族苏木
  const townshipLevelStartIndex =
    addressInfo.district.length > 0
      ? address.indexOf(addressInfo.district) + addressInfo.district.length
      : addressInfo.city.length > 0
      ? address.indexOf(addressInfo.city) + addressInfo.city.length
      : addressInfo.province.length > 0
      ? address.indexOf(addressInfo.province) + addressInfo.province.length
      : 0;
  // 乡
  if (townshipIndex > -1) {
    addressInfo.town = address.slice(
      townshipLevelStartIndex,
      townshipIndex + 1
    );
  }
  // 镇
  if (townIndex > -1) {
    addressInfo.town = address.slice(townshipLevelStartIndex, townIndex + 1);
  }
  // 街道
  if (subDistrictIndex > -1) {
    addressInfo.town = address.slice(
      townshipLevelStartIndex,
      subDistrictIndex + 2
    );
  }
  // 苏木
  if (sumuIndex > -1) {
    addressInfo.town = address.slice(townshipLevelStartIndex, sumuIndex + 2);
  }
  return addressInfo;
}
