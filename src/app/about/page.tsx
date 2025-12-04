import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { partners } from "@/data/site-data";

const values = [
  { title: "Slow before fast", detail: "先放慢，才能听见彼此的呼吸与句点。" },
  {
    title: "多语种、多视角",
    detail: "语言是折纸，换一种语言重述，也是在重塑记忆。",
  },
  {
    title: "Small, deep, human-scale",
    detail: "小而精的群组，让对话有温度，也有安全感。",
  },
  {
    title: "From text to practice",
    detail: "把阅读的灵感落到生活实验、共创项目与合作里。",
  },
];

const team = [
  {
    name: "Iris",
    role: "发起人 · 文化研究",
    bio: "关注跨文化叙事，策划夜读系列。",
  },
  { name: "陈同学", role: "产品 & 运营", bio: "负责共读提纲设计与小组引导。" },
  {
    name: "Miguel",
    role: "翻译 & 对谈主持",
    bio: "常驻 Madrid/Beijing，热爱多语对话。",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="About · 关于"
        title="CultureLab 的起点"
        description="几位被信息流消耗的朋友，想找回慢阅读的节奏，也想让不同语言、城市与经验在同一张桌子对话。"
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0e1627]/80 p-6 text-sand/80 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]">
          <p>
            CultureLab
            从一次非正式的夜读开始。我们把手机调成飞行模式，用纸本与打印稿重读一本书，记录自己的速度、呼吸与节奏。
            那个夜晚的灯光、茶水与笔记本，成为日后很多活动的雏形。
          </p>
          <p>
            很快，跨文化的元素被加入进来：不同语言的译本、来自不同城市的参与者，以及线上线下混合的形式。我们发现，语言的转换让讨论变得更立体，也让人有勇气在陌生的语言里表达。
          </p>
          <p>
            如今，CultureLab
            希望保持“小而深”的规模，做一个温暖、可靠、好奇的阅读与文化实验室。
          </p>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0d1423]/80 p-6">
          <h3 className="font-display text-2xl text-sand">我们的价值观</h3>
          <ul className="space-y-3 text-sm text-sand/75">
            {values.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <div>
                  <p className="font-semibold text-sand">{item.title}</p>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeading title="Team · 团队" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-white/10 bg-[#0f1829]/80 p-4 text-sand/80"
            >
              <p className="text-lg font-semibold text-sand">{member.name}</p>
              <p className="text-sm text-amber-200">{member.role}</p>
              <p className="mt-2 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeading
          title="Moments · 活动瞬间"
          description="现场氛围、共读笔记、小组讨论的碎片。"
        />
        <GalleryGrid />
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0d1526]/80 p-6">
        <SectionHeading title="Partners & Collaborators · 合作伙伴" />
        <div className="flex flex-wrap gap-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand/80 backdrop-blur transition hover:border-amber-300/60 hover:text-amber-100"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
