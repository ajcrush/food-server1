const express = require("express");
const app = express();
const PORT = 8082;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.json({ start: "success", message: "welcome" });
});
const axios = require("axios");


app.get("/swiggy", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  axios
    .get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
app.get('/RestaurantMenu', (req, res) => {
  const resId = req.query.resId;
  if (!resId) {
    return res.status(400).json({ error: 'resId query parameter is required' });
  }

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resId}`;

  axios
    .get(swiggyUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching menu data:', error);
      res.status(500).json({ error: error.message });
    });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
