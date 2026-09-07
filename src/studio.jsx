import { useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, CalendarBlank, CheckCircle, Clock, CreditCard, FileText, Lightning,
  Minus, Play, Plus, ShieldCheck, Sparkle, Storefront, Users, VideoCamera, WhatsappLogo
} from '@phosphor-icons/react';

const img = {
  kitchen:'/assets/calacatta-kitchen.png', patio:'/assets/patio-pavers.png', bath:'/assets/stone-bathroom.png',
  presenter:'/assets/viral-presenter.png', avatar:'/assets/ai-presenter.png', sofia:'/assets/actor-sofia.png'
};

const CASES = [
  {id:'c1', img:img.kitchen,   tagZh:'家居建材', tagEn:'Home & Building',  zh:'橱柜门店 · 到店预约', en:'Cabinet showroom · book a visit',   mZh:'单条带来 38 次门店导航', mEn:'38 store-direction taps from one piece', len:'18s'},
  {id:'c2', img:img.presenter, tagZh:'家居建材', tagEn:'Home & Building',  zh:'老板出镜 · 材料科普', en:'Owner-led · material explainer',    mZh:'完播率 61%，高于账号均值 2.4 倍', mEn:'61% completion, 2.4× account average', len:'22s'},
  {id:'c3', img:img.patio,     tagZh:'户外施工', tagEn:'Outdoor',          zh:'庭院铺装 · 前后对比', en:'Paving · before and after',        mZh:'两周内 12 条报价请求', mEn:'12 quote requests in two weeks', len:'15s'},
  {id:'c4', img:img.bath,      tagZh:'家居建材', tagEn:'Home & Building',  zh:'卫浴翻新 · 开业活动', en:'Bath remodel · launch promo',      mZh:'活动周到店 47 人', mEn:'47 walk-ins during promo week', len:'20s'},
  {id:'c5', img:img.sofia,     tagZh:'美业',     tagEn:'Beauty',           zh:'美容门店 · 员工矩阵', en:'Salon · employee matrix',          mZh:'6 个员工号同步发布，覆盖翻 4 倍', mEn:'6 staff accounts, 4× reach', len:'16s'},
  {id:'c6', img:img.avatar,    tagZh:'餐饮',     tagEn:'Restaurant',       zh:'餐厅新品 · 数字人口播', en:'Restaurant · avatar voice-over',  mZh:'一次拍摄产出 8 条不同语言版本', mEn:'8 language variants from one shoot', len:'14s'}
];

const INCLUDED = {
  zh:['选题与脚本','字幕与配音','封面图','9:16 / 1:1 / 16:9 多尺寸','编导全程操作','不满意免费重做','排进内容日历','推送到已绑定账号'],
  en:['Concept and script','Captions and voice-over','Cover image','9:16 / 1:1 / 16:9 exports','A producer runs it end to end','Free remake if not right','Scheduled into your calendar','Pushed to your connected accounts']
};

const STEPS = {
  zh:[['你只说要什么','选条数、行业与用途。不用写提示词，不用挑模型。有素材就传，没有也行'],['我们的编导出方案','编导用 AI 跑选题与脚本，24 小时内给你，你点头才开工'],['我们的人操作 AI','生成、混剪、配音、字幕全程由编导操作和取舍，不是丢给模型自动跑'],['交付即可发布','多尺寸成品直接进你的内容日历，一键分发到已绑定账号']],
  en:[['You just say what you need','Quantity, industry and goal. No prompts to write, no models to pick. Send footage if you have it'],['Our producer drafts it','A producer runs the AI for concepts and scripts, back within 24h. Nothing starts before you approve'],['Our people operate the AI','Generation, editing, voice-over and captions are all driven and judged by a person, not left to a model'],['Delivered ready to post','Multi-ratio files land in your calendar for one-click publishing']]
};

export default function StudioSite({ language, theme, notify, onExit }) {
  const zh = language === 'zh';
  const [view, setView] = useState('work');
  const [region, setRegion] = useState('us');
  const [filter, setFilter] = useState('all');
  const [qty, setQty] = useState(4);
  const [sub, setSub] = useState(true);
  const [adSpend, setAdSpend] = useState(500);
  const [rush, setRush] = useState(false);
  const [industry, setIndustry] = useState(zh?'家居建材':'Home & Building');
  const [goal, setGoal] = useState(zh?'到店预约':'Book a visit');
  const [pay, setPay] = useState(region==='cn'?'wechat':'card');
  const [placed, setPlaced] = useState(false);

  const P = region === 'cn'
    ? { cur:'¥', piece:199, sub:159, floor:539, steps:[0,1000,2000,5000,10000], pays:[['wechat','微信支付'],['alipay','支付宝'],['bank','对公转账']] }
    : { cur:'$', piece:49,  sub:29, floor:100, steps:[0,300,500,1000,2000],    pays:[['card',zh?'信用卡':'Card'],['paypal','PayPal'],['bank',zh?'银行转账':'Bank transfer']] };
  const fmt = n => P.cur + Math.round(n).toLocaleString();

  const contentFee = qty * P.piece;
  const rushFee = rush ? Math.round(contentFee * 0.3) : 0;
  const subFee = sub ? P.sub : 0;
  const adFee = adSpend > 0 ? Math.max(P.floor, Math.round(adSpend * 0.10)) : 0;
  const adRate = adSpend > 0 ? (adFee / adSpend * 100).toFixed(1) : null;
  const planTotal = contentFee + subFee + adFee;
  const orderTotal = contentFee + rushFee;

  const shown = useMemo(() => filter === 'all' ? CASES : CASES.filter(c => (zh?c.tagZh:c.tagEn) === filter), [filter, zh]);
  const tags = useMemo(() => ['all', ...new Set(CASES.map(c => zh?c.tagZh:c.tagEn))], [zh]);

  const go = v => { setView(v); window.scrollTo({top:0,behavior:'instant'}); };
  const placeOrder = () => {
    setPlaced(true);
    notify(zh?`订单已提交：${qty} 条成品，合计 ${fmt(orderTotal)}。`:`Order placed — ${qty} pieces, ${fmt(orderTotal)}.`);
  };

  const nav = [['work', zh?'作品案例':'Work'], ['pricing', zh?'收费方式':'Pricing'], ['order', zh?'下单':'Order']];

  return <div className={`studio-site ${theme==='dark'?'dark':''}`}>
    <header className="studio-nav">
      <button className="studio-logo" onClick={()=>go('work')}>
        <i><Sparkle weight="fill"/></i>
        <span><b>Creative Studio</b><small>{zh?'由 VertensAI 提供':'by VertensAI'}</small></span>
      </button>
      <nav>{nav.map(([k,l])=><button key={k} className={view===k?'on':''} onClick={()=>go(k)}>{l}</button>)}</nav>
      <div className="studio-nav-right">
        <button className="studio-back" onClick={onExit}><ArrowLeft/>{zh?'返回工具台':'Back to the tool'}</button>
        <button className="studio-cta" onClick={()=>go('order')}>{zh?'立即下单':'Order now'}<ArrowRight/></button>
      </div>
    </header>

    {view === 'work' && <main className="studio-main">
      <section className="studio-hero">
        <div>
          <span>{zh?'有人替你用 AI · 按条计费':'WE RUN THE AI FOR YOU · PER PIECE'}</span>
          <h1>{zh?'我们有人替你用 AI 做门店短视频':'Our people run the AI. You just say what you need.'}</h1>
          <p>{zh?'你不用学工具、不用挑模型、不用改提示词。说清楚要什么，5 个工作日后拿到能直接发布的成品 —— 脚本、字幕、口播、封面、多尺寸导出全部做完，并已排进你的内容日历。':'No tools to learn, no models to pick, no prompts to tune. Tell us what you need and five working days later you get publish-ready pieces — script, captions, voice-over, cover and multi-ratio exports, already scheduled into your calendar.'}</p>
          <div className="studio-hero-price"><b>{fmt(P.piece)}</b><span>{zh?'/ 条':'/ piece'}</span><i>{zh?'不设最低起订':'No minimum order'}</i></div>
          <div className="studio-hero-cta">
            <button className="primary" onClick={()=>go('order')}>{zh?'开始下单':'Start an order'}<ArrowRight/></button>
            <button className="ghost" onClick={()=>go('pricing')}>{zh?'查看收费方式':'See pricing'}</button>
          </div>
        </div>
        <div className="studio-hero-stack">
          <img src={img.kitchen} alt=""/><img src={img.presenter} alt=""/><img src={img.patio} alt=""/>
          <span><Play weight="fill"/>{zh?'AI + 实拍混剪':'AI + real footage'}</span>
        </div>
      </section>

      <section className="studio-why">
        <h3>{zh?'两种做法之间，还有第三种':'There is a third option between the two you know'}</h3>
        <div className="studio-why-row">
          <article>
            <i>{zh?'自助 AI 工具':'Self-serve AI tools'}</i>
            <b>{zh?'便宜，但活是你干':'Cheap, but you do the work'}</b>
            <small>{zh?'要自己学工具、挑模型、改提示词，做出来还得自己剪、自己配字幕。':'You learn the tool, pick the model, tune the prompts — then still edit and caption it yourself.'}</small>
          </article>
          <article className="on">
            <i>Creative Studio</i>
            <b>{zh?'有人替你用 AI':'Our people run the AI'}</b>
            <small>{zh?'编导全程操作，交成品。每条 $49，5 个工作日。':'A producer drives it end to end and hands you finished pieces. $49 each, five working days.'}</small>
          </article>
          <article>
            <i>{zh?'纯人工代做':'All-human agencies'}</i>
            <b>{zh?'省心，但贵且慢':'Hands-off, but slow and dear'}</b>
            <small>{zh?'真人拍摄真人剪辑，每条约 $167，12 至 16 天交付。':'Real shoots and human editing — around $167 a piece, 12 to 16 days.'}</small>
          </article>
        </div>
      </section>

      <section className="studio-included">
        <h3>{zh?'一条成品包含什么':'What one finished piece includes'}</h3>
        <div className="studio-chips">{(zh?INCLUDED.zh:INCLUDED.en).map(t=><i key={t}><CheckCircle weight="fill"/>{t}</i>)}</div>
      </section>

      <section className="studio-cases">
        <header>
          <div><span>{zh?'作品案例':'WORK'}</span><h3>{zh?'最近交付的门店视频':'Recently delivered'}</h3></div>
          <div className="studio-filters">{tags.map(t=><button key={t} className={filter===t?'on':''} onClick={()=>setFilter(t)}>{t==='all'?(zh?'全部':'All'):t}</button>)}</div>
        </header>
        <div className="studio-case-grid">
          {shown.map(c=><article key={c.id} onClick={()=>notify(zh?'案例详情在原型中未展开。':'Case detail is not built out in this prototype.')}>
            <div className="studio-case-media"><img src={c.img} alt=""/><i className="studio-case-len">{c.len}</i><span className="studio-case-play"><Play weight="fill"/></span></div>
            <i className="studio-case-tag">{zh?c.tagZh:c.tagEn}</i>
            <b>{zh?c.zh:c.en}</b>
            <small>{zh?c.mZh:c.mEn}</small>
          </article>)}
        </div>
      </section>

      <section className="studio-steps">
        <header><span>{zh?'怎么交付':'HOW IT WORKS'}</span><h3>{zh?'四步，五个工作日':'Four steps, five working days'}</h3></header>
        <div className="studio-step-row">
          {(zh?STEPS.zh:STEPS.en).map(([t,d],i)=><article key={t}><i>{i+1}</i><b>{t}</b><small>{d}</small></article>)}
        </div>
        <footer><ShieldCheck weight="fill"/><span>{zh?'不满意免费重做，不额外计费。急件 3 个工作日，加收 30%。':'Remakes are free if a piece is not right. Rush delivery in 3 working days for 30% more.'}</span></footer>
      </section>
    </main>}

    {view === 'pricing' && <main className="studio-main">
      <section className="studio-page-head">
        <div><span>{zh?'收费方式':'PRICING'}</span><h1>{zh?'按条付费，不按算力付费':'You pay per finished piece, never for compute'}</h1>
        <p>{zh?'工具台按 credits 计价，你自己动手用 AI。Creative Studio 按条计价，我们的编导替你用 AI 做完。两边可以只用一边，也可以一起用。':'The tool is priced on credits and you drive the AI yourself. Creative Studio is priced per piece and our producers drive it for you. Use either, or both.'}</p></div>
        <div className="studio-region">
          <button className={region==='us'?'on':''} onClick={()=>{setRegion('us');setPay('card');}}>{zh?'海外 USD':'Overseas USD'}</button>
          <button className={region==='cn'?'on':''} onClick={()=>{setRegion('cn');setPay('wechat');}}>{zh?'国内 CNY':'China CNY'}</button>
        </div>
      </section>

      <section className="studio-tiers">
        <article className="featured">
          <i>{zh?'按条':'PER PIECE'}</i><h2>{zh?'成品内容':'Finished content'}</h2>
          <div className="studio-tier-price"><b>{fmt(P.piece)}</b><span>{zh?'/ 条':'/ piece'}</span></div>
          <small>{zh?'有人替你用 AI 做完，交付即可发布':'A person runs the AI for you; what ships is publish-ready'}</small>
          <ul>{(zh?INCLUDED.zh:INCLUDED.en).slice(0,6).map(t=><li key={t}><CheckCircle weight="fill"/>{t}</li>)}</ul>
          <button className="primary" onClick={()=>go('order')}>{zh?'去下单':'Order'}<ArrowRight/></button>
        </article>
        <article>
          <i>{zh?'订阅':'SUBSCRIPTION'}</i><h2>{zh?'托管与归因':'Hosting and attribution'}</h2>
          <div className="studio-tier-price"><b>{fmt(P.sub)}</b><span>{zh?'/ 月':'/ month'}</span></div>
          <small>{zh?'不下单的月份也留在系统里':'Useful in a month you order nothing'}</small>
          <ul>{(zh?['账号托管与多平台发布','员工矩阵协同发布','30 天内容日历','内容级与员工级归因','多门店对比与数据导出']
                :['Account hosting and publishing','Employee matrix posting','30-day content calendar','Content and employee attribution','Multi-store view and export']).map(t=><li key={t}><CheckCircle weight="fill"/>{t}</li>)}</ul>
          <button className="ghost" onClick={()=>setSub(!sub)}>{sub?(zh?'已加入测算':'Included in estimate'):(zh?'加入测算':'Add to estimate')}</button>
        </article>
        <article>
          <i>{zh?'代投':'AD SERVICE'}</i><h2>{zh?'广告代运营':'Managed advertising'}</h2>
          <div className="studio-tier-price"><b>{fmt(P.floor)}</b><span>{zh?'/ 月 或 10% 取高者':'/ mo or 10%, higher of the two'}</span></div>
          <small>{zh?'不设最低投放门槛':'No minimum ad spend'}</small>
          <ul>{(zh?['账户搭建与素材投放','日常优化与周报','投放数据回流到归因','随时可停，无最短服务期']
                :['Account setup and creative launch','Daily optimisation and weekly reports','Spend data flows into attribution','Cancel any time, no minimum term']).map(t=><li key={t}><CheckCircle weight="fill"/>{t}</li>)}</ul>
          <button className="ghost" onClick={()=>setAdSpend(adSpend>0?0:P.steps[2])}>{adSpend>0?(zh?'已加入测算':'Included in estimate'):(zh?'加入测算':'Add to estimate')}</button>
        </article>
      </section>

      <section className="studio-calc">
        <header><span>{zh?'算一算':'ESTIMATE'}</span><h3>{zh?'你这个月要花多少':'What a month costs you'}</h3></header>
        <div className="studio-calc-body">
          <div className="studio-calc-controls">
            <div>
              <label>{zh?'本月要几条成品':'Finished pieces this month'}</label>
              <div className="studio-stepper">
                <button onClick={()=>setQty(Math.max(0,qty-1))}><Minus weight="bold"/></button>
                <b>{qty}<i>{zh?'条':qty===1?'piece':'pieces'}</i></b>
                <button onClick={()=>setQty(Math.min(40,qty+1))}><Plus weight="bold"/></button>
              </div>
              <div className="studio-presets">{[2,4,10,20].map(n=><button key={n} className={qty===n?'on':''} onClick={()=>setQty(n)}>{n}</button>)}</div>
            </div>
            <div>
              <label>{zh?'托管与归因订阅':'Hosting and attribution'}</label>
              <button className={`studio-toggle ${sub?'on':''}`} onClick={()=>setSub(!sub)}><i/><span>{sub?(zh?'已开通':'On'):(zh?'未开通':'Off')}</span><em>{fmt(P.sub)}{zh?' / 月':' / mo'}</em></button>
            </div>
            <div>
              <label>{zh?'本月广告投放预算':'Ad spend this month'}</label>
              <div className="studio-presets wide">{P.steps.map(n=><button key={n} className={adSpend===n?'on':''} onClick={()=>setAdSpend(n)}>{n===0?(zh?'不投':'None'):fmt(n)}</button>)}</div>
              <small>{zh?`代投费取「${fmt(P.floor)} 保底」与「广告费 10%」的高者`:`We charge the higher of ${fmt(P.floor)} flat or 10% of spend`}</small>
            </div>
          </div>
          <aside>
            <span>{zh?'本月账单':'THIS MONTH'}</span>
            <div className="studio-lines">
              <div><span>{zh?`成品内容 × ${qty}`:`Finished content × ${qty}`}</span><b>{fmt(contentFee)}</b></div>
              <div className={sub?'':'muted'}><span>{zh?'托管与归因':'Hosting'}</span><b>{sub?fmt(subFee):'—'}</b></div>
              <div className={adFee?'':'muted'}><span>{zh?'广告代投':'Ad service'}{adRate&&<i>{adRate}%</i>}</span><b>{adFee?fmt(adFee):'—'}</b></div>
            </div>
            <div className="studio-total"><span>{zh?'合计':'Total'}</span><b>{fmt(planTotal)}</b><small>{zh?'/ 月':'/ mo'}</small></div>
            <p>{zh?'不含广告费本身。门店、员工、账号与体检次数从不计价。':'Excludes the ad spend itself. Stores, employees, accounts and checkups are never billed.'}</p>
            <button className="primary" onClick={()=>go('order')}><FileText weight="fill"/>{zh?'按这个方案下单':'Order this'}</button>
          </aside>
        </div>
      </section>

      <section className="studio-adrule">
        <header><span>{zh?'代投收费规则':'AD SERVICE RULE'}</span><h3>{zh?'保底与抽成在门槛处正好衔接':'The flat fee and the percentage meet exactly at the threshold'}</h3></header>
        <div className="studio-table">
          <div className="row head"><span>{zh?'你的月投放':'Your monthly spend'}</span><b>{zh?'代投费用':'Our fee'}</b><b>{zh?'实际费率':'Effective rate'}</b></div>
          {(region==='cn'
            ? [['¥1,000','¥539','53.9%'],['¥2,000','¥539','27.0%'],['¥5,390','¥539','10.0%'],['¥10,000','¥1,000','10.0%'],['¥20,000','¥2,000','10.0%']]
            : [['$300','$100','33.3%'],['$500','$100','20.0%'],['$1,000','$100','10.0%'],['$2,000','$200','10.0%'],['$5,000','$500','10.0%']]
          ).map((r,i)=><div className={`row ${i===2?'pivot':''}`} key={r[0]}><span>{r[0]}{i===2&&<i>{zh?'衔接点':'Threshold'}</i>}</span><b>{r[1]}</b><b>{r[2]}</b></div>)}
        </div>
      </section>
    </main>}

    {view === 'order' && <main className="studio-main">
      {placed ? <section className="studio-done">
        <i><CheckCircle weight="fill"/></i>
        <h1>{zh?'订单已提交':'Order received'}</h1>
        <p>{zh?`${qty} 条成品，合计 ${fmt(orderTotal)}。24 小时内你会收到选题与脚本，确认后我们才开工。`:`${qty} pieces, ${fmt(orderTotal)} total. You will get concepts and scripts within 24 hours — nothing starts before you approve them.`}</p>
        <div className="studio-done-cta">
          <button className="primary" onClick={()=>{setPlaced(false);go('work');}}>{zh?'再看看案例':'Browse more work'}</button>
          <button className="ghost" onClick={onExit}>{zh?'返回工具台':'Back to the tool'}</button>
        </div>
      </section> : <>
      <section className="studio-page-head">
        <div><span>{zh?'下单':'ORDER'}</span><h1>{zh?'告诉我们要做什么':'Tell us what to make'}</h1>
        <p>{zh?'不需要懂 AI，也不需要先准备素材。说清楚要做什么，剩下的交给我们的编导。没有实拍也能做，有的话效果更好。':'You do not need to know anything about AI, and you do not need footage ready. Tell us what to make and our producers take it from there — footage helps, but is not required.'}</p></div>
      </section>
      <section className="studio-order">
        <div className="studio-order-form">
          <div className="studio-field">
            <label>{zh?'要几条':'How many pieces'}</label>
            <div className="studio-stepper">
              <button onClick={()=>setQty(Math.max(1,qty-1))}><Minus weight="bold"/></button>
              <b>{qty}<i>{zh?'条':qty===1?'piece':'pieces'}</i></b>
              <button onClick={()=>setQty(Math.min(40,qty+1))}><Plus weight="bold"/></button>
            </div>
            <div className="studio-presets">{[2,4,10,20].map(n=><button key={n} className={qty===n?'on':''} onClick={()=>setQty(n)}>{n}</button>)}</div>
          </div>
          <div className="studio-field-row">
            <div className="studio-field">
              <label>{zh?'行业':'Industry'}</label>
              <select value={industry} onChange={e=>setIndustry(e.target.value)}>
                {(zh?['家居建材','户外施工','餐饮','美业','汽车服务','健身']:['Home & Building','Outdoor','Restaurant','Beauty','Auto service','Fitness']).map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="studio-field">
              <label>{zh?'这批内容想达成什么':'What should these do'}</label>
              <select value={goal} onChange={e=>setGoal(e.target.value)}>
                {(zh?['到店预约','门店导航','留资询价','开业或活动','品牌形象']:['Book a visit','Store directions','Quote requests','Launch or promo','Brand awareness']).map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="studio-field">
            <label>{zh?'交付时间':'Delivery'}</label>
            <div className="studio-radio-row">
              <button className={rush?'':'on'} onClick={()=>setRush(false)}><b>{zh?'标准 · 5 个工作日':'Standard · 5 working days'}</b><small>{zh?'不加价':'No surcharge'}</small></button>
              <button className={rush?'on':''} onClick={()=>setRush(true)}><b>{zh?'加急 · 3 个工作日':'Rush · 3 working days'}</b><small>{zh?'加收 30%':'+30%'}</small></button>
            </div>
          </div>
          <div className="studio-field">
            <label>{zh?'素材（可选）':'Footage (optional)'}</label>
            <button className="studio-upload" onClick={()=>notify(zh?'原型中未接入上传。':'Upload is not wired in this prototype.')}>
              <VideoCamera/><span><b>{zh?'上传门店实拍或产品图':'Upload store footage or product photos'}</b><small>{zh?'没有也可以，我们用 AI 生成加模板补齐':'Not required — we fill in with AI and templates'}</small></span>
            </button>
          </div>
          <div className="studio-field">
            <label>{zh?'补充说明':'Anything else'}</label>
            <textarea rows="3" placeholder={zh?'比如：主推大理石台面，避免出现价格，口播用中英双语。':'e.g. feature the marble countertops, no prices on screen, bilingual voice-over.'}/>
          </div>
        </div>
        <aside className="studio-summary">
          <span>{zh?'订单摘要':'ORDER SUMMARY'}</span>
          <div className="studio-lines">
            <div><span>{zh?`成品内容 × ${qty}`:`Finished content × ${qty}`}</span><b>{fmt(contentFee)}</b></div>
            <div className={rush?'':'muted'}><span>{zh?'加急 30%':'Rush +30%'}</span><b>{rush?fmt(rushFee):'—'}</b></div>
          </div>
          <div className="studio-total"><span>{zh?'应付':'Due now'}</span><b>{fmt(orderTotal)}</b></div>
          <div className="studio-meta"><Clock/><span>{rush?(zh?'3 个工作日内交付':'Delivered in 3 working days'):(zh?'5 个工作日内交付':'Delivered in 5 working days')}</span></div>
          <div className="studio-meta"><CalendarBlank/><span>{zh?'24 小时内先给脚本，确认后开工':'Scripts within 24h, work starts after you approve'}</span></div>
          <label className="studio-pay-label">{zh?'支付方式':'Payment method'}</label>
          <div className="studio-pays">{P.pays.map(([k,l])=><button key={k} className={pay===k?'on':''} onClick={()=>setPay(k)}><CreditCard weight={pay===k?'fill':'regular'}/>{l}</button>)}</div>
          <button className="primary" onClick={placeOrder}><Lightning weight="fill"/>{zh?`支付 ${fmt(orderTotal)}`:`Pay ${fmt(orderTotal)}`}</button>
          <small className="studio-fine">{zh?'不满意免费重做。脚本未确认前可全额取消。':'Free remakes. Full cancellation any time before you approve the scripts.'}</small>
        </aside>
      </section>
      </>}
    </main>}

    <footer className="studio-foot">
      <div><b>Creative Studio</b><small>{zh?'由 VertensAI 提供 · 有人替你用 AI 做门店短视频':'by VertensAI · our people run the AI for your store'}</small></div>
      <div className="studio-foot-links">
        <button onClick={()=>go('pricing')}>{zh?'收费方式':'Pricing'}</button>
        <button onClick={()=>go('work')}>{zh?'作品案例':'Work'}</button>
        <a href="https://wa.me/" target="_blank" rel="noreferrer"><WhatsappLogo weight="fill"/>{zh?'联系我们':'Talk to us'}</a>
        <button onClick={onExit}>{zh?'返回工具台':'Back to the tool'}</button>
      </div>
    </footer>
  </div>;
}
