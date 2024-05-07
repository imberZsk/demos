## 安装通用依赖

```js
sudo pnpm i test-analyze -w

sudo pnpm remove test-analyze -w //可以用remove和uninstall
```

## 给某个包单独安装依赖

```js
sudo pnpm i test-analyze --filter next-starter

sudo pnpm uninstall test-analyze --filter next-starter //不能用remove
```

## 给某个包安装当前未发版的其他的包的依赖

```
sudo pnpm i @vue/shared@workspace --filter @vue/reactivity
```

## 在根目录下启动某个项目

```js
  "dev-n": "cd ./packages/next-starter && pnpm run dev",
  "dev-r": "cd ./packages/react-starter && pnpm run dev",
```
