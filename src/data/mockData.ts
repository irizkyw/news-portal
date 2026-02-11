export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  views: number;
  status: "published" | "draft";
  isFeatured: boolean;
  isPopular: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface DashboardStats {
  totalViews: number;
  totalArticles: number;
  newSubscribers: number;
  bounceRate: number;
  viewsChange: number;
  articlesChange: number;
  subscribersChange: number;
  bounceRateChange: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Politics",
    slug: "politics",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "2",
    name: "Technology",
    slug: "tech",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "3",
    name: "Sports",
    slug: "sports",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "4",
    name: "Lifestyle",
    slug: "lifestyle",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "5",
    name: "Business",
    slug: "business",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "6",
    name: "Health",
    slug: "health",
    color: "bg-pink-100 text-pink-800",
  },
];

export const authors: Author[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Senior Political Correspondent with 10+ years of experience covering national politics.",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Technology journalist specializing in AI, blockchain, and emerging technologies.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Sports reporter covering major leagues and international competitions.",
  },
  {
    id: "4",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Lifestyle and culture writer focusing on trends, wellness, and social issues.",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Breaking: Major Climate Summit Reaches Historic Agreement",
    slug: "climate-summit-historic-agreement",
    excerpt:
      "World leaders unite on unprecedented climate action plan with binding commitments for carbon neutrality by 2050.",
    content: `
      <p>In a groundbreaking development that could reshape global environmental policy, world leaders at the International Climate Summit have reached a historic agreement that sets binding targets for carbon neutrality by 2050.</p>
      
      <p>The agreement, signed by representatives from 195 countries, includes specific milestones for reducing greenhouse gas emissions, transitioning to renewable energy sources, and establishing a global fund for climate adaptation in developing nations.</p>
      
      <p>"This is not just another climate agreement," said Dr. Maria Santos, lead negotiator for the European Union. "This is a binding commitment with real consequences and measurable outcomes."</p>
      
      <p>Key provisions of the agreement include:</p>
      <ul>
        <li>50% reduction in global emissions by 2030</li>
        <li>$100 billion annual fund for developing nations</li>
        <li>Mandatory renewable energy targets</li>
        <li>Carbon pricing mechanisms</li>
      </ul>
      
      <p>The summit, which ran for two weeks in Geneva, saw intense negotiations as countries balanced economic concerns with environmental imperatives. The final agreement represents a compromise that environmental groups are calling "the most significant climate action in human history."</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
    category: categories[0],
    author: authors[0],
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 5,
    views: 15420,
    status: "published",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "2",
    title: "AI Revolution: New Language Model Surpasses Human Performance",
    slug: "ai-language-model-human-performance",
    excerpt:
      "Latest AI breakthrough demonstrates unprecedented capabilities in reasoning, creativity, and problem-solving across multiple domains.",
    content: `
      <p>A new artificial intelligence language model has achieved what researchers are calling a "watershed moment" in AI development, demonstrating capabilities that surpass human performance in several cognitive tasks.</p>
      
      <p>The model, developed by a consortium of leading tech companies and research institutions, scored higher than 95% of humans on standardized reasoning tests and showed remarkable creativity in generating original content across various domains.</p>
      
      <p>"We're witnessing a fundamental shift in what AI can accomplish," said Dr. Jennifer Liu, lead researcher on the project. "This isn't just about processing information faster—it's about genuine understanding and creative problem-solving."</p>
      
      <p>The implications for industries ranging from healthcare to education are profound, with early applications already showing promising results in medical diagnosis, scientific research, and personalized learning.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2024-01-14T14:30:00Z",
    readTime: 7,
    views: 23150,
    status: "published",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "3",
    title: "World Cup Qualifier: Stunning Upset Shakes Tournament Predictions",
    slug: "world-cup-qualifier-stunning-upset",
    excerpt:
      "Underdog team defeats former champions 3-1 in a match that will be remembered as one of the greatest upsets in football history.",
    content: `
      <p>In what many are calling the greatest upset in World Cup qualifying history, the underdog national team defeated the defending champions 3-1 in a thrilling match that has completely reshuffled tournament predictions.</p>
      
      <p>The victory, achieved through a combination of tactical brilliance and individual heroics, sends shockwaves through the football world and proves that in football, anything is possible.</p>
      
      <p>Captain Rodriguez's hat-trick performance will be remembered for generations, with his final goal—a stunning 35-yard strike in the 89th minute—sealing one of the most memorable victories in the sport's history.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    category: categories[2],
    author: authors[2],
    publishedAt: "2024-01-13T20:15:00Z",
    readTime: 4,
    views: 18750,
    status: "published",
    isFeatured: false,
    isPopular: true,
  },
  {
    id: "4",
    title:
      "The Rise of Sustainable Fashion: How Eco-Conscious Brands Are Changing the Industry",
    slug: "sustainable-fashion-eco-conscious-brands",
    excerpt:
      "From recycled materials to ethical manufacturing, sustainable fashion is no longer a niche market but a driving force in the industry.",
    content: `
      <p>The fashion industry is undergoing a revolutionary transformation as sustainability moves from the margins to the mainstream. Eco-conscious brands are not only changing how clothes are made but also how consumers think about fashion consumption.</p>
      
      <p>Leading this charge are innovative companies that have proven sustainable practices can be both environmentally responsible and commercially successful. From using recycled ocean plastic to developing biodegradable fabrics, these brands are redefining what it means to be fashionable.</p>
      
      <p>Consumer behavior is shifting dramatically, with 73% of millennials willing to pay more for sustainable products, according to recent market research. This trend is forcing traditional fashion giants to reconsider their practices and invest heavily in sustainable alternatives.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[3],
    publishedAt: "2024-01-12T09:45:00Z",
    readTime: 6,
    views: 12340,
    status: "published",
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "5",
    title: "Global Markets Rally as Economic Indicators Show Strong Recovery",
    slug: "global-markets-rally-economic-recovery",
    excerpt:
      "Stock markets worldwide surge as employment data and GDP growth exceed expectations, signaling robust economic recovery.",
    content: `
      <p>Global financial markets experienced their strongest rally in months as key economic indicators exceeded expectations, providing clear evidence of a robust economic recovery across major economies.</p>
      
      <p>The surge was driven by better-than-expected employment data, with unemployment rates falling to pre-pandemic levels in several countries, and GDP growth figures that surpassed analyst predictions by significant margins.</p>
      
      <p>Market analysts are optimistic about the sustainability of this growth, citing strong consumer confidence, increased business investment, and effective monetary policies as key drivers of the recovery.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    category: categories[4],
    author: authors[0],
    publishedAt: "2024-01-11T11:20:00Z",
    readTime: 5,
    views: 9870,
    status: "published",
    isFeatured: false,
    isPopular: false,
  },
  {
    id: "6",
    title:
      "Mental Health Awareness: New Study Reveals Impact of Social Media on Youth",
    slug: "mental-health-social-media-youth-study",
    excerpt:
      "Comprehensive research shows concerning trends in youth mental health linked to social media usage, prompting calls for policy changes.",
    content: `
      <p>A groundbreaking longitudinal study involving over 10,000 teenagers has revealed significant correlations between social media usage patterns and mental health outcomes, prompting urgent calls for policy intervention and platform accountability.</p>
      
      <p>The research, conducted over three years by leading universities, found that excessive social media use is linked to increased rates of anxiety, depression, and sleep disorders among adolescents aged 13-18.</p>
      
      <p>However, the study also highlighted positive aspects of social media, including enhanced social connections and access to mental health resources, suggesting that the platform design and usage patterns are more critical than usage itself.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2024-01-10T16:30:00Z",
    readTime: 8,
    views: 14520,
    status: "published",
    isFeatured: false,
    isPopular: true,
  },
];

export const dashboardStats: DashboardStats = {
  totalViews: 1250000,
  totalArticles: 342,
  newSubscribers: 15420,
  bounceRate: 32.5,
  viewsChange: 12.5,
  articlesChange: 8.3,
  subscribersChange: 23.7,
  bounceRateChange: -5.2,
};

export const weeklyTrafficData = [
  { day: "Mon", views: 12000 },
  { day: "Tue", views: 15000 },
  { day: "Wed", views: 18000 },
  { day: "Thu", views: 22000 },
  { day: "Fri", views: 25000 },
  { day: "Sat", views: 20000 },
  { day: "Sun", views: 16000 },
];
