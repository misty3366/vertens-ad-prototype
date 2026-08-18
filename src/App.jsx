import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  House, Sparkle, FlowArrow, FolderSimple, Swatches, MagicWand,
  ChartLineUp, Sun, Moon, Code, GraduationCap, Gift, Bell, UserCircle,
  MagnifyingGlass, Plus, ArrowUp, Image as ImageIcon, VideoCamera,
  LinkSimple, Package, Buildings, DotsThree, Play, DownloadSimple,
  CaretDown, SlidersHorizontal, SquaresFour, List, CheckCircle,
  ArrowRight, UploadSimple, PencilSimple, Microphone, Palette,
  Copy, PaperPlaneTilt, Lightning, Brain, X, Clock, Globe, Users,
  Key, BookOpen, TrendUp, Target, CursorClick, MapPin, Storefront,
  Coins, Crown, ArrowsClockwise, Export, ShareNetwork, FacebookLogo,
  TiktokLogo, InstagramLogo, SpinnerGap, TextT, FilmStrip, MusicNotes,
  Stack, Scissors, SidebarSimple, ArrowsOut, Eye, Fire,
  GridFour, MouseSimple, Upload, FloppyDisk, ChartBar
} from '@phosphor-icons/react';
import { ReactFlow, Background, Controls, Handle, Position, MiniMap, Panel, addEdge, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const img = {
  kitchen: '/assets/calacatta-kitchen.png',
  patio: '/assets/patio-pavers.png',
  bath: '/assets/stone-bathroom.png',
  viral: '/assets/viral-presenter.png',
  avatar: '/assets/ai-presenter.png'
};

const nav = [
  ['home','Home',House],['agent','Agent',Sparkle],['flow','Ad Flow',FlowArrow],
  ['projects','Projects',FolderSimple],['brand','My Brand',Swatches],
  ['studio','Studio',MagicWand],['performance','Performance',ChartLineUp]
];

const utility = [['api','API',Code],['learn','Learn',GraduationCap],['referral','Referral',Gift]];

const cards = [
  {title:'URL to Video', tag:'Fastest start', image:img.kitchen, route:'agent', type:'video'},
  {title:'Product to Image', tag:'Catalog ready', image:img.bath, route:'studio', type:'image'},
  {title:'Showroom Ad Flow', tag:'Best for leads', image:img.patio, route:'flow', type:'workflow'},
  {title:'Creative Agent', tag:'Talk to create', image:img.kitchen, route:'agent', type:'agent'},
  {title:'Before & After', tag:'High-performing', image:img.bath, route:'flow', type:'video'},
  {title:'Avatar Product Video', tag:'28 languages', image:img.patio, route:'studio', type:'video'}
];

const projectsSeed = [
  {name:'Calacatta Gold · Miami', type:'Video', status:'Ready', image:img.kitchen, date:'12 min ago', ratio:'9:16'},
  {name:'Outdoor Pavers · Summer', type:'Ad Flow', status:'Ready', image:img.patio, date:'Yesterday', ratio:'9:16'},
  {name:'Stone Bath · New Collection', type:'Images', status:'Draft', image:img.bath, date:'Aug 16', ratio:'4:5'},
  {name:'Miami Showroom Week 34', type:'Campaign', status:'Live', image:img.kitchen, date:'Aug 15', ratio:'1:1'},
];

const BrandBadge = () => <><div className="brand-mark">S</div><span className="sun-wordmark">SUNADS</span></>;

function Shell({page,setPage,theme,setTheme,overlay,setOverlay,children}){
  return <div className="app" data-theme={theme}>
    <aside className="rail">
      <button className="logo" onClick={()=>setPage('home')} aria-label="SunADS home"><BrandBadge/></button>
      <div className="workspace" title="Nusa Surfaces workspace">NS</div>
      <nav>{nav.map(([id,label,Icon])=><button key={id} className={page===id?'active':''} onClick={()=>setPage(id)} title={label}><Icon size={21}/><span>{label}</span></button>)}</nav>
      <div className="rail-spacer" />
      <div className="rail-utilities">
        <button onClick={()=>setTheme(theme==='dark'?'light':'dark')} title="Appearance">{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
        {utility.map(([id,label,Icon])=><button key={id} onClick={()=>setOverlay(id)} title={label}><Icon size={20}/></button>)}
        <button className="has-dot" onClick={()=>setOverlay('notifications')} title="Notifications"><Bell size={20}/></button>
        <button onClick={()=>setOverlay('profile')} title="Profile"><UserCircle size={22}/></button>
      </div>
    </aside>
    <main className="main">{children}</main>
    {overlay && <UtilityPanel type={overlay} close={()=>setOverlay(null)}/>} 
  </div>
}

function Topbar({title,subtitle,actions}){
  return <header className="topbar"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div><div className="top-actions">{actions}</div></header>
}

function HomePage({setPage}){
  const [tab,setTab]=useState('All');
  const tabs=['All','Ad creation','Image','Video','Workflows','Intelligence'];
  return <div className="page home-page">
    <div className="home-account-bar"><span className="credit-balance"><Coins weight="fill"/> 1,280 credits</span><button><Crown/> Upgrade</button></div>
    <div className="home-hero">
      <div className="eyebrow"><Sparkle size={14} weight="fill"/> SUNADS · AI creative platform for home retailers</div>
      <h1>Turn home products into ads<br/>that drive <span>showroom visits.</span></h1>
      <p>Create images, videos and complete ad workflows — powered by your brand assets and home-industry templates.</p>
      <div className="quick-create">
        <textarea aria-label="Create prompt" placeholder="Create a 20-second TikTok ad for my new porcelain tile collection…" />
        <div className="composer-row"><button className="soft"><Plus/> Add product</button><span>Auto · 9:16</span><button className="send" onClick={()=>setPage('agent')}><ArrowUp/></button></div>
      </div>
    </div>
    <div className="catalog-head"><div className="tabs">{tabs.map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?'selected':''}>{t}</button>)}</div><button className="search"><MagnifyingGlass/> Search apps</button></div>
    <section><div className="section-title"><h2>Start creating</h2><button>View all <ArrowRight/></button></div>
      <div className="app-grid">{cards.filter(c=>tab==='All'||c.type.toLowerCase().includes(tab.toLowerCase().replace('s',''))).map((c,i)=><button className="app-card" key={c.title} onClick={()=>setPage(c.route)}><img src={c.image}/><div className="image-wash"/><div className="card-copy"><span>{c.tag}</span><h3>{c.title}</h3><div>Create yours <ArrowRight/></div></div><div className="card-index">0{i+1}</div></button>)}</div>
    </section>
    <section className="recent-strip"><div><span>RECENT PROJECT</span><h3>Calacatta Gold · Miami launch</h3><p>3 video variations · 6 image ads</p></div><img src={img.kitchen}/><button onClick={()=>setPage('projects')}>Open project <ArrowRight/></button></section>
  </div>
}

function AgentPage({setPage,addProject}){
  const [prompt,setPrompt]=useState(''); const [status,setStatus]=useState('idle'); const [mode,setMode]=useState('Video'); const [skillsOpen,setSkillsOpen]=useState(true);
  const send=()=>{if(prompt.trim()&&status==='idle'){setStatus('generating')}};
  useEffect(()=>{if(status!=='generating')return;const timer=setTimeout(()=>{addProject({name:'AI Showroom Campaign',type:mode,status:'Ready',image:mode==='Video'?img.kitchen:img.bath,date:'Just now',ratio:'9:16'});setStatus('done')},1200);return()=>clearTimeout(timer)},[status,mode,addProject]);
  return <div className="split-page agent-page">
    <aside className="context-panel"><div className="context-head"><h2>Agent</h2><button><SquaresFour/></button></div><div className="mode-switch"><button className="on"><Sparkle/> Creative</button><button><ChartLineUp/> Performance</button></div><button className="new-chat"><Plus/> New chat</button><label className="context-search"><MagnifyingGlass/><input placeholder="Search conversations"/></label><div className="conversation-list"><span>RECENT</span><button className="current"><VideoCamera/> Miami showroom launch <DotsThree/></button><button><ImageIcon/> Stone collection imagery</button></div></aside>
    <section className="agent-main">
      {status==='idle'?<div className="agent-empty"><div className="eyebrow"><Brain/> SunADS Creative Agent</div><h1>What will you <span>create today?</span></h1><p>Turn one product link, photo, or idea into platform-ready content.</p>
        <div className="agent-composer"><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe the campaign you want to create…"/><div className="reference-thumb"><img src={img.kitchen}/><span>Calacatta Gold</span><X size={14}/></div><div className="composer-row"><div><button className="soft"><Plus/></button><button className="soft"><Package/> Product</button><button className="soft" onClick={()=>setMode(mode==='Video'?'Image':'Video')}>{mode==='Video'?<VideoCamera/>:<ImageIcon/>}{mode}</button></div><div><span>Nova 2 · 9:16</span><button className="send" onClick={send}><ArrowUp/></button></div></div></div>
        <div className="suggestions"><button onClick={()=>setPrompt('Create three 15-second video ads for this product')}><VideoCamera/> Video ads</button><button onClick={()=>setPrompt('Create four Meta image ads with localized copy')}><ImageIcon/> Image ads</button><button onClick={()=>setPrompt('Rewrite this script with a stronger hook')}><PencilSimple/> Rewrite winning script</button><button onClick={()=>setSkillsOpen(!skillsOpen)}><SquaresFour/> {skillsOpen?'Hide tools':'All creation tools'}</button></div>
        {skillsOpen&&<div className="agent-skill-deck"><div><button onClick={()=>{setMode('Image');setPrompt('Create campaign-ready product images from my reference')}}><ImageIcon/><span><b>AI Image</b><small>Text to image · Product restyle</small></span></button><button onClick={()=>{setMode('Video');setPrompt('Create a vertical product video for TikTok and Reels')}}><VideoCamera/><span><b>AI Video</b><small>Text or image to video</small></span></button><button onClick={()=>{setMode('Video');setPrompt('Create an avatar-led product video in English and Spanish')}}><UserCircle/><span><b>Avatars</b><small>Presenters · 28 languages</small></span></button><button onClick={()=>setPrompt('Create a natural voiceover for this product script')}><Microphone/><span><b>Voice</b><small>Voiceover · Voice cloning</small></span></button></div><div className="agent-quick-tools"><span>QUICK EDIT</span><button onClick={()=>setPrompt('Restyle this product in a premium showroom scene')}><MagicWand/> Product restyle</button><button onClick={()=>setPrompt('Expand this image to a 9:16 vertical composition')}><ArrowsOut/> Image expand</button><button onClick={()=>setPrompt('Remove the background and keep a clean product cutout')}><Copy/> Remove background</button><button onClick={()=>setPrompt('Turn this product URL into a complete short video')}><LinkSimple/> URL to video</button></div></div>}
      </div>:<div className="chat-thread"><div className="message user-message">{prompt}</div>{status==='generating'?<div className="generation-state"><div className="generating-orb"><SpinnerGap/></div><div><strong>Building your showroom campaign</strong><p>SunADS is analyzing the product, writing three hooks, and assembling a lead-ready video.</p><div className="generation-steps"><span className="done"><CheckCircle weight="fill"/> Product analyzed</span><span className="active"><ArrowsClockwise/> Writing scripts</span><span><VideoCamera/> Rendering video</span></div></div><em>~20 sec</em></div>:<div className="message agent-message"><div className="agent-avatar"><Sparkle weight="fill"/></div><div><strong>I built a complete showroom campaign.</strong><p>Three hooks, localized captions, a 20-second vertical video, and a lead card for Miami.</p><div className="result-card"><div className="video-preview"><img src={img.kitchen}/><button><Play weight="fill"/></button></div><div className="result-info"><span>20 sec · 9:16 · English (US) · 48 credits</span><h3>Designed to be seen. Priced to be yours.</h3><p>Visit Nusa Surfaces, Miami · Book a free sample consultation.</p><div className="result-channels"><span><TiktokLogo/> TikTok</span><span><InstagramLogo/> Reels</span><span><FacebookLogo/> Meta</span></div><div><button className="primary" onClick={()=>setPage('flow')}>Open in Flow</button><button onClick={()=>setPage('projects')}>View project</button></div></div></div></div></div>}<div className="thread-composer"><input placeholder={status==='generating'?'SunADS is creating…':'Ask for a revision…'} disabled={status==='generating'}/><button className="send"><ArrowUp/></button></div></div>}
    </section>
  </div>
}

function CloneNode({data}){
  const Icon=data.icon||Sparkle;
  const body={
    video:<div className="clone-media"><img src={data.image}/><button><Play weight="fill"/></button><span>{data.duration||'00:24'}</span></div>,
    analysis:<div className="clone-analysis"><span><b>HOOK</b> 0–3s · unexpected claim</span><span><b>PROOF</b> product close-up</span><span><b>CTA</b> showroom visit</span></div>,
    script:<div className="clone-script">“Your kitchen does not need a remodel. It needs one surface that changes everything.”</div>,
    products:<div className="clone-products"><img src={img.kitchen}/><img src={img.patio}/><img src={img.bath}/></div>,
    avatars:<div className="clone-avatars"><img src={img.viral}/><img src={img.avatar}/></div>,
    scenes:<div className="clone-scenes"><img src={img.kitchen}/><img src={img.avatar}/><img src={img.bath}/></div>,
    output:<div className="clone-media output"><img src={img.avatar}/><button><Play weight="fill"/></button><span>00:20</span></div>,
  }[data.variant];
  return <div className={`clone-node clone-${data.variant} ${data.status||''}`}>
    <Handle type="target" position={Position.Left}/>
    <div className="clone-node-head"><div><Icon/><span>{data.kicker}</span></div><button><DotsThree/></button></div>
    <h3>{data.label}</h3>{body}<div className="clone-node-foot"><span>{data.meta}</span>{data.status==='done'?<CheckCircle weight="fill"/>:data.status==='running'?<SpinnerGap className="spin"/>:null}</div>
    <Handle type="source" position={Position.Right}/>
  </div>
}

const cloneNodeTypes={clone:CloneNode};
const cloneInitialNodes=[
  {id:'source',type:'clone',position:{x:60,y:180},data:{variant:'video',icon:Fire,kicker:'VIRAL SOURCE',label:'2.3M-view showroom reel',image:img.viral,duration:'00:24',meta:'TikTok · @interiorwithmaya',status:'done'}},
  {id:'analysis',type:'clone',position:{x:390,y:65},data:{variant:'analysis',icon:ChartBar,kicker:'STRUCTURE',label:'Viral pattern breakdown',meta:'3 conversion moments',status:'done'}},
  {id:'script',type:'clone',position:{x:390,y:365},data:{variant:'script',icon:TextT,kicker:'COPY',label:'Rewrite for your store',meta:'English (US) · punchy',status:'done'}},
  {id:'products',type:'clone',position:{x:740,y:25},data:{variant:'products',icon:Package,kicker:'REPLACE PRODUCT',label:'Nusa Surfaces collection',meta:'3 products selected'}},
  {id:'avatars',type:'clone',position:{x:740,y:330},data:{variant:'avatars',icon:UserCircle,kicker:'PRESENTER',label:'Choose your spokesperson',meta:'Maya · bilingual'}},
  {id:'scenes',type:'clone',position:{x:1090,y:100},data:{variant:'scenes',icon:FilmStrip,kicker:'GENERATE SCENES',label:'Match the viral rhythm',meta:'3 scenes · 9:16'}},
  {id:'output',type:'clone',position:{x:1450,y:170},data:{variant:'output',icon:Play,kicker:'FINAL OUTPUT',label:'One-click replica',meta:'20 sec · lead card ready'}},
];
const cloneInitialEdges=[
  ['source','analysis'],['source','script'],['analysis','products'],['script','avatars'],['products','scenes'],['avatars','scenes'],['scenes','output']
].map(([source,target],i)=>({id:`clone-e${i}`,source,target,type:'smoothstep',style:{stroke:'#6f63da',strokeWidth:1.6}}));
const viralExamples=[
  {image:img.viral,title:'Showroom expert reveal',views:'2.3M',lift:'+38%'},
  {image:img.patio,title:'Before / after transformation',views:'890K',lift:'+27%'},
  {image:img.bath,title:'Three details designers notice',views:'640K',lift:'+21%'},
  {image:img.avatar,title:'Owner-led product story',views:'410K',lift:'+19%'}
];

function FlowPage({setPage}){
  const [view,setView]=useState('discover'); const [runState,setRunState]=useState('idle'); const [addOpen,setAddOpen]=useState(false);
  const [nodes,setNodes,onNodesChange]=useNodesState(cloneInitialNodes); const [edges,setEdges,onEdgesChange]=useEdgesState(cloneInitialEdges);
  const onConnect=useCallback(connection=>setEdges(current=>addEdge({...connection,type:'smoothstep',style:{stroke:'#6f63da',strokeWidth:1.6}},current)),[setEdges]);
  const startClone=()=>{setView('canvas');setRunState('idle')};
  const runClone=()=>{if(runState==='running')return;setRunState('running');setNodes(current=>current.map(n=>['products','avatars','scenes','output'].includes(n.id)?{...n,data:{...n.data,status:'running'}}:n));setTimeout(()=>{setNodes(current=>current.map(n=>({...n,data:{...n.data,status:'done'}})));setRunState('done')},1500)};
  const addCanvasNode=(variant)=>{const config={script:[TextT,'TEXT','New copy block'],products:[Package,'PRODUCT','Product collection'],avatars:[UserCircle,'AVATAR','Select presenter'],scenes:[FilmStrip,'SCENES','Generate scenes']}[variant];setNodes(current=>[...current,{id:`new-${Date.now()}`,type:'clone',position:{x:520+current.length*18,y:520},data:{variant,icon:config[0],kicker:config[1],label:config[2],meta:'New node'}}]);setAddOpen(false)};
  if(view==='discover')return <div className="page clone-discover"><Topbar title="Viral Clone" subtitle="Reverse-engineer a winning video, then remake it with your products." actions={<><button><LinkSimple/> Paste video URL</button><button><UploadSimple/> Upload reference</button></>}/><div className="clone-tabs"><button className="on">Discover</button><button onClick={()=>setView('canvas')}>Canvas</button><span/><button><BookOpen/> How it works</button></div><section className="clone-launch"><article className="clone-feature"><div><span>SUNADS VIRAL CLONE</span><h2>See a winning ad.<br/>Make it yours.</h2><p>SunADS extracts the hook, pacing, script, shots and CTA — then rebuilds the video with your products and brand.</p><button className="primary" onClick={startClone}>Try one-click replica <ArrowRight/></button></div><img src={img.viral}/></article><div className="clone-capabilities"><button onClick={startClone}><div><Brain/><span>Viral analysis</span></div><strong>Hook, rhythm and CTA</strong><p>Understand why the original converts.</p></button><button onClick={startClone}><div><TextT/><span>Script rewrite</span></div><strong>Your store, same pattern</strong><p>Localize tone, offer and language.</p></button><button onClick={startClone}><div><UserCircle/><span>Presenter swap</span></div><strong>Avatar or store owner</strong><p>Keep the movement, replace the face.</p></button><button onClick={startClone}><div><Stack/><span>Batch variants</span></div><strong>3 products at once</strong><p>Generate a testable creative matrix.</p></button></div></section><section className="replica-section"><div className="section-title"><div><div className="eyebrow"><Fire weight="fill"/> ONE-CLICK REPLICAS</div><h2>Start from a proven creative pattern</h2></div><button>See all inspiration <ArrowRight/></button></div><div className="viral-grid">{viralExamples.map(item=><article key={item.title} onClick={startClone}><div><img src={item.image}/><button><Play weight="fill"/></button><span>{item.views} views</span></div><h3>{item.title}</h3><p><TrendUp/> {item.lift} lead lift</p><button className="clone-this">Make one like this <ArrowRight/></button></article>)}</div></section></div>;
  return <div className="clone-canvas-page"><header className="canvas-head"><div><button onClick={()=>setView('discover')}><ArrowRight className="back-arrow"/></button><div><span>VIRAL CLONE CANVAS</span><h1>Calacatta Gold · TikTok replica</h1></div></div><div><span className="autosave"><CheckCircle weight="fill"/> Saved</span><button><ShareNetwork/> Share</button><button><FloppyDisk/> Save template</button><button className="primary" onClick={runClone}>{runState==='running'?<SpinnerGap className="spin"/>:<MagicWand/>}{runState==='running'?'Generating…':runState==='done'?'Replica ready':'Generate all'}</button></div></header><div className="infinite-canvas"><aside className="canvas-tools"><button className="add" onClick={()=>setAddOpen(!addOpen)} title="Add node"><Plus/></button><button title="Select"><MouseSimple/></button><button title="Search"><MagnifyingGlass/></button><button title="Assets"><FolderSimple/></button><button title="Connections"><FlowArrow/></button><button title="History"><Clock/></button><button title="Quick edit"><Scissors/></button></aside>{addOpen&&<div className="canvas-add-menu"><span>ADD NODE</span><button onClick={()=>addCanvasNode('script')}><TextT/> Text</button><button onClick={()=>addCanvasNode('products')}><Package/> Product</button><button onClick={()=>addCanvasNode('avatars')}><UserCircle/> Avatar</button><button onClick={()=>addCanvasNode('scenes')}><FilmStrip/> Scene generator</button><hr/><button><Upload/> Upload resource</button><button><MagicWand/> AI tool</button></div>}{runState==='done'&&<div className="clone-ready"><CheckCircle weight="fill"/><div><strong>Your replica is ready</strong><span>3 variants saved to Projects</span></div><button onClick={()=>setPage('projects')}>Review <ArrowRight/></button></div>}<ReactFlow nodes={nodes} edges={edges.map(e=>({...e,animated:runState==='running'}))} nodeTypes={cloneNodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView panOnScroll selectionOnDrag minZoom={0.28} maxZoom={1.8} defaultEdgeOptions={{type:'smoothstep'}} proOptions={{hideAttribution:true}}><Background color="var(--grid)" gap={24} size={1}/><MiniMap pannable zoomable nodeColor="#7566e8" maskColor="rgba(7,8,8,.76)"/><Controls showInteractive={false}/><Panel position="bottom-center" className="canvas-tip"><MouseSimple/> Drag to move · Scroll to zoom · Connect any node</Panel></ReactFlow></div></div>
}

function ProjectsPage({projects}){
  const [grid,setGrid]=useState(true); const [filter,setFilter]=useState('All'); const [selected,setSelected]=useState(null);
  return <div className="page"><Topbar title="Projects" subtitle={`${projects.length} assets and campaigns`} actions={<><button><UploadSimple/> Import</button><button className="primary"><Plus/> New project</button></>}/><div className="project-tools"><label><MagnifyingGlass/><input placeholder="Search by project or folder name"/></label><button onClick={()=>setFilter(filter==='All'?'Video':'All')}>{filter} <CaretDown/></button><button>All status <CaretDown/></button><button>All time <CaretDown/></button><span/><button onClick={()=>setGrid(false)} className={!grid?'on':''}><List/></button><button onClick={()=>setGrid(true)} className={grid?'on':''}><SquaresFour/></button></div><div className={grid?'project-grid':'project-list'}>{projects.filter(p=>filter==='All'||p.type==='Video').map((p)=><article className="project-card" key={p.name} onClick={()=>setSelected(p)}><div className="project-image"><img src={p.image}/><span>{p.ratio}</span>{p.type==='Video'&&<button aria-label={`Play ${p.name}`}><Play weight="fill"/></button>}</div><div className="project-copy"><div><h3>{p.name}</h3><p>{p.type} · {p.date}</p></div><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span><button aria-label={`More options for ${p.name}`}><DotsThree/></button></div></article>)}</div>{selected&&<div className="project-scrim" onClick={()=>setSelected(null)}><aside className="project-detail" onClick={e=>e.stopPropagation()}><div className="project-detail-head"><div><span>PROJECT OUTPUT</span><h2>{selected.name}</h2><p>{selected.type} · {selected.ratio} · {selected.date}</p></div><button onClick={()=>setSelected(null)}><X/></button></div><div className="detail-preview"><img src={selected.image}/><button><Play weight="fill"/></button><span>00:20</span></div><div className="detail-stats"><div><strong>3</strong><span>Variations</span></div><div><strong>28</strong><span>Languages</span></div><div><strong>48</strong><span>Credits</span></div></div><section><span>PUBLISH TO</span><div className="publish-channels"><button><TiktokLogo/> TikTok</button><button><InstagramLogo/> Reels</button><button><FacebookLogo/> Meta</button></div></section><section className="lead-card-summary"><div><MapPin/><span>LEAD CARD</span></div><strong>Visit Nusa Surfaces, Miami</strong><p>Book a free sample consultation · Get directions</p></section><div className="detail-actions"><button><DownloadSimple/> Download</button><button><ShareNetwork/> Share</button><button className="primary"><Export/> Publish campaign</button></div></aside></div>}</div>
}

function BrandPage(){const [tab,setTab]=useState('Overview'); const tabs=['Overview','Products','Avatars','Voices','Asset library','Brand kit'];return <div className="page"><Topbar title="My Brand" subtitle="Everything the AI needs to create on-brand content." actions={<button><PencilSimple/> Edit brand</button>}/><div className="brand-banner"><div className="brand-logo">N</div><div><h2>Nusa Surfaces</h2><p><MapPin/> Miami, Florida · nusa-surfaces.com</p></div><span/><div className="team"><Users/> 6 members</div></div><div className="stats-row"><div><strong>24</strong><span>PRODUCTS</span></div><div><strong>3</strong><span>AVATARS</span></div><div><strong>5</strong><span>VOICES</span></div><div><strong>186</strong><span>ASSETS</span></div><div><strong>92%</strong><span>BRAND KIT</span></div></div><div className="brand-tabs">{tabs.map(t=><button className={tab===t?'on':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="brand-content"><section><div className="section-title"><div><h2>{tab==='Overview'?'Products':tab}</h2><p>Reusable source material for every generation.</p></div><button><Plus/> Add new</button></div><div className="asset-grid"><article><img src={img.kitchen}/><h3>Calacatta Gold</h3><p>Porcelain slab · 12 assets</p></article><article><img src={img.patio}/><h3>Desert Sand Pavers</h3><p>Outdoor tile · 18 assets</p></article><article><img src={img.bath}/><h3>Ivory Stone</h3><p>Large-format tile · 9 assets</p></article><button className="add-asset"><Plus/><span>Add a product</span></button></div></section><aside className="brand-kit-card"><div><Palette/><span>BRAND KIT</span></div><h3>Quiet luxury. Made practical.</h3><p>Warm neutrals, architectural detail, confident but never loud.</p><div className="swatches"><i/><i/><i/><i/></div><button>Manage brand kit</button></aside></div></div>}

function StudioPage(){
  const [sample,setSample]=useState(null);
  const [briefOpen,setBriefOpen]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const samples=[
    {title:'Showroom product story',category:'Owner-led · TikTok',result:'+38% lead lift',video:'/assets/sample-showroom-launch.mp4',poster:img.viral},
    {title:'Before / after reveal',category:'Transformation · Reels',result:'2.1× watch time',video:'/assets/sample-before-after.mp4',poster:img.bath},
    {title:'Founder recommendation',category:'UGC · Meta',result:'31% lower CPL',video:'/assets/sample-owner-story.mp4',poster:img.avatar}
  ];
  const openBrief=()=>{setSubmitted(false);setBriefOpen(true)};
  const submitBrief=(event)=>{event.preventDefault();setSubmitted(true)};
  return <div className="page studio-service-page">
    <Topbar title="SunADS Studio" subtitle="Your done-for-you video team for home retail growth." actions={<><button onClick={()=>document.getElementById('studio-samples')?.scrollIntoView({behavior:'smooth'})}><Play/> View sample work</button><button className="primary" onClick={openBrief}><PaperPlaneTilt/> Start a video brief</button></>}/>
    <section className="studio-service-hero">
      <div className="studio-service-copy">
        <div className="eyebrow"><VideoCamera weight="fill"/> DONE-FOR-YOU VIDEO SERVICE</div>
        <h2>Winning home ads,<br/>made <em>for you.</em></h2>
        <p>A dedicated creative team handles strategy, scripting, AI production and final editing — from one brief to campaign-ready videos.</p>
        <div className="studio-service-stats"><div><strong>25–100+</strong><span>videos / month</span></div><div><strong>3–5 days</strong><span>first delivery</span></div></div>
        <div className="studio-benefits">
          <div><span><Sparkle weight="fill"/></span><div><strong>Home-industry creative specialists</strong><p>Built for tile, flooring, kitchen, bath and furniture retailers.</p></div></div>
          <div><span><Lightning weight="fill"/></span><div><strong>Performance thinking in every brief</strong><p>Hooks and concepts are informed by what converts on TikTok, Reels and Meta.</p></div></div>
          <div><span><CheckCircle weight="fill"/></span><div><strong>One workspace, managed end to end</strong><p>Brief, review, revision and approval without long email threads.</p></div></div>
        </div>
        <div className="studio-hero-actions"><button className="primary" onClick={openBrief}>Book a creative sprint <ArrowRight/></button><button onClick={()=>document.getElementById('studio-samples')?.scrollIntoView({behavior:'smooth'})}>See recent work</button></div>
      </div>
      <div className="studio-service-visual">
        <div className="studio-delivery"><i/> DELIVER WEEKLY</div>
        <div className="studio-video-stack">
          <img className="stack-left" src={img.patio}/>
          <video autoPlay muted loop playsInline src={samples[0].video} poster={samples[0].poster}/>
          <img className="stack-right" src={img.bath}/>
          <button aria-label="Play featured studio sample" onClick={()=>setSample(samples[0])}><Play weight="fill"/></button>
        </div>
        <div className="studio-visual-meta"><div><strong>180+</strong><span>home ads shipped</span></div><div><strong>92%</strong><span>approved first pass</span></div></div>
      </div>
    </section>
    <section className="studio-samples" id="studio-samples">
      <div className="section-title"><div><div className="eyebrow"><Play weight="fill"/> SAMPLE WORK</div><h2>Recent outsourced video work</h2><p>Short-form concepts produced by the SunADS creative team.</p></div><button onClick={openBrief}>Get videos like these <ArrowRight/></button></div>
      <div className="studio-sample-grid">{samples.map(item=><article key={item.title}>
        <div className="studio-sample-media"><video src={item.video} muted loop playsInline preload="metadata" poster={item.poster} onMouseEnter={event=>event.currentTarget.play()} onMouseLeave={event=>{event.currentTarget.pause();event.currentTarget.currentTime=0}}/><button aria-label={`Play sample: ${item.title}`} onClick={()=>setSample(item)}><Play weight="fill"/></button><span>00:06 · 9:16</span></div>
        <div className="studio-sample-copy"><div><span>{item.category}</span><h3>{item.title}</h3></div><strong><TrendUp/> {item.result}</strong></div>
      </article>)}</div>
    </section>
    <section className="studio-process">
      <div><span>01</span><strong>Submit one brief</strong><p>Goal, product, market and offer.</p></div><ArrowRight/>
      <div><span>02</span><strong>Approve concepts</strong><p>Hooks, scripts and visual directions.</p></div><ArrowRight/>
      <div><span>03</span><strong>Review first cuts</strong><p>Comment directly in the workspace.</p></div><ArrowRight/>
      <div><span>04</span><strong>Receive variants</strong><p>Ready for TikTok, Reels and Meta.</p></div>
    </section>
    {sample&&<div className="studio-modal-scrim" onClick={()=>setSample(null)}><div className="sample-player" onClick={event=>event.stopPropagation()}><button className="studio-modal-close" aria-label="Close sample" onClick={()=>setSample(null)}><X/></button><video src={sample.video} autoPlay controls playsInline poster={sample.poster}/><div><span>{sample.category}</span><h2>{sample.title}</h2><p>Strategy, scripting, AI production, captions and final edit by SunADS Studio.</p><strong>{sample.result}</strong></div></div></div>}
    {briefOpen&&<div className="studio-modal-scrim" onClick={()=>setBriefOpen(false)}><div className="studio-brief-modal" onClick={event=>event.stopPropagation()}><button className="studio-modal-close" aria-label="Close brief" onClick={()=>setBriefOpen(false)}><X/></button>{submitted?<div className="brief-success"><CheckCircle weight="fill"/><span>BRIEF RECEIVED</span><h2>Your creative producer will reply within one business day.</h2><p>We will review the product, market and goal before recommending the first sprint.</p><button className="primary" onClick={()=>setBriefOpen(false)}>Back to Studio</button></div>:<><div className="eyebrow"><PaperPlaneTilt/> NEW PRODUCTION BRIEF</div><h2>What should we create for you?</h2><p>Share the basics. We will turn it into a production plan.</p><form onSubmit={submitBrief}><label>Brand or showroom<input required placeholder="Nusa Surfaces"/></label><label>Product URL<input required placeholder="https://yourstore.com/product"/></label><label>Campaign goal<select defaultValue="Showroom leads"><option>Showroom leads</option><option>Product launch</option><option>Direct sales</option><option>Brand awareness</option></select></label><label>Monthly volume<select defaultValue="25 videos"><option>10 videos</option><option>25 videos</option><option>50 videos</option><option>100+ videos</option></select></label><label className="brief-wide">What do you want customers to do?<textarea required placeholder="Book a showroom visit, request a free sample, or message us on WhatsApp…"/></label><button className="primary brief-wide" type="submit">Send production brief <ArrowRight/></button></form></>}</div></div>}
  </div>
}

function PerformancePage(){return <div className="page"><Topbar title="Performance" subtitle="Understand which assets create attention and leads." actions={<><button>Last 30 days <CaretDown/></button><button className="primary">Connect Meta Ads</button></>}/><div className="metrics"><div><span>LEADS</span><strong>418</strong><em><TrendUp/> +22.4%</em></div><div><span>COST PER LEAD</span><strong>$12.84</strong><em><TrendUp/> 18% better</em></div><div><span>CONTENT PUBLISHED</span><strong>76</strong><small>3 channels</small></div><div><span>SHOWROOM VISITS</span><strong>129</strong><small>31% of leads</small></div></div><div className="performance-layout"><section className="chart-card"><div className="section-title"><div><h2>Lead trend</h2><p>Attributed by asset_id</p></div><span>Jul 20 — Aug 18</span></div><div className="bars">{[38,55,46,72,64,84,77,95,73,100,88,112].map((h,i)=><i key={i} style={{height:h}}><span>{i===11?'42':''}</span></i>)}</div></section><section className="rank-card"><div className="section-title"><h2>Top creative</h2></div>{projectsSeed.slice(0,3).map((p,i)=><div className="rank" key={p.name}><strong>0{i+1}</strong><img src={p.image}/><div><b>{p.name}</b><span>{32-i*7} leads · ${(9.8+i*2.4).toFixed(2)} CPL</span></div><ArrowRight/></div>)}</section></div></div>}

function UtilityPanel({type,close}){const content={api:['API access','Build with the same image, video and workflow engine.'],learn:['SunADS Academy','Short guides for better product ads and showroom lead flows.'],referral:['Invite & earn','Give a friend 200 credits. Get 200 when they publish.'],notifications:['Notifications','Your Calacatta Gold campaign is ready to review.'],profile:['Nusa Surfaces','SunADS Pro workspace']}[type]||['Menu',''];return <div className="scrim" onClick={close}><aside className="utility-panel" onClick={e=>e.stopPropagation()}><div className="panel-head"><div><span>SUNADS</span><h2>{content[0]}</h2></div><button onClick={close}><X/></button></div><p>{content[1]}</p>{type==='api'&&<><div className="api-usage"><span>API usage this month</span><strong>18,420 <small>/ 50,000 requests</small></strong><i><b/></i></div><div className="api-key"><Key/><span>sun_live_••••••••••••4H2K</span><button><Copy/></button></div><button className="primary">Open API docs</button></>}{type==='learn'&&<div className="lesson-list"><button><Play/> Create your first showroom ad <span>4 min</span></button><button><FlowArrow/> Build a reusable Ad Flow <span>7 min</span></button><button><Target/> Add a lead card <span>3 min</span></button></div>}{type==='referral'&&<div className="referral-card"><Gift weight="fill"/><strong>200 + 200 credits</strong><button className="primary">Copy invitation link</button></div>}{type==='notifications'&&<><div className="notice"><CheckCircle weight="fill"/><div><strong>Campaign generated</strong><span>3 variations are ready · 12 min ago</span></div></div><div className="notice"><Coins weight="fill"/><div><strong>Monthly credits renewed</strong><span>1,500 credits added · Aug 15</span></div></div></>}{type==='profile'&&<><div className="plan-card"><div><Crown weight="fill"/><span>PRO PLAN</span></div><strong>1,280 credits remaining</strong><i><b/></i><small>Renews Sep 15</small></div><div className="profile-menu"><button><UserCircle/> Account settings</button><button><Users/> Team members</button><button><Coins/> Billing & credits</button></div></>}</aside></div>}

export function App(){
  const [page,setPage]=useState('home'); const [theme,setTheme]=useState('dark'); const [overlay,setOverlay]=useState(null); const [projects,setProjects]=useState(projectsSeed);
  const addProject=p=>setProjects(prev=>prev.some(x=>x.name===p.name)?prev:[p,...prev]);
  const pages={home:<HomePage setPage={setPage}/>,agent:<AgentPage setPage={setPage} addProject={addProject}/>,flow:<FlowPage setPage={setPage}/>,projects:<ProjectsPage projects={projects}/>,brand:<BrandPage/>,studio:<StudioPage/>,performance:<PerformancePage/>};
  return <Shell page={page} setPage={setPage} theme={theme} setTheme={setTheme} overlay={overlay} setOverlay={setOverlay}>{pages[page]}</Shell>
}
