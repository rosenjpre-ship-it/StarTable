# StarTable

东京、香港、上海、巴黎与纽约 2026 星级米其林餐厅数据库。

## 数据规模
- 东京：160 家
- 香港：77 家
- 上海：51 家
- 巴黎：128 家（第一批基础名单，详细字段待逐店补齐）
- 纽约：72 家
- 杭州：13 家
- 合计：501 家

## 当前内容

> 巴黎当前状态：星级名单与城市筛选已接入；官网/预约链接、course、Dress Code、儿童政策、交通、评分与主图仍需逐店补齐后，才能视为完整城市数据。

- 餐厅中文/日文/英文名
- 米其林星级、菜系、地区
- 地址、电话或公开电话状态
- 最近车站、步行时间、交通线路
- 官网/预约链接
- Lunch / Dinner course、价格与可筛选价格区间
- 东京 Tabelog、香港 OpenRice、上海大众点评/携程等本地公开评分
- 餐厅主图字段；无官方图时显示统一高级占位图
- Dress Code 与儿童政策
- Lunch / Dinner 按钮式餐期筛选，价格、着装、儿童政策独立筛选字段
- 默认按地理顺序排列
- 区域快捷浏览
- My page 的已摘星 / 想摘星 / 收藏列表
- 邮箱验证码登录基础版
- 非会员 20 家预览、5 次搜索/星助理请求提示
- 会员状态在 My Page 与会员入口中展示
- 餐厅详情弹窗
- 字段来源状态、最后更新时间与免责声明
- 独立餐厅详情页：`restaurant.html?id=餐厅id`
- 字段级来源/更新时间提示
- Stripe 会员订阅入口与后端 API
- 产品级 API 数据层，后续可替换为数据库/CMS
- API 层基础会员权限控制
- 星助理推荐 API，根据当前餐厅数据返回 1-3 个推荐
- About / 服务条款 / 隐私政策页面

## 当前技术结构
当前版本仍以 `data/restaurants.json` 作为主数据源，但已经增加 API 层，方便部署到 Vercel 后逐步升级为数据库：

- `data/cities.json`：城市配置表，控制城市显示、当地评分平台、货币、价格区间与地区排序
- `data/restaurant-template.json`：新增城市/餐厅录入模板
- `GET /api/restaurants`：餐厅列表，可按 city、stars、cuisine、area、meal、price、dress、child、solo 筛选；非会员返回前 20 家预览
- `GET /api/restaurants?id=...`：单个餐厅详情；非会员仅开放预览范围内餐厅完整详情
- `POST /api/auth/request-code`：发送邮箱验证码；未配置邮件服务时返回 `testCode` 供测试
- `POST /api/auth/verify-code`：验证邮箱验证码并返回 session token
- `GET /api/me`：读取当前邮箱与订阅状态
- `GET/POST /api/favorites`：收藏/已摘星/想摘星接口占位，当前前端仍使用浏览器本地存储
- `POST /api/assistant`：基于当前餐厅数据的规则推荐 API；非会员超过 5 次后返回会员提示

前端加载策略：
- Vercel/线上环境：优先读取 `/api/restaurants`
- 本地 file 预览：自动 fallback 到 `./data/restaurants.json`

下一阶段建议接入数据库后，把 `_data.js`、`_auth.js` 和 `favorites.js` 的存储替换为数据库查询即可，前端和 API 路径可以保持不变。

## 新增城市流程
目标是逐步录入所有“米其林星级餐厅数量超过 10 家”的城市。新增城市时按这个顺序做：

1. 在 `data/cities.json` 添加城市配置：
   - `id`
   - `dataCity`
   - `labelZh` / `labelEn`
   - `michelinYear`
   - `currency`
   - `ratingPlatforms`
   - `priceTiers`
   - `areaOrder`
2. 按 `data/restaurant-template.json` 录入餐厅。
3. 每家餐厅必须尽量补齐：
   - 地址 / 电话 / 官网或预约入口
   - Lunch / Dinner course 与价格
   - Dress Code / 儿童政策 / Solo dining
   - 当地评分平台
   - 最近车站或交通信息
   - 主图、来源、最近确认日期
4. 执行：
   ```bash
   node scripts/audit_completeness.js
   npm run check
   ```
5. 审计结果里 `basicVerified / courseVerified / reservationVerified / policyVerified / ratingVerified / imageVerified` 尽量接近 100% 后再发布。

城市评分平台原则：
- 东京：Tabelog
- 香港：OpenRice
- 上海：大众点评 / 携程
- 新城市：优先选择当地用户最常用、评分稳定、公开可访问的平台；没有稳定公开评分则不展示“待接入”。

## 登录与会员权限
当前邮箱登录是可部署的基础版：
- 有 `RESEND_API_KEY` 与 `AUTH_EMAIL_FROM` 时，会发送真实验证码邮件
- 未配置邮件服务时，`/api/auth/request-code` 会返回 `testCode`，方便 Stripe/会员流程测试
- `AUTH_SESSION_SECRET` 用于签发登录 token；未配置时会 fallback 到 `STRIPE_SECRET_KEY`

正式商用建议接入：
- 邮件服务：Resend 或同类服务
- 数据库：Supabase / Neon Postgres / Airtable，用于保存用户、收藏、订阅缓存与搜索次数
- Webhook：把 Stripe 订阅事件写入数据库，避免每次页面打开都实时查 Stripe

## Stripe 订阅
Stripe 后端接口需要部署到支持 Node API Routes 的环境，例如 Vercel。只上传到 GitHub Pages 时，前端可以显示会员入口，但不能完成真实 Checkout。

Checkout 测试必需环境变量：
- `STRIPE_SECRET_KEY`：Stripe test/live secret key
- `SITE_URL`：正式站点地址
- `STRIPE_MONTHLY_PRICE_ID`：StarTable Premium Monthly 的 Price ID
- `STRIPE_YEARLY_PRICE_ID`：StarTable Premium Yearly 的 Price ID
- `AUTH_SESSION_SECRET`：登录 token 签名密钥，建议设置为随机长字符串

Webhook 启用后再添加：
- `STRIPE_WEBHOOK_SECRET`：Stripe webhook signing secret

邮箱验证码正式发送时再添加：
- `RESEND_API_KEY`
- `AUTH_EMAIL_FROM`

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

数据年份：东京、香港、上海与巴黎 2026 米其林星级餐厅。每年米其林指南更新后需同步核对餐厅名单、星级、价格、菜单与预约政策。

## 上传
解压 zip 后，把文件覆盖上传到 GitHub 仓库根目录，然后提交即可。
