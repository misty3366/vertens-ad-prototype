import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Article, Baby, Barbell, Bed, BookOpen, BookmarkSimple, Broadcast, Buildings, CalendarBlank, CalendarCheck, Camera, Car, ChartLineUp, Check, CheckCircle,
  CaretDown, CaretUp, CirclesFour, Clock, Code, Copy, CursorClick, Database, DotsThree,
  Coffee, Confetti, Eye, FacebookLogo, FileText, Fire, FolderSimple, ForkKnife, Globe, GraduationCap, Heart, Heartbeat, House, Image as ImageIcon,
  Funnel, InstagramLogo, LinkSimple, MagicWand, MagnifyingGlass, MapPin, Microphone,
  Moon, Package, PaperPlaneTilt, PawPrint, Play, Plus, Robot, Scissors, ShareNetwork, ShoppingBag, Sparkle, Sun,
  ShieldCheck, SpinnerGap, Storefront, Strategy, Target, TiktokLogo, TrendUp, UploadSimple, UserPlus,
  SidebarSimple, TShirt, UserCircle, Users, VideoCamera, WhatsappLogo, X
} from '@phosphor-icons/react';
import {
  ReactFlow, Background, Controls, MiniMap, Handle, Position,
  useEdgesState, useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const images = {
  kitchen: '/assets/calacatta-kitchen.png',
  patio: '/assets/patio-pavers.png',
  bath: '/assets/stone-bathroom.png',
  presenter: '/assets/viral-presenter.png',
  avatar: '/assets/ai-presenter.png',
  sofia: '/assets/actor-sofia.png'
};

const tierOrder = { lite: 1, pro: 2, plus: 3 };
const tierLabels = { lite: 'Lite', pro: 'Pro', plus: 'Plus' };
const navigation = [
  { section: 'Workspace', items: [
    ['home', 'Home', House, 'lite'], ['projects', 'Projects', FolderSimple, 'lite'],
    ['brand', 'My Brand', Buildings, 'lite'], ['assets', 'Assets', Package, 'lite'],
    ['team', 'Team', Users, 'pro']
  ]},
  { section: 'Create', items: [
    ['agent', 'AI Agent', Sparkle, 'lite'], ['templates', 'Templates', Article, 'lite'], ['canvas', 'Viral Canvas', ShareNetwork, 'lite'],
    ['avatars', 'AI Avatars', UserCircle, 'lite'], ['service', 'Creative Service', VideoCamera, 'lite']
  ]},
  { section: 'Operate', items: [
    ['calendar', 'Marketing Calendar', CalendarBlank, 'lite'], ['publishing', 'Publishing', Broadcast, 'lite']
  ]},
  { section: 'Growth', items: [
    ['performance', 'Performance', ChartLineUp, 'plus'], ['leads', 'Leads', Target, 'plus']
  ]}
];

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

const industryFilters = [
  ['All industries', CirclesFour], ['Restaurants', ForkKnife], ['Beauty & Salon', Scissors],
  ['Home & Building', Buildings], ['Fitness', Barbell], ['Pet Services', PawPrint],
  ['Education', GraduationCap], ['Auto Services', Car], ['Health & Wellness', Heartbeat],
  ['Retail', ShoppingBag], ['Kids & Family', Baby], ['Wedding & Events', Heart],
  ['Hotels & Travel', Bed], ['Cafés & Bakeries', Coffee], ['Fashion', TShirt],
  ['Photography', Camera], ['Entertainment', Confetti]
];

const tools = [
  ['URL to video', LinkSimple, 'Turn any offer page into a short ad'],
  ['Image generation', ImageIcon, 'Create offer scenes and campaign images'],
  ['Video generation', VideoCamera, 'Text or image to short video'],
  ['Viral script', Article, 'Extract, rewrite and localize hooks'],
  ['Avatar video', UserCircle, 'Create presenter-led local ads'],
  ['Translate', Globe, 'Localize copy, voice and captions'],
  ['Background edit', MagicWand, 'Remove, replace or extend a scene'],
  ['Voiceover', Microphone, 'Natural voices in 28+ languages']
];

function Logo() {
  return <div className="logo"><span className="logo-sun">S</span><strong>SunADS</strong></div>;
}

function Sidebar({ page, setPage, expanded, pinned, setPinned, setHovered, theme, setTheme, tier, setTier }) {
  const changeTier = nextTier => {
    setTier(nextTier);
    const currentItem = navigation.flatMap(group => group.items).find(item => item[0] === page);
    if (currentItem && tierOrder[currentItem[3]] > tierOrder[nextTier]) setPage('home');
  };
  return <aside className={`sidebar ${expanded ? 'expanded' : ''} ${expanded && !pinned ? 'hover-expanded' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <Logo />
    <div className="tier-switch" aria-label="Prototype product stage">
      {Object.keys(tierOrder).map(id => <button key={id} className={tier === id ? 'active' : ''} title={`${tierLabels[id]} feature scope`} onClick={() => changeTier(id)}>{tierLabels[id]}</button>)}
    </div>
    <button className={`sidebar-toggle ${pinned ? 'pinned' : ''}`} aria-label={pinned ? 'Unpin menu' : 'Pin menu'} title={pinned ? 'Unpin menu' : 'Pin menu'} onClick={() => setPinned(!pinned)}><SidebarSimple size={19} weight={pinned ? 'fill' : 'regular'}/></button>
    <nav>
      {navigation.map(group => <div className="nav-group" key={group.section}>
        <span>{group.section}</span>
        {group.items.filter(item => tierOrder[item[3]] <= tierOrder[tier]).map(([id, label, Icon]) => <button key={id} aria-label={label} title={label} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>
          <Icon size={20} weight={page === id ? 'fill' : 'regular'} /><b>{label}</b>
          {id === 'performance' && <i>Beta</i>}
        </button>)}
      </div>)}
    </nav>
    <div className="sidebar-footer">
      <button className="help"><span>?</span><div><b>Need help?</b><small>Talk to our team</small></div></button>
      <button className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <span>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}</span>
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

function HomePage({ product, setProduct, setPage, notify }) {
  const [viralUrl, setViralUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(0);
  const workflow = [
    { title:'Add a winning local ad', copy:'Paste a TikTok, Reels or Facebook link.' },
    { title:'Adapt it to your offer', copy:'Keep the hook. Rewrite for your store and city.' },
    { title:'Choose host & voice', copy:'Use an actor or clone the business owner.' },
    { title:'Generate store-visit ads', copy:'Create ready-to-test local video variants.' }
  ];
  const entryCards = [
    { title:'AI Agent', icon:Sparkle, image:images.presenter, page:'agent' },
    { title:'Industry templates', icon:Article, image:images.kitchen, page:'templates' },
    { title:'Viral Canvas', icon:ShareNetwork, image:images.patio, page:'canvas' },
    { title:'Performance', icon:ChartLineUp, image:images.bath, page:'performance' }
  ];
  const analyzeWinner = (source = viralUrl) => {
    if (!source.trim()) return;
    setViralUrl(source);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setCompleted(1);
      setActiveStep(1);
      if (!product) setProduct({ name:'Weekend Signature Offer', category:'Local offer', url:'Brand asset', image:images.kitchen });
      notify('Winning structure found.');
    }, 650);
  };
  const continueStep = index => {
    if (index === 0) return analyzeWinner();
    if (!viralUrl) return notify('Start with a winning video link.');
    const nextCompleted = Math.max(completed, index + 1);
    setCompleted(nextCompleted);
    if (index < 3) setActiveStep(index + 1);
    else {
      notify('Opening your workflow in Viral Canvas.');
      setPage('canvas');
    }
  };
  return <div className="page home-page">
    <div className="getting-started-title"><div><span>LOCAL STORE GROWTH</span><h2>Turn winning videos into store visits.</h2></div><b>{completed} / 4 completed</b></div>

    <section className="simple-start-card">
      <div className="simple-steps">
        {workflow.map((step,index) => <article key={step.title} className={`${activeStep === index ? 'active' : ''} ${completed > index ? 'done' : ''}`}>
          <button className="simple-step-head" onClick={() => setActiveStep(index)}>
            <span>{completed > index ? <Check/> : index + 1}</span><b>{step.title}</b>{activeStep === index ? <CaretUp/> : <CaretDown/>}
          </button>
          {activeStep === index && <div className="simple-step-body">
            <p>{step.copy}</p>
            {index === 0 ? <label className="simple-link-input"><LinkSimple/><input value={viralUrl} onChange={e => setViralUrl(e.target.value)} placeholder="Paste video link" onKeyDown={e => e.key === 'Enter' && analyzeWinner()}/></label> : index === 2 ? <div className="simple-picks"><button onClick={() => setPage('avatars')}><UserCircle/> Choose avatar</button><button onClick={() => setPage('brand')}><Microphone/> Choose voice</button></div> : null}
            <button className="simple-primary" disabled={index === 0 && (!viralUrl || analyzing)} onClick={() => continueStep(index)}>{analyzing ? <SpinnerGap className="spin"/> : index === 3 ? 'Generate video' : index === 0 ? 'Analyze video' : 'Continue'} <ArrowRight/></button>
          </div>}
        </article>)}
      </div>
      <div className="simple-preview">
        <div className="simple-preview-frame"><img src={activeStep < 2 ? images.presenter : activeStep === 2 ? images.sofia : product?.image || images.kitchen}/><button aria-label="Preview video"><Play weight="fill"/></button></div>
        <div className="simple-preview-meta"><span>{String(activeStep + 1).padStart(2,'0')}</span><div><b>{workflow[activeStep].title}</b><small>{activeStep === 0 ? 'TikTok · Reels · Facebook' : activeStep === 1 ? 'Hook · Offer · Local CTA' : activeStep === 2 ? 'Owner · Actor · Voice' : '9:16 · 3 variants'}</small></div></div>
      </div>
    </section>

    <section className="simple-entry-grid">
      {entryCards.map(({title,icon:Icon,image,page}) => <button key={title} onClick={() => setPage(page)}><div><Icon/><ArrowRight/></div><img src={image}/><b>{title}</b></button>)}
    </section>
  </div>;
}

function AgentPage({ product, setPage, notify }) {
  const [prompt, setPrompt] = useState('');
  const [view, setView] = useState('landing');
  const [mediaType, setMediaType] = useState('video');
  const [destination, setDestination] = useState('chat');
  const [modelOpen, setModelOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState('all');
  const send = () => {
    if (!prompt.trim()) return;
    if (destination === 'canvas') {
      notify('Brief sent to Viral Canvas.');
      setPage('canvas');
      return;
    }
    setView('chat');
    notify('Creative task started.');
  };
  const examples = [
    {type:'video',label:'OWNER-LED VIDEO',title:'Turn the owner into a trusted local expert',copy:'A 20-second vertical ad with one clear booking or store-visit CTA.',image:images.presenter,prompt:'Create a 20-second owner-led video for my local business offer with a clear booking CTA.'},
    {type:'image',label:'LOCAL OFFER IMAGE',title:'Turn one offer into a campaign image set',copy:'Keep the product or service accurate while adapting the format for every channel.',image:images.kitchen,prompt:'Create three premium campaign images for my weekend local offer, designed for Meta and Instagram.'},
    {type:'video',label:'VIRAL REPLICATION',title:'Rebuild a winning local ad for your business',copy:'Reuse the hook and rhythm without copying the original brand.',image:images.patio,prompt:'Analyze a winning local-business ad and recreate its structure for my offer and city.'}
  ];
  const visibleExamples = examples.filter(x => galleryTab === 'all' || x.type === galleryTab);

  if (view === 'chat') return <div className="codex-agent">
    <aside className="agent-history">
      <div className="history-title"><b>SunADS Agent</b><button onClick={() => setView('landing')}><Plus/></button></div>
      <button className="new-task" onClick={() => {setPrompt('');setView('landing');}}><Plus/> New creative</button>
      <span>Today</span>
      <button className="history-item active"><VideoCamera/><div><b>Weekend offer owner ad</b><small>Generating 3 variants</small></div></button>
      <button className="history-item"><ImageIcon/><div><b>Local campaign images</b><small>6 images · Ready</small></div></button>
      <span>Previous</span>
      <button className="history-item"><VideoCamera/><div><b>Seasonal booking campaign</b><small>Completed</small></div></button>
      <div className="history-project"><FolderSimple/><span><b>Current project</b><small>Luma Local · Downtown</small></span></div>
    </aside>
    <section className="agent-thread">
      <header><div><span>CREATIVE TASK</span><h2>{mediaType === 'video' ? 'Weekend offer owner video' : 'Local offer campaign images'}</h2></div><div className="task-status"><span></span> Working</div></header>
      <div className="thread-body">
        <div className="thread-user"><div className="user-dot">W</div><div><b>You</b><p>{prompt}</p>{product && <div className="thread-product"><img src={product.image}/><span><b>{product.name}</b><small>Offer attached</small></span></div>}</div></div>
        <div className="thread-agent"><div className="agent-symbol"><Sparkle weight="fill"/></div><div><b>SunADS Agent</b><p>I’ll turn this into a focused {mediaType} test using the offer, local market and booking objective already saved in your workspace.</p>
          <div className="task-steps">
            <div className="done"><CheckCircle weight="fill"/><span><b>Read offer and My Brand</b><small>Weekend offer · trusted local positioning</small></span></div>
            <div className="done"><CheckCircle weight="fill"/><span><b>Build the creative direction</b><small>Owner proof · clear benefit · local booking CTA</small></span></div>
            <div><SpinnerGap className="spin"/><span><b>Generate three {mediaType} variants</b><small>English and Spanish captions · 9:16</small></span></div>
          </div>
          <div className="thread-output"><img src={mediaType === 'video' ? images.presenter : images.kitchen}/><div><span>PREVIEW · VARIANT 01</span><h3>{mediaType === 'video' ? 'A local offer worth leaving home for.' : 'Your next favorite local stop.'}</h3><p>{mediaType === 'video' ? '20 sec · Owner avatar · Meta / TikTok' : '4:5 · Meta / Instagram · High resolution'}</p><div><button>Open details</button><button className="primary" onClick={() => setPage('canvas')}>Continue in Canvas <ArrowRight/></button></div></div></div>
        </div></div>
      </div>
      <div className="codex-composer"><button><Plus/></button><textarea placeholder="Ask for changes or continue the task..."/><div><span>{mediaType === 'video' ? 'Video' : 'Image'} · Auto model</span><button className="thread-send"><PaperPlaneTilt weight="fill"/></button></div></div>
    </section>
  </div>;

  return <div className="creative-agent">
    <section className="creative-agent-hero">
      <div className="agent-credit"><Sparkle weight="fill"/> 1,240 <span>credits</span></div>
      <div className="creative-agent-heading"><h2>Creative <em>Agent</em></h2><p>From one idea to ready-to-use images and videos.</p></div>
      <div className="creative-prompt">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Add an offer and describe the image or video you want to create..."/>
        <div className="creative-prompt-toolbar">
          <button className="add-reference"><Plus/></button>
          <button><Package/> {product ? product.name : 'Add offer'}</button>
          <div className="media-switch"><button className={mediaType === 'video' ? 'active' : ''} onClick={() => setMediaType('video')}><VideoCamera/> Video</button><button className={mediaType === 'image' ? 'active' : ''} onClick={() => setMediaType('image')}><ImageIcon/> Image</button></div>
          <div className="model-control"><button onClick={() => setModelOpen(!modelOpen)}><Sparkle/> Auto model <span>⌄</span></button>{modelOpen && <div className="model-popover"><div><b>Model preference</b><span>Auto</span></div><button className="selected"><VideoCamera/><span><b>Best quality</b><small>Balanced speed and detail</small></span><Check/></button><button><VideoCamera/><span><b>Fast</b><small>For rapid creative testing</small></span></button><button><ImageIcon/><span><b>Product fidelity</b><small>Preserve materials and textures</small></span></button></div>}</div>
          <span className="toolbar-space"/>
          <div className="destination-switch"><button className={destination === 'chat' ? 'active' : ''} onClick={() => setDestination('chat')}><Robot/> Chat</button><button className={destination === 'canvas' ? 'active' : ''} onClick={() => setDestination('canvas')}><ShareNetwork/> Canvas</button></div>
          <button className="creative-send" disabled={!prompt.trim()} onClick={send}><ArrowRight/></button>
        </div>
      </div>
      <div className="agent-route-note">{destination === 'chat' ? 'Submit to start a Codex-style creative task.' : 'Submit to open the brief directly in Viral Canvas.'}</div>
    </section>
    <section className="agent-inspiration">
      <div className="inspiration-tabs"><button className={galleryTab === 'all' ? 'active' : ''} onClick={() => setGalleryTab('all')}>All</button><button className={galleryTab === 'video' ? 'active' : ''} onClick={() => setGalleryTab('video')}>Video</button><button className={galleryTab === 'image' ? 'active' : ''} onClick={() => setGalleryTab('image')}>Image</button><span/><small>Start from a proven creative direction</small></div>
      <div className="inspiration-grid">{visibleExamples.map(item => <article key={item.title}><div><img src={item.image}/><span>{item.label}</span>{item.type === 'video' && <button className="preview-play"><Play weight="fill"/></button>}</div><h3>{item.title}</h3><p>{item.copy}</p><button onClick={() => {setMediaType(item.type);setPrompt(item.prompt);window.scrollTo({top:0,behavior:'smooth'});}}>Use direction <ArrowRight/></button></article>)}</div>
    </section>
  </div>;
}

const templateCatalog = [
  {id:'restaurant-dish',title:'Signature Dish Rush',industry:'Restaurants',category:'Product Demos',image:images.kitchen,video:'/assets/sample-showroom-launch.mp4',views:'38.6K',uses:'1,284',duration:'15s',model:'Seedance 2.5',theme:'Sensory product close-up',character:'Restaurant owner'},
  {id:'restaurant-offer',title:'Lunch Offer Countdown',industry:'Restaurants',category:'Animated Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'24.7K',uses:'818',duration:'18s',model:'Seedance 2.5',theme:'Time-limited local offer',character:'Store owner'},
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

function TemplatesPage({ setPage, setCanvasTemplate, notify }) {
  const [category, setCategory] = useState('All');
  const [industry, setIndustry] = useState('All industries');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(['restaurant-dish','beauty-transform','building-proof']);
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState('preview');
  const [autofilled, setAutofilled] = useState(false);
  const categories = ['All','Essentials','UGC Ads','Animated Ads','Product Demos','Before & After','Saved'];
  const visibleTemplates = templateCatalog.filter(item => {
    const matchesCategory = category === 'All' || (category === 'Saved' ? saved.includes(item.id) : item.category === category);
    const matchesIndustry = industry === 'All industries' || item.industry === industry;
    const matchesSearch = `${item.title} ${item.category} ${item.industry} ${item.theme}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesIndustry && matchesSearch;
  });
  const openTemplate = (item, mode = 'preview') => { setSelected(item); setModalMode(mode); setAutofilled(false); };
  const toggleSaved = id => setSaved(items => items.includes(id) ? items.filter(item => item !== id) : [...items,id]);
  const openInCanvas = () => {
    if (!selected) return;
    setCanvasTemplate(selected);
    setSelected(null);
    notify(`${selected.title} copied to Viral Canvas.`);
    setPage('canvas');
  };
  const workflowNodes = selected ? [
    {id:'t1',type:'templateFlow',position:{x:35,y:185},data:{kicker:'INPUT',label:'Offer image',detail:'Product, service or promotion',image:selected.image,tone:'input'}},
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
    <div className="templates-toolbar">
      <div className="template-categories"><h2>Templates</h2>{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}{item === 'Saved' && <span>{saved.length}</span>}</button>)}</div>
      <label><MagnifyingGlass/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search templates"/></label>
    </div>
    <div className="industry-filter" aria-label="Industry template filters">{industryFilters.map(([name,Icon]) => <button key={name} className={industry === name ? 'active' : ''} onClick={() => setIndustry(name)}><Icon/>{name}</button>)}</div>
    <div className="template-library-meta"><div><span>LOCAL BUSINESS TEMPLATE LIBRARY</span><h3>{industry === 'All industries' ? 'Proven store-visit structures across 16 industries' : `${industry} templates`}</h3></div><p>{visibleTemplates.length} templates · Click any image to preview</p></div>
    <div className="template-grid">{visibleTemplates.map(item => <article className="template-card" key={item.id}>
      <div className="template-media" role="button" tabIndex="0" aria-label={`Preview ${item.title}`} onClick={() => openTemplate(item)} onKeyDown={event => event.key === 'Enter' && openTemplate(item)}>
        <img src={item.image}/><span className="template-model">{item.model}</span><button className={`template-save ${saved.includes(item.id) ? 'saved' : ''}`} aria-label={`Save ${item.title}`} onClick={event => {event.stopPropagation();toggleSaved(item.id);}}><BookmarkSimple weight={saved.includes(item.id) ? 'fill' : 'regular'}/></button><button className="template-recreate" onClick={event => {event.stopPropagation();openTemplate(item,'workflow');}}>Recreate</button><i><Play weight="fill"/></i>
      </div>
      <div className="template-card-copy"><b>{item.title}</b><span><Eye/> {item.views} views <i>·</i> <Fire/> {item.uses} uses <i>·</i> Demo</span><small>{item.industry} · {item.duration} · {item.category}</small></div>
    </article>)}</div>
    {!visibleTemplates.length && <div className="template-empty"><MagnifyingGlass/><h3>No matching templates</h3><p>Try another search, industry or format.</p><button onClick={() => {setCategory('All');setIndustry('All industries');setQuery('');}}>Show all templates</button></div>}

    {selected && <div className="template-modal-scrim" onMouseDown={() => setSelected(null)}><section className="template-modal" onMouseDown={event => event.stopPropagation()}>
      <header><h3>{selected.title}</h3><div className="template-modal-tabs"><button className={modalMode === 'preview' ? 'active' : ''} onClick={() => setModalMode('preview')}><Eye/> Preview</button><button className={modalMode === 'workflow' ? 'active' : ''} onClick={() => setModalMode('workflow')}><ShareNetwork/> Workflow</button></div><div className="template-modal-actions"><button onClick={() => notify('Template guide opened.')}><BookOpen/> How it works</button><button onClick={() => notify('Share link copied.')}><ShareNetwork/></button><button aria-label="Close template" onClick={() => setSelected(null)}><X/></button></div></header>
      <div className="template-modal-body">
        <div className={`template-stage ${modalMode}`}>
          {modalMode === 'preview' ? <><video key={selected.id} src={selected.video} poster={selected.image} controls autoPlay muted loop playsInline/><div className="template-preview-input"><span>INPUT</span><b>Offer image</b><img src={selected.image}/></div><div className="template-preview-label"><Play weight="fill"/><span><b>{selected.duration} viral structure</b><small>{selected.theme}</small></span></div></> : <><ReactFlow nodes={workflowNodes} edges={workflowEdges} nodeTypes={templateNodeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} panOnScroll minZoom={0.35} maxZoom={1.2}><Background color="#3a414c" gap={24} size={1}/><Controls showInteractive={false}/></ReactFlow><div className="template-readonly"><Eye/> You're viewing a read-only workflow.<button onClick={openInCanvas}>Open in Viral Canvas <ArrowRight/></button></div></>}
        </div>
        <aside className="template-input-panel"><span>RECREATE · {selected.industry.toUpperCase()}</span><h3>Add your offer</h3><button className="autofill-brand" onClick={() => {setAutofilled(true);notify('Offer and Brand Kit loaded from My Brand.');}}><Storefront/> {autofilled ? 'Loaded from My Brand' : 'Autofill from My Brand'} {autofilled && <Check/>}</button><div className="or-divider"><i></i><span>or</span><i></i></div><label>Offer image *</label><button className="template-upload" onClick={() => notify('Offer picker opened.')}><img src={selected.image}/><span><ImageIcon/><b>Choose from My Brand</b><small>product, service or local offer</small></span></button><label>Video theme *</label><select defaultValue={selected.theme}><option>{selected.theme}</option><option>Owner-led education</option><option>Before and after proof</option><option>Fast local recommendation</option></select><label>Character preference *</label><select defaultValue={selected.character}><option>{selected.character}</option><option>Business owner</option><option>AI presenter</option><option>No presenter</option></select><label>Language & CTA</label><select defaultValue="English · Book a visit"><option>English · Book a visit</option><option>Spanish · WhatsApp</option><option>English · Reserve now</option><option>English · Get directions</option></select><button className="template-generate" onClick={() => notify(`${selected.title} generation started.`)}><Sparkle weight="fill"/> Generate video <span>35 credits</span></button></aside>
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
  { id:'3', type:'flowNode', position:{x:370,y:380}, data:{kicker:'BRAND',label:'Add your offer',detail:'Weekend signature offer',icon:Package,status:'done'} },
  { id:'4', type:'flowNode', position:{x:690,y:120}, data:{kicker:'LOCALIZE',label:'Rewrite for market',detail:'Spanish · Downtown',icon:Globe} },
  { id:'5', type:'flowNode', position:{x:690,y:380}, data:{kicker:'PRESENTER',label:'Choose avatar',detail:'Owner clone or actor',icon:UserCircle} },
  { id:'6', type:'flowNode', position:{x:1020,y:250}, data:{kicker:'OUTPUT',label:'Generate 3 variants',detail:'9:16 · Meta + TikTok',icon:VideoCamera} }
];
const initialEdges = [
  {id:'e12',source:'1',target:'2'},{id:'e13',source:'1',target:'3'},
  {id:'e24',source:'2',target:'4'},{id:'e34',source:'3',target:'4'},
  {id:'e35',source:'3',target:'5'},{id:'e46',source:'4',target:'6'},{id:'e56',source:'5',target:'6'}
].map(e => ({...e, type:'smoothstep', animated:true, style:{stroke:'#2563eb',strokeWidth:1.5}}));

function CanvasPage({ notify, template }) {
  const seededNodes = useMemo(() => initialNodes.map(node => node.id === '1' && template ? {...node,data:{...node.data,label:template.title,detail:`${template.duration} template copied`,status:'done'}} : node), [template]);
  const [nodes, setNodes, onNodesChange] = useNodesState(seededNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [url, setUrl] = useState('');
  const addReference = () => {
    if (!url) return;
    setNodes(ns => ns.map(n => n.id === '1' ? {...n,data:{...n.data,detail:'New reference imported'}} : n));
    notify('Reference added to the viral workflow.'); setUrl('');
  };
  return <div className="canvas-page">
    <div className="canvas-toolbar"><div><span className="canvas-tag">{template ? 'TEMPLATE COPY' : 'VIRAL REPLICATION'}</span><b>{template ? template.title : 'Untitled workflow'}</b><small>Auto-saved</small></div><div><label><LinkSimple/><input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste TikTok / Reels URL"/><button onClick={addReference}>Analyze</button></label><button className="secondary"><Play/> Tutorial</button><button className="primary"><Sparkle/> Run workflow</button></div></div>
    <div className="canvas-body">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView minZoom={0.3} maxZoom={1.7}>
        <Background color="#dfe3e8" gap={22} size={1}/><Controls/><MiniMap nodeColor="#dbeafe" maskColor="rgba(248,250,252,.78)"/>
      </ReactFlow>
      <div className="canvas-palette"><button><Plus/></button><button title="Add text"><Article/></button><button title="Add image"><ImageIcon/></button><button title="Add video"><VideoCamera/></button><button title="Add avatar"><UserCircle/></button><button title="AI tool"><Sparkle/></button></div>
      <div className="canvas-help"><b>From viral reference to branded ad</b><p>Every node is editable. Add tools, branch variants and reuse the winning workflow.</p></div>
    </div>
  </div>;
}

function AvatarsPage({ notify }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('Sofia');
  const [cloneOpen, setCloneOpen] = useState(false);
  const filtered = actors.filter(a => a.join(' ').toLowerCase().includes(query.toLowerCase()));
  return <div className="page avatars-page">
    <PageTitle eyebrow="PRESENTER LIBRARY" title="Put a trusted face in every ad" copy="Choose a ready-to-use actor or clone the business owner to build local recognition without filming every week." action={<button className="primary" onClick={() => setCloneOpen(true)}><Plus/> Clone the owner</button>}/>
    <div className="avatar-methods">
      <button onClick={() => setCloneOpen(true)}><div><span>YOUR STRONGEST ASSET</span><h3>Clone the store owner</h3><p>Record once. Create owner-led videos in multiple languages while keeping consent and brand control.</p><b>Start owner clone <ArrowRight/></b></div><img src={images.presenter}/></button>
      <button><div><span>FASTEST START</span><h3>Choose an AI actor</h3><p>Use a ready presenter matched to your industry, market and ad style.</p><b>Browse 40+ actors <ArrowRight/></b></div><img src={images.sofia}/></button>
    </div>
    <div className="library-head"><div><h3>AI actors</h3><p>Realistic presenters for paid and organic content</p></div><label><MagnifyingGlass/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search actors, language, role"/></label></div>
    <div className="filter-chips"><button className="active">All actors</button><button>English</button><button>Spanish</button><button>Local business</button><button>Saved</button></div>
    <div className="actor-grid">{filtered.map(([name,role,locale,image], i) => <button className={selected === name ? 'selected' : ''} key={`${name}-${i}`} onClick={() => {setSelected(name); notify(`${name} selected for the next video.`);}}><div><img src={image}/>{selected === name && <i><Check/></i>}<span>{i < 3 ? 'POPULAR' : 'HD'}</span></div><b>{name}</b><small>{role}</small><p>{locale}</p></button>)}</div>
    {cloneOpen && <div className="modal-scrim"><div className="clone-modal"><button className="modal-close" onClick={() => setCloneOpen(false)}><X/></button><span>OWNER AVATAR</span><h2>Clone the owner, with consent built in.</h2><p>Upload a clear 2–5 minute recording. We create a reusable presenter and voice profile for this workspace only.</p><div className="clone-grid"><button><UploadSimple size={26}/><b>Upload owner video</b><small>MP4 or MOV · up to 500 MB</small></button><div><b>Before activation</b><p><CheckCircle/> Identity and consent confirmation</p><p><CheckCircle/> Voice usage approval</p><p><CheckCircle/> Workspace-only access</p></div></div><button className="primary clone-submit" onClick={() => {setCloneOpen(false);notify('Owner clone request saved.');}}>Continue to consent <ArrowRight/></button></div></div>}
  </div>;
}

function PerformancePage({ notify }) {
  const [connected, setConnected] = useState(['meta','tiktok']);
  const toggle = id => { setConnected(c => c.includes(id) ? c.filter(x => x !== id) : [...c,id]); notify(c => c); };
  const sources = [
    ['meta','Meta Ads',FacebookLogo,'Campaign, creative and message data'],
    ['tiktok','TikTok',TiktokLogo,'Organic and paid creative data'],
    ['whatsapp','WhatsApp',WhatsappLogo,'Qualified conversations and response time'],
    ['crm','Lead / CRM',Users,'Appointments, quotes and closed sales']
  ];
  return <div className="page performance-page">
    <PageTitle eyebrow="DATA ASSET" title="Know which creative creates visits and bookings" copy="SunADS connects content, spend, conversations and store outcomes. The system learns from your own data—not generic vanity metrics." action={<button className="secondary"><Clock/> Last 30 days</button>}/>
    <div className="kpi-grid"><article><span>Qualified leads</span><strong>184</strong><small className="up">+22.4% vs prior period</small></article><article><span>Cost per qualified lead</span><strong>$18.40</strong><small className="up">−12.6% improvement</small></article><article><span>Appointments booked</span><strong>37</strong><small>20.1% of qualified leads</small></article><article><span>Attributed revenue</span><strong>$42.8K</strong><small>2.9× estimated ROAS</small></article></div>
    <div className="performance-grid">
      <section className="performance-chart"><div className="card-head"><div><h3>Lead quality trend</h3><p>Spend compared with qualified enquiries</p></div><button><DotsThree/></button></div><div className="chart-area"><div className="chart-y"><span>60</span><span>40</span><span>20</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><path className="area" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25 L700 220 L0 220Z"/><path className="line" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25"/></svg><div className="chart-x"><span>Jul 21</span><span>Jul 28</span><span>Aug 4</span><span>Aug 11</span><span>Aug 18</span></div></div></section>
      <aside className="data-sources"><div className="card-head"><div><h3>Data sources</h3><p>Connect the full customer journey</p></div></div>{sources.map(([id,name,Icon,desc]) => <button key={id} onClick={() => toggle(id)}><i><Icon/></i><span><b>{name}</b><small>{desc}</small></span>{connected.includes(id) ? <em><Check/> Connected</em> : <strong>Connect</strong>}</button>)}</aside>
    </div>
    <div className="insight-card"><div className="insight-icon"><Sparkle weight="fill"/></div><div><span>PERFORMANCE AGENT</span><h3>Owner-led local offer videos are producing 41% more qualified WhatsApp conversations.</h3><p>Recommendation: create three new variants using the same hook and increase budget only after appointment quality is confirmed.</p></div><button onClick={() => notify('Recommendation added to the next creative sprint.')}>Create variants <ArrowRight/></button></div>
    <section className="creative-table"><div className="card-head"><div><h3>Creative performance</h3><p>Ranked by qualified lead efficiency</p></div><button>View all</button></div><div className="table-row table-header"><span>Creative</span><span>Channel</span><span>Spend</span><span>Qualified leads</span><span>Cost / lead</span><span>Action</span></div>{[
      [images.presenter,'Owner explains the weekend offer','Meta','$1,280','83','$15.42'],
      [images.kitchen,'Signature dish visit hook','TikTok','$740','39','$18.97'],
      [images.patio,'Beauty transformation booking','Meta','$920','41','$22.44']
    ].map((r,i) => <div className="table-row" key={r[1]}><span className="creative-name"><img src={r[0]}/><b>{r[1]}</b></span>{r.slice(2).map((x,j)=><span key={j}>{x}</span>)}<span><button><ArrowRight/></button></span></div>)}</section>
  </div>;
}

function ServicePage({ notify }) {
  return <div className="page service-page"><PageTitle eyebrow="DONE-FOR-YOU" title="Need more volume? Our creative team can run the workflow." copy="Use the same SunADS workspace for strategy, briefs, review and approval. You keep the data, assets and winning workflows." action={<button className="primary" onClick={() => notify('Strategy call request saved.')}>Book a strategy call</button>}/>
    <section className="service-hero"><div><span>CREATIVE SPRINT</span><h3>25–100 short videos per month</h3><p>AI creative specialists handle concepting, scripts, localization, avatar direction and production—optimized around your real performance data.</p><div className="service-stats"><span><b>48 hours</b><small>first concepts</small></span><span><b>Weekly</b><small>delivery cadence</small></span><span><b>1 workspace</b><small>brief, review, data</small></span></div><button className="primary">Start a pilot sprint <ArrowRight/></button></div><div className="sample-stack"><img src={images.presenter}/><img src={images.kitchen}/><img src={images.patio}/><span>DEMO SAMPLE · 9:16</span></div></section>
    <div className="sample-title"><div><h3>Sample directions</h3><p>Illustrative concepts for restaurants, salons, clinics, retailers and showrooms</p></div></div><div className="sample-grid">{[[images.presenter,'Owner-led local offer','Trust + booking'],[images.kitchen,'Product or service proof','Detail + visit CTA'],[images.patio,'Problem / solution','Local expertise + action']].map(x=><article key={x[1]}><div><img src={x[0]}/><button><Play weight="fill"/></button></div><b>{x[1]}</b><span>{x[2]}</span></article>)}</div>
  </div>;
}

const calendarContent = [
  {day:2,time:'10:00',title:'Why homeowners delay this decision',format:'Owner video',channel:'TikTok',owner:'Maya',status:'Approved',theme:'Expose the pain'},
  {day:4,time:'18:30',title:'Three details that change the final result',format:'Carousel',channel:'Instagram',owner:'Noah',status:'Draft',theme:'Educate'},
  {day:6,time:'12:00',title:'Weekend showroom invitation',format:'Offer video',channel:'Facebook',owner:'Maya',status:'Scheduled',theme:'Visit CTA'},
  {day:9,time:'09:30',title:'Before and after: small-space upgrade',format:'Transformation',channel:'TikTok',owner:'Liam',status:'In review',theme:'Proof'},
  {day:11,time:'17:00',title:'Material comparison in 20 seconds',format:'Owner video',channel:'Facebook',owner:'Noah',status:'Approved',theme:'Feature deep dive'},
  {day:15,time:'11:30',title:'What a complete project really costs',format:'Talking head',channel:'Instagram',owner:'Maya',status:'Draft',theme:'Proof of ROI'},
  {day:18,time:'19:00',title:'Customer story: from enquiry to install',format:'Testimonial',channel:'TikTok',owner:'Liam',status:'Scheduled',theme:'Proof'},
  {day:23,time:'10:30',title:'Last slots for the September offer',format:'Offer video',channel:'Facebook',owner:'Maya',status:'Approved',theme:'Direct conversion'},
  {day:27,time:'16:00',title:'Meet the team behind every project',format:'Behind the scenes',channel:'Instagram',owner:'Noah',status:'Idea',theme:'Trust'}
];

function MarketingCalendarPage({ setPage, notify }) {
  const [view, setView] = useState('month');
  const [selected, setSelected] = useState(calendarContent[0]);
  const [planning, setPlanning] = useState(false);
  const generatePlan = () => {
    setPlanning(true);
    setTimeout(() => { setPlanning(false); notify('A 4-week content strategy was generated from My Brand.'); }, 900);
  };
  const weekThemes = [
    ['Week 1','Expose the pain','Help local customers recognize the problem'],
    ['Week 2','Feature deep dive','Turn expertise into useful education'],
    ['Week 3','Proof of ROI','Show outcomes, proof and customer trust'],
    ['Week 4','Direct conversion','Create urgency for visits and bookings']
  ];
  return <div className="page calendar-page">
    <PageTitle eyebrow="LITE · CONTENT OPERATIONS" title="Marketing Calendar" copy="Plan one month of local content from your brand assets, then create, assign, approve and publish from one operating view." action={<div className="calendar-actions"><button className="secondary" onClick={() => setPage('brand')}><Buildings/> Review My Brand</button><button className="primary" onClick={generatePlan}>{planning ? <SpinnerGap className="spin"/> : <Strategy/>} Generate 4-week plan</button></div>}/>
    <section className="strategy-overview">
      <div className="strategy-title"><span>SEPTEMBER STRATEGY</span><h3>Turn expertise into measurable showroom visits.</h3><p>Built from My Brand, active offers, local market and current publishing capacity.</p></div>
      <div className="strategy-facts"><div><span>Posting frequency</span><b>10 posts / week</b><small>Optimized</small></div><div><span>Platforms</span><b>Facebook · TikTok · Instagram</b></div><div><span>Goal</span><b>Qualified conversations and visits</b></div><div><span>Media mix</span><b>Video 6 · Image 2 · Carousel 2</b></div></div>
      <div className="week-theme-row">{weekThemes.map(([week,title,copy],index) => <article key={week}><i>{index+1}</i><div><span>{week}</span><b>{title}</b><small>{copy}</small></div></article>)}</div>
    </section>
    <section className="calendar-workspace">
      <div className="calendar-main">
        <header><div><button><CaretDown/></button><h3>September 2026</h3><span>9 planned pieces</span></div><div className="view-switch"><button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Month</button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>List</button></div></header>
        {view === 'month' ? <><div className="calendar-weekdays">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{Array.from({length:35},(_,index) => {const day = index - 1; const items = calendarContent.filter(item => item.day === day); return <div className={`calendar-cell ${day < 1 || day > 30 ? 'muted' : ''}`} key={index}><span>{day > 0 && day <= 30 ? day : day <= 0 ? 31 + day : day - 30}</span>{items.map(item => <button key={item.title} className={`calendar-item ${item.status.toLowerCase().replace(' ','-')}`} onClick={() => setSelected(item)}><i></i><b>{item.title}</b><small>{item.time} · {item.channel}</small></button>)}</div>})}</div></> : <div className="calendar-list">{calendarContent.map(item => <button key={item.title} onClick={() => setSelected(item)}><span>SEP <b>{item.day}</b></span><div><b>{item.title}</b><small>{item.format} · {item.channel} · {item.time}</small></div><em>{item.owner}</em><i>{item.status}</i><ArrowRight/></button>)}</div>}
      </div>
      <aside className="calendar-inspector">
        <span>CONTENT BRIEF</span><h3>{selected.title}</h3><p>{selected.theme} · designed to move a local customer toward a measurable action.</p>
        <div className="brief-preview"><img src={selected.format.includes('Owner') || selected.format.includes('Talking') ? images.presenter : images.kitchen}/><button><Play weight="fill"/></button></div>
        <dl><div><dt>Status</dt><dd>{selected.status}</dd></div><div><dt>Owner</dt><dd>{selected.owner}</dd></div><div><dt>Channel</dt><dd>{selected.channel}</dd></div><div><dt>Publish</dt><dd>Sep {selected.day} · {selected.time}</dd></div></dl>
        <label>Local CTA<select defaultValue="Book a showroom visit"><option>Book a showroom visit</option><option>Start a WhatsApp chat</option><option>Get directions</option></select></label>
        <button className="primary" onClick={() => setPage('agent')}><Sparkle/> Create this content</button><button className="secondary" onClick={() => notify('Content assigned to the selected employee.')}><Users/> Assign employee</button>
      </aside>
    </section>
  </div>;
}

function PublishingPage({ notify }) {
  const [selectedAccounts, setSelectedAccounts] = useState(['fb-madrid','tt-madrid']);
  const [scheduled, setScheduled] = useState(false);
  const accounts = [
    ['fb-madrid','Casa Luma Madrid','Facebook Page',FacebookLogo,'Connected'],
    ['ig-madrid','@casaluma.madrid','Instagram Business',InstagramLogo,'Connected'],
    ['tt-madrid','@casaluma_showroom','TikTok Business',TiktokLogo,'Connected'],
    ['fb-valencia','Casa Luma Valencia','Facebook Page',FacebookLogo,'Reconnect']
  ];
  const toggleAccount = id => setSelectedAccounts(items => items.includes(id) ? items.filter(item => item !== id) : [...items,id]);
  return <div className="page publishing-page">
    <PageTitle eyebrow="LITE · DISTRIBUTION" title="Publishing" copy="Connect business accounts, prepare platform-specific versions and publish one campaign across multiple stores without sharing passwords." action={<button className="primary" onClick={() => notify('Account connection flow opened.')}><Plus/> Connect account</button>}/>
    <div className="publishing-layout">
      <section className="account-panel"><div className="panel-head"><div><h3>Connected accounts</h3><p>Select the accounts used for this campaign.</p></div><button>Manage</button></div><div className="account-list">{accounts.map(([id,name,type,Icon,status]) => <button className={selectedAccounts.includes(id) ? 'selected' : ''} key={id} onClick={() => toggleAccount(id)}><i><Icon/></i><span><b>{name}</b><small>{type}</small></span><em className={status === 'Connected' ? 'ok' : ''}>{status}</em><strong>{selectedAccounts.includes(id) && <Check/>}</strong></button>)}</div><div className="account-note"><ShieldCheck/><span><b>Workspace-owned access</b><small>Employees receive publishing permission without seeing account credentials.</small></span></div></section>
      <section className="publish-composer"><div className="panel-head"><div><h3>Schedule campaign</h3><p>Platform fields stay editable before publishing.</p></div><span>3 variants</span></div><div className="publish-preview"><img src={images.presenter}/><div><span>VERTICAL VIDEO · 20 SEC</span><h3>Three details that change your renovation result.</h3><p>Visit Casa Luma this weekend for a practical material comparison with our local team.</p><div><b>#MadridInteriors</b><b>#HomeRenovation</b><b>#ShowroomVisit</b></div></div></div><div className="publish-settings"><label>Publish date<input type="date" defaultValue="2026-09-06"/></label><label>Local time<input type="time" defaultValue="18:30"/></label><label>Assigned employee<select defaultValue="Maya Chen"><option>Maya Chen</option><option>Noah Williams</option><option>Liam Garcia</option></select></label></div><div className="platform-checks"><span><FacebookLogo/> Facebook copy ready <CheckCircle weight="fill"/></span><span><InstagramLogo/> Instagram cover ready <CheckCircle weight="fill"/></span><span><TiktokLogo/> TikTok caption ready <CheckCircle weight="fill"/></span></div><button className="publish-button" onClick={() => {setScheduled(true);notify('Campaign scheduled for selected business accounts.');}}>{scheduled ? <><CheckCircle weight="fill"/> Scheduled for Sep 6</> : <><CalendarCheck/> Schedule to {selectedAccounts.length} accounts</>}</button></section>
      <aside className="publish-queue"><div className="panel-head"><div><h3>Publishing queue</h3><p>Next seven days</p></div></div>{[
        ['Today · 18:30','Weekend showroom invitation','3 accounts','Ready'],['Sep 9 · 09:30','Before and after reveal','2 accounts','In review'],['Sep 11 · 17:00','Material comparison','3 accounts','Ready']
      ].map(item => <article key={item[1]}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small><em>{item[3]}</em></article>)}</aside>
    </div>
  </div>;
}

function TeamPage({ notify }) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const team = [
    ['Maya Chen','Marketing manager','Madrid showroom','24','61','14','$18.20','Admin'],
    ['Noah Williams','Content creator','Madrid showroom','18','39','8','$22.80','Creator'],
    ['Liam Garcia','Sales advisor','Valencia showroom','11','32','10','$15.60','Creator'],
    ['Emma Davis','Store owner','All locations','6','18','7','$12.40','Owner']
  ];
  return <div className="page team-page">
    <PageTitle eyebrow="PRO · TEAM OPERATIONS" title="Team" copy="Give every employee a clear role, publishing access and measurable local-acquisition responsibility." action={<button className="primary" onClick={() => setInviteOpen(true)}><UserPlus/> Add employee</button>}/>
    <div className="team-kpis"><article><span>Active employees</span><b>4</b><small>2 locations</small></article><article><span>Assigned this week</span><b>15</b><small>12 completed</small></article><article><span>Qualified leads</span><b>150</b><small>Attributed by employee</small></article><article><span>Appointments</span><b>39</b><small>26% lead-to-booking</small></article></div>
    <section className="team-table"><header><div><h3>Employee acquisition performance</h3><p>Content output is shown beside controllable lead and booking outcomes.</p></div><button><Clock/> Last 30 days</button></header><div className="team-row team-header"><span>Employee</span><span>Published</span><span>Qualified leads</span><span>Appointments</span><span>Cost / lead</span><span>Access</span><span></span></div>{team.map(([name,role,location,published,leads,appointments,cpl,access],index) => <div className="team-row" key={name}><span className="employee-name"><i>{name.split(' ').map(x=>x[0]).join('')}</i><span><b>{name}</b><small>{role} · {location}</small></span></span><span>{published}</span><span><b>{leads}</b></span><span>{appointments}</span><span>{cpl}</span><span><em>{access}</em></span><span><button onClick={() => notify(`${name} performance detail opened.`)}><ArrowRight/></button></span></div>)}</section>
    <section className="approval-strip"><ShieldCheck/><div><span>APPROVAL WORKFLOW</span><h3>Creators submit. Managers approve. Only approved content can publish.</h3><p>Every edit, assignment and publishing action stays visible in the workspace audit trail.</p></div><button onClick={() => notify('Approval rules opened.')}>Configure rules <ArrowRight/></button></section>
    {inviteOpen && <div className="brand-modal-backdrop" onMouseDown={() => setInviteOpen(false)}><form className="brand-modal" onMouseDown={event => event.stopPropagation()} onSubmit={event => {event.preventDefault();setInviteOpen(false);notify('Employee invitation sent.');}}><div><span>PRO · TEAM</span><h3>Invite an employee</h3><button type="button" onClick={() => setInviteOpen(false)}><X/></button></div><label>Work email<input placeholder="employee@company.com"/></label><label>Role<select defaultValue="Creator"><option>Creator</option><option>Marketing manager</option><option>Viewer</option></select></label><label>Assigned location<select defaultValue="Madrid showroom"><option>Madrid showroom</option><option>Valencia showroom</option><option>All locations</option></select></label><footer><button type="button" onClick={() => setInviteOpen(false)}>Cancel</button><button className="primary" type="submit">Send invitation</button></footer></form></div>}
  </div>;
}

function LeadsPage({ notify }) {
  const leads = [
    ['Carla Ruiz','WhatsApp','Material comparison','Maya Chen','Visit booked','Today · 10:42'],
    ['Mateo Santos','TikTok form','Before & after reveal','Liam Garcia','Qualified','Today · 09:18'],
    ['Sofia Martin','Facebook message','Weekend showroom offer','Noah Williams','New','Yesterday · 18:07'],
    ['Daniel Vega','QR code','Owner expert video','Emma Davis','Visited','Yesterday · 16:32']
  ];
  return <div className="page leads-page"><PageTitle eyebrow="PLUS · ATTRIBUTION" title="Leads" copy="Connect every customer conversation to the content, account, store and employee that created it." action={<button className="primary" onClick={() => notify('Lead source connection opened.')}><Plus/> Connect lead source</button>}/><div className="lead-funnel">{[['Reach','186K'],['Profile visits','4,820'],['Conversations','426'],['Qualified','184'],['Visits booked','37'],['Sales','12']].map((item,index)=><article key={item[0]}><span>{index+1}</span><div><b>{item[1]}</b><small>{item[0]}</small></div>{index<5&&<ArrowRight/>}</article>)}</div><section className="lead-table"><header><div><h3>Attributed conversations</h3><p>UTM links, WhatsApp entry points, forms, QR codes and CRM outcomes.</p></div><button><Funnel/> Filter</button></header><div className="lead-row lead-header"><span>Customer</span><span>Source</span><span>Content</span><span>Employee</span><span>Status</span><span>Received</span></div>{leads.map(row=><div className="lead-row" key={row[0]}>{row.map((cell,index)=><span key={cell} className={index===4?cell.toLowerCase().replace(' ','-'):''}>{index===0?<b>{cell}</b>:cell}</span>)}</div>)}</section><div className="attribution-note"><Database/><div><b>Attribution confidence: 86%</b><small>Direct links and form IDs are deterministic. View-through and offline sales remain modeled until CRM matching is connected.</small></div><button>Review data quality</button></div></div>;
}

function MyBrandPage({ product, notify }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editOpen, setEditOpen] = useState(false);
  const [socialUrl, setSocialUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [importedSource, setImportedSource] = useState(null);
  const [brandInfo, setBrandInfo] = useState({ name:'Luma Local', market:'Downtown, USA', languages:'English, Spanish', category:'Local home & lifestyle' });
  const importSocialProfile = () => {
    if (!socialUrl.trim()) return notify('Paste a Facebook, Instagram or TikTok profile URL.');
    setImporting(true);
    setTimeout(() => {
      const source = socialUrl.toLowerCase().includes('tiktok') ? 'TikTok' : socialUrl.toLowerCase().includes('instagram') ? 'Instagram' : 'Facebook';
      setBrandInfo({ name:'Casa Luma Interiors', market:'Madrid, Spain', languages:'Spanish, English', category:'Home renovation showroom' });
      setImportedSource(source);
      setImporting(false);
      notify(`${source} profile analyzed. Brand fields are ready to review.`);
    }, 850);
  };
  const tabs = [
    ['overview','Overview'], ['products','Offers'], ['avatars','Avatars'],
    ['voices','Voices'], ['assets','Asset Library'], ['kit','Brand Kit']
  ];
  const brandProducts = [
    product || {name:'Weekend Signature Offer',category:'Seasonal promotion',image:images.kitchen},
    {name:'New Customer Trial',category:'Booking offer',image:images.patio},
    {name:'Premium Service Package',category:'Service bundle',image:images.bath}
  ];
  const brandActors = actors.slice(0, 6);
  const brandVoices = [
    ['Luma Owner · English','Warm, practical and confident','US English'],
    ['Luma Owner · Spanish','Clear local consultation','Latin American Spanish'],
    ['Sofia · English','Friendly service educator','US English'],
    ['Daniel · Portuguese','Experienced local business host','Brazilian Portuguese']
  ];
  const brandAssets = [
    [images.kitchen,'Weekend offer hero','Campaign image'],
    [images.presenter,'Owner introduction footage','Source video'],
    [images.patio,'Customer experience proof','Offer image'],
    [images.bath,'Premium service detail','Campaign image'],
    [images.avatar,'Lifestyle presenter','Avatar reference'],
    [images.sofia,'Sofia UGC presenter','Avatar reference']
  ];
  const stats = [
    ['products','3','Offers',Package], ['avatars','6','Avatars',UserCircle],
    ['voices','4','Voices',Microphone], ['assets','18','Assets',ImageIcon],
    ['kit','Ready','Brand Kit',MagicWand]
  ];
  const openAdd = label => notify(`${label} workflow opened.`);

  const sectionHead = (title, copy, actionLabel) => <div className="brand-section-head"><div><h3>{title}</h3><p>{copy}</p></div>{actionLabel && <button onClick={() => openAdd(actionLabel)}><Plus/> {actionLabel}</button>}</div>;
  const productGrid = <div className="my-brand-product-grid">{brandProducts.map(item => <article key={item.name}><img src={item.image}/><div><span>{item.category}</span><b>{item.name}</b><button onClick={() => notify(`${item.name} selected.`)}><ArrowRight/></button></div></article>)}</div>;
  const avatarGrid = <div className="my-brand-avatar-grid"><button className="owner-clone-card" onClick={() => openAdd('Clone store owner')}><div><Users/><span><b>Clone the store owner</b><small>Create a consent-based presenter for every market.</small></span></div><ArrowRight/></button>{brandActors.map(([name,role,languages,image]) => <article key={name}><img src={image}/><div><b>{name}</b><small>{role}</small><span>{languages}</span></div></article>)}</div>;
  const voiceList = <div className="my-brand-voice-list">{brandVoices.map(([name,copy,language],index) => <article key={name}><button className="voice-play" onClick={() => notify(`Playing ${name} sample.`)}><Play weight="fill"/></button><div><b>{name}</b><small>{copy}</small></div><span>{language}</span><button onClick={() => notify(`${name} is now the default voice.`)}>Use voice</button></article>)}</div>;
  const assetGrid = <div className="my-brand-asset-grid"><button className="brand-upload" onClick={() => openAdd('Upload assets')}><UploadSimple/><b>Upload brand assets</b><small>Images, video, logos or documents</small></button>{brandAssets.map(([image,name,type]) => <article key={name}><img src={image}/><div><b>{name}</b><small>{type}</small></div></article>)}</div>;

  return <div className="page my-brand-page">
    <section className="brand-import-card">
      <div className="brand-import-copy"><span>SOCIAL PROFILE IMPORT</span><h2>Build My Brand from what you already publish.</h2><p>Paste a Facebook, Instagram or TikTok business profile. SunADS extracts the business category, market, services, visual style, tone and reusable media for your review.</p><div className="supported-socials"><FacebookLogo/><InstagramLogo/><TiktokLogo/><span>Business profiles</span></div></div>
      <div className="brand-import-action">
        <label><LinkSimple/><input value={socialUrl} onChange={event => setSocialUrl(event.target.value)} onKeyDown={event => event.key === 'Enter' && importSocialProfile()} placeholder="Paste a social profile URL"/><button disabled={importing || !socialUrl.trim()} onClick={importSocialProfile}>{importing ? <SpinnerGap className="spin"/> : 'Import profile'}</button></label>
        {importedSource ? <div className="import-success"><CheckCircle weight="fill"/><div><b>{importedSource} profile imported</b><small>14 posts, 3 offers and a consistent brand tone found.</small></div><button onClick={() => setActiveTab('assets')}>Review assets <ArrowRight/></button></div> : <small>Prototype preview: no login or password is requested.</small>}
      </div>
    </section>
    <section className="brand-space-card">
      <div className="brand-space-avatar">LL</div>
      <div className="brand-space-copy"><span>BRAND WORKSPACE</span><h2>{brandInfo.name} Brand Space</h2><p><Users/> 3 team members <i></i><MapPin/> {brandInfo.market} <i></i><Globe/> {brandInfo.languages}</p></div>
      <button className="brand-edit" onClick={() => setEditOpen(true)}><FileText/> Edit brand info</button>
    </section>

    <div className="brand-stats">{stats.map(([id,value,label,Icon]) => <button key={id} onClick={() => setActiveTab(id)} className={activeTab === id ? 'active' : ''}><Icon/><span><b>{value}</b><small>{label}</small></span><ArrowRight/></button>)}</div>

    <nav className="brand-tabs" aria-label="Brand workspace sections">{tabs.map(([id,label]) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>{label}</button>)}</nav>

    <section className="brand-tab-content">
      {activeTab === 'overview' && <>
        {sectionHead('Offers & services','Products, services and promotions available to every SunADS workflow.','Add offer')}
        {productGrid}
        <div className="brand-overview-split">
          <section>{sectionHead('Brand Kit','The rules SunADS uses to keep every creative consistent.')}
            <div className="brand-kit-summary"><div><Storefront/><span><b>Trusted local business positioning</b><small>Clear expertise, convenient booking and fast WhatsApp response.</small></span></div><div className="brand-colors"><i></i><i></i><i></i><span>3 brand colors</span></div><button onClick={() => setActiveTab('kit')}>Open Brand Kit <ArrowRight/></button></div>
          </section>
          <section>{sectionHead('Presenters & voices','The people and voices approved to represent the brand.')}
            <div className="brand-people-summary"><div className="people-stack">{brandActors.slice(0,3).map(actor => <img key={actor[0]} src={actor[3]}/>)}</div><div><b>6 approved avatars</b><small>Including an owner-clone workflow</small></div><button onClick={() => setActiveTab('avatars')}>Manage <ArrowRight/></button></div>
            <div className="brand-people-summary"><div className="voice-summary-icon"><Microphone/></div><div><b>4 approved voices</b><small>English, Spanish and Portuguese</small></div><button onClick={() => setActiveTab('voices')}>Manage <ArrowRight/></button></div>
          </section>
        </div>
      </>}
      {activeTab === 'products' && <>{sectionHead('Offers & services','Import products, services, promotions and proof points for accurate creative.','Add offer')}{productGrid}</>}
      {activeTab === 'avatars' && <>{sectionHead('Avatars','Approved AI actors and the store-owner digital twin.','Add avatar')}{avatarGrid}</>}
      {activeTab === 'voices' && <>{sectionHead('Voices','Approved voices, languages and brand delivery styles.','Add voice')}{voiceList}</>}
      {activeTab === 'assets' && <>{sectionHead('Asset Library','Reusable offer photography, footage, logos and campaign files.')}{assetGrid}</>}
      {activeTab === 'kit' && <>
        {sectionHead('Brand Kit','Define the visual and verbal system behind every generated ad.','Edit Brand Kit')}
        <div className="brand-kit-grid">
          <article><span>LOGO</span><div className="brand-logo-preview"><div className="brand-space-avatar">LL</div><b>Luma Local</b></div><button onClick={() => openAdd('Upload logo')}>Replace logo</button></article>
          <article><span>COLORS</span><div className="brand-palette"><i>#1769FF</i><i>#101114</i><i>#F4F6F8</i></div><button onClick={() => openAdd('Edit colors')}>Edit colors</button></article>
          <article><span>TYPOGRAPHY</span><div className="brand-type-preview"><b>Inter Bold</b><small>Inter Regular · Aa Bb Cc 123</small></div><button onClick={() => openAdd('Edit typography')}>Edit typography</button></article>
          <article><span>BRAND VOICE</span><div className="brand-tone-tags"><b>Clear</b><b>Practical</b><b>Trustworthy</b><b>Local expert</b></div><button onClick={() => openAdd('Edit brand voice')}>Edit voice</button></article>
        </div>
      </>}
    </section>

    {editOpen && <div className="brand-modal-backdrop" onMouseDown={() => setEditOpen(false)}><form className="brand-modal" onMouseDown={event => event.stopPropagation()} onSubmit={event => {event.preventDefault();setEditOpen(false);notify('Brand information saved.');}}><div><span>MY BRAND</span><h3>Edit brand information</h3><button type="button" onClick={() => setEditOpen(false)}><X/></button></div><label>Brand name<input value={brandInfo.name} onChange={event => setBrandInfo({...brandInfo,name:event.target.value})}/></label><label>Primary market<input value={brandInfo.market} onChange={event => setBrandInfo({...brandInfo,market:event.target.value})}/></label><label>Languages<input value={brandInfo.languages} onChange={event => setBrandInfo({...brandInfo,languages:event.target.value})}/></label><label>Business category<input value={brandInfo.category} onChange={event => setBrandInfo({...brandInfo,category:event.target.value})}/></label><label>Primary conversion goal<input defaultValue="Book a visit or appointment on WhatsApp"/></label><footer><button type="button" onClick={() => setEditOpen(false)}>Cancel</button><button className="primary" type="submit">Save brand</button></footer></form></div>}
  </div>;
}

function SimplePage({ page, product, setPage }) {
  const config = {
    projects:['Projects','Everything created for this workspace lives here.'],
    assets:['Assets','Offers, photos, videos, logos and voice profiles.'],
    channels:['Social accounts','Connect distribution and outcome data.']
  }[page];
  return <div className="page simple-page"><PageTitle title={config[0]} copy={config[1]} action={<button className="primary"><Plus/> Add new</button>}/>
    {page === 'projects' && <div className="project-grid">{[[images.presenter,'Owner offer pilot','Video · Ready'],[images.kitchen,'Weekend restaurant campaign','Viral workflow · Draft'],[images.patio,'Beauty booking launch','Image pack · Ready']].map(x => <article key={x[1]}><img src={x[0]}/><div><b>{x[1]}</b><small>{x[2]}</small></div></article>)}</div>}
    {page === 'assets' && <div className="asset-grid"><button className="add-asset"><Plus/><b>Add offer or asset</b></button>{product && <article><img src={product.image}/><div><b>{product.name}</b><small>Offer · Imported</small></div></article>}{[[images.bath,'Premium service detail','Reference'],[images.presenter,'Owner footage','Video'],[images.patio,'Customer proof','Offer']].map(x=><article key={x[1]}><img src={x[0]}/><div><b>{x[1]}</b><small>{x[2]}</small></div></article>)}</div>}
    {page === 'channels' && <div className="channel-grid">{[[FacebookLogo,'Facebook & Instagram','Connected'],[TiktokLogo,'TikTok Business','Connected'],[WhatsappLogo,'WhatsApp Business','Connect'],[Users,'Lead / CRM','Connect']].map(([Icon,name,status])=><article key={name}><i><Icon/></i><div><b>{name}</b><small>{status === 'Connected' ? 'Data syncing normally' : 'Add customer outcome data'}</small></div><button className={status === 'Connected'?'connected':''}>{status}</button></article>)}</div>}
  </div>;
}

export function App() {
  const [page, setPage] = useState('home');
  const [menuPinned, setMenuPinned] = useState(true);
  const [menuHovered, setMenuHovered] = useState(false);
  const menuExpanded = menuPinned || menuHovered;
  const [tier, setTier] = useState(() => window.localStorage.getItem('sunads-tier') || 'lite');
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('sunads-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [product, setProduct] = useState(null);
  const [canvasTemplate, setCanvasTemplate] = useState(null);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('sunads-theme', theme);
  }, [theme]);
  useEffect(() => { window.localStorage.setItem('sunads-tier', tier); }, [tier]);
  const notify = message => { setNotice(typeof message === 'string' ? message : 'Updated.'); setTimeout(() => setNotice(''), 2600); };
  const content = useMemo(() => {
    if (page === 'home') return <HomePage product={product} setProduct={setProduct} setPage={setPage} notify={notify}/>;
    if (page === 'agent') return <AgentPage product={product} setPage={setPage} notify={notify}/>;
    if (page === 'templates') return <TemplatesPage setPage={setPage} setCanvasTemplate={setCanvasTemplate} notify={notify}/>;
    if (page === 'canvas') return <CanvasPage notify={notify} template={canvasTemplate}/>;
    if (page === 'avatars') return <AvatarsPage notify={notify}/>;
    if (page === 'brand') return <MyBrandPage product={product} notify={notify}/>;
    if (page === 'calendar') return <MarketingCalendarPage setPage={setPage} notify={notify}/>;
    if (page === 'publishing') return <PublishingPage notify={notify}/>;
    if (page === 'team') return <TeamPage notify={notify}/>;
    if (page === 'performance') return <PerformancePage notify={notify}/>;
    if (page === 'leads') return <LeadsPage notify={notify}/>;
    if (page === 'service') return <ServicePage notify={notify}/>;
    return <SimplePage page={page} product={product} setPage={setPage}/>;
  }, [page, product, canvasTemplate]);
  return <div className={`app-shell ${menuPinned ? 'sidebar-open' : 'sidebar-collapsed'}`}><Sidebar page={page} setPage={setPage} expanded={menuExpanded} pinned={menuPinned} setPinned={setMenuPinned} setHovered={setMenuHovered} theme={theme} setTheme={setTheme} tier={tier} setTier={setTier}/><main>{content}</main>{notice && <div className="toast"><CheckCircle weight="fill"/>{notice}</div>}</div>;
}
