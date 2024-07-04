const Stone = '⬜';
const P_Stone = '⚫';
const B_Stone = '✖';
const path = "Your_Path";
const allsee = "\u200b".repeat(500);

let T3 = {
    'Start': false,
    'Player': null,
    'Turn': null,
    'Board': Array(3).fill().map(_ => Array(3).fill(Stone)),
    'Difficulty': 1,
    'TurnCount': 0
};
function Combine(Board) {
    return Board.map(row => row.join('')).join('\n');
}

function loadUserInfo() {
    let file = new java.io.File(path);
    if (!file.exists()) {
        file.getParentFile().mkdirs();
        return {};
    }
    try {
        let content = FileStream.read(path);
        return content ? JSON.parse(content) : {};
    } catch (e) {
        Log.e("Error loading user info: " + e);
        return {};
    }
}

function getRoomRanking(room) {
    let userInfo = loadUserInfo();
    if (!userInfo[room]) return [];
    
    let ranking = [];
    for (let uid in userInfo[room]) {
        if (userInfo[room].hasOwnProperty(uid)) {
            let userData = userInfo[room][uid];
            ranking.push({
                name: userData.name,
                total: userData.total,
                lastResult: userData.win > userData.lost ? "승리" : (userData.lost > userData.win ? "패배" : "무승부")
            });
        }
    }
    
    ranking.sort(function(a, b) {
        return b.total - a.total;
    });
    return ranking;
}
// 사용자 정보를 저장하는 함수
function saveUserInfo(userInfo) {
    let file = new java.io.File(path);
    let write = new java.io.FileWriter(file);
    write.write(JSON.stringify(userInfo));
    write.close();
}

// 사용자 정보를 업데이트하는 함수
function updateUserInfo(room, uid, sender, result, score) {
    let userInfo = loadUserInfo();
    if (!userInfo[room]) {
        userInfo[room] = {};
    }
    if (!userInfo[room][uid]) {
        userInfo[room][uid] = {
            name: sender,
            total: 0,
            win: 0,
            lost: 0,
            draw: 0
        };
    }
    userInfo[room][uid].total += score;
    if (result === 'win') userInfo[room][uid].win++;
    else if (result === 'lost') userInfo[room][uid].lost++;
    else if (result === 'draw') userInfo[room][uid].draw++;
    saveUserInfo(userInfo);
}
function botMove() {
    // 승리 기회 확인
    let winMove = findWinningMove(B_Stone);
    if (winMove) return winMove;

    // 방어
    let blockMove = findWinningMove(P_Stone);
    if (blockMove) return blockMove;

    // 중앙 선점
    if (T3.Board[1][1] === Stone) return [1, 1];

    // 코너 선점
    let corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
    let emptyCorners = corners.filter(([x, y]) => T3.Board[y][x] === Stone);
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }

    // 남은 빈 칸에 무작위로 배치
    return randomMove();
}
function findWinningMove(stone) {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (T3.Board[y][x] === Stone) {
                T3.Board[y][x] = stone;
                if (CheckWinner() === (stone === P_Stone ? 'P' : 'B')) {
                    T3.Board[y][x] = Stone;
                    return [x, y];
                }
                T3.Board[y][x] = Stone;
            }
        }
    }
    return null;
}


function CheckWinner() {
    const Lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]]
    ];

    for (let line of Lines) {
        let [a, b, c] = line;
        if (T3.Board[a[1]][a[0]] !== Stone &&
            T3.Board[a[1]][a[0]] === T3.Board[b[1]][b[0]] &&
            T3.Board[a[1]][a[0]] === T3.Board[c[1]][c[0]]) {
            return T3.Board[a[1]][a[0]] === P_Stone ? 'P' : 'B';
        }
    }
    
    // 무승부 확인: 모든 칸이 채워졌는지 확인
    if (T3.Board.every(row => row.every(cell => cell !== Stone))) {
        return 'D';
    }
    
    return null; // 승부가 나지 않았고, 아직 빈 칸이 있는 경우
}

function Reset() {
    T3 = {
        'Start': false,
        'Player': null,
        'Turn': null,
        'Board': Array(3).fill().map(_ => Array(3).fill(Stone)),
        'Difficulty': 1,
        'TurnCount': 0
    };
}
function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId, uid) {
    if (msg.startsWith('!틱택토')) {
        let input = msg.substring(4).trim();
        switch (input) {
            case '':
                replier.reply([
                    '[ 틱택토 도움말 ]',
                    '• !틱택토 시작 [난이도(1-3)]',
                    '• !틱택토 종료',
                    '• !틱택토 순위'
                ].join('\n'));
                break;
            case '시작 1':
            case '시작 2':
            case '시작 3':
                if (T3.Start) { replier.reply('• 게임이 이미 진행 중입니다. ' + T3.Player + ' 님이 게임을 진행 중입니다.');
                return;
                }
                T3.Start = true;
                T3.Player = sender;
                T3.Turn = 'PB'[Math.random() * 2 | 0];
                T3.Difficulty = parseInt(input.split(' ')[1]);
                T3.TurnCount = 0;
                replier.reply('• 난이도 ' + T3.Difficulty + '로 게임을 시작합니다.\n• ' + (T3.Turn == 'P' ? sender : 'Bot') + ' 님의 차례입니다!\n!(숫자) 형식으로 입력해 주세요.');
                if (T3.Turn == 'B') {
                    botTurn(replier, room, uid);
                }
                break;
            case '종료':
                if (T3.Player != sender) return;
                if (!T3.Start) {
                    replier.reply('• 게임이 이미 종료되었습니다.');
                    return;
                }
                Reset();
                replier.reply('• 게임이 종료되었습니다.');
                break;
                case '순위':
                    let ranking = getRoomRanking(room);
                    if (ranking.length === 0) {
                        replier.reply('• 이 방에는 아직 게임 기록이 없습니다.');
                    } else {
                        let replyMsg = "[" + room + "] 방의 틱택토 순위"+allsee+"\n\n";
                        ranking.forEach((rank, index) => {
                            let medal = "";
                            if (index === 0) medal = "🥇 ";
                            else if (index === 1) medal = "🥈 ";
                            else if (index === 2) medal = "🥉 ";
                            
                            replyMsg += medal + (index + 1) + "위 " + rank.name + " / 총 " + rank.total + " 점\n";
                            replyMsg += "마지막 게임 결과 : " + rank.lastResult + "\n\n";
                        });
                        replier.reply(replyMsg);
                    }
                    break;
            default:
                replier.reply('• 잘못된 명령어 입니다.');
        }
    } else if (msg === '!myinfo') {
        try {
            let roomInfo = loadUserInfo()[room];
            if (roomInfo && roomInfo[uid]) {
                let userInfo = roomInfo[uid];
                replier.reply([
                    '[ ' + sender + '님의 틱택토 전적 ]',
                    '• 총 승점: ' + userInfo.total,
                    '• 전적: ' + userInfo.win + '승 ' + userInfo.lost + '패 ' + userInfo.draw + '무'
                ].join('\n'));
            } else {
                replier.reply('• 이 방에서의 게임 기록이 없습니다.');
            }
        } catch (e) {
            replier.reply('• 사용자 정보를 불러오는 중 오류가 발생했습니다.');
            Log.e("Error in !myinfo: " + e);
        }
    } else if (T3.Start && T3.Turn == 'P') {
        if (msg[0] != '!' || msg[2])
        return;
        let coor = Number(msg[1]);
        if (sender !== T3.Player) {
        replier.reply('• ' + T3.Player + ' 님이 게임을 진행 중입니다. 다른 플레이어는 참여할 수 없습니다.');
        return;
        }
        if (isNaN(coor) || coor < 1 || coor > 9) {
          replier.reply('• 잘못된 좌표 형식입니다.');
          return;
        }
        let x = coor <= 3 ? coor : (coor <= 6 ? coor - 3 : coor - 6);
        let y = coor <= 3 ? 1 : (coor <= 6 ? 2 : 3);
        if (T3.Board[y-1][x-1] != Stone) {
            replier.reply('• 이미 돌이 놓여져 있습니다.');
            return;
        }
        T3.Board[y-1][x-1] = P_Stone;
        T3.TurnCount++;
        replier.reply(Combine(T3.Board));
        let Result = CheckWinner();
        if (Result) {
            if (Result == 'P' || Result == 'B') {
                let scoreResult = calculateScore(Result == 'P', T3.Difficulty, T3.TurnCount);
                updateUserInfo(room, uid, sender, Result == 'P' ? 'win' : 'lost', scoreResult.score);
                replier.reply('• ' + (Result == 'P' ? T3.Player : 'Bot') + ' 님의 승리입니다!\n• 총 턴 수: ' + Math.round(T3.TurnCount/2) + '\n• ' + scoreResult.explanation + '\n• 획득 승점: ' + scoreResult.score);
            } else if (Result == 'D') {
                let score = T3.Difficulty;
                updateUserInfo(room, uid, sender, 'draw', score);
                replier.reply('• 무승부 입니다!\n• 획득 승점: ' + score);
            }
            Reset();
            return;
        }
        replier.reply('• Bot의 차례입니다.');
        botTurn(replier, room, uid);
    }
}
function botTurn(replier, room, uid) {
    let move;
    if (T3.Difficulty === 1) {
        move = randomMove();
    } else if (T3.Difficulty === 2) {
        move = Math.random() < 0.7 ? botMove() : randomMove();
    } else {
        move = botMove();
    }
    T3.Board[move[1]][move[0]] = B_Stone;
    T3.TurnCount++;
    replier.reply(Combine(T3.Board));
    let Result = CheckWinner();
    if (Result) {
        if (Result == 'P' || Result == 'B') {
            let scoreResult = calculateScore(Result == 'P', T3.Difficulty, Math.round(T3.TurnCount/2));
            updateUserInfo(room, uid, T3.Player, Result == 'P' ? 'win' : 'lost', scoreResult.score);
            replier.reply('• ' + (Result == 'P' ? T3.Player : 'Bot') + ' 님의 승리입니다!\n• 총 턴 수: ' + Math.round(T3.TurnCount/2) + '\n• ' + scoreResult.explanation + '\n• 획득 승점: ' + scoreResult.score);
        } else if (Result == 'D') {
            let score = T3.Difficulty;
            updateUserInfo(room, uid, T3.Player, 'draw', score);
            replier.reply('• 무승부 입니다!\n• 획득 승점: ' + score);
        }
        Reset();
        return;
    }
    T3.Turn = 'P';
    replier.reply('• ' + T3.Player + ' 님의 차례입니다.');
}

function calculateScore(isWin, difficulty, turnCount) {
    let baseScore = difficulty * 10;
    let finalScore;
    let explanation;
    if (isWin) {
        finalScore = Math.max(1, Math.round(baseScore - Math.round(turnCount/2)));  // 최소 1점 보장
        explanation = `기본 승점: `+baseScore+`점 - 총 턴 수: `+Math.round(turnCount/2)+` = `+finalScore+`점`;
    } else {
        finalScore = -1 * (4 - difficulty);
        explanation = `패배 점수: `+finalScore+`점`;
    }

    return {
        score: finalScore,
        explanation: explanation
    };
}

function randomMove() {
    let emptySpots = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (T3.Board[y][x] === Stone) emptySpots.push([x, y]);
        }
    }
    return emptySpots[Math.floor(Math.random() * emptySpots.length)];
}
function onNotificationPosted(sbn, sm) {
    var packageName = sbn.getPackageName();
    if (!packageName.startsWith("com.kakao.tal"))
        return;
    var actions = sbn.getNotification().actions;
    if (actions == null) return;
    var userId = sbn.getUser().hashCode();
    for (var n = 0; n < actions.length; n++) {
        var action = actions[n];
        if (action.getRemoteInputs() == null)
            continue;
        var bundle = sbn.getNotification().extras;
        var msg = bundle.get("android.text").toString();
        var sender = bundle.getString("android.title");
        var room = bundle.getString("android.subText");
        var uid = bundle.getParcelableArray("android.messages")[0].get("sender_person").getKey();
        if (room == null)
            room = bundle.getString("android.summaryText");
        var isGroupChat = room != null;
        if (room == null) room = sender;
        var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
        var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
        var image = bundle.getBundle("android.wearable.EXTENSIONS");
        if (image != null) image = image.getParcelable("background");
        var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
        com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
        if (this.hasOwnProperty("responseFix")) {
            responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0, uid);
        }
    }
}
                
