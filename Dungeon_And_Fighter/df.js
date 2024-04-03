importPackage(org.jsoup);
const apiKey = "apiKey";
const serverList = {
    "카인":"cain",
    "디레지에":"diregie",
    "시로코":"siroco",
    "프레이":"prey",
    "카시야스":"casillas",
    "힐더":"hilder",
    "안톤":"anton",
    "바칼":"bakal",
    "전체":"all"
  };
  const allsee = "\u200b".repeat(500);
  let today = new Date();   
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let day = today.getDay();  // 요일

  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  let milliseconds = today.getMilliseconds(); // 밀리초
  
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName){
  
  if(msg=="!던파봇"){  
   var a = "---던파봇 사용법---\n\n"+allsee;
   var b = "!던파 서버 닉네임\n캐릭터를 검색하는 기능입니다.\n정보는 api와 던담에서 가져옵니다.\n\n";
   var c = "!장비 서버 닉네임\n착용하고 있는 장비를 출력해줍니다.\n\n";
   var d = "!w 지역\n날씨 검색입니다. 국내 지역만 가능합니다.\n\n";
   var f = "!톡 or !채팅기록\n본인의 톡 기록과 횟수를 확인합니다.\n\n";
   var g = "!중재자\n중재자 계산기입니다.\n!중재자 (현재 포인트) 치시면 계산결과가 나옵니다.\n예상 날짜까지 계산합니다.";
   
   replier.reply(a+b+c+d+f+g);   
    }
function serverId(server){
    try{
      var result = serverList[server];
      return result;
    }catch(e){
      replier.reply("서버 정보를 찾을 수 없습니다.");
    }
  }
        function characterId(server,characterName){
        try{
          //Server reset
          var sId= serverId(server);
          //character info url
          var characterURL = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+ sId + "/characters?characterName="+characterName+"&limit=<limit>&wordType=<wordType>&apikey="+apiKey).ignoreContentType(true).get().text());
          //API Parse
          var cId = characterURL["rows"][0]["characterId"];
          return cId;
        }
        catch(e){
        var responseCode = Jsoup.connect(characterURL).ignoreContentType(true).execute().statusCode();
          var eText="";
          if (responseCode==200){
            eText += "서버는 정상적인 응답을 했음.\n캐릭터 이름과 서버 확인바람.";
          }else if(responseCode==400){
            eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
          }else if(responseCode==401){
            eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
          }else if(responseCode==404){
            eText+="찾을 수 없음\n이름과 서버 확인 바람";
          }else if(responseCode==500){
            eText+="네오플 서버측 오류";
          }else if(responseCode==503){
            eText+="서버점검 중";
          }
          return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
        }
  }
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function searchItem(itemName) {
    try {
      var url = "https://api.neople.co.kr/df/auction?itemName=" + itemName + "&wordType=full&wordShort=true&limit=400&sort=unitPrice:asc&apikey=" + apiKey;
      var itemUrl = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());
  
      if (itemUrl && itemUrl.rows && itemUrl.rows.length > 0) {
        var result = "";
        var tcount=0
        //var maxResults = Math.min(itemUrl.rows.length,10);
        result+= "경매장 ["+itemName+"] 검색 결과\n"+allsee;
        for (var i = 0; i < itemUrl.rows.length; i++) {
    var infoI = itemUrl.rows[i];
    var countFormatted = formatNumber(infoI.count);
    var unitPriceFormatted = formatNumber(infoI.unitPrice);
    var currentPriceFormatted = formatNumber(infoI.currentPrice);
    
    if (infoI.upgrade != 0 && infoI.itemTypeDetail == "전문직업 재료") {
      result += "\n" + infoI.itemName + "\n업그레이드: " + infoI.upgrade + "단계\n총 " + countFormatted + "개 -> " + currentPriceFormatted + " 골드\n개당 " + unitPriceFormatted + " 골드\n";
      tcount += 1;
    } else if (infoI.reinforce != 0) {
      result += "\n+" + infoI.reinforce + " " + infoI.itemName + "\n총 " + countFormatted + "개 -> " + currentPriceFormatted + " 골드\n개당 " + unitPriceFormatted + " 골드\n";
      tcount += 1;
    } else {
      result += "\n" + infoI.itemName + "\n총 " + countFormatted + "개 -> " + currentPriceFormatted + " 골드\n개당 " + unitPriceFormatted + " 골드\n";
      tcount += 1;
    }
  }
  return result + "\n\n조회 결과: " + tcount + "개"; // 결과 반환
        
        return result+"\n\n조회 결과 : "+tcount+"개"; // 결과 반환
      } else {
        var responseCode = Jsoup.connect(url).ignoreContentType(true).execute().statusCode();
        var eText="";
        if (responseCode==200){
          eText += "서버는 정상적인 응답을 했음.\n아이템 이름 확인바람.";
        }else if(responseCode==400){
          eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
        }else if(responseCode==401){
          eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
        }else if(responseCode==404){
          eText+="찾을 수 없음\n이름 확인 바람";
        }else if(responseCode==500){
          eText+="네오플 서버측 오류";
        }else if(respinseCode==503){
          eText+="서버점검 중";
        }
        return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
      }
    } catch (e) {
      return e;
    }
  }
  
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
    //Input item name 
    if(msg.startsWith("!경매 ")){
    var it = msg.substr(4);
    var iii=searchItem(it);
    replier.reply(iii);
  }

  if (msg.startsWith("!중재자 ")) {
    var nowScore = parseInt(msg.substr(5).split(" ")[0]); // Adjusted substring start index and added parseInt to convert string to integer
    var maxScore = 1000000;
    if (nowScore > maxScore) {
        replier.reply("포인트는 100만을 넘길 수 없습니다.");
    } else if (nowScore == 0 || isNaN(nowScore)) { // Added isNaN check for invalid input
        replier.reply("값을 입력해주세요");
    } else {
        var remainScore = maxScore - nowScore;
        var nowRound = Math.round(nowScore/665)+1;
        var remainRound = Math.round(remainScore / 665);
        if (remainScore <= 332) remainRound += 1; // Adjusted condition for ternary operator
        var normalFatigue=remainRound*8;
        var normalMistCore=remainRound*48;
        var fatigue, mistCore;

        // Calculating fatigue and mistCore based on day of the week
        if (day === 0 || day === 6) {
            fatigue = 27 * 8; // Sunday or Saturday
            mistCore = 27 * 48;
        } else {
            fatigue = 25 * 8; // Weekdays
            mistCore = 25 * 48;
        }

        var scoreText = formatNumber(maxScore) + " / " + formatNumber(nowScore) + "\n";
        var roundText = "남은 포인트: " + formatNumber(remainScore) + "\n남은 판수/현재 판수 : " + formatNumber(remainRound) +" / "+nowRound+ "판\n피로도: " + formatNumber(normalFatigue) + "\n미스트코어: " + formatNumber(normalMistCore) + "개";
              // Calculating remaining days based on remainRound
        let daysToRecover = 0;
        while (remainRound > 0) {
            if (day === 0 || day === 6) {
                remainRound -= 26;
            } else {
                remainRound -= 24;
            }
            daysToRecover++;
        }

        let recoveryDate = new Date();
        recoveryDate.setDate(recoveryDate.getDate() + daysToRecover);

        let recoveryYear = recoveryDate.getFullYear();
        let recoveryMonth = recoveryDate.getMonth() + 1;
        let recoveryDay = recoveryDate.getDate();
        let recoveryDayOfWeek = recoveryDate.getDay();

        let dayOfWeekStr;
        switch (recoveryDayOfWeek) {
            case 0:
                dayOfWeekStr = "일요일";
                break;
            case 1:
                dayOfWeekStr = "월요일";
                break;
            case 2:
                dayOfWeekStr = "화요일";
                break;
            case 3:
                dayOfWeekStr = "수요일";
                break;
            case 4:
                dayOfWeekStr = "목요일";
                break;
            case 5:
                dayOfWeekStr = "금요일";
                break;
            case 6:
                dayOfWeekStr = "토요일";
                break;
        }
        replier.reply("--중재자 계산기--\n\n계산 요청자: " + sender + "\n\n" + scoreText + roundText+"\n남은 일수 : "+daysToRecover+" 일 남음\n예상 천장 날짜 : "+recoveryYear+"년 "+recoveryMonth + "월 " + recoveryDay + "일 " + dayOfWeekStr);
  
        }
}
  

// 숫자를 천 단위 구분 기호가 있는 문자열로 포맷




function formatDamage(num) {
    if (isNaN(num)) {
        return "측정 불가";
    }

    const trillion = 1e12;
    const billion = 1e8;

    const trillionPart = Math.floor(num / trillion);
    const billionPart = ((num % trillion) / billion).toFixed(2);

    if (trillionPart > 0) {
        return trillionPart + "조 " + billionPart + "억";
    } else {
        return billionPart + "억";
    }
}

function charWeapon(server,characterName){
    try{
      var seId=serverId(server);
      var cUrl=characterId(server,characterName);
      var weaponUrl=JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+seId+"/characters/"+cUrl+"/equip/equipment?apikey="+apiKey).ignoreContentType(true).get().text());
      var result = "";
      var length_1=weaponUrl["equipment"].length;
      //var length_2=weaponUrl["equipment"][2]["upgradeInfo"]["itemName"];
      result += server +" "+characterName+" 님의 장비 정보" + allsee + "\n\n";
      //Data input and return
      for(var i=0; i<length_1;i++){
        try{
          result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n+"+weaponUrl["equipment"][i]["reinforce"]+" "+weaponUrl["equipment"][i]["itemName"]+"\nㄴ"+weaponUrl["equipment"][i]["upgradeInfo"]["itemName"]+"\n";
        }catch(e){
        if(weaponUrl["equipment"][i]["slotName"]=="칭호"){
          result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n"+weaponUrl["equipment"][i]["itemName"]+"\n";
        }else{
        result+="\n"+weaponUrl["equipment"][i]["slotName"]+"\n+"+weaponUrl["equipment"][i]["reinforce"]+" "+weaponUrl["equipment"][i]["itemName"]+"\n";
      }
      }
      
      }
      var petUrl = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+seId+"/characters/"+cUrl+"/equip/creature?apikey="+apiKey).ignoreContentType(true).get().text());
      try{
      result += "\n크리쳐\n"+petUrl["creature"]["itemName"]+"\n";
      }catch(e){
        result+="\n크리쳐\n없음";
      }
      
      return result;
      
    }catch(e){
      var responseCode = Jsoup.connect(weaponUrl).ignoreContentType(true).execute().statusCode();
      var eText="";
      if (responseCode==200){
        eText += "서버는 정상적인 응답을 했음.\n캐릭터 이름과 서버 확인바람.";
      }else if(responseCode==400){
        eText+="요청에 대한 유효성 검증 실패 또는 필수 파라미터 에러.\n코드 충돌. 개발자에게 문의\n개발자 : [Name_Less]";
      }else if(responseCode==401){
        eText+="인증 오류.\n개발자에게 API키 확인 문의\n개발자 : [Name_Less]";
      }else if(responseCode==404){
        eText+="찾을 수 없음\n캐릭터 이름과 서버 확인 바람";
      }else if(responseCode==500){
        eText+="네오플 서버측 오류";
      }else if(respinseCode==503){
        eText+="서버점검 중";
      }
      return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
    } 
  }

//Input Server and Character Name
if(msg.startsWith("!장비 ")){
  var server=msg.substr(4).split(" ")[0];
  var server_Id=serverId(server);
  var characterName=msg.substr(4).split(" ")[1];
  var we=charWeapon(server, characterName);
  replier.reply(we);
}
    if (msg.startsWith("!던파 ")) {
        var server = msg.substr(4).split(" ")[0];
        var server_Id = serverId(server);
        var characterName = msg.substr(4).split(" ")[1];
        var character_Id = characterId(server, characterName);

        try {
            var characterInfoUrl = "https://api.neople.co.kr/df/servers/" + server_Id + "/characters/" + character_Id + "?apikey=" + apiKey;
            var characterInfoResponse = Jsoup.connect(characterInfoUrl).ignoreContentType(true).get().text();
            var characterInfo = JSON.parse(characterInfoResponse);

            var guildName = characterInfo.guildName || "길드 없음";
            var adventureName = characterInfo.adventureName || "모험단 없음";
            var jobName = characterInfo.jobName;
            var jobGrow = characterInfo.jobGrowName;
            var url = "https://dundam.xyz/dat/viewData.jsp?image=" + character_Id + "&server=" + server_Id;
            var response = Jsoup.connect(url)
                .ignoreHttpErrors(true)
                .ignoreContentType(true)
                .post();
            
            var json = JSON.parse(response.text());
            
            var defaultInfo =   "[ " + characterName + " ] 님의 정보\n"+
                "\n명성 : " + formatNumber(parseInt(json.fame)) +
                "\n모험단 : " + adventureName +
                "\n길드 : " + guildName +
                "\n직업 : [" + jobGrow.split(" ")[0]+"] "+jobGrow.split(" ")[1] +" / "+jobName
  
            
            if("bufferRankingAll" in json){
              var buffScoreItem = json.buffCal.find(e => e.hasOwnProperty('buffScore'));
              var buffScore = buffScoreItem ? buffScoreItem.buffScore : null;
              var buffScore4PItem = json.buffCal.find(e => e.hasOwnProperty('4PBuffScore'));
              var buffScore4P = buffScore4PItem ? buffScore4PItem['4PBuffScore'] : null;
              
              replier.reply(defaultInfo+
              "\n순위 : " + formatNumber(parseInt(json.bufferRanking))+" 위 / " + formatNumber(parseInt(json.bufferRankingAll))+"명 (상위 "+(Math.round((parseInt(json.bufferRanking) / parseInt(json.bufferRankingAll))*10000)/100).toFixed(2)+"%)" +
              "\n\n종합 버프력 : " + buffScore +"점"+
              "\n\n 30Lv 점수 : " + buffScore4P + "점"
              );
            }else{
            var dragonDmg = json.damageList.vsDragons.find(e => e.name === "총 합").dam;
            var rankDamage = json.damageList.vsRanking.find(e => e.name === "총 합").dam;
            var gbDmg = json.damageList.vsGB.find(e => e.name === "총 합").dam;
            var goldDmg = json.damageList.vsSendbag.find(e => e.name === "총 합").dam;
            var numericRankDamage = parseFloat(rankDamage.replace(/,/g, ''));
            var numericDragonDamge = parseFloat(dragonDmg.replace(/,/g, ''));
            var numericGbDamage = parseFloat(gbDmg.replace(/,/g, ''));
            var numericGoldDamage = parseFloat(goldDmg.replace(/,/g, ''));
            replier.reply(defaultInfo
               +
                "\n순위 : " +formatNumber(parseInt(json.dealerRanking))+" 위 / "+formatNumber(parseInt(json.dealerRankingAll))+ " 명 (상위 "+(Math.round((parseInt(json.dealerRanking) / parseInt(json.dealerRankingAll)) * 10000) / 100).toFixed(2) + "%)"+
                
                "\n\n랭킹 딜 : " + formatNumber(rankDamage) + " (" + formatDamage(numericRankDamage) + ")" +
                "\n\n바칼 딜 : " + dragonDmg + " (" + formatDamage(numericDragonDamge) + ")" +
                "\n\n차원회랑 딜 : " + gbDmg + " (" + formatDamage(numericGbDamage) + ")" +
                "\n\n금룡(샌드백) 딜 : " + goldDmg + " (" + formatDamage(numericGoldDamage) + ")"
            );
            }
        } catch (e) {
            replier.reply("캐릭터 정보를 불러오는 중 오류가 발생했습니다."+e);
            Log.error(e);
        }
    }
}
