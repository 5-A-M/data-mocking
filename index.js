const axios = require('axios');
const fs = require('fs');

require('dotenv').config();
const URL = process.env.ORIGIN_URL;
const LAST_ID = 121;

for (let i = 1; i < LAST_ID + 1; i++) {
  axios
    .get(`${URL}/${i}`)
    .then(({ data: res }) => {
      delete res.data.itemId;
      delete res.data.talks;
      delete res.data.reviews;

      const mock_data = JSON.parse(fs.readFileSync('./data.json'));

      const parsed_categories = res.data.categories.map((category) => ({
        categoryName: category,
      }));

      const insertData = {
        ...res.data,
        categories: parsed_categories,
      };

      mock_data.push(insertData);

      fs.writeFileSync('./data.json', JSON.stringify(mock_data, null, 2));
    })
    .catch((err) => console.error(err.message));
}
