function response(room, msg, sender, isGroupChat, replier) {
  function searchDictionary(query) {
    try {
      var url = "https://openapi.naver.com/v1/search/encyc.json?query=" + query;
      var response = org.jsoup.Jsoup.connect(url)
        .header("X-Naver-Client-Id", "{CLIENT_ID}")
        .header("X-Naver-Client-Secret", "{CLIENT_SECRET}")
        .ignoreContentType(true)
        .get();

      var dictionaryResult = JSON.parse(response.body().text());

      if (dictionaryResult.items && dictionaryResult.items.length > 0) {
        var resultText = "사전 검색 결과:\n\n";

        for (var i = 0; i < dictionaryResult.items.length; i++) {
          var item = dictionaryResult.items[i];
          resultText += "제목: " + item.title.replace("<\/b>", "") + "\n";
          resultText += "링크: " + item.link + "\n";
          resultText += "설명: " + item.description + "\n\n";
        }

        return resultText.trim();
      } else {
        return "사전 검색 결과가 없습니다.";
      }
    } catch (e) {
      return "사전 검색 중 오류가 발생했습니다.";
    }
  }

  if (msg.startsWith("/사전 ")) {
    var query = msg.substring(4).trim();
    var result = searchDictionary(query);
    replier.reply(result);
  }
}
