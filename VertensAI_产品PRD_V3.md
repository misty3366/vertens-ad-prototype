# VertensAI 产品需求文档（PRD V3.0）

| 项目 | 内容 |
|---|---|
| 产品名称 | **VertensAI** |
| 文档版本 | **V3.0｜老板数字人口播 × 门店实拍广告版** |
| 更新日期 | **2026-08-21** |
| 文档状态 | 最新原型基线 / 产品、研发、运营评审稿 |
| 产品形态 | 面向海外线下门店的 AI 短视频生产、发布与获客数据工作台 |
| 当前原型 | 本地分支 `codex/vertensai-prototype` |
| 默认语言 | 英文；支持中文切换 |

> 本文只保留当前已经确认的产品定位、信息架构和功能特性。V2 中的 Offer、邀请成员、审批流、Google 人脸认证、泛 AI 工具平台等旧设计，不再作为 V3 产品基线。

---

## 1. 一页结论

### 1.1 产品定位

> **VertensAI 是帮助海外线下门店持续生产“老板数字人口播 + 门店真实实拍”短视频广告的营销工作台。**

老板只需录制一次 20 秒视频，即可建立自己的数字分身。VertensAI 再结合门店的产品、品牌资料、真实环境和服务过程，持续生成适合 Facebook、Instagram 和 TikTok 的本地化广告内容，并把发布、线索和门店结果关联起来。

VertensAI 当前不做泛 AI 创作平台，也不以模型数量作为主要卖点。产品首先解决三个明确问题：

1. **老板不知道每天应该讲什么。**
2. **真人无法持续出镜，拍摄与剪辑成本高。**
3. **内容发布后，门店不知道哪条视频真正带来咨询和到店。**

### 1.2 核心闭环

```text
创建老板数字人 / 选择自定义数字人
                +
导入品牌主页，生成品牌资料和营销日历
                ↓
从营销日历、模板或爆款链接获得短视频脚本
                ↓
选择产品、数字人、门店实拍和生成模型
                ↓
AI Agent 或 Viral Canvas 生成短视频
                ↓
进入 Assets，选择一个账号即时或定时发布
                ↓
Performance / Leads 识别有效内容、账号、门店与成员
                ↓
继续生成和放大下一批内容
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
2. **真实素材证明**：成片优先采用“口播解释 + 产品 / 空间 / 服务过程实拍”的混剪结构。
3. **产品而非 Offer**：全站统一使用 Products，覆盖商品与服务；不再使用 Offers 作为用户可见名称。
4. **先生成内容，再进入复杂工作流**：普通老板从首页、日历和模板开始；专业人员再进入 Agent 与 Viral Canvas。
5. **一个视频只发一个账号**：发布时只允许选择一个社媒账号，避免重复内容跨账号直接分发。
6. **门店是组织核心节点**：Team 以门店为单位管理成员、登录账号、社媒账号和获客绩效。
7. **创建即登录**：新增成员后直接生成可登录账号，不使用邀请流程。
8. **数据沉淀为资产**：品牌、产品、数字人、内容、账号、门店、成员和获客结果必须可关联。

---

## 2. 版本分层与研发优先级

左上角提供 Lite / Pro / Plus 三个原型版本按钮。切换版本时，只显示该版本已规划的菜单，用于明确研发优先级。

### 2.1 Lite｜第一、第二阶段

目标：完成品牌建立、数字人创建、内容策划、内容生成和单账号发布闭环。

包含：

- Home
- Projects
- My Brand
- Assets
- AI Agent
- Templates
- Viral Canvas
- AI Avatars
- Human Admaker
- Marketing Calendar
- Publishing
- Social Accounts

### 2.2 Pro｜第三阶段

目标：让企业以门店为单位管理内容生产和社媒账号。

在 Lite 基础上新增：

- Team
- Shop 管理
- 成员登录账号
- 成员与社媒账号绑定
- 管理员代成员账号发布

### 2.3 Plus｜第四阶段

目标：把内容生产升级为可衡量、可复用的门店增长系统。

在 Pro 基础上新增：

- Performance
- Leads
- 内容、账号、门店与成员归因
- 获胜内容判断与再生产建议

### 2.4 菜单显示规则

- Lite 与 Pro 不显示 `Growth` 分组标题。
- 只有 Plus 显示 `Growth`、Performance 和 Leads。
- 切换到低版本时，如当前页面不属于该版本，自动返回 Home。

---

## 3. 最新信息架构

```text
Workspace
├── Home                         Lite
├── Projects                     Lite
├── My Brand                     Lite
├── Assets                       Lite
└── Team                         Pro

Create
├── AI Agent                     Lite
├── Templates                    Lite
├── Viral Canvas                 Lite
├── AI Avatars                   Lite
└── Human Admaker                Lite

Operate
├── Marketing Calendar           Lite
├── Publishing                   Lite
└── Social Accounts              Lite

Growth                           Plus only
├── Performance                  Plus
└── Leads                        Plus
```

### 3.1 左侧导航交互

- 默认可固定展开。
- 折叠状态下，鼠标悬停以弹层形式显示完整菜单。
- 点击固定按钮后，菜单保持展开，不再自动收回。
- 收起时保留图标、当前选中状态和 Tooltip。
- 账号入口位于左下角；点击后打开账号菜单。

### 3.2 账号菜单

账号菜单包含：

- 用户名与邮箱；点击进入个人中心。
- 使用情况。
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
  ├── 创建数字人
  │     ├── 克隆自己：录制 20 秒 → 授权 → 生成 → 完成
  │     └── 自定义数字人：选择演员 → 配置市场与风格 → 保存
  └── 导入品牌
        └── 粘贴 Facebook / Instagram / TikTok 企业主页
              → 自动提取品牌与产品
              → 用户确认
              → 生成 30 天营销日历
```

### 4.2 从营销日历生产短视频

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

### 4.3 从模板复刻

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

### 4.4 发布

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

### 4.5 多门店团队管理

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

首页只呈现两项最重要的初始化资产：**你的数字人**与**你的品牌**，并解释“老板口播 + 门店实拍”的最终结果。

### 页面结构

1. **老板口播广告 Hero**
   - 核心文案：录一次，持续生成门店广告。
   - 主要按钮：`Record my 20 seconds`。
   - 次要按钮：查看老板口播案例。
   - 视觉展示：老板数字人、门店实拍和批量成片结果。

2. **四步流程**
   - 录制 20 秒。
   - 创建数字分身。
   - 选择门店实拍。
   - 批量生成广告。

3. **Your personal avatars**
   - 展示用户已创建的专属数字人列表。
   - 每张卡片包含状态、语言和 `Create video`。
   - `Create new avatar` 和 `Create another avatar` 均打开统一的两选项弹窗。

4. **Import your brand**
   - 支持 Facebook、Instagram、TikTok 企业主页 URL。
   - 导入后生成：My Brand、内容主题和 30 天营销日历。
   - 提供手动进入 My Brand 的备选入口。

### 验收

- 首页不展示大面积通用工具导航。
- 已创建的数字人必须在首页可见并可直接进入 Agent。
- 品牌导入成功后进入 My Brand 确认流程，再生成日历。

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

- 入口位于 My Brand，并在 Home 提供快捷入口。
- 以弹窗向导完成，不在页面中长期占据大面积空间。
- 三步：Import profile → Review My Brand → Create marketing calendar。
- 自动提取结果必须允许用户确认和修改。
- URL 无法读取时允许手动录入。

---

## F3｜AI Avatars

### 顶部两种入口

1. **Clone yourself**
   - 录制 20 秒本人视频。
   - 阅读并同意数字人授权。
   - 生成预览。
   - 用户确认后保存至 My Brand 与 Home。
   - 当前版本不包含 Google 人脸认证步骤。

2. **Custom avatar**
   - 原 `Choose an AI actor` 统一改为 `Custom avatar`。
   - 从演员库选择基础角色。
   - 按行业、市场、语言和广告风格进行定制。
   - 保存为品牌可复用数字人。

### 数字人列表

- 支持按语言、性别、年龄、行业和拍摄风格筛选。
- 点击演员后进入 AI Agent，并在输入框显示“已选择该角色”的标签。
- 首页创建数字人入口与 AI Avatars 顶部入口保持一致。

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

### Chat 模式

- 使用 Codex 风格任务界面。
- 页面高度铺满可视区域，不保留无意义底部空白。
- 对话按 Project 分组。
- 左侧二级栏以 Project → Thread 的层级展示。
- Projects 菜单点击后直接进入对应 Project 的 Agent 对话。
- 创建新 Project 时只保留一个 `New` 加号。

### Canvas 模式

- 将当前 Product、Avatar、模型、素材和脚本带入 Viral Canvas。
- 生成可编辑的工作流节点。

---

## F5｜Projects

### 定位

Projects 不是独立文件列表，而是 Agent 对话的组织方式。

### 层级

```text
Project
├── Video task
├── Image task
├── Template recreation
└── Canvas workflow
```

### 要求

- 点击 Projects 进入 Agent，并定位到对应 Project。
- Project 列表位于 Agent 二级侧栏，不放在底部。
- Project 可以展开或收起。
- 支持创建、重命名与切换 Project。
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

## F9｜Marketing Calendar

### 目标

根据 My Brand 的产品、目标市场、品牌语气和历史内容，自动生成一个月的内容策划。

### 内容策略

- 发布频次。
- 平台。
- 获客目标。
- Tone。
- 图片、轮播和视频比例。
- 每周增长主题。

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

## F12｜Team 与 Shop

### 定位

Team 用于按门店管理成员、登录账号、社媒账号和获客绩效。

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

## F13｜Human Admaker

### 定位

人工策划与制作的门店短视频外包服务，原 `Creative Service` 统一改名为 `Human Admaker`。

### 套餐

> **每月 8 条广告 / 500 美金。**

包含：

- 人工内容策划。
- AI + 门店实拍混剪。
- 老板口播或数字人口播。
- 脚本、本地化与基础剪辑。
- 月度交付。

### 页面交互

- 展示可播放的外包样片。
- `Start for $500/month` 打开联系表单。
- 表单包含姓名、电话和 WhatsApp。
- 页面同时提供 WhatsApp 按钮，允许直接联系官方。

---

## F14｜Performance 与 Leads（Plus）

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

---

## 6. 角色与权限

| 角色 | 主要权限 |
|---|---|
| Workspace Owner | 管理品牌、门店、成员、数字人授权、社媒账号、账单和全部数据 |
| Admin | 管理门店成员、账号绑定、内容、发布和数据；不可删除 Workspace |
| Creator | 创建内容、使用模板、管理分配的素材和项目 |
| Viewer | 查看分配门店的数据和内容，不可生成或发布 |
| VertensAI Producer | 仅访问被分配的 Human Admaker 项目和素材 |

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
| Product | id、brand_id、name、type、url、media、selling_points、price、proof、cta |
| Avatar | id、brand_id、type、name、image、languages、consent_id、status |
| Voice | id、avatar_id、language、style、sample、consent_id、status |
| Asset | id、brand_id、product_id、project_id、type、source、status、ratio、tags、rights_status |
| Project | id、brand_id、shop_id、name、status |
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
Workspace → Brand → Product / Avatar / Voice / Asset
Brand → ContentPlan → CalendarItem → Agent Task
Project → Thread → Workflow → Creative → PublishJob
Creative → SocialAccount → PerformanceSnapshot / Lead
```

---

## 8. 状态与异常

| 场景 | 产品处理 |
|---|---|
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

- 首个数字人创建率。
- 品牌主页导入率。
- My Brand 完成率。
- 首个 Product 创建率。
- 首份营销日历生成率。
- 首条视频生成时间。

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

### 9.5 关键事件

- `avatar_clone_started`
- `avatar_created`
- `custom_avatar_saved`
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
- Assets、Templates、Projects 使用分页、懒加载或虚拟列表。
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

- Home 定位与老板口播案例。
- My Brand、Products、Assets。
- Clone yourself / Custom avatar。
- Human Admaker 服务交付。
- 用真实种子客户验证“老板口播 + 门店实拍”的获客效果。

### 第二阶段｜内容生产工具化

- Marketing Calendar。
- AI Agent。
- Templates 与短视频链接分析。
- Viral Canvas。
- Projects。
- Publishing 与 Social Accounts。

### 第三阶段｜门店团队协作

- Team。
- Shop。
- 成员直接登录账号。
- 成员社媒账号绑定。
- 管理员代发布。

### 第四阶段｜数据闭环

- Performance。
- Leads。
- Creative、Account、Shop、Member 归因。
- 获胜内容判断与再生产。

---

## 12. MVP 上线验收

### 12.1 Lite 端到端验收

1. 用户创建或选择一个数字人。
2. 用户导入企业主页并确认品牌资料。
3. 系统生成首月营销日历。
4. 用户点击日历内容，并把完整脚本发送到 Agent。
5. 用户选择 Product、Avatar 和模型。
6. 系统生成至少一条 9:16 短视频。
7. 成片保存至 Assets。
8. 用户选择一个已连接账号即时或定时发布。

### 12.2 Pro 端到端验收

1. Owner 创建两个 Shop。
2. 每个 Shop 创建至少两个可直接登录的成员账号。
3. 管理员为成员绑定一个社媒账号。
4. 管理员可从成员详情选择该账号进入 Publishing。
5. 门店成员表可以查看发布数与有效线索。

### 12.3 Plus 端到端验收

1. Creative 与发布账号、Shop、Member 关联。
2. 平台数据与 Leads 可同步或通过 CSV 导入。
3. Performance 能查看 Creative 级结果。
4. 用户可从获胜内容创建新的 Agent 任务。

### 12.4 上线门槛

| 维度 | 门槛 |
|---|---|
| 激活 | 70% 测试用户完成数字人或品牌导入中的至少一项 |
| 首次价值 | 50% 测试用户在 15 分钟内进入首次生成 |
| 稳定性 | 核心生成流程成功率 ≥ 95% |
| 发布 | 已连接账号的发布成功率 ≥ 95% |
| 内容质量 | 种子客户首轮可用率 ≥ 70% |
| 数据 | Plus 客户的 Shop / Member / Creative 归因覆盖率 ≥ 85% |
| 合规 | 所有克隆数字人均有可追溯授权 |

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
- 同一视频一次多账号发布。
- 模板交易市场与创作者分成。

---

## 14. 待评审问题

1. Clone yourself 的第三方供应商与授权协议最终采用哪一套？
2. Social Profile Import 在 Facebook、Instagram、TikTok 的合法读取边界如何定义？
3. Lite 首发是否同时支持 Facebook、Instagram 与 TikTok 发布，还是先完成其中两个？
4. 30 天营销日历的默认发布频次如何按行业自动调整？
5. Human Admaker 的 8 条视频是否包含一次重做与多语言版本？
6. 一个 Social Account 是否允许在管理员操作下重新绑定至其他 Member？
7. Qualified Lead 的判定由客户手动标注、统一规则还是 CRM 状态决定？
8. Plus 的归因窗口与离线成交匹配规则如何定义？

---

## 15. 版本结论

VertensAI V3.0 的核心不是“提供最多的 AI 模型”，而是完成一个更窄、更可信、更容易验证的门店营销闭环：

> **老板数字人口播建立信任，门店真实实拍提供证明，品牌与营销日历解决每天讲什么，发布与数据告诉团队什么真正有效。**

Lite 先完成单门店内容闭环；Pro 再把门店、成员和账号组织起来；Plus 最后用 Performance 与 Leads 形成增长壁垒。
