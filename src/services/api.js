import axios from "axios";

// Use the API key directly with a fallback
const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "5bc3cd1a115010448834fe025dd77a48";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Log the API key (remove in production)
console.log("API Key being used:", API_KEY ? "Key exists" : "Key is missing");

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  timeout: 15000, // 15 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to log requests (for debugging)
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.message);
    } else {
      // Error in request setup
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (path, size = "w500") => {
  // If no path is provided or path is null/undefined
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image+Available";
  }

  // If path doesn't start with /, add it
  const imagePath = path.startsWith("/") ? path : `/${path}`;

  // Available sizes: w92, w154, w185, w342, w500, w780, original
  const validSizes = [
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original",
  ];
  const imageSize = validSizes.includes(size) ? size : "w500";

  try {
    return `${IMAGE_BASE_URL}${imageSize}${imagePath}`;
  } catch (error) {
    console.error("Error creating image URL:", error);
    return "https://via.placeholder.com/500x750?text=Error+Loading+Image";
  }
};

export const getTrending = async (mediaType = "all", timeWindow = "day") => {
  try {
    const response = await api.get(`/trending/${mediaType}/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
};

export const getMovies = async (category = "popular", page = 1) => {
  try {
    const response = await api.get(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return { results: [] };
  }
};

export const getTVShows = async (category = "popular", page = 1) => {
  try {
    const response = await api.get(`/tv/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} TV shows:`, error);
    return { results: [] };
  }
};

export const searchMulti = async (query, page = 1) => {
  try {
    const response = await api.get("/search/multi", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching:", error);
    return { results: [] };
  }
};

export const getDetails = async (id, mediaType) => {
  try {
    const response = await api.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return null;
  }
};

export const getVideos = async (id, mediaType) => {
  try {
    const response = await api.get(`/${mediaType}/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${mediaType} videos:`, error);
    return [];
  }
};

export default api;
