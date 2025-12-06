export type PaymentMethod = "wechat" | "alipay";

export type PaymentQRs = Partial<Record<PaymentMethod, string>>;

export interface Event {
  id: string;
  slug: string;
  title: string;
  guests?: string[];
  format?: string;
  dateTime: string;
  location: string;
  priceCNY: number;
  capacity?: number;
  registeredCount?: number;
  isOnline: boolean;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  wechatGroupQR?: string;
  paymentQRs?: PaymentQRs;
  audience?: string[];
  takeaways?: string[];
  materialsPublic?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  relatedEventSlug?: string;
}

export interface MembershipTier {
  id: string;
  nameEn: string;
  nameZh: string;
  pricePerMonthCNY: number;
  highlight?: boolean;
  benefits: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export interface Partner {
  id: string;
  name: string;
  url: string;
  blurb?: string;
}

export interface SalonNote {
  id: string;
  title: string;
  eventSlug?: string;
  keyQuestions: string[];
  viewpoints: string[];
  quotes: string[];
  openProblems: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  theme: string;
  image: string;
  recapHref?: string;
  relatedEventSlug?: string;
}
