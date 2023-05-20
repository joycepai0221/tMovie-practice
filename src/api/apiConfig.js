const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "8fd97d1aeadd0e9f5a66fffa008711df",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
