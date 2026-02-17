import type {
  User,
  Article,
  Category,
  DashboardStats,
  GetPostsParams,
  WeeklyTraffic,
} from "../types";

const API_BASE_URL = "http://localhost:8080"; // Corrected to match backend's root path

// Helper to get auth token
const getAuthToken = (): string => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    // In a real app, you might redirect to login or throw a more specific error
    console.error("Auth token not found.");
    return "";
  }
  return token;
};

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
export const createPost = async (postData: Partial<Article>) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal membuat postingan");
  }
  return response.json();
};

// Mengupdate artikel
export const updatePost = async (id: string, postData: Partial<Article>): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengupdate postingan");
  }
  return response.json();
};

// Menghapus artikel
export const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthToken(),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus postingan");
  }
};


// Mengambil kategori dari backend
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data kategori");
  }
  return response.json();
};

// Mengambil satu kategori berdasarkan slug
export const getCategory = async (slug: string): Promise<Category> => {
  const response = await fetch(`${API_BASE_URL}/categories/${slug}`);
  if (!response.ok) {
    throw new Error("Gagal mengambil data kategori");
  }
  return response.json();
};

// User Management API Calls
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const createUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt" | "password"> & {
    password?: string;
  },
): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create user");
  }
  return response.json();
};

export const updateUser = async (
  id: string,
  userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update user");
  }
  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};

// Mengambil daftar penulis (user) - This function is now redundant, use getUsers
// export const getAuthors = async (): Promise<Author[]> => {
//   const response = await fetch(`${API_BASE_URL}/users`);
//   if (!response.ok) {
//     throw new Error("Gagal mengambil data penulis");
//   }
//   return response.json();
// };

// SEKARANG MENGAMBIL DARI BACKEND: Statistik Dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/stats/dashboard`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Gagal mengambil statistik dashboard: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// SEKARANG MENGAMBIL DARI BACKEND: Data Grafik Mingguan
export const getWeeklyTrafficData = async (): Promise<WeeklyTraffic[]> => {
  const response = await fetch(`${API_BASE_URL}/stats/traffic`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
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

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> => {
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

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registrasi gagal");
  }
  return response.json();
};
