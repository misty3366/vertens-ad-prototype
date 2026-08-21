# VertensAI 产品需求文档（PRD）

| 项目 | 内容 |
|---|---|
| 产品名称 | **VertensAI** |
| 文档版本 | **V2.1｜线下门店到店营销版** |
| 更新日期 | 2026-08-19 |
| 文档状态 | 产品、研发、运营联合评审稿 |
| 产品形态 | 面向海外线下门店的 AI 到店营销内容与数据工作台 |
| 当前基线 | GitHub `vipwenzy/sunads` · `main` · `d3f9495` |
| 适用范围 | 当前原型确认的产品能力，以及将原型建设为可验证 MVP 所需的功能规格 |

> 本文只描述 VertensAI 当前确认的产品方向和最新功能。产品从单一建材家居门店扩展为跨行业线下门店，但仍聚焦同一个结果：用可规模化的本地内容带来预约、到店、咨询和成交。Token 中转、通用 API 平台或泛 AI 工具不属于本版本核心业务。

---

## 0. 一页结论

### 0.1 产品定位

> **VertensAI 是面向海外线下门店的 AI 到店营销内容与数据工作台。**
>
> 它帮助餐饮、美业、建材、健身、宠物、教育、汽车、健康、零售等门店找到可复用的爆款内容结构，替换为自己的商品、服务、优惠、品牌、数字人和语言，批量生成本地化短视频，并通过 Meta、TikTok、WhatsApp 与 CRM 数据判断哪些内容真正带来有效咨询、预约到店和成交。

VertensAI 不以“会生成图片和视频”作为最终价值，而以以下闭环作为产品价值：

```text
爆款视频 / 验证模板
        ↓
拆解 Hook、证明、CTA 和节奏
        ↓
植入门店商品 / 服务 / 优惠、品牌与市场
        ↓
选择 AI 演员或克隆老板本人 + 选择声纹与语言
        ↓
生成可测试的短视频变体
        ↓
投放 Meta / TikTok，承接 WhatsApp / CRM 结果
        ↓
识别高质量线索素材 → 继续复刻与放大
```

### 0.2 首要用户

- 在海外经营实体门店、服务门店、体验空间或本地连锁的中小企业老板。
- 负责门店社媒、广告投放和内容生产的运营人员。
- 为门店提供策略、脚本、本地化和视频生产的 VertensAI 内部创意团队。

### 0.3 首批行业模板

VertensAI 的底层工作流保持通用，但模板、示例、默认 CTA 和效果指标必须按行业呈现。首版覆盖以下 16 个行业：

| 行业 | 典型模板 | 默认转化动作 |
|---|---|---|
| 餐饮 Restaurants | 招牌菜特写、午市限时优惠、老板推荐 | 订座、导航到店、领取优惠 |
| 美业 Beauty & Salon | 前后对比、项目解释、新客体验 | 预约项目、WhatsApp 咨询 |
| 建材家居 Home & Building | 材料对比、空间改造、店主讲解 | 预约到店、领取样品、咨询报价 |
| 健身 Fitness | 7 天挑战、教练口播、学员变化 | 预约体验课、领取试练 |
| 宠物 Pet Services | 洗护前后对比、服务过程、萌宠故事 | 预约洗护、导航到店 |
| 教育 Education | 免费试听、老师答疑、家长证言 | 预约试听、咨询课程 |
| 汽车服务 Auto Services | 故障—解决、保养知识、门店案例 | 预约检测、获取报价 |
| 健康与康养 Health & Wellness | 专家 FAQ、服务解释、客户体验 | 预约咨询、到店评估 |
| 零售 Retail | 新品试用、到货展示、限时折扣 | 到店购买、领取优惠 |
| 亲子 Kids & Family | 家长证言、体验过程、活动预告 | 预约体验、报名活动 |
| 婚庆与活动 Wedding & Events | 场地揭幕、布置前后、案例故事 | 预约看场、咨询档期 |
| 酒店与旅行 Hotels & Travel | 周末体验、房型展示、周边攻略 | 预订房间、咨询套餐 |
| 咖啡与烘焙 Cafés & Bakeries | 幕后制作、当日限定、主理人故事 | 导航到店、领取新品券 |
| 服装 Fashion | 一件三穿、试衣展示、到店新品 | 到店试穿、领取折扣 |
| 摄影 Photography | 修图前后、拍摄过程、客户成片 | 预约档期、咨询套餐 |
| 娱乐 Entertainment | 活动倒计时、现场氛围、嘉宾预告 | 购票、报名、导航到场 |

### 0.4 当前产品原则

1. **结果优先**：产品必须回答“哪条内容带来有效客户”，而不只是“生成了多少内容”。
2. **复刻结构，不复制品牌**：保留优秀内容的 Hook、节奏和说服结构，重新生成门店自己的脚本、商品 / 服务 / 优惠与画面。
3. **门店资产先行**：商品、服务、优惠、门店、老板形象、声纹和品牌规范是所有生成任务的共同输入。
4. **模板降低操作门槛**：普通门店老板可以通过向导完成；专业运营和内部团队可以进入无限画布深度编辑。
5. **人工服务先验证，软件再规模化**：Creative Service 负责前期案例交付；验证有效的 SOP 再沉淀为 Agent、模板和画布能力。
6. **数据形成资产**：内容、花费、有效对话、预约和成交数据必须关联到同一条 Creative ID。

### 0.5 本版本核心模块

| 分组 | 模块 | 核心作用 |
|---|---|---|
| Workspace | Home | 通过四步向导完成第一次爆款复刻 |
| Workspace | Projects | 管理生成任务、工作流与交付产物 |
| Workspace | My Brand | 管理商品、服务、优惠、数字人、声纹、品牌规范和市场信息 |
| Workspace | Assets | 管理图片、视频、优惠素材、Logo 和参考素材 |
| Create | AI Agent | 用对话生产图片或视频，可进入对话任务或无限画布 |
| Create | Templates | 浏览、预览和复刻经过验证的短视频结构 |
| Create | Viral Canvas | 在无限画布中编排爆款拆解和批量变体工作流 |
| Create | AI Avatars | 选择 AI 演员或基于授权克隆门店老板 |
| Create | Creative Service | 提交人工视频外包需求，查看样片和交付进度 |
| Growth | Performance | 将内容表现与有效客户、预约和收入关联 |
| Growth | Social Accounts | 连接 Meta、TikTok、WhatsApp 和 CRM 数据源 |

---

## 1. 背景与问题

### 1.1 用户现状

海外中小线下门店通常具备商品或服务、经营场所和销售能力，但缺少持续生产本地短视频广告的能力：

- 不知道应该拍什么，内容高度依赖临时灵感。
- 不会拆解爆款，只会机械模仿表面画面。
- 老板或销售顾问不愿意长期出镜，真人拍摄组织成本高。
- 多语言市场需要重复写脚本、配音和制作字幕。
- 广告内容、投放数据、WhatsApp 对话和成交结果相互割裂。
- 外包公司交付视频后不沉淀工作流，下一次仍然从零开始。

### 1.2 产品机会

AI 已经显著降低脚本、翻译、配音、数字人和视频生成成本，但“生成工具”本身容易同质化。VertensAI 的机会不在于再做一个通用生成器，而在于把以下资产组合起来：

```text
线下门店行业模板与本地营销理解
+ 爆款短视频结构库
+ 老板数字人与多语言声纹
+ 可复用工作流
+ 门店真实投放与获客数据
```

### 1.3 需要验证的核心假设

| 编号 | 假设 | 验证信号 |
|---|---|---|
| H1 | 门店愿意用“爆款复刻”解决不知道拍什么的问题 | 爆款链接导入率、向导完成率、生成率 |
| H2 | 老板克隆或行业演员能够降低真人拍摄成本 | 数字人使用率、持续生成频次、内容通过率 |
| H3 | 本地化视频能够获得可接受的 Meta / TikTok 流量成本 | CTR、CPC、有效对话成本 |
| H4 | 客户愿意为“内容 + 测试 + 复盘”付费，而不只是单条视频 | 试用付费率、月度续费率、Creative Service 复购率 |
| H5 | 客户自己的结果数据能提高下一批内容的胜率 | 基于 Performance 建议生成的素材胜率变化 |

---

## 2. 产品目标与边界

### 2.1 产品目标

| 目标 | 产品要求 | MVP 验收目标 |
|---|---|---|
| 降低首次使用门槛 | 首页四步向导直接完成一次爆款复刻 | 新用户 10 分钟内进入首次生成 |
| 提高内容生产效率 | 模板、Agent 和画布复用同一份品牌资产 | 一个工作流可生成至少 3 个变体 |
| 降低出镜成本 | 支持 AI 演员和授权老板克隆 | 生成任务可直接引用已批准数字人与声纹 |
| 支持海外本地化 | 支持语言、字幕、声纹、市场与 CTA 配置 | 首发支持英语、西班牙语，保留语言扩展能力 |
| 建立结果闭环 | Creative ID 关联渠道花费和线索结果 | 能查看素材级花费、有效线索与 CPL |
| 验证商业交付 | 软件工作台与人工外包服务共用资产和数据 | 服务 Brief、审核、交付和复盘可在项目中追踪 |

### 2.2 本版不展开的方向

- 面向设计师的知识付费和设计生产力课程。
- 国内抖音、快手等平台的一期接入。
- Token 中转站、模型 API 商店或独立开发者平台。
- 自动代投、自动调价和全功能广告账户托管。
- 完整 CRM、销售订单、库存和 ERP。
- 开放模板交易市场、创作者社区和分成体系。
- 餐厅预订、课程排课、诊所病历、门店 POS 等垂直行业经营软件。
- 学习中心、推荐返利、消息中心等非核心增长模块。

---

## 3. 用户、角色与权限

| 角色 | 主要任务 | 核心权限 |
|---|---|---|
| 门店老板 / Workspace Owner | 配置品牌、批准老板克隆、查看结果、购买服务 | 全部数据；成员、授权、账单与删除权限 |
| 门店运营 / Editor | 创建内容、使用模板、管理素材、连接部分渠道 | 创建与编辑；不可删除 Workspace 或修改授权主体 |
| 广告投手 / Analyst | 连接渠道、查看投放和线索表现、提出迭代建议 | Performance 与渠道数据；只读品牌资产 |
| VertensAI 创意制作人 / Producer | 处理 Creative Service Brief、生成并提交样片 | 被分配项目的内容与工作流权限 |
| 平台运营 / Admin | 上下架模板、审核演员、处理合规与异常 | 运营后台和审核权限，不默认访问客户商业数据 |

权限原则：

- 老板克隆必须由 Workspace Owner 完成身份和使用授权。
- 声纹、演员和品牌资产必须有 Workspace 级使用范围。
- Producer 只可访问被分配的项目，不得跨客户查看素材。
- 渠道 Token、个人信息和销售结果必须加密并记录访问日志。

---

## 4. 信息架构与全局交互

### 4.1 左侧导航

```text
Workspace
├── Home
├── Projects
├── My Brand
└── Assets

Create
├── AI Agent
├── Templates
├── Viral Canvas
├── AI Avatars
└── Creative Service

Growth
├── Performance
└── Social Accounts
```

### 4.2 全局体验要求

| 编号 | 要求 | 验收标准 |
|---|---|---|
| G-01 | 左侧菜单支持展开和收起 | 收起后保留图标、Tooltip 和当前选中状态；展开后显示分组和完整名称 |
| G-02 | 页面只保留一个头部层级 | 不出现“全局头部 + 页面头部”重复占高的双层结构 |
| G-03 | 主要界面使用海外简洁 SaaS 风格 | 白底、克制用色、三维家科技蓝作为主强调色 |
| G-04 | 所有长任务显示状态 | 至少包含排队、处理中、待确认、完成、失败和可重试 |
| G-05 | 关键结果数字标记数据来源 | Demo、估算、平台回传和 CRM 确认必须可区分 |
| G-06 | Help 入口全局可达 | 可提交问题，并自动附带当前页面、任务与错误上下文 |

---

## 5. 核心用户流程

### 5.1 流程 A：首页完成第一次爆款复刻

```text
粘贴 TikTok / Reels / Facebook 视频链接
        ↓
分析 Hook、证明、CTA、节奏和镜头结构
        ↓
改写为门店商品 / 服务 / 优惠和目标市场文案
        ↓
选择 AI 演员 / 老板克隆 + 声纹 + 语言
        ↓
生成 3 条 9:16 视频变体
        ↓
进入 Projects 或 Viral Canvas 继续处理
```

### 5.2 流程 B：从模板直接复刻

```text
筛选 / 搜索模板 → 点击图片预览 → Recreate
       ↓
从 My Brand 自动载入商品、服务或优惠，或手动上传素材
       ↓
配置主题、人物、语言和 CTA
       ↓
直接生成，或查看 Workflow
       ↓
Open in Viral Canvas → 复制可编辑工作流
```

### 5.3 流程 C：通过 Agent 创作

```text
输入创意任务 + 选择商品 / 服务 / 优惠 + 选择图片/视频
       ↓
自动模型 / 质量偏好
       ↓
Chat：进入 Codex 风格对话，查看步骤和产物
Canvas：直接把 Brief 变为画布工作流
```

### 5.4 流程 D：Performance 形成再生产闭环

```text
连接 Meta / TikTok / WhatsApp / CRM
       ↓
Creative ID 对齐花费、点击、有效对话、预约和收入
       ↓
识别高质量线索素材与有效 Hook
       ↓
Performance Agent 给出建议
       ↓
一键创建新变体 → 返回 Agent / Viral Canvas
```

### 5.5 流程 E：人工视频外包

```text
查看外包定位和可播放样片
       ↓
提交商品 / 服务 / 优惠、市场、目标、数量、语言和参考视频 Brief
       ↓
制作人确认策略与首批方向
       ↓
客户批注 / 审核 → 批量生产 → 周度交付
       ↓
上线测试 → Performance 复盘 → 下一批创意
```

---

## 6. 功能需求

### F1｜Home：首页与爆款复刻向导

#### 目标

用最少文字解释产品，不要求用户先理解模型或画布；用户首次进入即可开始完成结果任务。

#### 功能

| 编号 | 功能 | 详细要求 |
|---|---|---|
| F1-01 | 四步 Getting Started | 固定为：添加爆款视频、改写文案、选择数字人与声纹、生成视频 |
| F1-02 | 爆款链接导入 | 支持 TikTok、Instagram Reels、Facebook 视频 URL；校验链接格式与可访问性 |
| F1-03 | 步骤进度 | 展示 `已完成数 / 4`；允许返回已完成步骤修改输入 |
| F1-04 | 内容预览 | 右侧根据当前步骤显示参考视频、脚本结构、人物和成片预览 |
| F1-05 | 快捷导航 | 以小面积卡片进入 AI Agent、Templates、Viral Canvas、Performance |
| F1-06 | 中断恢复 | 自动保存向导状态，用户再次进入时恢复上次步骤 |

#### 验收

- 无品牌资产的新用户可以在首页补齐必要信息并进入首次生成。
- 链接不可读取时，允许上传视频文件或手动粘贴脚本。
- 未选择商品 / 服务 / 优惠、人物或语言时不能开始最终生成，并明确指出缺失项。

### F2｜My Brand：门店品牌与 Offer 工作区

#### 目标

将每次生成都会使用的信息沉淀为可复用资产，避免重复上传和反复填写。

#### 子模块

| 子模块 | 核心字段 / 能力 |
|---|---|
| Overview | 品牌名称、国家/城市、门店地址、语言、团队成员、主要转化目标 |
| Offers | 名称、类型（商品 / 服务 / 优惠 / 活动）、行业、图片/视频、核心卖点、适用场景、价格、证明材料、落地页 URL |
| Avatars | 已批准 AI 演员、老板克隆、使用语言、授权状态、使用范围 |
| Voices | 声纹名称、语言、声音风格、样音、默认用途、授权状态 |
| Asset Library | 商品图、服务实拍、优惠视觉、Logo、门店图、案例、证言、参考视频和文档 |
| Brand Kit | Logo、主色、字体、品牌语气、禁用表达、默认 CTA 和字幕样式 |

#### 关键要求

- 模板、Agent、Canvas 和 Creative Service 必须调用同一份 My Brand 数据。
- Offer 必须支持从 URL 导入和手动新建，并兼容商品、服务、优惠和活动四种类型。
- 修改品牌信息后，不自动改变已发布内容；只影响新任务和未锁定草稿。
- 所有资产需保存来源、上传者、权利声明和创建时间。

### F3｜Assets：素材库

| 编号 | 功能 | 详细要求 |
|---|---|---|
| F3-01 | 多类型上传 | 图片、视频、Logo、音频、PDF 和 URL 参考 |
| F3-02 | 资产分类 | Offer、Reference、Source Footage、Generated、Brand、Voice |
| F3-03 | 搜索筛选 | 按类型、Offer、行业、项目、语言、人物、状态和创建时间筛选 |
| F3-04 | 生成关系 | 记录每个产物使用了哪些源素材、模板、模型和工作流版本 |
| F3-05 | 复用入口 | 可从 Assets 直接发起 Agent、Template 或 Viral Canvas 任务 |

### F4｜AI Agent：图片与视频创作入口

#### 产品结构

AI Agent 只保留两种主要产物：**Image** 与 **Video**。脚本、翻译、背景处理、声纹和数字人作为任务内的能力，不单独拆成大量一级工具。

#### 输入区

- 文字 Brief。
- 关联商品、服务、优惠或品牌资产。
- 图片 / 视频参考素材。
- 产物类型：Image / Video。
- 模型策略：Auto、Best Quality、Fast、Offer Fidelity。
- 任务去向：Chat / Canvas。

#### Chat 模式

- 使用 Codex 风格任务界面展示当前任务、历史任务和所属项目。
- Agent 必须明确展示处理步骤：读取品牌 → 创意方向 → 生成变体。
- 生成后展示预览、规格、语言和投放平台。
- 支持继续对话修改，例如“保留 Hook，换西班牙语老板声纹”。
- 支持 `Continue in Canvas` 将任务转为可视化工作流。

#### Canvas 模式

- 发送 Brief 后直接生成 Viral Canvas 的初始节点和连接。
- Offer、参考素材、语言和人物作为独立可编辑节点。

#### 灵感区

- 仅保留 All、Video、Image 筛选。
- 示例方向至少包含老板口播、商品 / 服务场景图、爆款复刻。
- 点击 `Use direction` 后回填 Prompt 和产物类型，不直接开始扣费生成。

### F5｜Templates：爆款短视频模板库

#### 目标

把验证有效的创意结构转化为可搜索、可预览、可复刻、可进入画布的运营资产。

#### 模板分类

- Essentials
- UGC Ads
- Animated Ads
- Product Demos
- Before & After
- Saved

#### 行业筛选

- 模板页在内容类型之下提供横向可滚动的行业筛选，默认 `All industries`。
- 首版包含餐饮、美业、建材家居、健身、宠物、教育、汽车服务、健康与康养、零售、亲子、婚庆活动、酒店旅行、咖啡烘焙、服装、摄影和娱乐 16 个行业。
- 行业筛选只改变模板、推荐 Offer 字段、人物建议和默认 CTA，不改变底层工作流。
- 同一模板结构可以跨行业复用，但必须生成独立的行业版本，避免向门店老板展示不相关的术语和示例。

#### 模板卡片

- 封面或视频首帧。
- 模板名称、时长、类型、适用人物、模型建议。
- 浏览数与使用数；若为演示数据必须标记 `Demo`。
- 收藏、Preview 和 Recreate。

#### Preview

- 可播放模板视频。
- 展示模板核心结构、建议输入和输出规格。
- 支持切换 Preview / Workflow。

#### Recreate

- 从 My Brand 自动填充 Offer 与品牌规范。
- 支持手动上传商品、服务或优惠素材。
- 配置 Video Theme、Character、Language、CTA。
- 生成前展示预计 Credits、时长和输出数量。
- 点击生成后创建 Project Task，并提供状态与失败重试。

#### Open in Viral Canvas

- Workflow 预览为只读。
- 点击后复制一份独立的可编辑工作流，不修改模板源文件。
- 新工作流保留 `source_template_id` 和 `source_template_version`。

#### 模板运营要求

- 模板必须配置行业、适用 Offer 类型、目标市场、语言、平台、内容结构、必要输入、推荐人物、默认 CTA 和输出规格。
- 模板必须有版本号；历史项目继续引用原版本。
- 运营可上下架模板，但不得删除已被客户使用的模板版本。

### F6｜Viral Canvas：无限画布与爆款复刻工作流

#### 默认工作流

```text
Viral Reference
├── Extract Winning Script ──→ Rewrite for Market ──→ Generate Variants
└── Add Your Offer ──────────→ Choose Avatar ───────→ Generate Variants
```

#### 默认节点

| 节点 | 输入 | 输出 |
|---|---|---|
| Viral Reference | TikTok / Reels / Facebook URL 或上传视频 | 可分析的视频文件与元信息 |
| Structure Analysis | 视频、字幕、画面与节奏 | Hook、Proof、CTA、镜头结构、时长 |
| Offer | My Brand 商品 / 服务 / 优惠 / 活动或上传素材 | 卖点、图片、证明、价格和优惠 |
| Rewrite / Localize | 内容结构、Offer、行业、市场与语言 | 新脚本、字幕和本地 CTA |
| Avatar & Voice | AI 演员 / 老板克隆、声纹、语言 | 口播人物和音频配置 |
| Generate Variants | 所有上游结果 | 多条指定比例、语言和平台的成片 |

#### 画布能力

- 无限平移、缩放、MiniMap 和缩放控制。
- 节点可拖动、复制、删除和连接。
- 支持添加文本、图片、视频、音频、数字人、脚本和生成节点。
- 支持分支生成，例如同一脚本连接三个演员或三个 Hook。
- 支持一键运行全部、从指定节点运行和只重跑失败节点。
- 显示节点耗时、Credits、状态、输入输出和错误原因。
- 自动保存，并保留工作流版本和运行记录。
- 模板复制、Agent Brief 和首页向导均可进入同一画布格式。

#### 复刻合规

- 不保留原品牌 Logo、人物身份、商标、音乐和受保护文案。
- 输出脚本必须经过重新表达，并替换为客户自己的 Offer 和证明。
- 对无法确认使用权的音乐、素材和人物给出警告。

### F7｜AI Avatars：演员库与老板克隆

#### 演员库

- 按语言、性别、年龄、角色、行业、拍摄风格和收藏筛选。
- 演员卡片展示短视频预览、语言、角色和清晰度。
- 选择演员后可保存为 My Brand 已批准演员。

#### 老板本人克隆

```text
上传 2–5 分钟清晰视频
      ↓
身份和授权确认
      ↓
声音使用授权
      ↓
生成 Avatar + Voice Profile
      ↓
Owner 审核样片
      ↓
仅在指定 Workspace 激活
```

#### 合规要求

- 必须保存授权主体、授权时间、授权范围、样本文件和撤销记录。
- 未通过授权审核不得生成正式内容。
- 用户撤销后立即禁止新生成，并提供历史产物处理选项。
- 所有老板克隆内容需可追溯到授权记录。

### F8｜Projects：任务与产物

每个 Project 包含：

- 项目名称、品牌、Offer、行业、市场、语言和目标平台。
- Agent 对话、模板任务、Canvas 工作流和 Creative Service Brief。
- 输入素材、生成产物、版本、审核状态和下载记录。
- 渠道发布 ID 与 Performance 数据。

状态统一为：

```text
Draft → Ready → Queued → Generating → Review → Approved → Published
                                  ↘ Failed / Cancelled
```

审核支持：批准、拒绝、文字批注和带时间点的视频批注。

### F9｜Creative Service：人工视频外包业务

#### 定位

Creative Service 是由 VertensAI 创意团队代客户完成策略、脚本、本地化、数字人指导、AI 生成和最终剪辑的服务，不是另一个自助生成器。

#### 页面必须包含

- 服务价值与交付方式。
- 可播放的跨行业线下门店样片，并明确标注 `Demo Sample` 或真实案例来源。
- 典型方向：老板教育口播、商品或服务证明、前后对比、问题—解决方案和限时到店优惠。
- Creative Sprint Brief。
- 制作人对接、审核和交付状态。

#### Brief 字段

- 品牌、行业与 Offer。
- 国家、城市、语言和目标客户。
- 目标：有效 WhatsApp 对话、预约到店、询价或成交。
- 参考视频或模板。
- 数量、时长、比例和目标平台。
- 是否使用老板克隆或 AI 演员。
- 优惠、证明材料、合规限制和交付日期。

#### 交付要求

- 首批方向先审核，再批量生产。
- 每个成片保留关联工作流，方便客户复用。
- 服务产物进入 Projects、Assets 和 Performance，不形成孤立文件。

### F10｜Social Accounts：社媒与结果数据连接

| 数据源 | 一期数据范围 |
|---|---|
| Meta Ads | Campaign、Ad Set、Ad、Creative、Spend、Impressions、Clicks、Leads |
| TikTok | Organic / Paid Post、Creative、Spend、Views、Clicks、Leads |
| WhatsApp Business | 对话发起、有效对话标签、首次响应时间、预约状态 |
| Lead / CRM | Lead ID、来源、有效性、预约、报价、成交、收入 |

要求：

- 首次接入采用只读权限。
- 清楚展示连接账户、同步范围、最近同步时间和异常状态。
- 支持手动 CSV 导入作为 API 接入前的 MVP 方案。
- 支持账号断开和数据删除申请。

### F11｜Performance：数据资产与创意判断

#### 核心指标

| 指标 | 定义 |
|---|---|
| Qualified Leads | 被人工或规则确认具有真实需求的咨询数 |
| Cost per Qualified Lead | 广告花费 ÷ Qualified Leads |
| Appointments Booked | 已确认日期和联系方式的到店/线上预约数 |
| Appointment Rate | Appointments ÷ Qualified Leads |
| Attributed Revenue | 在约定归因窗口内与 Creative / Campaign 关联的成交收入 |
| Creative Win Rate | 达到客户 CPL 或预约目标的 Creative 数 ÷ 已测试 Creative 数 |

#### 页面能力

- 选择时间范围、市场、行业、平台、Offer 和 Campaign。
- 展示有效线索、有效线索成本、预约和归因收入。
- 查看花费与线索质量趋势。
- 按有效线索效率排序 Creative。
- 展示各数据源连接状态。
- Performance Agent 基于客户自己的数据给出可解释建议。
- 点击 `Create Variants` 将优秀 Creative 的结构发送至 Agent 或 Canvas。

#### 数据可信度要求

- 演示环境的所有结果数字必须标记 `Demo Data`。
- 平台指标、人工确认和 CRM 数据使用不同来源标签。
- 收入归因必须显示窗口和规则，不得将相关性直接表述为因果关系。
- 数据不足时只展示事实，不生成确定性结论。

---

## 7. 核心数据模型

| 实体 | 关键字段 |
|---|---|
| Workspace | id、name、market、timezone、languages、owner_id |
| Brand | name、location、positioning、tone、default_cta、brand_kit |
| Offer | name、type（product / service / promotion / event）、industry、category、url、images、videos、selling_points、proof、price、cta |
| Asset | type、source、rights_status、offer_id、project_id、metadata |
| Avatar | type、actor_id / owner_id、languages、consent_id、status |
| Voice | voice_id、owner、language、style、consent_id、status |
| ViralReference | source_url、platform、media、transcript、rights_note |
| Template | industry、category、offer_types、default_cta、version、structure、required_inputs、status、metrics_scope |
| Workflow | source_type、source_id、nodes、edges、version、owner、status |
| WorkflowRun | workflow_version、started_at、credits、node_runs、result |
| Creative | media_url、format、language、duration、offer_id、industry、workflow_run_id |
| Project | objective、market、industry、offers、members、tasks、status |
| ChannelAccount | platform、account_id、permissions、sync_status |
| CampaignCreativeMap | creative_id、platform_creative_id、campaign_id |
| LeadOutcome | lead_id、creative_id、qualified、appointment、revenue、source |
| PerformanceSnapshot | date、creative_id、spend、views、clicks、leads、outcomes |
| ServiceBrief | scope、quantity、deadline、producer_id、review_status |

关键关联：

```text
Brand → Offer / Asset / Avatar / Voice
Template / Agent Brief → Workflow → WorkflowRun → Creative
Creative → Platform Creative ID → Campaign → LeadOutcome
ServiceBrief → Project → Workflow / Creative → Performance
```

---

## 8. 状态、异常与降级

| 场景 | 产品处理 |
|---|---|
| 外部视频链接不可读取 | 提示可能原因，允许上传文件或粘贴脚本 |
| 视频无语音或无法识别 | 允许手动填写文案，继续分析画面和节奏 |
| Offer 信息不足 | 阻止最终生成，明确提示缺少图片、卖点、价格或 CTA |
| 数字人未授权 | 只允许预览授权流程，不允许正式生成 |
| 模型生成失败 | 保留已完成节点，支持单节点重试和切换模型 |
| Credits 不足 | 在运行前提示预计消耗，不启动部分任务 |
| 渠道同步中断 | 保留历史数据，标记最后同步时间并支持重新授权 |
| 无法完成 Creative 归因 | 数据进入 Unmatched 队列，支持人工匹配 |
| Performance 数据不足 | 不生成强结论，只展示样本量和建议继续测试 |

---

## 9. 埋点与指标体系

### 9.1 北极星指标

> **每个活跃 Workspace 每月由 VertensAI Creative 带来的 Qualified Leads。**

在尚未接入结果数据的早期阶段，使用“已发布并进入投放测试的 Creative 数”作为临时代理指标，但不得代替最终结果指标。

### 9.2 漏斗指标

| 阶段 | 指标 |
|---|---|
| 获客 | 注册成本、合格门店线索成本、Demo 预约率 |
| 激活 | Brand 完成率、首个 Offer 添加率、首次生成时间、向导完成率 |
| 生产 | 模板预览率、Recreate 率、生成成功率、平均变体数、审核通过率 |
| 发布 | 下载率、发布率、连接广告账户率、Creative 匹配率 |
| 结果 | CTR、CPC、Qualified CPL、预约率、成交率、收入 |
| 留存 | 周活跃 Workspace、月度复刻次数、模板复用率、Creative Service 复购率 |
| 传播 | 邀请团队成员率、案例授权率、客户推荐率 |

### 9.3 关键事件

- `brand_created`
- `offer_imported`
- `viral_url_submitted`
- `viral_analysis_completed`
- `template_previewed`
- `template_recreated`
- `template_opened_in_canvas`
- `agent_task_started`
- `workflow_run_started`
- `workflow_run_completed`
- `avatar_selected`
- `owner_clone_consent_completed`
- `creative_approved`
- `creative_published`
- `social_account_connected`
- `lead_marked_qualified`
- `appointment_booked`
- `performance_variant_created`
- `service_brief_submitted`

所有事件至少包含：`workspace_id`、`user_id`、`project_id`、`creative_id`（适用时）、`source`、`timestamp` 和 `market`。

---

## 10. 非功能需求

### 10.1 性能

- 常规页面首次可交互时间目标 ≤ 3 秒。
- 素材库使用分页或虚拟列表，避免一次加载全部视频。
- 长任务异步执行，刷新页面后状态不丢失。
- 画布支持至少 100 个节点仍可正常缩放和拖动。

### 10.2 可靠性

- Workflow 和 Project 自动保存。
- 所有外部模型调用具备超时、重试、幂等和成本记录。
- 生成失败不得重复扣费；部分成功按节点结算并可追溯。

### 10.3 安全与隐私

- 渠道 Token、克隆样本、声纹和客户线索加密保存。
- Workspace 数据严格隔离。
- 关键操作保留审计日志。
- 支持导出和删除 Workspace 数据。

### 10.4 本地化

- 产品界面首发英语，系统架构支持多语言文案。
- 内容生成首发英语和西班牙语。
- 日期、货币、单位、字幕和 CTA 根据市场配置。

### 10.5 可访问性

- 主要交互支持键盘操作和可见焦点。
- 图标按钮提供 aria-label 或 Tooltip。
- 状态不能只依靠颜色表达。

---

## 11. MVP 实施顺序

本版本的功能结构完整，但研发不应同时把所有模块做成重型系统。实施顺序遵循“先服务验证，再工具化，再数据放大”。

### 阶段 1｜内部交付 MVP（第 1–4 周）

优先实现：

- My Brand 的品牌、Offer、行业、素材和老板授权。
- Creative Service Brief 与 Projects。
- Templates 基础库、爆款链接导入和结构拆解。
- 内部可用的 Agent 与 Viral Canvas。
- 手工/CSV 录入投放结果。

执行要求：界面可以覆盖 16 个行业，但种子客户验证最多同时选择 3 个行业，每个行业采用同一套内容—线索—预约口径，避免团队在验证期过度分散。

成功标准：完成 5–10 家种子门店交付，并形成可公开的真实案例数据。

### 阶段 2｜客户协作与复用（第 5–8 周）

优先实现：

- 首页四步向导。
- 模板 Preview / Recreate / Open in Viral Canvas。
- 数字人演员库与老板克隆授权流程。
- 客户审核、批注、下载和重复生成。

成功标准：客户可独立完成基础复刻，第二次交付工时明显下降。

### 阶段 3｜Performance 闭环（第 9–12 周）

优先实现：

- Meta、TikTok、WhatsApp 与 CRM/CSV 数据对齐。
- Creative ID 与结果匹配。
- Qualified CPL、预约和收入看板。
- Performance Agent 建议与一键变体。

成功标准：至少 3 个客户能够基于真实结果复刻优胜内容并愿意续费。

---

## 12. MVP 上线验收

### 12.1 端到端验收场景

门店老板或运营人员必须能够完成：

1. 创建品牌，填写市场、语言、门店地址和 WhatsApp 预约目标。
2. 添加一个商品、服务、优惠或活动，并填写图片、卖点、价格、证明材料和 CTA。
3. 粘贴一个可访问的爆款视频链接，或选择一个模板。
4. 查看结构分析并完成门店化脚本改写。
5. 选择 AI 演员，或选择已经授权的老板克隆与声纹。
6. 生成至少 3 个 9:16 短视频变体。
7. 在 Project 中预览、批注、批准并下载或发布。
8. 连接或导入 Meta / TikTok 花费，以及 WhatsApp / CRM 结果。
9. 在 Performance 中查看素材级 Qualified CPL。
10. 从获胜素材创建下一批变体。

### 12.2 上线门槛

| 维度 | 门槛 |
|---|---|
| 可用性 | 80% 目标用户无人工培训可完成首页首次生成 |
| 稳定性 | 核心生成流程成功率 ≥ 95%，失败可恢复 |
| 质量 | 种子客户首轮审核通过率 ≥ 70% |
| 数据 | Creative 与平台素材匹配率 ≥ 90% |
| 结果 | 至少 3 个客户具备可核验的有效对话或预约结果 |
| 复购 | 至少 30% 完成试点的客户愿意继续购买月度内容或工具 |
| 合规 | 老板克隆、声纹和参考内容均具备授权与追溯记录 |

---

## 13. 待评审问题

1. 第一个滩头市场具体选择哪个国家、语言，以及哪 2–3 个线下行业？
2. MVP 的主要成交产品是 Creative Service、软件订阅，还是二者组合？
3. 免费试点、付费试点和正式套餐分别包含多少条视频与多少次测试？
4. 爆款视频的抓取、下载与结构分析采用何种合规方案？
5. 老板克隆和声纹能力由自研还是第三方供应商提供？
6. Meta、TikTok、WhatsApp 和 CRM 中，哪两个接口必须在首批客户上线前完成？
7. Qualified Lead 的业务口径由客户标注，还是由统一规则判断？
8. 归因窗口和多触点情况下的收入归属规则是什么？
9. Credits 如何对应模型成本、重试、视频时长和不同质量档位？
10. 哪些真实案例可以获得客户授权并用于模板和对外营销？

---

## 14. 版本结论

VertensAI V2.1 的核心不是“提供最多的 AI 工具”，而是把一个跨行业但结果一致的门店获客过程产品化：

> **找到有效内容结构 → 变成客户自己的 Offer、人物和本地 CTA → 批量测试 → 识别真实结果 → 继续复刻。**

Creative Service 负责在项目早期获得真实案例和 SOP；AI Agent、Templates、Viral Canvas、My Brand 与 AI Avatars 负责降低交付成本；Performance 与 Social Accounts 负责把内容生产转化为客户数据资产和持续复购能力。

只要产品始终围绕这条闭环迭代，VertensAI 就不是一个容易被复制的通用生成工具，而会逐步形成“行业模板、真实案例、工作流、客户品牌资产与效果数据”共同构成的壁垒。
