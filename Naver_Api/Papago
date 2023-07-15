importPackage(org.jsoup);

var pClientId = "YOUR_CLIENT_ID";
var pClientSecret = "YOUR_CLIENT_SECRET";

function translateText(source, target, text) {
  try {
    var url = "https://openapi.naver.com/v1/papago/n2mt";
    var response = Jsoup.connect(url)
      .header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
      .header("X-Naver-Client-Id", pClientId)
      .header("X-Naver-Client-Secret", pClientSecret)
      .data("source", source)
      .data("target", target)
      .data("text", text)
      .ignoreContentType(true)
      .post();

    var translationResult = JSON.parse(response.body().text());

    if (translationResult.message && translationResult.message.result) {
      return translationResult.message.result.translatedText;
    } else {
      return "번역 결과를 가져올 수 없습니다.";
    }
  } catch (e) {
    return "번역 중 오류가 발생했습니다. (라인 번호: " + e.lineNumber + ")";
  }
}

function getValidLanguageCodes() {
  return Object.keys(languageCodeMappings);
}

var languageCodeMappings = {
  "ko": "한국어",
  "en": "영어",
  "ja": "일본어",
  "zh-CN": "중국어 간체",
  "zh-TW": "중국어 번체",
  "es": "스페인어",
  "fr": "프랑스어",
  "vi": "베트남어",
  "th": "태국어",
  "id": "인도네시아어",
  "de": "독일어",
  "ru": "러시아어",
  "it": "이탈리아어"
};

function getCommandHelp() {
  var helpText = "번역 도움말\n\n";
  helpText += "사용법: !번역 [입력 언어 코드] [번역할 언어 코드] [번역할 텍스트]\n";
  helpText += "예시: !번역 ko en 안녕하세요\n\n";
  helpText += "언어 코드 안내:\n";

  for (var code in languageCodeMappings) {
    var language = languageCodeMappings[code];
    helpText += "[" + code + "] " + language + "\n";
  }

  return helpText;
}

function response(room, msg, sender, isGroupChat, replier) {
  if (msg === "!번역도움말") {
    var helpMessage = getCommandHelp();
    replier.reply(helpMessage);
    return;
  }

  if (msg.startsWith("!번역 ")) {
    var params = msg.substring(4).trim().split(" ");
    if (params.length < 3) {
      replier.reply("잘못된 형식입니다. !번역 [source] [target] [text] 형식으로 입력해주세요.");
      return;
    }
    
    var source = params[0];
    var target = params[1];
    var text = params.slice(2).join(" ");
    
    if (!(source in languageCodeMappings)) {
      var validLanguageCodes = getValidLanguageCodes();
      replier.reply("올바르지 않은 소스 언어 코드입니다. [" + source + "]\n유효한 언어 코드: " + validLanguageCodes.join(", "));
      return;
    }
    
    if (!(target in languageCodeMappings)) {
      var validLanguageCodes = getValidLanguageCodes();
      replier.reply("올바르지 않은 타겟 언어 코드입니다. [" + target + "]\n유효한 언어 코드: " + validLanguageCodes.join(", "));
      return;
    }
    
    var translation = translateText(source, target, text);
    replier.reply("번역 결과\n" + translation);
  }
}
