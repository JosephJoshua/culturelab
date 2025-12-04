import type {
  BlogPost,
  Event,
  GalleryItem,
  MembershipTier,
  Partner,
  Testimonial,
} from "@/types";

const qrPlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'><rect width='320' height='320' fill='%23131a28'/><rect x='34' y='34' width='252' height='252' fill='none' stroke='%23f2a65a' stroke-width='8' stroke-dasharray='12 12'/><circle cx='70' cy='70' r='18' fill='%2358c0c9'/><circle cx='250' cy='250' r='14' fill='%2358c0c9'/><text x='50%' y='50%' text-anchor='middle' fill='%23f7efe4' font-size='18' font-family='Arial' dy='6'>WeChat QR</text></svg>";

export const events: Event[] = [
  {
    id: "event-1",
    slug: "midnight-salon",
    title: "夜读沙龙：深蓝书房的慢思",
    guests: ["Iris（文化研究者）", "陈同学（产品）"],
    format: "圆桌对谈 · 提纲共读 · 现场问答",
    dateTime: "2025-02-15T19:30:00+08:00",
    location: "北京 · 海淀 · 深蓝书房",
    priceCNY: 99,
    capacity: 24,
    registeredCount: 19,
    isOnline: false,
    shortDescription:
      "一场围绕《午夜图书馆》的夜读，练习把快信息转化为慢思考。",
    longDescription:
      "这是一场在夜色与纸张间展开的阅读实验。我们将用90分钟拆解《午夜图书馆》中关于选择、遗憾与重生的细节，并把它与每个人的生活坐标对照。\\n\\n空间里只有12-24个席位，灯光、音乐与茶水都为慢读而准备。没有“发言打卡”的压力，只有耐心倾听与试探性的提问。\\n\\n我们会尝试把英文文本与中文翻译并置，体会语感的错位与收获。",
    tags: ["阅读沙龙", "线下", "英文原著"],
    wechatGroupQR: qrPlaceholder,
    paymentQRs: {
      wechat: qrPlaceholder,
      alipay: qrPlaceholder,
    },
    audience: [
      "想找回耐心阅读节奏的朋友",
      "喜欢把文本放进生活语境的同学",
      "希望结识同频阅读伙伴的城市夜行者",
    ],
    takeaways: ["深度讨论提纲", "多语文本片段打印本", "小组讨论记录 & 书单"],
    materialsPublic: true,
  },
  {
    id: "event-2",
    slug: "cross-cultural-dialogue",
    title: "跨文化对谈：语言如何储存记忆",
    guests: ["Laura Sánchez（口述史研究者）", "Miguel（翻译）"],
    format: "线上对谈 · 练习卡片 · 观众问答",
    dateTime: "2025-03-02T20:00:00+08:00",
    location: "线上 · Zoom",
    priceCNY: 0,
    capacity: 120,
    registeredCount: 118,
    isOnline: true,
    shortDescription:
      "一场跨越中文、英语与西班牙语的对谈，聊语言与记忆的微光。",
    longDescription:
      "来自北京与马德里的两位语言学研究者，将分享他们在口述史项目中的观察：不同语言如何折叠家庭记忆，哪些词汇能触发情绪。\\n\\n活动包含 20 分钟的微型工作坊：参与者将被邀请用母语与第二语言分别描述一段记忆，并即时比较感受。\\n\\n免费但需报名获取会议链接，满员后开放候补。",
    tags: ["跨文化对谈", "线上", "语言学"],
    wechatGroupQR: qrPlaceholder,
    paymentQRs: {
      wechat: qrPlaceholder,
      alipay: qrPlaceholder,
    },
    audience: [
      "多语者、翻译爱好者",
      "对记忆与叙事感兴趣的学生与创作者",
      "准备做口述史/采访项目的朋友",
    ],
    takeaways: ["会议录制访问（限时）", "双语关键词卡片", "互动练习文档"],
    materialsPublic: true,
  },
  {
    id: "event-3",
    slug: "cyber-city-reading",
    title: "线上共读会：赛博城市与新的公共生活",
    guests: ["林同学（城市社会学）", "周某（科幻译者）"],
    format: "共读 · 小组工作坊 · 共创白板",
    dateTime: "2025-02-22T15:00:00+08:00",
    location: "线上 · 腾讯会议",
    priceCNY: 0,
    capacity: 100,
    registeredCount: 76,
    isOnline: true,
    shortDescription:
      "一起读《The City & The City》与《未来形态》，拆解城市与感官的关系。",
    longDescription:
      "本次共读会将尝试把赛博朋克小说与城市社会学放在同一个桌面上。我们会用小组讨论的方式整理出“城市感官地图”，并分享可视化笔记模版。\\n\\n无门槛，适合任何对城市想象感兴趣的人。报名后收到讨论提纲与Zoom/腾讯会议链接。",
    tags: ["线上", "共读", "城市研究"],
    wechatGroupQR: qrPlaceholder,
    audience: ["城市研究爱好者", "科幻迷与设计师", "希望练习英文讨论的朋友"],
    takeaways: ["讨论提纲与笔记模板", "协作白板链接", "推荐阅读清单"],
    materialsPublic: true,
  },
  {
    id: "event-4",
    slug: "past-poetry-lab",
    title: "往期 · 诗歌与日常感知实验",
    guests: ["特邀诗人（匿名）"],
    format: "朗读 · 感知练习 · 小组创作",
    dateTime: "2024-11-18T19:00:00+08:00",
    location: "北京 · 东城区 · 胡同小院",
    priceCNY: 59,
    capacity: 18,
    registeredCount: 18,
    isOnline: false,
    shortDescription: "一次把诗歌带回生活的练习，生成各自的“日常仪式”。",
    longDescription:
      "这是 CultureLab 的一次小规模实验。参与者在暗灯下朗读、摘抄、对话，用诗歌重新发现日常物件。活动结束后，我们将参与者的笔记整理成 zine 并寄出。\\n\\n这是一个已结束的活动，页面仍保留以便回顾与参考。",
    tags: ["阅读沙龙", "线下", "往期"],
    wechatGroupQR: qrPlaceholder,
    paymentQRs: {
      wechat: qrPlaceholder,
      alipay: qrPlaceholder,
    },
    audience: ["诗歌爱好者", "想练习日常观察的人"],
    takeaways: ["zine 电子版", "活动照片合集", "延伸阅读"],
    materialsPublic: true,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "slow-reading-notes",
    title: "慢阅读与对话的策展指南",
    date: "2025-01-18",
    excerpt: "为什么需要为对话专门策展？从嘉宾邀请到提纲共创的经验小结。",
    content:
      "策展对话的关键是让提问更具体：给嘉宾提前准备3-5个“共创卡片”，现场再开放来自参与者的提问。\\n\\n我们会在桌上放置节目单、时间轴与提问卡，确保每个人都能看见节奏。\\n\\n录音和笔记会在活动后公开，便于继续发酵话题，也欢迎转发给可能对话题感兴趣的朋友。",
    tags: ["方法论", "策展"],
  },
  {
    id: "post-2",
    slug: "memory-and-language-recap",
    title: "活动回顾：语言如何折叠记忆",
    date: "2024-12-06",
    excerpt: "一场跨文化对谈，讨论不同语言里的“记忆形状”。",
    content:
      "对谈中，我们从母语与第二语言的自我介绍开始，迅速发现语序与情绪之间的微妙关系。\\n\\n来自马德里的嘉宾分享了祖母的故事，西班牙语里的亲昵称谓与中文完全不同，带来了不同的距离感。\\n\\n参与者普遍感叹：语言并不是中性的容器，它会把记忆折成特定的形状。\\n\\n完整录音已发送给参与者，也欢迎加入候补群获取摘要。",
    tags: ["活动回顾", "跨文化"],
    relatedEventSlug: "cross-cultural-dialogue",
  },
  {
    id: "post-3",
    slug: "city-and-senses",
    title: "赛博城市与感官练习",
    date: "2024-11-30",
    excerpt:
      "共读会中，我们尝试给城市建立“感官坐标”：气味、声音、光线、数字界面。",
    content:
      "当我们把赛博朋克小说与真实城市叠加时，感官练习比设定分析更有力量。\\n\\n有人记录北京地铁的语音提示与霓虹反光，有人描述虚拟社交里的听觉反馈。\\n\\n这些碎片后来变成了一份开放的城市感官档案，将在下次活动继续扩充。",
    tags: ["共读", "城市研究"],
    relatedEventSlug: "cyber-city-reading",
  },
];

export const membershipTiers: MembershipTier[] = [
  {
    id: "tier-explorer",
    nameEn: "Explorer",
    nameZh: "探索会员",
    pricePerMonthCNY: 19,
    benefits: [
      "每月 1 场线下活动会员价",
      "在线读书会参与权",
      "会员通讯 Newsletter",
    ],
  },
  {
    id: "tier-creator",
    nameEn: "Creator",
    nameZh: "创作者会员",
    pricePerMonthCNY: 49,
    highlight: true,
    benefits: [
      "所有活动会员价",
      "小组共创工作坊优先报名",
      "专属讨论群",
      "活动回放与笔记访问权限",
    ],
  },
  {
    id: "tier-patron",
    nameEn: "Patron",
    nameZh: "赞助人",
    pricePerMonthCNY: 99,
    benefits: [
      "包含 Creator 权益",
      "核心活动内圈席位",
      "联合策划一场活动机会（需沟通确认）",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Lena · 人类学硕士",
    role: "THU 校友",
    quote:
      "这是少数让我想在周五晚上关掉手机的活动。节奏慢得刚好，讨论也很真诚。",
  },
  {
    name: "陈同学 · 产品经理",
    role: "常驻北京",
    quote: "每次共读会都能收获到新的书单，还有一起做笔记的伙伴。",
  },
  {
    name: "Miguel · 翻译者",
    role: "Madrid / Beijing",
    quote:
      "CultureLab 让我第一次用中文讨论西班牙语诗歌，语言之间的距离变得可感。",
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    title: "夜读书桌",
    description: "琥珀色灯光下的书与笔记本",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'><defs><linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23101624'/><stop offset='100%' stop-color='%231a2434'/></linearGradient></defs><rect width='480' height='320' fill='url(%23bg)'/><rect x='120' y='120' width='240' height='130' rx='16' fill='%231f2b3d' stroke='%2358c0c9' stroke-width='2'/><rect x='150' y='150' width='90' height='18' rx='4' fill='%23f2a65a'/><rect x='150' y='180' width='180' height='12' rx='3' fill='%23f7efe4' opacity='0.85'/><rect x='150' y='200' width='120' height='12' rx='3' fill='%23f7efe4' opacity='0.7'/></svg>",
  },
  {
    id: "g2",
    title: "小组讨论",
    description: "线下沙龙的小范围讨论",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'><rect width='480' height='320' fill='%23131a28'/><circle cx='180' cy='150' r='46' fill='%231f2b3d' stroke='%2358c0c9' stroke-width='3'/><circle cx='300' cy='180' r='36' fill='%231f2b3d' stroke='%23f2a65a' stroke-width='3'/><circle cx='240' cy='110' r='34' fill='%231f2b3d' stroke='%23f7efe4' stroke-width='2'/><rect x='140' y='220' width='200' height='12' rx='3' fill='%23f7efe4' opacity='0.75'/></svg>",
  },
  {
    id: "g3",
    title: "跨文化对谈",
    description: "线上与线下同步的对谈场景",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'><rect width='480' height='320' fill='%231a2234'/><rect x='80' y='60' width='150' height='200' rx='12' fill='%231f2b3d' stroke='%2358c0c9' stroke-width='3'/><rect x='250' y='80' width='160' height='180' rx='18' fill='%231f2b3d' stroke='%23f2a65a' stroke-width='3'/><text x='155' y='170' text-anchor='middle' fill='%23f7efe4' font-size='18' font-family='Arial'>CN</text><text x='330' y='170' text-anchor='middle' fill='%23f7efe4' font-size='18' font-family='Arial'>ES</text></svg>",
  },
];

export const partners: Partner[] = [
  { id: "p1", name: "Midnight Library", url: "https://example.com" },
  { id: "p2", name: "Indie Studio", url: "https://example.com" },
  { id: "p3", name: "Cultura Lab Madrid", url: "https://example.com" },
];

export const homepageStory = [
  "信息太快，我们想练习更慢的节奏：让一本书陪伴一个夜晚，而不是十分钟的刷屏。",
  "阅读对我们而言不是输出 KPI，而是一种身体的练习：安静、并置、对话、延伸。",
  "跨文化维度让文本更有层次。不同语言的词汇像折纸，把记忆与情感折成不同的形状。",
];

export const focusList = [
  "慢读书会 · Slow Reading Salons",
  "跨文化对谈 · Cross-Cultural Dialogues",
  "小范围深度交流 · Small, Curated Groups",
];

export const newsletterCopy = {
  title: "Stay in the loop · 保持联系",
  description:
    "留下邮箱或微信号，我们会在有新活动、开放报名或发布长文时第一时间通知你。",
};

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getUpcomingEvents(reference = new Date()) {
  return events.filter((event) => new Date(event.dateTime) >= reference);
}

export function getPastEvents(reference = new Date()) {
  return events.filter((event) => new Date(event.dateTime) < reference);
}
