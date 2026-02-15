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
  tags: string[];
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
  {
    id: "7",
    name: "Science",
    slug: "science",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "8",
    name: "Travel",
    slug: "travel",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "9",
    name: "Food",
    slug: "food",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "10",
    name: "Education",
    slug: "education",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "11",
    name: "Art",
    slug: "art",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "12",
    name: "Gaming",
    slug: "gaming",
    color: "bg-green-100 text-green-800",
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
    tags: ["Climate Change", "Politics", "World"],
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
    tags: ["AI", "Technology", "Science"],
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
    tags: ["Sports", "Football", "World Cup"],
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
    tags: ["Fashion", "Sustainability", "Lifestyle"],
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
    tags: ["Business", "Finance", "World"],
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
    tags: ["Health", "Social Media", "Youth"],
  },
  {
    id: "7",
    title: "The Future of Remote Work: A Hybrid Approach",
    slug: "future-of-remote-work-hybrid-approach",
    excerpt:
      "Companies are adopting hybrid models, combining remote and in-office work to offer flexibility and maintain collaboration.",
    content: `
      <p>The pandemic has reshaped the modern workplace, and a new consensus is emerging around a hybrid model of work. This approach, which combines the flexibility of remote work with the collaborative benefits of an in-office presence, is being adopted by companies of all sizes.</p>
      
      <p>A recent survey found that 74% of companies are planning to permanently shift to a hybrid work model. The benefits are clear: employees enjoy a better work-life balance, and companies can reduce office costs and attract a wider talent pool.</p>
      
      <p>However, the transition to a hybrid model is not without its challenges. Companies need to invest in technology to support remote collaboration and develop new policies to ensure fairness and inclusivity for all employees, regardless of their location.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1552664730-d3077885b024?w=800&h=400&fit=crop",
    category: categories[4],
    author: authors[1],
    publishedAt: "2024-01-09T11:00:00Z",
    readTime: 6,
    views: 11200,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Business", "Work", "Lifestyle"],
  },
  {
    id: "8",
    title: "Exploring the Deep Sea: New Species Discovered",
    slug: "exploring-deep-sea-new-species-discovered",
    excerpt:
      "A team of marine biologists has discovered several new species of deep-sea creatures, highlighting the vast biodiversity of our oceans.",
    content: `
      <p>A recent deep-sea expedition has yielded a treasure trove of new discoveries, with scientists identifying several previously unknown species of marine life. The findings underscore the incredible biodiversity of our planet's oceans and the importance of conservation efforts.</p>
      
      <p>Among the newly discovered species is a bioluminescent octopus, a translucent snailfish, and a variety of a new species of crustaceans. These creatures thrive in extreme environments, with crushing pressures and near-freezing temperatures.</p>
      
      <p>"Every time we explore the deep sea, we're reminded of how little we know about our own planet," said Dr. Anya Sharma, the lead scientist of the expedition. "These discoveries are a call to action to protect these fragile ecosystems from the threats of pollution and climate change."</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1574991672709-b6b99d54e115?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[0],
    publishedAt: "2024-01-08T15:00:00Z",
    readTime: 5,
    views: 8900,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Science", "Ocean", "Nature"],
  },
  {
    id: "9",
    title: "The Rise of E-Sports: From Niche Hobby to Mainstream Spectacle",
    slug: "rise-of-esports-mainstream-spectacle",
    excerpt:
      "E-sports have exploded in popularity, with professional leagues, multi-million dollar tournaments, and a massive global audience.",
    content: `
      <p>Once a niche hobby for a dedicated few, e-sports have burst into the mainstream, becoming a global phenomenon with a massive and passionate following. Professional e-sports leagues now rival traditional sports in viewership and prize money, with top players earning millions of dollars.</p>
      
      <p>The rise of streaming platforms like Twitch and YouTube has been a key factor in the growth of e-sports, allowing fans to watch their favorite players compete from anywhere in the world. The competitive gaming scene is now a multi-billion dollar industry, with major brands and investors taking notice.</p>
      
      <p>From sold-out arenas to dedicated e-sports stadiums, the spectacle of professional gaming is only getting bigger. As technology continues to evolve, the line between virtual and reality is blurring, and e-sports are at the forefront of this new era of entertainment.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1542751371-6593952a6a62?w=800&h=400&fit=crop",
    category: categories[2],
    author: authors[2],
    publishedAt: "2024-01-07T18:00:00Z",
    readTime: 7,
    views: 16500,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["E-Sports", "Gaming", "Technology"],
  },
  {
    id: "10",
    title: "The Art of Mindful Eating: A Guide to a Healthier Relationship with Food",
    slug: "art-of-mindful-eating-guide",
    excerpt:
      "Mindful eating is a practice that can help you improve your digestion, manage your weight, and develop a healthier relationship with food.",
    content: `
      <p>In our fast-paced world, it's easy to eat on autopilot, rushing through meals without paying attention to what or how we're eating. Mindful eating is the practice of bringing awareness to the entire experience of eating, from the smell and taste of your food to the sensations in your body.</p>
      
      <p>By practicing mindful eating, you can learn to recognize your body's hunger and fullness cues, which can help you avoid overeating and make healthier food choices. It can also improve your digestion and reduce stress.</p>
      
      <p>Here are a few tips to get started with mindful eating:</p>
      <ul>
        <li>Eat slowly and without distraction.</li>
        <li>Pay attention to the colors, smells, and textures of your food.</li>
        <li>Chew your food thoroughly.</li>
        <li>Notice how your body feels before, during, and after eating.</li>
      </ul>
      
      <p>Mindful eating is not about dieting or restriction. It's about developing a healthier and more enjoyable relationship with food.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2024-01-06T12:00:00Z",
    readTime: 5,
    views: 7800,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Lifestyle"],
  },
  {
    id: "11",
    title: "The Psychology of Color: How Colors Affect Our Mood and Behavior",
    slug: "psychology-of-color-affect-mood-behavior",
    excerpt:
      "Colors can have a profound impact on our emotions and actions. Understanding the psychology of color can help you make better design choices.",
    content: `
      <p>Did you know that the colors you see can affect your mood, feelings, and even your behavior? The psychology of color is a fascinating field that explores the emotional and psychological effects of color.</p>
      
      <p>For example, blue is often associated with feelings of calmness and serenity, while red can evoke strong emotions of passion and excitement. Green is often linked to nature and feelings of peace and tranquility.</p>
      
      <p>By understanding the psychology of color, you can make more informed design choices in your home, your wardrobe, and even your branding. The right colors can help you create the desired mood, convey a specific message, and even influence purchasing decisions.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[1],
    publishedAt: "2024-01-05T10:00:00Z",
    readTime: 4,
    views: 6500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Psychology", "Design", "Lifestyle"],
  },
  {
    id: "12",
    title: "The Benefits of a Digital Detox: How to Unplug and Recharge",
    slug: "benefits-of-digital-detox-unplug-recharge",
    excerpt:
      "In our hyper-connected world, it's more important than ever to take a break from our screens. A digital detox can help you reduce stress, improve your sleep, and reconnect with the world around you.",
    content: `
      <p>Are you constantly checking your phone, scrolling through social media, or glued to your email? If so, you may be in need of a digital detox. A digital detox is a period of time during which a person refrains from using electronic devices such as smartphones and computers.</p>
      
      <p>The benefits of a digital detox can be profound. It can help you reduce stress, improve your sleep quality, and increase your focus and productivity. It can also help you reconnect with the people and activities you love in the real world.</p>
      
      <p>Here are a few tips for a successful digital detox:</p>
      <ul>
        <li>Set a specific time frame for your detox.</li>
        <li>Inform your friends and family about your plans.</li>
        <li>Find alternative activities to fill your time.</li>
        <li>Be patient with yourself and don't be afraid to start small.</li>
      </ul>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2024-01-04T14:00:00Z",
    readTime: 5,
    views: 8200,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Health", "Wellness", "Lifestyle"],
  },
  {
    id: "13",
    title: "The Art of Storytelling: How to Captivate and Engage Your Audience",
    slug: "art-of-storytelling-captivate-engage-audience",
    excerpt:
      "Storytelling is a powerful tool that can be used to connect with people on an emotional level. Whether you're a marketer, a salesperson, or a leader, learning how to tell a good story can help you achieve your goals.",
    content: `
      <p>From ancient myths to modern blockbusters, stories have been a fundamental part of the human experience for thousands of years. Storytelling is a powerful tool that can be used to entertain, educate, and inspire. It can also be used to build relationships and create a sense of community.</p>
      
      <p>So what makes a good story? A good story has a clear beginning, middle, and end. It has relatable characters, a compelling plot, and a satisfying resolution. It also has a clear message or theme that resonates with the audience.</p>
      
      <p>Whether you're writing a novel, giving a presentation, or simply talking to a friend, learning how to tell a good story can help you connect with people on a deeper level and make a lasting impact.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2024-01-03T09:00:00Z",
    readTime: 6,
    views: 9500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Communication", "Business", "Lifestyle"],
  },
  {
    id: "14",
    title: "The Science of Sleep: Why You Need 8 Hours a Night",
    slug: "science-of-sleep-why-you-need-8-hours",
    excerpt:
      "Sleep is essential for our physical and mental health. But how much sleep do we really need? And what happens when we don't get enough?",
    content: `
      <p>We spend about a third of our lives sleeping, but many of us don't get enough of it. Sleep is essential for our physical and mental health, and a lack of it can have serious consequences.</p>
      
      <p>During sleep, our bodies repair themselves, our brains consolidate memories, and our immune systems are strengthened. When we don't get enough sleep, we're more likely to get sick, have accidents, and suffer from chronic health problems such as obesity and diabetes.</p>
      
      <p>Most adults need between 7 and 9 hours of sleep per night. If you're not getting enough sleep, there are a number of things you can do to improve your sleep habits, such as creating a regular sleep schedule, avoiding caffeine and alcohol before bed, and creating a relaxing bedtime routine.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2024-01-02T22:00:00Z",
    readTime: 5,
    views: 11000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Health", "Wellness", "Science"],
  },
  {
    id: "15",
    title: "The Power of Positive Thinking: How to Change Your Mindset and Your Life",
    slug: "power-of-positive-thinking-change-mindset-life",
    excerpt:
      "Your thoughts have a powerful impact on your life. By learning to think more positively, you can improve your health, your relationships, and your overall well-being.",
    content: `
      <p>Positive thinking is a powerful tool that can help you achieve your goals and live a happier, more fulfilling life. When you think positively, you're more likely to be optimistic, confident, and resilient. You're also more likely to take risks and persevere in the face of challenges.</p>
      
      <p>Of course, positive thinking is not about ignoring the negative aspects of life. It's about choosing to focus on the good, even when times are tough. It's about believing in yourself and your ability to overcome any obstacle.</p>
      
      <p>If you want to cultivate a more positive mindset, there are a number of things you can do, such as practicing gratitude, visualizing your success, and surrounding yourself with positive people.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1552250575-e5087c8b466e?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[1],
    publishedAt: "2024-01-01T12:00:00Z",
    readTime: 4,
    views: 9800,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Psychology", "Wellness", "Lifestyle"],
  },
  {
    id: "16",
    title: "The Rise of Vertical Farming: A Solution to Urban Food Deserts",
    slug: "rise-of-vertical-farming-solution-to-urban-food-deserts",
    excerpt: "Vertical farming is a revolutionary approach to agriculture that could help solve the problem of food deserts in urban areas.",
    content: "<p>Vertical farming is a method of growing crops in vertically stacked layers. It often incorporates controlled-environment agriculture, which optimizes plant growth, and soilless farming techniques such as hydroponics, aquaponics, and aeroponics.</p>",
    featuredImage: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[2],
    publishedAt: "2023-12-31T10:00:00Z",
    readTime: 5,
    views: 12500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Technology", "Food", "Sustainability"],
    },
    {
    id: "17",
    title: "The History of Jazz: A Uniquely American Art Form",
    slug: "history-of-jazz-uniquely-american-art-form",
    excerpt: "Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, United States, in the late 19th and early 20th centuries.",
    content: "<p>Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, United States, in the late 19th and early 20th centuries, with its roots in blues and ragtime. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression in traditional and popular music.</p>",
    featuredImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-30T14:00:00Z",
    readTime: 6,
    views: 11000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Music", "History", "Lifestyle"],
    },
    {
    id: "18",
    title: "The Importance of Financial Literacy for Young Adults",
    slug: "importance-of-financial-literacy-for-young-adults",
    excerpt: "Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing.",
    content: "<p>Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. It is a crucial skill for young adults to learn as they begin to navigate the complexities of the modern financial world.</p>",
    featuredImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop",
    category: categories[4],
    author: authors[1],
    publishedAt: "2023-12-29T09:00:00Z",
    readTime: 5,
    views: 9500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Finance", "Education", "Business"],
    },
    {
    id: "19",
    title: "The Benefits of Regular Exercise: More Than Just Weight Loss",
    slug: "benefits-of-regular-exercise-more-than-just-weight-loss",
    excerpt: "Regular exercise has numerous benefits for your physical and mental health, from reducing your risk of chronic diseases to boosting your mood and energy levels.",
    content: "<p>Regular exercise is one of the most important things you can do for your health. It can help you control your weight, reduce your risk of chronic diseases, strengthen your bones and muscles, and improve your mental health and mood.</p>",
    featuredImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-28T18:00:00Z",
    readTime: 7,
    views: 13000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Health", "Fitness", "Wellness"],
    },
    {
    id: "20",
    title: "The World of Competitive Gaming: A Look Inside the E-Sports Industry",
    slug: "world-of-competitive-gaming-look-inside-esports-industry",
    excerpt: "E-sports is a fast-growing industry with a global audience of millions. But what does it take to be a professional gamer? And what does the future of e-sports look like?",
    content: "<p>E-sports, short for electronic sports, is a form of competition using video games. E-sports often takes the form of organized, multiplayer video game competitions, particularly between professional players, individually or as teams.</p>",
    featuredImage: "https://images.unsplash.com/photo-1580234810420-3371436e22c0?w=800&h=400&fit=crop",
    category: categories[2],
    author: authors[2],
    publishedAt: "2023-12-27T12:00:00Z",
    readTime: 6,
    views: 10500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["E-Sports", "Gaming", "Technology"],
    },
    {
    id: "21",
    title: "The Future of Transportation: Electric and Autonomous Vehicles",
    slug: "future-of-transportation-electric-and-autonomous-vehicles",
    excerpt: "The transportation industry is on the verge of a revolution, with electric and autonomous vehicles set to transform the way we move.",
    content: "<p>The transportation industry is undergoing a massive transformation, driven by the rise of electric and autonomous vehicles. These new technologies have the potential to make our transportation system safer, more efficient, and more sustainable.</p>",
    featuredImage: "https://images.unsplash.com/photo-1582794251343-33b0a23e27c1?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2023-12-26T10:00:00Z",
    readTime: 5,
    views: 11500,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Technology", "Transportation", "Sustainability"],
    },
    {
    id: "22",
    title: "The Impact of Social Media on Mental Health: A Double-Edged Sword",
    slug: "impact-of-social-media-on-mental-health-double-edged-sword",
    excerpt: "Social media can be a great way to connect with others, but it can also have a negative impact on our mental health. It's important to be aware of the risks and to use social media in a way that is healthy and balanced.",
    content: "<p>Social media has become an integral part of our daily lives, but its impact on our mental health is a growing concern. While it can be a great way to connect with others and stay informed, it can also lead to feelings of anxiety, depression, and loneliness.</p>",
    featuredImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-25T14:00:00Z",
    readTime: 6,
    views: 10000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Social Media", "Mental Health"],
    },
    {
    id: "23",
    title: "The History of Cinema: From the Silent Era to the Digital Age",
    slug: "history-of-cinema-silent-era-to-digital-age",
    excerpt: "Cinema has come a long way since the days of silent films. The advent of sound, color, and digital technology has transformed the art of filmmaking and the way we experience movies.",
    content: "<p>The history of cinema is a fascinating story of technological innovation and artistic expression. From the early days of silent films to the blockbusters of the digital age, cinema has always been a powerful medium for storytelling and entertainment.</p>",
    featuredImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-24T09:00:00Z",
    readTime: 7,
    views: 12000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Movies", "History", "Lifestyle"],
    },
    {
    id: "24",
    title: "The Rise of Plant-Based Diets: A Healthier and More Sustainable Way of Eating",
    slug: "rise-of-plant-based-diets-healthier-more-sustainable-way-of-eating",
    excerpt: "Plant-based diets are becoming increasingly popular, and for good reason. They're not only good for your health, but they're also better for the planet.",
    content: "<p>A plant-based diet is a diet that consists mostly or entirely of plant-based foods. This includes fruits, vegetables, grains, legumes, nuts, and seeds. Plant-based diets have been shown to have a number of health benefits, including a lower risk of heart disease, type 2 diabetes, and some types of cancer.</p>",
    featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-23T18:00:00Z",
    readTime: 5,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Food", "Sustainability"],
    },
    {
    id: "25",
    title: "The World of Street Art: From Graffiti to Murals",
    slug: "world-of-street-art-from-graffiti-to-murals",
    excerpt: "Street art is a vibrant and dynamic art form that can be found in cities all over the world. From graffiti tags to large-scale murals, street art is a reflection of the culture and creativity of the streets.",
    content: "<p>Street art is an art form that is created in public locations, usually unsanctioned and executed outside of the context of traditional art venues. The term can include traditional graffiti artwork, stenciling, sticker art, wheatpasting, and street posters.</p>",
    featuredImage: "https://images.unsplash.com/photo-1542751371-6593952a6a62?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2023-12-22T12:00:00Z",
    readTime: 6,
    views: 10000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Art", "Lifestyle", "Culture"],
    },
    {
    id: "26",
    title: "The Future of Artificial Intelligence: Opportunities and Challenges",
    slug: "future-of-artificial-intelligence-opportunities-and-challenges",
    excerpt: "Artificial intelligence is a rapidly developing field with the potential to transform our world. But what are the opportunities and challenges that lie ahead?",
    content: "<p>Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans and animals. AI research has been defined as the field of study of intelligent agents, which refers to any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals.</p>",
    featuredImage: "https://images.unsplash.com/photo-1620712943543-95f7c352a12a?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2023-12-21T10:00:00Z",
    readTime: 7,
    views: 13500,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["AI", "Technology", "Future"],
    },
    {
    id: "27",
    title: "The Importance of Sleep for Optimal Health and Well-Being",
    slug: "importance-of-sleep-for-optimal-health-and-well-being",
    excerpt: "Sleep is a vital component of our overall health and well-being. It plays a crucial role in our physical and mental health, and a lack of it can have serious consequences.",
    content: "<p>Sleep is a naturally recurring state of mind and body, characterized by altered consciousness, relatively inhibited sensory activity, reduced muscle activity and inhibition of nearly all voluntary muscles during rapid eye movement (REM) sleep, and reduced interactions with the surroundings.</p>",
    featuredImage: "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-20T14:00:00Z",
    readTime: 5,
    views: 9500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Sleep"],
    },
    {
    id: "28",
    title: "The History of Rock and Roll: From Elvis to the Beatles",
    slug: "history-of-rock-and-roll-from-elvis-to-the-beatles",
    excerpt: "Rock and roll is a genre of popular music that originated and evolved in the United States during the late 1940s and early 1950s from musical styles such as gospel, jump blues, jazz, boogie-woogie, and rhythm and blues, along with country music.",
    content: "<p>Rock and roll is a genre of popular music that originated and evolved in the United States during the late 1940s and early 1950s from musical styles such as gospel, jump blues, jazz, boogie-woogie, and rhythm and blues, along with country music.</p>",
    featuredImage: "https://images.unsplash.com/photo-1516298024234-b264b38a74e5?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-19T09:00:00Z",
    readTime: 6,
    views: 11000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Music", "History", "Lifestyle"],
    },
    {
    id: "29",
    title: "The Benefits of Mindfulness Meditation for Stress Reduction",
    slug: "benefits-of-mindfulness-meditation-for-stress-reduction",
    excerpt: "Mindfulness meditation is a mental training practice that involves focusing your mind on your experiences (like your own emotions, thoughts, and sensations) in the present moment.",
    content: "<p>Mindfulness meditation is a mental training practice that involves focusing your mind on your experiences (like your own emotions, thoughts, and sensations) in the present moment. It can help you reduce stress, improve your focus, and increase your self-awareness.</p>",
    featuredImage: "https://images.unsplash.com/photo-1506126613408-4e63a4b095e5?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-18T18:00:00Z",
    readTime: 5,
    views: 8500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Meditation"],
    },
    {
    id: "30",
    title: "The World of Comic Books: A Look at the History and Culture of Comics",
    slug: "world-of-comic-books-look-at-history-and-culture-of-comics",
    excerpt: "Comic books have been a popular form of entertainment for decades, with a rich history and a vibrant culture. From superheroes to indie comics, there's a comic book for everyone.",
    content: "<p>A comic book, also called a comicbook, comic magazine or (in the United Kingdom and Ireland) a comic, is a publication that consists of comics art in the form of sequential juxtaposed panels that represent individual scenes. Panels are often accompanied by descriptive prose and written narrative, usually, dialogue contained in word balloons emblematic of the comics art form.</p>",
    featuredImage: "https://images.unsplash.com/photo-1589028303887-3d582a8a8a2b?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2023-12-17T12:00:00Z",
    readTime: 6,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Comics", "Pop Culture", "Lifestyle"],
    },
    {
    id: "31",
    title: "The Future of Space Exploration: Mars and Beyond",
    slug: "future-of-space-exploration-mars-and-beyond",
    excerpt: "Humanity has always been fascinated by the stars. But what does the future of space exploration hold? And what are the next steps in our journey to the cosmos?",
    content: "<p>The future of space exploration is full of exciting possibilities, from missions to Mars and beyond to the development of new technologies that will allow us to travel farther and faster than ever before. But there are also many challenges to overcome, from the dangers of space travel to the high cost of exploration.</p>",
    featuredImage: "https://images.unsplash.com/photo-1517976487-151858d37410?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2023-12-16T10:00:00Z",
    readTime: 7,
    views: 14000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Space", "Technology", "Science"],
    },
    {
    id: "32",
    title: "The Importance of a Healthy Diet for a Strong Immune System",
    slug: "importance-of-healthy-diet-for-strong-immune-system",
    excerpt: "A healthy diet is essential for a strong immune system. By eating a variety of nutrient-rich foods, you can help your body fight off infection and disease.",
    content: "<p>Your immune system is your body's defense against infection and disease. A healthy diet is essential for a strong immune system. By eating a variety of nutrient-rich foods, you can help your body build and maintain a strong immune system that can protect you from illness.</p>",
    featuredImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-15T14:00:00Z",
    readTime: 5,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Nutrition"],
    },
    {
    id: "33",
    title: "The History of Video Games: From Pong to the Present Day",
    slug: "history-of-video-games-from-pong-to-present-day",
    excerpt: "Video games have come a long way since the days of Pong. The history of video games is a story of technological innovation, creative expression, and cultural impact.",
    content: "<p>The history of video games is a fascinating story of how a niche hobby grew into one of the largest entertainment industries in the world. From the simple graphics of Pong to the immersive worlds of modern games, video games have always been a reflection of the latest technological advancements.</p>",
    featuredImage: "https://images.unsplash.com/photo-1555086150-825b6a2b53b3?w=800&h=400&fit=crop",
    category: categories[2],
    author: authors[2],
    publishedAt: "2023-12-14T09:00:00Z",
    readTime: 6,
    views: 10000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Gaming", "History", "Technology"],
    },
    {
    id: "34",
    title: "The Benefits of Yoga for Mind and Body",
    slug: "benefits-of-yoga-for-mind-and-body",
    excerpt: "Yoga is a mind-body practice that combines physical postures, breathing techniques, and meditation or relaxation. It has been shown to have numerous benefits for both your physical and mental health.",
    content: "<p>Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism. The term 'yoga' in the Western world often denotes a modern form of Hatha yoga, yoga as exercise, consisting largely of the postures or asanas.</p>",
    featuredImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-13T18:00:00Z",
    readTime: 5,
    views: 8000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Yoga"],
    },
    {
    id: "35",
    title: "The World of Anime: A Look at the History and Culture of Japanese Animation",
    slug: "world-of-anime-look-at-history-and-culture-of-japanese-animation",
    excerpt: "Anime is a style of Japanese film and television animation, typically aimed at adults as well as children. It has a rich history and a vibrant culture, with a global audience of millions.",
    content: "<p>Anime is a style of Japanese film and television animation, typically aimed at adults as well as children. The word is the Japanese term for animation. The earliest commercial Japanese animation dates to 1917.</p>",
    featuredImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-12T12:00:00Z",
    readTime: 6,
    views: 9500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Anime", "Pop Culture", "Lifestyle"],
    },
    {
    id: "36",
    title: "The Future of Work: The Rise of the Gig Economy",
    slug: "future-of-work-rise-of-gig-economy",
    excerpt: "The gig economy is a labor market characterized by the prevalence of short-term contracts or freelance work as opposed to permanent jobs. It is a growing trend that is changing the way we work.",
    content: "<p>The gig economy is a labor market characterized by the prevalence of short-term contracts or freelance work as opposed to permanent jobs. The term 'gig' is a slang word for a 'job for a specified period of time'.</p>",
    featuredImage: "https://images.unsplash.com/photo-1552664730-d3077885b024?w=800&h=400&fit=crop",
    category: categories[4],
    author: authors[1],
    publishedAt: "2023-12-11T10:00:00Z",
    readTime: 5,
    views: 10500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Business", "Work", "Economy"],
    },
    {
    id: "37",
    title: "The Importance of Hydration for Optimal Health",
    slug: "importance-of-hydration-for-optimal-health",
    excerpt: "Water is essential for life. It makes up about 60% of our body weight and is involved in many important bodily functions. Staying hydrated is crucial for our overall health and well-being.",
    content: "<p>Water is a vital nutrient for every cell in your body. It helps regulate your body temperature, lubricate your joints, and transport nutrients to your cells. It also helps flush out toxins and waste products.</p>",
    featuredImage: "https://images.unsplash.com/photo-1553531384-411a247ccd74?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-10T14:00:00Z",
    readTime: 4,
    views: 8000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Nutrition"],
    },
    {
    id: "38",
    title: "The History of Photography: From the Camera Obscura to the Digital Age",
    slug: "history-of-photography-from-camera-obscura-to-digital-age",
    excerpt: "Photography has come a long way since the days of the camera obscura. The history of photography is a story of technological innovation, artistic expression, and cultural impact.",
    content: "<p>The history of photography is a fascinating story of how a niche hobby grew into one of the largest entertainment industries in the world. From the simple graphics of Pong to the immersive worlds of modern games, video games have always been a reflection of the latest technological advancements.</p>",
    featuredImage: "https://images.unsplash.com/photo-1510252819079-f538a7458ab8?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2023-12-09T09:00:00Z",
    readTime: 6,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Photography", "History", "Art"],
    },
    {
    id: "39",
    title: "The Benefits of a Ketogenic Diet: A Beginner's Guide",
    slug: "benefits-of-ketogenic-diet-beginners-guide",
    excerpt: "The ketogenic diet is a high-fat, low-carbohydrate diet that has been shown to have a number of health benefits, including weight loss, improved blood sugar control, and a reduced risk of some chronic diseases.",
    content: "<p>The ketogenic diet is a very low-carb, high-fat diet that shares many similarities with the Atkins and low-carb diets. It involves drastically reducing carbohydrate intake and replacing it with fat. This reduction in carbs puts your body into a metabolic state called ketosis.</p>",
    featuredImage: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-08T18:00:00Z",
    readTime: 5,
    views: 10000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Nutrition"],
    },
    {
    id: "40",
    title: "The World of Board Games: A Look at the History and Culture of Tabletop Gaming",
    slug: "world-of-board-games-look-at-history-and-culture-of-tabletop-gaming",
    excerpt: "Board games have been a popular form of entertainment for centuries, with a rich history and a vibrant culture. From classic games like chess and Monopoly to modern games like Settlers of Catan and Ticket to Ride, there's a board game for everyone.",
    content: "<p>A board game is a tabletop game that involves counters or pieces moved or placed on a pre-marked surface or 'board', according to a set of rules. Some games are based on pure strategy, but many contain an element of chance; and some are purely chance, with no element of skill.</p>",
    featuredImage: "https://images.unsplash.com/photo-1580221874558-96f3a388b3b3?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-07T12:00:00Z",
    readTime: 6,
    views: 8500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Gaming", "Lifestyle", "Culture"],
    },
    {
    id: "41",
    title: "The Future of Blockchain: More Than Just Cryptocurrency",
    slug: "future-of-blockchain-more-than-just-cryptocurrency",
    excerpt: "Blockchain technology is best known for its use in cryptocurrencies like Bitcoin, but it has the potential to revolutionize a wide range of industries, from finance and healthcare to supply chain management and voting.",
    content: "<p>A blockchain is a growing list of records, called blocks, that are linked together using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree).</p>",
    featuredImage: "https://images.unsplash.com/photo-1620712943543-95f7c352a12a?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2023-12-06T10:00:00Z",
    readTime: 7,
    views: 12000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Blockchain", "Technology", "Finance"],
    },
    {
    id: "42",
    title: "The Importance of Gut Health for Overall Well-Being",
    slug: "importance-of-gut-health-for-overall-well-being",
    excerpt: "The gut microbiome is a complex ecosystem of microorganisms that live in our digestive tract. It plays a crucial role in our overall health, from our digestion and immune system to our mood and mental health.",
    content: "<p>The gut microbiome is the collection of all the microbes, such as bacteria, fungi, viruses, and their genes, that naturally live on and inside of us. These microbes are essential for our health and well-being.</p>",
    featuredImage: "https://images.unsplash.com/photo-1546069901-d55d7f5c5b24?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-05T14:00:00Z",
    readTime: 5,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Nutrition"],
    },
    {
    id: "43",
    title: "The History of Hip Hop: From the Bronx to the Mainstream",
    slug: "history-of-hip-hop-from-the-bronx-to-the-mainstream",
    excerpt: "Hip hop is a culture and art movement that was created by African Americans, Latino Americans and Caribbean Americans in the Bronx, New York City. The origin of the name is often disputed. It is also argued as to whether hip hop started in the South or West Bronx.",
    content: "<p>Hip hop as a music and culture formed during the 1970s when block parties became increasingly popular in New York City, particularly among African American youth residing in the Bronx. At block parties, DJs played percussive breaks of popular songs using two turntables and a DJ mixer to be able to play breaks from two copies of the same record, alternating from one to the other and extending the 'break'.</p>",
    featuredImage: "https://images.unsplash.com/photo-1516298024234-b264b38a74e5?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2023-12-04T09:00:00Z",
    readTime: 6,
    views: 10500,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Music", "History", "Culture"],
    },
    {
    id: "44",
    title: "The Benefits of Intermittent Fasting: A Beginner's Guide",
    slug: "benefits-of-intermittent-fasting-beginners-guide",
    excerpt: "Intermittent fasting is an eating pattern that cycles between periods of eating and fasting. It has been shown to have a number of health benefits, including weight loss, improved blood sugar control, and a reduced risk of some chronic diseases.",
    content: "<p>Intermittent fasting, also known as intermittent energy restriction, is an umbrella term for various meal timing schedules that cycle between voluntary fasting (or reduced calorie intake) and non-fasting over a given period.</p>",
    featuredImage: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-12-03T18:00:00Z",
    readTime: 5,
    views: 9500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Nutrition"],
    },
    {
    id: "45",
    title: "The World of Street Photography: A Guide to Capturing the Perfect Shot",
    slug: "world-of-street-photography-guide-to-capturing-perfect-shot",
    excerpt: "Street photography is a genre of photography that features the human condition within public places. Street photographers do not necessarily have a specific theme or subject in mind, but rather they are looking for interesting moments and compositions.",
    content: "<p>Street photography is a genre of photography that features the human condition within public places and does not necessitate the presence of a street or even the urban environment. The term 'street' refers to a place where human activity can be seen, a place to observe and capture social interaction.</p>",
    featuredImage: "https://images.unsplash.com/photo-1510252819079-f538a7458ab8?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-12-02T12:00:00Z",
    readTime: 6,
    views: 8000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Photography", "Art", "Lifestyle"],
    },
    {
    id: "46",
    title: "The Future of Virtual Reality: More Than Just Gaming",
    slug: "future-of-virtual-reality-more-than-just-gaming",
    excerpt: "Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world. VR is most commonly used in entertainment applications such as video games, but it is also being used in other fields such as education and healthcare.",
    content: "<p>Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world. Applications of virtual reality include entertainment (particularly video games), education (such as medical or military training) and business (such as virtual meetings).</p>",
    featuredImage: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=400&fit=crop",
    category: categories[1],
    author: authors[1],
    publishedAt: "2023-12-01T10:00:00Z",
    readTime: 7,
    views: 11500,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["VR", "Technology", "Gaming"],
    },
    {
    id: "47",
    title: "The Importance of Mental Health First Aid",
    slug: "importance-of-mental-health-first-aid",
    excerpt: "Mental health first aid is the help provided to a person who is developing a mental health problem, experiencing a worsening of an existing mental health problem, or in a mental health crisis. Just like physical first aid, mental health first aid is given until appropriate professional help is received or until the crisis resolves.",
    content: "<p>Mental health first aid is the help provided to a person who is developing a mental health problem, experiencing a worsening of an existing mental health problem, or in a mental health crisis. Just like physical first aid, mental health first aid is given until appropriate professional help is received or until the crisis resolves.</p>",
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-11-30T14:00:00Z",
    readTime: 5,
    views: 8500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Wellness", "Mental Health"],
    },
    {
    id: "48",
    title: "The History of Punk Rock: A Sound of Rebellion",
    slug: "history-of-punk-rock-sound-of-rebellion",
    excerpt: "Punk rock is a music genre that emerged in the mid-1970s. Rooted in 1960s garage rock, punk bands rejected the perceived excesses of mainstream 1970s rock. They typically produced short, fast-paced songs with hard-edged melodies and singing styles, stripped-down instrumentation, and often political, anti-establishment lyrics.",
    content: "<p>Punk rock is a music genre that emerged in the mid-1970s. Rooted in 1960s garage rock, punk bands rejected the perceived excesses of mainstream 1970s rock. They typically produced short, fast-paced songs with hard-edged melodies and singing styles, stripped-down instrumentation, and often political, anti-establishment lyrics.</p>",
    featuredImage: "https://images.unsplash.com/photo-1516298024234-b264b38a74e5?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[2],
    publishedAt: "2023-11-29T09:00:00Z",
    readTime: 6,
    views: 9000,
    status: "published",
    isFeatured: false,
    isPopular: true,
    tags: ["Music", "History", "Culture"],
    },
    {
    id: "49",
    title: "The Benefits of Strength Training for Women",
    slug: "benefits-of-strength-training-for-women",
    excerpt: "Strength training is a type of physical exercise specializing in the use of resistance to induce muscular contraction which builds the strength, anaerobic endurance, and size of skeletal muscles. It has numerous benefits for women, including increased metabolism, improved bone density, and a reduced risk of injury.",
    content: "<p>Strength training is a type of physical exercise specializing in the use of resistance to induce muscular contraction which builds the strength, anaerobic endurance, and size of skeletal muscles. It has numerous benefits for women, including increased metabolism, improved bone density, and a reduced risk of injury.</p>",
    featuredImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=400&fit=crop",
    category: categories[5],
    author: authors[3],
    publishedAt: "2023-11-28T18:00:00Z",
    readTime: 5,
    views: 8000,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Health", "Fitness", "Wellness"],
    },
    {
    id: "50",
    title: "The World of Podcasting: A Guide to Starting Your Own Show",
    slug: "world-of-podcasting-guide-to-starting-your-own-show",
    excerpt: "Podcasting has exploded in popularity in recent years, with millions of shows available on a wide range of topics. If you've ever thought about starting your own podcast, now is the perfect time.",
    content: "<p>A podcast is an episodic series of spoken word digital audio files that a user can download to a personal device for easy listening. Streaming applications and podcasting services provide a convenient, integrated way to manage a personal consumption queue across many podcast sources and playback devices.</p>",
    featuredImage: "https://images.unsplash.com/photo-1590602848950-4a894a8a8a2b?w=800&h=400&fit=crop",
    category: categories[3],
    author: authors[0],
    publishedAt: "2023-11-27T12:00:00Z",
    readTime: 6,
    views: 7500,
    status: "published",
    isFeatured: false,
    isPopular: false,
    tags: ["Podcasting", "Communication", "Lifestyle"],
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
