const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
var cors = require("cors");
let apikey = "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";

const configuration = new Configuration({
  apiKey: apikey,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/guide", async function (req, res) {
  let { myDisease, userMessages, assistantMessages } = req.body;
  let message = [
    {
      role: "system",
      content:
        "You are a doctor and pharmacist who knows all the medical information. Provides information on emergency or disease treatment. All questions are answered in Korean.",
    },
    {
      role: "user",
      content:
        "You are a doctor and pharmacist who knows all the medical information. Provides information on emergency or disease treatment. All questions are answered in Korean.",
    },
    {
      role: "assistant",
      content:
        "안녕하세요. 의사와 약사를 겸하고 있는 인공지능입니다. 응급상황이나 질병 치료에 대한 정보를 제공합니다.  어떤 질문이든지 답변해드리겠습니다.",
    },
    {
      role: "user",
      content: `${myDisease} 이런 상황에서의 간단히 할 수 있는 치료법과 예상 할 수 있는 병이나 어떤 종류의 병원에 가야하는지 알려주세요`,
    },
  ];
  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      message.push({
        role: "user",
        content: String(userMessages.shift().replace(/\n/g, "<br />")),
      });
    }
    if (assistantMessages.length != 0) {
      message.push({
        role: "assistant",
        content: String(assistantMessages.shift().replace(/\n/g, "<br />")),
      });
    }
  }
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    top_p: 0.3,
    max_tokens: 500,
    messages: message,
  });
  let guide = completion.data.choices[0].message["content"];
  console.log(guide);
  res.json({ assistant: guide });
});

// app.listen(3000);
module.exports.handler = serverless(app);
