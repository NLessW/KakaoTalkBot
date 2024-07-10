importPackage(org.jsoup);
const apiKey = "YOUR_API_KEY";
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
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let hours = today.getHours(); // 시
let minutes = today.getMinutes(); // 분
let seconds = today.getSeconds(); // 초
let milliseconds = today.getMilliseconds(); // 밀리초

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName){

    if(msg=="!던파봇"){
        var a = "---던파봇 사용법---\n\n"+allsee;
        var b = "!던파 서버 닉네임\n캐릭터를 검색하는 기능입니다.\n정보는 api와 던담에서 가져옵니다.\n\n";
        var c = "!장비 서버 닉네임\n착용하고 있는 장비를 출력해줍니다.\n\n";
        var d = "!w 지역\n날씨 검색입니다. 국내 지역만 가능합니다.\n\n";
        var f = "!톡 or !채팅기록\n본인의 톡 기록과 횟수를 확인합니다.\n\n";
        var g = "!중재자 or !서고\n중재자와 서고 계산기입니다.\n!중재자 (현재 포인트) or !서고 (현재 포인트) 치시면 계산결과가 나옵니다.\n예상 날짜까지 계산합니다.\n\n";
        var h = "!경매\n경매장 검색 기능입니다.\n!경매 아이템이름 으로 사용하시면 나옵니다\napi 기술적 한계로 단어 검색이다 보니 단어가 들어간 아이템이 전부 출력됩니다..\n\n";
        var k = "!모험단 모험단이름 or !모험단삭제 캐릭터닉네임\n던파봇에서 검색된 캐릭터들 중 같은 모험단끼리 묶어서 보여줍니다.\n자동갱신은 되지않고 재검색시 변동된 데이터가 있을시 갱신합니다.\n모험단 삭제는 선택한 모험단의 캐릭터를 삭제하여 더이상 모험단 검색에 출력이 되지않습니다.\n추후 재검색시 재등장합니다.";
        replier.reply(a+b+c+d+f+g+h+k);
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
            var sId= serverId(server);
            var characterURL = JSON.parse(Jsoup.connect("https://api.neople.co.kr/df/servers/"+ sId + "/characters?characterName="+characterName+"&limit=<limit>&wordType=<wordType>&apikey="+apiKey).ignoreContentType(true).get().text());
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
            var url = "https://api.neople.co.kr/df/auction?itemName=" + itemName + "&wordType=<wordType>&wordShort=true&limit=400&sort=unitPrice:asc&apikey=" + apiKey;
            var itemUrl = JSON.parse(Jsoup.connect(url).ignoreContentType(true).get().text());
            if (itemUrl && itemUrl.rows && itemUrl.rows.length > 0) {
                var result = "";
                var tcount=0;
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
                return result + "\n\n조회 결과: " + tcount + "개";
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
                }else if(responseCode==503){
                    eText+="서버점검 중";
                }
                return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
            }
        } catch (e) {
            return "찾을 수 없습니다. (HTTP 오류 코드: " + responseCode + ")\n오류 코드 정보 : "+eText;
        }
    }

    if(msg.startsWith("!경매 ")){
        var it = msg.substr(4);
        var iii=searchItem(it);
        replier.reply(iii);
    }

    if (msg.startsWith("!중재자 ")) {
        var nowScore = parseInt(msg.substr(5).split(" ")[0]);
        var maxScore = 1000000;
        if (nowScore > maxScore) {
            replier.reply("포인트는 100만을 넘길 수 없습니다.");
        } else if (nowScore == 0 || isNaN(nowScore)) {
            replier.reply("값을 입력해주세요");
        } else {
            var remainScore = maxScore - nowScore;
            var nowRound = Math.round(nowScore/1000);
            var remainRound = Math.round(remainScore / 1000);
            if (remainScore <= 500) remainRound += 1;
            var normalFatigue=remainRound*12;
            var normalMistCore=remainRound*72;
            var fatigue, mistCore;
            
            if (day === 0 || day === 6) {
                fatigue = 18 * 12; 
                mistCore = 18 * 72;
            } else {
                fatigue = 16 * 12; 
                mistCore = 16 * 72;
            }
            var scoreText = formatNumber(maxScore) + " / " + formatNumber(nowScore) + "\n";
            var roundText = "남은 포인트: " + formatNumber(remainScore) + "\n남은 판수/현재 판수 : " + formatNumber(remainRound) +" / "+nowRound+ "판\n피로도: " + formatNumber(normalFatigue) + "\n미스트코어: " + formatNumber(normalMistCore) + "개";
            let daysToRecover = 0;
            while (remainRound > 0) {
                if (day === 0 || day === 6) {
                    remainRound -= 18;
                } else {
                    remainRound -= 16;
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


    if (msg.startsWith("!서고 ")) {
        var nowScore = parseInt(msg.substr(4).split(" ")[0]);
        var maxScore = 1000000;
        if (nowScore > maxScore) {
            replier.reply("포인트는 100만을 넘길 수 없습니다.");
        } else if (nowScore == 0 || isNaN(nowScore)) {
            replier.reply("값을 입력해주세요");
        } else {
            var remainScore = maxScore - nowScore;
            var nowRound = Math.round(nowScore/665);
            var remainRound = Math.round(remainScore / 665);
            if (remainScore <= 332) remainRound += 1;
            var normalFatigue=remainRound*8;
            var normalKey=remainRound*23;
            var fatigue, rememberKey;
            if (day === 0 || day === 6) {
                fatigue = 27 * 8; 
                rememberKey = 27 * 23;
            } else {
                fatigue = 25 * 8; 
                rememberKey = 25 * 23;
            }
            var scoreText = formatNumber(maxScore) + " / " + formatNumber(nowScore) + "\n";
            var roundText = "남은 포인트: " + formatNumber(remainScore) + "\n남은 판수/현재 판수 : " + formatNumber(remainRound) +" / "+nowRound+ "판\n피로도: " + formatNumber(normalFatigue) + "\n단편의 기억: " + formatNumber(normalKey) + "개";
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
            replier.reply("--서고 계산기--\n\n계산 요청자: " + sender + "\n\n" + scoreText + roundText+"\n남은 일수 : "+daysToRecover+" 일 남음\n예상 천장 날짜 : "+recoveryYear+"년 "+recoveryMonth + "월 " + recoveryDay + "일 " + dayOfWeekStr);
        }
    }

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
            result += server +" "+characterName+" 님의 장비 정보" + allsee + "\n\n";
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
            var defaultInfo = "";
            if ("bufferRankingAll" in json) {
                var buffScoreItem = json.buffCal.find(e => e.hasOwnProperty('buffScore'));
                var buffScore = buffScoreItem ? buffScoreItem.buffScore : null;
                var buffScore30LvItem = json.buffCal.find(e => e.hasOwnProperty('30LvBuffScore'));
                var buffScore3PItem = json.buffCal.find(e => e.hasOwnProperty('3PBuffScore'));
                var buffScore4PItem = json.buffCal.find(e => e.hasOwnProperty('4PBuffScore'));
                
                defaultInfo += "[ " + characterName + " ] 님의 정보\n" +
                "\n종합 버프력 : " + buffScore + "점";
                
                if (buffScore30LvItem) {
                    defaultInfo += "\n30Lv 점수 : " + buffScore30LvItem['30LvBuffScore'] + "점";
                } else if (buffScore3PItem && buffScore4PItem) {
                    defaultInfo += "\n3인 점수 : " + buffScore3PItem['3PBuffScore'] + "점" +
                                   "\n4인 점수 : " + buffScore4PItem['4PBuffScore'] + "점";
                }
                
                defaultInfo += allsee;
                
                if (buffScore !== null) {
                    var dataToAdd = {
                        characterName: characterName,
                        guildName: guildName,
                        jobName: jobName,
                        jobGrow: jobGrow,
                        fame: formatNumber(parseInt(json.fame)),
                        buffScore: buffScore
                    };
                    saveData(adventureName, dataToAdd);
                }
            } else {
                var dragonDmg = json.damageList.vsDragons.find(e => e.name === "총 합").dam;
                var rankDamage = json.damageList.vsRanking.find(e => e.name === "총 합").dam;
                var gbDmg = json.damageList.vsGB.find(e => e.name === "총 합").dam;
                var goldDmg = json.damageList.vsSendbag.find(e => e.name === "총 합").dam;
                var numericRankDamage = parseFloat(rankDamage.replace(/,/g, ''));
                var numericDragonDamge = parseFloat(dragonDmg.replace(/,/g, ''));
                var numericGbDamage = parseFloat(gbDmg.replace(/,/g, ''));
                var numericGoldDamage = parseFloat(goldDmg.replace(/,/g, ''));
                defaultInfo += "[ " + characterName + " ] 님의 정보\n" +
                "\n직업 : [" + jobGrow.split(" ")[0] + "] " + jobGrow.split(" ")[1] + " / " + jobName+
                "\n순위 : " + formatNumber(parseInt(json.dealerRanking)) + " 위 / " + formatNumber(parseInt(json.dealerRankingAll)) + " 명 (상위 " + (Math.round((parseInt(json.dealerRanking) / parseInt(json.dealerRankingAll)) * 10000) / 100).toFixed(2) + "%)" +
                "\n\n랭킹 딜 : " + formatNumber(rankDamage) + " (" + formatDamage(numericRankDamage) + ")" +
                "\n\n금룡(샌드백) 딜 : " + goldDmg + " (" + formatDamage(numericGoldDamage) + ")"+
                "\n\n25초 딜 : "+formatNumber(gbDmg)+" ("+formatDamage(numericGbDamage)+")"+
                "\n\n40초 딜 : "+formatNumber(dragonDmg) +" ("+formatDamage(numericDragonDamge)+")"+allsee;
                var dataToAdd = {
                    characterName: characterName,
                    guildName: guildName,
                    jobName: jobName,
                    jobGrow: jobGrow,
                    fame: formatNumber(parseInt(json.fame)),
                    rankDamage: formatDamage(numericRankDamage),
                    goldDmg: goldDmg,
                    gbDmg: gbDmg,
                    dragonDmg: dragonDmg
                };
                saveData(adventureName, dataToAdd);
            }

            defaultInfo += "\n\n명성 : " + formatNumber(parseInt(json.fame)) +
                "\n모험단 : " + adventureName +
                "\n길드 : " + guildName +
                "\n직업 : [" + jobGrow.split(" ")[0] + "] " + jobGrow.split(" ")[1] + " / " + jobName;

            replier.reply(defaultInfo);
        } catch (e) {
            replier.reply("캐릭터 정보를 불러오는 중 오류가 발생했습니다." + e);
            Log.error(e);
        }
    }

    function saveData(adventureName, dataToAdd) {
        var filePath = "/storage/emulated/0/botdata/dfBotData/userAdvInfo.json";
        var file = new java.io.File(filePath);
        var fileReader = new java.io.FileReader(file);
        var bufferedReader = new java.io.BufferedReader(fileReader);
        var existingData = "";
        var line = "";
        while ((line = bufferedReader.readLine()) != null) {
            existingData += line + "\n";
        }
        var existingDataObj;
        try {
            existingDataObj = JSON.parse(existingData);
        } catch (e) {
            existingDataObj = {};
        }
        if (existingDataObj.hasOwnProperty(adventureName)) {
            var existingCharacters = existingDataObj[adventureName];
            var isCharacterExist = false;
            for (var i = 0; i < existingCharacters.length; i++) {
                if (existingCharacters[i].characterName === dataToAdd.characterName) {
                    existingCharacters[i] = dataToAdd;
                    isCharacterExist = true;
                    break;
                }
            }
            if (!isCharacterExist) {
                existingDataObj[adventureName].push(dataToAdd);
            }
        } else {
            existingDataObj[adventureName] = [dataToAdd];
        }

        var fileOutputStream = new java.io.FileOutputStream(file);
        var writer = new java.io.FileWriter(fileOutputStream.getFD());
        writer.write(JSON.stringify(existingDataObj));
        writer.close();
        fileOutputStream.close();
    }
    if (msg.startsWith("!모험단 ")) {
        var adventureName = msg.substr(5);
        var filePath = "/storage/emulated/0/botdata/dfBotData/userAdvInfo.json";
        var file = new java.io.File(filePath);
        if (!file.exists()) {
            replier.reply("저장된 모험단 정보가 없습니다.");
            return;
        }

        var fileReader = new java.io.FileReader(file);
        var bufferedReader = new java.io.BufferedReader(fileReader);
        var existingData = "";
        var line = "";
        while ((line = bufferedReader.readLine()) != null) {
            existingData += line + "\n";
        }
        var existingDataObj;
        try {
            existingDataObj = JSON.parse(existingData);
        } catch (e) {
            replier.reply("저장된 모험단 정보를 읽어오는 중 오류가 발생했습니다.");
            Log.error(e);
            return;
        }
        var adventureInfo = existingDataObj[adventureName];
        if (!adventureInfo) {
            replier.reply("해당 모험단의 정보가 없습니다.");
            return;
        }
        var replyMsg = "모험단 [" + adventureName + "]\n\n";
        replyMsg+="조회된 캐릭터 : "+adventureInfo.length+"개\n\n"+allsee;
        for (var i = 0; i < adventureInfo.length; i++) {
            var characterInfo = adventureInfo[i];
            
            if ("buffScore" in characterInfo) {
                replyMsg += "[" + characterInfo.characterName + "]\n명성 : "+characterInfo.fame+"\n직업 : "+characterInfo.jobGrow+" / "+characterInfo.jobName+"\n버프점수 : " + characterInfo.buffScore + "\n\n";
            } else {
                replyMsg += "[" + characterInfo.characterName + "]\n명성 : "+characterInfo.fame+"\n직업 : "+characterInfo.jobGrow+" / "+characterInfo.jobName+"\n랭킹딜 : " + characterInfo.rankDamage + "\n\n";
            }
        }
        replier.reply(replyMsg);
    }

    if (msg.startsWith("!모험단삭제 ")) {
        var characterNameToDelete = msg.substr(7);

        try {
            var deletedCharacterData = deleteDataByCharacterName(characterNameToDelete);
            
            if (deletedCharacterData) {
                replier.reply(characterNameToDelete + "님의 캐릭터 데이터가 성공적으로 삭제되었습니다.");
            } else {
                replier.reply(characterNameToDelete + "님의 캐릭터 데이터를 찾을 수 없습니다.");
            }
        } catch (e) {
            replier.reply("캐릭터 데이터 삭제 중 오류가 발생했습니다." + e);
            Log.error(e);
        }
    }
    function deleteDataByCharacterName(characterName) {
        var filePath = "/storage/emulated/0/botdata/dfBotData/userAdvInfo.json";
        var file = new java.io.File(filePath);
        
        if (!file.exists()) {
            return null;
        }

        var fileReader = new java.io.FileReader(file);
        var bufferedReader = new java.io.BufferedReader(fileReader);
        var existingData = "";
        var line = "";
        while ((line = bufferedReader.readLine()) != null) {
            existingData += line + "\n";
        }
        var existingDataObj;
        try {
            existingDataObj = JSON.parse(existingData);
        } catch (e) {
            return null;
        }
        for (var adventureName in existingDataObj) {
            if (existingDataObj.hasOwnProperty(adventureName)) {
                var adventureCharacters = existingDataObj[adventureName];
                for (var i = 0; i < adventureCharacters.length; i++) {
                    if (adventureCharacters[i].characterName === characterName) {
                        adventureCharacters.splice(i, 1);
                        var fileWriter = new java.io.FileWriter(file);
                        fileWriter.write(JSON.stringify(existingDataObj));
                        fileWriter.close();
                        return true;
                    }
                }
            }
        }
        return null;
    }
}
