const axios = require('axios');
const fs = require('fs');

require('dotenv').config();
const URL = process.env.DEV_URL;
const USER_TOKEN = process.env.USER_TOKEN; // 로그인이 유효한 유저 토큰 값 입력
const MOCK_DATA = fs.readFileSync('./mock_data.json');
const PARSED_DATA = JSON.parse(MOCK_DATA);

const postItem = async (item) => {
  const { data: res } = await axios.post(URL, item, {
    headers: {
      Authorization: USER_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  return res;
};

const insert = PARSED_DATA.map((item) => postItem(item));

Promise.all(insert)
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
