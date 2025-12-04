import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts, events } from "@/data/site-data";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Admin · 演示"
        title="Admin · 管理后台（演示）"
        description="用于展示未来内部工具的样貌。按钮暂不具备真实功能。"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0f1829]/80 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-sand">Events Overview</h3>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-sand/80"
            >
              + 创建新活动
            </button>
          </div>
          <div className="mt-4 space-y-3 text-sm text-sand/75">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sand">{event.title}</p>
                  <p className="text-xs text-sand/60">
                    {event.dateTime.split("T")[0]}
                  </p>
                </div>
                <p className="text-xs text-sand/60">
                  {event.registeredCount ?? 0}/{event.capacity ?? "∞"} ·{" "}
                  {event.isOnline ? "线上" : "线下"}
                </p>
                <div className="mt-2 flex gap-2 text-xs text-sand/70">
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    View registrations
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0f1829]/80 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-sand">Blog Posts</h3>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-sand/80"
            >
              + 发布新文章
            </button>
          </div>
          <div className="mt-4 space-y-3 text-sm text-sand/75">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sand">{post.title}</p>
                  <p className="text-xs text-sand/60">{post.date}</p>
                </div>
                <p className="text-xs text-sand/60">{post.tags.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-sand/70">
            Quick actions: 暂未开放，未来将连接 CMS / 表单数据。
          </div>
        </div>
      </div>
    </div>
  );
}
