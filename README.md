# address-parser-cn (WIP)

CN Address Parser

## Installation

```bash
# npm
npm install address-parser-cn

# yarn
yarn add address-parser-cn
```

## Usage

```ts
import { parseAddress } from 'address-parser-cn';

parseAddress('中国江苏省南京市玄武区梅园新村街道');
// {
//   country: '中国',
//   province: '江苏省',
//   city: '南京市',
//   district: '玄武区',
//   town: '梅园新村街道'
// }
```

## License

MIT © Qingrong Ke
