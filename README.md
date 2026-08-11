# StarTable

东京与香港 2026 星级米其林餐厅数据库。

## 数据规模
- 东京：160 家
- 香港：77 家
- 合计：237 家

## 当前内容
- 餐厅中文/日文/英文名
- 米其林星级、菜系、地区
- 地址、电话或公开电话状态
- 最近车站、步行时间、交通线路
- 官网/预约链接
- Lunch / Dinner course、价格与可筛选价格区间
- Tabelog 评分
- 餐厅主图字段；无官方图时显示统一高级占位图
- Dress Code 与儿童政策
- Lunch / Dinner 按钮式餐期筛选，价格、着装、儿童政策独立筛选字段
- 默认按地理顺序排列
- 区域快捷浏览
- My page 的已摘星 / 想摘星 / 收藏列表
- 餐厅详情弹窗
- 字段来源状态、最后更新时间与免责声明
- 独立餐厅详情页：`restaurant.html?id=餐厅id`
- 字段级来源/更新时间提示
- Stripe 会员订阅入口与后端 API

## Stripe 订阅
Stripe 后端接口需要部署到支持 Node API Routes 的环境，例如 Vercel。只上传到 GitHub Pages 时，前端可以显示会员入口，但不能完成真实 Checkout。

Checkout 测试必需环境变量：
- `STRIPE_SECRET_KEY`：Stripe test/live secret key
- `SITE_URL`：正式站点地址
- `STRIPE_MONTHLY_PRICE_ID`：StarTable Premium Monthly 的 Price ID
- `STRIPE_YEARLY_PRICE_ID`：StarTable Premium Yearly 的 Price ID

Webhook 启用后再添加：
- `STRIPE_WEBHOOK_SECRET`：Stripe webhook signing secret

如果不配置 Price ID，后端会按产品名查找现有 Stripe 产品和已有 active recurring Price。代码不会创建新的 Stripe Product 或 Price：
- `StarTable Premium Monthly`
- `StarTable Premium Yearly`

接口：
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/create-portal-session`
- `GET /api/stripe/subscription-status?email=...`
- `POST /api/stripe/webhook`

Webhook URL：
- `https://你的域名/api/stripe/webhook`

Stripe Dashboard 需要添加的 Webhook Events：
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Checkout 会使用用户登录邮箱查找 Stripe Customer；如果同邮箱 Customer 已存在会复用，不存在才创建新的 Customer。

数据年份：东京与香港 2026 米其林星级餐厅。每年米其林指南更新后需同步核对餐厅名单、星级、价格、菜单与预约政策。

## 上传
解压 zip 后，把文件覆盖上传到 GitHub 仓库根目录，然后提交即可。
