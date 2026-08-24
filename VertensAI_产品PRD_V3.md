# VertensAI 产品需求文档（PRD V3.3）

| 项目 | 内容 |
|---|---|
| 产品名称 | **VertensAI** |
| 文档版本 | **V3.3｜账号体检入口 × 门店内容经营闭环版** |
| 更新日期 | **2026-08-24** |
| 文档状态 | 最新原型基线 / 产品、研发、运营评审稿 |
| 产品形态 | 面向海外线下门店的 AI 短视频生产、发布与获客数据工作台 |
| 当前原型 | `main` 分支 |
| 默认语言 | 英文；支持中文切换 |

> 本文基于 2026-08-24 对当前 `main` 原型的逐页复核更新，只保留已确认的产品定位、流程和功能。Offer、Plus 档、独立 Projects 菜单、邀请成员、审批流、Google 人脸认证和泛 AI 工具平台等旧设计，不再作为当前产品基线。

---

## 1. 一页结论

### 1.1 产品定位

> **VertensAI 是以“社媒账号体检”为入口，帮助海外线下门店持续生产并验证“老板数字人口播 + 门店真实实拍”短视频广告的营销工作台。**

门店先粘贴公开的 Facebook、Instagram 或 TikTok 企业主页，免费获得第一次账号体检。系统识别发布断档、门店资料、CTA、真人出镜、平台覆盖和历史变化，并把问题直接转化为可执行的品牌资料、30 天内容计划和短视频任务。老板只需录制一次 20 秒视频，即可建立自己的数字分身；VertensAI 再结合产品、门店实拍和服务过程持续生成本地化广告，并把发布、线索和到店结果关联起来。

VertensAI 当前不做泛 AI 创作平台，也不以模型数量作为主要卖点。产品首先解决四个明确问题：

1. **门店不知道自己的社媒账号哪里有问题、应该先改什么。**
2. **老板不知道每天应该讲什么。**
3. **真人无法持续出镜，拍摄与剪辑成本高。**
4. **内容发布后，门店不知道哪条视频真正带来咨询和到店。**

### 1.2 核心闭环

```text
粘贴公开社媒主页，完成第一次免费账号体检
                ↓
保存体检报告，识别最高优先级问题
                ↓
提取并确认 My Brand / Products / 门店资产
                ↓
Pro 生成 30 天营销日历；Lite 进入模板与直接创作
                ↓
创建老板数字人 / 选择自定义数字人
                ↓
从最新体检、营销日历、模板或爆款链接获得脚本
                ↓
选择产品、数字人、门店实拍和生成模型
                ↓
AI Agent 或 Viral Canvas 生成短视频
                ↓
进入 Assets，选择一个账号即时或定时发布
                ↓
Performance / Leads 识别有效内容、账号、门店与成员
                ↓
30 天后重新体检，仅与自己的历史结果比较并进入下一轮
```

### 1.3 首要用户

- 在海外经营实体门店、展厅、工作室或本地连锁的老板。
- 负责门店内容、社媒账号和获客的运营成员。
- 管理多个门店、多个成员与多个社媒账号的企业管理员。
- 购买 VertensAI 人工广告制作服务的门店客户。

### 1.4 典型行业

首版模板覆盖但不限于以下行业：餐饮、美业、建材家居、健身、宠物、教育、汽车服务、健康康养、零售、亲子、婚庆活动、酒店旅行、咖啡烘焙、服装、摄影与娱乐。

底层工作流保持一致，行业只改变：

- 推荐模板与案例；
- 默认产品字段；
- 老板口播主题；
- 门店实拍建议；
- CTA 与结果指标。

### 1.5 产品原则

1. **老板信任优先**：数字人不是替代品牌人物，而是放大老板本人长期建立的信任。
2. **诊断先于生产**：先告诉门店当前问题和优先级，再把结论变成脚本、日历和创作任务。
3. **只与自己的历史比较**：不做竞品排名和虚构损失，使用连续体检报告验证真实改善。
4. **历史报告与行动计划分离**：历史报告保留当时数据和发现；行动计划只展示最新一版，避免执行冲突。
5. **真实素材证明**：成片优先采用“口播解释 + 产品 / 空间 / 服务过程实拍”的混剪结构。
6. **产品而非 Offer**：全站统一使用 Products，覆盖商品与服务；不再使用 Offers 作为用户可见名称。
7. **一个视频只发一个账号**：发布时只允许选择一个社媒账号，避免重复内容跨账号直接分发。
8. **门店是组织核心节点**：Team 以门店为单位管理成员、登录账号、社媒账号和获客绩效。
9. **创建即登录**：新增成员后直接生成可登录账号，不使用邀请流程。
10. **数据沉淀为资产**：体检、品牌、产品、数字人、内容、账号、门店、成员和获客结果必须可关联。

---

## 2. 版本分层与研发优先级

左上角只提供 Lite / Pro 两个紧凑的原型版本按钮。两个按钮居中显示，不保留已取消 Plus 档的空白。切换版本时，只显示该版本已规划的菜单。

### 2.1 Lite｜内容生产与基础发布

目标：让门店先通过账号体检看清问题，再在不建立专职内容团队的前提下完成品牌建立、数字人创建、内容生成、爆款复刻、多平台发布和线索总量查看。

包含：

- Home 账号体检、历史报告与月度经营概览
- My Brand、Assets、AI Avatars
- AI Agent、Templates、Viral Canvas
- Publishing、Social Accounts
- Leads（只显示线索总量，不显示内容、成员与跨店归因）
- 门店、成员、社媒账号和发布渠道数量不限

### 2.2 Pro｜可管理、可归因的经营系统

目标：把“会生成内容”升级为“能管理内容经营并看见到店结果”。

在 Lite 基础上新增：

- Marketing Calendar：30 天营销日历与可编辑文案
- Team：Shop、成员登录、社媒账号绑定与管理员代发布
- Performance：效果分析看板
- Leads 完整归因：内容级、成员级与跨店对比
- 数据导出 / API

### 2.3 版本与计费规则

- 只保留 Lite / Pro 两个 SKU；10 店以上或私有部署作为 Custom 商务方案，不增加第三个产品开关。
- 两档都不限门店、成员、社媒账号和发布渠道。
- 两档都可按 credits 使用 Seedance，不设独立月度时长上限。
- 第一次账号体检免费，无需注册或输入密码；后续每次体检消耗 50 credits。
- 体检只读取用户主动提交的公开企业主页信息，不要求社媒账号 OAuth。
- Lite 的升级引擎是“已看见线索总量，但看不见具体归因”；Pro 解锁完整归因。
- 切换到 Lite 时，如当前页面属于 Pro，自动返回 Home。

---

## 3. 最新信息架构

```text
Workspace
├── Home                         Lite
├── My Brand                     Lite
├── Assets                       Lite
└── AI Avatars                   Lite

Create
├── AI Agent                     Lite
├── Templates                    Lite
└── Viral Canvas                 Lite

Growth
├── Leads                        Lite 预览 / Pro 完整归因
└── Performance                  Pro

Operate
├── Marketing Calendar           Pro
├── Publishing                   Lite
├── Social Accounts              Lite
└── Team                         Pro
```

### 3.1 左侧导航交互

- 默认可固定展开。
- 折叠状态下，鼠标悬停以弹层形式显示完整菜单。
- 点击固定按钮后，菜单保持展开，不再自动收回。
- 收起时保留图标、当前选中状态和 Tooltip。
- 账号入口位于左下角；点击后打开账号菜单。
- Team 位于 Operate 分组末尾，仅 Pro 可见。
- Human Admaker 不作为功能菜单出现；以一行独立广告入口放在主菜单滚动内容的末尾。
- 广告入口不固定，只有滚动到菜单最底部才可见；展开侧栏时仅显示“Human Admaker”一行，折叠时显示紧凑服务图标。
- 点击该入口进入 Human Admaker 服务页。

### 3.2 账号菜单

账号菜单包含：

- 用户名与邮箱；点击进入个人中心。
- 使用情况。
- Upgrade plan / 升级套餐；点击进入独立 Plan 页面。
- Light / Dark 图标切换。
- English / 中文选择框。
- Help Center。
- Log out。

点击空白区域后账号菜单自动收起。

### 3.3 全局视觉要求

- 海外简洁 SaaS 风格。
- 白底为默认主题，蓝色为主强调色。
- 支持全站 Light / Dark Mode。
- 不允许出现双层头部。
- 全站字号、按钮高度、边框、圆角和间距保持统一。
- 不出现过小的说明文字。
- 弹窗点击遮罩可关闭；破坏性操作除外。

---

## 4. 核心用户流程

### 4.1 新用户首次启动

```text
进入 Home
      ↓
粘贴 Facebook / Instagram / TikTok 公开企业主页
      ↓
第一次免费体检，无需注册或密码
      ↓
分析六类问题并生成可保存的体检报告
      ↓
提取品牌、Products、门店资料与内容素材 → 用户确认 My Brand
      ↓
  ├── Lite：打开最新修复动作 → Templates / AI Avatars / Social Accounts
  └── Pro：基于最新报告生成 30 天营销日历
      ↓
创建数字人
  ├── 克隆自己：授权 → 录制 20 秒 → 质量检查 → 生成 → 保存
  └── 自定义数字人：基础人物 → 人物属性 → 场景着装 → 语言声音 → 预览 → 保存
      ↓
进入 My avatars → Create with avatar → Agent 显示选中标签
      ↓
完成第一条内容并发布；30 天后再次体检
```

### 4.2 月度账号体检与复盘

```text
Home 提示到期 → Run checkup（50 credits）
      ↓
读取最新公开主页数据并保存新报告
      ↓
仅与该门店自己的上一期报告比较
      ↓
展示当前健康分、六类发现、变化趋势和三个优先动作
      ↓
打开最新行动计划 → 修复品牌资料 / 账号连接 / 模板 / 数字人 / 日历
      ↓
进入下一轮内容生产、发布和线索验证
```

### 4.3 从营销日历生产短视频

```text
打开 Marketing Calendar
      ↓
切换 List / Calendar
      ↓
点击某一天的内容
      ↓
弹窗预览标题、Hook、正文、CTA 和建议画面
      ↓
Create in Agent
      ↓
完整脚本自动带入 Agent 对话框
      ↓
选择 Product + Avatar + Model → 生成
```

### 4.4 从模板复刻

```text
Templates
  ├── 选择推荐模板 → Preview → Recreate
  └── 粘贴 TikTok / Instagram / Facebook 视频链接
        → 弹窗分析文案与结构
        → 改写
        → 保存为自定义模板

Recreate
  ├── 直接进入简化生成工作流
  └── Open in Viral Canvas → 复制为可编辑画布
```

### 4.5 发布

```text
从 Assets 或 Publishing 选择一个视频
      ↓
选择一个已连接账号
      ↓
即时发布 / 定时发布
      ↓
进入发布队列
      ↓
右上角动态队列按钮查看状态
```

### 4.6 多门店团队管理

```text
Team → Add shop
      ↓
选择门店 → Add member
      ↓
填写姓名、登录邮箱、角色与权限
      ↓
直接创建可登录账号，无邀请步骤
      ↓
在成员详情绑定 Facebook / Instagram / TikTok 账号
      ↓
管理员可选择该账号进入 Publishing
```

---

## 5. 功能需求

## F1｜Home

### 目标

Home 是 VertensAI 的获客入口与月度经营入口：新用户先完成公开社媒账号体检，已激活用户查看经营概览、历史报告、最新问题和下一步动作。数字人、品牌、模板和日历均由体检结果直接引导，而不是在首页平铺为通用工具导航。

### 页面结构

1. **Onboarding｜第一次免费体检**
   - 标题明确表达“免费账号体检”，不使用泛 AI 创作口号。
   - 输入一个公开的 Facebook、Instagram 或 TikTok 企业主页 URL。
   - 明确说明：第一次免费、无需注册、无需密码、不连接私有账号。
   - 展示六项检查：发布断档、门店资料完整度、CTA、真人内容、平台 / 账号覆盖、相对上次的变化。
   - 体检完成后依次引导：提取品牌资产 → 获得内容计划 → 创建老板数字人和真实素材内容 → 绑定到店结果。

2. **Checkup progress｜分析过程**
   - 使用弹窗或全屏步骤反馈，不在首页挤压主体内容。
   - 展示当前检查项、总体进度和可取消状态。
   - 第一次体检不得显示扣除 50 credits；第二次起在提交前显示预计扣除 50 credits。

3. **Checkup result｜最新报告**
   - 展示账号健康分、关键指标、六类发现和最多三个优先动作。
   - 每个发现提供直接修复入口，可进入 My Brand、Templates、AI Avatars、Social Accounts、Team 或 Marketing Calendar。
   - Pro 可从最新报告生成 30 天营销日历；Lite 点击该能力进入 Plan。

4. **Operating｜已激活用户概览**
   - 展示本月 Posts、Reach、Conversations、Accounts publishing 和 Pro 的 Store visits。
   - 显示距离上次体检的天数、是否到期、`Run checkup` 和报告历史入口。
   - 展示最近报告与上一期的变化，但不得出现竞品排名、行业百分位或虚构的损失金额。

5. **Report history｜历史报告**
   - 每次体检都保存为独立报告，不覆盖历史数据。
   - 历史报告只展示当时的数据、健康分和发现。
   - 行动计划只使用最新报告版本，历史报告不提供过期行动方案。

6. **原型状态开关**
   - 当前原型可在 Onboarding / Operating 间切换，仅用于演示与验收。
   - 正式产品不向用户暴露该开关；系统根据是否存在已完成体检报告自动决定页面状态。

### 验收

- 第一次体检无需登录即可开始，完成后再引导创建 Workspace。
- 第一次体检标记为 Free；后续体检提交前明确显示 50 credits。
- 六类检查均有完成、失败和无法读取状态。
- 每次完成体检均新增历史报告，并正确计算与自己上一次报告的变化。
- 历史报告不展示旧行动计划；最新报告可直接进入对应修复功能。
- 首页不展示大面积通用工具导航，也不以模型或工具数量作为首屏卖点。

---

## F2｜My Brand

### 目标

沉淀所有内容生产共用的品牌资产。

### 标签页

| 标签 | 内容 |
|---|---|
| Overview | 品牌名称、行业、城市、市场、语言、语气、目标客户、CTA |
| Products | 商品或服务名称、图片、卖点、价格、证明、URL、目标动作 |
| Avatars | 专属数字人、授权状态、语言和适用范围 |
| Voices | 声纹、语言、风格、样音和授权状态 |
| Asset Library | 品牌图片、视频、门店素材、案例和 Logo |
| Brand Kit | Logo、颜色、字体、字幕规范、语气和禁用表达 |

### Social Profile Import

- 主入口由 Home 账号体检触发，My Brand 保留再次导入和手动补充入口。
- 以弹窗向导完成，不在页面中长期占据大面积空间。
- 三步：Import / Check profile → Review My Brand → Lite 保存品牌 / Pro 创建营销日历。
- 体检提取的品牌名称、行业、城市、主页简介、联系方式、Products 和媒体素材自动预填到对应标签页。
- 自动提取结果必须允许用户确认和修改。
- URL 无法读取时允许手动录入。

---

## F3｜AI Avatars

### 产品结构

AI Avatars 顶部只保留两个并列入口：

1. `Clone yourself`：克隆老板本人，用于建立长期信任。
2. `Custom avatar`：选择基础人物并按市场、行业、风格进行定制，用于快速开始。

Home 的体检修复动作进入 AI Avatars 后，也必须由这两个入口开始，不直接默认进入任一流程。

### 3.1 Clone yourself 流程

| 步骤 | 界面与必填内容 | 完成条件 |
|---|---|---|
| 1. Consent | 展示本人授权、使用范围、可撤回说明与勾选框 | 用户主动勾选后才能继续 |
| 2. Record | 录制或上传不少于 20 秒视频；展示正面、光线、画面安静等引导 | 存在可用视频样本 |
| 3. Quality check | 预览录制样本，检查面部清晰、音频可用、人物居中和单人出镜 | 检查通过；不通过可重新录制 |
| 4. Generate & save | 显示生成中状态，完成后允许命名、预览与保存 | Avatar 状态为 Ready 并写入 My avatars |

补充规则：

- 当前版本不包含 Google 人脸认证。
- 生成失败时保留录制与授权状态，允许重试。
- 克隆成功后立即出现在 AI Avatars 的 `My avatars` 列表，并可直接进入 Agent 创作。

### 3.2 Custom avatar 流程

| 步骤 | 界面与必填内容 | 完成条件 |
|---|---|---|
| 1. Base person | 在授权演员库中选择基础人物 | 已选择一个基础人物 |
| 2. Person | 选择性别表达、年龄段和目标市场 | 三项属性完整 |
| 3. Look & scene | 选择发型、着装和门店场景 | 三项属性完整 |
| 4. Voice & save | 选择语言和声音风格，可播放样音，生成预览后保存 | 预览已生成，Avatar 状态为 Ready |

补充规则：

- 原 `Choose an AI actor` 统一改为 `Custom avatar`。
- 属性与预览结果必须作为可编辑配置保存，后续可重新编辑并生成新版本。
- 生成结果必须展示平台授权状态和可用范围。

### 3.3 My avatars 资产列表

- 同时展示本人克隆与自定义数字人，用明显标签区分 `Owner clone` / `Custom`。
- 每张卡片展示名称、类型、语言 / 声音、市场、状态和缩略图。
- 支持按类型、语言、性别表达、年龄、市场和行业筛选。
- `Create with avatar` 直接进入 AI Agent，并在输入框显示已选角色标签。
- 删除或撤回授权后，已完成内容保留审计记录，但不得再生成新内容。

### 3.4 流程验收

1. 未同意授权时，Clone 流程无法进入录制。
2. 录制完成后可进入质量检查，并可选择重录。
3. Clone 与 Custom 两条流程都能创建 Ready 状态 Avatar。
4. 每次保存后 My avatars 列表即时新增对应卡片。
5. 点击列表卡片的 `Create with avatar` 后，Agent 必须带入正确 Avatar ID 与选中标签。
6. 英文 / 中文切换后，两条向导的标题、说明、错误、按钮和状态全部切换。

### 合规

- 克隆自己必须保存授权主体、时间、范围和撤销记录。
- 自定义演员必须展示平台授权状态。
- 用户撤销后不得继续生成新内容。

---

## F4｜AI Agent

### 产品定位

Agent 是所有基础创作能力的统一入口，一级只区分 Video 与 Image。

### 输入框能力

- 文本 Brief。
- Add product。
- Choose avatar，并显示选中状态。
- Video / Image。
- 多模型选择。
- Chat / Canvas。
- 发送按钮。

聊天页面底部输入框必须拥有与首页 Agent 输入框相同的功能，不允许出现能力缺失。

### 模型选择

采用白底双层选择面板，支持以下厂商与模型：

- Seedance
- Kling
- MiniMax
- Vidu
- Wan
- Midjourney
- Google
- OpenAI

模型面板支持能力标签，例如参考图、文生视频、多图参考、首尾帧、视频编辑、视频延长等。

版本规则：Lite 与 Pro 都按 credits 使用可用的 Seedance、Kling 等模型，不以套餐锁定 Seedance；套餐差异来自 credits 数量、经营功能与归因深度。原型中如仍出现 Lite 锁定 Seedance 的状态，应视为待修复的实现偏差。

### Chat 模式

- 使用 Codex 风格任务界面。
- 页面高度铺满可视区域，不保留无意义底部空白。
- 对话按 Project 分组。
- 左侧二级栏以 Project → Thread 的层级展示。
- Project 只作为 Agent 内部的任务分组，不出现在全局一级菜单。
- 创建新 Project 时只保留一个 `New` 加号。

### Canvas 模式

- 将当前 Product、Avatar、模型、素材和脚本带入 Viral Canvas。
- 生成可编辑的工作流节点。

---

## F5｜Agent Projects（内部组织能力）

### 定位

Project 不是独立页面或全局菜单，而是 Agent 对话与创作任务的内部组织方式。

### 层级

```text
Project
├── Video task
├── Image task
├── Template recreation
└── Canvas workflow
```

### 要求

- Project 列表位于 Agent 二级侧栏，不放在底部。
- Project 可以展开或收起。
- 支持创建、重命名与切换 Project。
- 从营销日历、模板、数字人或素材进入 Agent 时，任务自动归入当前 Project；未选择时归入默认 Project。
- 不需要 Approval Workflow。

### 状态

```text
Draft → Queued → Generating → Ready → Published
                         ↘ Failed / Cancelled
```

---

## F6｜Templates

### 顶部结构

- `Templates` 标题与短视频链接分析入口位于同一行。
- 不显示 All、Essentials、UGC Ads、Animated Ads 等顶部内容分类栏。
- 链接输入支持 TikTok、Instagram 和 Facebook 视频。
- `Analyze` 打开弹窗，不在当前页面挤入分析结果。

### 模板库

- 展示大量跨行业短视频模板。
- 支持行业筛选、搜索和收藏。
- 点击封面打开预览弹窗。
- Hover 显示 Recreate。

### Preview / Recreate

- Preview 展示视频和工作流说明。
- Recreate 进入简化工作流，允许替换 Product、脚本、Avatar、Voice 和门店实拍。
- `Open in Viral Canvas` 复制模板工作流并在画布打开。

### 自定义模板

- 分析外部视频的 Hook、正文、CTA、节奏与镜头。
- 用户确认改写文案。
- 保存为只属于当前品牌的自定义模板。

---

## F7｜Viral Canvas

### 定位

Viral Canvas 是面向专业运营和内部团队的无限画布，用于爆款复刻和批量变体。

### 默认流程

```text
Viral Reference
      ↓
Script & Structure Analysis
      ↓
Rewrite for Brand and Market
      ↓
Product + Avatar + Voice + Store Footage
      ↓
Generate Variants
```

### 要求

- 支持无限平移、缩放、MiniMap 和节点连接。
- 节点支持文本、图片、视频、音频、脚本、数字人和模型生成。
- 支持模板复制、分支变体、单节点重跑和运行状态。
- Dark Mode 下必须使用黑底、深色节点和深色边框。
- 画布顶部不显示单独的 Viral Replication URL 分析栏；链接分析统一放在 Templates。

---

## F8｜Assets

### 页面结构

- 单层标题。
- 搜索：名称、标签、描述。
- Upload。
- Filter。
- 标签管理。
- 图片 / 视频卡片网格。
- 分页。

### 上传弹窗

- 点击上传或拖拽文件。
- 支持 JPG、PNG、MP4、MOV、AVI。
- 支持文件夹上传。
- 上传前选择 Draft / Ready。
- 支持添加标签。
- 展示文件选择预览、上传状态和成功提示。

### 预览与发布

- 点击播放按钮或整个卡片打开预览弹窗。
- 预览弹窗显示素材、状态、来源、比例和标签。
- Assets 内提供 Publishing 入口。
- 发布时把当前 Asset 带入 Publishing。

### Filter

- Asset Source：All / AI Generated / Local。
- Type：Image / Video。
- Aspect Ratio：9:16 / 1:1 / 4:5 / 16:9 / Other。
- Status：Draft / Ready。
- Date：Today / Last 7 Days / Last 30 Days / 自定义范围。

---

## F9｜Marketing Calendar（Pro）

### 目标

根据最新账号体检发现、My Brand 的 Products、目标市场、品牌语气和历史内容，自动生成一个月的内容策划。

### 内容策略

- 发布频次。
- 平台。
- 获客目标。
- Tone。
- 图片、轮播和视频比例。
- 每周增长主题。
- 同一 Workspace 只维护一份当前行动日历；从新报告重新生成前，提示保留或替换未完成内容。

### 视图

- Calendar View。
- List View。
- 两种视图使用同一份内容数据，可随时切换。
- 不设置独立 Content Brief 页面。

### 内容预览

- 点击日期或列表项打开弹窗。
- 弹窗展示短视频标题、Hook、正文、CTA、建议画面与平台。
- `Create in Agent` 必须把完整脚本和元数据带入 Agent 输入框。

---

## F10｜Publishing

### 原则

**同一条视频一次只能选择一个发布账号。**

### 流程

1. Choose Asset。
2. `View all` 打开弹窗，列出所有可发布视频。
3. 选择一个社媒账号。
4. 选择 Publish now 或 Schedule。
5. 确认发布。

### 发布队列

- 不在页面中长期占据大面积区域。
- 右上角显示动态队列按钮和待处理数量。
- 点击后弹出发布队列，展示排队、发布中、成功和失败。

---

## F11｜Social Accounts

### 目标

统一管理 Facebook、Instagram、TikTok 账号及发布授权。

### 要求

- 独立一级菜单。
- 按平台分组展示账号。
- 展示授权状态、账号类型和最近同步时间。
- 支持 OAuth 连接、重新授权和断开。
- 同一个账号可绑定至一个门店和一个 Team 成员。
- 管理员可从 Team 成员详情直接选择该账号发布。

---

## F12｜Team 与 Shop（Pro）

### 定位

Team 用于按门店管理成员、登录账号、社媒账号和获客绩效。

### 导航位置

- Team 位于全局左侧导航的 `Operate` 分组最后一项。
- Lite 不显示 Team；Pro 显示。
- 全局左侧导航只显示 `Team` 入口，不直接显示门店或成员。
- 门店树仅在 Team 页面内部出现。

### 组织结构

```text
Workspace
└── Shop
    └── Member
        └── Connected Social Account
```

### 左侧组织导航

- 只显示 `All shops` 与门店列表。
- 不在导航树中显示成员。
- 点击门店后，右侧切换到该门店的成员与绩效列表。
- 顶部 `+` 只用于新增门店。

### Add shop

- Shop name。
- City / Market。
- 创建成功后自动选中新门店。

### Add member

- Name。
- Login email。
- Role。
- Shop。
- Access。
- 创建后立即成为可登录账号，不发送邀请。

### Member details

- 编辑姓名、登录邮箱、角色、所属门店和权限。
- 展示 Ready to sign in。
- 绑定或解绑 Facebook、Instagram、TikTok 账号。
- 管理员可从成员行直接进入发布。

### 门店成员表

- Member。
- Connected accounts。
- Published。
- Qualified leads。
- Access。
- Publish action。

---

## F13｜Human Admaker（推广服务）

### 定位

人工策划与制作的门店短视频外包服务，原 `Creative Service` 统一改名为 `Human Admaker`。

Human Admaker 不属于 Workspace、Create、Operate 或 Growth 功能菜单，而是独立的商业服务推广入口。

### 套餐

> **每月 8 条广告 / 500 美金。**

包含：

- 人工内容策划。
- AI + 门店实拍混剪。
- 老板口播或数字人口播。
- 脚本、本地化与基础剪辑。
- 月度交付。

### 页面交互

- 入口是主菜单滚动内容末尾的一行独立广告入口，不固定，也不占用 Create 功能菜单。
- 入口仅显示 `Human Admaker` 一行，不使用大面积 Banner。
- 展示可播放的外包样片。
- `Start for $500/month` 打开联系表单。
- 表单包含姓名、电话和 WhatsApp。
- 页面同时提供 WhatsApp 按钮，允许直接联系官方。

---

## F14｜Plan 与 Upgrade plan

### 入口

- 账号菜单中的 `Upgrade plan / 升级套餐`。
- 个人中心中的 `Plan and billing / 套餐与账单`。
- `Upgrade plan` 使用独立一行菜单项，进入白底蓝色的套餐比较页。

### 计费切换

- 默认展示年付，并标注 `Save 50%`。
- 可切换月付 / 年付；年付金额为一次性支付。

### 套餐

| | Lite | Pro（推荐） |
|---|---:|---:|
| 月付 | $20 / 月 | $50 / 月 |
| 年付 | $120 / 年（$10 / 月） | $300 / 年（$25 / 月） |
| Credits | 1,200 / 月 | 3,600 / 月 |
| 增购 Credits | $12 / 1,000 | $10 / 1,000 |
| 门店 / 成员 / 社媒账号 / 渠道 | 不限 | 不限 |
| Seedance | 按 credits，不设上限 | 按 credits，不设上限 |
| 归因 | 只看线索总量 | 内容级、成员级、跨店 |
| Marketing Calendar / Team / Performance | — | 包含 |

- Pro 明确标注为推荐方案。
- 当前套餐显示 `Current plan / 当前套餐`，按钮不可重复点击。
- 点击其他套餐后更新全局 Lite / Pro 功能范围，并显示成功提示。
- 10 店以上或私有部署展示 Custom 联系入口，不作为第三个产品开关。
- 纯实拍合成不消耗 credits；月度赠送 credits 不结转，增购 credits 不过期。
- 账号体检首次免费，之后 50 credits / 次；分析失败不扣费。

---

## F15｜Performance 与 Leads（Lite 预览 / Pro 完整）

### Performance

- 连接 Meta、TikTok 等平台数据。
- 读取广告、内容、花费和互动表现。
- 关联 Product、Creative、Account、Shop 与 Member。
- 识别获胜 Hook、人物、产品和内容结构。
- 提供可解释建议，并可发送至 Agent 生成变体。

### Leads

- 记录客户来源、内容、账号、门店、成员和状态。
- 支持 WhatsApp、表单、QR Code 和 CRM / CSV。
- 核心指标：Qualified Leads、Appointments、Sales、Attributed Revenue。
- 数据不足时标注样本量，不输出确定性结论。
- Lite 只展示线索总量；内容、成员和跨店维度显示打码预览与升级 Pro 入口。
- Pro 解锁完整明细、Performance 分析、导出与 API。

---

## 6. 角色与权限

| 角色 | 主要权限 |
|---|---|
| Workspace Owner | 管理品牌、门店、成员、数字人授权、社媒账号、账单和全部数据 |
| Admin | 管理门店成员、账号绑定、内容、发布和数据；不可删除 Workspace |
| Creator | 创建内容、使用模板、管理分配的素材和 Agent Project |
| Viewer | 查看分配门店的数据和内容，不可生成或发布 |
| VertensAI Producer | 仅访问被分配的 Human Admaker 服务订单和素材 |

### 权限原则

- 成员账号由 Owner / Admin 直接创建。
- 当前版本没有 Invite Member 流程。
- 当前版本没有内容 Approval Workflow。
- 社媒账号授权凭证不向成员展示。
- 管理员代成员账号发布时必须记录操作者。

---

## 7. 核心数据模型

| 实体 | 关键字段 |
|---|---|
| Workspace | id、name、plan、timezone、languages、owner_id |
| Shop | id、workspace_id、name、city、market、address |
| Member | id、shop_id、name、email、role、access、login_status |
| Brand | id、workspace_id、name、industry、market、tone、default_cta、brand_kit |
| CheckupReport | id、workspace_id、shop_id、profile_url、platform、is_first_free、credit_cost、health_score、metrics、completed_at、status |
| CheckupFinding | id、report_id、category、severity、title、evidence、recommended_destination、status |
| CheckupActionPlan | id、report_id、version、priority_actions、is_current、created_at |
| Product | id、brand_id、name、type、url、media、selling_points、price、proof、cta |
| Avatar | id、brand_id、type（owner_clone / custom）、name、image、base_actor_id、gender_expression、age_range、market、hair、wardrobe、scene、language、voice_style、consent_id、rights_status、status |
| Voice | id、avatar_id、language、style、sample、consent_id、status |
| Asset | id、brand_id、product_id、project_id、type、source、status、ratio、tags、rights_status |
| Project | id、brand_id、shop_id、name、status；仅作为 Agent 内部任务分组 |
| Thread | id、project_id、type、title、status |
| Template | id、industry、structure、required_inputs、version、status |
| ViralReference | id、source_url、platform、transcript、analysis、rights_note |
| Workflow | id、source_type、source_id、nodes、edges、version、status |
| Creative | id、project_id、product_id、avatar_id、asset_url、format、language、duration、status |
| SocialAccount | id、platform、shop_id、member_id、handle、permissions、status |
| PublishJob | id、creative_id、account_id、schedule_at、operator_id、status |
| ContentPlan | id、brand_id、month、strategy、frequency、platforms |
| CalendarItem | id、content_plan_id、date、title、hook、body、cta、visual_direction、status |
| PerformanceSnapshot | id、creative_id、account_id、shop_id、member_id、date、spend、views、clicks、leads |
| Lead | id、creative_id、account_id、shop_id、member_id、source、qualified、appointment、revenue |
| ServiceOrder | id、brand_id、contact_name、phone、whatsapp、plan、status |

### 关键关联

```text
Workspace → Shop → Member → SocialAccount
Workspace → CheckupReport → CheckupFinding
Latest CheckupReport → Current CheckupActionPlan → My Brand / Calendar / Agent
Workspace → Brand → Product / Avatar / Voice / Asset
Brand → ContentPlan → CalendarItem → Agent Task
Agent Project → Thread → Workflow → Creative → PublishJob
Creative → SocialAccount → PerformanceSnapshot / Lead
```

---

## 8. 状态与异常

| 场景 | 产品处理 |
|---|---|
| 第一次体检 | 标记为 Free，不扣 credits；完成后再引导创建 Workspace |
| 后续体检 | 提交前展示 50 credits 预计消耗；余额不足时不启动 |
| 公开主页部分字段不可读 | 对每个检查项单独标记“无法读取”，报告仍可完成，不伪造结论 |
| 没有上一期报告 | 不展示趋势箭头或变化值，提示“首份基线报告” |
| 打开历史报告 | 只展示当时数据和发现；行动按钮统一跳转到最新行动计划 |
| 企业主页无法读取 | 提示原因，允许重试或手动填写 My Brand |
| 数字人录制失败 | 保留授权状态，允许重新录制，不创建不可用数字人 |
| 数字人未授权 | 禁止生成正式成片 |
| 外部视频无法分析 | 允许上传文件或手动粘贴脚本 |
| Product 信息不足 | 在 Agent 中提示补充素材、卖点或 CTA |
| 模型失败 | 保留已完成结果，允许重试或切换模型 |
| Credits 不足 | 生成前提示预计消耗，不启动任务 |
| 发布账号未授权 | 禁止提交发布，进入重新授权 |
| 发布失败 | 保留 Asset 与发布参数，可直接重试 |
| 无法归因 | 进入 Unmatched，允许管理员人工匹配 |

---

## 9. 埋点与核心指标

### 9.1 北极星指标

> **每个活跃门店每月由 VertensAI 内容带来的 Qualified Leads。**

### 9.2 激活指标

- 首次免费账号体检开始率。
- 首次账号体检完成率。
- 体检报告 → 修复动作点击率。
- 首个数字人创建率。
- 品牌主页导入率。
- My Brand 完成率。
- 首个 Product 创建率。
- 首份营销日历生成率。
- 首条视频生成时间。
- 首次体检完成 → 首条视频生成时间。

### 9.3 生产指标

- Calendar → Agent 转化率。
- Template Preview → Recreate 转化率。
- Agent 生成成功率。
- 平均每个任务变体数。
- Avatar 使用率。
- Assets 复用率。

### 9.4 发布与结果指标

- 社媒账号连接率。
- 视频发布率。
- 定时发布成功率。
- Qualified Leads。
- Cost per Qualified Lead。
- Appointment Rate。
- Creative Win Rate。
- 门店 / 成员 / 账号归因覆盖率。
- 30 天复检率。
- 复检后健康分和关键问题改善率。

### 9.5 关键事件

- `account_checkup_started`
- `account_checkup_completed`
- `account_checkup_failed`
- `checkup_report_opened`
- `checkup_history_opened`
- `checkup_finding_fix_opened`
- `checkup_calendar_created`
- `avatar_clone_started`
- `avatar_consent_confirmed`
- `avatar_recording_completed`
- `avatar_quality_check_passed`
- `avatar_created`
- `custom_avatar_base_selected`
- `custom_avatar_preview_generated`
- `custom_avatar_saved`
- `avatar_sent_to_agent`
- `brand_profile_imported`
- `brand_profile_confirmed`
- `marketing_calendar_created`
- `calendar_item_opened`
- `calendar_item_sent_to_agent`
- `product_selected`
- `avatar_selected`
- `agent_task_started`
- `creative_generated`
- `template_link_analyzed`
- `template_recreated`
- `template_opened_in_canvas`
- `asset_uploaded`
- `asset_previewed`
- `publish_job_created`
- `publish_job_completed`
- `shop_created`
- `member_account_created`
- `social_account_bound_to_member`
- `lead_marked_qualified`

---

## 10. 非功能需求

### 10.1 性能

- 常规页面首次可交互时间目标 ≤ 3 秒。
- Assets、Templates 使用分页、懒加载或虚拟列表；Agent 的 Project / Thread 树按需加载。
- 长任务异步执行，刷新后状态不丢失。
- Viral Canvas 至少支持 100 个节点正常缩放和拖动。

### 10.2 多语言

- 产品默认英文。
- 全站支持英文 / 中文切换。
- 所有菜单、按钮、弹窗、空状态、错误和 Toast 必须有双语文案。
- 日期、时区、货币和单位根据市场设置。

### 10.3 安全与隐私

- 数字人样本、声音、社媒 Token 与客户线索加密保存。
- Workspace 数据隔离。
- 保存数字人授权和撤销记录。
- 管理员代发布、账号绑定和成员变更保留审计日志。
- 支持导出与删除 Workspace 数据。

### 10.4 可访问性

- 主要操作支持键盘与明显焦点状态。
- 图标按钮具有 aria-label 或 Tooltip。
- 状态不只通过颜色表达。
- 弹窗支持 Esc 和遮罩关闭。

---

## 11. 最新实施顺序

### 第一阶段｜资产与人工验证

- Home 第一次免费账号体检、分析进度、最新报告与历史报告。
- 体检结论直达 My Brand、Templates、AI Avatars、Social Accounts 和 Pro Calendar。
- My Brand、Products、Assets。
- Clone yourself / Custom avatar。
- Human Admaker 服务交付。
- 用真实种子客户验证“老板口播 + 门店实拍”的获客效果。

### 第二阶段｜内容生产工具化

- AI Agent。
- Agent 内部 Project / Thread 分组。
- Templates 与短视频链接分析。
- Viral Canvas。
- Publishing 与 Social Accounts。

### 第三阶段｜门店团队协作

- Marketing Calendar。
- Shop。
- Team（位于 Operate 分组最后一项）。
- 成员直接登录账号。
- 成员社媒账号绑定。
- 管理员代发布。
- Performance 和完整 Leads 归因。

### 第四阶段｜数据深化

- 归因规则、CRM / API 与数据导出。
- Creative、Account、Shop、Member 跨店对比。
- 获胜内容判断、可解释建议与再生产。

---

## 12. MVP 上线验收

### 12.1 Lite 端到端验收

1. 新用户粘贴公开企业主页，无需注册完成第一次免费账号体检。
2. 系统保存首份报告，展示健康分、六类发现和优先动作，并把品牌资料预填到 My Brand。
3. 用户完成 Clone yourself 或 Custom avatar 任一流程。
4. 数字人出现在 My avatars，并可带入 Agent。
5. 用户从体检修复动作、Templates、爆款链接或 Agent 直接创建内容。
6. 用户选择 Product、Avatar 和模型。
7. 系统生成至少一条 9:16 短视频并保存至 Assets。
8. 用户选择一个已连接账号即时或定时发布。
9. Leads 显示线索总量，但不暴露内容、成员和跨店归因明细。
10. 第二次体检在提交前显示并正确扣除 50 credits，同时新增一份报告。

### 12.2 Pro 端到端验收

1. 用户从最新体检报告生成 30 天营销日历，可把完整脚本发送到 Agent。
2. Owner 创建两个 Shop，每个 Shop 创建至少两个可直接登录的成员账号。
3. 管理员为成员绑定社媒账号，并可从成员详情选择该账号进入 Publishing。
4. Creative 与发布账号、Shop、Member 关联。
5. Performance 能查看 Creative 级结果，Leads 显示完整内容级、成员级和跨店归因。
6. 用户可从获胜内容创建新的 Agent 任务。

### 12.3 上线门槛

| 维度 | 门槛 |
|---|---|
| 激活 | 70% 测试用户完成第一次免费账号体检 |
| 首次价值 | 50% 完成体检的用户在 15 分钟内打开至少一个修复动作 |
| 稳定性 | 核心生成流程成功率 ≥ 95% |
| 发布 | 已连接账号的发布成功率 ≥ 95% |
| 内容质量 | 种子客户首轮可用率 ≥ 70% |
| 数据 | Pro 客户的 Shop / Member / Creative 归因覆盖率 ≥ 85% |
| 合规 | 所有克隆数字人均有可追溯授权 |
| 诊断可信度 | 不使用竞品排名、行业百分位和虚构损失；无法读取的数据明确标记 |

---

## 13. 当前不做

- Token 中转站与独立 API 商店。
- 面向设计师的知识付费。
- 通用型 AI 图片 / 视频工具导航站。
- 国内抖音、快手的一期发布。
- 全功能 CRM、ERP、POS、库存与订单系统。
- 自动广告出价与无人值守广告托管。
- Invite Member 流程。
- Content Approval Workflow。
- Google 人脸认证。
- Plus 第三个自助套餐。
- 同一视频一次多账号发布。
- 模板交易市场与创作者分成。
- 竞品排名、行业百分位和基于不完整数据估算“损失收入”。
- 在正式产品中暴露 Onboarding / Operating 原型状态开关。

---

## 14. 待评审问题

1. 账号体检对 Facebook、Instagram、TikTok 公开主页的合法读取范围和失败降级策略如何定义？
2. 六类体检指标的评分权重、健康分计算与“严重 / 建议”阈值如何验证？
3. 30 天复检是固定周期，还是根据行业和账号活跃度动态调整？
4. Clone yourself 的第三方供应商与授权协议最终采用哪一套？
5. Lite 首发是否同时支持 Facebook、Instagram 与 TikTok 发布，还是先完成其中两个？
6. 30 天营销日历的默认发布频次如何按行业自动调整？
7. Human Admaker 的 8 条视频是否包含一次重做与多语言版本？
8. 一个 Social Account 是否允许在管理员操作下重新绑定至其他 Member？
9. Qualified Lead 的判定由客户手动标注、统一规则还是 CRM 状态决定？
10. Pro 的归因窗口与离线成交匹配规则如何定义？
11. Clone yourself 与 Custom avatar 的实际生成供应商、质量阈值和回调状态如何统一？

---

## 15. 当前原型校准清单

以下项目是逐页复核时发现的实现偏差，研发应以本 PRD 的目标规则为准：

1. 第一次免费体检的分析弹窗不得显示“消耗 50 credits”；只有后续体检显示并扣除 50 credits。
2. Lite 与 Pro 都可按 credits 使用 Seedance；Agent 中不得把 Seedance 作为 Pro 专属锁定项。
3. 体检建议中的旧文案 `Invite employees` 必须改为 `Add members` / `Manage team`，因为当前版本不使用邀请流程。
4. Onboarding / Operating 状态切换器只保留在原型调试环境，生产环境由历史报告状态自动判断。
5. 中文界面不得残留未翻译的体检步骤、报告状态、错误、空状态和 credits 提示。

---

## 16. 版本结论

VertensAI V3.3 的核心不是“提供最多的 AI 模型”，而是从一个低门槛、可重复的账号体检开始，完成更窄、更可信、更容易验证的门店营销闭环：

> **账号体检告诉门店先改什么，老板数字人口播建立信任，门店真实实拍提供证明，内容计划解决每天讲什么，发布与数据告诉团队什么真正有效。**

Lite 让门店以第一次免费体检完成冷启动，并建立“体检—品牌—数字人—内容—发布—线索总量”的基础闭环；Pro 再用营销日历、Team、Performance 与完整 Leads 归因，把内容生产变成可管理、可度量、可按月复盘的经营系统。
