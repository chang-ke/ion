### Usage

**ion** 是对`webpack`常用功能的封装，并约定了一些默认配置

配置文件默认约定为项目根目录的`ion.config.js`, 你也可以使用-c 指定配置文件，但导出的必须是对象

其它命令行配置 见 `ion --help`

**ion** 提供以下四种功能：

**start**
启动服务

**build**
打包项目

**buildDll**
打包 dll 文件，加快打包和应用启动速度

**test**（实现中）
对项目进行单元测试

*Note*: 如果你有使用 import()进行异步加载模块，请按如下示例使用，给每个异步模块加上名字可以确保模块 hash 稳定

```js
import(/*webpackChunkName: 'publish'*/ './component/publish').then(module => {
  return module;
});
```

| 配置项       | 类型                | 默认值           | 说明                         |
| ------------ | ------------------- | ---------------- | ---------------------------- |
| `entry`      | `string | string[]` | `./src/index.js` | 程序入口                     |
| `publicPath` | `string`            | `/`              | 资源请求根路径               |
| `port`       | `number`            | `8080`           | 应用启动端口                 |
| `proxy`      | `object`            | `{}`             | 代理配置 (同 webpack)        |
| `alias`      | `object`            | `{}`             | 别名 (同 webpack)            |
| `externals`  | `object`            | `{}`             | 外部扩展(同 webpack)         |
| `dll`        | `string[]`          | `false`          | 需要打包成 dll 的类库        |
| `hash`       | `number`            | `8`              | 文件 hash 长度               |
| `cssModule`  | `false | string`    | `false`          | 启用 cssModule               |
| `sourceMap`  | `boolean`           | `false`          | 打包时是否生成 souceMap 文件 |
| `babel`      | `object`            | `{}`             | babel 配置 (同.babelrc)      |
| `postcss`    | `object`            | `{}`             | postcss 配置                 |

下面给出具体配置接口
```ts
{
  entry?: Entry;
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
  lib?: false | string[];
  hash?: number;
  cssModule?: false | string;
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