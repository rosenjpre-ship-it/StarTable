# Tokyo Michelin Lunch Guide

这是一个可部署到 GitHub Pages / Vercel / Netlify 的静态网站。

## 当前版本
- 收录 11 家已整理餐厅
- 支持搜索
- 支持星级、菜系、地区、预约难度筛选
- 支持查看 Lunch Course、预约方式与 Message Plate 信息
- 数据独立存放在 `data/restaurants.json`

## 本地打开
由于页面通过 `fetch` 读取 JSON，直接双击 `index.html` 时部分浏览器会阻止本地读取。
推荐以下任一方式：

### 方法 1：Python 本地服务器
```bash
python3 -m http.server 8000
```
然后打开：
```text
http://localhost:8000
```

### 方法 2：GitHub Pages
将整个文件夹上传到 GitHub 仓库，然后在：
`Settings → Pages → Deploy from a branch`
选择 `main` 和 `/root`。

## 继续扩充数据
只需在 `data/restaurants.json` 继续加入餐厅对象，无需修改页面结构。
