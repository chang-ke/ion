# ion

**ion** 是基于`webpack`封装的开发工具，并约定了一些默认配置

## Features

- 开箱即用

- 超快的启动和打包速度，支持dll

- 内置支持 React HMR，less，typescript，cssModule，px to rem

## Usage

配置文件默认约定为项目根目录的`ion.config.js`, 你也可以使用-c 指定配置文件，但文件导出的必须是对象

其它命令行配置 见 `ion --help`

### ion 提供以下四种功能：

```bash
# 启动服务
$ ion start

# 打包 dll 文件，加快打包和应用启动速度
$ ion buildDll

# 打包项目，打包项目前先使用 buildDll 命令生成 Dll
$ ion build

# 对项目进行单元测试，实现中
$ ion test
```

_Note_: 如果你有使用 import()进行异步加载模块，请按如下示例使用，给每个异步模块加上名字可以确保模块 hash 稳定

```js
import(/*webpackChunkName: 'publish'*/ './component/publish').then(module => {
  return module;
});
```

| 配置项       | 类型              | 默认值           | 说明                         |
| ------------ | ----------------- | ---------------- | ---------------------------- |
| `entry`      | `object`          | `./src/index.js` | 程序入口                     |
| `publicPath` | `string`          | `/`              | 资源请求根路径               |
| `port`       | `number`          | `8080`           | 应用启动端口                 |
| `proxy`      | `object`          | `{}`             | 代理配置 (同 webpack)        |
| `alias`      | `object`          | `{}`             | 别名 (同 webpack)            |
| `externals`  | `object`          | `{}`             | 外部扩展(同 webpack)         |
| `analyze`    | `boolean`         | `false`          | 是否启用依赖分析             |
| `dllEntry`   | `string[]`        | `false`          | 需要打包成 dll 的类库        |
| `hash`       | `number`          | `8`              | 文件 hash 长度               |
| `cssModule`  | `false \| string` | `false`          | 启用 cssModule               |
| `sourceMap`  | `boolean`         | `false`          | 打包时是否生成 souceMap 文件 |
| `babel`      | `object`          | `{}`             | babel 配置 (同.babelrc)      |
| `postcss`    | `object`          | `{}`             | postcss 配置                 |

下面给出具体配置接口

```ts
export interface IonConfig {
  entry?: Entry & {
    app: string[];
  };
  publicPath?: string;
  port?: number;
  proxy?: {
    [k: string]: {};
  };
  alias?: {
    [k: string]: string;
  };
  externals?: {
    [k: string]: string;
  };
  analyze?: boolean;
  dllEntry?: string[];
  hash?: number;
  cssModule?: boolean | string;
  sourceMap?: boolean;
  babel?: {
    presets?: string[];
    plugins?: (string | string[])[];
  };
  postcss?: {
    autoprefixer?: {
      browsers?: string[];
    };
    pxtorem?: {
      remUnit?: number;
      exclude?: RegExp;
    };
  };
}
```

## ChangeLog

- v0.2.0 增加对 TypeScript 的支持

- v0.3.0 增加对 React HMR 的支持
