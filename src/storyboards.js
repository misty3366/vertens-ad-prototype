/* ---------------------------------------------------------------------------
   Full storyboards for the twenty test scripts.

   Rules baked into this file, do not quietly relax them:
   - Hook lines and voice-over stay in the language the piece will actually be
     shot in. Only stage directions, prep notes and guardrails are bilingual.
   - Every claim spoken on camera must be countable from a real checkup report.
     No estimated revenue loss, ever.
   - Any named or recognisable store requires written consent; otherwise the
     handle, avatar and follower count are masked before the frame is recorded.
--------------------------------------------------------------------------- */

export const storyboards = zh => ({

  A1: {
    title: zh?'一家橱柜展厅的账号体检拆解':'Teardown of one cabinet showroom checkup',
    goal: zh?'A 组主对照。用最短的路径证明「体检」这个钩子成立：看完 → 粘链接 → 拿报告，中间没有任何一步。':'The control for group A. Prove the checkup hook works on the shortest possible path: watch, paste, receive. Nothing in between.',
    spec: zh?'9:16 竖屏 · 45 秒 · 全程屏幕录屏 + 画外音 · 无需真人出镜':'9:16 vertical · 45s · screen recording throughout with voice-over · no on-camera talent',
    kind:'shot',
    hooks:[
      'Four thousand two hundred followers. Twenty-two posts. Eighteen of them never say where the store is.',
      'This showroom has 4,200 followers, and no address on eighteen of its last twenty-two posts.',
      'I found eighteen posts from this store that a customer cannot act on.'
    ],
    shots:[
      {n:'1',t:'0:00–0:04',v:zh?'屏幕录屏：Instagram 门店主页，光标在粉丝数上停 0.5 秒画一个圈。头像与店名已打码。':'Screen recording: the store Instagram profile. Cursor circles the follower count for half a second. Handle and avatar are masked.',s:'Four thousand two hundred followers. Twenty-two posts. Eighteen of them never say where the store is.',note:zh?'第一帧就要有具体数字，不要 logo、不要片头。':'The first frame carries a number. No logo, no intro card.'},
      {n:'2',t:'0:04–0:14',v:zh?'快速下滑九宫格，后期给 18 个格子逐个打上红色 ✕，节奏跟着口播走。':'Scroll the grid fast; in post, drop a red cross onto eighteen tiles one at a time, paced to the voice-over.',s:'Eighteen of these have no address, no phone, no way to book. Beautiful kitchens with nowhere to go.',note:zh?'✕ 的落点要对准真实缺信息的那几条，不能随便打。':'Each cross lands on a tile that genuinely lacks the info — do not fake the placement.'},
      {n:'3',t:'0:14–0:24',v:zh?'切到体检报告页。健康分数字从 100 滚落到 42，六个问题行依次淡入。':'Cut to the checkup report. The score counts down from 100 to 42; the six issue rows fade in one by one.',s:'This is a free account checkup. Sixty seconds, no signup.',note:zh?'分数动画不要超过 1.2 秒，观众要看的是问题不是特效。':'Keep the score animation under 1.2 seconds — the issues are the payload, not the effect.'},
      {n:'4',t:'0:24–0:36',v:zh?'光标点开第一条问题「22 条内容里 18 条没有门店信息」，右侧 Fix 按钮高亮一次。':'Cursor opens the first issue — eighteen of twenty-two posts missing store info — and the Fix button pulses once.',s:"It doesn't guess your revenue. It counts what is on your page. You can check every number yourself.",note:zh?'这句是整条片子的信任支点，语速放慢。':'This line is the trust pivot of the whole piece. Slow the delivery.'},
      {n:'5',t:'0:36–0:45',v:zh?'回到体检输入框，光标粘贴一条链接，进度条起跑后定格。屏幕字：Paste your link. 60 seconds.':'Back to the checkup input. The cursor pastes a link, the progress bar starts, freeze. On-screen text: Paste your link. 60 seconds.',s:'Paste your link. Sixty seconds. Free, and we do not ask for your email.',note:''}
    ],
    prep:[
      zh?'一个真实门店账号 —— 已拿书面授权，或全程打码店名、头像、粉丝数':'One real store account — with written consent, or with handle, avatar and follower count masked throughout',
      zh?'该账号的真实体检报告（不要造报告）':'A genuine checkup report for that account — never a mocked-up one',
      zh?'屏幕录屏 60fps，光标放大到 1.5 倍便于小屏识别':'Screen capture at 60fps, cursor scaled to 1.5× so it reads on a phone',
      zh?'画外音：美式英语，语速偏慢，不用配乐只用轻底噪':'Voice-over in American English, slightly slow, no music bed — light room tone only'
    ],
    publish:[
      [zh?'文案':'Caption','Free checkup, no signup. Paste a Facebook, Instagram or TikTok profile and get a score in sixty seconds. Link in bio.'],
      [zh?'置顶评论':'Pinned comment',zh?'放体检直链 —— 不要放主页链接，多一跳就掉一半':'The direct checkup URL — not the homepage. Every extra hop halves it'],
      [zh?'标签':'Hashtags','#kitchenremodel #cabinetshop #smallbusinessmarketing #localbusiness'],
      [zh?'落地':'Destination',zh?'体检页，免注册，不预填任何字段':'The checkup page, no signup, no pre-filled fields']
    ],
    guard:[
      zh?'门店名与头像必须打码，或先拿到书面授权 —— 指名未授权门店在行业社群里会瞬间反噬':'Mask the handle and avatar, or get written consent first. Naming a store without permission becomes a reputation incident within hours',
      zh?'不出现任何估算金额。只念数得出来的：发了几条、几条缺信息、分数多少':'No estimated dollar figures. Only what is countable: posts published, posts missing info, the score'
    ]
  },

  A2: {
    title: zh?'休斯顿 12 家地板店的批量体检':'Twelve Houston flooring stores, checked in one pass',
    goal: zh?'测「规模化叙事」是否比「单店叙事」更能拉动提交 —— 同一个钩子，一家 vs 十二家。':'Test whether the aggregate framing outperforms the single-store framing. Same hook, one store versus twelve.',
    spec: zh?'9:16 竖屏 · 60 秒 · 屏幕录屏 + 数据动画 + 画外音':'9:16 vertical · 60s · screen recording, data animation, voice-over',
    kind:'shot',
    hooks:[
      'I ran a free checkup on twelve flooring stores in Houston. Average score: forty-four out of a hundred.',
      'Twelve flooring stores, one city. Not one of them scored above sixty-one.',
      'I checked every flooring store I could find in Houston. Here is the scoreboard.'
    ],
    shots:[
      {n:'1',t:'0:00–0:05',v:zh?'12 张分数卡片排成网格，逐张翻出分数，全部匿名为 Store 01–12。':'Twelve score cards in a grid, flipping over one by one. All anonymised as Store 01 through 12.',s:'I ran a free checkup on twelve flooring stores in Houston. Average score: forty-four out of a hundred.',note:''},
      {n:'2',t:'0:05–0:18',v:zh?'卡片重排为从高到低的排行，最高 61 与最低 29 高亮。':'Cards re-sort into a ranking, high to low. Highlight the 61 at the top and the 29 at the bottom.',s:'Highest sixty-one. Lowest twenty-nine. These are not small shops — the one at the top has eleven thousand followers.',note:zh?'点出「不是小店」很关键，否则观众会自我豁免。':'Naming that these are not small shops matters — otherwise viewers exempt themselves.'},
      {n:'3',t:'0:18–0:34',v:zh?'三个共同问题以计数条呈现：断更 9/12 · 缺门店信息 11/12 · 只发一个平台 8/12。':'Three shared issues shown as counters: posting gaps 9 of 12, missing store info 11 of 12, single-platform 8 of 12.',s:'Nine of twelve went more than two weeks without posting. Eleven of twelve are missing store info on most posts. Eight of twelve only publish on one platform.',note:zh?'每个数字都要能从 12 份真实报告里数出来。':'Every counter has to be countable from the twelve real reports.'},
      {n:'4',t:'0:34–0:48',v:zh?'放大其中一家的三次体检趋势 55 → 48 → 42，折线向下。':'Zoom into one store’s three checkups: 55, 48, 42 — the line sloping down.',s:'This one is not getting worse by accident. Nobody is looking.',note:''},
      {n:'5',t:'0:48–1:00',v:zh?'切回输入框，屏幕字：Your city is next. Paste your link.':'Back to the input field. On-screen text: Your city is next. Paste your link.',s:'Free, sixty seconds, no signup. Do yours before your competitor does.',note:''}
    ],
    prep:[
      zh?'真实跑完 12 家的体检，保存原始报告以备核对':'Actually run all twelve checkups and keep the raw reports for verification',
      zh?'全部匿名为 Store 01–12，不出现任何可识别信息':'Anonymise as Store 01–12; no identifying detail on screen',
      zh?'数据动画用产品真实截图改造，不要另做一套设计':'Build the animation from real product screenshots rather than a separate design'
    ],
    publish:[
      [zh?'文案':'Caption','Twelve Houston flooring stores, twelve free checkups. Average 44 out of 100. Yours takes sixty seconds.'],
      [zh?'投放':'Placement',zh?'Facebook 本地商家群组为主 —— 城市名是这条的引信':'Facebook local-business groups first — the city name is this piece’s fuse'],
      [zh?'可复制':'Reusable',zh?'换城市换品类即可复制，一个模板产出十几条':'Swap city and category to reproduce; one template yields a dozen pieces']
    ],
    guard:[
      zh?'全部匿名，只报计数，不排名点名':'Fully anonymised, counts only, no named ranking',
      zh?'样本口径要能说清：从哪里抽的 12 家、排除了什么':'Be able to state the sampling method: where the twelve came from and what was excluded'
    ]
  },

  A3: {
    title: zh?'断更十九天':'Nineteen days of silence',
    goal: zh?'测「断更」角度对比「缺门店信息」角度，哪一个更能让老板立刻动手。':'Test the posting-gap angle against the missing-store-info angle: which one gets an owner to act today.',
    spec: zh?'9:16 竖屏 · 30 秒 · 图形 + 屏幕录屏 · 画外音':'9:16 vertical · 30s · motion graphics plus screen recording, voice-over',
    kind:'shot',
    hooks:[
      'Your last post was nineteen days ago.',
      'Nineteen days of silence. Your feed already moved on without you.',
      'Four posts in thirty days. The longest gap was nineteen.'
    ],
    shots:[
      {n:'1',t:'0:00–0:04',v:zh?'一个日历网格，19 个格子依次变灰。':'A calendar grid; nineteen cells grey out in sequence.',s:'Your last post was nineteen days ago.',note:''},
      {n:'2',t:'0:04–0:12',v:zh?'切到体检报告里「30 天发 4 条，最长断更 19 天」那一行，高亮。':'Cut to the report line reading four posts in thirty days, longest gap nineteen. Highlight it.',s:'Four posts in thirty days. This is not a content problem. This is a stopping problem.',note:''},
      {n:'3',t:'0:12–0:22',v:zh?'分屏：同一家店断更前后的发布节奏条形图，用该店自己的历史数据。':'Split screen: the same store’s posting rhythm before and after the gap, using its own history.',s:'Same store. Same photos. The only thing that changed was the gap.',note:zh?'⚠ 只用这家店自己的数据做对比，不要引用任何平台算法机制的断言。':'⚠ Compare the store only against itself. Do not assert anything about platform algorithm mechanics.'},
      {n:'4',t:'0:22–0:30',v:zh?'输入框 + 屏幕字：How long is your gap?':'Input field with on-screen text: How long is your gap?',s:'Free checkup. Sixty seconds. It will tell you your longest gap.',note:''}
    ],
    prep:[
      zh?'一家有明显断更史的授权门店（或打码）':'A consenting store with a visible posting gap — or masked',
      zh?'两段真实的发布节奏数据':'Two genuine stretches of posting-cadence data'
    ],
    publish:[
      [zh?'文案':'Caption','How many days since your last post? The free checkup counts it for you.'],
      [zh?'置顶评论':'Pinned comment',zh?'直接问：你最长断更多少天？评论区回一个数':'Ask directly: what is your longest gap? Drop a number in the comments']
    ],
    guard:[
      zh?'⚠ 绝对不要说「第 7 天触达减半」这类平台机制断言 —— 我们没有这个数据的出处，一旦被质疑整条片子垮掉。只讲这家店自己的前后对比。':'⚠ Never claim things like reach halves after day seven. We have no citable source, and one challenge collapses the piece. Stick to this store’s own before-and-after.'
    ]
  },

  A4: {
    title: zh?'55、48、42 —— 三个月，同一家店':'Fifty-five, forty-eight, forty-two',
    goal: zh?'测「自身趋势」能否制造紧迫感。这也是唯一一条同时宣传「每月复检」的片子，直接服务 M5。':'Test whether a store’s own trend creates urgency. It is also the only piece that promotes monthly re-checking, which serves M5 directly.',
    spec: zh?'9:16 竖屏 · 35 秒 · 数据动画 + 屏幕录屏':'9:16 vertical · 35s · data animation plus screen recording',
    kind:'shot',
    hooks:[
      'Fifty-five. Then forty-eight. Then forty-two. Same store, three months, nobody told them.',
      'Your account has a score, and it has been falling for three months.',
      'Three checkups, three months. The line only goes one way.'
    ],
    shots:[
      {n:'1',t:'0:00–0:05',v:zh?'三个数字依次砸入画面，字号很大，背景纯色。':'Three numbers slam in one after another, very large, on a flat background.',s:'Fifty-five. Then forty-eight. Then forty-two.',note:zh?'不要配图，这三个数字自己就是画面。':'No imagery. The three numbers are the frame.'},
      {n:'2',t:'0:05–0:16',v:zh?'折线图向下延伸，三个点标上月份。':'A line chart extends downward, three points labelled by month.',s:"We do not compare you to your competitors. We cannot reliably know who they are, and a comparison built on a guess is worth nothing. We compare you to you.",note:zh?'这句是纪律三的对外表达，也是我们和同类工具的分野。':'This line is discipline three stated publicly, and it is where we part company with similar tools.'},
      {n:'3',t:'0:16–0:28',v:zh?'三次报告并排，变化的两项高亮：发布数 9→4，带门店信息 6→2。':'Three reports side by side; two changed rows highlighted — posts 9 to 4, posts with store info 6 to 2.',s:'Posts dropped from nine to four. Posts carrying store info dropped from six to two. Both of those are countable, and you can check them yourself.',note:''},
      {n:'4',t:'0:28–0:35',v:zh?'屏幕字：Run one now. Run one next month.':'On-screen text: Run one now. Run one next month.',s:'Run one now. Run another next month. The second number is the useful one.',note:''}
    ],
    prep:[
      zh?'一家有三次真实体检记录的门店（种子客户最合适）':'A store with three genuine checkup records — a seed customer is the natural fit',
      zh?'趋势图直接用产品内的对比视图录屏':'Record the trend view straight from the product'
    ],
    publish:[
      [zh?'文案':'Caption','Your score next month is the one that matters. Run the first one free.'],
      [zh?'复用':'Reuse',zh?'这条也放在体检报告结果页底部，推动 M5 复检':'Also embed at the bottom of the report page to drive M5 re-checks']
    ],
    guard:[
      zh?'紧迫感只能来自这家店自己的趋势。任何同行对比都会毁掉整份报告的可信度':'Urgency comes only from the store’s own trend. Any competitor comparison discredits the entire report'
    ]
  },

  A5: {
    title: zh?'22 条内容，0 个真人':'Twenty-two posts, not one face',
    goal: zh?'测「真人出镜缺口」作为切入点。这条明确不讲数字人，只讲真人。':'Test the missing-human-face gap as an entry point. This piece never mentions avatars — only people.',
    spec: zh?'9:16 竖屏 · 30 秒 · TikTok 优先 · 屏幕录屏 + 一段实拍':'9:16 vertical · 30s · TikTok first · screen recording plus one live shot',
    kind:'shot',
    hooks:[
      'Zero of your last twenty-two posts have a human face in them.',
      'Twenty-two posts of countertops. Not one person.',
      'Your feed looks like a catalogue. Nobody saves a catalogue.'
    ],
    shots:[
      {n:'1',t:'0:00–0:04',v:zh?'九宫格全是产品图，极快下滑，节奏感强。':'A grid of pure product shots, scrolling fast with a hard rhythm.',s:'Zero of your last twenty-two posts have a human face in them.',note:''},
      {n:'2',t:'0:04–0:14',v:zh?'体检报告里「0 条有真人出镜」那一行高亮。':'Highlight the report row reading zero posts with a person on camera.',s:'Not one. And this is a business where people buy from a person, not from a slab.',note:''},
      {n:'3',t:'0:14–0:24',v:zh?'切到同一家店一条有店员出镜的内容，手持竖屏，20 秒讲一个材质。':'Cut to one post from the same store featuring an employee — handheld vertical, twenty seconds about one material.',s:'One employee. One phone. Twenty seconds. That is the whole production.',note:zh?'这段实拍要故意粗糙，精致会传达错误的门槛感。':'Shoot this deliberately rough. Polish signals a barrier we do not want to imply.'},
      {n:'4',t:'0:24–0:30',v:zh?'输入框 + CTA。':'Input field and CTA.',s:'Free checkup. It will tell you how many of your posts have a person in them.',note:''}
    ],
    prep:[
      zh?'一段店员出镜的真实素材（20 秒即可，手机拍）':'One genuine employee-on-camera clip — twenty seconds, shot on a phone',
      zh?'出镜人的书面肖像授权':'Written likeness consent from whoever appears'
    ],
    publish:[
      [zh?'文案':'Caption','How many of your last twenty posts have a person in them? Count them, then run the free checkup.'],
      [zh?'平台':'Platform',zh?'TikTok 优先，这个角度在 TikTok 的完播最好':'TikTok first — this angle retains best there']
    ],
    guard:[
      zh?'⚠ 这条绝对不讲数字人克隆。一提就滑进 HeyGen 的对比，而那是我们最弱的差异':'⚠ This piece never mentions avatar cloning. Mentioning it invites a HeyGen comparison, which is our weakest ground'
    ]
  },

  A6: {
    title: zh?'纯 CTA 对照组':'Pure-CTA control',
    goal: zh?'对照组。它没有任何叙事，只有动作。A1–A5 的成绩必须减去这条才是「钩子叙事」的真实增量。':'The control. No narrative, only the action. Subtract this piece’s result from A1–A5 to get the real lift of the hook narrative.',
    spec: zh?'9:16 竖屏 · 15 秒 · 无口播，只字幕与音效 · 全渠道通投':'9:16 vertical · 15s · no voice-over, captions and sound design only · runs on every channel',
    kind:'shot',
    hooks:[
      'Paste your Instagram link. Sixty seconds. No signup, no card.',
      'Free account checkup. Sixty seconds. We do not even ask for your email.',
      'Sixty seconds from now you will know what is wrong with your feed.'
    ],
    shots:[
      {n:'1',t:'0:00–0:03',v:zh?'输入框特写，光标粘贴链接，一个清脆的键入音。':'Close on the input field. Cursor pastes a link, one crisp keystroke sound.',s:'Paste your Instagram link.',note:''},
      {n:'2',t:'0:03–0:09',v:zh?'进度条走完 → 分数 42 弹出 → 六条问题快速滚过，每条一个短音。':'Progress bar completes, score 42 pops, six issues scroll past, each with a short tick.',s:'Sixty seconds.',note:zh?'这六条要真的能读清，不要为了炫速度糊掉。':'The six issues must stay legible — do not blur them for the sake of pace.'},
      {n:'3',t:'0:09–0:15',v:zh?'定格在报告页，屏幕字：No signup. No card.':'Freeze on the report. On-screen text: No signup. No card.',s:'No signup. No card.',note:''}
    ],
    prep:[
      zh?'一次真实的体检录屏，剪到 15 秒':'One real checkup capture, cut to fifteen seconds',
      zh?'不需要配音，不需要演员，不需要门店授权':'No voice-over, no talent, no store consent required'
    ],
    publish:[
      [zh?'用途':'Purpose',zh?'每个渠道都投一份，作为该渠道的基线':'Run one copy on every channel as that channel’s baseline'],
      [zh?'读法':'How to read it',zh?'其他脚本的单体检成本必须优于它，否则那条叙事没有价值':'Any other script must beat its cost-per-checkup, or that narrative adds nothing']
    ],
    guard:[
      zh?'这条永远不要优化。它一旦被优化就不再是对照组':'Never optimise this one. The moment it is optimised it stops being a control'
    ]
  },

  B7: {
    title: zh?'一家店，五个店员，六十一条':'One store, five employees, sixty-one posts',
    goal: zh?'员工矩阵的正面实证。全线竞品拍不出来的画面。不做钩子，做说服。':'Frontal proof of the employee matrix — the one shot no competitor can produce. Not a hook; persuasion.',
    spec: zh?'9:16 竖屏 · 50 秒 · 门店实拍 + 后台录屏 · 本组最贵的一条':'9:16 vertical · 50s · location footage plus dashboard capture · the most expensive piece in the set',
    kind:'shot',
    hooks:[
      'One store. Five employees. Sixty-one posts last month. Here is who actually brought people in.',
      'Their sales team posted sixty-one times last month. Two of them brought in almost everyone.',
      'Same store, same product, five phones. The results were not close.'
    ],
    shots:[
      {n:'1',t:'0:00–0:06',v:zh?'实拍：展厅里五名店员并排，各自举起手机，屏幕上是五条不同的内容。一个横移镜头带过。':'Location: five employees side by side in the showroom, each holding up a phone showing a different post. One lateral dolly across them.',s:'One store. Five employees. Sixty-one posts last month.',note:zh?'不要摆拍笑脸，自然站姿即可。':'No posed smiles. Natural stance.'},
      {n:'2',t:'0:06–0:16',v:zh?'四个快切：展厅空镜、手机屏幕特写、店员低头编辑、内容发出的瞬间。':'Four quick cuts: showroom wide, phone screen close-up, an employee editing head-down, the moment a post goes out.',s:'Same shop. Same photos. Five different networks that barely overlap.',note:''},
      {n:'3',t:'0:16–0:30',v:zh?'切到屏幕录屏：Leads 页，按到店线索排序，Employee 列在画面正中。':'Cut to screen capture: the Leads page sorted by walk-in leads, the Employee column dead centre.',s:'Twenty-three walk-ins came from posts last month. Nine of them came from one person.',note:zh?'Employee 列必须在画面正中，这是这条片子的全部意义。':'The Employee column must sit centre frame. It is the entire point of the piece.'},
      {n:'4',t:'0:30–0:42',v:zh?'光标点开那一条线索，展开：内容缩略图、发布人、平台、日期、置信度 86%。':'Cursor opens that lead: post thumbnail, who published it, platform, date, 86% confidence.',s:'Not social media worked. This post, this person, this day. And we show you the confidence, because eighty-six is the honest number.',note:''},
      {n:'5',t:'0:42–0:50',v:zh?'回到展厅五人镜头，定格，屏幕字：Nobody else shows you this column.':'Back to the five-employee frame, freeze. On-screen text: Nobody else shows you this column.',s:'Nobody else can show you that column.',note:''}
    ],
    prep:[
      zh?'一家授权门店 + 五名店员的书面肖像授权':'One consenting store plus written likeness consent from all five employees',
      zh?'该店真实的归因数据（种子客户 D31–D60 阶段产出）':'Genuine attribution data from that store — produced in the seed program’s D31–D60 stage',
      zh?'拍摄半天：展厅横移 + 四个空镜 + 手机屏幕特写':'Half a day on location: the lateral dolly, four cutaways, phone screen close-ups',
      zh?'后台录屏另做，不要在店里录（现场网速与光线都不可控）':'Capture the dashboard separately, not in the store — bandwidth and lighting are uncontrollable there'
    ],
    publish:[
      [zh?'用途':'Purpose',zh?'落地页第二屏、销售私信、种子案例五件套里的 90 秒视频由它扩写':'Landing page fold two, sales DMs, and the base for the 90-second case video'],
      [zh?'文案':'Caption','Which post brought them in, and who posted it. That column does not exist anywhere else.']
    ],
    guard:[
      zh?'员工姓名与肖像必须书面授权':'Employee names and likenesses require written consent',
      zh?'数据不修饰。如果那个月只有 9 条线索就说 9 条':'Do not dress the numbers. If the month produced nine leads, say nine'
    ]
  },

  B8: {
    title: zh?'你的销售早就在发，只是没发你的店':'Your sales guy already posts — just not your store',
    goal: zh?'痛点式进入员工矩阵。B7 讲结果，这条讲「你已经有这个资源了」。':'A pain-first entry into the employee matrix. B7 shows the result; this one says the resource is already in the building.',
    spec: zh?'9:16 竖屏 · 30 秒 · 一段实拍 + 图形 + 产品录屏':'9:16 vertical · 30s · one live shot, motion graphics, product capture',
    kind:'shot',
    hooks:[
      'Your sales guy already posts every day. He is just not posting your store.',
      'You have five employees and one account. That math is backwards.',
      'Your best salesperson has an audience. You are not using it.'
    ],
    shots:[
      {n:'1',t:'0:00–0:05',v:zh?'实拍：一名店员在休息区刷手机、随手发了一条自己的内容。手持，略晃。':'Location: an employee in the break area scrolling, casually posting something of their own. Handheld, slightly loose.',s:'Your sales guy already posts every day. He is just not posting your store.',note:''},
      {n:'2',t:'0:05–0:15',v:zh?'图形：一个店账号的圆 vs 五个员工账号的圆，重叠部分很小。':'Graphic: one store-account circle against five employee circles, with very little overlap.',s:'One account reaches your followers. Five accounts reach five networks that barely touch.',note:''},
      {n:'3',t:'0:15–0:25',v:zh?'产品录屏：PC 端建一条任务 → 五台手机同时弹出通知 → 三个人已发布。':'Product capture: create one task on desktop, five phones light up, three already published.',s:'You assign once. They each publish to their own. Employees, accounts and shops are all unlimited — we do not charge for any of them.',note:''},
      {n:'4',t:'0:25–0:30',v:zh?'CTA 屏幕字：Start with the free checkup.':'CTA card: Start with the free checkup.',s:'Start with the free checkup.',note:''}
    ],
    prep:[
      zh?'一段自然的店员刷手机实拍（不需要脸部特写，肩后视角即可）':'One natural clip of an employee on their phone — over-the-shoulder is enough, no face needed',
      zh?'多设备同时收到任务的录屏（可用两台手机拼）':'A multi-device capture of the task landing — two phones can be composited'
    ],
    publish:[
      [zh?'投放':'Placement',zh?'Facebook 本地商家群组、LinkedIn':'Facebook local-business groups and LinkedIn'],
      [zh?'置顶评论':'Pinned comment',zh?'「你店里几个人？」—— 这个问题的回答是我们要的分布数据':'Ask how many people work there. The replies are distribution data we actually need']
    ],
    guard:[
      zh?'任何举例数字（粉丝数、条数）字幕上标 example，或直接换成真实门店数据':'Label any illustrative figure as an example on screen, or swap in real store data'
    ]
  },

  B9: {
    title: zh?'归因表逐列拆解':'The attribution table, column by column',
    goal: zh?'纯产品实证，服务 M4。全片的说服力建立在一件事上：我们主动展示 86% 而不是 100%。':'Pure product proof, serving M4. Its entire persuasive weight rests on one thing: we volunteer 86%, not 100%.',
    spec: zh?'9:16 与 16:9 各出一版 · 60 秒 · 纯屏幕录屏 + 画外音':'One 9:16 and one 16:9 cut · 60s · screen recording only, with voice-over',
    kind:'shot',
    hooks:[
      'The one column nobody else has.',
      'Which post brought them in, and who posted it.',
      'Eighty-six percent attributed. Let me show you the other fourteen.'
    ],
    shots:[
      {n:'1',t:'0:00–0:08',v:zh?'Leads 页全貌，光标缓慢移过表头，停在 Employee 列。':'The Leads page in full. The cursor moves slowly across the header and stops on the Employee column.',s:'Every lead row here has two things attached: the post that produced it, and the person who published that post.',note:''},
      {n:'2',t:'0:08–0:22',v:zh?'点开一条线索，展开面板：内容缩略图、发布员工、平台、时间、到店时间。':'Open one lead. The panel expands: post thumbnail, publishing employee, platform, timestamp, walk-in time.',s:'Thumbnail. Employee. Platform. When it published, and when they walked in.',note:''},
      {n:'3',t:'0:22–0:38',v:zh?'光标点开置信度标注 86%，展开确定性与建模值的分区。':'Cursor opens the 86% confidence marker, revealing the deterministic and modelled split.',s:"Eighty-six percent. We show you which part is measured and which part is modelled, because if we hid that you would be right not to trust the number.",note:zh?'这一镜是整条片子的价值所在，给它最长的停留。':'This shot is where the piece earns its keep. Give it the longest dwell.'},
      {n:'4',t:'0:38–0:52',v:zh?'切到跨店视图，三家店并排，各自的员工榜。':'Cut to the cross-shop view: three stores side by side with their own employee leaderboards.',s:'Three shops, one view. Which shop, which person, which post.',note:''},
      {n:'5',t:'0:52–1:00',v:zh?'屏幕字：Lite shows the total. Pro shows the reason.':'On-screen text: Lite shows the total. Pro shows the reason.',s:'Lite tells you twelve leads came in. Pro tells you why.',note:''}
    ],
    prep:[
      zh?'一份有真实数据的归因视图（种子客户 D31–D60 产出）':'An attribution view populated with real data — from the seed program’s D31–D60 stage',
      zh?'门店与员工姓名做展示化处理但保持真实结构':'Display-safe store and employee names, but keep the real structure'
    ],
    publish:[
      [zh?'用途':'Purpose',zh?'落地页归因版块、Lite 用户的升级引导位、销售私信附件':'Landing-page attribution module, the in-product Lite upgrade prompt, and a sales DM attachment'],
      [zh?'不投':'Not for feeds',zh?'不作为社媒钩子投放 —— 归因当不了鱼饵':'Do not run it as a feed hook. Attribution cannot be the bait']
    ],
    guard:[
      zh?'必须显示 86% 而不是 100%。这条片子的全部力量在诚实上':'It must read 86%, never 100%. The honesty is the whole argument'
    ]
  },

  B10: {
    title: zh?'我们不做什么':'What we do not do',
    goal: zh?'把 §7 验证过的销售话术顺序做成素材：先承认不做什么，再讲做什么，最后才报价。':'Turn the validated §7 sales sequence into creative: concede first, differentiate second, price last.',
    spec: zh?'9:16 竖屏 · 40 秒 · 图形 + 产品录屏 · 冷私信与销售页专用':'9:16 vertical · 40s · graphics plus product capture · for cold DMs and the sales page',
    kind:'shot',
    hooks:[
      'We do not do reviews. We do not do listings. Here is the one thing nobody else does.',
      'Three things we do not do, and one thing only we do.',
      'If you need review management, buy Birdeye. Seriously. Then come back.'
    ],
    shots:[
      {n:'1',t:'0:00–0:08',v:zh?'三行字依次出现并被划掉：Reviews ✕ / Listings ✕ / Running your ads ✕。':'Three lines appear and get struck through: Reviews, Listings, Running your ads.',s:'We do not do reviews. We do not do listings. We do not run your ads.',note:zh?'划掉的动作要干脆，这个「让」是后面那一刀的前提。':'Make the strike-throughs decisive. The concession is what earns the next line.'},
      {n:'2',t:'0:08–0:22',v:zh?'切到两屏：员工矩阵派任务 + 归因表 Employee 列。':'Cut to two screens: task assignment across the employee matrix, and the Employee column in the attribution table.',s:'We let every employee publish your content to their own network, and then we tell you which one brought someone through the door.',note:''},
      {n:'3',t:'0:22–0:34',v:zh?'一行对比：五家店，$1,495 起 vs $25。下方小字标注取数来源与日期。':'One comparison line: five stores, from $1,495 versus $25. A small line beneath cites the source and date.',s:'Same five shops. Fifteen hundred a month over there. Twenty-five here.',note:''},
      {n:'4',t:'0:34–0:40',v:zh?'CTA。':'CTA card.',s:'Free checkup first. Decide after.',note:''}
    ],
    prep:[
      zh?'竞品公开定价页截图，记录取数日期':'Screenshots of the competitor’s public pricing page with the date captured',
      zh?'员工矩阵与归因两段产品录屏':'Two product captures: the employee matrix and attribution'
    ],
    publish:[
      [zh?'用途':'Purpose',zh?'冷私信第二条消息、销售页、报价前的铺垫':'The second message in a cold DM, the sales page, and the setup before quoting'],
      [zh?'顺序':'Sequence',zh?'永远不要把报价放在前面。先承认，再差异化，最后价格':'Never lead with price. Concede, differentiate, then quote']
    ],
    guard:[
      zh?'竞品价格必须引官网公开价并标注取数日期':'Competitor pricing must cite the public page and carry the capture date',
      zh?'不说对方不好，只说不做同一件事':'Never say they are bad. Say we do not do the same thing'
    ]
  },

  C11: {
    title: zh?'$1,495 对 $25 —— 以及你放弃了什么':'$1,495 versus $25, and what you give up',
    goal: zh?'测「诚实对比」的转发率。故意先说我们的缺点，这是这条能被转发的原因。':'Test the reshare rate of an honest comparison. Leading with our own gaps is precisely why it travels.',
    spec: zh?'9:16 竖屏 · 35 秒 · 图形为主 · Facebook 群组与 Reddit':'9:16 vertical · 35s · mostly graphics · Facebook groups and Reddit',
    kind:'shot',
    hooks:[
      'Five stores. Birdeye starts at fifteen hundred a month. We are twenty-five. Here is what you give up.',
      'Fifteen hundred versus twenty-five. Let me tell you what the difference buys.',
      'We are sixty times cheaper. That should make you suspicious. Here is why it is true.'
    ],
    shots:[
      {n:'1',t:'0:00–0:06',v:zh?'两个价格并排砸出，中间一条竖线。':'Two prices slam in side by side with a dividing rule.',s:'Five stores. Fifteen hundred a month there. Twenty-five here.',note:''},
      {n:'2',t:'0:06–0:18',v:zh?'左侧列出「你放弃了什么」：评论与口碑管理、Listings 同步、一支 267 人的销售支持团队。':'On the left, what you give up: review and reputation management, listings sync, a 267-person sales support team.',s:'You give up review management. You give up listings sync. You give up a sales team that will pick up the phone.',note:zh?'这一段要念得慢、念得诚恳。它是这条的信用来源。':'Deliver this slowly and straight. It is where the piece earns credibility.'},
      {n:'3',t:'0:18–0:30',v:zh?'右侧列出「你换到了什么」：AI 生成 + 实拍混剪、员工矩阵分发、员工级到店归因、门店与员工不限。':'On the right, what you get: AI generation with real-footage compositing, employee-matrix distribution, employee-level walk-in attribution, unlimited shops and staff.',s:'You get generation, employee distribution, and the only tool that tells you which employee brought someone in.',note:''},
      {n:'4',t:'0:30–0:35',v:zh?'CTA。小字标注价格取数日期。':'CTA. A small line carries the pricing capture date.',s:'Free checkup. Decide after.',note:''}
    ],
    prep:[
      zh?'竞品官网定价截图，带日期':'Dated screenshot of the competitor pricing page',
      zh?'我方五店场景的真实报价换算':'Our own five-store figure, worked out from the real price list'
    ],
    publish:[
      [zh?'投放':'Placement',zh?'Facebook 本地商家群组、Reddit r/smallbusiness 与 r/Flooring':'Facebook local-business groups, Reddit r/smallbusiness and r/Flooring'],
      [zh?'注意':'Note',zh?'Reddit 发布必须以讨论帖形式，不能像广告，否则秒删':'On Reddit it must read as a discussion post, not an ad, or it gets removed on sight']
    ],
    guard:[
      zh?'价格必须标注来源与取数日期，竞品调价后 48 小时内下架或更新':'Cite the source and date. If the competitor changes price, pull or update within 48 hours'
    ]
  },

  C12: {
    title: zh?'$25 换 60 条片子的算法':'The math behind sixty videos for $25',
    goal: zh?'测「产能叙事」能否独立成钩。核心是解释为什么便宜 —— 因为我们不用视频生成模型出片。':'Test whether the capacity story stands alone as a hook. The core is explaining why it is cheap: we do not generate the video.',
    spec: zh?'9:16 竖屏 · 40 秒 · 图示 + 产品录屏':'9:16 vertical · 40s · diagram plus product capture',
    kind:'shot',
    hooks:[
      'Twenty-five dollars a month. Sixty eighteen-second videos. Let me show you the math.',
      'Sixty videos for twenty-five dollars. The trick is that we do not generate the video.',
      'Everyone else charges per video. We charge per credit, and your own footage costs zero.'
    ],
    shots:[
      {n:'1',t:'0:00–0:06',v:zh?'数字动画：$25 → 3,600 credits。':'Number animation: $25 becomes 3,600 credits.',s:'Twenty-five dollars. Thirty-six hundred credits.',note:''},
      {n:'2',t:'0:06–0:20',v:zh?'一条 18 秒片拆成五个镜头位，每个位标注：实拍 0 credits / AI 渲染图 10 credits。':'One eighteen-second video breaks into five shot slots, each labelled: real footage 0 credits, AI render 10 credits.',s:'Five slots. Fill them with photos you already took and it costs nothing. That is the whole trick — real footage never draws credits.',note:zh?'这一镜是产品机制的核心表达，可复用到销售页。':'This shot is the clearest statement of the product mechanic. Reuse it on the sales page.'},
      {n:'3',t:'0:20–0:32',v:zh?'横向对比条：同价位下各家的成片条数，字幕标注换算口径。':'A horizontal comparison of videos produced at similar price points, with the conversion basis captioned.',s:'Same money, different route. Twenty times the output.',note:''},
      {n:'4',t:'0:32–0:40',v:zh?'CTA。':'CTA card.',s:'Free checkup first. It will tell you how many posts you are actually short.',note:''}
    ],
    prep:[
      zh?'镜头位拆解图（用产品内真实模板改造）':'The shot-slot diagram, built from a real in-product template',
      zh?'各家公开定价与同规格换算表，保留计算过程':'A conversion table from each competitor’s public pricing, with the working retained'
    ],
    publish:[
      [zh?'文案':'Caption','Real footage costs zero credits. That is why sixty videos fits in twenty-five dollars.'],
      [zh?'置顶评论':'Pinned comment',zh?'把换算口径写清楚 —— 有人一定会算，让他算得到一样的数':'Publish the conversion basis. Someone will check the arithmetic; make sure they land on your number']
    ],
    guard:[
      zh?'竞品条数必须按各家官网公开价与同规格换算，字幕写明口径':'Competitor output figures must be converted from public pricing at matched specs, with the basis on screen'
    ]
  },

  C13: {
    title: zh?'我们只收一样东西':'We charge for exactly one thing',
    goal: zh?'定价结构本身的说服力测试。这是一条落地页片，不承担钩子职能。':'A test of whether the pricing structure persuades on its own. A landing-page piece, not a hook.',
    spec: zh?'9:16 与 16:9 各出一版 · 25 秒 · 纯图形 · 无口播':'One 9:16 and one 16:9 cut · 25s · graphics only, no voice-over',
    kind:'shot',
    hooks:[
      'We charge for one thing: credits. Not stores. Not employees. Not accounts.',
      'Add a store: free. Add an employee: free. Add an account: free.',
      'Every other tool charges you more for growing. We do not.'
    ],
    shots:[
      {n:'1',t:'0:00–0:06',v:zh?'三个图标依次亮起，每个下面一个 $0：门店、员工、社媒账号。':'Three icons light up in turn, each with $0 beneath: shop, employee, social account.',s:'Shops: unlimited. Employees: unlimited. Accounts: unlimited.',note:''},
      {n:'2',t:'0:06–0:16',v:zh?'一行解释文字浮现在中央。':'One line of explanation rises to centre frame.',s:'Charging for employees would mean charging you for the exact thing that makes this work.',note:zh?'这句是定价 V3 的第一性原理，值得单独做成一张图。':'This is the first principle behind pricing V3. It deserves a standalone graphic too.'},
      {n:'3',t:'0:16–0:25',v:zh?'两档卡片滑入，Lite $10/月 与 Pro $25/月（年付），下方 CTA。':'The two plan cards slide in — Lite at $10 and Pro at $25 monthly on annual — with the CTA beneath.',s:'Ten dollars. Twenty-five dollars. Credits only.',note:''}
    ],
    prep:[
      zh?'三个图标与两张套餐卡，直接取产品内设计':'Three icons and two plan cards, taken straight from the product design'
    ],
    publish:[
      [zh?'用途':'Purpose',zh?'落地页定价版块上方、报价页顶部、销售私信第三条':'Above the landing-page pricing module, at the top of the quote page, and the third cold-DM message'],
      [zh?'不投':'Not for feeds',zh?'不作为社媒钩子 —— 定价不是紧迫问题':'Not a feed hook. Pricing is not an urgent problem']
    ],
    guard:[
      zh?'价格变动时这条必须同步更新，它会被长期挂在落地页':'Update this whenever pricing changes — it lives on the landing page indefinitely'
    ]
  },

  D14: {
    title: zh?'300 家美国家居建材门店的账号体检研究':'A checkup study of 300 US home & building stores',
    goal: zh?'内容 SEO 与 AI 搜索收录的主稿。不为转化，为品类话语权。它同时是我们「有数据」这件事的证据。':'The anchor piece for content SEO and AI-search indexing. Not for conversion — for category authority, and as proof that we have data at all.',
    spec: zh?'YouTube 长视频 8–12 分钟 + 同名长文（LinkedIn 与官网博客）· 需先积累 300 份体检，排在第 12 周之后':'An 8–12 minute YouTube piece plus a written study on LinkedIn and the blog · requires 300 checkups first, so it lands after week 12',
    kind:'outline',
    hooks:[
      'We ran checkups on three hundred US home and building stores. Five things we found.',
      'Three hundred stores, one score. The median was forty-seven.',
      'We counted what three hundred store accounts actually publish. Here is the data.'
    ],
    shots:[
      {n:'1',t:'00:00–01:30',v:zh?'结论先行：五个发现各一句话，配一张总览图。不要铺垫。':'Conclusions first: the five findings in one sentence each, over a single overview chart. No warm-up.',s:'Five findings, stated up front. Method comes second so you can decide whether to trust them.',note:''},
      {n:'2',t:'01:30–03:00',v:zh?'方法：样本怎么抽的、口径是什么、排除了什么、什么没测。':'Method: how the sample was drawn, the definitions used, what was excluded, and what was not measured.',s:'Here is how the sample was drawn, and here is what we could not measure.',note:zh?'把「没测什么」讲清楚，这是研究可信的分水岭。':'Stating what was not measured is the line between a study and a brochure.'},
      {n:'3',t:'03:00–04:30',v:zh?'发现一：健康分中位数与分布直方图。':'Finding one: the median score and the distribution histogram.',s:'',note:''},
      {n:'4',t:'04:30–06:00',v:zh?'发现二：门店信息缺失率 —— 这条直通我们的强制获客信息层。':'Finding two: the missing-store-info rate — which leads straight to our mandatory info layer.',s:'',note:''},
      {n:'5',t:'06:00–07:30',v:zh?'发现三：发布节奏的分布，断更长度的中位数。':'Finding three: posting-cadence distribution and median gap length.',s:'',note:''},
      {n:'6',t:'07:30–09:00',v:zh?'发现四：真人出镜比例。':'Finding four: the share of posts featuring a person.',s:'',note:''},
      {n:'7',t:'09:00–10:30',v:zh?'发现五：单平台 vs 多平台的分布。':'Finding five: single-platform versus multi-platform distribution.',s:'',note:''},
      {n:'8',t:'10:30–12:00',v:zh?'我们拿这些数据做什么：喂模板库。然后一行 CTA，不多说。':'What we do with the data: it feeds the template library. Then one line of CTA and nothing more.',s:'One link, at the end, once.',note:''}
    ],
    prep:[
      zh?'300 份真实体检的聚合数据（前 12 周积累）':'Aggregated data from 300 genuine checkups, accumulated over the first twelve weeks',
      zh?'图表全部可复现：公布抽样方法与口径':'Every chart reproducible: publish the sampling method and definitions',
      zh?'长文与视频同一天发，互相引用':'Publish the written study and the video the same day, cross-referencing each other'
    ],
    publish:[
      [zh?'渠道':'Channels',zh?'YouTube · LinkedIn 长文 · 官网博客 · 行业媒体投稿':'YouTube, a LinkedIn long-form post, the blog, and a trade-press pitch'],
      [zh?'目的':'Purpose',zh?'被引用、被 AI 搜索收录。转化是副产品':'To be cited and indexed by AI search. Conversion is a by-product'],
      [zh?'节奏':'Cadence',zh?'每季度更新一次，形成年度基准':'Refresh quarterly so it becomes an annual benchmark']
    ],
    guard:[
      zh?'全部匿名聚合，不出现任何单店可识别信息':'Fully anonymised and aggregated. No single store identifiable',
      zh?'任何一个数字都要能被第三方用同样方法复现':'Every number must be reproducible by a third party using the stated method'
    ]
  },

  D15: {
    title: zh?'归因是护城河，但它是个糟糕的鱼饵':'Attribution is a moat. It is a terrible hook.',
    goal: zh?'建立品类话语权。这篇不卖产品，它卖一个判断框架 —— 而那个框架恰好把我们放在对的位置。':'Category authority. It does not sell the product; it sells a judgement framework that happens to place us correctly.',
    spec: zh?'LinkedIn 长文 1,200–1,800 词 + 一张七条件筛选图 · 不做视频':'A 1,200–1,800 word LinkedIn essay plus one seven-condition filter diagram · no video',
    kind:'outline',
    hooks:[
      'Attribution is a moat. It is a terrible hook. Most founders confuse the two.',
      'Birdeye built a $210M business on a hook that had nothing to do with its moat.',
      'The thing you are best at is usually the worst thing to lead with.'
    ],
    shots:[
      {n:'1',t:zh?'开篇':'Open',v:zh?'从 Birdeye vs SOCi 的资本效率对比切入：同年创立、同一市场、每 $1 融资产出 $2.26 对 $0.30。':'Open on Birdeye versus SOCi: founded the same year, same market, $2.26 of revenue per dollar raised against $0.30.',s:'',note:''},
      {n:'2',t:zh?'框架':'Framework',v:zh?'提出钩子的七条件：紧迫 · 可见 · 具体 · 持续发生 · 有明确损失 · 自助可解 · 免费能看见问题但付费才能解决。':'Lay out the seven conditions of a hook: urgent, visible, specific, recurring, with a clear loss, self-serviceable, and free to see but paid to fix.',s:'',note:zh?'第七条是引信，要单独一段讲。':'The seventh condition is the fuse. Give it its own section.'},
      {n:'3',t:zh?'论证':'Argument',v:zh?'用七条筛四个候选，展示归因在紧迫、可见、免费可暴露三项上全败。':'Run four candidates through the seven filters and show attribution failing on urgency, visibility and free exposure.',s:'',note:''},
      {n:'4',t:zh?'结论':'Conclusion',v:zh?'护城河和鱼饵必须分开设计。这对任何 local SaaS 都成立，不只是我们。':'Moat and bait must be designed separately. This holds for any local SaaS, not just ours.',s:'',note:''},
      {n:'5',t:zh?'落款':'Close',v:zh?'一行链接，不推销。':'One link. No pitch.',s:'',note:''}
    ],
    prep:[
      zh?'Birdeye 与 SOCi 的公开融资与收入数据，标注来源':'Public funding and revenue figures for Birdeye and SOCi, with sources cited',
      zh?'七条件筛选图一张（可复用到内部培训）':'One seven-condition filter diagram — reusable for internal onboarding'
    ],
    publish:[
      [zh?'渠道':'Channels',zh?'LinkedIn 原生长文（不外链首段）· 官网博客同步':'Native LinkedIn long-form, no link in the opening paragraph · mirrored on the blog'],
      [zh?'目标读者':'Audience',zh?'同行创始人与投资人，不是门店老板 —— 这篇的作用是让别人引用我们':'Founders and investors, not store owners. Its job is to get us cited']
    ],
    guard:[
      zh?'全文只在结尾放一次链接。一旦读起来像广告，引用价值归零':'One link, at the end, once. The moment it reads as an ad its citation value is zero'
    ]
  },

  D16: {
    title: zh?'录一次二十秒，回答接下来一百个客户':'Record twenty seconds once',
    goal: zh?'把数字人放在正确的位置：省重复劳动，不是炫技。这条明确不上首屏。':'Put the avatar in its correct place — saving repeated labour, not showing off. This piece never goes on the hero.',
    spec: zh?'9:16 竖屏 · 45 秒 · 老板实拍 + 产品录屏 + 私信场景 · 落地页第二屏与 YouTube':'9:16 vertical · 45s · owner on camera, product capture, DM scenario · landing page fold two and YouTube',
    kind:'shot',
    hooks:[
      'Record twenty seconds once. Let it answer the next hundred customers.',
      'You answer the same five questions every day. Answer them once.',
      'This is not about looking like a creator. It is about not repeating yourself.'
    ],
    shots:[
      {n:'1',t:'0:00–0:08',v:zh?'实拍：老板站在展厅里对着手机说 20 秒，光线自然，不打灯。':'Location: the owner talking to a phone in the showroom for twenty seconds. Natural light, no kit.',s:'Record twenty seconds once. Let it answer the next hundred customers.',note:zh?'一定要在自己店里拍，摄影棚会毁掉这条的可信度。':'Shoot in their actual store. A studio destroys the credibility of this piece.'},
      {n:'2',t:'0:08–0:22',v:zh?'产品录屏：同一段素材生成五个不同问题的回答版本。':'Product capture: the same recording generating answers to five different questions.',s:'Same face, same voice, five different answers to the five questions you already answer every day.',note:''},
      {n:'3',t:'0:22–0:36',v:zh?'私信场景：客户问 "do you do frameless?" → 老板点两下 → 一条 20 秒视频发出去。':'DM scenario: a customer asks whether they do frameless. Two taps. A twenty-second video goes out.',s:'They asked at nine at night. It answered at nine at night.',note:''},
      {n:'4',t:'0:36–0:45',v:zh?'CTA，指向体检而不是数字人。':'CTA — pointing to the checkup, not to avatars.',s:'Start with the free checkup.',note:''}
    ],
    prep:[
      zh?'老板本人出镜与书面授权':'The owner on camera, with written consent',
      zh?'一条真实的客户私信问题（脱敏）':'One genuine customer DM question, redacted'
    ],
    publish:[
      [zh?'位置':'Placement',zh?'落地页第二屏、体检报告结果页下方 · 永远不上首屏':'Landing page fold two, and below the checkup report · never on the hero'],
      [zh?'措辞':'Wording',zh?'全片不出现 clone、digital human、AI presenter 这些词':'The words clone, digital human and AI presenter never appear']
    ],
    guard:[
      zh?'⚠ 首页讲数字人等于邀请客户拿我们和 HeyGen 比。这条只讲省重复劳动，不讲技术':'⚠ Leading with avatars invites a HeyGen comparison. This piece talks about saved labour, never technology'
    ]
  },

  E17: {
    title: zh?'洛杉矶那家橱柜店':'The cabinet shop in Los Angeles',
    goal: zh?'A1 的中文版。测同一个钩子在华人圈的有效性 —— 如果 A1 成立而 E17 不成立，说明问题在人群不在钩子。':'The Chinese-language counterpart to A1. If A1 works and E17 does not, the problem is the audience, not the hook.',
    spec: zh?'9:16 竖屏 · 45 秒 · 屏幕录屏 + 中文画外音 · 产品界面切中文版':'9:16 vertical · 45s · screen recording with Chinese voice-over · product UI switched to Chinese',
    kind:'shot',
    hooks:[
      '洛杉矶做橱柜的这家店，Instagram 发了 22 条，18 条没写地址和电话。',
      '4,200 个粉丝，22 条内容，客户想上门都不知道往哪走。',
      '这家店不缺内容，缺的是每条内容后面那三行字。'
    ],
    shots:[
      {n:'1',t:'0:00–0:05',v:zh?'屏幕录屏：门店 Instagram 主页，粉丝数圈一下。店名头像打码。':'Screen recording of the store profile, circling the follower count. Handle and avatar masked.',s:'洛杉矶做橱柜的这家店，Instagram 发了 22 条，18 条没写地址和电话。',note:''},
      {n:'2',t:'0:05–0:16',v:zh?'下滑九宫格，18 个格子逐个打红叉。':'Scroll the grid; eighteen tiles take a red cross one at a time.',s:'内容不差，柜子拍得挺好看。问题是看完的人不知道你在哪、怎么联系你。',note:''},
      {n:'3',t:'0:16–0:28',v:zh?'切到中文版体检报告，分数落到 42，六条问题淡入。':'Cut to the Chinese report. The score settles at 42; six issues fade in.',s:'这是一份免费的账号体检。六十秒，不用注册。',note:''},
      {n:'4',t:'0:28–0:38',v:zh?'点开第一条问题，Fix 按钮高亮。':'Open the first issue; the Fix button pulses.',s:'它不猜你亏了多少钱 —— 那种数字谁都编得出来。它只数你页面上有什么，每一条你自己都能去后台核对。',note:zh?'这句是华人圈最需要的信任支点，他们对夸大数字尤其敏感。':'This is the trust pivot this audience needs most — they are unusually alert to inflated numbers.'},
      {n:'5',t:'0:38–0:45',v:zh?'输入框 + 屏幕字：粘贴主页链接，60 秒。':'Input field with on-screen text: paste your profile link, sixty seconds.',s:'粘贴你自己的主页链接，六十秒，免费，不用留邮箱。',note:''}
    ],
    prep:[
      zh?'一家华人门店的真实账号（打码）与真实体检报告':'A genuine Chinese-owned store account, masked, with a real checkup report',
      zh?'产品界面切到中文版再录屏':'Switch the product UI to Chinese before capturing'
    ],
    publish:[
      [zh?'渠道':'Channels',zh?'微信视频号 · 小红书 · 抖音（海外华人也刷）':'WeChat Channels, RED, and Douyin — overseas Chinese audiences watch all three'],
      [zh?'文案':'Caption',zh?'免费体检，六十秒，不用注册。这是刚给一家洛杉矶橱柜店做的。':'Free checkup, sixty seconds, no signup. This one was just run for a Los Angeles cabinet shop.']
    ],
    guard:[
      zh?'必须打码。华人建材圈子小，指名等于得罪一片人':'Mask everything. This trade community is small; naming one store offends many'
    ]
  },

  E18: {
    title: zh?'★ 你的客户是不是还全靠微信群转介绍':'★ Are your customers still all WeChat referrals?',
    goal: zh?'★ 20 套里唯一一条直接验圈层 A 致命假设的片子。它的核心产出不是提交量，是评论区 —— 如果华人店主普遍回答「八九成靠转介绍且够用」，圈层 A 就该退场。':'★ The only script that directly tests circle A’s fatal assumption. Its real output is not submissions but the comment thread. If owners overwhelmingly say referrals cover them, circle A should be retired.',
    spec: zh?'9:16 竖屏 · 40 秒 · 中文 · 微信群与视频号为主战场':'9:16 vertical · 40s · Chinese · WeChat groups and Channels are the battleground',
    kind:'shot',
    hooks:[
      '在美国开建材店，你的客户是不是还全靠微信群转介绍？',
      '你上个月成交的客户里，有几个是你原本不认识的人？',
      '熟人介绍能撑住第一年，撑不住第五年。'
    ],
    shots:[
      {n:'1',t:'0:00–0:06',v:zh?'一个微信群列表快速滚动的画面（自建演示群，不用真实群）。':'A WeChat group list scrolling fast — use a demo group, never a real one.',s:'在美国开建材店，你的客户是不是还全靠微信群转介绍？',note:zh?'绝对不要出现真实群名或任何真人头像。':'No real group names and no real avatars, ever.'},
      {n:'2',t:'0:06–0:18',v:zh?'画面停在一个静态图形：一个圈，写着「你认识的人」。':'Hold on a static graphic: one circle labelled the people you already know.',s:'转介绍不是坏事，它是你这些年最扎实的资产。但它有个天花板 —— 你的客户全在你认识的人里面，圈子有多大生意就有多大。',note:zh?'不要贬低转介绍，那是他们的生意基础。说的是天花板不是错误。':'Do not disparage referrals — they are the foundation of this business. Speak about a ceiling, not a mistake.'},
      {n:'3',t:'0:18–0:30',v:zh?'圈外面长出五个小圈：五个店员的朋友圈。切到员工榜与到店数据。':'Five smaller circles grow outside it — five employees’ networks. Cut to the leaderboard and walk-in data.',s:'你店里五个人，本来就是五个新圈子。派一次任务，各发各的，月底后台告诉你哪一条带来了到店、是谁发的。',note:''},
      {n:'4',t:'0:30–0:40',v:zh?'CTA：先做个免费体检。':'CTA: start with a free checkup.',s:'先花六十秒免费体检一下你自己的账号，不用注册。',note:''}
    ],
    prep:[
      zh?'自建演示微信群，不使用任何真实群截图':'A purpose-built demo WeChat group; never a screenshot of a real one',
      zh?'一份真实的员工榜数据（种子客户产出）':'Real leaderboard data from a seed customer'
    ],
    publish:[
      [zh?'★ 文案必须提问':'★ The caption must ask',zh?'「你现在几成客户来自转介绍？评论区说个数。」—— 评论内容就是圈层 A 假设的答案，比提交量重要':'Ask what share of their customers comes from referrals and request a number. The replies answer the circle A hypothesis, and matter more than submissions'],
      [zh?'渠道':'Channels',zh?'微信群直发 + 视频号。小红书作为公开面':'Dropped directly into WeChat groups plus Channels. RED is the public face'],
      [zh?'读法':'How to read it',zh?'≥8 成回答「八九成靠转介绍且够用」→ 圈层 A 的钩子不成立，把预算移到圈层 B':'If 80%+ say referrals cover them, the circle A hook fails — move budget to circle B']
    ],
    guard:[
      zh?'不要贬低微信转介绍。说天花板，不说错误':'Never disparage WeChat referrals. Speak of a ceiling, not an error',
      zh?'不出现任何真实群名、真人头像或可识别的门店':'No real group names, avatars or identifiable stores'
    ]
  },

  E19: {
    title: zh?'五个店员，一个月六十条':'Five employees, sixty posts a month',
    goal: zh?'B7 的中文版，但换一个更贴华人老板的角度：不是「产能」，是「我怎么知道谁在认真发」。管理焦虑比营销焦虑更能打动这批老板。':'The Chinese counterpart to B7, angled differently: not capacity but knowing who is actually working. Management anxiety moves this audience more than marketing anxiety.',
    spec: zh?'9:16 竖屏 · 50 秒 · 门店实拍 + 后台录屏 · 中文':'9:16 vertical · 50s · location footage plus dashboard capture · Chinese',
    kind:'shot',
    hooks:[
      '你怎么知道哪个店员在认真发，哪个在应付？',
      '五个店员，一个月 60 条，后台能看到是哪一条带来的到店。',
      '不用求店员发朋友圈，派个任务他们手机上直接就收到了。'
    ],
    shots:[
      {n:'1',t:'0:00–0:08',v:zh?'实拍：店里五个人各自拿手机，一个横移带过。':'Location: five people in the store, each on a phone. One lateral move across them.',s:'你怎么知道哪个店员在认真发，哪个在应付？',note:zh?'第一句直接戳管理焦虑，不要先讲产品。':'Open straight into the management anxiety. Do not lead with the product.'},
      {n:'2',t:'0:08–0:22',v:zh?'产品录屏：PC 端派一条任务 → 五台手机弹出通知 → 三个人已发布、两个未读。':'Product capture: one task assigned on desktop, five phones notified, three published, two unread.',s:'派一次任务，五个人手机上都收到。谁发了、谁没发，这里一目了然。',note:zh?'「两个未读」这个细节非常重要，它才是老板真正想看的。':'The two unread is the crucial detail — that is what the owner actually wants to see.'},
      {n:'3',t:'0:22–0:38',v:zh?'切到员工榜：每个人发了几条、带来几个到店线索。':'Cut to the leaderboard: posts published and walk-in leads per person.',s:'月底这张表不是给我们看的，是给你开会用的。谁发得多、谁带来了客人，不用再靠印象。',note:''},
      {n:'4',t:'0:38–0:50',v:zh?'CTA。':'CTA card.',s:'先免费体检一下你的账号，六十秒。',note:''}
    ],
    prep:[
      zh?'一家授权华人门店 + 五名店员的肖像授权':'One consenting Chinese-owned store plus likeness consent from five employees',
      zh?'真实的员工榜与归因数据':'Genuine leaderboard and attribution data'
    ],
    publish:[
      [zh?'渠道':'Channels',zh?'视频号 · 小红书 · 微信群':'WeChat Channels, RED, WeChat groups'],
      [zh?'置顶评论':'Pinned comment',zh?'「你店里几个人？有几个愿意发？」':'How many people work there, and how many are willing to post?']
    ],
    guard:[
      zh?'员工肖像必须书面授权。这条会被转进行业群，传播范围比预期大':'Written likeness consent is mandatory. This travels into trade groups and reaches further than you expect'
    ]
  },

  E20: {
    title: zh?'微信群直发图文':'The WeChat group drop',
    goal: zh?'中文对照组，同时是唯一一条自带社交裂变的素材 —— 第三个文案变体让人测完把分数发回群里。':'The Chinese control, and the only piece with a built-in loop: the third caption variant asks people to post their score back into the group.',
    spec: zh?'图文，非视频 · 一张打码的真实报告截图 + 三行文案 + 链接 · 微信群直发':'Image and copy, not video · one masked real report screenshot, three lines, one link · dropped straight into WeChat groups',
    kind:'layout',
    hooks:[
      '60 秒免费体检你的账号，不用注册。这是刚给一家洛杉矶橱柜店做的，42 分。',
      '随手体检了一家同行的账号，22 条里 18 条没写地址。你的呢？',
      '免费的，不用留邮箱，粘贴主页链接就行。测完把分数发群里，看谁最低。'
    ],
    shots:[
      {n:'1',t:zh?'主图':'Main image',v:zh?'一张真实体检报告截图。健康分 42 在视觉中心，六条问题可读，店名与头像打码。':'One real report screenshot. The score of 42 sits at the visual centre, the six issues stay legible, handle and avatar masked.',s:'',note:zh?'截图不要裁太紧，要让人一眼看出这是个产品页面不是海报。':'Do not crop tight — it must read instantly as a product screen, not a poster.'},
      {n:'2',t:zh?'第一行':'Line one',v:zh?'钩子句，用三个变体之一。':'The hook, one of the three variants.',s:'',note:''},
      {n:'3',t:zh?'第二行':'Line two',v:zh?'一句纪律说明，建立信任。':'One line of discipline, to build trust.',s:'不猜你亏了多少钱，只数你页面上有什么，你自己能核对。',note:''},
      {n:'4',t:zh?'第三行':'Line three',v:zh?'链接 + 一句零摩擦承诺。':'The link plus a zero-friction promise.',s:'免费，不用注册，不用留邮箱。',note:''}
    ],
    prep:[
      zh?'一张打码的真实报告截图（每周换一张，保持新鲜）':'One masked real report screenshot, refreshed weekly to stay current',
      zh?'链接做成短链，便于统计每个群的来源':'Use a short link so each group can be attributed separately'
    ],
    publish:[
      [zh?'渠道':'Channels',zh?'华人建材商会微信群直发 —— 这是主战场':'Dropped directly into the trade WeChat groups. This is the battleground'],
      [zh?'裂变':'Loop',zh?'第三个变体「测完把分数发群里，看谁最低」自带传播，优先测它':'The third variant asking people to post their score back has a built-in loop. Test it first'],
      [zh?'节奏':'Cadence',zh?'一个群最多每两周发一次，否则被当广告':'No more than once a fortnight per group, or it reads as spam']
    ],
    guard:[
      zh?'截图必须打码，绝不在群里点名任何一家店 —— 群里可能就坐着那家店的老板':'Mask the screenshot and never name a store in the group. Its owner may well be in the room'
    ]
  }

});
