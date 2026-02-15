const API_BASE_URL = "http://localhost:8080/api";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category?: Category; // Make the whole category object optional
  author?: Author;    // Make author optional as well for consistency
  publishedAt: string;
  readTime: number;
  views: number;
  status: "published" | "draft";
  isFeatured: boolean;
  isPopular: boolean;
  tags?: string[];
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

export interface WeeklyTraffic {
  day: string;
  views: number;
}

export interface GetPostsParams {
  sortBy?: "latest" | "popular" | "trending" | "views";
  limit?: number;
  categorySlug?: string;
  tagName?: string;
}

// Mengambil semua artikel dari backend dengan parameter opsional
export const getPosts = async (params?: GetPostsParams): Promise<Article[]> => {
  const url = new URL(`${API_BASE_URL}/posts`);
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key) && (params as any)[key] !== undefined) {
        url.searchParams.append(key, String((params as any)[key]));
      }
    }
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Gagal mengambil data postingan");
  }
  return response.json();
};

// Helper functions for specific post types
export const getLatestPosts = async (limit?: number): Promise<Article[]> => {
  return getPosts({ sortBy: "latest", limit });
};

export const getPopularPosts = async (limit?: number): Promise<Article[]> => {
  return getPosts({ sortBy: "popular", limit });
};

export const getTrendingPosts = async (limit?: number): Promise<Article[]> => {
  return getPosts({ sortBy: "trending", limit });
};

// Mengambil satu artikel berdasarkan slug dari backend
export const getPost = async (slug: string): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/posts/${slug}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data postingan");
  }
  return response.json();
};

// Membuat artikel baru
export const createPost = async (postData: {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  featuredImage: string;
  status: string;
  tags: string[];
  authorId: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal membuat postingan");
  }
  return response.json();
};

// Mengambil kategori dari backend
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data kategori");
  }
  return response.json();
};

// Mengambil daftar penulis (user)
export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data penulis");
  }
  return response.json();
};

// SEKARANG MENGAMBIL DARI BACKEND: Statistik Dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
  if (!response.ok) {
    throw new Error("Gagal mengambil statistik dashboard");
  }
  return response.json();
};

// SEKARANG MENGAMBIL DARI BACKEND: Data Grafik Mingguan
export const getWeeklyTrafficData = async (): Promise<WeeklyTraffic[]> => {
  const response = await fetch(`${API_BASE_URL}/stats/traffic`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data traffic mingguan");
  }
  return response.json();
};

export const subscribeToNewsletter = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal berlangganan newsletter");
  }
  return response.json();
};

export const login = async (credentials: { email: string; password: string }): Promise<{ token: string }> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login gagal");
  }
  return response.json();
};

export const register = async (userData: { name: string; email: string; password: string }): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users`, { // Assuming /api/users is the register endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: "", // Default empty avatar
      bio: "",    // Default empty bio
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registrasi gagal");
  }
  return response.json();
};
