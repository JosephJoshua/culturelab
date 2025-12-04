export function formatDateTime(dateTime: string) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
  return formatter.format(new Date(dateTime));
}

export function formatPrice(priceCNY: number) {
  if (priceCNY === 0) {
    return "Free 免费";
  }
  return `¥${priceCNY}`;
}
