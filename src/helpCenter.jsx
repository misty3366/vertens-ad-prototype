import { useEffect, useState } from 'react';
import {
  ArrowRight, CalendarCheck, CheckCircle, Compass, CurrencyDollar, FilmSlate, Flag,
  Globe, Handshake, Lightning, MapPin, Megaphone, Prohibit, Question, Seal, Target, Users, VideoCamera, Warning, X
} from '@phosphor-icons/react';
import { storyboards } from './storyboards.js';

/* ---------------------------------------------------------------------------
   Help center · VertensAI go-to-market playbook
   Every number on this page is either derived from the pricing model in
   VertensAI_定价策略_V3.md / VertensAI_营销讨论上下文包.md, or explicitly
   marked as an untested assumption. Sources are listed at the bottom of tab 1.
--------------------------------------------------------------------------- */

const constraintCards = zh => [
  {icon:CurrencyDollar,label:zh?'CAC 上限':'CAC ceiling',value:'$34–53',note:zh?'月毛利 $15–21，2–6 个月回本 · 来源 §5':'$15–21 monthly gross profit, 2–6 month payback · src §5'},
  {icon:Target,label:zh?'单个免费体检成本上限':'Cost per free checkup',value:'$2.72',note:zh?'= $34 × 8% 体检转付费（8% 为假设值）':'= $34 × 8% checkup-to-paid (8% is an assumption)'},
  {icon:Seal,label:zh?'首年毛利':'First-year gross profit',value:'$105 / $198',note:zh?'Lite 年付 / Pro 年付 · 年付当天回收 CAC':'Lite / Pro annual · annual prepay recovers CAC on day one'}
];

const countryFilter = zh => [
  [zh?'老板肯为 $120–300/年 的软件自助刷卡':'Owner will self-serve $120–300/yr on a card', zh?'§2 完全自助，无销售团队':'§2 fully self-serve, no sales team', zh?'淘汰东南亚、拉美':'Rules out SEA, LatAm'],
  [zh?'独立门店密度高，未被连锁吃掉':'High density of independent stores', zh?'§2 单店到十店':'§2 one to ten locations', zh?'淘汰英国（B&Q / Wickes 连锁化过高）':'Rules out UK (B&Q / Wickes consolidation)'],
  [zh?'存在一条近乎零成本的触达通道':'A near-zero-cost route to reach them', zh?'§5 投放路径基本排除':'§5 paid acquisition is priced out', zh?'只有美国过关（佛山供应链 + 三维家海外存量用户）':'Only the US passes (Foshan supply chain + Sunvega overseas base)']
];

const rejectedMarkets = zh => [
  [zh?'中东（阿联酋 / 沙特）':'Middle East (UAE / Saudi)', zh?'中国品牌专营展厅是总部或代理商决策，那是企业销售动作 —— 正是 §8 已否决的方向。且迪拜实测已证伪过一次「靠关系撬中东」。可留作 Pro 批量团购渠道，不作首发。':'Chinese-brand exclusive showrooms are an HQ or dealer decision — that is an enterprise sales motion, the exact path rejected in §8. The Dubai field test already falsified the relationship-led route once. Keep it as a bulk Pro channel, not the launch market.'],
  [zh?'加拿大 / 澳洲':'Canada / Australia', zh?'能过前两格，但市场小一个数量级，Birdeye 同样覆盖，不值得单开战线。':'Passes the first two filters, but the market is an order of magnitude smaller and Birdeye already covers it.'],
  [zh?'东南亚 / 印尼':'SEA / Indonesia', zh?'ARPU 撑不住 $120/年；印尼 C 端方向已否决。':'ARPU cannot support $120/yr; the Indonesia consumer track is already rejected.']
];

const circles = zh => [
  {
    tag:'A', name:zh?'美国华人家居建材店':'US Chinese-owned home & building stores',
    geo:zh?'加州 San Gabriel Valley · 纽约法拉盛 / 新泽西 · 休斯顿 · 亚特兰大 · 西雅图':'San Gabriel Valley CA · Flushing NY / NJ · Houston · Atlanta · Seattle',
    lang:zh?'中文':'Chinese',
    edge:[
      zh?'佛山供应链反向介绍，触达成本 ≈ $0':'Reverse introductions through the Foshan supply chain — reach cost ≈ $0',
      zh?'华人建材商会微信群是现成的转介绍闭环':'Chinese building-material trade WeChat groups are a ready-made referral loop',
      zh?'Birdeye 的 267 名销售不会用中文卖给一家三人橱柜店':"Birdeye's 267 reps will not sell in Chinese to a three-person cabinet shop"
    ],
    risk:zh?'这批店主的客户本来就来自微信熟人链和装修公司转介，社媒内容获客对他们可能根本不是刚需 —— 体检报告扎不到痛处。':'These owners already get customers through WeChat networks and contractor referrals. Social-content acquisition may simply not be a felt need — in which case the checkup report lands on nothing.',
    test:zh?'脚本 E18 + 前两周 25 份人工体检报告':'Script E18 plus 25 of the first 50 manual checkup reports'
  },
  {
    tag:'B', name:zh?'美国主流独立厨卫 / 地板 / 橱柜经销商':'US mainstream independent kitchen, bath, flooring & cabinet dealers',
    geo:zh?'全美，优先德州 · 佛州 · 中西部':'Nationwide, prioritise Texas, Florida, the Midwest',
    lang:zh?'英文':'English',
    edge:[
      zh?'基数大一个数量级以上':'An order of magnitude larger base',
      zh?'采购合作社（Do it Best + True Value 8,000 店 · Nationwide 14,000 门店 · CCA Global 1,200 成员）本就给成员提供营销服务，是天然分发渠道':'Buying co-ops (Do it Best + True Value 8,000 stores · Nationwide 14,000 storefronts · CCA Global 1,200 members) already provide marketing services to members — a natural distribution channel',
      zh?'$20–300 价格带生成类与多门店类都没覆盖':'Nobody covers the $20–300 band — neither the generation tools nor the multi-location suites'
    ],
    risk:zh?'合作社谈判周期以月计，撑不住「前 1,000 个客户」的时间表；且直接进 Birdeye 主场。':'Co-op partnerships take months to close, which will not carry the first-1,000-customer timeline — and it walks straight into Birdeye’s home ground.',
    test:zh?'脚本 A1–C13 + 另 25 份人工体检报告':'Scripts A1–C13 plus the other 25 manual checkup reports'
  }
];

const trackReasons = zh => [
  [zh?'管线约束':'Pipeline constraint', zh?'图片合成管线画面内没有真实运动，动感靠运镜和节奏。这在静物品类成立，在餐饮、服装不成立（§3）。泛化过去，产品交付不了。':'The image-composition pipeline has no in-frame motion — energy comes from camera moves and pacing. That works for static categories and fails for food and fashion (§3). Generalising breaks delivery, not just positioning.'],
  [zh?'对手主场':'Opponent’s home ground', zh?'家居建材是高客单、长决策，靠内容种草（push）；餐饮美业是即时消费，靠搜索和评论（pull）—— 那是 Birdeye 的强项。往那边走等于走进对手主场（§2）。':'Home & building is high-ticket and long-cycle, won by content push. Food and beauty are impulse categories won by search and reviews — pull, which is exactly Birdeye’s strength. Generalising walks into their home ground (§2).'],
  [zh?'模板库被摊薄':'Template library dilution', zh?'壁垒不是「能生成」，是「知道什么内容能获客」。十七个行业分摊运营产能，每个行业的配方都做不深。':'The moat is not the ability to generate — it is knowing which content actually brings people in. Seventeen industries split the same ops capacity and no single recipe gets deep.']
];

const channels = zh => [
  {rank:1,name:zh?'定向体检报告冷私信':'Cold DM with a finished checkup report',circle:'A + B',lang:zh?'中 / 英':'CN / EN',cac:'$0–5',vol:zh?'50–200 份 / 月（人工）':'50–200 reports / month (manual)',metric:zh?'回复率 · 体检提交率':'Reply rate · checkup submissions',why:zh?'报告本身就是素材，不需要先拍片。零开发即可跑（§13 本周人工诊断阶段）。':'The report is the creative — no shooting required. Runs with zero engineering.'},
  {rank:2,name:zh?'佛山供应链 / 三维家海外存量用户反向介绍':'Foshan supply chain & Sunvega overseas base referrals',circle:'A',lang:zh?'中文':'CN',cac:'$0',vol:zh?'待定（名单规模未知）':'Unknown — list size not yet counted',metric:zh?'名单转化率':'List-to-signup rate',why:zh?'冷启动渠道排序里的第 ⓪ 位。但三个数字至今没填，见本页末尾「未解决项」。':'Ranked #0 in the cold-start sequence — but three required numbers are still blank. See open items.'},
  {rank:3,name:zh?'华人建材商会微信群 + 视频号 / 小红书':'Chinese trade WeChat groups + Channels / RED',circle:'A',lang:zh?'中文':'CN',cac:'$2–8',vol:zh?'每周 3 条 + 群内直发':'3 posts/week plus direct group drops',metric:zh?'群内转发次数':'In-group reshares',why:zh?'微信群是主战场，公开内容只是让群里转发时有东西可转。':'The WeChat group is the battleground; public posts exist so there is something to reshare into it.'},
  {rank:4,name:zh?'内容 SEO + AI 搜索收录':'Content SEO and AI-search indexing',circle:'B',lang:zh?'英文':'EN',cac:zh?'摊薄，长周期':'Amortised, long cycle',vol:zh?'每月 2 篇长稿 + 1 支长视频':'2 long-form posts + 1 long video / month',metric:zh?'自然体检提交数':'Organic checkup submissions',why:zh?'§5 点名的三条低成本路径之一。主稿是「我们体检了 300 家美国门店」。':'One of the three low-cost routes named in §5. The anchor piece is the 300-store checkup study.'},
  {rank:5,name:zh?'采购合作社渠道合作':'Buying co-op partnerships',circle:'B',lang:zh?'英文':'EN',cac:zh?'谈判成本，非获客成本':'Negotiation cost, not acquisition cost',vol:zh?'单个协议可覆盖上千门店':'A single agreement can cover thousands of storefronts',metric:zh?'签下的合作社数':'Signed co-ops',why:zh?'规模路径，但周期以月计。第 6 周启动接触，不指望它救前 90 天。':'The scale path, but it runs in months. Start outreach in week 6; do not expect it to carry the first 90 days.'},
  {rank:6,name:zh?'员工矩阵自带传播':'Employee-matrix built-in distribution',circle:'A + B',lang:zh?'中 / 英':'CN / EN',cac:zh?'$0（产品内）':'$0 (in-product)',vol:zh?'随客户数线性增长':'Grows linearly with customers',metric:zh?'每店平均绑号数':'Average accounts bound per store',why:zh?'每个绑号的店员都在把成片发进自己的私域，成片必带获客信息层。这是产品自带的病毒环。':'Every bound employee pushes finished videos into their own network, and every video carries the mandatory store-info layer. This is the product’s own viral loop.'},
  {rank:7,name:zh?'客户转介绍（给 credits，不给现金）':'Customer referrals — paid in credits, never cash',circle:'A + B',lang:zh?'中 / 英':'CN / EN',cac:zh?'≈ 成本价的 credits':'≈ cost-price credits',vol:zh?'上线 60 天后启动':'Starts 60 days after launch',metric:zh?'每客户带来的新客户数':'Referred customers per customer',why:zh?'给现金是掏毛利，给 credits 是掏成本，且把人推回产品里消耗。':'Cash comes out of gross profit; credits come out of cost and push the referrer back into the product.'},
  {rank:8,name:zh?'付费投放（Meta / TikTok）':'Paid ads (Meta / TikTok)',circle:'B',lang:zh?'英文':'EN',cac:zh?'⚠ 不作为获客渠道':'⚠ Not an acquisition channel',vol:zh?'上限 $1,500 / 3 周':'Capped at $1,500 over three weeks',metric:zh?'素材相对排序':'Relative creative ranking',why:zh?'§5 已排除靠投放买量。这笔钱买的是 20 套脚本的排序数据，不是客户 —— 预算是假设值，需你确认。':'§5 already rules out buying volume. This budget buys ranking data on the 20 scripts, not customers. The figure is an assumption and needs your sign-off.'}
];

const scriptGroups = zh => [
  {id:'A',name:zh?'A 组 · 体检拆解':'Group A · Checkup teardown',share:'30%',intent:zh?'钩子本身。转化路径最短：看完 → 粘链接 → 拿报告。严守「只念数得出来的事实」。':'The hook itself. Shortest path: watch, paste link, get report. Strictly limited to countable facts.'},
  {id:'B',name:zh?'B 组 · 员工矩阵实证':'Group B · Employee-matrix proof',share:'20%',intent:zh?'全线竞品拍不出来的画面。不做钩子，做说服，放在报告页之后。':'The one shot no competitor can produce. Not a hook — persuasion, placed after the report page.'},
  {id:'C',name:zh?'C 组 · 对刀报价':'Group C · Price knife',share:'15%',intent:zh?'短、狠、可转发。用于社群评论区和私信。按 §7 顺序：先说不做什么。':'Short, sharp, reshareable. For group comments and DMs. Follow the §7 order: lead with what we do not do.'},
  {id:'D',name:zh?'D 组 · 创始人与品类洞察':'Group D · Founder & category insight',share:'15%',intent:zh?'不为转化，为内容 SEO 和喂 AI 搜索引擎，建立品类话语权。':'Not for conversion — for content SEO, AI-search indexing and category authority.'},
  {id:'E',name:zh?'E 组 · 华人圈层':'Group E · Chinese-language circle',share:'20%',intent:zh?'中文原生，微信群为主战场。E18 是唯一直接验圈层 A 致命假设的一条。':'Chinese-native, WeChat groups as the battleground. E18 is the only script that directly tests circle A’s fatal assumption.'}
];

const scripts = zh => [
  {id:'A1',g:'A',lang:'EN',ch:'IG Reels · YT Shorts',cir:'B',hook:'4,200 followers. 22 posts. Eighteen of them never say where the store is.',fmt:zh?'45 秒 · 屏幕录屏 + 画外音':'45s · screen recording + VO',cost:zh?'$0 · 无需拍摄':'$0 · no shoot',hyp:zh?'M1 钩子成立性（主对照）':'M1 hook validity (primary)'},
  {id:'A2',g:'A',lang:'EN',ch:'FB local business groups',cir:'B',hook:'I ran a free checkup on 12 flooring stores in Houston. Average score: 44 out of 100.',fmt:zh?'60 秒 · 批量版':'60s · batch version',cost:zh?'$0':'$0',hyp:zh?'规模化叙事 vs 单店叙事':'Aggregate vs single-store framing'},
  {id:'A3',g:'A',lang:'EN',ch:'IG Reels',cir:'B',hook:'Your last post was 19 days ago. Here is what the feed does to you after day seven.',fmt:zh?'30 秒':'30s',cost:zh?'$0':'$0',hyp:zh?'断更角度 vs 缺门店信息角度':'Posting-gap angle vs missing-store-info angle'},
  {id:'A4',g:'A',lang:'EN',ch:'YT Shorts',cir:'B',hook:'Fifty-five. Then forty-eight. Then forty-two. Same store, three months, nobody told them.',fmt:zh?'35 秒':'35s',cost:zh?'$0':'$0',hyp:zh?'自身趋势能否制造紧迫感（§6 纪律三）':'Whether a store’s own trend creates urgency (§6 rule 3)'},
  {id:'A5',g:'A',lang:'EN',ch:'TikTok',cir:'B',hook:'Zero of your last 22 posts have a human face in them.',fmt:zh?'30 秒':'30s',cost:zh?'$0':'$0',hyp:zh?'真人出镜缺口作为切入点':'The no-human-face gap as an entry point'},
  {id:'A6',g:'A',lang:'EN',ch:zh?'全渠道 · 对照组':'All channels · control',cir:'B',hook:'Paste your Instagram link. Sixty seconds. No signup, no card.',fmt:zh?'15 秒 · 极简':'15s · minimal',cost:zh?'$0':'$0',hyp:zh?'纯 CTA 对照组，用来校准前五条的增量':'Pure-CTA control, isolates the lift of A1–A5'},
  {id:'B7',g:'B',lang:'EN',ch:'IG · YT',cir:'B',hook:'One store. Five employees. Sixty-one posts last month. Here is who actually brought people in.',fmt:zh?'50 秒 · 实拍 + 后台录屏':'50s · location footage + dashboard capture',cost:zh?'需一家授权门店':'Requires one consenting store',hyp:zh?'差异化能否独立拉动体检提交':'Whether the differentiator alone drives checkups'},
  {id:'B8',g:'B',lang:'EN',ch:'FB groups · LinkedIn',cir:'B',hook:'Your sales guy already posts every day. He is just not posting your store.',fmt:zh?'30 秒':'30s',cost:zh?'$0':'$0',hyp:zh?'痛点式进入员工矩阵':'Pain-first entry into the employee matrix'},
  {id:'B9',g:'B',lang:'EN',ch:zh?'落地页 · YouTube':'Landing page · YouTube',cir:'B',hook:zh?'屏幕录屏：归因表带 Employee 列与 86% 置信度，并区分确定性与建模值':'Screen capture: attribution table with the Employee column, 86% confidence, deterministic vs modelled split',fmt:zh?'60 秒 · 纯产品':'60s · product only',cost:zh?'$0':'$0',hyp:zh?'M4 残缺归因是否足以驱动升级':'M4 — whether partial attribution drives upgrades'},
  {id:'B10',g:'B',lang:'EN',ch:zh?'冷私信 · 销售页':'Cold DM · sales page',cir:'B',hook:'We do not do reviews. We do not do listings. Here is the one thing nobody else does.',fmt:zh?'40 秒':'40s',cost:zh?'$0':'$0',hyp:zh?'§7 话术顺序（先承认不做什么）':'The §7 sequence — concede first, then differentiate'},
  {id:'C11',g:'C',lang:'EN',ch:'FB groups · Reddit',cir:'B',hook:'Five stores. Birdeye starts at $1,495 a month. We are $25. Here is what you give up.',fmt:zh?'35 秒':'35s',cost:zh?'$0':'$0',hyp:zh?'诚实对比的转发率':'Reshare rate of an honest comparison'},
  {id:'C12',g:'C',lang:'EN',ch:'IG · TikTok',cir:'B',hook:'Twenty-five dollars a month. Sixty eighteen-second videos. Let me show you the math.',fmt:zh?'40 秒':'40s',cost:zh?'$0':'$0',hyp:zh?'产能叙事能否独立成钩（§4）':'Whether the capacity story stands alone as a hook (§4)'},
  {id:'C13',g:'C',lang:'EN',ch:zh?'落地页':'Landing page',cir:'A + B',hook:'We charge for one thing: credits. Not stores. Not employees. Not accounts.',fmt:zh?'25 秒':'25s',cost:zh?'$0':'$0',hyp:zh?'定价结构本身的说服力':'Persuasive power of the pricing structure itself'},
  {id:'D14',g:'D',lang:'EN',ch:zh?'LinkedIn · YouTube 长视频':'LinkedIn · YouTube long-form',cir:'B',hook:'We ran checkups on 300 US home and building stores. Five things we found.',fmt:zh?'8–12 分钟 + 长文':'8–12 min plus written study',cost:zh?'需先积累 300 份体检':'Requires 300 checkups first',hyp:zh?'内容 SEO 与 AI 搜索收录':'Content SEO and AI-search indexing'},
  {id:'D15',g:'D',lang:'EN',ch:zh?'LinkedIn 长文':'LinkedIn long-form',cir:zh?'品类':'Category',hook:'Attribution is a moat. It is a terrible hook. Here is the difference.',fmt:zh?'长文':'Written',cost:zh?'$0':'$0',hyp:zh?'建立品类话语权':'Category authority'},
  {id:'D16',g:'D',lang:'EN',ch:zh?'YouTube · 落地页第二屏':'YouTube · landing page fold 2',cir:'B',hook:'Record twenty seconds once. Let it answer the next hundred customers.',fmt:zh?'45 秒':'45s',cost:zh?'Avatar 6 credits / 秒':'Avatar at 6 credits/sec',hyp:zh?'avatar 放在正确位置是否仍有效（明确不做首屏）':'Whether the avatar still works once demoted off the hero'},
  {id:'E17',g:'E',lang:'ZH',ch:zh?'视频号 · 小红书':'WeChat Channels · RED',cir:'A',hook:'洛杉矶做橱柜的这家店，Instagram 发了 22 条，18 条没写地址和电话。',fmt:zh?'45 秒 · 屏幕录屏':'45s · screen recording',cost:zh?'$0':'$0',hyp:zh?'同款钩子在华人圈的有效性':'Whether the same hook lands in the Chinese-language circle'},
  {id:'E18',g:'E',lang:'ZH',ch:zh?'微信群 · 视频号':'WeChat groups · Channels',cir:'A',hook:'在美国开建材店，你的客户是不是还全靠微信群转介绍？',fmt:zh?'40 秒':'40s',cost:zh?'$0':'$0',hyp:zh?'★ 唯一直接验圈层 A 致命假设的一条':'★ The only script that directly tests circle A’s fatal assumption',star:true},
  {id:'E19',g:'E',lang:'ZH',ch:zh?'视频号 · 小红书':'WeChat Channels · RED',cir:'A',hook:'五个店员，一个月 60 条，后台能看到是哪一条带来的到店。',fmt:zh?'50 秒':'50s',cost:zh?'需一家授权门店':'Requires one consenting store',hyp:zh?'员工矩阵在华人店的接受度':'Employee-matrix acceptance in Chinese-owned stores'},
  {id:'E20',g:'E',lang:'ZH',ch:zh?'微信群直发':'Direct WeChat group drop',cir:'A',hook:'60 秒免费体检你的账号，不用注册。（附一张真实报告截图）',fmt:zh?'图文':'Image + copy',cost:zh?'$0':'$0',hyp:zh?'中文对照组':'Chinese-language control'}
];

const bannedCreative = zh => [
  [zh?'Before / After 翻新对比':'Before / after renovation reveals', zh?'那是装修公司的卖点，不传达产品与门店信息，不获客。':'That is the contractor’s pitch — it carries neither product nor store information, so it does not acquire.'],
  [zh?'Avatar 克隆炫技':'Avatar-cloning showcases', zh?'HeyGen 做了四年的主场，且是 demo-led 陷阱 —— Arcads / Creatify / Pollo 全困在那里。':'HeyGen’s home ground for four years, and the demo-led trap that Arcads, Creatify and Pollo are all stuck in.'],
  [zh?'漂亮的 AI 效果图展示':'Beautiful AI render showcases', zh?'一展示就进了生成类的价格战。':'Showing them puts us straight into the generation-tool price war.'],
  [zh?'「你损失了 $38 万」类估算':'Estimated lost-revenue figures', zh?'需要假设客单价与转化率。一旦被觉得夸张，整份报告的可信度垮掉。':'They require assumed ticket size and conversion. If the number reads as inflated, the whole report loses credibility.'],
  [zh?'有真实运动的场景（出餐 · 上身）':'Scenes with real in-frame motion (plating, try-on)', zh?'图片合成管线交付不了，拍了也上不了线。':'The image-composition pipeline cannot deliver them — shooting them produces nothing shippable.'],
  [zh?'指名未授权的真实门店':'Naming real stores without consent', zh?'在华人商会微信群里会瞬间反噬成口碑事故，也有法律风险。全部匿名化或先拿书面授权。':'In the trade WeChat groups this becomes a reputation incident within hours, and it carries legal exposure. Anonymise, or get written consent first.']
];

const sensitivity = [['5%','$1.70'],['8%','$2.72'],['12%','$4.08']];

const verdicts = zh => [
  {tone:'go',label:zh?'放大':'Scale',rule:zh?'组内前 5 名 且 单体检成本 ≤ $2.72':'Top 5 in the round and cost-per-checkup ≤ $2.72',act:zh?'做 5 个第一句变体，进入常规排期':'Produce five opening-line variants, move into the standing schedule'},
  {tone:'hold',label:zh?'改钩重投':'Rewrite',rule:zh?'组内 6–15 名 或 单体检成本 $2.72–$8':'Ranked 6–15, or cost-per-checkup between $2.72 and $8',act:zh?'只改第一句，其余不动，再投一轮':'Change only the opening line, hold everything else, run one more round'},
  {tone:'stop',label:zh?'停':'Kill',rule:zh?'组内后 5 名 或 单体检成本 > $8 或 3 秒完播处于本轮后 25%':'Bottom 5, cost-per-checkup > $8, or 3-second retention in the bottom quartile',act:zh?'停投，且该角度不再复用':'Stop, and retire the angle'}
];

const timeline = zh => [
  {w:zh?'第 1–2 周':'Weeks 1–2',t:zh?'人工体检 50 份':'50 manual checkups',d:zh?'25 份发华人店，25 份发主流独立店，直接私信。零开发，报告即素材。':'25 to Chinese-owned stores, 25 to mainstream independents, sent by DM. Zero engineering — the report is the creative.',out:zh?'定圈层：回复率 ≥30% 投产 · 10–30% 改钩子 · <10% 该圈层作废':'Picks the circle: ≥30% reply rate go, 10–30% rewrite, <10% retire that circle'},
  {w:zh?'第 3–5 周':'Weeks 3–5',t:zh?'20 套脚本 × 3 变体':'20 scripts × 3 variants',d:zh?'共 60 个素材，三周投完，唯一北极星是单体检成本。':'60 pieces over three weeks, judged on cost-per-checkup only.',out:zh?'定素材：前 5 名放大，后 5 名停':'Picks the creative: scale the top 5, kill the bottom 5'},
  {w:zh?'第 6–8 周':'Weeks 6–8',t:zh?'放大 + 渠道接触 + 种子签约':'Scale, co-op outreach, seed signings',d:zh?'放大前 5 条；启动采购合作社接触；签下 12 家种子客户。':'Scale the top five; open buying-co-op conversations; sign 12 seed customers.',out:zh?'12 家种子客户合同 + 至少 1 家合作社进入二轮':'12 seed contracts plus at least one co-op in second-round talks'},
  {w:zh?'第 9–20 周':'Weeks 9–20',t:zh?'种子客户 90 天运营':'The 90-day seed program',d:zh?'见第二部分。':'See part two.',out:zh?'6 份可对外案例，其中 3 份带完整归因':'Six publishable cases, three of them with full attribution'}
];

const sources = zh => [
  ['VertensAI_营销讨论上下文包.md §5', zh?'CAC 上限、ARPU、回本期、「投放这条路走不通」':'CAC ceiling, ARPU, payback, the ruling-out of paid acquisition'],
  ['VertensAI_营销讨论上下文包.md §6', zh?'体检钩子七条件、三条纪律（免费免注册 · 不报估算损失 · 紧迫感来自自身趋势）':'The seven hook conditions and three disciplines'],
  ['VertensAI_营销讨论上下文包.md §7', zh?'Birdeye / SOCi 资本效率对比、销售话术顺序':'Birdeye vs SOCi capital efficiency, the sales sequence'],
  ['VertensAI_定价策略_V3.md', zh?'两档价格、credits 单价、产能对比、各档毛利':'Both tiers, credit unit price, output table, gross margins'],
  [zh?'迪拜实测（2026-08）':'Dubai field test (Aug 2026)', zh?'「带客户来中国」模式证伪，中东关系路径的反面证据':'Falsified the bring-customers-to-China model; counter-evidence for the relationship-led Middle East route'],
  [zh?'冷启动渠道排序':'Cold-start channel ranking', zh?'三维家海外存量用户列为第 ⓪ 渠道 —— 三个数字仍缺':'Sunvega’s overseas base ranked channel #0 — three numbers still missing']
];

const openItems = zh => [
  zh?'美国华人家居建材店的实际家数，以及佛山供应链能拿到多少家店名单 —— 这个数决定圈层 A 是滩头阵地还是天花板一千家的死胡同。':'How many Chinese-owned US home & building stores actually exist, and how many the Foshan supply chain can introduce. This number decides whether circle A is a beachhead or a 1,000-store dead end.',
  zh?'三维家海外存量用户里有多少门店、可触达方式是什么 —— 若是四位数，整套推演的第一步就该换成它。':'How many storefronts sit in Sunvega’s overseas user base and how to reach them. If it is four digits, that becomes step one instead.',
  zh?'这批店主现在每月花多少钱获客 —— 没有这个数，$34 的 CAC 上限只是会计推论，不知道对面愿不愿意为 $10/月 动手。':'What these owners currently spend per month on acquisition. Without it, the $34 CAC ceiling is an accounting inference, not evidence of willingness to pay.',
  zh?'体检提交转付费的转化率 —— 本页所有单体检成本阈值都建在 8% 这个假设上，上线后第一个 30 天必须用实测替换。':'The checkup-to-paid conversion rate. Every cost-per-checkup threshold on this page rests on an assumed 8%; replace it with measured data in the first 30 days.',
  zh?'付费测试预算 $1,500 是假设值，需要你确认。这笔钱买的是素材排序，不是客户。':'The $1,500 paid-test budget is an assumption and needs your sign-off. It buys creative ranking, not customers.'
];

/* --- Part two: seed customer program ------------------------------------ */

const seedTargets = zh => [
  {v:'12',l:zh?'签约种子客户':'Seed customers signed',n:zh?'佛山供应链 5 · 三维家存量 4 · 体检私信 3；另备 6 家候补（2:1）':'5 supply chain · 4 Sunvega base · 3 checkup DMs; plus 6 on standby (2:1)'},
  {v:'8',l:zh?'跑满 90 天':'Complete 90 days',n:zh?'预期流失 4 家，不视为失败':'Four expected to drop — not treated as failure'},
  {v:'6',l:zh?'可对外案例':'Publishable cases',n:zh?'覆盖 3 个城市 × 2 个业态':'Across three cities and two store types'},
  {v:'3',l:zh?'带完整归因的案例':'Cases with full attribution',n:zh?'唯一能证明护城河的那三份':'The only three that prove the moat'}
];

const seedAdmit = zh => [
  zh?'家居建材 / 全屋定制 / 装修，单店到五店':'Home & building, whole-home custom or contracting — one to five locations',
  zh?'已有社媒账号且过去 30 天有发布 —— 否则归因没有基线数据':'Has a social account with posts in the last 30 days — otherwise attribution has no baseline',
  zh?'老板本人是决策人，且愿意每周给 30 分钟':'The owner is the decision-maker and will give 30 minutes a week',
  zh?'至少 3 名员工愿意绑号 —— 否则测不了员工矩阵':'At least three employees willing to bind accounts — otherwise the employee matrix cannot be tested',
  zh?'愿意授权公开门店名、员工姓名与真实数据':'Willing to license the store name, employee names and real numbers for publication'
];

const seedReject = zh => [
  zh?'完全没有社媒账号的门店 —— 90 天不够从零建号再产出可信数据':'Stores with no social presence at all — 90 days is not enough to build from zero and still produce credible data',
  zh?'要求我们代运营的 —— §8 已否决，且会把认知从软件变成代运营公司':'Anyone asking us to run it for them — rejected in §8, and it recasts us as an agency',
  zh?'只想要免费额度、不接受每周 30 分钟与公开授权的':'Anyone who wants the free credits but not the weekly 30 minutes and the publication licence'
];

const seedDeal = zh => ({
  give:[
    zh?'12 个月 Pro 免费（价值 $300）':'12 months of Pro at no charge (a $300 value)',
    zh?'1 次人工深度体检 + 品牌资产导入代做':'One human-run deep checkup plus done-for-you brand import',
    zh?'前 3 条内容由我们制作':'The first three pieces of content produced by us'
  ],
  get:[
    zh?'每周 30 分钟视频回顾，连续 12 周':'A 30-minute video review every week for 12 weeks',
    zh?'门店名、员工姓名、影像与数据的书面公开授权':'Written licence to publish the store name, employee names, footage and numbers',
    zh?'至少 3 名员工绑定社媒账号':'At least three employees with bound social accounts',
    zh?'上线 90 天内的全部产品数据可用于案例':'All in-product data from the first 90 days usable in the case study'
  ],
  never:[
    zh?'不给现金':'No cash',
    zh?'不做定制开发':'No custom development',
    zh?'不承诺具体线索数量':'No promised lead volume'
  ]
});

const seedPhases = zh => [
  {p:'D0–D7',t:zh?'接入周':'Onboarding',acts:[zh?'人工深度体检，出报告':'Human deep checkup, report delivered',zh?'品牌资产导入并由店主确认':'Brand assets imported and confirmed by the owner',zh?'绑定 ≥3 名员工账号':'Bind at least three employee accounts',zh?'第一条内容上线':'First piece of content published'],gate:zh?'7 天内必须发出第一条 —— 未达标即换候补，不谈条件':'The first post must go out within seven days. Miss it and the standby replaces them — no negotiation.',test:'—'},
  {p:'D8–D30',t:zh?'产能周':'Volume',acts:[zh?'每周 15 条（5 名员工 × 3 条）':'15 posts a week (five employees × three)',zh?'达到算法要求的 15–50 条活跃素材门槛':'Clear the 15–50 active-creative threshold the algorithm needs',zh?'埋点 live_ratio，观察实拍占比':'Instrument live_ratio and watch the real-footage share'],gate:zh?'第 30 天累计 ≥45 条，实拍占比 ≥50%':'By day 30: 45+ posts cumulative, real-footage share ≥50%',test:'M6'},
  {p:'D31–D60',t:zh?'归因周':'Attribution',acts:[zh?'输出第一份内容级 / 员工级归因报告':'Deliver the first content-level and employee-level attribution report',zh?'店主用员工榜做一次真实的考核动作':'Owner runs one real performance conversation off the employee leaderboard',zh?'对比 Lite 的残缺归因视图':'Compare against the Lite partial-attribution view'],gate:zh?'归因链路能把 ≥20 条到店线索定位到具体内容与具体员工':'Attribution ties 20+ walk-in leads to a specific post and a specific employee',test:'M4'},
  {p:'D61–D90',t:zh?'成案周':'Case build',acts:[zh?'第二次账号体检，与首次对比':'Second account checkup, compared against the first',zh?'拍摄案例素材（用产品自己做）':'Shoot the case assets — using the product itself',zh?'签署最终公开授权':'Sign the final publication licence'],gate:zh?'健康分提升 ≥15 分，且店主复检行为是自发的':'Health score up 15+ points, and the re-checkup was initiated by the owner',test:'M5'}
];

const caseGates = zh => [
  zh?'连续使用 ≥60 天，累计发布 ≥90 条':'60+ consecutive days of use, 90+ posts published',
  zh?'产品内有归因记录的到店线索 ≥20 条':'20+ walk-in leads with in-product attribution records',
  zh?'账号健康分提升 ≥15 分（店主可自行核对）':'Health score up by 15+ points, verifiable by the owner',
  zh?'门店签署书面授权：店名 · 员工姓名 · 数据 · 影像':'Signed written licence covering store name, employee names, data and footage'
];

const caseKit = zh => [
  [zh?'一页 PDF':'One-page PDF',zh?'销售可直发，只含可核对的数字':'Directly sendable by sales, only verifiable numbers'],
  [zh?'90 秒案例视频':'90-second case video',zh?'用 VertensAI 自己做 —— 做不出来就说明产品不成立':'Made with VertensAI itself — if we cannot, the product does not stand up'],
  [zh?'落地页版块':'Landing-page module',zh?'挂在体检报告结果页下方':'Sits below the checkup result page'],
  [zh?'销售话术卡':'Sales talk track',zh?'按 §7 顺序：先承认不做什么':'Follows the §7 order — concede first'],
  [zh?'店主 30 秒证言':'30-second owner testimonial',zh?'本人出镜，不用数字人 —— 这一条不能造假':'The owner on camera, not an avatar — this one cannot be synthetic']
];

const seedRisks = zh => [
  [zh?'数据不好看':'The numbers are bad', zh?'提前在合同里约定：不达标就不发，且我们不修饰数据。一份经不起核对的案例，比没有案例更贵。':'Agreed in the contract up front: below the bar, nothing gets published, and we never dress the numbers. A case that fails inspection costs more than no case.'],
  [zh?'店主中途放弃':'The owner drops out', zh?'签 12 家、备 6 家（2:1）。任何一家连续两周未发布即启动替换。':'Sign 12, hold 6 in reserve (2:1). Two consecutive weeks without publishing triggers replacement.'],
  [zh?'员工不配合绑号':'Employees will not bind accounts', zh?'绑号率 <60% 判定该店案例失败，及时止损，不要把三个月耗在一家跑不动的店上。':'Below 60% binding, the case is declared failed. Cut early rather than spend three months on a store that will not move.'],
  [zh?'案例过度集中在单一城市或单一业态':'Cases cluster in one city or store type', zh?'签约时就按 3 城市 × 2 业态排布，不接受同城第 5 家。':'Allocate across three cities and two store types at signing; no fifth store from the same city.']
];

/* --- component ----------------------------------------------------------- */

function Block({eyebrow,title,copy,children}) {
  return <section className="hc-block">
    <header><span>{eyebrow}</span><h3>{title}</h3>{copy&&<p>{copy}</p>}</header>
    {children}
  </section>;
}

function HelpCenterPage({ language }) {
  const zh = language === 'zh';
  const [tab, setTab] = useState('gtm');
  const [group, setGroup] = useState('all');
  const [openScript, setOpenScript] = useState(null);
  const groups = scriptGroups(zh);
  const allScripts = scripts(zh);
  const rows = allScripts.filter(s => group === 'all' || s.g === group);
  const boards = storyboards(zh);
  const activeScript = openScript ? allScripts.find(s => s.id === openScript) : null;
  return <div className="page help-page">
    <PageHead zh={zh}/>
    <div className="hc-tabs" role="tablist">
      <button role="tab" aria-selected={tab==='gtm'} className={tab==='gtm'?'active':''} onClick={()=>setTab('gtm')}><Megaphone weight={tab==='gtm'?'fill':'regular'}/>{zh?'一 · 营销策略':'One · Growth strategy'}</button>
      <button role="tab" aria-selected={tab==='seed'} className={tab==='seed'?'active':''} onClick={()=>setTab('seed')}><Handshake weight={tab==='seed'?'fill':'regular'}/>{zh?'二 · 种子客户成功案例':'Two · Seed customer cases'}</button>
    </div>

    {activeScript && <StoryboardModal zh={zh} script={activeScript} board={boards[activeScript.id]} group={groups.find(g=>g.id===activeScript.g)} onClose={()=>setOpenScript(null)}/>}

    {tab==='gtm' && <div className="hc-body">
      <section className="hc-verdict">
        <div>
          <span>{zh?'结论':'THE CALL'}</span>
          <h3>{zh?'美国。守家居建材。不投放。':'The United States. Stay in home & building. Do not buy traffic.'}</h3>
          <p>{zh?'定价定完之后，获客方式就不再是开放选择题了。月 ARPU $20–28、月毛利 $15–21，把 CAC 上限压到 $34–53 —— 这个数字在 Meta 或 TikTok 上买一个门店老板几乎不可能。所以整套策略只能建在四件东西上：免费体检钩子、现成关系链、内容 SEO、产品自带的员工传播。':'Once pricing was set, acquisition stopped being an open question. A $20–28 monthly ARPU and $15–21 monthly gross profit force a CAC ceiling of $34–53 — a number you cannot buy a store owner for on Meta or TikTok. Everything therefore rests on four things: the free checkup hook, existing relationships, content SEO, and the product’s own employee distribution.'}</p>
        </div>
        <div className="hc-constraints">
          {constraintCards(zh).map(c=><article key={c.label}><c.icon weight="fill"/><span>{c.label}</span><b>{c.value}</b><small>{c.note}</small></article>)}
        </div>
      </section>

      <Block eyebrow={zh?'国家':'COUNTRY'} title={zh?'国家这一层其实没得选':'There is no real choice at the country level'} copy={zh?'CAC 硬约束已经把国家选择做完了。剩下的筛子只有三格，美国不是最优解，是唯一同时过三格的。':'The CAC constraint already made this decision. Three filters remain — the US is not the best option, it is the only one that clears all three.'}>
        <div className="hc-table hc-table-3">
          <div className="hc-row hc-head"><span>{zh?'条件':'Filter'}</span><span>{zh?'依据':'Source'}</span><span>{zh?'淘汰谁':'Rules out'}</span></div>
          {countryFilter(zh).map(r=><div className="hc-row" key={r[0]}><span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span></div>)}
        </div>
        <div className="hc-reject">
          <h4><Prohibit weight="fill"/>{zh?'明确不做首发的三个市场':'Three markets explicitly not launching in'}</h4>
          {rejectedMarkets(zh).map(r=><article key={r[0]}><b>{r[0]}</b><p>{r[1]}</p></article>)}
        </div>
      </Block>

      <Block eyebrow={zh?'圈层':'BEACHHEAD'} title={zh?'真问题不是「美国」，是美国的哪个圈层':'The real question is not the US — it is which circle inside it'} copy={zh?'两个候选圈层，各有一个未验证的致命假设。不要现在选：用同一周、同样五十份人工报告，同时验。':'Two candidate circles, each with one untested fatal assumption. Do not choose now — test both in the same week with the same fifty manual reports.'}>
        <div className="hc-circles">
          {circles(zh).map(c=><article key={c.tag}>
            <header><i>{c.tag}</i><div><b>{c.name}</b><small><MapPin/>{c.geo} · {c.lang}</small></div></header>
            <ul>{c.edge.map(e=><li key={e}><CheckCircle weight="fill"/>{e}</li>)}</ul>
            <div className="hc-risk"><Warning weight="fill"/><div><b>{zh?'致命假设':'Fatal assumption'}</b><p>{c.risk}</p></div></div>
            <footer><span>{zh?'怎么验':'How it gets tested'}</span><b>{c.test}</b></footer>
          </article>)}
        </div>
      </Block>

      <Block eyebrow={zh?'赛道':'TRACK'} title={zh?'守家居建材，至少前十二个月不泛化':'Hold home & building — no generalisation for at least twelve months'} copy={zh?'M7 的答案先定为「守」，用前 50 个客户的行业分布回测。泛化到通用 local 有市场，但有三条各自独立的成本。':'M7 is answered "hold" for now, to be re-tested against the industry mix of the first 50 customers. Generalising to all local businesses has a market — and three independent costs.'}>
        <div className="hc-reasons">{trackReasons(zh).map(r=><article key={r[0]}><b>{r[0]}</b><p>{r[1]}</p></article>)}</div>
        <div className="hc-position"><Compass weight="fill"/><div><b>{zh?'定位坐标':'Position'}</b><p>{zh?'「AI 生成 × 多门店员工运营」的交叉点，$20–300 价格带 —— 生成类为电商投手设计，排期类为社媒运营岗设计，多门店类为百店总部设计。单店到十店的家居建材，这一格是空的。':'The intersection of AI generation and multi-location employee operations, in the $20–300 band. Generation tools are built for e-commerce buyers, schedulers for social managers, multi-location suites for 100-store headquarters. One-to-ten-location home & building is an empty cell.'}</p></div></div>
      </Block>

      <Block eyebrow={zh?'渠道':'CHANNELS'} title={zh?'八条渠道，按每获取一个客户的成本排序':'Eight channels, ranked by cost per acquired customer'} copy={zh?'排序原则很简单：先用完所有不花钱的关系和内容，再考虑花钱。第 8 条列在这里不是为了执行，是为了标明它的边界。':'The ordering rule is simple: exhaust every free relationship and every piece of content before spending. Channel 8 is listed to mark its boundary, not to be executed.'}>
        <div className="hc-table hc-table-channels">
          <div className="hc-row hc-head"><span>#</span><span>{zh?'渠道':'Channel'}</span><span>{zh?'圈层':'Circle'}</span><span>{zh?'预期 CAC':'Expected CAC'}</span><span>{zh?'月产出':'Monthly volume'}</span><span>{zh?'验证指标':'Metric'}</span></div>
          {channels(zh).map(c=><div className={`hc-row ${c.rank===8?'muted':''}`} key={c.rank}>
            <span className="hc-rank">{c.rank}</span>
            <span><b>{c.name}</b><small>{c.why}</small></span>
            <span>{c.circle}<small>{c.lang}</small></span>
            <span className="hc-num">{c.cac}</span>
            <span>{c.vol}</span>
            <span>{c.metric}</span>
          </div>)}
        </div>
      </Block>

      <Block eyebrow={zh?'测试素材':'TEST CREATIVE'} title={zh?'20 套脚本，三周投完':'Twenty scripts, run over three weeks'} copy={zh?'每套出 3 个第一句变体，共 60 个素材。判断一条素材好不好，标准不是播放量，是它能不能被转发进一个微信群或一个 Facebook 本地商家组。':'Three opening-line variants each, 60 pieces total. A piece is judged not by views but by whether it gets reshared into a WeChat group or a Facebook local-business group.'}>
        <div className="hc-groupnav">
          <button className={group==='all'?'active':''} onClick={()=>setGroup('all')}>{zh?'全部 20 套':'All 20'}</button>
          {groups.map(g=><button key={g.id} className={group===g.id?'active':''} onClick={()=>setGroup(g.id)}>{g.name}<i>{g.share}</i></button>)}
        </div>
        {group!=='all' && <p className="hc-groupintent">{groups.find(g=>g.id===group).intent}</p>}
        <div className="hc-scripts">
          {rows.map(s=><article key={s.id} className={s.star?'starred':''} role="button" tabIndex={0}
            aria-label={`${s.id} ${zh?'完整分镜脚本':'full storyboard'}`}
            onClick={()=>setOpenScript(s.id)}
            onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setOpenScript(s.id);}}}>
            <header><i>{s.id}</i><em>{s.lang}</em><span>{s.ch}</span><span className="hc-circle-tag">{zh?'圈层':'Circle'} {s.cir}</span></header>
            <blockquote>{s.hook}</blockquote>
            <footer>
              <div><span>{zh?'形式':'Format'}</span><b>{s.fmt}</b></div>
              <div><span>{zh?'成本':'Cost'}</span><b>{s.cost}</b></div>
              <div className="hc-hyp"><span>{zh?'测什么':'What it tests'}</span><b>{s.hyp}</b></div>
            </footer>
            <span className="hc-open-sb"><FilmSlate weight="fill"/>{zh?'查看完整分镜脚本':'Open full storyboard'}<ArrowRight/></span>
          </article>)}
        </div>
        <div className="hc-banned">
          <h4><Prohibit weight="fill"/>{zh?'明确不拍的六类':'Six things we do not shoot'}</h4>
          <div>{bannedCreative(zh).map(b=><article key={b[0]}><b>{b[0]}</b><p>{b[1]}</p></article>)}</div>
        </div>
      </Block>

      <Block eyebrow={zh?'判据':'TEST PROTOCOL'} title={zh?'唯一的北极星：每个免费体检的获取成本':'One north star: cost per free checkup'} copy={zh?'不要看播放量，不要看粉丝。体检提交是唯一同时代表意图和可归因的动作。':'Not views, not followers. A submitted checkup is the only action that is both intentful and attributable.'}>
        <div className="hc-derive">
          <div className="hc-formula">
            <b>{zh?'单体检成本上限 = CAC 上限 × 体检转付费率':'Cost-per-checkup ceiling = CAC ceiling × checkup-to-paid rate'}</b>
            <p>{zh?'CAC 上限 $34 来自 §5（2 个月回本）。转化率目前无实测数据，以下三档为敏感度测算。':'The $34 CAC ceiling comes from §5 (two-month payback). The conversion rate is unmeasured; the three rows below are a sensitivity range.'}</p>
            <div className="hc-sens">
              <div className="hc-sens-head"><span>{zh?'体检转付费':'Checkup → paid'}</span><span>{zh?'单体检成本上限':'Cost-per-checkup ceiling'}</span></div>
              {sensitivity.map(([c,v])=><div key={c} className={c==='8%'?'active':''}><span>{c}</span><span>{v}</span></div>)}
            </div>
            <small><Warning weight="fill"/>{zh?'8% 是假设值，不是实测。上线后第一个 30 天必须用真实数据替换，本页所有阈值随之重算。':'8% is an assumption, not a measurement. Replace it with real data in the first 30 days; every threshold on this page recalculates with it.'}</small>
          </div>
          <div className="hc-verdicts">
            {verdicts(zh).map(v=><article key={v.label} className={`hc-verdict-${v.tone}`}><b>{v.label}</b><p>{v.rule}</p><small>{v.act}</small></article>)}
          </div>
        </div>
      </Block>

      <Block eyebrow={zh?'排期':'SEQUENCE'} title={zh?'二十周，每一段只回答一个问题':'Twenty weeks, each stage answering exactly one question'}>
        <div className="hc-timeline">
          {timeline(zh).map(t=><article key={t.w}><header><span>{t.w}</span><b>{t.t}</b></header><p>{t.d}</p><footer><Flag weight="fill"/>{t.out}</footer></article>)}
        </div>
      </Block>

      <Block eyebrow={zh?'数据来源':'SOURCES'} title={zh?'本页每个数字的出处':'Where every number on this page comes from'}>
        <div className="hc-sources">{sources(zh).map(s=><div key={s[0]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div>
        <div className="hc-open">
          <h4><Question weight="fill"/>{zh?'五个还没有数据、不能替你判断的点':'Five open items — no data, no call to make yet'}</h4>
          <ol>{openItems(zh).map(i=><li key={i}>{i}</li>)}</ol>
        </div>
      </Block>
    </div>}

    {tab==='seed' && <div className="hc-body">
      <section className="hc-verdict hc-verdict-seed">
        <div>
          <span>{zh?'目标':'THE GOAL'}</span>
          <h3>{zh?'十二家种子客户，换六份经得起核对的案例':'Twelve seed customers, six cases that survive inspection'}</h3>
          <p>{zh?'种子期不是销售，是取证。我们要的不是十二笔收入，是六份能让第十三个客户自己做决定的证据 —— 以及模板库的第一批原料。删掉代运营之后，模板库只剩「自己投放」和「产品内归因回传」两条来源，种子客户就是第二条的开关。':'The seed phase is evidence-gathering, not selling. We are not after twelve payments — we are after six pieces of evidence that let customer thirteen decide on their own, plus the first raw material for the template library. With the agency line removed, that library has only two sources left: our own ads and in-product attribution feedback. Seed customers are the switch on the second one.'}</p>
        </div>
        <div className="hc-seedtargets">{seedTargets(zh).map(t=><article key={t.l}><b>{t.v}</b><span>{t.l}</span><small>{t.n}</small></article>)}</div>
      </section>

      <Block eyebrow={zh?'准入':'ADMISSION'} title={zh?'五条硬条件，缺一条就不签':'Five hard conditions — miss one and we do not sign'} copy={zh?'门槛严不是傲慢。一家没有账号、不肯绑员工、不肯授权的门店，跑满九十天也产不出一份能用的案例，只是消耗我们唯一一次冷启动的机会。':'The bar is not arrogance. A store with no account, no employee binding and no licence will produce nothing usable after ninety days — it just burns our one cold-start window.'}>
        <div className="hc-admit">
          <div className="hc-admit-yes"><h4><CheckCircle weight="fill"/>{zh?'必须全部满足':'All five required'}</h4><ol>{seedAdmit(zh).map(a=><li key={a}>{a}</li>)}</ol></div>
          <div className="hc-admit-no"><h4><Prohibit weight="fill"/>{zh?'直接排除':'Excluded outright'}</h4><ul>{seedReject(zh).map(a=><li key={a}>{a}</li>)}</ul></div>
        </div>
      </Block>

      <Block eyebrow={zh?'对价':'THE DEAL'} title={zh?'我们给什么，换什么，以及绝不给什么':'What we give, what we get, and what we never give'} copy={zh?'把它写成一份两页的书面协议，签字。口头承诺在第 60 天数据不好看的时候一文不值。':'Put it in a signed two-page agreement. Verbal understandings are worthless on day 60 when the numbers disappoint.'}>
        <div className="hc-deal">
          <article className="hc-deal-give"><h4>{zh?'我们给':'We give'}</h4><ul>{seedDeal(zh).give.map(i=><li key={i}><CheckCircle weight="fill"/>{i}</li>)}</ul></article>
          <article className="hc-deal-get"><h4>{zh?'我们要':'We get'}</h4><ul>{seedDeal(zh).get.map(i=><li key={i}><ArrowRight/>{i}</li>)}</ul></article>
          <article className="hc-deal-never"><h4>{zh?'绝不给':'Never'}</h4><ul>{seedDeal(zh).never.map(i=><li key={i}><Prohibit weight="fill"/>{i}</li>)}</ul></article>
        </div>
      </Block>

      <Block eyebrow={zh?'节奏':'CADENCE'} title={zh?'九十天分四段，每段一个可执行的门槛':'Ninety days in four stages, each with an enforceable gate'} copy={zh?'门槛的意义在于敢执行。任何一段没过，就换候补 —— 把三个月耗在一家跑不动的门店上，代价是少一份案例。':'A gate only matters if you enforce it. Miss one and the standby takes over — three months spent on a store that will not move costs us a whole case.'}>
        <div className="hc-phases">
          {seedPhases(zh).map(p=><article key={p.p}>
            <header><b>{p.p}</b><span>{p.t}</span>{p.test!=='—'&&<i>{zh?'验':'Tests'} {p.test}</i>}</header>
            <ul>{p.acts.map(a=><li key={a}>{a}</li>)}</ul>
            <footer><Flag weight="fill"/><div><span>{zh?'门槛':'Gate'}</span><b>{p.gate}</b></div></footer>
          </article>)}
        </div>
        <div className="hc-weekly"><CalendarCheck weight="fill"/><div><b>{zh?'每周三个固定动作':'Three fixed weekly actions'}</b><p>{zh?'周一派任务（PC 端建任务，全员移动端收到）· 周三中期检查（发布进度与绑号状态）· 周五 15 分钟视频回顾（只看三个数：发布数、实拍占比、归因线索数）。':'Monday: assign tasks on desktop, the whole team receives them on mobile. Wednesday: mid-week check on publishing progress and account binding. Friday: a 15-minute video review covering exactly three numbers — posts published, real-footage share, attributed leads.'}</p></div></div>
      </Block>

      <Block eyebrow={zh?'成案':'PUBLICATION BAR'} title={zh?'四条硬门槛，缺一条就不发':'Four hard gates — miss one and it does not ship'} copy={zh?'这是 §6 纪律二的延伸：一份经不起客户自己去后台核对的案例，比没有案例更贵。':'This extends the second discipline in §6 — a case that cannot survive the customer checking it in their own dashboard costs more than no case.'}>
        <div className="hc-gates">{caseGates(zh).map((g,i)=><article key={g}><b>{i+1}</b><p>{g}</p></article>)}</div>
        <div className="hc-kit">
          <h4><VideoCamera weight="fill"/>{zh?'每份案例的五件套':'Five deliverables per case'}</h4>
          <div>{caseKit(zh).map(k=><article key={k[0]}><b>{k[0]}</b><small>{k[1]}</small></article>)}</div>
        </div>
      </Block>

      <Block eyebrow={zh?'风险':'RISKS'} title={zh?'四个会让种子期白跑的风险，以及止损线':'Four risks that waste the whole seed phase, and where to cut'}>
        <div className="hc-risks">{seedRisks(zh).map(r=><article key={r[0]}><header><Warning weight="fill"/><b>{r[0]}</b></header><p>{r[1]}</p></article>)}</div>
      </Block>

      <Block eyebrow={zh?'反向价值':'SECOND ORDER'} title={zh?'种子期真正的产出不是案例，是模板库的冷启动':'The real output is not the cases — it is the template library’s cold start'}>
        <div className="hc-secondorder">
          <div><Lightning weight="fill"/><b>{zh?'壁垒不是「能生成」，是「知道什么内容能获客」':'The moat is not generation — it is knowing which content brings people in'}</b><p>{zh?'十二家门店九十天，按每周 15 条估算，约 2,000 条真实发布记录，每一条都带归因回传。这是第一批「效果数据」，也是模板库唯一的米。案例是它的副产品，不是相反。':'Twelve stores over ninety days, at roughly 15 posts a week, is about 2,000 real publishing records — every one of them with attribution feedback. That is the first batch of outcome data and the only grain the template library has. The case studies are a by-product of it, not the other way round.'}</p></div>
          <div><Users weight="fill"/><b>{zh?'同时验掉三条待验假设':'It also settles three open hypotheses'}</b><p>{zh?'M4 残缺归因能否驱动升级 · M5 客户会不会每月复检 · M6 实拍占比能否到 50%。这三条都无法靠问卷或访谈回答，只能靠九十天真实使用。':'M4 — whether partial attribution drives upgrades. M5 — whether customers re-run the checkup monthly. M6 — whether real footage reaches 50%. None can be answered by a survey; only by ninety days of real use.'}</p></div>
        </div>
      </Block>
    </div>}
  </div>;
}

function StoryboardModal({ zh, script, board, group, onClose }) {
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!board) return null;
  const columnHead = {
    shot:[zh?'镜号':'Shot',zh?'时间':'Time',zh?'画面 · 怎么拍':'Frame and direction',zh?'口播 / 字幕原文':'Voice-over / on-screen copy'],
    outline:[zh?'段':'Part',zh?'位置':'Position',zh?'内容':'Content',zh?'要点原文':'Key line'],
    layout:[zh?'版位':'Slot',zh?'位置':'Position',zh?'内容':'Content',zh?'文案原文':'Copy']
  }[board.kind] || [];
  const emptyLine = board.kind==='shot' ? (zh?'无口播':'No voice-over') : (zh?'撰稿时定':'Written at draft stage');
  return <div className="sb-scrim" onMouseDown={onClose}>
    <section className="sb-modal" role="dialog" aria-modal="true" aria-label={board.title} onMouseDown={event=>event.stopPropagation()}>
      <header className="sb-head">
        <div>
          <div className="sb-tags"><i>{script.id}</i><em>{script.lang}</em><span>{script.ch}</span><span>{zh?'圈层':'Circle'} {script.cir}</span>{group&&<span>{group.name}</span>}</div>
          <h3>{board.title}</h3>
          <p>{board.goal}</p>
        </div>
        <button aria-label={zh?'关闭':'Close'} onClick={onClose}><X/></button>
      </header>
      <div className="sb-body">
        <div className="sb-spec"><FilmSlate weight="fill"/><span>{board.spec}</span></div>

        <section className="sb-section">
          <h4>{zh?'第一句 · 三个变体':'Opening line · three variants'}<small>{zh?'只改第一句，其余镜头不动。三个变体各投一轮，取最优。':'Change only the first line; every other shot stays fixed. Run all three and keep the winner.'}</small></h4>
          <ol className="sb-hooks">{board.hooks.map((h,i)=><li key={h}><b>V{i+1}</b><q>{h}</q></li>)}</ol>
        </section>

        <section className="sb-section">
          <h4>{board.kind==='shot'?(zh?'分镜表':'Shot list'):board.kind==='outline'?(zh?'内容大纲':'Outline'):(zh?'版面':'Layout')}</h4>
          <div className="sb-table">
            <div className="sb-row sb-row-head">{columnHead.map(c=><span key={c}>{c}</span>)}</div>
            {board.shots.map(shot=><div className="sb-row" key={shot.n+shot.t}>
              <span className="sb-n">{shot.n}</span>
              <span className="sb-t">{shot.t}</span>
              <span className="sb-v">{shot.v}{shot.note&&<small><Warning weight="fill"/>{shot.note}</small>}</span>
              <span className="sb-s">{shot.s ? <q>{shot.s}</q> : <i>{emptyLine}</i>}</span>
            </div>)}
          </div>
        </section>

        <div className="sb-split">
          <section className="sb-section">
            <h4>{zh?'拍摄准备':'Production prep'}</h4>
            <ul className="sb-list">{board.prep.map(p=><li key={p}><CheckCircle weight="fill"/>{p}</li>)}</ul>
          </section>
          <section className="sb-section">
            <h4>{zh?'发布配置':'Publishing setup'}</h4>
            <div className="sb-kv">{board.publish.map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
          </section>
        </div>

        <section className="sb-section sb-guard">
          <h4><Prohibit weight="fill"/>{zh?'红线':'Guardrails'}</h4>
          <ul>{board.guard.map(g=><li key={g}>{g}</li>)}</ul>
        </section>
      </div>
      <footer className="sb-foot">
        <span>{zh?'测什么':'What it tests'}<b>{script.hyp}</b></span>
        <button className="secondary" onClick={onClose}>{zh?'关闭':'Close'}</button>
      </footer>
    </section>
  </div>;
}

function PageHead({zh}) {
  return <div className="page-title hc-title">
    <div>
      <span>{zh?'帮助中心 · 内部增长手册':'HELP CENTER · INTERNAL GROWTH PLAYBOOK'}</span>
      <h2>{zh?'VertensAI 营销策划方案':'VertensAI go-to-market plan'}</h2>
      <p>{zh?'两部分：先定去哪个国家、打什么赛道、走什么渠道，并给出 20 套用于测试的脚本；再定第一批种子客户怎么运营成可对外的成功案例。所有数字要么来自定价模型，要么被明确标注为假设。':'Two parts. First: which country, which track, which channels — plus twenty scripts to test them with. Second: how the first cohort of seed customers becomes publishable proof. Every number here is either derived from the pricing model or explicitly marked as an assumption.'}</p>
    </div>
    <div className="hc-stamp"><Globe weight="fill"/><div><b>{zh?'美国 · 家居建材':'United States · Home & Building'}</b><small>{zh?'2026-08-24 · V1':'24 Aug 2026 · V1'}</small></div></div>
  </div>;
}

export default HelpCenterPage;
export { HelpCenterPage };
