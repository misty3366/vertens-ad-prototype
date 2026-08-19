import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Article, BookOpen, BookmarkSimple, Buildings, ChartLineUp, Check, CheckCircle,
  CaretDown, CaretUp, CirclesFour, Clock, Code, Copy, CursorClick, Database, DotsThree,
  Eye, FacebookLogo, FileText, Fire, FolderSimple, Globe, House, Image as ImageIcon,
  InstagramLogo, LinkSimple, MagicWand, MagnifyingGlass, MapPin, Microphone,
  Package, PaperPlaneTilt, Play, Plus, Robot, ShareNetwork, Sparkle,
  SpinnerGap, Storefront, Target, TiktokLogo, TrendUp, UploadSimple,
  SidebarSimple, UserCircle, Users, VideoCamera, WhatsappLogo, X
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

const navigation = [
  { section: 'Workspace', items: [
    ['home', 'Home', House], ['projects', 'Projects', FolderSimple],
    ['brand', 'My Brand', Buildings], ['assets', 'Assets', Package]
  ]},
  { section: 'Create', items: [
    ['agent', 'AI Agent', Sparkle], ['templates', 'Templates', Article], ['canvas', 'Viral Canvas', ShareNetwork],
    ['avatars', 'AI Avatars', UserCircle], ['service', 'Creative Service', VideoCamera]
  ]},
  { section: 'Growth', items: [
    ['performance', 'Performance', ChartLineUp], ['channels', 'Social accounts', CirclesFour]
  ]}
];

const actors = [
  ['Sofia', 'Showroom host', 'English · Spanish', images.sofia],
  ['Maya', 'Kitchen advisor', 'English · French', images.avatar],
  ['Daniel', 'Renovation expert', 'English · Portuguese', images.presenter],
  ['Amelia', 'Design presenter', 'English · German', images.sofia],
  ['Luis', 'Store owner', 'Spanish · English', images.presenter],
  ['Nina', 'Lifestyle creator', 'English · Italian', images.avatar],
  ['Chloe', 'Stone specialist', 'English · French', images.sofia],
  ['Marcus', 'Contractor voice', 'English · Spanish', images.presenter]
];

const tools = [
  ['URL to video', LinkSimple, 'Turn any product page into a short ad'],
  ['Image generation', ImageIcon, 'Create product scenes and ad images'],
  ['Video generation', VideoCamera, 'Text or image to short video'],
  ['Viral script', Article, 'Extract, rewrite and localize hooks'],
  ['Avatar video', UserCircle, 'Create presenter-led product videos'],
  ['Translate', Globe, 'Localize copy, voice and captions'],
  ['Background edit', MagicWand, 'Remove, replace or extend a scene'],
  ['Voiceover', Microphone, 'Natural voices in 28+ languages']
];

function Logo() {
  return <div className="logo"><span className="logo-sun">S</span><strong>SunADS</strong></div>;
}

function Sidebar({ page, setPage, expanded, setExpanded }) {
  return <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
    <Logo />
    <button className="sidebar-toggle" aria-label={expanded ? 'Collapse menu' : 'Expand menu'} title={expanded ? 'Collapse menu' : 'Expand menu'} onClick={() => setExpanded(!expanded)}><SidebarSimple size={19}/></button>
    <nav>
      {navigation.map(group => <div className="nav-group" key={group.section}>
        <span>{group.section}</span>
        {group.items.map(([id, label, Icon]) => <button key={id} aria-label={label} title={label} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>
          <Icon size={20} weight={page === id ? 'fill' : 'regular'} /><b>{label}</b>
          {id === 'performance' && <i>Beta</i>}
        </button>)}
      </div>)}
    </nav>
    <div className="sidebar-footer">
      <button className="help"><span>?</span><div><b>Need help?</b><small>Talk to our team</small></div></button>
      <a className="legacy-link" href="/legacy/index.html" title="Return to previous version" aria-label="Return to previous version"><span>S</span></a>
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
    { title:'Add a winning video', copy:'Paste a TikTok, Reels or Facebook link.' },
    { title:'Rewrite the script', copy:'Keep the hook. Adapt the offer.' },
    { title:'Choose avatar & voice', copy:'Use an actor or clone the store owner.' },
    { title:'Generate your ad', copy:'Create ready-to-test video variants.' }
  ];
  const entryCards = [
    { title:'AI Agent', icon:Sparkle, image:images.presenter, page:'agent' },
    { title:'Templates', icon:Article, image:images.kitchen, page:'templates' },
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
      if (!product) setProduct({ name:'Calacatta Gold Porcelain', category:'Surfaces', url:'Brand asset', image:images.kitchen });
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
    <div className="getting-started-title"><h2>Getting started</h2><span>·</span><b>{completed} / 4 completed</b></div>

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
        <div className="simple-preview-meta"><span>{String(activeStep + 1).padStart(2,'0')}</span><div><b>{workflow[activeStep].title}</b><small>{activeStep === 0 ? 'TikTok · Reels · Facebook' : activeStep === 1 ? 'Hook · Proof · CTA' : activeStep === 2 ? 'Actor · Voice · Language' : '9:16 · 3 variants'}</small></div></div>
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
    {type:'video',label:'OWNER-LED VIDEO',title:'Showroom expert explains the difference',copy:'A trustworthy 20-second vertical ad with a clear WhatsApp CTA.',image:images.presenter,prompt:'Create a 20-second owner-led video explaining why Calacatta porcelain is easier to maintain than natural stone.'},
    {type:'image',label:'PRODUCT IMAGE',title:'Turn a product photo into a premium room',copy:'Keep the material accurate while changing the scene and campaign format.',image:images.kitchen,prompt:'Create three premium kitchen campaign images using my Calacatta product, with natural Miami daylight.'},
    {type:'video',label:'VIRAL REPLICATION',title:'Rebuild a winning ad for your product',copy:'Reuse the hook and rhythm without copying the original brand.',image:images.patio,prompt:'Analyze a winning outdoor renovation ad and recreate the structure for my patio pavers.'}
  ];
  const visibleExamples = examples.filter(x => galleryTab === 'all' || x.type === galleryTab);

  if (view === 'chat') return <div className="codex-agent">
    <aside className="agent-history">
      <div className="history-title"><b>SunADS Agent</b><button onClick={() => setView('landing')}><Plus/></button></div>
      <button className="new-task" onClick={() => {setPrompt('');setView('landing');}}><Plus/> New creative</button>
      <span>Today</span>
      <button className="history-item active"><VideoCamera/><div><b>Calacatta owner-led ad</b><small>Generating 3 variants</small></div></button>
      <button className="history-item"><ImageIcon/><div><b>Miami showroom images</b><small>6 images · Ready</small></div></button>
      <span>Previous</span>
      <button className="history-item"><VideoCamera/><div><b>Outdoor paver campaign</b><small>Completed</small></div></button>
      <div className="history-project"><FolderSimple/><span><b>Current project</b><small>Nusa Surfaces · Miami</small></span></div>
    </aside>
    <section className="agent-thread">
      <header><div><span>CREATIVE TASK</span><h2>{mediaType === 'video' ? 'Calacatta owner-led video' : 'Calacatta campaign images'}</h2></div><div className="task-status"><span></span> Working</div></header>
      <div className="thread-body">
        <div className="thread-user"><div className="user-dot">W</div><div><b>You</b><p>{prompt}</p>{product && <div className="thread-product"><img src={product.image}/><span><b>{product.name}</b><small>Product attached</small></span></div>}</div></div>
        <div className="thread-agent"><div className="agent-symbol"><Sparkle weight="fill"/></div><div><b>SunADS Agent</b><p>I’ll turn this into a focused {mediaType} test. I’m using the product assets, Miami market context and WhatsApp enquiry objective already saved in your workspace.</p>
          <div className="task-steps">
            <div className="done"><CheckCircle weight="fill"/><span><b>Read product and My Brand</b><small>Calacatta Gold · premium showroom positioning</small></span></div>
            <div className="done"><CheckCircle weight="fill"/><span><b>Build the creative direction</b><small>Owner proof · practical comparison · local consultation</small></span></div>
            <div><SpinnerGap className="spin"/><span><b>Generate three {mediaType} variants</b><small>English and Spanish captions · 9:16</small></span></div>
          </div>
          <div className="thread-output"><img src={mediaType === 'video' ? images.presenter : images.kitchen}/><div><span>PREVIEW · VARIANT 01</span><h3>{mediaType === 'video' ? 'Beautiful stone look. Easier everyday care.' : 'Calacatta, designed for real life.'}</h3><p>{mediaType === 'video' ? '20 sec · Owner avatar · Meta / TikTok' : '4:5 · Meta / Instagram · High resolution'}</p><div><button>Open details</button><button className="primary" onClick={() => setPage('canvas')}>Continue in Canvas <ArrowRight/></button></div></div></div>
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
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Add a product and describe the image or video you want to create..."/>
        <div className="creative-prompt-toolbar">
          <button className="add-reference"><Plus/></button>
          <button><Package/> {product ? product.name : 'Add product'}</button>
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
  {id:'spotlight',title:'15s Product Spotlight',category:'Essentials',image:images.bath,video:'/assets/sample-showroom-launch.mp4',views:'12.8K',uses:'486',duration:'15s',model:'Seedance 2.5',theme:'Cinematic product discovery',character:'Store customer'},
  {id:'owner-proof',title:'Owner Explains the Difference',category:'UGC Ads',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'31.4K',uses:'1,204',duration:'24s',model:'Seedance 2.5',theme:'Owner-led education',character:'Store owner'},
  {id:'kitchen-reveal',title:'Before & After Kitchen Reveal',category:'Before & After',image:images.kitchen,video:'/assets/sample-before-after.mp4',views:'46.7K',uses:'932',duration:'18s',model:'Seedance 2.5',theme:'Transformation reveal',character:'Homeowner'},
  {id:'paver-reveal',title:'Patio Transformation Story',category:'Before & After',image:images.patio,video:'/assets/sample-before-after.mp4',views:'18.2K',uses:'541',duration:'21s',model:'Seedance 2.5',theme:'Outdoor transformation',character:'Contractor'},
  {id:'selfie-proof',title:'UGC Selfie Product Proof',category:'UGC Ads',image:images.sofia,video:'/assets/sample-owner-story.mp4',views:'27.5K',uses:'1,086',duration:'20s',model:'Seedance 2.5',theme:'Selfie recommendation',character:'UGC creator'},
  {id:'spanish-pitch',title:'Spanish Showroom Pitch',category:'UGC Ads',image:images.avatar,video:'/assets/sample-showroom-launch.mp4',views:'9.6K',uses:'318',duration:'22s',model:'Seedance 2.5',theme:'Local showroom invitation',character:'AI presenter'},
  {id:'three-reasons',title:'Three Reasons Listicle',category:'Essentials',image:images.bath,video:'/assets/sample-showroom-launch.mp4',views:'35.1K',uses:'1,440',duration:'19s',model:'Seedance 2.5',theme:'Fast educational listicle',character:'Product expert'},
  {id:'texture-closeup',title:'Luxury Texture Close-up',category:'Product Demos',image:images.kitchen,video:'/assets/sample-showroom-launch.mp4',views:'14.9K',uses:'612',duration:'12s',model:'Seedance 2.5',theme:'Premium material detail',character:'No presenter'},
  {id:'mistakes-hook',title:'Three Renovation Mistakes',category:'Essentials',image:images.presenter,video:'/assets/sample-owner-story.mp4',views:'52.6K',uses:'1,706',duration:'25s',model:'Seedance 2.5',theme:'Problem and solution',character:'Renovation expert'},
  {id:'room-reveal',title:'AI Luxury Room Reveal',category:'Animated Ads',image:images.kitchen,video:'/assets/sample-before-after.mp4',views:'22.4K',uses:'784',duration:'16s',model:'Seedance 2.5',theme:'AI room transformation',character:'No presenter'},
  {id:'offer-countdown',title:'Local Offer Countdown',category:'Animated Ads',image:images.patio,video:'/assets/sample-showroom-launch.mp4',views:'11.8K',uses:'427',duration:'15s',model:'Seedance 2.5',theme:'Urgent local promotion',character:'AI presenter'},
  {id:'customer-story',title:'Customer Testimonial Story',category:'UGC Ads',image:images.sofia,video:'/assets/sample-owner-story.mp4',views:'29.3K',uses:'963',duration:'28s',model:'Seedance 2.5',theme:'Customer proof story',character:'Customer actor'}
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
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(['owner-proof','kitchen-reveal']);
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState('preview');
  const [autofilled, setAutofilled] = useState(false);
  const categories = ['All','Essentials','UGC Ads','Animated Ads','Product Demos','Before & After','Saved'];
  const visibleTemplates = templateCatalog.filter(item => {
    const matchesCategory = category === 'All' || (category === 'Saved' ? saved.includes(item.id) : item.category === category);
    const matchesSearch = `${item.title} ${item.category} ${item.theme}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
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
    {id:'t1',type:'templateFlow',position:{x:35,y:185},data:{kicker:'INPUT',label:'Product image',detail:'From My Brand or upload',image:selected.image,tone:'input'}},
    {id:'t2',type:'templateFlow',position:{x:340,y:75},data:{kicker:'ANALYZE',label:'Template structure',detail:`${selected.duration} · ${selected.theme}`,tone:'analysis'}},
    {id:'t3',type:'templateFlow',position:{x:340,y:315},data:{kicker:'SCRIPT',label:'Rewrite for product',detail:'Hook · proof · CTA',tone:'analysis'}},
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
    <div className="template-library-meta"><div><span>VIRAL SHORT-VIDEO LIBRARY</span><h3>{category === 'All' ? 'Proven structures, ready to recreate' : category}</h3></div><p>{visibleTemplates.length} templates · Click any image to preview</p></div>
    <div className="template-grid">{visibleTemplates.map(item => <article className="template-card" key={item.id}>
      <div className="template-media" role="button" tabIndex="0" aria-label={`Preview ${item.title}`} onClick={() => openTemplate(item)} onKeyDown={event => event.key === 'Enter' && openTemplate(item)}>
        <img src={item.image}/><span className="template-model">{item.model}</span><button className={`template-save ${saved.includes(item.id) ? 'saved' : ''}`} aria-label={`Save ${item.title}`} onClick={event => {event.stopPropagation();toggleSaved(item.id);}}><BookmarkSimple weight={saved.includes(item.id) ? 'fill' : 'regular'}/></button><button className="template-recreate" onClick={event => {event.stopPropagation();openTemplate(item,'workflow');}}>Recreate</button><i><Play weight="fill"/></i>
      </div>
      <div className="template-card-copy"><b>{item.title}</b><span><Eye/> {item.views} views <i>·</i> <Fire/> {item.uses} uses</span><small>{item.duration} · {item.category}</small></div>
    </article>)}</div>
    {!visibleTemplates.length && <div className="template-empty"><MagnifyingGlass/><h3>No matching templates</h3><p>Try another search or category.</p><button onClick={() => {setCategory('All');setQuery('');}}>Show all templates</button></div>}

    {selected && <div className="template-modal-scrim" onMouseDown={() => setSelected(null)}><section className="template-modal" onMouseDown={event => event.stopPropagation()}>
      <header><h3>{selected.title}</h3><div className="template-modal-tabs"><button className={modalMode === 'preview' ? 'active' : ''} onClick={() => setModalMode('preview')}><Eye/> Preview</button><button className={modalMode === 'workflow' ? 'active' : ''} onClick={() => setModalMode('workflow')}><ShareNetwork/> Workflow</button></div><div className="template-modal-actions"><button onClick={() => notify('Template guide opened.')}><BookOpen/> How it works</button><button onClick={() => notify('Share link copied.')}><ShareNetwork/></button><button aria-label="Close template" onClick={() => setSelected(null)}><X/></button></div></header>
      <div className="template-modal-body">
        <div className={`template-stage ${modalMode}`}>
          {modalMode === 'preview' ? <><video key={selected.id} src={selected.video} poster={selected.image} controls autoPlay muted loop playsInline/><div className="template-preview-input"><span>INPUT</span><b>Product image</b><img src={selected.image}/></div><div className="template-preview-label"><Play weight="fill"/><span><b>{selected.duration} viral structure</b><small>{selected.theme}</small></span></div></> : <><ReactFlow nodes={workflowNodes} edges={workflowEdges} nodeTypes={templateNodeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} panOnScroll minZoom={0.35} maxZoom={1.2}><Background color="#3a414c" gap={24} size={1}/><Controls showInteractive={false}/></ReactFlow><div className="template-readonly"><Eye/> You're viewing a read-only workflow.<button onClick={openInCanvas}>Open in Viral Canvas <ArrowRight/></button></div></>}
        </div>
        <aside className="template-input-panel"><span>RECREATE THIS TEMPLATE</span><h3>Add your product info</h3><button className="autofill-brand" onClick={() => {setAutofilled(true);notify('Product and Brand Kit loaded from My Brand.');}}><Storefront/> {autofilled ? 'Loaded from My Brand' : 'Autofill from My Brand'} {autofilled && <Check/>}</button><div className="or-divider"><i></i><span>or</span><i></i></div><label>Product image *</label><button className="template-upload" onClick={() => notify('Product picker opened.')}><img src={selected.image}/><span><ImageIcon/><b>Choose from My Brand</b><small>or upload another image</small></span></button><label>Video theme *</label><select defaultValue={selected.theme}><option>{selected.theme}</option><option>Owner-led education</option><option>Product transformation</option><option>Fast UGC recommendation</option></select><label>Character preference *</label><select defaultValue={selected.character}><option>{selected.character}</option><option>Store owner</option><option>AI presenter</option><option>No presenter</option></select><label>Language & CTA</label><select defaultValue="English · WhatsApp"><option>English · WhatsApp</option><option>Spanish · WhatsApp</option><option>English · Book appointment</option></select><button className="template-generate" onClick={() => notify(`${selected.title} generation started.`)}><Sparkle weight="fill"/> Generate video <span>35 credits</span></button></aside>
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
  { id:'3', type:'flowNode', position:{x:370,y:380}, data:{kicker:'BRAND',label:'Add your product',detail:'Calacatta Gold',icon:Package,status:'done'} },
  { id:'4', type:'flowNode', position:{x:690,y:120}, data:{kicker:'LOCALIZE',label:'Rewrite for market',detail:'Spanish · Miami',icon:Globe} },
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
    <PageTitle eyebrow="PRESENTER LIBRARY" title="Put a trusted face in every ad" copy="Choose a ready-to-use actor or clone the showroom owner to build recognition without filming every week." action={<button className="primary" onClick={() => setCloneOpen(true)}><Plus/> Clone the owner</button>}/>
    <div className="avatar-methods">
      <button onClick={() => setCloneOpen(true)}><div><span>YOUR STRONGEST ASSET</span><h3>Clone the store owner</h3><p>Record once. Create owner-led videos in multiple languages while keeping consent and brand control.</p><b>Start owner clone <ArrowRight/></b></div><img src={images.presenter}/></button>
      <button><div><span>FASTEST START</span><h3>Choose an AI actor</h3><p>Use a ready presenter matched to your market, product and ad style.</p><b>Browse 40+ actors <ArrowRight/></b></div><img src={images.sofia}/></button>
    </div>
    <div className="library-head"><div><h3>AI actors</h3><p>Realistic presenters for paid and organic content</p></div><label><MagnifyingGlass/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search actors, language, role"/></label></div>
    <div className="filter-chips"><button className="active">All actors</button><button>English</button><button>Spanish</button><button>Showroom</button><button>Saved</button></div>
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
    <PageTitle eyebrow="DATA ASSET" title="Know which creative creates qualified customers" copy="SunADS connects content, spend, conversations and store outcomes. The system learns from your own data—not generic vanity metrics." action={<button className="secondary"><Clock/> Last 30 days</button>}/>
    <div className="kpi-grid"><article><span>Qualified leads</span><strong>184</strong><small className="up">+22.4% vs prior period</small></article><article><span>Cost per qualified lead</span><strong>$18.40</strong><small className="up">−12.6% improvement</small></article><article><span>Appointments booked</span><strong>37</strong><small>20.1% of qualified leads</small></article><article><span>Attributed revenue</span><strong>$42.8K</strong><small>2.9× estimated ROAS</small></article></div>
    <div className="performance-grid">
      <section className="performance-chart"><div className="card-head"><div><h3>Lead quality trend</h3><p>Spend compared with qualified enquiries</p></div><button><DotsThree/></button></div><div className="chart-area"><div className="chart-y"><span>60</span><span>40</span><span>20</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><path className="area" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25 L700 220 L0 220Z"/><path className="line" d="M0 190 C70 160,100 172,150 140 S250 155,300 100 S400 130,460 73 S570 95,700 25"/></svg><div className="chart-x"><span>Jul 21</span><span>Jul 28</span><span>Aug 4</span><span>Aug 11</span><span>Aug 18</span></div></div></section>
      <aside className="data-sources"><div className="card-head"><div><h3>Data sources</h3><p>Connect the full customer journey</p></div></div>{sources.map(([id,name,Icon,desc]) => <button key={id} onClick={() => toggle(id)}><i><Icon/></i><span><b>{name}</b><small>{desc}</small></span>{connected.includes(id) ? <em><Check/> Connected</em> : <strong>Connect</strong>}</button>)}</aside>
    </div>
    <div className="insight-card"><div className="insight-icon"><Sparkle weight="fill"/></div><div><span>PERFORMANCE AGENT</span><h3>Owner-led Spanish videos are producing 41% more qualified WhatsApp conversations.</h3><p>Recommendation: create three new variants using the same hook and increase budget only after appointment quality is confirmed.</p></div><button onClick={() => notify('Recommendation added to the next creative sprint.')}>Create variants <ArrowRight/></button></div>
    <section className="creative-table"><div className="card-head"><div><h3>Creative performance</h3><p>Ranked by qualified lead efficiency</p></div><button>View all</button></div><div className="table-row table-header"><span>Creative</span><span>Channel</span><span>Spend</span><span>Qualified leads</span><span>Cost / lead</span><span>Action</span></div>{[
      [images.presenter,'Owner explains porcelain vs quartz','Meta','$1,280','83','$15.42'],
      [images.kitchen,'Calacatta showroom proof','TikTok','$740','39','$18.97'],
      [images.patio,'3 outdoor paving mistakes','Meta','$920','41','$22.44']
    ].map((r,i) => <div className="table-row" key={r[1]}><span className="creative-name"><img src={r[0]}/><b>{r[1]}</b></span>{r.slice(2).map((x,j)=><span key={j}>{x}</span>)}<span><button><ArrowRight/></button></span></div>)}</section>
  </div>;
}

function ServicePage({ notify }) {
  return <div className="page service-page"><PageTitle eyebrow="DONE-FOR-YOU" title="Need more volume? Our creative team can run the workflow." copy="Use the same SunADS workspace for strategy, briefs, review and approval. You keep the data, assets and winning workflows." action={<button className="primary" onClick={() => notify('Strategy call request saved.')}>Book a strategy call</button>}/>
    <section className="service-hero"><div><span>CREATIVE SPRINT</span><h3>25–100 short videos per month</h3><p>AI creative specialists handle concepting, scripts, localization, avatar direction and production—optimized around your real performance data.</p><div className="service-stats"><span><b>48 hours</b><small>first concepts</small></span><span><b>Weekly</b><small>delivery cadence</small></span><span><b>1 workspace</b><small>brief, review, data</small></span></div><button className="primary">Start a pilot sprint <ArrowRight/></button></div><div className="sample-stack"><img src={images.presenter}/><img src={images.kitchen}/><img src={images.patio}/><span>DEMO SAMPLE · 9:16</span></div></section>
    <div className="sample-title"><div><h3>Sample directions</h3><p>Illustrative concepts for building material showrooms</p></div></div><div className="sample-grid">{[[images.presenter,'Owner-led education','Trust + consultation'],[images.kitchen,'Showroom product proof','Texture + detail'],[images.patio,'Problem / solution','Local service + CTA']].map(x=><article key={x[1]}><div><img src={x[0]}/><button><Play weight="fill"/></button></div><b>{x[1]}</b><span>{x[2]}</span></article>)}</div>
  </div>;
}

function MyBrandPage({ product, notify }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editOpen, setEditOpen] = useState(false);
  const tabs = [
    ['overview','Overview'], ['products','Products'], ['avatars','Avatars'],
    ['voices','Voices'], ['assets','Asset Library'], ['kit','Brand Kit']
  ];
  const brandProducts = [
    product || {name:'Calacatta Gold Porcelain',category:'Signature surface',image:images.kitchen},
    {name:'Travertine Outdoor Pavers',category:'Outdoor collection',image:images.patio},
    {name:'Nero Stone Bathroom Set',category:'Bathroom collection',image:images.bath}
  ];
  const brandActors = actors.slice(0, 6);
  const brandVoices = [
    ['Nusa Owner · English','Warm, practical and confident','US English'],
    ['Nusa Owner · Spanish','Clear showroom consultation','Latin American Spanish'],
    ['Sofia · English','Friendly product educator','US English'],
    ['Daniel · Portuguese','Experienced renovation advisor','Brazilian Portuguese']
  ];
  const brandAssets = [
    [images.kitchen,'Calacatta kitchen hero','Campaign image'],
    [images.presenter,'Owner showroom footage','Source video'],
    [images.patio,'Outdoor paver collection','Product image'],
    [images.bath,'Stone bathroom detail','Campaign image'],
    [images.avatar,'Lifestyle presenter','Avatar reference'],
    [images.sofia,'Sofia UGC presenter','Avatar reference']
  ];
  const stats = [
    ['products','3','Products',Package], ['avatars','6','Avatars',UserCircle],
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
    <section className="brand-space-card">
      <div className="brand-space-avatar">NS</div>
      <div className="brand-space-copy"><span>BRAND WORKSPACE</span><h2>Nusa Surfaces Brand Space</h2><p><Users/> 3 team members <i></i><MapPin/> Miami, USA <i></i><Globe/> English & Spanish</p></div>
      <button className="brand-edit" onClick={() => setEditOpen(true)}><FileText/> Edit brand info</button>
    </section>

    <div className="brand-stats">{stats.map(([id,value,label,Icon]) => <button key={id} onClick={() => setActiveTab(id)} className={activeTab === id ? 'active' : ''}><Icon/><span><b>{value}</b><small>{label}</small></span><ArrowRight/></button>)}</div>

    <nav className="brand-tabs" aria-label="Brand workspace sections">{tabs.map(([id,label]) => <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>{label}</button>)}</nav>

    <section className="brand-tab-content">
      {activeTab === 'overview' && <>
        {sectionHead('Products','Products and offers available to every SunADS workflow.','Add product')}
        {productGrid}
        <div className="brand-overview-split">
          <section>{sectionHead('Brand Kit','The rules SunADS uses to keep every creative consistent.')}
            <div className="brand-kit-summary"><div><Storefront/><span><b>Premium showroom positioning</b><small>Practical expertise, local consultation and fast WhatsApp response.</small></span></div><div className="brand-colors"><i></i><i></i><i></i><span>3 brand colors</span></div><button onClick={() => setActiveTab('kit')}>Open Brand Kit <ArrowRight/></button></div>
          </section>
          <section>{sectionHead('Presenters & voices','The people and voices approved to represent the brand.')}
            <div className="brand-people-summary"><div className="people-stack">{brandActors.slice(0,3).map(actor => <img key={actor[0]} src={actor[3]}/>)}</div><div><b>6 approved avatars</b><small>Including an owner-clone workflow</small></div><button onClick={() => setActiveTab('avatars')}>Manage <ArrowRight/></button></div>
            <div className="brand-people-summary"><div className="voice-summary-icon"><Microphone/></div><div><b>4 approved voices</b><small>English, Spanish and Portuguese</small></div><button onClick={() => setActiveTab('voices')}>Manage <ArrowRight/></button></div>
          </section>
        </div>
      </>}
      {activeTab === 'products' && <>{sectionHead('Products','Import product pages, offers and proof points for accurate creative.','Add product')}{productGrid}</>}
      {activeTab === 'avatars' && <>{sectionHead('Avatars','Approved AI actors and the store-owner digital twin.','Add avatar')}{avatarGrid}</>}
      {activeTab === 'voices' && <>{sectionHead('Voices','Approved voices, languages and brand delivery styles.','Add voice')}{voiceList}</>}
      {activeTab === 'assets' && <>{sectionHead('Asset Library','Reusable product photography, footage, logos and campaign files.')}{assetGrid}</>}
      {activeTab === 'kit' && <>
        {sectionHead('Brand Kit','Define the visual and verbal system behind every generated ad.','Edit Brand Kit')}
        <div className="brand-kit-grid">
          <article><span>LOGO</span><div className="brand-logo-preview"><div className="brand-space-avatar">NS</div><b>Nusa Surfaces</b></div><button onClick={() => openAdd('Upload logo')}>Replace logo</button></article>
          <article><span>COLORS</span><div className="brand-palette"><i>#1769FF</i><i>#101114</i><i>#F4F6F8</i></div><button onClick={() => openAdd('Edit colors')}>Edit colors</button></article>
          <article><span>TYPOGRAPHY</span><div className="brand-type-preview"><b>Inter Bold</b><small>Inter Regular · Aa Bb Cc 123</small></div><button onClick={() => openAdd('Edit typography')}>Edit typography</button></article>
          <article><span>BRAND VOICE</span><div className="brand-tone-tags"><b>Clear</b><b>Practical</b><b>Trustworthy</b><b>Local expert</b></div><button onClick={() => openAdd('Edit brand voice')}>Edit voice</button></article>
        </div>
      </>}
    </section>

    {editOpen && <div className="brand-modal-backdrop" onMouseDown={() => setEditOpen(false)}><form className="brand-modal" onMouseDown={event => event.stopPropagation()} onSubmit={event => {event.preventDefault();setEditOpen(false);notify('Brand information saved.');}}><div><span>MY BRAND</span><h3>Edit brand information</h3><button type="button" onClick={() => setEditOpen(false)}><X/></button></div><label>Brand name<input defaultValue="Nusa Surfaces"/></label><label>Primary market<input defaultValue="Miami, USA"/></label><label>Languages<input defaultValue="English, Spanish"/></label><label>Primary conversion goal<input defaultValue="Book a showroom appointment on WhatsApp"/></label><footer><button type="button" onClick={() => setEditOpen(false)}>Cancel</button><button className="primary" type="submit">Save brand</button></footer></form></div>}
  </div>;
}

function SimplePage({ page, product, setPage }) {
  const config = {
    projects:['Projects','Everything created for this workspace lives here.'],
    assets:['Assets','Products, photos, videos, logos and voice profiles.'],
    channels:['Social accounts','Connect distribution and outcome data.']
  }[page];
  return <div className="page simple-page"><PageTitle title={config[0]} copy={config[1]} action={<button className="primary"><Plus/> Add new</button>}/>
    {page === 'projects' && <div className="project-grid">{[[images.presenter,'Owner avatar pilot','Video · Ready'],[images.kitchen,'Calacatta Gold launch','Viral workflow · Draft'],[images.patio,'Outdoor pavers Miami','Image pack · Ready']].map(x => <article key={x[1]}><img src={x[0]}/><div><b>{x[1]}</b><small>{x[2]}</small></div></article>)}</div>}
    {page === 'assets' && <div className="asset-grid"><button className="add-asset"><Plus/><b>Add product or asset</b></button>{product && <article><img src={product.image}/><div><b>{product.name}</b><small>Product · Imported</small></div></article>}{[[images.bath,'Stone bathroom','Reference'],[images.presenter,'Owner footage','Video'],[images.patio,'Patio collection','Product']].map(x=><article key={x[1]}><img src={x[0]}/><div><b>{x[1]}</b><small>{x[2]}</small></div></article>)}</div>}
    {page === 'channels' && <div className="channel-grid">{[[FacebookLogo,'Facebook & Instagram','Connected'],[TiktokLogo,'TikTok Business','Connected'],[WhatsappLogo,'WhatsApp Business','Connect'],[Users,'Lead / CRM','Connect']].map(([Icon,name,status])=><article key={name}><i><Icon/></i><div><b>{name}</b><small>{status === 'Connected' ? 'Data syncing normally' : 'Add customer outcome data'}</small></div><button className={status === 'Connected'?'connected':''}>{status}</button></article>)}</div>}
  </div>;
}

export function App() {
  const [page, setPage] = useState('home');
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [product, setProduct] = useState(null);
  const [canvasTemplate, setCanvasTemplate] = useState(null);
  const [notice, setNotice] = useState('');
  const notify = message => { setNotice(typeof message === 'string' ? message : 'Updated.'); setTimeout(() => setNotice(''), 2600); };
  const content = useMemo(() => {
    if (page === 'home') return <HomePage product={product} setProduct={setProduct} setPage={setPage} notify={notify}/>;
    if (page === 'agent') return <AgentPage product={product} setPage={setPage} notify={notify}/>;
    if (page === 'templates') return <TemplatesPage setPage={setPage} setCanvasTemplate={setCanvasTemplate} notify={notify}/>;
    if (page === 'canvas') return <CanvasPage notify={notify} template={canvasTemplate}/>;
    if (page === 'avatars') return <AvatarsPage notify={notify}/>;
    if (page === 'brand') return <MyBrandPage product={product} notify={notify}/>;
    if (page === 'performance') return <PerformancePage notify={notify}/>;
    if (page === 'service') return <ServicePage notify={notify}/>;
    return <SimplePage page={page} product={product} setPage={setPage}/>;
  }, [page, product, canvasTemplate]);
  return <div className={`app-shell ${menuExpanded ? 'sidebar-open' : 'sidebar-collapsed'}`}><Sidebar page={page} setPage={setPage} expanded={menuExpanded} setExpanded={setMenuExpanded}/><main>{content}</main>{notice && <div className="toast"><CheckCircle weight="fill"/>{notice}</div>}</div>;
}
