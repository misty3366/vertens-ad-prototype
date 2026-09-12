import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Article, Baby, Barbell, Bed, BookOpen, BookmarkSimple, Broadcast, Buildings, CalendarBlank, CalendarCheck, Camera, Car, ChartLineUp, Check, CheckCircle,
  CaretDown, CaretUp, CirclesFour, Clock, Code, Copy, CursorClick, Database, DotsThree,
  Coffee, Confetti, Eye, FacebookLogo, FileText, Fire, FolderSimple, ForkKnife, Globe, GraduationCap, Heart, Heartbeat, House, Image as ImageIcon,
  Funnel, InstagramLogo, LinkSimple, Lock, MagicWand, MagnifyingGlass, MapPin, Microphone,
  Minus, Moon, Package, PaperPlaneTilt, PawPrint, Play, Plus, Robot, Scissors, ShareNetwork, ShoppingBag, Sparkle, Sun,
  ArrowCircleUp, ShieldCheck, SpinnerGap, Storefront, Strategy, Target, TiktokLogo, TrendUp, UploadSimple, UserPlus,
  SidebarSimple, TShirt, UserCircle, Users, VideoCamera, WhatsappLogo, X
} from '@phosphor-icons/react';
import {
  ReactFlow, Background, Controls, MiniMap, Handle, Position,
  useEdgesState, useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import HelpCenterPage from './helpCenter.jsx';
import StudioSite from './studio.jsx';

const images = {
  kitchen: '/assets/calacatta-kitchen.png',
  patio: '/assets/patio-pavers.png',
  bath: '/assets/stone-bathroom.png',
  presenter: '/assets/viral-presenter.png',
  avatar: '/assets/ai-presenter.png',
  sofia: '/assets/actor-sofia.png'
};

const tierOrder = { lite: 1, pro: 2 };
const tierLabels = { lite: 'Lite', pro: 'Pro' };
const navigation = [
  { section: 'workspace', items: [
    ['home', 'Home', House, 'lite'], ['brand', 'My Brand', Buildings, 'lite'],
    ['assets', 'Assets', Package, 'lite'], ['avatars', 'AI Avatars', UserCircle, 'lite']
  ]},
  { section: 'create', items: [
    ['agent', 'AI Agent', Sparkle, 'lite'], ['templates', 'Templates', Article, 'lite'], ['canvas', 'Viral Canvas', ShareNetwork, 'lite']
  ]},
  { section: 'growth', items: [
    ['leads', 'Leads', Target, 'lite'], ['performance', 'Performance', ChartLineUp, 'pro']
  ]},
  { section: 'operate', items: [
    ['calendar', 'Marketing Calendar', CalendarBlank, 'pro'], ['publishing', 'Publishing', Broadcast, 'lite'],
    ['channels', 'Social Accounts', CirclesFour, 'lite'], ['team', 'Team', Users, 'pro']
  ]}
];

const uiCopy = {
  en: {
    sections:{workspace:'Workspace',create:'Create',operate:'Operate',growth:'Growth'},
    nav:{home:'Home',projects:'Projects',brand:'My Brand',assets:'Assets',team:'Team',agent:'AI Agent',templates:'Templates',canvas:'Viral Canvas',avatars:'AI Avatars',service:'Human Admaker',calendar:'Marketing Calendar',publishing:'Publishing',channels:'Social Accounts',performance:'Performance',leads:'Leads'},
    account:{help:'Help center',theme:'Appearance',language:'Language',usage:'This month',plan:'Plan and billing',logout:'Log out',remaining:'pieces delivered'}
  },
  zh: {
    sections:{workspace:'工作台',create:'创作',operate:'运营',growth:'增长'},
    nav:{home:'首页',projects:'项目',brand:'我的品牌',assets:'素材',team:'团队',agent:'AI 智能体',templates:'爆款模板',canvas:'爆款画布',avatars:'数字人',service:'人工广告服务',calendar:'营销日历',publishing:'发布',channels:'社媒账号',performance:'效果分析',leads:'线索'},
    account:{help:'帮助中心',theme:'显示模式',language:'语言',usage:'本月用量',plan:'套餐与账单',logout:'退出登录',remaining:'条成品已交付'}
  }
};

const actors = [
  ['Sofia', 'Local business host', 'English · Spanish', images.sofia],
  ['Maya', 'Beauty & wellness advisor', 'English · French', images.avatar],
  ['Daniel', 'Restaurant owner', 'English · Portuguese', images.presenter],
  ['Amelia', 'Retail presenter', 'English · German', images.sofia],
  ['Luis', 'Business owner', 'Spanish · English', images.presenter],
  ['Nina', 'Lifestyle creator', 'English · Italian', images.avatar],
  ['Chloe', 'Service expert', 'English · French', images.sofia],
  ['Marcus', 'Fitness coach', 'English · Spanish', images.presenter]
];

const projectCatalog = [
  {id:'owner-pilot',name:'Owner product pilot',location:'Luma Local · Downtown',image:images.presenter,type:'Video · Ready',threads:[['owner-video','Weekend product owner ad','Generating 3 variants',VideoCamera],['local-images','Local product images','6 images · Ready',ImageIcon]]},
  {id:'restaurant-campaign',name:'Weekend restaurant campaign',location:'Casa Luma · Madrid',image:images.kitchen,type:'Viral workflow · Draft',threads:[['dish-launch','Signature dish launch','Draft workflow',VideoCamera],['menu-images','Menu product images','4 images · Ready',ImageIcon]]},
  {id:'beauty-launch',name:'Beauty booking launch',location:'Studio Numa · Valencia',image:images.patio,type:'Image pack · Ready',threads:[['booking-video','Treatment booking video','Completed',VideoCamera],['before-after','Before and after set','8 images · Ready',ImageIcon]]}
];

const modelVendors = [
  {name:'Seedance',models:['Seedance 2.5 Global','Seedance 2.0 Global','Seedance 2.0 Global Fast','Seedance 2.0 Global Mini','Seedance 1.5 Pro']},
  {name:'Kling',models:['Kling 3.0','Kling 2.6 Pro','Kling 2.5 Turbo']},
  {name:'MiniMax',models:['MiniMax Hailuo 2.3','MiniMax Hailuo Fast']},
  {name:'Vidu',models:['Vidu Q2 Pro','Vidu Q2 Turbo']},
  {name:'Wan',models:['Wan 2.6','Wan 2.2 Animate']},
  {name:'Midjourney',models:['Midjourney V7','Midjourney Niji 7']},
  {name:'Google',models:['Veo 3.1','Imagen 4 Ultra']},
  {name:'OpenAI',models:['Sora 2','GPT Image 1.5']}
];

const industryFilters = [
  ['All industries', CirclesFour], ['Restaurants', ForkKnife], ['Beauty & Salon', Scissors],
  ['Home & Building', Buildings], ['Fitness', Barbell], ['Pet Services', PawPrint],
  ['Education', GraduationCap], ['Auto Services', Car], ['Health & Wellness', Heartbeat],
  ['Retail', ShoppingBag], ['Kids & Family', Baby], ['Wedding & Events', Heart],
  ['Hotels & Travel', Bed], ['Cafés & Bakeries', Coffee], ['Fashion', TShirt],
  ['Photography', Camera], ['Entertainment', Confetti]
];

const tools = [
  ['URL to video', LinkSimple, 'Turn any product page into a short ad'],
  ['Image generation', ImageIcon, 'Create product scenes and campaign images'],
  ['Video generation', VideoCamera, 'Text or image to short video'],
  ['Viral script', Article, 'Extract, rewrite and localize hooks'],
  ['Avatar video', UserCircle, 'Create presenter-led local ads'],
  ['Translate', Globe, 'Localize copy, voice and captions'],
  ['Background edit', MagicWand, 'Remove, replace or extend a scene'],
  ['Voiceover', Microphone, 'Natural voices in 28+ languages']
];

function Logo() {
  return <div className="logo"><span className="logo-sun">S</span><strong>VertensAI</strong></div>;
}

function Sidebar({ page, setPage, expanded, pinned, setPinned, setHovered, theme, setTheme, tier, setTier, language, setLanguage }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const copy = uiCopy[language];
  const changeTier = nextTier => {
    setTier(nextTier);
    const currentItem = navigation.flatMap(group => group.items).find(item => item[0] === page);
    if (currentItem && tierOrder[currentItem[3]] > tierOrder[nextTier]) setPage('home');
  };
  const goStudio = () => { window.open(`${import.meta.env.BASE_URL || '/'}studio.html`, '_blank', 'noopener'); };
  return <aside className={`sidebar ${expanded ? 'expanded' : ''} ${expanded && !pinned ? 'hover-expanded' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <Logo />
    <div className="tier-switch" aria-label="Prototype product stage">
      {Object.keys(tierOrder).map(id => <button key={id} className={tier === id ? 'active' : ''} title={`${tierLabels[id]} feature scope`} onClick={() => changeTier(id)}>{tierLabels[id]}</button>)}
    </div>
    <button className={`sidebar-toggle ${pinned ? 'pinned' : ''}`} aria-label={pinned ? 'Unpin menu' : 'Pin menu'} title={pinned ? 'Unpin menu' : 'Pin menu'} onClick={() => setPinned(!pinned)}><SidebarSimple size={19} weight={pinned ? 'fill' : 'regular'}/></button>
    <nav>
      {navigation.map(group => {
        const visibleItems = group.items.filter(item => tierOrder[item[3]] <= tierOrder[tier]);
        if (!visibleItems.length) return null;
        return <div className="nav-group" key={group.section}>
        <span>{copy.sections[group.section]}</span>
        {visibleItems.map(([id, label, Icon]) => <button key={id} aria-label={copy.nav[id] || label} title={copy.nav[id] || label} className={page === id ? 'active' : ''} onClick={() => id === 'service' ? goStudio() : setPage(id)}>
          <Icon size={20} weight={page === id ? 'fill' : 'regular'} /><b>{copy.nav[id] || label}</b>
          {id === 'performance' && <i>Beta</i>}
        </button>)}
      </div>})}
      <button className="human-admaker-banner" aria-label={language === 'zh' ? '进入 Vertens Storefront Ad Studio' : 'Open Vertens Storefront Ad Studio'} onClick={goStudio}>
        <VideoCamera weight="fill" />
        <b>{language === 'zh' ? '人工广告服务' : 'Human Admaker'}</b>
        <ArrowRight />
      </button>
    </nav>
    <div className="sidebar-footer">
      {accountOpen && <><div className="account-menu-scrim" onMouseDown={() => setAccountOpen(false)}></div><div className="account-popover">
        <button className="account-profile-entry" onClick={() => { setPage('profile'); setAccountOpen(false); }}><span>WZ</span><div><b>wen zy</b><small>wenzy@vertens.ai</small></div><ArrowRight/></button>
        <button><ChartLineUp/><span><b>{copy.account.usage}</b><small>{tier === 'lite' ? `4 ${copy.account.remaining}` : `12 ${copy.account.remaining}`}</small></span></button>
        <button className="upgrade-plan-entry" onClick={() => { setPage('plan'); setAccountOpen(false); }}><ArrowCircleUp/><span><b>{copy.account.plan}</b></span></button>
        <button className="appearance-row" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span><b>{copy.account.theme}</b></span><i className="appearance-icon" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>{theme === 'dark' ? <Sun weight="fill"/> : <Moon weight="fill"/>}</i></button>
        <label className="language-row"><Globe/><b>{copy.account.language}</b><select aria-label={copy.account.language} value={language} onChange={event => setLanguage(event.target.value)}><option value="en">English</option><option value="zh">中文</option></select></label>
        <button className={page === 'help' ? 'active' : ''} onClick={() => { setPage('help'); setAccountOpen(false); }}><BookOpen/><span><b>{copy.account.help}</b><small>VertensAI Guide</small></span></button>
        <button><ArrowRight/><span><b>{copy.account.logout}</b></span></button>
      </div></>}
      <button className="account-trigger" aria-expanded={accountOpen} onClick={() => setAccountOpen(open => !open)}>
        <span>WZ</span><div><b>wen zy</b><small>{tierLabels[tier]} · {language === 'en' ? 'English' : '中文'}</small></div><CaretUp/>
      </button>
    </div>
  </aside>;
}

function PageTitle({ eyebrow, title, copy, action }) {
  return <div className="page-title">
    <div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2><p>{copy}</p></div>
    {action}
  </div>;
}

function AvatarEntryDialog({ language, onClose, onClone, onCustom }) {
  const zh = language === 'zh';
  return <div className="avatar-entry-scrim" onMouseDown={onClose}><section className="avatar-entry-modal" onMouseDown={event=>event.stopPropagation()}>
    <header><div><span>{zh?'创建数字人':'CREATE AVATAR'}</span><h3>{zh?'选择你的数字人创建方式':'How would you like to start?'}</h3><p>{zh?'克隆本人建立长期信任，或使用现成角色快速开始。':'Clone yourself for lasting trust, or customize a ready AI presenter.'}</p></div><button onClick={onClose}><X/></button></header>
    <div className="avatar-entry-options">
      <button className="avatar-entry-clone" onClick={onClone}><div><span>{zh?'你的核心资产':'YOUR STRONGEST ASSET'}</span><h4>{zh?'克隆自己':'Clone yourself'}</h4><p>{zh?'录制一次，长期生成保留本人形象与声音的门店广告。':'Record once. Keep your face and voice across every owner-led ad.'}</p><b>{zh?'开始克隆':'Start cloning'}<ArrowRight/></b></div><img src={images.presenter}/></button>
      <button className="avatar-entry-custom" onClick={onCustom}><div><span>{zh?'最快开始':'FASTEST START'}</span><h4>{zh?'自定义数字人':'Custom avatar'}</h4><p>{zh?'从角色库选择形象，再按行业、市场和广告风格进行定制。':'Choose a ready presenter, then customize it for your market and ad style.'}</p><b>{zh?'选择数字人':'Customize avatar'}<ArrowRight/></b></div><img src={images.sofia}/></button>
    </div>
  </section></div>;
}

function ProfilePage({ tier, language, setPage }) {
  const zh = language === 'zh';
  const credits = tier === 'lite' ? '4' : '12';
  return <div className="page profile-page">
    <PageTitle eyebrow={zh?'个人中心':'ACCOUNT'} title={zh?'个人中心':'Profile'} copy={zh?'管理账号、套餐和使用情况。':'Manage your account, plan and usage.'}/>
    <section className="profile-shell">
      <div className="profile-identity"><span>WZ</span><div><h3>wen zy</h3><p>wenzy@vertens.ai</p></div><button>{zh?'编辑资料':'Edit profile'}</button></div>
      <div className="profile-stats"><article><span>{zh?'当前套餐':'PLAN'}</span><b>{tierLabels[tier]}</b><small>{zh?'原型功能范围':'Prototype feature scope'}</small></article><article><span>{zh?'本月成品':'THIS MONTH'}</span><b>{credits}<i style={{fontSize:'13px',fontWeight:600,marginLeft:'4px'}}>{zh?'条':'pcs'}</i></b><small>{zh?'已交付成品数':'finished pieces delivered'}</small></article><article><span>{zh?'工作区':'WORKSPACE'}</span><b>VertensAI</b><small>{zh?'1 位成员':'1 member'}</small></article></div>
      <div className="profile-settings"><button><div><b>{zh?'账号信息':'Account details'}</b><small>{zh?'姓名、邮箱和登录方式':'Name, email and sign-in'}</small></div><ArrowRight/></button><button onClick={()=>setPage('plan')}><div><b>{zh?'套餐与账单':'Plan and billing'}</b><small>{zh?'管理订阅和付款方式':'Manage subscription and payment'}</small></div><ArrowRight/></button><button><div><b>{zh?'通知':'Notifications'}</b><small>{zh?'发布和任务提醒':'Publishing and task updates'}</small></div><ArrowRight/></button></div>
    </section>
  </div>;
}

function PlanPage({ tier, setTier, language, notify }) {
  const zh = language === 'zh';
  const [billing, setBilling] = useState('annual');
  const plans = [
    {id:'lite',name:'Lite',audience:zh?'低成本跑通一轮':'Get one full cycle running',annual:120,monthly:20,equivalent:'10',credits:'1,200',avatars:zh?'门店 · 员工 · 账号全不限':'Unlimited shops, employees, accounts',seedance:zh?'Seedance 不设上限':'Seedance with no cap',features:zh?['内容生成、素材、模板与爆款复刻','门店、员工、社媒账号、发布渠道全部不限','Seedance 2.5 / 2.0 按 credits，不设上限','账号体检免费且不限次数','线索总量（不含明细归因）']:['Creation, assets, templates and viral remix','Unlimited shops, employees, accounts and channels','Seedance 2.5 and 2.0 on credits, no cap','Account checkups free and unlimited','Lead totals only, no breakdown']},
    {id:'pro',name:'Pro',audience:zh?'完整内容增长闭环':'The complete content growth system',annual:300,monthly:50,equivalent:'25',credits:'3,600',avatars:zh?'门店 · 员工 · 账号全不限':'Unlimited shops, employees, accounts',seedance:zh?'Seedance 不设上限':'Seedance with no cap',recommended:true,features:zh?['Lite 全部功能','30 天营销日历，每条文案可编辑','完整归因：内容级 · 员工级 · 跨店','团队协作：门店、成员与账号管理','效果分析看板 · 数据导出 / API','3 倍积分只收 2.5 倍价格 —— credits 便宜 16.7%']:['Everything in Lite','30-day calendar with every script editable','Full attribution: content, employee and cross-shop','Team collaboration: shops, members and account management','Performance dashboard, export and API','3× the credits for 2.5× the price — 16.7% cheaper per credit']}
  ];
  const selectPlan = plan => {
    setTier(plan.id);
    notify(zh?`已切换到 ${plan.name} 套餐。`:`${plan.name} plan selected.`);
  };
  return <div className="page plan-page">
    <section className="plan-hero">
      <div><span>{zh?'套餐':'PLAN'}</span><h1>{zh?'从内容生产，到可追踪的到店增长':'From content creation to attributable store growth'}</h1><p>{zh?'工具台只按 credits 收费。门店、员工、社媒账号、发布渠道全部不限 —— 两档只差含多少 credits、多便宜，以及归因看多深。需要人工代做成片，去 Creative Studio。':'The tool is priced on credits only. Shops, employees, accounts and channels are all unlimited — the two plans differ in how many credits you get, how cheap they are, and how deep attribution goes. For done-for-you production, visit Creative Studio.'}</p></div>
      <div className="billing-switch" role="group" aria-label={zh?'计费周期':'Billing cycle'}><button className={billing==='monthly'?'active':''} onClick={()=>setBilling('monthly')}>{zh?'月付':'Monthly'}</button><button className={billing==='annual'?'active':''} onClick={()=>setBilling('annual')}>{zh?'年付':'Yearly'}<small>{zh?'省 50%':'Save 50%'}</small></button></div>
    </section>
    <section className="pricing-grid">
      {plans.map(plan=><article className={`pricing-card ${plan.recommended?'recommended':''} ${tier===plan.id?'current':''}`} key={plan.id}>
        {plan.recommended&&<div className="popular-plan-banner"><Sparkle weight="fill"/>{zh?'最受欢迎':'Most popular'}</div>}
        <header><div><h2>{plan.name}</h2>{tier===plan.id&&<i>{zh?'当前套餐':'CURRENT'}</i>}</div><p>{plan.audience}</p></header>
        <div className="plan-price"><b>${billing==='annual'?plan.equivalent:plan.monthly}</b><span>{zh?' / 月':' / month'}</span>{billing==='annual'&&<del>${plan.monthly}</del>}</div>
        <small className="plan-billing-note">{billing==='annual'?(zh?`按年支付 $${plan.annual} · 省 50%`:`Billed $${plan.annual} annually · Save 50%`):(zh?'按月支付，可随时取消':'Billed monthly · Cancel anytime')}</small>
        <div className="plan-allowance"><CheckCircle weight="fill"/><div><b>{plan.credits} credits / {zh?'月':'month'}</b><small>{plan.avatars} · {plan.seedance}</small></div></div>
        <button className={plan.recommended?'primary':'secondary'} disabled={tier===plan.id} onClick={()=>selectPlan(plan)}>{tier===plan.id?(zh?'当前套餐':'Current plan'):(zh?`选择 ${plan.name}`:`Choose ${plan.name}`)}{tier!==plan.id&&<ArrowRight/>}</button>
        <ul>{plan.features.map(feature=><li key={feature}><CheckCircle weight="bold"/>{feature}</li>)}</ul>
      </article>)}
    </section>
    <section className="plan-output">
      <header><div><span>{zh?'额度能做什么':'WHAT YOUR CREDITS MAKE'}</span><h3>{zh?'同一笔额度，不同做法产出差 20 倍':'The same credits go 20× further on one route than the other'}</h3><p>{zh?'纯实拍合成不消耗任何 credits，不限条数。Seedance 视频不设月度上限，按 credits 计。':'Real-footage composition uses zero credits and has no limit. Seedance has no monthly cap — it simply draws on credits.'}</p></div></header>
      <div className="output-table">
        <div className="output-row output-head"><span>{zh?'每月可产出':'Monthly output'}</span><b>Lite<i>1,200 credits</i></b><b>Pro<i>3,600 credits</i></b></div>
        {[
          [zh?'纯实拍成片':'Real-footage videos',zh?'不限':'Unlimited',zh?'不限':'Unlimited',true],
          [zh?'18 秒图片合成片':'18-sec composed videos','20 '+(zh?'条':'videos'),'60 '+(zh?'条':'videos'),true],
          [zh?'20 秒老板口播片':'20-sec owner-led videos','8 '+(zh?'条':'videos'),'24 '+(zh?'条':'videos'),false],
          ['Seedance 2.5 · 10'+(zh?' 秒':'s'),'2 '+(zh?'条':'videos'),'8 '+(zh?'条':'videos'),false],
          ['Seedance 2.5 · 18'+(zh?' 秒':'s'),'1 '+(zh?'条':'video'),'4 '+(zh?'条':'videos'),false],
          ['Seedance 2.0 · 10'+(zh?' 秒':'s'),'4 '+(zh?'条':'videos'),'12 '+(zh?'条':'videos'),false],
          ['Seedance 2.0 · 18'+(zh?' 秒':'s'),'2 '+(zh?'条':'videos'),'6 '+(zh?'条':'videos'),false]
        ].map(([label,lite,pro,highlight])=><div className={`output-row ${highlight?'highlight':''}`} key={label}><span>{label}</span><b>{lite}</b><b>{pro}</b></div>)}
      </div>
      <footer><Sparkle weight="fill"/><span>{zh?'Seedance 2.5 每秒 45 credits，2.0 每秒 30 credits —— 按成本等比定价，两代毛利一致，你可以自由选型号。':'Seedance 2.5 costs 45 credits per second, 2.0 costs 30 — priced proportionally to cost, so you can pick either model freely.'}</span></footer>
    </section>
    <section className="plan-compare">
      <header><div><span>{zh?'功能差异':'FEATURE COMPARISON'}</span><h3>{zh?'两档容量完全一致，只差能力':'Identical capacity on both plans — the difference is capability'}</h3><p>{zh?'门店、员工、社媒账号、发布渠道、Seedance 使用，两档都不限。':'Shops, employees, social accounts, publishing channels and Seedance use are unlimited on both.'}</p></div></header>
      <div className="compare-table">
        <div className="compare-row compare-head"><span>{zh?'能力':'Capability'}</span><b>Lite</b><b>Pro</b></div>
        {[
          [zh?'账号体检（免费不限次）':'Account checkup (free, unlimited)',1,1],
          [zh?'品牌资产提取':'Brand asset extraction',1,1],
          [zh?'模板库 · 素材库 · 爆款复刻':'Templates, assets and viral remix',1,1],
          [zh?'AI 渲染图 · 数字人口播 · Seedance 视频':'AI images, avatar videos and Seedance',1,1],
          [zh?'实拍混剪（不消耗 credits）':'Real-footage composition (zero credits)',1,1],
          [zh?'多平台一键发布':'One-click multi-platform publishing',1,1],
          [zh?'门店 · 员工 · 账号 · 渠道数量':'Shops, employees, accounts, channels',zh?'不限':'Unlimited',zh?'不限':'Unlimited'],
          [zh?'线索总量':'Lead totals',1,1],
          [zh?'30 天营销日历（每条文案可编辑）':'30-day calendar with editable scripts',0,1],
          [zh?'完整归因：内容级 · 员工级 · 跨店':'Full attribution: content, employee, cross-shop',0,1],
          [zh?'团队协作：门店、成员与账号管理':'Team collaboration: shops, members and account management',0,1],
          [zh?'效果分析看板':'Performance dashboard',0,1],
          [zh?'数据导出 / API':'Data export and API',0,1],
          [zh?'含额度单 credit 价':'Effective credit price','$0.00833',zh?'$0.00694（8.3 折）':'$0.00694 (17% less)'],
          [zh?'增购单价':'Top-up price','$12 / 1,000','$10 / 1,000']
        ].map(([label,lite,pro])=><div className={`compare-row ${lite===0?'pro-only':''}`} key={label}>
          <span>{label}</span>
          <b>{lite===1?<CheckCircle weight="fill"/>:lite===0?<i className="dash">—</i>:lite}</b>
          <b>{pro===1?<CheckCircle weight="fill"/>:pro}</b>
        </div>)}
      </div>
      <footer><ArrowCircleUp weight="fill"/><span>{zh?'Lite 能把内容做出来；Pro 让内容变成可管理、可归因的经营动作。':'Lite gets the content made. Pro turns it into a managed, attributable growth operation.'}</span></footer>
    </section>
    <section className="plan-extras"><div><span>{zh?'灵活扩展':'FLEXIBLE ADD-ONS'}</span><h3>{zh?'不为数量收费，只为用量收费':'You pay for usage, never for headcount'}</h3><p>{zh?'门店、员工、账号越多越好 —— 向它们收费等于向自己的增长收税。纯实拍素材合成不消耗 credits。':'More shops, employees and accounts are exactly what we want. Charging for them would be taxing our own growth. Real-footage composition uses zero credits.'}</p></div><div className="plan-extra-items"><article><b>{zh?'增购 1,000 credits':'Add 1,000 credits'}</b><small>Lite $12 · Pro $10</small></article><article><b>{zh?'账号体检':'Account checkup'}</b><small>{zh?'免费 · 不限次数':'Free · unlimited'}</small></article><article><b>{zh?'Seedance 视频':'Seedance video'}</b><small>{zh?'2.5 版 45 cr/秒 · 2.0 版 30 cr/秒':'2.5 at 45 cr/sec · 2.0 at 30 cr/sec'}</small></article><article className="custom-plan"><b>{zh?'人工代做成片':'Done-for-you production'}</b><small>{zh?'去 Creative Studio 按条下单':'Order per piece at Creative Studio'}</small></article></div></section>
  </div>;
}

// 体检开出的行动计划：id / 周次 / 中英标题 / 中英说明 / 中英按钮 / 目标页
const checkupMoves = [
  {id:'store-info',week:'1',zhTitle:'给每条内容加上门店信息',enTitle:'Put store info on every post',
   zhBody:'18 条内容没有地址或电话。模板改一次，之后每条都自动带上。',enBody:'18 posts have neither. Fix the template once and every future post carries it.',
   zhCta:'去设置模板',enCta:'Open templates',page:'templates'},
  {id:'owner-video',week:'2',zhTitle:'发 3 条老板出镜的短视频',enTitle:'Publish 3 owner-led videos',
   zhBody:'先拍你被问得最多的那几个问题，这类内容最容易带来到店咨询。',enBody:'Start with the questions you answer most. They convert into store enquiries fastest.',
   zhCta:'创建数字人',enCta:'Create avatar',page:'avatars'},
  {id:'employees',week:'3',zhTitle:'让 3 个店员一起发',enTitle:'Turn on 3 employee accounts',
   zhBody:'所有内容都压在一个号上，触达面被卡死。员工账号不额外收费。',enBody:'Everything sits on one handle today. Employee seats cost nothing.',
   zhCta:'邀请店员',enCta:'Invite employees',page:'team',pro:true}
];

// Lite 用户点 Pro 专属行动项时，导到套餐页而不是打不开的页面
const resolveMovePage = (move, tier) => (move.pro && tierOrder[tier] < tierOrder.pro) ? 'plan' : move.page;

const checkupFindingLibrary = [
  ['critical','门店信息缺失','Posts without store info'],
  ['critical','发布频次不足与断更','Low posting frequency and gaps'],
  ['warning','内容里没有真人出镜','No real person on camera'],
  ['warning','缺少明确的引导动作','No clear next step'],
  ['warning','平台覆盖不足','Limited platform coverage'],
  ['info','只有一个账号在发布','Only one account publishing']
];

function CheckupHistoryModal({ language, checkups, onClose }) {
  const zh = language === 'zh';
  const [viewing, setViewing] = useState(null);
  const oldest = checkups[checkups.length-1];
  const latest = checkups[0];
  if (viewing) {
    const index = checkups.findIndex(item => item.id === viewing.id);
    const previous = checkups[index+1];
    const delta = previous ? viewing.score - previous.score : null;
    return <div className="avatar-entry-scrim" onMouseDown={onClose}><section className="checkup-modal history-modal" onMouseDown={event=>event.stopPropagation()}>
      <header className="checkup-modal-head">
        <div className="modal-back"><button className="back-button" onClick={()=>setViewing(null)}><ArrowRight/>{zh?'返回报告列表':'Back to reports'}</button><span>{zh?'历史体检报告':'PAST CHECKUP REPORT'}</span><h3>{viewing.date}</h3><p>{viewing.source} · {viewing.handle}</p></div>
        <button onClick={onClose}><X/></button>
      </header>
      <div className="checkup-result-top">
        <div className="checkup-result-score"><span>{zh?'账号健康分':'ACCOUNT HEALTH'}</span><div><b>{viewing.score}</b><i>/100</i></div><div className="checkup-gauge"><i style={{width:`${viewing.score}%`}}/></div></div>
        <ul className="checkup-metrics">
          <li><b>{viewing.issues}</b><small>{zh?'发现的问题':'issues found'}</small></li>
          <li><b>{viewing.daysAgo}</b><small>{zh?'天前':'days ago'}</small></li>
          {delta!==null&&<li className={delta<0?'danger':''}><b>{delta>0?'+':''}{delta}</b><small>{zh?'较上一次':'vs previous'}</small></li>}
        </ul>
      </div>
      <div className="past-findings">
        <header><span>{zh?'当时的结论':'FINDINGS AT THE TIME'}</span></header>
        <ul>{checkupFindingLibrary.slice(0, viewing.issues).map(([level,zhLabel,enLabel])=><li key={enLabel} className={level}><i/><span>{zh?zhLabel:enLabel}</span></li>)}</ul>
      </div>
      <footer className="checkup-modal-foot">
        <small>{zh?'这是一份历史报告，只保留数据与结论。行动指南只对最近一次体检有效。':'This is a past report — data and findings only. The action plan applies to the latest checkup.'}</small>
        <button className="primary" onClick={onClose}>{zh?'去做新一次体检':'Run a new checkup'}<ArrowRight/></button>
      </footer>
    </section></div>;
  }
  return <div className="avatar-entry-scrim" onMouseDown={onClose}><section className="checkup-modal history-modal" onMouseDown={event=>event.stopPropagation()}>
    <header className="checkup-modal-head">
      <div><span>{zh?'体检报告':'CHECKUP REPORTS'}</span><h3>{zh?`共 ${checkups.length} 份报告`:`${checkups.length} reports`}</h3><p>{zh?'每次体检都会生成一份报告，可随时回看对比。':'Every checkup produces a report you can reopen and compare.'}</p></div>
      <button onClick={onClose}><X/></button>
    </header>
    <div className="history-rows">{checkups.map((item,index)=>{
      const previous = checkups[index+1];
      const delta = previous ? item.score - previous.score : null;
      return <article key={item.id} className={index===0?'current':''}>
        <div className="history-when"><b>{item.date}</b><small>{item.source} · {item.handle}</small></div>
        <div className="history-score"><b>{item.score}</b><i>/100</i>{delta!==null&&<em className={delta<0?'down':'up'}>{delta<0?'▼':'▲'}{Math.abs(delta)}</em>}</div>
        <div className="history-bar"><i style={{width:`${item.score}%`}}/></div>
        <span className="history-issues">{item.issues} {zh?'个问题':'issues'}</span>
        <button onClick={()=>setViewing(item)}>{zh?'查看报告':'Open report'}<ArrowRight/></button>
      </article>;
    })}</div>
    {latest&&oldest&&latest!==oldest&&<footer className="history-modal-foot"><TrendUp weight="bold"/><span>{zh?`分数从 ${oldest.score} 一路降到 ${latest.score} —— 问题不是变难了，是一直没修。`:`The score slid from ${oldest.score} to ${latest.score}. Nothing got harder — the gaps just never got fixed.`}</span></footer>}
  </section></div>;
}

function CheckupModal({ language, source, profileUrl, onClose, onOpenReport, setPage, tier }) {
  const zh = language === 'zh';
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState('running');
  const [score, setScore] = useState(0);
  // 顺序: 图标 / 中文步骤 / 英文步骤 / 中文结果 / 英文结果
  const steps = [
    [Globe,'读取公开主页','Reading public profile','Casa Luma Interiors · '+(source||'Instagram'),'Casa Luma Interiors · '+(source||'Instagram')],
    [Article,'采集近 30 天内容','Collecting posts from the last 30 days','找到 22 条内容','22 posts found'],
    [MapPin,'检查门店信息与引导动作','Checking store info and local CTAs','18 条缺地址或电话','18 posts missing address or phone'],
    [UserCircle,'识别出镜人物与内容类型','Detecting presenters and content types','0 条有真人出镜','0 posts with a person on camera'],
    [TrendUp,'对比你上次的体检结果','Comparing with your last checkup','分数从 48 降到 42','Score moved from 48 to 42'],
    [CalendarCheck,'生成 30 天行动方案','Building your 30-day action plan','6 个问题已排好优先级','6 fixes prioritized']
  ];
  useEffect(() => {
    if (phase !== 'running') return;
    if (step >= steps.length) { const t = setTimeout(()=>setPhase('result'), 460); return ()=>clearTimeout(t); }
    const t = setTimeout(()=>setStep(current=>current+1), step===0?560:820);
    return ()=>clearTimeout(t);
  }, [step, phase]);
  useEffect(() => {
    if (phase !== 'result') return;
    let value = 0;
    const id = setInterval(()=>{ value += 2; if (value >= 42) { value = 42; clearInterval(id); } setScore(value); }, 22);
    return ()=>clearInterval(id);
  }, [phase]);
  const goto = target => { onClose(); setPage(target); };
  return <div className="avatar-entry-scrim" onMouseDown={onClose}><section className="checkup-modal" onMouseDown={event=>event.stopPropagation()}>
    {phase==='running' ? <>
      <header className="checkup-modal-head">
        <div><span>{zh?'账号体检进行中':'CHECKUP IN PROGRESS'}</span><h3>{zh?'正在分析你的门店账号':'Analyzing your store account'}</h3><p>{profileUrl||'instagram.com/casalumainteriors'}</p></div>
        <button onClick={onClose}><X/></button>
      </header>
      <div className="checkup-progress"><i style={{width:`${Math.min(100,Math.round(step/steps.length*100))}%`}}/></div>
      <small className="checkup-cost-note"><Sparkle weight="fill"/>{zh?'账号体检免费，不限次数':'Account checkups are free and unlimited'}</small>
      <ol className="checkup-steps">{steps.map(([Icon,zhLabel,enLabel,zhResult,enResult],index)=>{
        const state = index < step ? 'done' : index === step ? 'active' : 'idle';
        return <li key={enLabel} className={state}>
          <i>{state==='done'?<Check weight="bold"/>:state==='active'?<SpinnerGap className="spin"/>:<Icon/>}</i>
          <div><b>{zh?zhLabel:enLabel}</b>{state==='done'&&<small>{zh?zhResult:enResult}</small>}</div>
        </li>;
      })}</ol>
    </> : <>
      <header className="checkup-modal-head">
        <div><span>{zh?'体检完成':'CHECKUP COMPLETE'}</span><h3>{zh?'发现 6 个问题，先修这 3 件':'6 issues found. Start with these 3.'}</h3><p>{profileUrl||'instagram.com/casalumainteriors'}</p></div>
        <button onClick={onClose}><X/></button>
      </header>
      <div className="checkup-result-top">
        <div className="checkup-result-score"><span>{zh?'账号健康分':'ACCOUNT HEALTH'}</span><div><b>{score}</b><i>/100</i></div><div className="checkup-gauge"><i style={{width:`${score}%`}}/></div></div>
        <ul className="checkup-metrics">
          <li><b>4</b><small>{zh?'30 天发布条数':'posts / 30 days'}</small></li>
          <li><b>18</b><small>{zh?'缺门店信息':'missing store info'}</small></li>
          <li className="danger"><b>−6</b><small>{zh?'较上次体检':'vs last checkup'}</small></li>
        </ul>
      </div>
      <div className="checkup-moves">
        <header><span>{zh?'下一步行动':'YOUR NEXT MOVES'}</span><b>{zh?'按这个顺序做，三周把主要问题补上':'Do them in this order and the main gaps are closed in three weeks'}</b></header>
        {checkupMoves.map(move=><article key={move.id}>
          <i>{zh?`第 ${move.week} 周`:`WEEK ${move.week}`}</i>
          <div><b>{zh?move.zhTitle:move.enTitle}</b><small>{zh?move.zhBody:move.enBody}</small></div>
          <button onClick={()=>goto(resolveMovePage(move,tier))}>{zh?move.zhCta:move.enCta}{move.pro&&tierOrder[tier]<tierOrder.pro&&<em className="pro-tag">PRO</em>}<ArrowRight/></button>
        </article>)}
      </div>
      <footer className="checkup-modal-foot">
        <small>{zh?'仅统计公开主页可见的数据，未包含私信与广告投放。':'Counted from public profile data only. Direct messages and paid campaigns are not included.'}</small>
        <button className="primary" onClick={onOpenReport}>{zh?'查看完整体检报告':'See the full report'}<ArrowRight/></button>
      </footer>
    </>}
  </section></div>;
}

function HomePage({ setPage, notify, language, tier, startBrandImport, checkups, addCheckup, onBuildCalendar, doneMoves, toggleMove }) {
  const zh = language === 'zh';
  const hasMarketingCalendar = tierOrder[tier] >= tierOrder.pro;
  const [profileUrl, setProfileUrl] = useState('');
  const [stage, setStage] = useState('idle');
  const [source, setSource] = useState(null);
  const inputRef = useRef(null);
  const latest = checkups[0];
  const [stateOverride, setStateOverride] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const onboarding = stateOverride ? stateOverride === 'onboarding' : checkups.length === 0;
  const showOnboarding = () => { setStateOverride('onboarding'); setStage('idle'); setProfileUrl(''); };
  const showOperating = () => setStateOverride('operating');
  const CYCLE = 30;
  const dueIn = latest ? CYCLE - latest.daysAgo : 0;
  const overdue = !!latest && dueIn <= 0;
  const hasAttribution = tierOrder[tier] >= tierOrder.pro;
  // 顺序: 图标 / 数值 / 中标签 / 英标签 / 中对比 / 英对比 / 趋势
  const overview = [
    [Article,'4','本月发布','Posts this month','上月 6 条','6 last month','down'],
    [Eye,'12.4K','触达','Reach','环比 -18%','-18% vs last month','down'],
    [ChartLineUp,'38','互动与私信','Conversations','环比 +4','+4 vs last month','up'],
    [Users,'1 / 6','在发的账号','Accounts publishing','0 个员工号在发','0 employee accounts','down']
  ];
  if (hasAttribution) overview.push([Target,'9','到店','Store visits','7 条已确认归因','7 confirmed by attribution','up']);
  const runCheckup = () => {
    if (!profileUrl.trim()) { inputRef.current?.focus(); return notify(zh?'请先粘贴门店社媒主页链接。':'Paste your store profile URL first.'); }
    const url = profileUrl.toLowerCase();
    setSource(url.includes('tiktok')?'TikTok':url.includes('instagram')?'Instagram':'Facebook');
    setStage('running');
  };
  const openReport = () => {
    const url = profileUrl.toLowerCase();
    addCheckup({
      id:`chk-${Date.now()}`,
      source: url.includes('tiktok')?'TikTok':url.includes('instagram')?'Instagram':'Facebook',
      handle: profileUrl.replace(/^https?:\/\//,'').replace(/\/$/,'') || 'casalumainteriors',
      score: 42, issues: 6, date: zh?'今天':'Today', daysAgo: 0
    });
    setStage('done');
    notify(zh?'体检报告已保存，6 个问题都有对应的解决入口。':'Report saved. Every issue has a fix you can open.');
  };
  const checks = [
    [CalendarBlank,zh?'发布节奏与断更':'Posting rhythm and gaps'],
    [MapPin,zh?'门店信息是否齐全':'Store info on every post'],
    [CursorClick,zh?'是否有明确引导动作':'Clear next step in each post'],
    [UserCircle,zh?'内容里有没有真人':'Real people on camera'],
    [CirclesFour,zh?'平台覆盖与账号数':'Platform and account coverage'],
    [TrendUp,zh?'与上次体检相比的变化':'Change since your last checkup']
  ];
  // 顺序: 严重度 / 图标 / 中标题 / 英标题 / 中说明 / 英说明 / 中按钮 / 英按钮 / 跳转页
  const findings = [
    ['critical',MapPin,'22 条内容里，18 条没有门店信息','18 of 22 posts have no store info','没有地址、电话或预约方式 —— 想找你的人找不到你。','No address, phone or booking link. People who want you cannot find you.','用模板强制带上','Fix with templates','templates'],
    ['critical',CalendarBlank,'30 天只发了 4 条，最长断更 19 天','4 posts in 30 days, longest gap 19 days','上次体检是 6 条，这次只有 4 条，还在往下走。','Last checkup had 6. This one has 4. The trend is still down.','生成 30 天计划','Build a 30-day plan',hasMarketingCalendar?'calendar':'plan'],
    ['warning',UserCircle,'没有一条内容有真人出镜','No post has a real person on camera','本地生意里，老板出镜的内容信任度最高。','In local business, owner-led content earns the most trust.','创建老板数字人','Create owner avatar','avatars'],
    ['warning',CursorClick,'15 条内容没有明确的下一步','15 posts have no clear next step','没有到店、预约或私信的引导动作。','No prompt to visit, book or message.','换成带 CTA 的模板','Use templates with CTA','templates'],
    ['warning',CirclesFour,'只发布到 1 个平台','Publishing to 1 platform only','Instagram 已连接，Facebook 与 TikTok 未连接。','Instagram is connected. Facebook and TikTok are not.','连接更多账号','Connect accounts','channels'],
    ['info',Users,'所有内容都来自同一个账号','All posts come from a single account','没有员工账号在发布，触达面被限制在一个号上。','No employee account is publishing. Your reach sits on one handle.','启用员工矩阵','Turn on employee posting','team']
  ];
  // 顺序: 日期 / 分数 / 问题数 / 是否本次
  const trend = [...checkups].reverse().map((item,index,list)=>[item.date,item.score,item.issues,index===list.length-1]);
  const path = [
    [MagnifyingGlass,zh?'账号体检':'Run the checkup',zh?'看清差距在哪':'See where the gaps are'],
    [Buildings,zh?'提取品牌资产':'Extract brand assets',zh?'产品、市场、语气':'Products, market, voice'],
    [CalendarCheck,zh?'生成 30 天方案':'Get a 30-day plan',zh?'按优先级逐条修复':'Fix the gaps in order'],
    [VideoCamera,zh?'生产并发布':'Create and publish',zh?'数字人 + 店内实拍':'Owner avatar + real footage'],
    [Target,zh?'归因到人':'Attribute to people',zh?'哪条内容、哪个员工带来到店':'Which content and employee drove visits']
  ];
  return <div className="page home-page">
    <div className="home-state-switch">
      <span>{zh?'原型状态':'PROTOTYPE STATE'}</span>
      <div role="group" aria-label={zh?'原型状态':'Prototype state'}>
        <button className={onboarding?'active':''} onClick={showOnboarding}>{zh?'新手引导':'Onboarding'}</button>
        <button className={!onboarding?'active':''} onClick={showOperating}>{zh?'运营中':'Operating'}</button>
      </div>
    </div>
    {onboarding ? <>
    <section className="home-checkup">
      <div className="checkup-copy">
        <span>{zh?'免费账号体检':'FREE ACCOUNT CHECKUP'}</span>
        <h1>{zh?'先看清楚，你的门店账号差在哪。':'See exactly what is holding your store account back.'}</h1>
        <p>{zh?'粘贴门店社媒主页，VertensAI 会检查发布节奏、内容结构与获客信息，和你上次体检做对比，再把每个问题变成可执行的 30 天方案。':'Paste your store profile. VertensAI checks your posting rhythm, content structure and local CTAs, compares it with your last checkup, then turns every gap into a 30-day plan.'}</p>
        <div className="checkup-platforms"><FacebookLogo/><InstagramLogo/><TiktokLogo/><small>{zh?'仅读取公开主页数据':'Public profile data only'}</small></div>
        <label className="checkup-input"><MagnifyingGlass/><input ref={inputRef} value={profileUrl} onChange={event=>setProfileUrl(event.target.value)} onKeyDown={event=>event.key==='Enter'&&runCheckup()} placeholder={zh?'粘贴 Facebook、Instagram 或 TikTok 主页链接':'Paste a Facebook, Instagram or TikTok profile URL'}/><button className="primary" disabled={stage==='running'} onClick={runCheckup}>{zh?'免费体检':'Run free checkup'}<ArrowRight/></button></label>
        <small className="checkup-note">{zh?'账号体检免费且不限次数，无需注册，无需交出账号密码。':'Account checkups are free and unlimited — no signup, no passwords.'}</small>
        <button className="checkup-manual" onClick={()=>startBrandImport(profileUrl)}>{zh?'或进入我的品牌手动填写':'Or set up My Brand manually'}<ArrowRight/></button>
      </div>
      {stage==='done' ? <aside className="checkup-scorecard">
        <header><div><span>{zh?'账号健康分':'ACCOUNT HEALTH'}</span><b>42</b><i>/100</i></div><p>{`${source} · Casa Luma Interiors`}</p></header>
        <div className="checkup-gauge"><i style={{width:'42%'}}/></div>
        <ul className="checkup-metrics">
          <li><b>4</b><small>{zh?'30 天发布条数':'posts / 30 days'}</small></li>
          <li><b>18</b><small>{zh?'缺门店信息':'missing store info'}</small></li>
          <li className="danger"><b>−6</b><small>{zh?'较上次体检':'vs last checkup'}</small></li>
        </ul>
        <footer><TrendUp weight="bold"/><span>{zh?'三次体检，分数从 55 掉到 42 —— 问题不是变难了，是一直没修。':'Across three checkups the score slid from 55 to 42. Nothing got harder — the gaps just never got fixed.'}</span></footer>
      </aside> : <aside className="checkup-covers">
        <header><span>{zh?'体检覆盖':'THE CHECKUP COVERS'}</span><b>{zh?'6 项检查，60 秒出报告':'6 checks, report in 60 seconds'}</b></header>
        <ul>{checks.map(([Icon,label])=><li key={label}><i><Icon weight="bold"/></i><span>{label}</span></li>)}</ul>
        <footer><ShieldCheck weight="bold"/><span>{zh?'只读取公开主页数据，不需要账号密码或授权。':'Public profile data only. No password or account access required.'}</span></footer>
      </aside>}
    </section>
    </> : <>
      <section className="home-overview">
        <header><div><span>{zh?'本月运营概览':'THIS MONTH'}</span><h2>{zh?'Casa Luma Interiors · 运营数据':'Casa Luma Interiors · account overview'}</h2></div><button onClick={()=>setPage(hasAttribution?'performance':'publishing')}>{zh?'查看明细':'View details'}<ArrowRight/></button></header>
        <div className="overview-grid">{overview.map(([Icon,value,zhLabel,enLabel,zhDelta,enDelta,trend])=><article key={enLabel}>
          <i><Icon weight="bold"/></i>
          <b>{value}</b>
          <small>{zh?zhLabel:enLabel}</small>
          <em className={trend}>{trend==='down'?'▼':'▲'} {zh?zhDelta:enDelta}</em>
        </article>)}</div>
      </section>
      <section className={`checkup-due ${overdue?'overdue':''}`}>
        <div className="due-copy">
          <span>{overdue?(zh?'该体检了':'CHECKUP DUE'):(zh?'体检周期':'CHECKUP CYCLE')}</span>
          <h2>{overdue?(zh?`距上次体检已经 ${latest.daysAgo} 天`:`It has been ${latest.daysAgo} days since your last checkup`):(zh?`下次建议体检还有 ${dueIn} 天`:`Next checkup suggested in ${dueIn} days`)}</h2>
          <p>{overdue?(zh?'账号每个月都在变。体检一次只是一个点，连成线才知道是在变好还是在变差。':'Your account keeps moving. One checkup is a dot; a monthly line is what tells you whether it is improving.'):(zh?'到期我们会提醒你。也可以随时提前体检。':'We will remind you when it is due. You can also run one early.')}</p>
          <button className="due-history" onClick={()=>setHistoryOpen(true)}><FileText weight="bold"/>{zh?`历史体检报告（${checkups.length}）`:`Checkup reports (${checkups.length})`}<ArrowRight/></button>
        </div>
        <label className="checkup-input"><MagnifyingGlass/><input ref={inputRef} value={profileUrl} onChange={event=>setProfileUrl(event.target.value)} onKeyDown={event=>event.key==='Enter'&&runCheckup()} placeholder={latest?latest.handle:(zh?'粘贴主页链接':'Paste a profile URL')}/><button className="primary" disabled={stage==='running'} onClick={runCheckup}>{overdue?(zh?'立即体检':'Run checkup now'):(zh?'提前体检':'Run early')}<ArrowRight/></button></label>
        <small className="due-cost"><Sparkle weight="fill"/>{zh?'账号体检免费，不限次数':'Account checkups are free and unlimited'}</small>
      </section>
    </>}
    {!onboarding && latest && <section className="plan-followup">
      <header>
        <div><span>{zh?`上次体检开的方子 · ${latest.date}`:`FROM YOUR CHECKUP · ${latest.date}`}</span><h2>{zh?`3 件要做的事，已完成 ${doneMoves.length}`:`3 things to fix — ${doneMoves.length} done`}</h2></div>
        <button onClick={onBuildCalendar}><CalendarCheck weight="bold"/>{zh?'排进 30 天日历':'Add to 30-day calendar'}<ArrowRight/></button>
      </header>
      <div className="followup-progress"><i style={{width:`${Math.round(doneMoves.length/checkupMoves.length*100)}%`}}/></div>
      <div className="followup-list">{checkupMoves.map(move=>{
        const done = doneMoves.includes(move.id);
        return <article key={move.id} className={done?'done':''}>
          <button className="followup-check" onClick={()=>toggleMove(move.id)} aria-pressed={done} aria-label={zh?'标记完成':'Mark done'}>{done?<Check weight="bold"/>:<i/>}</button>
          <i className="followup-week">{zh?`第 ${move.week} 周`:`WEEK ${move.week}`}</i>
          <div><b>{zh?move.zhTitle:move.enTitle}</b><small>{zh?move.zhBody:move.enBody}</small></div>
          <button className="followup-go" onClick={()=>setPage(resolveMovePage(move,tier))}>{zh?move.zhCta:move.enCta}{move.pro&&tierOrder[tier]<tierOrder.pro&&<em className="pro-tag">PRO</em>}<ArrowRight/></button>
        </article>;
      })}</div>
      {doneMoves.length===checkupMoves.length && <footer className="followup-done"><CheckCircle weight="fill"/><span>{zh?'三件都做完了。下次体检就能看出分数有没有拉回来。':'All three are done. Your next checkup will show whether the score turned.'}</span></footer>}
    </section>}

    {onboarding && <section className="owner-ad-steps">{path.map(([Icon,title,copy],index)=><article key={title}><i>{index+1}</i><Icon/><div><b>{title}</b><small>{copy}</small></div>{index<path.length-1&&<ArrowRight/>}</article>)}</section>}

    {!onboarding && stage==='done' && <>
      <section className="checkup-report">
        <div className="checkup-findings">
          <header><div><span>{zh?'体检结果':'CHECKUP RESULT'}</span><h2>{zh?'发现 6 个问题，每个都有对应的解决方式':'6 issues found — each one has a fix'}</h2></div><i className="checkup-sample">{source}</i></header>
          <div className="checkup-finding-list">{findings.map(([level,Icon,zhTitle,enTitle,zhBody,enBody,zhFix,enFix,target])=><article key={enTitle} className={`checkup-finding ${level}`}>
            <i><Icon weight="bold"/></i>
            <div><b>{zh?zhTitle:enTitle}</b><small>{zh?zhBody:enBody}</small></div>
            <button onClick={()=>setPage(target)}>{zh?zhFix:enFix}<ArrowRight/></button>
          </article>)}</div>
        </div>
        <aside className="checkup-trend">
          <header><span>{zh?'你的体检趋势':'YOUR TREND'}</span><b>{zh?'和你自己的历史比':'Measured against your own history'}</b></header>
          <div className="trend-rows">{trend.map(([date,score,issues,current])=><article key={date} className={current?'current':''}>
            <div className="trend-when"><b>{date}</b><small>{issues} {zh?'个问题':'issues'}</small></div>
            <div className="trend-bar"><i style={{width:`${score}%`}}/></div>
            <span>{score}<i>/100</i></span>
          </article>)}</div>
          <footer><Clock weight="bold"/><span>{zh?'每月体检一次，这条线才有意义。修完再体检，看它能不能拉回去。':'Run it monthly for this line to mean anything. Fix the gaps, then check again and see if it turns.'}</span></footer>
        </aside>
      </section>
      <section className="checkup-moves page-moves">
        <div className="moves-cta">
          <div><span>{zh?'从体检到排期':'FROM CHECKUP TO PLAN'}</span><b>{zh?'把这 6 个问题变成一份 30 天营销日历':'Turn these 6 issues into a 30-day marketing calendar'}</b><small>{zh?'按优先级排期：先补门店信息，再上老板出镜内容，最后让店员一起发。每条文案都可以改。':'Sequenced by priority: store info first, then owner-led videos, then employee accounts. Every script stays editable.'}</small></div>
          <button className="primary" onClick={()=>onBuildCalendar?.()}><CalendarCheck weight="bold"/>{zh?'生成 30 天日历':'Generate 30-day calendar'}<ArrowRight/></button>
        </div>
        <header><span>{zh?'下一步行动':'YOUR NEXT MOVES'}</span><b>{zh?'按这个顺序做，三周把主要问题补上':'Do them in this order and the main gaps are closed in three weeks'}</b></header>
        {checkupMoves.map(move=><article key={move.id}>
          <i>{zh?`第 ${move.week} 周`:`WEEK ${move.week}`}</i>
          <div><b>{zh?move.zhTitle:move.enTitle}</b><small>{zh?move.zhBody:move.enBody}</small></div>
          <button onClick={()=>setPage(resolveMovePage(move,tier))}>{zh?move.zhCta:move.enCta}{move.pro&&tierOrder[tier]<tierOrder.pro&&<em className="pro-tag">PRO</em>}<ArrowRight/></button>
        </article>)}
      </section>
    </>}

    {historyOpen&&<CheckupHistoryModal language={language} checkups={checkups} onClose={()=>setHistoryOpen(false)} />}
    {stage==='running'&&<CheckupModal language={language} source={source} profileUrl={profileUrl} tier={tier} onClose={()=>setStage('idle')} onOpenReport={openReport} setPage={setPage}/>}
  </div>;
}

function AgentPage({ product, setPage, notify, language, tier, selectedAvatar, setSelectedAvatar, activeProject, setActiveProject, initialDraft, clearInitialDraft }) {
  const zh = language === 'zh';
  const [prompt, setPrompt] = useState(initialDraft || '');
  const [view, setView] = useState(activeProject ? 'chat' : 'landing');
  const [mediaType, setMediaType] = useState('video');
  const [destination, setDestination] = useState('chat');
  const [modelOpen, setModelOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [modelVendor, setModelVendor] = useState(tier === 'lite' ? 'Kling' : 'Seedance');
  const [selectedModel, setSelectedModel] = useState(tier === 'lite' ? 'Kling 3.0' : 'Seedance 2.5 Global');
  const [galleryTab, setGalleryTab] = useState('all');
  const currentProject = activeProject || projectCatalog[0];
  useEffect(() => {
    if (initialDraft) {
      setPrompt(initialDraft);
      setView('landing');
      clearInitialDraft?.();
    }
  }, [initialDraft]);
  useEffect(() => { if (activeProject) setView('chat'); }, [activeProject]);
  useEffect(() => {
    if (tier === 'lite' && selectedModel.startsWith('Seedance')) {
      setModelVendor('Kling');
      setSelectedModel('Kling 3.0');
    }
  }, [tier, selectedModel]);
  const send = () => {
    if (!prompt.trim()) return;
    if (destination === 'canvas') {
      notify(zh?'创作需求已发送到爆款画布。':'Brief sent to Viral Canvas.');
      setPage('canvas');
      return;
    }
    setView('chat');
  };
  const examples = [
    {type:'video',label:'OWNER-LED VIDEO',title:'Turn the owner into a trusted local expert',copy:'A 20-second vertical ad with one clear booking or store-visit CTA.',image:images.presenter,prompt:'Create a 20-second owner-led video for my local business product with a clear booking CTA.'},
    {type:'image',label:'LOCAL OFFER IMAGE',title:'Turn one product into a campaign image set',copy:'Keep the product or service accurate while adapting the format for every channel.',image:images.kitchen,prompt:'Create three premium campaign images for my weekend local product, designed for Meta and Instagram.'},
    {type:'video',label:'VIRAL REPLICATION',title:'Rebuild a winning local ad for your business',copy:'Reuse the hook and rhythm without copying the original brand.',image:images.patio,prompt:'Analyze a winning local-business ad and recreate its structure for my product and city.'}
  ];
  const visibleExamples = examples.filter(x => galleryTab === 'all' || x.type === galleryTab);
  const chooseAvatar = ([name, role, locale, image]) => {
    setSelectedAvatar({name, role, locale, image});
    setAvatarOpen(false);
    notify(zh?`已选择数字人 ${name}`:`${name} selected.`);
  };
  const ComposerTools = ({ compact = false }) => <div className={compact ? 'composer-tools compact' : 'composer-tools'}>
    {!compact && <button className="add-reference"><Plus/></button>}
    <button className="product-chip"><Package/> {product ? product.name : (zh?'添加产品':'Add product')}</button>
    <div className="avatar-control">
      <button className={selectedAvatar ? 'avatar-trigger selected' : 'avatar-trigger'} onClick={() => setAvatarOpen(!avatarOpen)}>{selectedAvatar ? <><img src={selectedAvatar.image}/><span>{selectedAvatar.name}</span><Check/></> : <><UserCircle/>{zh?'选择数字人':'Choose avatar'}</>}</button>
      {avatarOpen && <div className="avatar-picker-popover"><header><div><b>{zh?'选择数字人':'Choose avatar'}</b><small>{zh?'用于本次创作':'For this creative'}</small></div>{selectedAvatar&&<button onClick={()=>setSelectedAvatar(null)}>{zh?'清除':'Clear'}</button>}</header><div>{actors.map(actor=><button key={actor[0]} className={selectedAvatar?.name===actor[0]?'selected':''} onClick={()=>chooseAvatar(actor)}><img src={actor[3]}/><span><b>{actor[0]}</b><small>{actor[1]}</small></span>{selectedAvatar?.name===actor[0]&&<Check weight="bold"/>}</button>)}</div><button className="manage-avatars" onClick={()=>setPage('avatars')}>{zh?'管理全部数字人':'Manage all avatars'}<ArrowRight/></button></div>}
    </div>
    <div className="media-switch"><button className={mediaType === 'video' ? 'active' : ''} onClick={() => setMediaType('video')}><VideoCamera/> {zh?'视频':'Video'}</button><button className={mediaType === 'image' ? 'active' : ''} onClick={() => setMediaType('image')}><ImageIcon/> {zh?'图片':'Image'}</button></div>
    <div className="model-control"><button onClick={() => setModelOpen(!modelOpen)}><Sparkle/> {selectedModel} <CaretDown/></button>{modelOpen && <div className="model-mega-popover"><header><b>{zh?'模型选择':'Model preference'}</b><span>{tier === 'pro' ? (zh?'Seedance 本月剩余 42 / 60 秒':'Seedance · 42 / 60 sec remaining') : (zh?'Seedance 需要 Pro':'Seedance requires Pro')}</span></header><div className="model-filters">{(zh?['全能参考','文生视频','多图参考','首尾帧','视频编辑']:['All-round','Text to video','Multi-image','First / last frame','Video edit']).map(x=><button key={x}>{x}</button>)}</div><div className="model-browser"><nav>{modelVendors.map(vendor=><button className={`${modelVendor===vendor.name?'active':''} ${tier==='lite'&&vendor.name==='Seedance'?'locked':''}`} onClick={()=>setModelVendor(vendor.name)} key={vendor.name}><Sparkle/><span>{vendor.name}</span>{tier==='lite'&&vendor.name==='Seedance'?<Lock/>:<ArrowRight/>}</button>)}</nav><section>{modelVendors.find(v=>v.name===modelVendor).models.map((model,index)=>{const locked=tier==='lite'&&modelVendor==='Seedance';return <button className={`${selectedModel===model?'selected':''} ${locked?'locked':''}`} disabled={locked} key={model} onClick={()=>{setSelectedModel(model);setModelOpen(false);}}><VideoCamera/><span><b>{model}</b><small>{locked?(zh?'升级 Pro 解锁':'Upgrade to Pro'):(index===0?(zh?'最高画质，支持多参考':'Best quality · multi-reference'):(zh?'快速生成，适合批量测试':'Fast generation for testing'))}</small></span>{locked?<Lock/>:(selectedModel===model&&<Check weight="bold"/>)}</button>})}</section></div>{tier==='lite'&&modelVendor==='Seedance'&&<button className="seedance-upgrade" onClick={()=>setPage('plan')}>{zh?'升级 Pro 使用 Seedance':'Upgrade to Pro for Seedance'}<ArrowRight/></button>}</div>}</div>
    <span className="toolbar-space"/>
    <div className="destination-switch"><button className={destination === 'chat' ? 'active' : ''} onClick={() => setDestination('chat')}><Robot/> {zh?'对话':'Chat'}</button><button className={destination === 'canvas' ? 'active' : ''} onClick={() => setDestination('canvas')}><ShareNetwork/> {zh?'画布':'Canvas'}</button></div>
  </div>;

  if (view === 'chat') return <div className="codex-agent">
    <aside className="agent-history">
      <div className="history-title"><b>VertensAI Agent</b></div>
      <button className="new-task" onClick={() => {setPrompt('');setActiveProject(null);setView('landing');}}><Plus/> {zh?'新建创作':'New creative'}</button>
      <div className="project-section-title"><span>{zh?'项目':'Projects'}</span><div><button title={zh?'更多':'More'}><DotsThree/></button><button title={zh?'新建项目':'New project'} onClick={()=>notify(zh?'新建项目窗口已打开。':'New project dialog opened.')}><Plus/></button></div></div>
      <div className="project-tree">{projectCatalog.map(project=><section key={project.id} className={currentProject.id===project.id?'active':''}><button className="project-folder" onClick={()=>setActiveProject(project)}><FolderSimple/><span><b>{project.name}</b><small>{project.location}</small></span><CaretDown/></button><div>{project.threads.map(([id,title,status,Icon],index)=><button className={`history-item ${currentProject.id===project.id&&index===0?'active':''}`} key={id} onClick={()=>{setActiveProject(project);setView('chat');}}><Icon/><div><b>{title}</b><small>{status}</small></div></button>)}</div></section>)}</div>
    </aside>
    <section className="agent-thread">
      <header><div><span>{zh?'创作任务':'CREATIVE TASK'}</span><h2>{currentProject.name}</h2></div><div className="task-status"><span></span> {zh?'进行中':'Working'}</div></header>
      <div className="thread-body">
        <div className="thread-user"><div className="user-dot">W</div><div><b>{zh?'你':'You'}</b><p>{prompt || (zh?'请基于当前项目生成 3 个广告变体。':'Create three ad variants for this project.')}</p>{product && <div className="thread-product"><img src={product.image}/><span><b>{product.name}</b><small>{zh?'已添加产品':'Product attached'}</small></span></div>}{selectedAvatar&&<div className="thread-avatar"><img src={selectedAvatar.image}/><span><b>{selectedAvatar.name}</b><small>{zh?'已选择数字人':'Selected avatar'}</small></span></div>}</div></div>
        <div className="thread-agent"><div className="agent-symbol"><Sparkle weight="fill"/></div><div><b>VertensAI Agent</b><p>{zh?`我会使用工作区中保存的产品、品牌和到店目标，生成适合测试的${mediaType==='video'?'视频':'图片'}。`:`I’ll use the product, brand and store-visit objective saved in this project to build a focused ${mediaType} test.`}</p>
          <div className="task-steps">
            <div className="done"><CheckCircle weight="fill"/><span><b>{zh?'读取产品和我的品牌':'Read product and My Brand'}</b><small>{currentProject.location}</small></span></div>
            <div className="done"><CheckCircle weight="fill"/><span><b>Build the creative direction</b><small>Owner proof · clear benefit · local booking CTA</small></span></div>
            <div><SpinnerGap className="spin"/><span><b>Generate three {mediaType} variants</b><small>English and Spanish captions · 9:16</small></span></div>
          </div>
          <div className="thread-output"><img src={mediaType === 'video' ? images.presenter : images.kitchen}/><div><span>PREVIEW · VARIANT 01</span><h3>{mediaType === 'video' ? 'A local product worth leaving home for.' : 'Your next favorite local stop.'}</h3><p>{mediaType === 'video' ? '20 sec · Owner avatar · Meta / TikTok' : '4:5 · Meta / Instagram · High resolution'}</p><div><button>Open details</button><button className="primary" onClick={() => setPage('canvas')}>Continue in Canvas <ArrowRight/></button></div></div></div>
        </div></div>
      </div>
      <div className="codex-composer"><textarea placeholder={zh?'要求修改或继续任务…':'Ask for changes or continue the task...'}/><ComposerTools compact/><button className="thread-send"><PaperPlaneTilt weight="fill"/></button></div>
    </section>
  </div>;

  return <div className="creative-agent">
    <section className="creative-agent-hero">
      <div className="agent-credit"><Sparkle weight="fill"/> 1,240 <span>credits</span></div>
      <div className="creative-agent-heading"><h2>{zh?'创意':'Creative'} <em>Agent</em></h2><p>{zh?'从一个想法到可直接使用的图片和视频。':'From one idea to ready-to-use images and videos.'}</p></div>
      <div className="creative-prompt">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={zh?'添加产品，并描述你要生成的图片或视频…':'Add a product and describe the image or video you want to create...'}/>
        <div className="creative-prompt-toolbar">
          <ComposerTools/>
          <button className="creative-send" disabled={!prompt.trim()} onClick={send}><ArrowRight/></button>
        </div>
      </div>
    </section>
    <section className="agent-inspiration">
      <div className="recommended-title"><div><span>{zh?'推荐模板':'RECOMMENDED TEMPLATES'}</span><h3>{zh?'从验证过的创意方向开始':'Start from a proven creative direction'}</h3></div><button onClick={()=>setPage('templates')}>{zh?'更多模板':'More templates'}<ArrowRight/></button></div>
      <div className="inspiration-tabs"><button className={galleryTab === 'all' ? 'active' : ''} onClick={() => setGalleryTab('all')}>{zh?'全部':'All'}</button><button className={galleryTab === 'video' ? 'active' : ''} onClick={() => setGalleryTab('video')}>{zh?'视频':'Video'}</button><button className={galleryTab === 'image' ? 'active' : ''} onClick={() => setGalleryTab('image')}>{zh?'图片':'Image'}</button></div>
      <div className="inspiration-grid">{visibleExamples.map(item => <article key={item.title}><div><img src={item.image}/><span>{item.label}</span>{item.type === 'video' && <button className="preview-play"><Play weight="fill"/></button>}</div><h3>{item.title}</h3><p>{item.copy}</p><button onClick={() => {setMediaType(item.type);setPrompt(item.prompt);window.scrollTo({top:0,behavior:'smooth'});}}>Use direction <ArrowRight/></button></article>)}</div>
    </section>
  </div>;
}

const templateCatalog = [
  {id:'restaurant-dish',title:'Signature Dish Rush',industry:'Restaurants',category:'Product Demos',image:images.kitchen,video:'/assets/sample-showroom-launch.mp4',views:'38.6K',uses:'1,284',duration:'15s',model:'Seedance 2.5',theme:'Sensory product close-up',character:'Restaurant owner'},
  {id:'restaurant-product',title:'Lunch Product Countdown',industry:'Restaurants',category:'Animated Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'24.7K',uses:'818',duration:'18s',model:'Seedance 2.5',theme:'Time-limited local product',character:'Store owner'},
  {id:'beauty-transform',title:'Beauty Before & After',industry:'Beauty & Salon',category:'Before & After',image:images.sofia,video:'/assets/sample-before-after.mp4',views:'51.2K',uses:'1,602',duration:'20s',model:'Seedance 2.5',theme:'Transformation reveal',character:'Beauty advisor'},
  {id:'beauty-expert',title:'Founder Explains the Treatment',industry:'Beauty & Salon',category:'UGC Ads',image:images.avatar,video:'/assets/sample-owner-story.mp4',views:'29.4K',uses:'936',duration:'24s',model:'Seedance 2.5',theme:'Owner-led education',character:'Salon owner'},
  {id:'building-proof',title:'Material Difference Explained',industry:'Home & Building',category:'UGC Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'31.4K',uses:'1,204',duration:'24s',model:'Seedance 2.5',theme:'Owner-led education',character:'Store owner'},
  {id:'building-reveal',title:'Room Transformation Reveal',industry:'Home & Building',category:'Before & After',image:images.patio,video:'/assets/sample-before-after.mp4',views:'46.7K',uses:'932',duration:'18s',model:'Seedance 2.5',theme:'Transformation reveal',character:'Project expert'},
  {id:'fitness-trial',title:'7-Day Trial Challenge',industry:'Fitness',category:'Essentials',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'42.8K',uses:'1,391',duration:'21s',model:'Seedance 2.5',theme:'Challenge and booking CTA',character:'Fitness coach'},
  {id:'pet-before-after',title:'Pet Grooming Transformation',industry:'Pet Services',category:'Before & After',image:images.sofia,video:'/assets/sample-before-after.mp4',views:'63.9K',uses:'1,848',duration:'16s',model:'Seedance 2.5',theme:'Cute transformation reveal',character:'Pet groomer'},
  {id:'education-trial',title:'Free Trial Class Hook',industry:'Education',category:'UGC Ads',image:images.avatar,video:'/assets/sample-owner-story.mp4',views:'18.5K',uses:'577',duration:'22s',model:'Seedance 2.5',theme:'Parent outcome and trial CTA',character:'Teacher'},
  {id:'auto-problem',title:'Car Problem / Solution',industry:'Auto Services',category:'Essentials',image:images.patio,video:'/assets/sample-showroom-launch.mp4',views:'34.1K',uses:'1,028',duration:'19s',model:'Seedance 2.5',theme:'Problem and expert fix',character:'Service advisor'},
  {id:'health-faq',title:'Expert FAQ to Booking',industry:'Health & Wellness',category:'UGC Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'21.6K',uses:'684',duration:'25s',model:'Seedance 2.5',theme:'Expert answer and appointment CTA',character:'Clinic expert'},
  {id:'retail-arrival',title:'New Arrival Try-On',industry:'Retail',category:'Product Demos',image:images.sofia,video:'/assets/sample-showroom-launch.mp4',views:'47.8K',uses:'1,519',duration:'15s',model:'Seedance 2.5',theme:'Fast product try-on',character:'Store host'},
  {id:'kids-parent-proof',title:'Parent Testimonial Story',industry:'Kids & Family',category:'UGC Ads',image:images.avatar,video:'/assets/sample-owner-story.mp4',views:'26.3K',uses:'795',duration:'28s',model:'Seedance 2.5',theme:'Parent proof story',character:'Parent customer'},
  {id:'wedding-reveal',title:'Venue Reveal in 15 Seconds',industry:'Wedding & Events',category:'Before & After',image:images.kitchen,video:'/assets/sample-before-after.mp4',views:'44.5K',uses:'1,246',duration:'15s',model:'Seedance 2.5',theme:'Emotional venue reveal',character:'Event planner'},
  {id:'hotel-weekend',title:'Weekend Stay Experience',industry:'Hotels & Travel',category:'Product Demos',image:images.patio,video:'/assets/sample-showroom-launch.mp4',views:'39.7K',uses:'1,107',duration:'20s',model:'Seedance 2.5',theme:'Experience montage',character:'Travel host'},
  {id:'cafe-counter',title:'Behind the Counter',industry:'Cafés & Bakeries',category:'UGC Ads',image:images.kitchen,video:'/assets/sample-owner-story.mp4',views:'56.8K',uses:'1,711',duration:'18s',model:'Seedance 2.5',theme:'Maker story and visit CTA',character:'Founder'},
  {id:'fashion-three-looks',title:'Three Looks, One Product',industry:'Fashion',category:'Product Demos',image:images.sofia,video:'/assets/sample-showroom-launch.mp4',views:'71.2K',uses:'2,104',duration:'17s',model:'Seedance 2.5',theme:'Fast styling listicle',character:'Fashion creator'},
  {id:'photo-before-after',title:'Studio Edit Before & After',industry:'Photography',category:'Before & After',image:images.avatar,video:'/assets/sample-before-after.mp4',views:'22.9K',uses:'706',duration:'16s',model:'Seedance 2.5',theme:'Visual transformation proof',character:'Photographer'},
  {id:'event-countdown',title:'Local Event Countdown',industry:'Entertainment',category:'Animated Ads',image:images.patio,video:'/assets/sample-showroom-launch.mp4',views:'33.4K',uses:'989',duration:'15s',model:'Seedance 2.5',theme:'Urgent local event promotion',character:'Event host'}
];

function TemplateFlowNode({ data }) {
  return <div className={`template-flow-node ${data.tone || ''}`}>
    <Handle type="target" position={Position.Left}/>
    {data.image && <img src={data.image}/>}<span>{data.kicker}</span><b>{data.label}</b><small>{data.detail}</small>
    <Handle type="source" position={Position.Right}/>
  </div>;
}

const templateNodeTypes = { templateFlow: TemplateFlowNode };

function TemplatesPage({ setPage, setCanvasTemplate, notify, language }) {
  const zh = language === 'zh';
  const [industry, setIndustry] = useState('All industries');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(['restaurant-dish','beauty-transform','building-proof']);
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState('preview');
  const [autofilled, setAutofilled] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [rewrite, setRewrite] = useState('A local-store version that opens with a sharp problem, proves the result in one scene, and ends with a direct visit CTA.');
  const [customTemplates, setCustomTemplates] = useState([]);
  const allTemplates = [...customTemplates, ...templateCatalog];
  const visibleTemplates = allTemplates.filter(item => {
    const matchesIndustry = industry === 'All industries' || item.industry === industry;
    const matchesSearch = `${item.title} ${item.category} ${item.industry} ${item.theme}`.toLowerCase().includes(query.toLowerCase());
    return matchesIndustry && matchesSearch;
  });
  const openTemplate = (item, mode = 'preview') => { setSelected(item); setModalMode(mode); setAutofilled(false); };
  const toggleSaved = id => setSaved(items => items.includes(id) ? items.filter(item => item !== id) : [...items,id]);
  const analyzeVideo = () => {
    if (!videoUrl.trim()) return;
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalysisReady(true); notify(zh?'爆款结构分析完成。':'Viral structure analyzed.'); }, 850);
  };
  const saveCustomTemplate = () => {
    const custom = {id:`custom-${Date.now()}`,title:zh?'我的爆款复刻模板':'My viral rewrite',industry:'Custom',category:'UGC Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'NEW',uses:'1',duration:'20s',model:'Custom',theme:rewrite,character:'Your selected avatar'};
    setCustomTemplates(items => [custom,...items]);
    setSaved(items => [custom.id,...items]);
    setAnalysisReady(false);
    setVideoUrl('');
    notify(zh?'已保存为自定义模板。':'Saved as a custom template.');
  };
  const openInCanvas = () => {
    if (!selected) return;
    setCanvasTemplate(selected);
    setSelected(null);
    notify(`${selected.title} copied to Viral Canvas.`);
    setPage('canvas');
  };
  const workflowNodes = selected ? [
    {id:'t1',type:'templateFlow',position:{x:35,y:185},data:{kicker:'INPUT',label:'Product image',detail:'Product, service or promotion',image:selected.image,tone:'input'}},
    {id:'t2',type:'templateFlow',position:{x:340,y:75},data:{kicker:'ANALYZE',label:'Template structure',detail:`${selected.duration} · ${selected.theme}`,tone:'analysis'}},
    {id:'t3',type:'templateFlow',position:{x:340,y:315},data:{kicker:'SCRIPT',label:'Rewrite for store',detail:'Hook · proof · local CTA',tone:'analysis'}},
    {id:'t4',type:'templateFlow',position:{x:655,y:75},data:{kicker:'PRESENTER',label:'Character preference',detail:selected.character,tone:'generation'}},
    {id:'t5',type:'templateFlow',position:{x:655,y:315},data:{kicker:'LOCALIZE',label:'Voice & captions',detail:'English · Spanish',tone:'generation'}},
    {id:'t6',type:'templateFlow',position:{x:965,y:185},data:{kicker:'OUTPUT',label:'Generate variants',detail:'9:16 · Meta + TikTok',image:selected.image,tone:'output'}}
  ] : [];
  const workflowEdges = [
    ['t1','t2'],['t1','t3'],['t2','t4'],['t3','t5'],['t4','t6'],['t5','t6']
  ].map(([source,target],index) => ({id:`tw${index}`,source,target,type:'smoothstep',animated:true,style:{stroke:'#5b8fff',strokeWidth:1.4}}));

  return <div className="page templates-page">
    <div className="templates-toolbar templates-head-row">
      <h2>{zh?'爆款模板':'Templates'}</h2>
      <div className="viral-link-input"><span><LinkSimple/><b>{zh?'链接生成模板':'Link to template'}</b></span><label><input value={videoUrl} onChange={event => setVideoUrl(event.target.value)} placeholder={zh?'粘贴 TikTok、Instagram 或 Facebook 短视频链接':'Paste a TikTok, Instagram or Facebook video link'}/><button disabled={!videoUrl.trim()||analyzing} onClick={analyzeVideo}>{analyzing?<SpinnerGap className="spin"/>:<MagicWand/>}{zh?'分析':'Analyze'}</button></label></div>
      <label className="template-search"><MagnifyingGlass/><input value={query} onChange={event => setQuery(event.target.value)} placeholder={zh?'搜索模板':'Search templates'}/></label>
    </div>
    <div className="industry-filter" aria-label="Industry template filters">{industryFilters.map(([name,Icon]) => <button key={name} className={industry === name ? 'active' : ''} onClick={() => setIndustry(name)}><Icon/>{name}</button>)}</div>
    <div className="template-library-meta"><div><span>LOCAL BUSINESS TEMPLATE LIBRARY</span><h3>{industry === 'All industries' ? 'Proven store-visit structures across 16 industries' : `${industry} templates`}</h3></div><p>{visibleTemplates.length} templates · Click any image to preview</p></div>
    <div className="template-grid">{visibleTemplates.map(item => <article className="template-card" key={item.id}>
      <div className="template-media" role="button" tabIndex="0" aria-label={`Preview ${item.title}`} onClick={() => openTemplate(item)} onKeyDown={event => event.key === 'Enter' && openTemplate(item)}>
        <img src={item.image}/><span className="template-model">{item.model}</span><button className={`template-save ${saved.includes(item.id) ? 'saved' : ''}`} aria-label={`Save ${item.title}`} onClick={event => {event.stopPropagation();toggleSaved(item.id);}}><BookmarkSimple weight={saved.includes(item.id) ? 'fill' : 'regular'}/></button><button className="template-recreate" onClick={event => {event.stopPropagation();openTemplate(item,'workflow');}}>Recreate</button><i><Play weight="fill"/></i>
      </div>
      <div className="template-card-copy"><b>{item.title}</b><span><Eye/> {item.views} views <i>·</i> <Fire/> {item.uses} uses <i>·</i> Demo</span><small>{item.industry} · {item.duration} · {item.category}</small></div>
    </article>)}</div>
    {!visibleTemplates.length && <div className="template-empty"><MagnifyingGlass/><h3>No matching templates</h3><p>Try another search or industry.</p><button onClick={() => {setIndustry('All industries');setQuery('');}}>Show all templates</button></div>}

    {analysisReady && <div className="viral-analysis-scrim" onMouseDown={() => setAnalysisReady(false)}><section className="viral-analysis-modal" onMouseDown={event => event.stopPropagation()}>
      <header><div><span>{zh?'爆款结构分析':'VIRAL STRUCTURE'}</span><h3>{zh?'改写成你的门店模板':'Rewrite it for your store'}</h3></div><button onClick={() => setAnalysisReady(false)}><X/></button></header>
      <div className="viral-source"><LinkSimple/><span><b>{zh?'参考视频':'Reference video'}</b><small>{videoUrl}</small></span></div>
      <div className="viral-structure"><span>{zh?'拆解结果':'STRUCTURE'}</span>{(zh?['3 秒钩子','痛点升级','结果证明','到店行动']:['3s hook','Pain build','Proof scene','Visit CTA']).map((item,index)=><i key={item}><b>{index+1}</b>{item}</i>)}</div>
      <label className="viral-rewrite"><span>{zh?'改写文案':'REWRITE'}</span><textarea value={rewrite} onChange={event=>setRewrite(event.target.value)}/></label>
      <footer><button className="secondary" onClick={() => setAnalysisReady(false)}>{zh?'取消':'Cancel'}</button><button className="primary" onClick={saveCustomTemplate}><BookmarkSimple weight="fill"/>{zh?'保存为自定义模板':'Save custom template'}</button></footer>
    </section></div>}

    {selected && <div className="template-modal-scrim" onMouseDown={() => setSelected(null)}><section className="template-modal" onMouseDown={event => event.stopPropagation()}>
      <header><h3>{selected.title}</h3><div className="template-modal-tabs"><button className={modalMode === 'preview' ? 'active' : ''} onClick={() => setModalMode('preview')}><Eye/> Preview</button><button className={modalMode === 'workflow' ? 'active' : ''} onClick={() => setModalMode('workflow')}><ShareNetwork/> Workflow</button></div><div className="template-modal-actions"><button onClick={() => notify('Template guide opened.')}><BookOpen/> How it works</button><button onClick={() => notify('Share link copied.')}><ShareNetwork/></button><button aria-label="Close template" onClick={() => setSelected(null)}><X/></button></div></header>
      <div className="template-modal-body">
        <div className={`template-stage ${modalMode}`}>
          {modalMode === 'preview' ? <><video key={selected.id} src={selected.video} poster={selected.image} controls autoPlay muted loop playsInline/><div className="template-preview-input"><span>INPUT</span><b>Product image</b><img src={selected.image}/></div><div className="template-preview-label"><Play weight="fill"/><span><b>{selected.duration} viral structure</b><small>{selected.theme}</small></span></div></> : <><ReactFlow nodes={workflowNodes} edges={workflowEdges} nodeTypes={templateNodeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} panOnScroll minZoom={0.35} maxZoom={1.2}><Background color="#3a414c" gap={24} size={1}/><Controls showInteractive={false}/></ReactFlow><div className="template-readonly"><Eye/> You're viewing a read-only workflow.<button onClick={openInCanvas}>Open in Viral Canvas <ArrowRight/></button></div></>}
        </div>
        <aside className="template-input-panel"><span>RECREATE · {selected.industry.toUpperCase()}</span><h3>Add your product</h3><button className="autofill-brand" onClick={() => {setAutofilled(true);notify('Product and Brand Kit loaded from My Brand.');}}><Storefront/> {autofilled ? 'Loaded from My Brand' : 'Autofill from My Brand'} {autofilled && <Check/>}</button><div className="or-divider"><i></i><span>or</span><i></i></div><label>Product image *</label><button className="template-upload" onClick={() => notify('Product picker opened.')}><img src={selected.image}/><span><ImageIcon/><b>Choose from My Brand</b><small>product, service or local product</small></span></button><label>Video theme *</label><select defaultValue={selected.theme}><option>{selected.theme}</option><option>Owner-led education</option><option>Before and after proof</option><option>Fast local recommendation</option></select><label>Character preference *</label><select defaultValue={selected.character}><option>{selected.character}</option><option>Business owner</option><option>AI presenter</option><option>No presenter</option></select><label>Language & CTA</label><select defaultValue="English · Book a visit"><option>English · Book a visit</option><option>Spanish · WhatsApp</option><option>English · Reserve now</option><option>English · Get directions</option></select><button className="template-generate" onClick={() => notify(`${selected.title} generation started.`)}><Sparkle weight="fill"/> Generate video <span>35 credits</span></button></aside>
      </div>
    </section></div>}
  </div>;
}

function FlowNode({ data }) {
  const Icon = data.icon || Sparkle;
  return <div className={`flow-node ${data.status || ''}`}>
    <Handle type="target" position={Position.Left}/><i><Icon/></i><div><span>{data.kicker}</span><b>{data.label}</b><small>{data.detail}</small></div>{data.status === 'done' && <CheckCircle weight="fill"/>}<Handle type="source" position={Position.Right}/>
  </div>;
}

const nodeTypes = { flowNode: FlowNode };
const initialNodes = [
  { id:'1', type:'flowNode', position:{x:80,y:250}, data:{kicker:'INPUT',label:'Viral reference',detail:'TikTok URL imported',icon:LinkSimple,status:'done'} },
  { id:'2', type:'flowNode', position:{x:370,y:120}, data:{kicker:'ANALYZE',label:'Extract winning script',detail:'Hook · proof · CTA',icon:Article,status:'done'} },
  { id:'3', type:'flowNode', position:{x:370,y:380}, data:{kicker:'BRAND',label:'Add your product',detail:'Weekend signature product',icon:Package,status:'done'} },
  { id:'4', type:'flowNode', position:{x:690,y:120}, data:{kicker:'LOCALIZE',label:'Rewrite for market',detail:'Spanish · Downtown',icon:Globe} },
  { id:'5', type:'flowNode', position:{x:690,y:380}, data:{kicker:'PRESENTER',label:'Choose avatar',detail:'Owner clone or actor',icon:UserCircle} },
  { id:'6', type:'flowNode', position:{x:1020,y:250}, data:{kicker:'OUTPUT',label:'Generate 3 variants',detail:'9:16 · Meta + TikTok',icon:VideoCamera} }
];
const initialEdges = [
  {id:'e12',source:'1',target:'2'},{id:'e13',source:'1',target:'3'},
  {id:'e24',source:'2',target:'4'},{id:'e34',source:'3',target:'4'},
  {id:'e35',source:'3',target:'5'},{id:'e46',source:'4',target:'6'},{id:'e56',source:'5',target:'6'}
].map(e => ({...e, type:'smoothstep', animated:true, style:{stroke:'#2563eb',strokeWidth:1.5}}));

function CanvasPage({ template, theme }) {
  const seededNodes = useMemo(() => initialNodes.map(node => node.id === '1' && template ? {...node,data:{...node.data,label:template.title,detail:`${template.duration} template copied`,status:'done'}} : node), [template]);
  const [nodes, setNodes, onNodesChange] = useNodesState(seededNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  return <div className="canvas-page canvas-workspace-page">
    <div className="canvas-body">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView minZoom={0.3} maxZoom={1.7}>
        <Background color={theme === 'dark' ? '#292929' : '#dfe3e8'} gap={22} size={1}/><Controls/><MiniMap nodeColor={theme === 'dark' ? '#202b3d' : '#dbeafe'} maskColor={theme === 'dark' ? 'rgba(5,5,5,.8)' : 'rgba(248,250,252,.78)'}/>
      </ReactFlow>
      <div className="canvas-palette"><button><Plus/></button><button title="Add text"><Article/></button><button title="Add image"><ImageIcon/></button><button title="Add video"><VideoCamera/></button><button title="Add avatar"><UserCircle/></button><button title="AI tool"><Sparkle/></button></div>
      <div className="canvas-help"><b>From viral reference to branded ad</b><p>Every node is editable. Add tools, branch variants and reuse the winning workflow.</p></div>
    </div>
  </div>;
}

function AvatarsPage({ notify, setPage, language, selectedAvatar, setSelectedAvatar, personalAvatars, wizardOpen, closeWizard, onAvatarCreated }) {
  const zh = language === 'zh';
  const [query, setQuery] = useState('');
  const [flow, setFlow] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [consented, setConsented] = useState(false);
  const [ownerName, setOwnerName] = useState(zh ? '我的老板数字人' : 'My owner avatar');
  const [custom, setCustom] = useState({ base:0, gender:'Female', age:'30–45', market:'North America', hair:'Dark · shoulder length', wardrobe:'Smart casual', scene:'Showroom', voice:'Warm & confident', language:'English' });
  useEffect(() => { if (wizardOpen) { setFlow('clone'); setWizardStep(1); setConsented(false); closeWizard?.(); } }, [wizardOpen, closeWizard]);
  const filtered = actors.filter(a => a.join(' ').toLowerCase().includes(query.toLowerCase()));
  const openFlow = type => { setFlow(type); setWizardStep(1); setConsented(false); };
  const useAvatar = avatar => { setSelectedAvatar(avatar); notify(zh?`已选择数字人 ${avatar.name}`:`${avatar.name} selected. Opening Agent.`); setPage('agent'); };
  const finishOwner = () => {
    const owner={id:`owner-${Date.now()}`,name:ownerName.trim() || (zh?'我的老板数字人':'My owner avatar'),role:zh?'门店老板分身':'Store owner clone',locale:zh?'中文 · 英语':'English · Chinese',image:images.presenter};
    setSelectedAvatar(owner);
    onAvatarCreated?.(owner);
    setFlow(null);
    setWizardStep(1);
    notify(zh?'克隆数字人已保存到“我的数字人”。':'Your cloned avatar is saved in My avatars.');
  };
  const finishCustom = () => {
    const source=actors[custom.base];
    const avatar={id:`custom-${Date.now()}`,name:zh?`定制数字人 · ${source[0]}`:`Custom · ${source[0]}`,role:`${custom.wardrobe} · ${custom.scene}`,locale:`${custom.language} · ${custom.voice}`,image:source[3]};
    setSelectedAvatar(avatar); onAvatarCreated?.(avatar); setFlow(null); setWizardStep(1);
    notify(zh?'定制数字人已生成并保存。':'Your custom avatar is generated and saved.');
  };
  return <div className="page avatars-page">
    <PageTitle eyebrow={zh?'数字人':'AI AVATARS'} title={zh?'选择你的数字人创建方式':'Choose how to create your avatar'} copy={zh?'克隆本人建立长期信任，或自定义一个现成数字人快速开始。':'Clone yourself for lasting trust, or customize a ready presenter for a faster start.'}/>
    <div className="avatar-methods">
      <button onClick={() => openFlow('clone')}><div><span>{zh?'你的核心资产':'YOUR STRONGEST ASSET'}</span><h3>{zh?'克隆自己':'Clone yourself'}</h3><p>{zh?'录制一次，持续生成保留本人形象与声音的多语言门店广告。':'Record once. Create owner-led videos in multiple languages with your face and voice.'}</p><b>{zh?'开始克隆':'Start cloning'} <ArrowRight/></b></div><img src={images.presenter}/></button>
      <button onClick={() => openFlow('custom')}><div><span>{zh?'最快开始':'FASTEST START'}</span><h3>{zh?'自定义数字人':'Custom avatar'}</h3><p>{zh?'选择人物属性、行业场景、语言与声音，生成专属广告角色。':'Choose appearance, industry scene, language and voice to generate your presenter.'}</p><b>{zh?'开始定制':'Customize avatar'} <ArrowRight/></b></div><img src={images.sofia}/></button>
    </div>
    <section className="my-avatar-section"><div className="library-head"><div><span>{zh?'我的资产':'MY ASSETS'}</span><h3>{zh?'我的数字人':'My avatars'}</h3><p>{zh?'克隆和定制完成后会保存在这里，可直接用于创作。':'Cloned and custom avatars are saved here, ready for creation.'}</p></div><button className="secondary" onClick={()=>openFlow('clone')}><Plus/>{zh?'创建数字人':'Create avatar'}</button></div><div className="my-avatar-grid">{personalAvatars.map(avatar=><article key={avatar.id} className={selectedAvatar?.id===avatar.id?'selected':''}><div><img src={avatar.image}/><span>{avatar.role.includes('clone')||avatar.role.includes('分身')?(zh?'本人克隆':'OWNER CLONE'):(zh?'定制角色':'CUSTOM')}</span></div><section><b>{avatar.name}</b><small>{avatar.role}</small><p>{avatar.locale}</p><button onClick={()=>useAvatar(avatar)}>{zh?'用它创作':'Create with avatar'}<ArrowRight/></button></section></article>)}</div></section>
    <div className="library-head avatar-library-head"><div><span>{zh?'角色参考':'PRESENTER LIBRARY'}</span><h3>{zh?'浏览可定制角色':'Browse presenter styles'}</h3><p>{zh?'选择任一形象将进入属性定制流程。':'Pick a look, then tailor its attributes before saving.'}</p></div><label><MagnifyingGlass/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={zh?'搜索形象、语言或角色':'Search avatars, language or role'}/></label></div>
    <div className="filter-chips"><button className="active">{zh?'全部数字人':'All avatars'}</button><button>English</button><button>Spanish</button><button>{zh?'本地门店':'Local business'}</button><button>{zh?'已收藏':'Saved'}</button></div>
    <div className="actor-grid">{filtered.map((actor, i) => {const [name,role,locale,image]=actor;return <button key={`${name}-${i}`} onClick={() => {setCustom(c=>({...c,base:actors.indexOf(actor)}));openFlow('custom');}}><div><img src={image}/><span>{i < 3 ? 'POPULAR' : 'HD'}</span></div><b>{name}</b><small>{role}</small><p>{locale}</p></button>;})}</div>
    {flow && <div className="modal-scrim" onMouseDown={()=>setFlow(null)}><div className="clone-modal avatar-wizard avatar-flow-modal" onMouseDown={event=>event.stopPropagation()}><button className="modal-close" onClick={() => setFlow(null)}><X/></button><span>{flow==='clone'?(zh?'克隆本人':'CLONE YOURSELF'):(zh?'定制角色':'CUSTOM AVATAR')}</span><h2>{flow==='clone'?(zh?'创建可重复使用的老板分身':'Create your reusable owner avatar'):(zh?'生成符合品牌的专属数字人':'Build an avatar for your brand')}</h2><div className="wizard-progress">{[1,2,3,4].map(step=><div key={step} className={wizardStep>=step?'active':''}><i>{wizardStep>step?<Check/>:step}</i><b>{flow==='clone'?[zh?'授权':'Consent',zh?'录制':'Record',zh?'检查':'Review',zh?'保存':'Save'][step-1]:[zh?'人物':'Person',zh?'造型':'Look',zh?'声音':'Voice',zh?'预览':'Preview'][step-1]}</b></div>)}</div>
      {flow==='clone'&&wizardStep===1&&<section className="wizard-panel"><ShieldCheck/><h3>{zh?'确认本人授权':'Confirm consent'}</h3><p>{zh?'你的形象与声音只用于当前工作区，可随时停用或删除。':'Your face and voice stay in this workspace and can be disabled or deleted.'}</p><label className="consent-check"><input type="checkbox" checked={consented} onChange={e=>setConsented(e.target.checked)}/><span>{zh?'我确认由本人创建，并授权用于生成内容。':'I am creating my own avatar and authorize its use for generated content.'}</span></label><div className="wizard-actions"><button className="primary" disabled={!consented} onClick={()=>setWizardStep(2)}>{zh?'同意并继续':'Agree and continue'}<ArrowRight/></button></div></section>}
      {flow==='clone'&&wizardStep===2&&<section className="wizard-panel"><VideoCamera/><h3>{zh?'录制 20 秒清晰视频':'Record a clear 20-second video'}</h3><div className="recording-guide"><span><Check/> {zh?'正面看镜头':'Face the camera'}</span><span><Check/> {zh?'环境安静、光线均匀':'Quiet room, even light'}</span><span><Check/> {zh?'自然说话并轻微转头':'Speak naturally and turn slightly'}</span></div><div className="wizard-actions"><button onClick={()=>setWizardStep(3)}><UploadSimple/>{zh?'上传视频':'Upload video'}</button><button className="primary" onClick={()=>setWizardStep(3)}><Camera/>{zh?'开始录制':'Start recording'}</button></div></section>}
      {flow==='clone'&&wizardStep===3&&<section className="wizard-panel avatar-review"><img src={images.presenter}/><div><CheckCircle weight="fill"/><h3>{zh?'素材检查通过':'Recording checks passed'}</h3><p>{zh?'人脸清晰、声音完整，已准备生成。':'Face and voice quality are ready for generation.'}</p><div className="wizard-actions"><button onClick={()=>setWizardStep(2)}>{zh?'重新录制':'Record again'}</button><button className="primary" onClick={()=>setWizardStep(4)}>{zh?'生成数字人':'Generate avatar'}<ArrowRight/></button></div></div></section>}
      {flow==='clone'&&wizardStep===4&&<section className="wizard-panel avatar-save"><img src={images.presenter}/><div><CheckCircle weight="fill"/><h3>{zh?'你的分身已准备好':'Your avatar is ready'}</h3><label>{zh?'数字人名称':'Avatar name'}<input value={ownerName} onChange={e=>setOwnerName(e.target.value)}/></label><p>{zh?'保存后将出现在“我的数字人”，并可直接进入 Agent 创作。':'It will appear in My avatars and can be used directly in Agent.'}</p><button className="primary" onClick={finishOwner}>{zh?'保存到我的数字人':'Save to My avatars'}<ArrowRight/></button></div></section>}
      {flow==='custom'&&wizardStep===1&&<section className="wizard-panel"><h3>{zh?'选择基础人物与受众属性':'Choose a person and audience fit'}</h3><div className="avatar-base-options">{actors.slice(0,4).map((a,i)=><button className={custom.base===i?'selected':''} key={a[0]} onClick={()=>setCustom(c=>({...c,base:i}))}><img src={a[3]}/><b>{a[0]}</b></button>)}</div><div className="attribute-grid"><label>{zh?'性别表达':'Gender'}<select value={custom.gender} onChange={e=>setCustom(c=>({...c,gender:e.target.value}))}><option>Female</option><option>Male</option><option>Non-binary</option></select></label><label>{zh?'年龄段':'Age'}<select value={custom.age} onChange={e=>setCustom(c=>({...c,age:e.target.value}))}><option>18–29</option><option>30–45</option><option>46–60</option><option>60+</option></select></label><label>{zh?'目标市场':'Market'}<select value={custom.market} onChange={e=>setCustom(c=>({...c,market:e.target.value}))}><option>North America</option><option>Europe</option><option>Latin America</option><option>Southeast Asia</option></select></label></div><div className="wizard-actions"><button className="primary" onClick={()=>setWizardStep(2)}>{zh?'下一步：造型':'Next: appearance'}<ArrowRight/></button></div></section>}
      {flow==='custom'&&wizardStep===2&&<section className="wizard-panel"><h3>{zh?'定制外观与门店场景':'Customize appearance and scene'}</h3><div className="attribute-grid"><label>{zh?'发型':'Hair'}<select value={custom.hair} onChange={e=>setCustom(c=>({...c,hair:e.target.value}))}><option>Dark · shoulder length</option><option>Short · professional</option><option>Curly · natural</option><option>Blonde · long</option></select></label><label>{zh?'服装':'Wardrobe'}<select value={custom.wardrobe} onChange={e=>setCustom(c=>({...c,wardrobe:e.target.value}))}><option>Smart casual</option><option>Business formal</option><option>Store uniform</option><option>Creative casual</option></select></label><label>{zh?'场景':'Scene'}<select value={custom.scene} onChange={e=>setCustom(c=>({...c,scene:e.target.value}))}><option>Showroom</option><option>Restaurant</option><option>Beauty studio</option><option>Retail store</option><option>Clean studio</option></select></label></div><div className="wizard-actions"><button onClick={()=>setWizardStep(1)}>{zh?'返回':'Back'}</button><button className="primary" onClick={()=>setWizardStep(3)}>{zh?'下一步：声音':'Next: voice'}<ArrowRight/></button></div></section>}
      {flow==='custom'&&wizardStep===3&&<section className="wizard-panel"><h3>{zh?'选择语言与表达风格':'Choose voice and delivery'}</h3><div className="attribute-grid"><label>{zh?'主要语言':'Language'}<select value={custom.language} onChange={e=>setCustom(c=>({...c,language:e.target.value}))}><option>English</option><option>Spanish</option><option>Chinese</option><option>French</option><option>Portuguese</option></select></label><label>{zh?'声音风格':'Voice'}<select value={custom.voice} onChange={e=>setCustom(c=>({...c,voice:e.target.value}))}><option>Warm & confident</option><option>Energetic & friendly</option><option>Calm & expert</option><option>Direct & persuasive</option></select></label></div><button className="voice-preview" onClick={()=>notify(zh?'正在播放声音预览。':'Playing voice preview.')}><Play weight="fill"/>{zh?'试听声音':'Preview voice'}</button><div className="wizard-actions"><button onClick={()=>setWizardStep(2)}>{zh?'返回':'Back'}</button><button className="primary" onClick={()=>setWizardStep(4)}>{zh?'生成预览':'Generate preview'}<ArrowRight/></button></div></section>}
      {flow==='custom'&&wizardStep===4&&<section className="wizard-panel custom-preview"><img src={actors[custom.base][3]}/><div><span>{zh?'预览已生成':'PREVIEW READY'}</span><h3>{zh?'你的专属广告角色':'Your custom presenter'}</h3><p>{custom.gender} · {custom.age} · {custom.market}</p><p>{custom.wardrobe} · {custom.scene}</p><p>{custom.language} · {custom.voice}</p><div className="wizard-actions"><button onClick={()=>setWizardStep(1)}>{zh?'继续调整':'Edit attributes'}</button><button className="primary" onClick={finishCustom}>{zh?'保存并使用':'Save avatar'}<ArrowRight/></button></div></div></section>}
    </div></div>}
  </div>;
}

function PerformancePage({ notify, language }) {
  const zh = language === 'zh';
  const [connected, setConnected] = useState(['meta','tiktok']);
  const toggle = id => {
    const isConnected = connected.includes(id);
    setConnected(current => isConnected ? current.filter(item => item !== id) : [...current,id]);
    notify(isConnected ? (zh?'数据源已断开。':'Data source disconnected.') : (zh?'数据源已连接。':'Data source connected.'));
  };
  const sources = [
    ['meta','Meta Ads',FacebookLogo,zh?'广告系列、素材和消息数据':'Campaign, creative and message data'],
    ['tiktok','TikTok',TiktokLogo,zh?'自然流量和付费素材数据':'Organic and paid creative data'],
    ['whatsapp','WhatsApp',WhatsappLogo,zh?'有效咨询和响应时间':'Qualified conversations and response time'],
    ['crm',zh?'线索 / CRM':'Lead / CRM',Users,zh?'预约、报价和成交数据':'Appointments, quotes and closed sales']
  ];
  const creatives = [
    [images.presenter,zh?'老板讲解周末主推产品':'Owner explains the weekend product','Meta','$1,280','83','$15.42'],
    [images.kitchen,zh?'招牌菜到店引流开场':'Signature dish visit hook','TikTok','$740','39','$18.97'],
    [images.patio,zh?'美业改造预约广告':'Beauty transformation booking','Meta','$920','41','$22.44']
  ];
  return <div className="page performance-page">
    <PageTitle eyebrow={zh?'数据资产':'DATA ASSET'} title={zh?'看清哪些素材真正带来到店和预约':'Know which creative creates visits and bookings'} copy={zh?'VertensAI 连接内容、花费、咨询与门店经营结果，并用你的真实业务数据持续学习。':'VertensAI connects content, spend, conversations and store outcomes. The system learns from your own data—not generic vanity metrics.'} action={<button className="secondary"><Clock/> {zh?'最近 30 天':'Last 30 days'}</button>}/>
    <div className="kpi-grid"><article><span>{zh?'有效线索':'Qualified leads'}</span><strong>184</strong><small className="up">{zh?'较上期增长 22.4%':'+22.4% vs prior period'}</small></article><article><span>{zh?'单条有效线索成本':'Cost per qualified lead'}</span><strong>$18.40</strong><small className="up">{zh?'成本改善 12.6%':'−12.6% improvement'}</small></article><article><span>{zh?'已预约到店':'Appointments booked'}</span><strong>37</strong><small>{zh?'占有效线索的 20.1%':'20.1% of qualified leads'}</small></article><article><span>{zh?'归因收入':'Attributed revenue'}</span><strong>$42.8K</strong><small>{zh?'预估广告回报 2.9 倍':'2.9× estimated ROAS'}</small></article></div>
    <div className="performance-grid">
      <section className="performance-chart"><div className="card-head"><div><h3>{zh?'线索质量趋势':'Lead quality trend'}</h3><p>{zh?'广告花费与有效咨询对比':'Spend compared with qualified enquiries'}</p></div><button aria-label={zh?'更多操作':'More actions'}><DotsThree/></button></div><div className="chart-area"><div className="chart-y"><span>60</span><span>40</span><span>20</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><path className="area" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25 L700 220 L0 220Z"/><path className="line" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25"/></svg><div className="chart-x"><span>{zh?'7月21日':'Jul 21'}</span><span>{zh?'7月28日':'Jul 28'}</span><span>{zh?'8月4日':'Aug 4'}</span><span>{zh?'8月11日':'Aug 11'}</span><span>{zh?'8月18日':'Aug 18'}</span></div></div></section>
      <aside className="data-sources"><div className="card-head"><div><h3>{zh?'数据来源':'Data sources'}</h3><p>{zh?'连接完整的客户旅程':'Connect the full customer journey'}</p></div></div>{sources.map(([id,name,Icon,desc]) => <button key={id} onClick={() => toggle(id)}><i><Icon/></i><span><b>{name}</b><small>{desc}</small></span>{connected.includes(id) ? <em><Check/> {zh?'已连接':'Connected'}</em> : <strong>{zh?'连接':'Connect'}</strong>}</button>)}</aside>
    </div>
    <div className="insight-card"><div className="insight-icon"><Sparkle weight="fill"/></div><div><span>{zh?'效果分析智能体':'PERFORMANCE AGENT'}</span><h3>{zh?'老板出镜的本地产品视频使有效 WhatsApp 咨询量提升了 41%。':'Owner-led local product videos are producing 41% more qualified WhatsApp conversations.'}</h3><p>{zh?'建议：沿用同一开场生成 3 个新版本，并在确认预约质量后再增加预算。':'Recommendation: create three new variants using the same hook and increase budget only after appointment quality is confirmed.'}</p></div><button onClick={() => notify(zh?'建议已加入下一轮素材测试。':'Recommendation added to the next creative sprint.')}>{zh?'生成新版本':'Create variants'} <ArrowRight/></button></div>
    <section className="creative-table"><div className="card-head"><div><h3>{zh?'素材效果':'Creative performance'}</h3><p>{zh?'按有效线索效率排序':'Ranked by qualified lead efficiency'}</p></div><button>{zh?'查看全部':'View all'}</button></div><div className="table-row table-header"><span>{zh?'素材':'Creative'}</span><span>{zh?'渠道':'Channel'}</span><span>{zh?'花费':'Spend'}</span><span>{zh?'有效线索':'Qualified leads'}</span><span>{zh?'单条线索成本':'Cost / lead'}</span><span>{zh?'操作':'Action'}</span></div>{creatives.map((r) => <div className="table-row" key={r[1]}><span className="creative-name"><img src={r[0]}/><b>{r[1]}</b></span>{r.slice(2).map((x,j)=><span key={j}>{x}</span>)}<span><button aria-label={zh?'查看素材详情':'View creative details'}><ArrowRight/></button></span></div>)}</section>
  </div>;
}

function ServicePage({ notify, language }) {
  const zh = language === 'zh';
  const [leadOpen,setLeadOpen]=useState(false);
  const submitLead=event=>{event.preventDefault();setLeadOpen(false);notify(zh?'联系信息已提交，顾问会通过 WhatsApp 联系你。':'Contact details saved. Our strategist will reach out on WhatsApp.');};
  return <div className="page service-page"><PageTitle eyebrow="HUMAN + AI" title="Human Admaker" copy={zh?'人工策划，AI 与实拍混剪。每月稳定交付。':'Human strategy with AI + real-footage editing.'} action={<button className="primary" onClick={() => setLeadOpen(true)}>{zh?'开始合作':'Start now'}</button>}/>
    <section className="service-hero human-admaker"><div><span>{zh?'月度广告服务':'MONTHLY AD SERVICE'}</span><h3>{zh?'每月 8 条广告':'8 ads every month'}</h3><p>{zh?'人工策划选题与脚本，结合客户实拍素材和 AI 生成画面，完成适合 Facebook、Instagram 与 TikTok 的短视频。':'A human strategist plans the concepts and scripts. Editors combine your footage with AI scenes for Meta and TikTok.'}</p><div className="service-stats"><span><b>$500</b><small>{zh?'每月':'per month'}</small></span><span><b>8</b><small>{zh?'条短视频':'short ads'}</small></span><span><b>{zh?'人工':'Human'}</b><small>{zh?'策划与审核':'strategy + QA'}</small></span></div><div className="service-cta-row"><button className="primary" onClick={() => setLeadOpen(true)}>{zh?'订购 $500/月':'Start for $500/month'} <ArrowRight/></button><a className="whatsapp-official" href="https://wa.me/" target="_blank" rel="noreferrer"><WhatsappLogo weight="fill"/>{zh?'WhatsApp 联系官方':'Chat with us'}</a></div></div><div className="sample-stack"><img src={images.presenter}/><img src={images.kitchen}/><img src={images.patio}/><span>{zh?'AI + 实拍混剪':'AI + REAL FOOTAGE'}</span></div></section>
    <div className="sample-title"><div><h3>{zh?'样片':'Sample ads'}</h3><p>{zh?'人工策划的三种常用方向':'Three human-planned directions'}</p></div></div><div className="sample-grid">{[[images.presenter,zh?'老板口播':'Owner-led product',zh?'信任 + 到店':'Trust + visit'],[images.kitchen,zh?'产品证明':'Product proof',zh?'细节 + 卖点':'Detail + value'],[images.patio,zh?'案例变化':'Before & after',zh?'结果 + 行动':'Proof + action']].map(x=><article key={x[1]}><div><img src={x[0]}/><button><Play weight="fill"/></button></div><b>{x[1]}</b><span>{x[2]}</span></article>)}</div>
    {leadOpen&&<div className="service-lead-scrim" onMouseDown={()=>setLeadOpen(false)}><form className="service-lead-modal" onMouseDown={event=>event.stopPropagation()} onSubmit={submitLead}><header><div><span>HUMAN ADMAKER</span><h3>{zh?'开始每月 8 条广告计划':'Start the 8-ads monthly plan'}</h3><p>{zh?'留下联系方式，人工策划顾问会确认业务和素材。':'Share your contact details and a human strategist will confirm the brief.'}</p></div><button type="button" onClick={()=>setLeadOpen(false)}><X/></button></header><label>{zh?'姓名':'Name'}<input required placeholder={zh?'请输入姓名':'Your name'}/></label><label>{zh?'电话':'Phone'}<input required type="tel" placeholder="+1 555 000 0000"/></label><label>WhatsApp<input required type="tel" placeholder="+1 555 000 0000"/></label><footer><a href="https://wa.me/" target="_blank" rel="noreferrer"><WhatsappLogo weight="fill"/>{zh?'直接联系官方':'Message VertensAI'}</a><button className="primary" type="submit">{zh?'提交联系方式':'Submit contact'}<ArrowRight/></button></footer></form></div>}
  </div>;
}

const calendarContent = [
  {day:2,time:'10:00',title:'Why homeowners delay this decision',titleZh:'业主为什么迟迟不做决定',format:'Owner video',formatZh:'老板口播',channel:'TikTok',owner:'Maya',status:'Approved',statusZh:'已通过',theme:'Expose the pain'},
  {day:4,time:'18:30',title:'Three details that change the final result',titleZh:'影响最终效果的三个细节',format:'Carousel',formatZh:'轮播图文',channel:'Instagram',owner:'Noah',status:'Draft',statusZh:'草稿',theme:'Educate'},
  {day:6,time:'12:00',title:'Weekend showroom invitation',titleZh:'周末到店体验邀请',format:'Product video',formatZh:'优惠短视频',channel:'Facebook',owner:'Maya',status:'Scheduled',statusZh:'已排期',theme:'Visit CTA'},
  {day:9,time:'09:30',title:'Before and after: small-space upgrade',titleZh:'小户型改造前后对比',format:'Transformation',formatZh:'改造短视频',channel:'TikTok',owner:'Liam',status:'In review',statusZh:'审核中',theme:'Proof'},
  {day:11,time:'17:00',title:'Material comparison in 20 seconds',titleZh:'20 秒看懂材料差异',format:'Owner video',formatZh:'老板口播',channel:'Facebook',owner:'Noah',status:'Approved',statusZh:'已通过',theme:'Feature deep dive'},
  {day:15,time:'11:30',title:'What a complete project really costs',titleZh:'一套完整项目到底多少钱',format:'Talking head',formatZh:'口播短视频',channel:'Instagram',owner:'Maya',status:'Draft',statusZh:'草稿',theme:'Proof of ROI'},
  {day:18,time:'19:00',title:'Customer story: from enquiry to install',titleZh:'客户案例：从咨询到安装',format:'Testimonial',formatZh:'客户案例',channel:'TikTok',owner:'Liam',status:'Scheduled',statusZh:'已排期',theme:'Proof'},
  {day:23,time:'10:30',title:'Last slots for the September product',titleZh:'九月优惠最后名额',format:'Product video',formatZh:'优惠短视频',channel:'Facebook',owner:'Maya',status:'Approved',statusZh:'已通过',theme:'Direct conversion'},
  {day:27,time:'16:00',title:'Meet the team behind every project',titleZh:'认识项目背后的服务团队',format:'Behind the scenes',formatZh:'幕后图文',channel:'Instagram',owner:'Noah',status:'Idea',statusZh:'创意',theme:'Trust'}
];

function MarketingCalendarPage({ setPage, notify, language, openAgentWithDraft, fromCheckup, clearFromCheckup }) {
  const zh = language === 'zh';
  const [view, setView] = useState('calendar');
  const [planning, setPlanning] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [scripts, setScripts] = useState({});
  const [draft, setDraft] = useState(null);
  const defaultScript = () => zh
    ? {hook:'还在为这个选择反复纠结？先看完这 20 秒。',body:'我们用真实案例拆解关键差异，让效果和预算都更清楚。',cta:'预约到店，现场看样并领取本周方案。'}
    : {hook:'Still comparing options? Give us 20 seconds before you decide.',body:'A real customer result shows the difference in material, finish and final value.',cta:'Book a showroom visit and see the finish in person this week.'};
  useEffect(() => { setDraft(selectedPost ? (scripts[selectedPost.title] || defaultScript()) : null); }, [selectedPost, language]);
  const dirty = !!selectedPost && !!draft && JSON.stringify(draft) !== JSON.stringify(scripts[selectedPost.title] || defaultScript());
  const saveScript = () => { setScripts(current => ({...current, [selectedPost.title]: draft})); notify(zh?'文案已保存，后续生成会使用你改过的版本。':'Copy saved. Generation will use your edited version.'); };
  const resetScript = () => { setDraft(defaultScript()); notify(zh?'已恢复 AI 初稿。':'Reset to the AI draft.'); };
  const generatePlan = () => {
    setPlanning(true);
    setTimeout(() => { setPlanning(false); notify(zh?'已根据品牌更新 4 周内容计划。':'Your 4-week plan has been refreshed.'); }, 900);
  };
  const weekThemes = [
    [zh?'第 1 周':'Week 1',zh?'用户痛点':'Expose the pain'],
    [zh?'第 2 周':'Week 2',zh?'产品解读':'Feature deep dive'],
    [zh?'第 3 周':'Week 3',zh?'案例证明':'Proof of ROI'],
    [zh?'第 4 周':'Week 4',zh?'直接转化':'Direct conversion']
  ];
  const createSelectedInAgent = () => {
    if (!selectedPost) return;
    const copy = draft || defaultScript();
    const script = zh
      ? `为「${selectedPost.titleZh}」生成一条短视频。\n\n开场：${copy.hook}\n正文：${copy.body}\n行动：${copy.cta}\n\n形式：${selectedPost.formatZh}；渠道：${selectedPost.channel}；时间：${selectedPost.time}。`
      : `Create a short video for "${selectedPost.title}".\n\nHook: ${copy.hook}\nBody: ${copy.body}\nCTA: ${copy.cta}\n\nFormat: ${selectedPost.format}; Channel: ${selectedPost.channel}; Time: ${selectedPost.time}.`;
    setSelectedPost(null);
    openAgentWithDraft?.(script);
  };
  return <div className="page calendar-page">
    <PageTitle eyebrow="PRO" title={zh?'营销日历':'Marketing Calendar'} copy={zh?'从品牌资产生成每周文案和短视频。':'Weekly copy and video ideas, built from My Brand.'} action={<div className="calendar-actions"><button className="secondary" onClick={() => setPage('brand')}><Buildings/> {zh?'我的品牌':'My Brand'}</button><button className="primary" onClick={generatePlan}>{planning ? <SpinnerGap className="spin"/> : <Strategy/>} {zh?'更新计划':'Refresh plan'}</button></div>}/>
    {fromCheckup&&<div className="calendar-from-checkup"><MagnifyingGlass weight="bold"/><div><b>{zh?'这份日历是按你最近一次账号体检排的':'This calendar is sequenced from your latest account checkup'}</b><small>{zh?'第 1 周补门店信息 · 第 2 周上老板出镜内容 · 第 3 周让店员一起发。每条文案点开都能改。':'Week 1 fixes store info, week 2 adds owner-led video, week 3 brings employees in. Open any post to edit its copy.'}</small></div><button onClick={clearFromCheckup}><X/></button></div>}
    <section className="calendar-summary">
      <div><span>{zh?'本月目标':'MONTHLY GOAL'}</span><h3>{zh?'吸引到店与预约':'Drive visits and bookings'}</h3></div>
      <div className="calendar-summary-meta"><b>9</b><small>{zh?'条内容':'posts'}</small><b>6</b><small>{zh?'条短视频':'videos'}</small><b>3</b><small>{zh?'个平台':'channels'}</small></div>
      <div className="week-theme-row">{weekThemes.map(([week,title],index) => <article key={week}><i>{index+1}</i><div><span>{week}</span><b>{title}</b></div></article>)}</div>
    </section>
    <section className="calendar-workspace calendar-only">
      <div className="calendar-main">
        <header><div><button><CaretDown/></button><h3>{zh?'2026 年 9 月':'September 2026'}</h3><span>{zh?'9 条内容':'9 posts'}</span></div><div className="view-switch"><button className={view === 'calendar' ? 'active' : ''} onClick={() => setView('calendar')}><CalendarBlank/> {zh?'日历':'Calendar'}</button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><Article/> {zh?'列表':'List'}</button></div></header>
        {view === 'calendar' ? <><div className="calendar-weekdays">{(zh?['一','二','三','四','五','六','日']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{Array.from({length:35},(_,index) => {const day = index - 1; const items = calendarContent.filter(item => item.day === day); return <div className={`calendar-cell ${day < 1 || day > 30 ? 'muted' : ''}`} key={index}><span>{day > 0 && day <= 30 ? day : day <= 0 ? 31 + day : day - 30}</span>{items.map(item => <button key={item.title} className={`calendar-item ${item.status.toLowerCase().replace(' ','-')}`} onClick={() => setSelectedPost(item)}><i></i><b>{zh?item.titleZh:item.title}</b><small>{item.format.includes('video') || item.format.includes('head') || item.format.includes('Transformation') ? (zh?'短视频 · 预览':'Video · Preview') : (zh?'文案 · 预览':'Copy · Preview')}</small><Eye/></button>)}</div>})}</div></> : <div className="calendar-list">{calendarContent.map(item => <div className="calendar-list-row" key={item.title}><span>{zh?'9月':'SEP'} <b>{item.day}</b></span><div><b>{zh?item.titleZh:item.title}</b><small>{zh?item.formatZh:item.format} · {item.channel} · {item.time}</small></div><em>{zh?item.statusZh:item.status}</em><button onClick={() => setSelectedPost(item)}><Eye/> {zh?'预览文案':'Preview'}</button></div>)}</div>}
      </div>
    </section>
    {selectedPost&&<div className="calendar-preview-scrim" onMouseDown={() => setSelectedPost(null)}><section className="calendar-preview-modal" onMouseDown={event=>event.stopPropagation()}><header><div><span>{zh?'内容预览':'CONTENT PREVIEW'}</span><h3>{zh?selectedPost.titleZh:selectedPost.title}</h3></div><button onClick={()=>setSelectedPost(null)}><X/></button></header><div className="calendar-video-preview"><img src={selectedPost.day%2?images.kitchen:images.presenter}/><i><Play weight="fill"/></i><span>{selectedPost.formatZh||selectedPost.format} · {selectedPost.time}</span></div><div className="calendar-script editable"><header><span>{zh?'短视频文案 · 可直接编辑':'VIDEO SCRIPT · EDITABLE'}</span>{dirty&&<em>{zh?'未保存':'Unsaved'}</em>}</header>{draft&&[['hook',zh?'开场':'Hook'],['body',zh?'正文':'Body'],['cta',zh?'行动':'CTA']].map(([key,label])=><label key={key}><b>{label}</b><textarea rows={key==='body'?3:2} value={draft[key]} onChange={event=>setDraft(current=>({...current,[key]:event.target.value}))}/></label>)}<div className="script-actions"><button onClick={resetScript}>{zh?'恢复 AI 初稿':'Reset to AI draft'}</button><button className="primary" disabled={!dirty} onClick={saveScript}>{zh?'保存文案':'Save copy'}</button></div></div><button className="create-agent-button" onClick={createSelectedInAgent}><Sparkle weight="fill"/>{zh?'在 Agent 中生成':'Create in Agent'}<ArrowRight/></button></section></div>}
  </div>;
}

const publishingAssets = [
  {id:'owner',name:'Owner explains the weekend product',type:'Video · 20s',image:images.presenter},
  {id:'kitchen',name:'Material comparison',type:'Video · 15s',image:images.kitchen},
  {id:'proof',name:'Before and after proof',type:'Video · 18s',image:images.patio},
  {id:'detail',name:'Premium service detail',type:'Image',image:images.bath}
];

function PublishingPage({ notify, publishAsset, setPublishAsset, setPage, language }) {
  const zh = language === 'zh';
  const [selectedAccount, setSelectedAccount] = useState('fb-madrid');
  const [mode, setMode] = useState('now');
  const [queueOpen, setQueueOpen] = useState(false);
  const [assetPickerOpen, setAssetPickerOpen] = useState(false);
  const [published, setPublished] = useState(false);
  const accounts = [
    ['fb-madrid','Casa Luma Madrid','Facebook Page',FacebookLogo,'Connected'],
    ['ig-madrid','@casaluma.madrid','Instagram Business',InstagramLogo,'Connected'],
    ['tt-madrid','@casaluma_showroom','TikTok Business',TiktokLogo,'Connected']
  ];
  const selectedAsset = publishAsset || publishingAssets[0];
  return <div className="page publishing-page">
    <PageTitle eyebrow="LITE" title={zh?'发布':'Publishing'} copy={zh?'选择素材、账号和发布时间。':'Choose an asset, accounts and time.'} action={<button className="queue-button" onClick={() => setQueueOpen(true)}><Clock/><span>{zh?'发布队列':'Queue'}</span><b>3</b><i></i></button>}/>
    <section className="publish-simple-card">
      <div className="publish-step"><span>1</span><div><h3>{zh?'选择素材':'Choose asset'}</h3><p>{selectedAsset.name}</p></div><button onClick={() => setAssetPickerOpen(true)}>{zh?'选择视频':'View all'}</button></div>
      <div className="selected-publish-asset"><img src={selectedAsset.image}/><div><b>{selectedAsset.name}</b><small>{selectedAsset.type}</small></div><CheckCircle weight="fill"/></div>
      <div className="publish-step"><span>2</span><div><h3>{zh?'选择账号':'Choose account'}</h3><p>{zh?'每条内容仅发布到一个账号':'One asset can be published to one account'}</p></div><button onClick={() => setPage('channels')}>{zh?'管理':'Manage'}</button></div>
      <div className="publish-account-chips single-select">{accounts.map(([id,name,type,Icon]) => <button className={selectedAccount===id?'selected':''} key={id} onClick={() => setSelectedAccount(id)}><Icon/><span><b>{name}</b><small>{type}</small></span><i className="radio-dot">{selectedAccount===id&&<Check/>}</i></button>)}</div>
      <div className="publish-step"><span>3</span><div><h3>{zh?'发布时间':'Publish time'}</h3><p>{mode==='now'?(zh?'立即发布':'Publish now'):(zh?'定时发布':'Schedule')}</p></div><div className="publish-mode"><button className={mode==='now'?'active':''} onClick={() => setMode('now')}>{zh?'立即':'Now'}</button><button className={mode==='schedule'?'active':''} onClick={() => setMode('schedule')}>{zh?'定时':'Schedule'}</button></div></div>
      {mode === 'schedule' && <div className="publish-date-row"><label>{zh?'日期':'Date'}<input type="date" defaultValue="2026-09-06"/></label><label>{zh?'时间':'Time'}<input type="time" defaultValue="18:30"/></label></div>}
      <button className="publish-confirm" disabled={!selectedAccount} onClick={() => {setPublished(true);notify(mode==='now'?(zh?'内容已发布。':'Published successfully.'):(zh?'已加入发布队列。':'Added to publishing queue.'));}}>{published?<><CheckCircle weight="fill"/> {mode==='now'?(zh?'已发布':'Published'):(zh?'已排期':'Scheduled')}</>:<><PaperPlaneTilt/> {mode==='now'?(zh?'发布到所选账号':'Publish to selected account'):(zh?'定时发布到所选账号':'Schedule to selected account')}</>}</button>
    </section>
    {assetPickerOpen && <div className="asset-picker-scrim" onMouseDown={() => setAssetPickerOpen(false)}><section className="asset-picker-modal" onMouseDown={event => event.stopPropagation()}><header><div><span>{zh?'素材库':'ASSETS'}</span><h3>{zh?'选择一个视频':'Choose one asset'}</h3></div><button onClick={() => setAssetPickerOpen(false)}><X/></button></header><div>{publishingAssets.map(asset => <button key={asset.id} className={selectedAsset.id===asset.id?'selected':''} onClick={() => {setPublishAsset(asset);setAssetPickerOpen(false);setPublished(false);}}><img src={asset.image}/><span><b>{asset.name}</b><small>{asset.type}</small></span><i>{selectedAsset.id===asset.id&&<Check weight="bold"/>}</i></button>)}</div></section></div>}
    {queueOpen && <div className="queue-scrim" onMouseDown={() => setQueueOpen(false)}><aside className="queue-drawer" onMouseDown={event => event.stopPropagation()}><header><div><span>{zh?'未来 7 天':'NEXT 7 DAYS'}</span><h3>{zh?'发布队列':'Publishing queue'}</h3></div><button onClick={() => setQueueOpen(false)}><X/></button></header>{[
      ['Today · 18:30','Weekend showroom invitation','3 accounts','Ready'],['Sep 9 · 09:30','Before and after reveal','2 accounts','In review'],['Sep 11 · 17:00','Material comparison','3 accounts','Ready']
    ].map(item => <article key={item[1]}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small><em>{item[3]}</em></article>)}</aside></div>}
  </div>;
}

function SocialAccountsPage({ notify, language }) {
  const zh = language === 'zh';
  const [platform, setPlatform] = useState('meta');
  const platforms = [
    ['meta','Facebook',FacebookLogo,'2'],['instagram','Instagram',InstagramLogo,'1'],['tiktok','TikTok',TiktokLogo,'1']
  ];
  const detail = {
    meta:{name:'Facebook',Icon:FacebookLogo,accounts:[['Casa Luma Madrid','Page · Madrid','Connected'],['Casa Luma Valencia','Page · Valencia','Connected']]},
    instagram:{name:'Instagram',Icon:InstagramLogo,accounts:[['@casaluma.madrid','Business · Madrid','Connected']]},
    tiktok:{name:'TikTok',Icon:TiktokLogo,accounts:[['@casaluma_showroom','Business · Spain','Connected']]}
  }[platform];
  const PlatformIcon = detail.Icon;
  return <div className="page social-page">
    <PageTitle eyebrow="LITE" title={zh?'社媒账号':'Social Accounts'} copy={zh?'连接账号，然后直接发布。':'Connect once. Publish from VertensAI.'} action={<button className="primary" onClick={() => notify(zh?'账号授权流程已打开。':'Account connection opened.')}><Plus/> {zh?'连接账号':'Connect account'}</button>}/>
    <section className="social-accounts-shell">
      <aside><span>{zh?'平台':'PLATFORMS'}</span>{platforms.map(([id,name,Icon,count]) => <button key={id} className={platform===id?'active':''} onClick={() => setPlatform(id)}><i><Icon/></i><span><b>{name}</b><small>{count} {zh?'个账号':'accounts'}</small></span><CaretDown/></button>)}</aside>
      <div className="social-detail"><header><div><i><PlatformIcon/></i><span><h2>{detail.name}</h2><p>{zh?'账号和发布权限':'Accounts and publishing access'}</p></span></div><button onClick={() => notify(`${detail.name} OAuth opened.`)}><Plus/> {zh?'添加':'Add account'}</button></header>
        <div className="social-tabs"><button className="active">{zh?'账号':'Accounts'}</button><button>{zh?'数据':'Data'}</button></div>
        <div className="connected-account-list">{detail.accounts.map(([name,type,status]) => <article key={name}><i><PlatformIcon/></i><div><b>{name}</b><small>{type}</small></div><span><CheckCircle weight="fill"/> {zh?'已连接':'Connected'}</span><button><DotsThree/></button></article>)}</div>
        <div className="social-permission-note"><ShieldCheck/><div><b>{zh?'安全授权':'Secure OAuth access'}</b><small>{zh?'员工无需查看账号密码。':'Employees never see account passwords.'}</small></div></div>
      </div>
    </section>
  </div>;
}

function TeamPage({ notify, language }) {
  const zh = language === 'zh';
  const [createMode, setCreateMode] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedShop, setSelectedShop] = useState('madrid');
  const [shops, setShops] = useState([
    {id:'madrid',name:'Casa Luma Madrid',city:'Madrid',members:[
      {id:'maya',name:'Maya Chen',email:'maya@vertens.ai',role:'Marketing manager',published:'24',leads:'61',appointments:'14',access:'Admin',accounts:[[FacebookLogo,'Casa Luma Madrid'],[InstagramLogo,'@casaluma.madrid']]},
      {id:'noah',name:'Noah Williams',email:'noah@vertens.ai',role:'Content creator',published:'18',leads:'39',appointments:'8',access:'Creator',accounts:[[TiktokLogo,'@casaluma.video']]}
    ]},
    {id:'valencia',name:'Casa Luma Valencia',city:'Valencia',members:[
      {id:'liam',name:'Liam Garcia',email:'liam@vertens.ai',role:'Sales advisor',published:'11',leads:'32',appointments:'10',access:'Creator',accounts:[[FacebookLogo,'Casa Luma Valencia']]},
      {id:'emma',name:'Emma Davis',email:'emma@vertens.ai',role:'Store owner',published:'6',leads:'18',appointments:'7',access:'Owner',accounts:[[InstagramLogo,'@casaluma.owner'],[TiktokLogo,'@emma.local']]}
    ]}
  ]);
  const activeShop = shops.find(shop => shop.id === selectedShop) || shops[0];
  const allMembers = shops.flatMap(shop => shop.members.map(member => ({...member,shopId:shop.id,shopName:shop.name})));
  const openMember = (member, shop) => setEditingUser({...member,shopId:shop.id,shopName:shop.name,accounts:[...member.accounts]});
  const saveMember = () => {
    setShops(current => current.map(shop => {
      const members = shop.members.filter(member => member.id !== editingUser.id);
      return shop.id === editingUser.shopId ? {...shop,members:[...members,{...editingUser,shopId:undefined,shopName:undefined}]} : {...shop,members};
    }));
    notify(zh?'成员资料和账号绑定已保存。':'Member details and connected accounts saved.');
    setEditingUser(null);
  };
  const createShop = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('shopName') || '').trim();
    if (!name) return;
    const id = `shop-${Date.now()}`;
    setShops(current => [...current,{id,name,city:String(data.get('city') || ''),members:[]}]);
    setSelectedShop(id); setCreateMode(null);
    notify(zh?'门店已创建。':'Shop created.');
  };
  const createMember = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shopId = String(data.get('shopId') || selectedShop);
    const name = String(data.get('name') || '').trim();
    if (!name) return;
    const email = String(data.get('email') || `${name.toLowerCase().replace(/\s+/g,'.')}@vertens.ai`);
    const member = {id:`member-${Date.now()}`,name,email,role:String(data.get('role') || 'Content creator'),published:'0',leads:'0',appointments:'0',access:String(data.get('access') || 'Creator'),accounts:[]};
    setShops(current => current.map(shop => shop.id === shopId ? {...shop,members:[...shop.members,member]} : shop));
    setSelectedShop(shopId); setCreateMode(null);
    notify(zh?'成员账号已创建，可直接登录。':'Member account created and ready to sign in.');
  };
  return <div className="page team-page">
    <PageTitle eyebrow="PRO · TEAM OPERATIONS" title={zh?'团队':'Team'} copy={zh?'按门店管理成员、登录账号、社媒绑定和获客绩效。':'Manage shops, member logins, connected social accounts and acquisition performance.'} action={<div className="team-title-actions"><button className="secondary" onClick={() => setCreateMode('shop')}><Storefront/> {zh?'新增门店':'Add shop'}</button><button className="primary" onClick={() => setCreateMode('member')}><UserPlus/> {zh?'新增成员':'Add member'}</button></div>}/>
    <div className="team-kpis"><article><span>{zh?'门店':'Shops'}</span><b>{shops.length}</b><small>{zh?'组织节点':'Organization nodes'}</small></article><article><span>{zh?'团队成员':'Team members'}</span><b>{allMembers.length}</b><small>{zh?'创建后可直接登录':'Ready to sign in'}</small></article><article><span>{zh?'有效线索':'Qualified leads'}</span><b>{allMembers.reduce((sum,member)=>sum+Number(member.leads),0)}</b><small>{zh?'按成员归因':'Attributed by member'}</small></article><article><span>{zh?'绑定账号':'Connected accounts'}</span><b>{allMembers.reduce((sum,member)=>sum+member.accounts.length,0)}</b><small>Facebook · Instagram · TikTok</small></article></div>
    <section className="team-org-shell">
      <aside className="org-tree"><header><div><span>{zh?'组织架构':'ORGANIZATION'}</span><h3>{zh?'门店':'Shops'}</h3></div><button onClick={() => setCreateMode('shop')} aria-label={zh?'新增门店':'Add shop'}><Plus/></button></header><div className="org-root"><b><Buildings/>{zh?'全部门店':'All shops'}</b><small>{shops.length} {zh?'家门店':'shops'}</small></div>{shops.map(shop => <section key={shop.id} className={selectedShop===shop.id?'active':''}><button className="org-shop" onClick={() => setSelectedShop(shop.id)}><Storefront/><span><b>{shop.name}</b><small>{shop.city}</small></span></button></section>)}</aside>
      <div className="shop-team-card"><header><div><span>{zh?'当前门店':'SELECTED SHOP'}</span><h3>{activeShop?.name}</h3><p><MapPin/>{activeShop?.city} · {activeShop?.members.length || 0} {zh?'位成员':'members'}</p></div><button className="secondary" onClick={()=>setCreateMode('member')}><UserPlus/>{zh?'新增成员':'Add member'}</button></header><div className="shop-member-head"><span>{zh?'成员':'Member'}</span><span>{zh?'绑定账号':'Connected accounts'}</span><span>{zh?'发布':'Published'}</span><span>{zh?'有效线索':'Leads'}</span><span>{zh?'权限':'Access'}</span><span></span></div>{activeShop?.members.map(member=><div className="shop-member-row" key={member.id} role="button" tabIndex="0" onClick={()=>openMember(member,activeShop)} onKeyDown={event=>event.key==='Enter'&&openMember(member,activeShop)}><span className="employee-name"><i>{member.name.split(' ').map(x=>x[0]).join('')}</i><span><b>{member.name}</b><small>{member.role} · {member.email}</small></span></span><span className="user-accounts">{member.accounts.length?member.accounts.map(([Icon,handle])=><small key={handle}><Icon/>{handle}</small>):<em>{zh?'未绑定':'Not connected'}</em>}</span><span>{member.published}</span><span><b>{member.leads}</b></span><span><em>{member.access}</em></span><span><button className="user-publish" disabled={!member.accounts.length} onClick={event=>{event.stopPropagation();notify(zh?`已选择 ${member.name} 的账号。`:`${member.name}'s account selected.`);}}><Broadcast/></button></span></div>)}</div>
    </section>
    {editingUser && <div className="user-detail-scrim" onMouseDown={() => setEditingUser(null)}><section className="user-detail-modal" onMouseDown={event => event.stopPropagation()}>
      <header><div className="user-detail-identity"><i>{editingUser.name.split(' ').map(x=>x[0]).join('')}</i><span><small>{zh?'成员详情':'MEMBER DETAILS'}</small><h3>{editingUser.name}</h3><p>{editingUser.email}</p></span></div><button aria-label="Close" onClick={() => setEditingUser(null)}><X/></button></header>
      <div className="user-detail-fields"><label>{zh?'姓名':'Name'}<input value={editingUser.name} onChange={event => setEditingUser(user => ({...user,name:event.target.value}))}/></label><label>{zh?'登录邮箱':'Login email'}<input value={editingUser.email} onChange={event => setEditingUser(user => ({...user,email:event.target.value}))}/></label><label>{zh?'角色':'Role'}<select value={editingUser.role} onChange={event => setEditingUser(user => ({...user,role:event.target.value}))}><option>Marketing manager</option><option>Content creator</option><option>Sales advisor</option><option>Store owner</option></select></label><label>{zh?'门店':'Shop'}<select value={editingUser.shopId} onChange={event => setEditingUser(user => ({...user,shopId:event.target.value}))}>{shops.map(shop=><option key={shop.id} value={shop.id}>{shop.name}</option>)}</select></label><label>{zh?'权限':'Access'}<select value={editingUser.access} onChange={event => setEditingUser(user => ({...user,access:event.target.value}))}><option>Admin</option><option>Creator</option><option>Owner</option><option>Viewer</option></select></label><label>{zh?'登录状态':'Login status'}<input value={zh?'可直接登录':'Ready to sign in'} readOnly/></label></div>
      <div className="user-account-editor"><div><span><small>{zh?'绑定账号':'CONNECTED ACCOUNTS'}</small><h4>{zh?'编辑该成员的发布账号':'Manage publishing accounts'}</h4></span><b>{editingUser.accounts.length}</b></div><div className="user-account-list">{editingUser.accounts.map(([Icon,handle],index)=><article key={`${handle}-${index}`}><i><Icon/></i><span><b>{handle}</b><small>{zh?'已授权发布':'Publishing connected'}</small></span><button onClick={() => setEditingUser(user => ({...user,accounts:user.accounts.filter((_,itemIndex) => itemIndex !== index)}))}>{zh?'解绑':'Remove'}</button></article>)}</div><div className="bind-account-actions"><span>{zh?'绑定新账号':'Bind another account'}</span><button onClick={() => setEditingUser(user => ({...user,accounts:[...user.accounts,[FacebookLogo,'New Facebook Page']]}))}><FacebookLogo/>Facebook</button><button onClick={() => setEditingUser(user => ({...user,accounts:[...user.accounts,[InstagramLogo,'@new.instagram']]}))}><InstagramLogo/>Instagram</button><button onClick={() => setEditingUser(user => ({...user,accounts:[...user.accounts,[TiktokLogo,'@new.tiktok']]}))}><TiktokLogo/>TikTok</button></div></div>
      <footer><button className="secondary" onClick={() => setEditingUser(null)}>{zh?'取消':'Cancel'}</button><button className="primary" onClick={saveMember}>{zh?'保存修改':'Save changes'}</button></footer>
    </section></div>}
    {createMode && <div className="brand-modal-backdrop" onMouseDown={() => setCreateMode(null)}><form className="brand-modal team-create-modal" onMouseDown={event => event.stopPropagation()} onSubmit={createMode==='shop'?createShop:createMember}><div><span>PRO · TEAM</span><h3>{createMode==='shop'?(zh?'新增门店':'Add a shop'):(zh?'新增成员':'Add a member')}</h3><button type="button" onClick={() => setCreateMode(null)}><X/></button></div>{createMode==='shop'?<><label>{zh?'门店名称':'Shop name'}<input name="shopName" required placeholder={zh?'例如：广州天河店':'e.g. Downtown showroom'}/></label><label>{zh?'城市 / 区域':'City / market'}<input name="city" required placeholder={zh?'广州':'Madrid'}/></label><div className="shop-billing-note"><Storefront/><span><b>{zh?'当前套餐含 1 家门店':'Your plan includes 1 shop'}</b><small>{zh?'新增门店 $39/月，或 $234/年。':'Additional shop: $39/month or $234/year.'}</small></span></div></>:<><label>{zh?'姓名':'Name'}<input name="name" required placeholder="Alex Morgan"/></label><label>{zh?'登录邮箱':'Login email'}<input name="email" type="email" required placeholder="alex@vertens.ai"/></label><label>{zh?'角色':'Role'}<select name="role" defaultValue="Content creator"><option>Content creator</option><option>Marketing manager</option><option>Sales advisor</option><option>Store owner</option></select></label><label>{zh?'所属门店':'Shop'}<select name="shopId" defaultValue={selectedShop}>{shops.map(shop=><option key={shop.id} value={shop.id}>{shop.name}</option>)}</select></label><label>{zh?'权限':'Access'}<select name="access" defaultValue="Creator"><option>Creator</option><option>Admin</option><option>Owner</option><option>Viewer</option></select></label><div className="login-ready-note"><CheckCircle weight="fill"/><span><b>{zh?'创建后可直接登录':'Ready to sign in after creation'}</b><small>{zh?'系统直接创建账号，不发送邀请。':'The account is created immediately. No invitation step.'}</small></span></div></>}<footer><button type="button" onClick={() => setCreateMode(null)}>{zh?'取消':'Cancel'}</button><button className="primary" type="submit">{createMode==='shop'?(zh?'新增门店 · $39/月':'Add shop · $39/mo'):(zh?'创建成员账号':'Create member account')}</button></footer></form></div>}
  </div>;
}

function LeadsPage({ notify, tier, setPage, language }) {
  const zh = language === 'zh';
  const isPro = tier === 'pro';
  const leads = [
    ['Carla Ruiz','WhatsApp','Material comparison','Maya Chen','Visit booked','Today · 10:42'],
    ['Mateo Santos','TikTok form','Before & after reveal','Liam Garcia','Qualified','Today · 09:18'],
    ['Sofia Martin','Facebook message','Weekend showroom product','Noah Williams','New','Yesterday · 18:07'],
    ['Daniel Vega','QR code','Owner expert video','Emma Davis','Visited','Yesterday · 16:32']
  ];
  return <div className={`page leads-page ${isPro?'pro-attribution':'lite-attribution'}`}><PageTitle eyebrow={isPro?'PRO · FULL ATTRIBUTION':'LITE · ATTRIBUTION PREVIEW'} title={zh?'线索':'Leads'} copy={isPro?(zh?'把每次咨询连接到具体内容、账号、门店和员工。':'Connect every customer conversation to the content, account, shop and employee that created it.'):(zh?'先看清线索总量；升级 Pro 后解锁内容与员工级归因。':'Track total lead volume now. Upgrade to Pro for content and employee attribution.')} action={<button className="primary" onClick={() => notify(zh?'已打开线索来源连接。':'Lead source connection opened.')}><Plus/> {zh?'连接线索来源':'Connect lead source'}</button>}/>
    <div className="lead-funnel">{[['Reach','186K'],['Profile visits','4,820'],['Conversations','426'],['Qualified','184'],['Visits booked','37'],['Sales','12']].map((item,index)=><article key={item[0]}><span>{index+1}</span><div><b>{item[1]}</b><small>{item[0]}</small></div>{index<5&&<ArrowRight/>}</article>)}</div>
    {!isPro&&<section className="attribution-upgrade"><Lock weight="fill"/><div><span>{zh?'PRO 完整归因':'PRO FULL ATTRIBUTION'}</span><h3>{zh?'看清哪条内容、哪个员工带来了客户':'See which content and employee generated each customer'}</h3><p>{zh?'Lite 保留总量漏斗；内容、员工和账号效率在 Pro 中解锁。':'Lite keeps the total funnel visible. Content, employee and account efficiency unlock in Pro.'}</p></div><button className="primary" onClick={()=>setPage('plan')}>{zh?'升级 Pro':'Upgrade to Pro'}<ArrowRight/></button></section>}
    <section className="lead-table"><header><div><h3>{zh?'归因会话':'Attributed conversations'}</h3><p>UTM · WhatsApp · Forms · QR · CRM</p></div><button><Funnel/> {zh?'筛选':'Filter'}</button></header><div className="lead-row lead-header"><span>{zh?'客户':'Customer'}</span><span>{zh?'来源':'Source'}</span><span>{zh?'内容':'Content'} {!isPro&&<Lock/>}</span><span>{zh?'员工':'Employee'} {!isPro&&<Lock/>}</span><span>{zh?'状态':'Status'}</span><span>{zh?'时间':'Received'}</span></div>{leads.map(row=><div className="lead-row" key={row[0]}>{row.map((cell,index)=><span key={cell} className={`${index===4?cell.toLowerCase().replace(' ','-'):''} ${!isPro&&(index===2||index===3)?'masked-attribution':''}`}>{index===0?<b>{cell}</b>:(!isPro&&(index===2||index===3)?'••••••':cell)}</span>)}</div>)}</section>
    {isPro&&<div className="attribution-note"><Database/><div><b>{zh?'归因可信度：86%':'Attribution confidence: 86%'}</b><small>{zh?'直接链接与表单 ID 为确定性归因；浏览后转化与线下成交在连接 CRM 前为模型推断。':'Direct links and form IDs are deterministic. View-through and offline sales remain modeled until CRM matching is connected.'}</small></div><button>{zh?'检查数据质量':'Review data quality'}</button></div>}
  </div>;
}

function MyBrandPage({ product, notify, language, tier, setPage, importRequest, onImportRequestHandled }) {
  const zh = language === 'zh';
  const hasMarketingCalendar = tierOrder[tier] >= tierOrder.pro;
  const [activeTab, setActiveTab] = useState('overview');
  const [editOpen, setEditOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [socialUrl, setSocialUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [importedSource, setImportedSource] = useState(null);
  const [brandInfo, setBrandInfo] = useState({ name:'Luma Local', market:'Downtown, USA', languages:'English, Spanish', category:'Local home & lifestyle' });
  useEffect(() => {
    if (!importRequest) return;
    setSocialUrl(importRequest.url || '');
    setImportedSource(null);
    setImportOpen(true);
    onImportRequestHandled?.();
  }, [importRequest]);
  const importSocialProfile = () => {
    if (!socialUrl.trim()) return notify(zh?'请粘贴 Facebook、Instagram 或 TikTok 主页链接。':'Paste a Facebook, Instagram or TikTok profile URL.');
    setImporting(true);
    setTimeout(() => {
      const source = socialUrl.toLowerCase().includes('tiktok') ? 'TikTok' : socialUrl.toLowerCase().includes('instagram') ? 'Instagram' : 'Facebook';
      setBrandInfo({ name:'Casa Luma Interiors', market:'Madrid, Spain', languages:'Spanish, English', category:'Home renovation showroom' });
      setImportedSource(source);
      setImporting(false);
      notify(zh?`${source} 主页分析完成，请检查品牌资料。`:`${source} profile analyzed. Brand fields are ready to review.`);
    }, 850);
  };
  const tabs = [
    ['overview',zh?'概览':'Overview'], ['products',zh?'产品':'Products'], ['avatars',zh?'数字人':'Avatars'],
    ['voices',zh?'声音':'Voices'], ['assets',zh?'素材库':'Asset Library'], ['kit',zh?'品牌规范':'Brand Kit']
  ];
  const brandProducts = [
    product || {name:zh?'周末主推产品':'Weekend Signature Product',category:zh?'季节促销':'Seasonal promotion',image:images.kitchen},
    {name:zh?'新客体验':'New Customer Trial',category:zh?'预约产品':'Booking product',image:images.patio},
    {name:zh?'高端服务套餐':'Premium Service Package',category:zh?'服务组合':'Service bundle',image:images.bath}
  ];
  const brandActors = actors.slice(0, 6);
  const actorRoleZh = {'Local business host':'本地商家主持人','Beauty & wellness advisor':'美业顾问','Restaurant owner':'餐厅老板','Retail presenter':'零售讲解员','Business owner':'企业老板','Lifestyle creator':'生活方式创作者'};
  const localizeLanguages = value => zh ? value.replace('English','英语').replace('Spanish','西班牙语').replace('French','法语').replace('Portuguese','葡萄牙语').replace('German','德语').replace('Italian','意大利语') : value;
  const brandVoices = [
    [zh?'Luma 老板 · 英语':'Luma Owner · English',zh?'温暖、务实、自信':'Warm, practical and confident',zh?'美式英语':'US English'],
    [zh?'Luma 老板 · 西班牙语':'Luma Owner · Spanish',zh?'清晰的本地咨询表达':'Clear local consultation',zh?'拉美西班牙语':'Latin American Spanish'],
    [zh?'Sofia · 英语':'Sofia · English',zh?'友好的服务讲解':'Friendly service educator',zh?'美式英语':'US English'],
    [zh?'Daniel · 葡萄牙语':'Daniel · Portuguese',zh?'经验丰富的本地商家主持人':'Experienced local business host',zh?'巴西葡萄牙语':'Brazilian Portuguese']
  ];
  const brandAssets = [
    [images.kitchen,zh?'周末主推产品主图':'Weekend product hero',zh?'营销图片':'Campaign image'],
    [images.presenter,zh?'老板介绍实拍素材':'Owner introduction footage',zh?'原始视频':'Source video'],
    [images.patio,zh?'客户体验证明':'Customer experience proof',zh?'产品图片':'Product image'],
    [images.bath,zh?'高端服务细节':'Premium service detail',zh?'营销图片':'Campaign image'],
    [images.avatar,zh?'生活方式数字人':'Lifestyle presenter',zh?'数字人参考':'Avatar reference'],
    [images.sofia,zh?'Sofia UGC 数字人':'Sofia UGC presenter',zh?'数字人参考':'Avatar reference']
  ];
  const stats = [
    ['products','3',zh?'产品':'Products',Package], ['avatars','6',zh?'数字人':'Avatars',UserCircle],
    ['voices','4',zh?'声音':'Voices',Microphone], ['assets','18',zh?'素材':'Assets',ImageIcon],
    ['kit',zh?'已设置':'Ready',zh?'品牌规范':'Brand Kit',MagicWand]
  ];
  const openAdd = label => notify(zh?`${label}流程已打开。`:`${label} workflow opened.`);

  const sectionHead = (title, copy, actionLabel) => <div className="brand-section-head"><div><h3>{title}</h3><p>{copy}</p></div>{actionLabel && <button onClick={() => openAdd(actionLabel)}><Plus/> {actionLabel}</button>}</div>;
  const productGrid = <div className="my-brand-product-grid">{brandProducts.map(item => <article key={item.name}><img src={item.image}/><div><span>{item.category}</span><b>{item.name}</b><button aria-label={zh?'选择产品':'Select product'} onClick={() => notify(zh?`已选择 ${item.name}。`:`${item.name} selected.`)}><ArrowRight/></button></div></article>)}</div>;
  const avatarGrid = <div className="my-brand-avatar-grid"><button className="owner-clone-card" onClick={() => openAdd(zh?'克隆老板本人':'Clone store owner')}><div><Users/><span><b>{zh?'克隆老板本人':'Clone the store owner'}</b><small>{zh?'经本人授权，为不同市场创建可复用的数字分身。':'Create a consent-based presenter for every market.'}</small></span></div><ArrowRight/></button>{brandActors.map(([name,role,languages,image]) => <article key={name}><img src={image}/><div><b>{name}</b><small>{zh?(actorRoleZh[role]||role):role}</small><span>{localizeLanguages(languages)}</span></div></article>)}</div>;
  const voiceList = <div className="my-brand-voice-list">{brandVoices.map(([name,copy,voiceLanguage]) => <article key={name}><button className="voice-play" aria-label={zh?'播放声音样本':'Play voice sample'} onClick={() => notify(zh?`正在播放 ${name} 的声音样本。`:`Playing ${name} sample.`)}><Play weight="fill"/></button><div><b>{name}</b><small>{copy}</small></div><span>{voiceLanguage}</span><button onClick={() => notify(zh?`${name} 已设为默认声音。`:`${name} is now the default voice.`)}>{zh?'使用声音':'Use voice'}</button></article>)}</div>;
  const assetGrid = <div className="my-brand-asset-grid"><button className="brand-upload" onClick={() => openAdd(zh?'上传品牌素材':'Upload assets')}><UploadSimple/><b>{zh?'上传品牌素材':'Upload brand assets'}</b><small>{zh?'图片、视频、Logo 或文档':'Images, video, logos or documents'}</small></button>{brandAssets.map(([image,name,type]) => <article key={name}><img src={image}/><div><b>{name}</b><small>{type}</small></div></article>)}</div>;

  return <div className="page my-brand-page">
    <PageTitle eyebrow={zh?'品牌中心':'WORKSPACE'} title={zh?'我的品牌':'My Brand'} copy={zh?'让每条广告都使用同一套品牌资料。':'The source of truth behind every VertensAI creative.'} action={<button className="primary" onClick={() => {setImportOpen(true);setImportedSource(null);}}><LinkSimple/>{zh?'导入社媒主页':'Import social profile'}</button>}/>
    <section className="brand-space-card">
      <div className="brand-space-avatar">LL</div>
      <div className="brand-space-copy"><span>{zh?'品牌工作区':'BRAND WORKSPACE'}</span><h2>{zh?`${brandInfo.name} 品牌空间`:`${brandInfo.name} Brand Space`}</h2><p><Users/> {zh?'3 位团队成员':'3 team members'} <i></i><MapPin/> {brandInfo.market} <i></i><Globe/> {brandInfo.languages}</p></div>
      <button className="brand-edit" onClick={() => setEditOpen(true)}><FileText/> {zh?'编辑品牌资料':'Edit brand info'}</button>
    </section>

    <div className="brand-stats">{stats.map(([id,value,label,Icon]) => <button key={id} onClick={() => setActiveTab(id)} className={activeTab === id ? 'active' : ''}><Icon/><span><b>{value}</b><small>{label}</small></span><ArrowRight/></button>)}</div>

    <nav className="brand-tabs" aria-label={zh?'品牌工作区分类':'Brand workspace sections'}>{tabs.map(([id,label]) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>{label}</button>)}</nav>

    <section className="brand-tab-content">
      {activeTab === 'overview' && <>
        {sectionHead(zh?'产品与服务':'Products & services',zh?'供所有 VertensAI 创作流程调用的产品、服务和促销信息。':'Products, services and promotions available to every VertensAI workflow.',zh?'添加产品':'Add product')}
        {productGrid}
        <div className="brand-overview-split">
          <section>{sectionHead(zh?'品牌规范':'Brand Kit',zh?'VertensAI 用这些规则确保所有广告风格一致。':'The rules VertensAI uses to keep every creative consistent.')}
            <div className="brand-kit-summary"><div><Storefront/><span><b>{zh?'可信赖的本地商家定位':'Trusted local business positioning'}</b><small>{zh?'专业清晰、预约方便，并快速响应 WhatsApp 咨询。':'Clear expertise, convenient booking and fast WhatsApp response.'}</small></span></div><div className="brand-colors"><i></i><i></i><i></i><span>{zh?'3 个品牌色':'3 brand colors'}</span></div><button onClick={() => setActiveTab('kit')}>{zh?'打开品牌规范':'Open Brand Kit'} <ArrowRight/></button></div>
          </section>
          <section>{sectionHead(zh?'数字人与声音':'Presenters & voices',zh?'经过批准、可代表品牌出镜的人物和声音。':'The people and voices approved to represent the brand.')}
            <div className="brand-people-summary"><div className="people-stack">{brandActors.slice(0,3).map(actor => <img key={actor[0]} src={actor[3]}/>)}</div><div><b>{zh?'6 个已批准数字人':'6 approved avatars'}</b><small>{zh?'包含老板本人克隆流程':'Including an owner-clone workflow'}</small></div><button onClick={() => setActiveTab('avatars')}>{zh?'管理':'Manage'} <ArrowRight/></button></div>
            <div className="brand-people-summary"><div className="voice-summary-icon"><Microphone/></div><div><b>{zh?'4 个已批准声音':'4 approved voices'}</b><small>{zh?'英语、西班牙语和葡萄牙语':'English, Spanish and Portuguese'}</small></div><button onClick={() => setActiveTab('voices')}>{zh?'管理':'Manage'} <ArrowRight/></button></div>
          </section>
        </div>
      </>}
      {activeTab === 'products' && <>{sectionHead(zh?'产品与服务':'Products & services',zh?'导入产品、服务、促销和效果证明，让广告生成更准确。':'Import products, services, promotions and proof points for accurate creative.',zh?'添加产品':'Add product')}{productGrid}</>}
      {activeTab === 'avatars' && <>{sectionHead(zh?'数字人':'Avatars',zh?'已批准的 AI 角色和老板本人数字分身。':'Approved AI actors and the store-owner digital twin.',zh?'添加数字人':'Add avatar')}{avatarGrid}</>}
      {activeTab === 'voices' && <>{sectionHead(zh?'声音':'Voices',zh?'已批准的声音、语言和品牌表达方式。':'Approved voices, languages and brand delivery styles.',zh?'添加声音':'Add voice')}{voiceList}</>}
      {activeTab === 'assets' && <>{sectionHead(zh?'素材库':'Asset Library',zh?'可重复使用的产品图片、实拍视频、Logo 和营销文件。':'Reusable product photography, footage, logos and campaign files.')}{assetGrid}</>}
      {activeTab === 'kit' && <>
        {sectionHead(zh?'品牌规范':'Brand Kit',zh?'定义所有生成广告遵循的视觉和语言体系。':'Define the visual and verbal system behind every generated ad.',zh?'编辑品牌规范':'Edit Brand Kit')}
        <div className="brand-kit-grid">
          <article><span>{zh?'LOGO 标识':'LOGO'}</span><div className="brand-logo-preview"><div className="brand-space-avatar">LL</div><b>Luma Local</b></div><button onClick={() => openAdd(zh?'上传 Logo':'Upload logo')}>{zh?'替换 Logo':'Replace logo'}</button></article>
          <article><span>{zh?'品牌色':'COLORS'}</span><div className="brand-palette"><i>#1769FF</i><i>#101114</i><i>#F4F6F8</i></div><button onClick={() => openAdd(zh?'编辑颜色':'Edit colors')}>{zh?'编辑颜色':'Edit colors'}</button></article>
          <article><span>{zh?'字体':'TYPOGRAPHY'}</span><div className="brand-type-preview"><b>Inter Bold</b><small>Inter Regular · Aa Bb Cc 123</small></div><button onClick={() => openAdd(zh?'编辑字体':'Edit typography')}>{zh?'编辑字体':'Edit typography'}</button></article>
          <article><span>{zh?'品牌语气':'BRAND VOICE'}</span><div className="brand-tone-tags"><b>{zh?'清晰':'Clear'}</b><b>{zh?'务实':'Practical'}</b><b>{zh?'可信赖':'Trustworthy'}</b><b>{zh?'本地专家':'Local expert'}</b></div><button onClick={() => openAdd(zh?'编辑品牌语气':'Edit brand voice')}>{zh?'编辑语气':'Edit voice'}</button></article>
        </div>
      </>}
    </section>

    {importOpen && <div className="brand-import-scrim" onMouseDown={() => setImportOpen(false)}><section className="brand-import-modal" onMouseDown={event => event.stopPropagation()}>
      <header><div><span>{zh?'社媒主页导入':'SOCIAL PROFILE IMPORT'}</span><h3>{hasMarketingCalendar ? (zh?'导入品牌，同时生成首月营销日历。':'Import your brand. Get your first month planned.') : (zh?'导入品牌，建立统一的内容基础。':'Import your brand. Build your creative foundation.')}</h3></div><button aria-label={zh?'关闭':'Close'} onClick={() => setImportOpen(false)}><X/></button></header>
      {!importedSource ? <>
        <div className="supported-socials"><FacebookLogo/><InstagramLogo/><TiktokLogo/><span>{zh?'企业主页':'Business profiles'}</span></div>
        <label className="brand-profile-url"><LinkSimple/><input value={socialUrl} onChange={event => setSocialUrl(event.target.value)} onKeyDown={event => event.key === 'Enter' && importSocialProfile()} placeholder={zh?'粘贴 Facebook、Instagram 或 TikTok 主页链接':'Paste a Facebook, Instagram or TikTok profile URL'}/><button disabled={importing || !socialUrl.trim()} onClick={importSocialProfile}>{importing?<SpinnerGap className="spin"/>:<MagicWand/>}{zh?'导入':'Import'}</button></label>
        <div className="brand-import-steps">{[[LinkSimple,zh?'读取主页':'Read profile'],[Buildings,zh?'填写品牌资料':'Fill My Brand'],[hasMarketingCalendar?CalendarBlank:Lock,hasMarketingCalendar?(zh?'生成营销日历':'Create calendar'):(zh?'Pro 解锁日历':'Calendar in Pro')]].map(([Icon,label],index)=><div key={label}><i>{index+1}</i><Icon/><b>{label}</b>{index<2&&<ArrowRight/>}</div>)}</div>
        <small className="import-safety">{zh?'原型不会要求社媒账号密码。':'Prototype preview: no social login or password is requested.'}</small>
      </> : <>
        <div className="import-success"><CheckCircle weight="fill"/><div><b>{importedSource} {zh?'主页已解析':'profile analyzed'}</b><small>{zh?'已找到 14 条内容、3 个主推服务和一致的品牌语气。':'14 posts, 3 products and a consistent brand voice found.'}</small></div></div>
        <div className="brand-import-review"><div><label>{zh?'品牌名称':'Brand name'}<input value={brandInfo.name} onChange={event=>setBrandInfo({...brandInfo,name:event.target.value})}/></label><label>{zh?'市场':'Market'}<input value={brandInfo.market} onChange={event=>setBrandInfo({...brandInfo,market:event.target.value})}/></label><label>{zh?'行业':'Category'}<input value={brandInfo.category} onChange={event=>setBrandInfo({...brandInfo,category:event.target.value})}/></label><label>{zh?'语言':'Languages'}<input value={brandInfo.languages} onChange={event=>setBrandInfo({...brandInfo,languages:event.target.value})}/></label></div><aside><span>{hasMarketingCalendar?(zh?'首月内容预览':'FIRST MONTH'):(zh?'PRO 功能':'PRO FEATURE')}</span>{hasMarketingCalendar?(zh?['老板讲主推','材料对比','客户案例','到店行动']:['Owner-led product','Product proof','Customer story','Visit CTA']).map((item,index)=><article key={item}><i>{index+1}</i><div><b>{zh?`第 ${index+1} 周`: `Week ${index+1}`}</b><small>{item}</small></div><CheckCircle weight="fill"/></article>):<article><i><Lock/></i><div><b>{zh?'30 天营销日历':'30-day marketing calendar'}</b><small>{zh?'升级 Pro 后，根据品牌资料自动生成。':'Upgrade to Pro to generate it from this brand profile.'}</small></div></article>}</aside></div>
        <footer><button className="secondary" onClick={() => setImportedSource(null)}>{zh?'返回':'Back'}</button><button className="primary" onClick={() => {setImportOpen(false);if(hasMarketingCalendar){notify(zh?'品牌资料和首月营销日历已生成。':'My Brand and the first marketing calendar are ready.');setPage('calendar');}else{notify(zh?'品牌资料已保存。营销日历可在 Pro 版本使用。':'Brand profile saved. Marketing Calendar is available in Pro.');}}}>{hasMarketingCalendar?<CalendarCheck/>:<CheckCircle/>}{hasMarketingCalendar?(zh?'保存并打开日历':'Save & open calendar'):(zh?'保存品牌资料':'Save My Brand')}</button></footer>
      </>}
    </section></div>}

    {editOpen && <div className="brand-modal-backdrop" onMouseDown={() => setEditOpen(false)}><form className="brand-modal" onMouseDown={event => event.stopPropagation()} onSubmit={event => {event.preventDefault();setEditOpen(false);notify(zh?'品牌资料已保存。':'Brand information saved.');}}><div><span>{zh?'我的品牌':'MY BRAND'}</span><h3>{zh?'编辑品牌资料':'Edit brand information'}</h3><button type="button" aria-label={zh?'关闭':'Close'} onClick={() => setEditOpen(false)}><X/></button></div><label>{zh?'品牌名称':'Brand name'}<input value={brandInfo.name} onChange={event => setBrandInfo({...brandInfo,name:event.target.value})}/></label><label>{zh?'主要市场':'Primary market'}<input value={brandInfo.market} onChange={event => setBrandInfo({...brandInfo,market:event.target.value})}/></label><label>{zh?'使用语言':'Languages'}<input value={brandInfo.languages} onChange={event => setBrandInfo({...brandInfo,languages:event.target.value})}/></label><label>{zh?'业务类型':'Business category'}<input value={brandInfo.category} onChange={event => setBrandInfo({...brandInfo,category:event.target.value})}/></label><label>{zh?'主要转化目标':'Primary conversion goal'}<input defaultValue={zh?'引导到店或通过 WhatsApp 预约':'Book a visit or appointment on WhatsApp'}/></label><footer><button type="button" onClick={() => setEditOpen(false)}>{zh?'取消':'Cancel'}</button><button className="primary" type="submit">{zh?'保存品牌资料':'Save brand'}</button></footer></form></div>}
  </div>;
}

function AssetsPage({ product, setPage, setPublishAsset, language, notify }) {
  const zh = language === 'zh';
  const [query, setQuery] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadSelected, setUploadSelected] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('draft');
  const [filterOpen, setFilterOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [previewAsset, setPreviewAsset] = useState(null);
  const assets = [
    ...(product ? [{id:'imported',name:product.name,type:zh?'已导入优惠':'Imported product',image:product.image}] : []),
    ...(uploaded ? [{id:'uploaded',name:'Owner-ad-footage.mp4',type:uploadStatus === 'ready' ? 'Ready · Local' : 'Draft · Local',image:images.presenter}] : []),
    ...publishingAssets
  ].filter(asset => asset.name.toLowerCase().includes(query.toLowerCase()));
  const publish = asset => { setPublishAsset(asset); setPage('publishing'); };
  const completeUpload = () => { if (!uploadSelected) return; setUploaded(true); setUploadOpen(false); setUploadSelected(false); notify(zh?'素材上传成功。':'Asset uploaded successfully.'); };
  return <div className="page assets-page creatives-page">
    <div className="creatives-heading"><h2>{zh?'创意素材':'Creatives'}</h2><small>{zh?'生成和上传的内容都会保存在这里。':'Everything you generate or upload, ready to reuse.'}</small></div>
    <div className="creatives-toolbar"><label><MagnifyingGlass/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={zh?'按名称、标签或描述搜索…':'Search by name, tag, or description…'}/></label><button onClick={()=>{setUploadOpen(true);setUploadSelected(false);}}><UploadSimple/>{zh?'上传':'Upload'}</button><div className="asset-filter-wrap"><button className={filterOpen?'active':''} onClick={()=>setFilterOpen(!filterOpen)}><Funnel/>{zh?'筛选':'Filter'}</button>{filterOpen&&<div className="asset-filter-popover">
      <header><b>{zh?'筛选':'Filter'}</b><button onClick={()=>setFilterOpen(false)}>{zh?'清除':'Clear all'}</button></header>
      {[[zh?'素材来源':'Asset Source',['All','AI Generated','Local']],[zh?'类型':'Type',['Image','Video']],[zh?'画面比例':'Aspect Ratio',['9:16','1:1','4:5','16:9','Other']],[zh?'状态':'Status',['Draft','Ready']],[zh?'发布日期':'Published Date',['Today','Last 7 Days','Last 30 Days']]].map(([label,items])=><section key={label}><b>{label}</b><div>{items.map(item=><button key={item}>{item}</button>)}</div></section>)}
      <div className="filter-dates"><input type="date"/><input type="date"/></div>
    </div>}</div></div>
    <div className="creatives-tabs"><button className="active">{zh?'全部':'All'}</button><button aria-label="Tag management" onClick={()=>setTagOpen(true)}><MagicWand/></button></div>
    <div className="creative-asset-grid">{assets.map((asset,index)=><article role="button" tabIndex="0" key={asset.id} onClick={()=>setPreviewAsset(asset)} onKeyDown={event=>event.key==='Enter'&&setPreviewAsset(asset)}><div><img src={asset.image}/><button className="creative-play" onClick={event=>{event.stopPropagation();setPreviewAsset(asset);}}><Play weight="fill"/></button><span>9:16</span><button className="asset-menu" onClick={event=>event.stopPropagation()}><DotsThree/></button></div><footer><div><span className={index===0?'ready':'draft'}>{index===0?'Ready':'Draft'}</span><b>{asset.name}</b><small>{asset.type} · 2026-08-21</small></div><button onClick={event=>{event.stopPropagation();publish(asset);}}><Broadcast/>{zh?'发布':'Publish'}</button></footer></article>)}</div>
    <div className="creatives-pagination"><span>{zh?'每页':'Per page'}</span><select defaultValue="30"><option>30</option><option>60</option></select><button disabled><CaretDown/></button><b>1</b><button><ArrowRight/></button></div>

    {uploadOpen&&<div className="asset-upload-scrim" onMouseDown={()=>setUploadOpen(false)}><section className="asset-upload-modal" onMouseDown={event=>event.stopPropagation()}><header><h3>{zh?'上传素材':'Upload Assets'}</h3><button onClick={()=>setUploadOpen(false)}><X/></button></header><button className="asset-dropzone" onClick={()=>setUploadSelected(true)}><UploadSimple/><b>{zh?'点击上传或拖放文件':'Click to upload or drag and drop files'}</b><small>JPG, PNG, MP4, MOV, AVI · {zh?'单个文件不超过 1GB':'Single file ≤ 1GB'} · {zh?'自动去重':'Automatic duplicate removal'}</small><span>{zh?'也可以选择文件夹上传':'Or select a folder to upload'}</span></button>
      {uploadSelected&&<div className="upload-file-preview"><img src={images.presenter}/><span>{uploadStatus==='ready'?'Ready':'Draft'}</span><b>Owner-ad-footage.mp4</b><small>4.9 MB</small><button onClick={()=>setUploadSelected(false)}><X/></button></div>}
      <div className="upload-settings"><h4>{zh?'上传设置':'Upload Settings'}</h4><label>{zh?'素材状态':'Asset Status'}</label><div><button className={uploadStatus==='draft'?'active':''} onClick={()=>setUploadStatus('draft')}>Draft</button><button className={uploadStatus==='ready'?'active':''} onClick={()=>setUploadStatus('ready')}>Ready</button></div><label>{zh?'添加标签':'Add Tag'}</label><button className="add-tag"><Plus/>{zh?'添加标签':'Add Tag'}</button></div>
      <footer><button className="secondary" onClick={()=>setUploadOpen(false)}>{zh?'取消':'Cancel'}</button><button className="primary" disabled={!uploadSelected} onClick={completeUpload}>{zh?'开始上传':'Start Upload'}</button></footer></section></div>}

    {tagOpen&&<div className="tag-drawer-scrim" onMouseDown={()=>setTagOpen(false)}><aside className="tag-drawer" onMouseDown={event=>event.stopPropagation()}><header><h3>{zh?'标签管理':'Tag Management'}</h3><button onClick={()=>setTagOpen(false)}><X/></button></header><label><MagnifyingGlass/><input placeholder={zh?'搜索标签…':'Search tags…'}/></label><div className="tag-sort"><button className="active">{zh?'按数量':'By Count'}</button><button>{zh?'按名称':'By Name'}</button></div><section>{['Owner-led','Real footage','Restaurant','Weekend product'].map((tag,index)=><button key={tag}><span>{tag}</span><b>{12-index*2}</b></button>)}</section><footer><input placeholder={zh?'新标签名称…':'New tag name…'}/><button>{zh?'创建':'Create'}</button></footer></aside></div>}
    {previewAsset&&<div className="asset-preview-scrim" onMouseDown={()=>setPreviewAsset(null)}><section className="asset-preview-modal" onMouseDown={event=>event.stopPropagation()}><header><div><span>{zh?'素材预览':'ASSET PREVIEW'}</span><h3>{previewAsset.name}</h3></div><button onClick={()=>setPreviewAsset(null)}><X/></button></header><div className="asset-preview-stage"><img src={previewAsset.image}/><button><Play weight="fill"/></button><span>9:16 · {previewAsset.type}</span></div><footer><button className="secondary" onClick={()=>setPreviewAsset(null)}>{zh?'关闭':'Close'}</button><button className="primary" onClick={()=>publish(previewAsset)}><Broadcast/>{zh?'发布此素材':'Publish asset'}</button></footer></section></div>}
  </div>;
}

function SimplePage({ page, product, setPage, language, setActiveProject }) {
  const zh = language === 'zh';
  const config = {
    projects:[zh?'项目':'Projects',zh?'所有内容和工作流。':'All content and workflows.']
  }[page];
  return <div className="page simple-page"><PageTitle title={config[0]} copy={config[1]} action={<button className="primary"><Plus/> {zh?'新建项目':'New project'}</button>}/>
    {page === 'projects' && <div className="project-grid">{projectCatalog.map(project => <article role="button" tabIndex="0" key={project.id} onClick={()=>{setActiveProject?.(project);setPage('agent');}} onKeyDown={event=>{if(event.key==='Enter'){setActiveProject?.(project);setPage('agent');}}}><img src={project.image}/><div><b>{project.name}</b><small>{project.type} · {project.location}</small></div><ArrowRight/></article>)}</div>}
  </div>;
}

function InspirationHome({ onDesign }) {
  const cards = [
    ['TCV三箱洗衣机静享','三箱洗衣机，实现衣物分区分类洗护，静音运行不扰。',images.bath],
    ['保利天汇品质大盘宣传','生态大盘景观位，天河上车门槛首选。',images.patio],
    ['Vertens品牌楼盘探店主播','地产探店女主播介绍楼盘，情绪饱满吐词清晰。',images.sofia],
    ['虫子姐探店三维川菜','真人在餐厅招牌前讲解，身临其境感官信任更强。',images.presenter],
    ['TVC橙汁冰爽特写','透亮发光的饮料产品镜头，橙色冰块扑面而来。',images.kitchen],
    ['人物三视图','人物三视图_示例',images.avatar],
    ['复古棕色皮艺沙发','复古棕色皮艺沙发，让每一次落座都温柔舒适。',images.kitchen],
    ['椅子商业广告','以北欧极简实木餐椅为主角，通过木材细节建立信任。',images.bath],
    ['椅子商业广告','单品广告',images.patio],
    ['意式轻奢拉链单人可旋转沙发椅','意式轻奢拉链单人可旋转沙发椅',images.kitchen],
    ['欧式扶手椅宣传视频','家具广告',images.bath],
    ['轻奢真皮意式电动多功能沙发','本片以回家、身体终于可以放松为核心创意。',images.kitchen],
    ['深夜便利店','用一个夜晚，讲清楚门店的温暖与便利。',images.presenter],
    ['好眠神器','中式轻奢软装，用舒适细节打动每一位客户。',images.patio],
    ['坐见不凡','质感家具展示',images.bath],
    ['一室尽享松弛','卧室家居广告',images.kitchen]
  ];
  const [active, setActive] = useState('全部');
  const [query, setQuery] = useState('');
  const visible = cards.filter(card => card[0].includes(query) || !query);
  return <div className="inspiration-app">
    <aside className="inspiration-side">
      <button className="inspiration-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><i>✦</i><b>Vertens</b></button>
      <button className="inspiration-new"><Plus weight="bold"/>新建项目</button>
      <nav className="inspiration-nav">
        <button className="active"><Sparkle weight="fill"/>灵感广场</button>
        <button onClick={()=>window.location.hash='projects'}><FolderSimple/>项目</button>
        <button><BookOpen/>Skills</button>
        <button><Package/>资产</button>
      </nav>
      <button className="inspiration-design" onClick={onDesign}><VideoCamera weight="fill"/>帮我设计 <ArrowRight weight="bold"/></button>
      <span className="inspiration-recent">最近项目</span>
      <button className="inspiration-recent-card"><img src={images.kitchen}/><b>自由画布 2</b></button>
      <button className="inspiration-recent-card"><i><MagicWand/></i><b>自由画布 1</b></button>
    </aside>
    <main className="inspiration-main">
      <header className="inspiration-top"><div className="inspiration-credit">✦ 19,997.50 <span>充值</span></div><button className="inspiration-user">◖ ◗</button></header>
      <section className="inspiration-content">
        <div className="inspiration-heading"><h1>灵感·<em>自由生长</em></h1><label><MagnifyingGlass/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索灵感"/><span>✦</span></label></div>
        <div className="inspiration-filters">{['全部','家装','建材','地产','餐饮','家电','汽车'].map(item=><button key={item} className={active===item?'active':''} onClick={()=>setActive(item)}>{item}</button>)}</div>
        <div className="inspiration-grid">{visible.map(([title,copy,image],index)=><article key={`${title}-${index}`}><div className="inspiration-cover"><img src={image}/><button aria-label={`播放 ${title}`}><Play weight="fill"/></button></div><b>{title}</b><small>{copy}</small></article>)}</div>
      </section>
    </main>
  </div>;
}

export function App() {
  const [page, setPage] = useState(() => {
    // /#performance 等锚点可直达对应页面（Storefront Ad Studio 会这样跳回来）
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    const known = navigation.flatMap(group => group.items).map(item => item[0]);
    return known.includes(hash) ? hash : 'home';
  });
  const [menuPinned, setMenuPinned] = useState(true);
  const [menuHovered, setMenuHovered] = useState(false);
  const menuExpanded = menuPinned || menuHovered;
  const [tier, setTier] = useState(() => window.localStorage.getItem('vertensai-tier') === 'lite' ? 'lite' : 'pro');
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('vertensai-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [language, setLanguage] = useState(() => window.localStorage.getItem('vertensai-language') || 'en');
  const [product, setProduct] = useState(null);
  const [publishAsset, setPublishAsset] = useState(null);
  const [canvasTemplate, setCanvasTemplate] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [personalAvatars, setPersonalAvatars] = useState([
    {id:'owner-demo',name:'Wen · Owner Avatar',role:'Store owner clone',locale:'English · Chinese',image:images.presenter}
  ]);
  const [avatarWizardOpen, setAvatarWizardOpen] = useState(false);
  const [brandImportRequest, setBrandImportRequest] = useState(null);
  const [checkups, setCheckups] = useState([
    {id:'chk-jul',source:'Instagram',handle:'instagram.com/casalumainteriors',score:48,issues:5,date:'Jul 20',daysAgo:32},
    {id:'chk-jun',source:'Instagram',handle:'instagram.com/casalumainteriors',score:55,issues:4,date:'Jun 18',daysAgo:64}
  ]);
  const addCheckup = entry => setCheckups(current => [entry, ...current].slice(0, 6));
  const [doneMoves, setDoneMoves] = useState([]);
  const toggleMove = id => setDoneMoves(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const [calendarFromCheckup, setCalendarFromCheckup] = useState(false);
  const buildCalendarFromCheckup = () => {
    const canPlan = tierOrder[tier] >= tierOrder.pro;
    setCalendarFromCheckup(canPlan);
    setPage(canPlan ? 'calendar' : 'plan');
  };
  const [activeProject, setActiveProject] = useState(null);
  const [agentDraft, setAgentDraft] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('vertensai-theme', theme);
  }, [theme]);
  useEffect(() => { window.localStorage.setItem('vertensai-tier', tier); }, [tier]);
  useEffect(() => { window.localStorage.setItem('vertensai-language', language); document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'; }, [language]);
  const notify = message => { setNotice(typeof message === 'string' ? message : 'Updated.'); setTimeout(() => setNotice(''), 2600); };
  const startAvatarWizard = () => { setAvatarWizardOpen(true); setPage('avatars'); };
  const startBrandImport = url => { setBrandImportRequest({ id: Date.now(), url: url?.trim() || '' }); setPage('brand'); };
  const addPersonalAvatar = avatar => setPersonalAvatars(current => current.some(item => item.id === avatar.id) ? current : [avatar, ...current]);
  const openAgentWithDraft = draft => { setAgentDraft(draft || ''); setActiveProject(null); setPage('agent'); };
  const content = useMemo(() => {
    if (page === 'home') return <InspirationHome onDesign={() => { window.location.href = `${import.meta.env.BASE_URL || '/'}studio.html`; }} />;
    if (page === 'profile') return <ProfilePage tier={tier} language={language} setPage={setPage}/>;
    if (page === 'plan') return <PlanPage tier={tier} setTier={setTier} language={language} notify={notify}/>;
    if (page === 'agent') return <AgentPage product={product} setPage={setPage} notify={notify} language={language} tier={tier} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} activeProject={activeProject} setActiveProject={setActiveProject} initialDraft={agentDraft} clearInitialDraft={() => setAgentDraft('')}/>;
    if (page === 'templates') return <TemplatesPage setPage={setPage} setCanvasTemplate={setCanvasTemplate} notify={notify} language={language}/>;
    if (page === 'canvas') return <CanvasPage template={canvasTemplate} theme={theme}/>;
    if (page === 'avatars') return <AvatarsPage notify={notify} setPage={setPage} language={language} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} personalAvatars={personalAvatars} wizardOpen={avatarWizardOpen} closeWizard={() => setAvatarWizardOpen(false)} onAvatarCreated={addPersonalAvatar}/>;
    if (page === 'brand') return <MyBrandPage product={product} notify={notify} language={language} tier={tier} setPage={setPage} importRequest={brandImportRequest} onImportRequestHandled={() => setBrandImportRequest(null)}/>;
    if (page === 'calendar') return <MarketingCalendarPage setPage={setPage} notify={notify} language={language} openAgentWithDraft={openAgentWithDraft} fromCheckup={calendarFromCheckup} clearFromCheckup={()=>setCalendarFromCheckup(false)}/>;
    if (page === 'publishing') return <PublishingPage notify={notify} publishAsset={publishAsset} setPublishAsset={setPublishAsset} setPage={setPage} language={language}/>;
    if (page === 'channels') return <SocialAccountsPage notify={notify} language={language}/>;
    if (page === 'assets') return <AssetsPage product={product} setPage={setPage} setPublishAsset={setPublishAsset} language={language} notify={notify}/>;
    if (page === 'team') return <TeamPage notify={notify} language={language}/>;
    if (page === 'performance') return <PerformancePage notify={notify} language={language}/>;
    if (page === 'leads') return <LeadsPage notify={notify} tier={tier} setPage={setPage} language={language}/>;
    if (page === 'service') return <ServicePage notify={notify} language={language}/>;
    if (page === 'help') return <HelpCenterPage language={language}/>;
    return <SimplePage page={page} product={product} setPage={setPage} language={language} setActiveProject={setActiveProject}/>;
  }, [page, product, canvasTemplate, language, publishAsset, theme, tier, selectedAvatar, avatarWizardOpen, activeProject, agentDraft, personalAvatars, brandImportRequest, checkups, calendarFromCheckup, doneMoves]);
  if (page === 'studio') return <><StudioSite language={language} theme={theme} notify={notify} onExit={() => setPage('home')}/>{notice && <div className="toast"><CheckCircle weight="fill"/>{notice}</div>}</>;
  if (page === 'home') return <>{content}</>;
  return <div className={`app-shell ${menuPinned ? 'sidebar-open' : 'sidebar-collapsed'}`}><Sidebar page={page} setPage={setPage} expanded={menuExpanded} pinned={menuPinned} setPinned={setMenuPinned} setHovered={setMenuHovered} theme={theme} setTheme={setTheme} tier={tier} setTier={setTier} language={language} setLanguage={setLanguage}/><main>{content}</main>{notice && <div className="toast"><CheckCircle weight="fill"/>{notice}</div>}</div>;
}
