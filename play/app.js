const SIZE = 9;
const BOX = 3;
const EMPTY = 0;
const CELL_COUNT = SIZE * SIZE;
const MAX_LIVES = 3;
const DIFFICULTIES = {
  easy: { blanks: 42, itemCount: 7 },
  normal: { blanks: 52, itemCount: 9 },
  hard: { blanks: 62, itemCount: 11 },
  veryHard: { blanks: 81, itemCount: 12 },
  extreme: { blanks: 81, itemCount: 12, loose: true },
};
const ADVENTURE_STAGES = {
  rogueRun: { difficulty: "hard", itemMode: "rogueRun", itemCount: 12, timeLimitMs: 300000, stages: 5 },
  hintRain: { difficulty: "normal", itemMode: "allHint", timeLimitMs: 120000 },
  heartRush: { difficulty: "hard", itemMode: "allHeart", timeLimitMs: 180000 },
  growingMines: { difficulty: "hard", itemMode: "growingMines", initialMines: 8, mineIntervalMs: 10000 },
  blind: { difficulty: "normal", itemMode: "blind", itemCount: 12, timeLimitMs: 300000 },
  mineSearch: { difficulty: "normal", itemMode: "mineSearch", mineCount: 12, hintCount: 4 },
  heartbeat: { difficulty: "hard", itemMode: "heartbeat", itemCount: 16, heartDeadlineMs: 30000, heartBoostMs: 22000 },
  shiftingCages: { difficulty: "hard", itemMode: "shiftingCages", itemCount: 8, cageShiftEvery: 5, timeLimitMs: 240000 },
  patrol: { difficulty: "hard", itemMode: "patrol", itemCount: 10, timeLimitMs: 240000 },
  bomber: { difficulty: "hard", itemMode: "bomber", itemCount: 10, timeLimitMs: 300000, bomberLimit: 4 },
  cageEater: { difficulty: "hard", itemMode: "cageEater", itemCount: 10, timeLimitMs: 300000, eaterLimit: 4 },
  numberClimb: { difficulty: "hard", itemMode: "numberClimb", itemCount: 10, timeLimitMs: 300000 },
  sleeper: { difficulty: "hard", itemMode: "sleeper", itemCount: 10, timeLimitMs: 300000, sleeperBlockTurns: 3 },
  jammer: { difficulty: "hard", itemMode: "jammer", itemCount: 10, jammerCount: 4, timeLimitMs: 300000 },
  chaser: { difficulty: "hard", itemMode: "chaser", itemCount: 10, timeLimitMs: 300000, chaserIntervalMs: 2500, chaserStunMs: 5000 },
  striker: { difficulty: "hard", itemMode: "striker", itemCount: 10, timeLimitMs: 300000, strikerIntervalMs: 850, strikerStunMs: 3500 },
  lightning: { difficulty: "hard", itemMode: "lightning", itemCount: 10, timeLimitMs: 300000, lightningIntervalMs: 3200, lightningWarnMs: 1400, lightningDangerMs: 360, lightningStrikeMs: 520 },
};
const PATROL_GUARDIAN_COUNT = 2;
const SLEEPER_COUNT = 3;
const NUMBER_CLIMB_FREE_INPUT_MS = 5000;
const ITEM_TYPES = ["mine", "heart", "hint", "shuffle"];
const LOCALE = (navigator.language || "").toLowerCase().startsWith("ja") ? "ja" : "en";
const TEXT = {
  ja: {
    difficulty: { easy: "イージー", normal: "ノーマル", hard: "ハード", veryHard: "ベリーハード", extreme: "エクストリーム" },
    difficultyHelp: { easy: "数字多め", normal: "標準", hard: "数字少なめ", veryHard: "初期数字なし", extreme: "アイテム前提" },
    item: { mine: "地雷", heart: "ハート", hint: "ヒント", shuffle: "シャッフル" },
    itemHelp: { mine: "周囲8マスの数字を消す", heart: "ライフを1つ回復する", hint: "周囲8マスを2択にする", shuffle: "ケージ配置を変える" },
    ui: {
      appTitle: "キラーアイテムナンプレ",
      gameInfo: "ゲーム情報",
      chooseDifficulty: "遊び方の選択に戻る",
      records: "記録",
      showRecords: "記録を見る",
      cleared: "クリア済",
      close: "閉じる",
      normalRecords: "通常プレイ",
      adventureRecords: "アドベンチャー",
      rogueRecords: "ローグラン",
      rogueRecordAbilities: "能力",
      rogueAbilityRecordUnavailable: "能力記録なし",
      noRecordSummary: "まだ記録はありません",
      difficultyLabel: "難易度",
      time: "時間",
      mistakes: "ライフ",
      score: "スコア",
      board: "ゲーム盤",
      numberInput: "数字入力",
      tools: "プレイ補助",
      undo: "元に戻す",
      note: "メモ",
      erase: "消す",
      itemLegend: "アイテム凡例",
      generating: "生成中...",
      selectDifficulty: "遊び方を選ぶ",
      itemPicker: "登場アイテム",
      normalPlaySection: "通常プレイ",
      specialPlaySection: "特殊な遊び方",
      chainPlayOpen: "ローグラン",
      chainPlayOpenHelp: "能力を選んで5連戦",
      firstRunTitle: "はじめての方へ",
      firstRunText: "地雷・ハート・ヒントが発動する、少し変わったキラーナンプレです。",
      itemIntro: "アイテム紹介",
      startFirst: "まず遊んでみる",
      gameFinished: "ゲーム終了",
      reviveAd: "広告を見て復活",
      loadingAd: "広告を読み込み中...",
      retry: "もう一度遊ぶ",
      paused: "一時停止",
      pausedText: "ゲームを一時停止しています。",
      resume: "再開する",
      resetTitle: "ゲームをリセットしますか？",
      continue: "続ける",
      restart: "最初から遊ぶ",
      dailyChallenge: "今日のチャレンジ",
      dailyOn: "オン 今日だけの固定盤面",
      dailyOff: "今日だけの盤面に挑戦",
      extremeNote: "アイテムなしでは迷うことがあります",
      noItems: "アイテムなし",
      notPlayed: "未挑戦",
      dailyRecords: "デイリー記録",
      noRecords: "まだ記録はありません",
      noMistakeBadge: "ノーミス",
      remaining: "残り",
      allEntered: "{n}はすべて入力済み",
      enterNumber: "{n}を入力",
      rowColAria: "{row}行 {col}列",
      dailyPrefix: "デイリー\n{label}",
      adventurePrefix: "アドベンチャー\n{label}",
      adventureTitle: "アドベンチャー",
      adventureOpen: "アドベンチャー",
      adventureOpenHelp: "特殊ルールに挑戦",
      adventureIntro: "いつもと違うルールで、少し変わった盤面に挑戦できます。",
      adventurePractice: "練習",
      adventurePracticeHelp: "時間制限なし / 記録なし",
      adventurePracticeBadge: "練習",
      adventureCardTimeLimit: "制限時間 {n}分",
      adventureCardNoTimeLimit: "制限時間なし",
      backToDifficulty: "難易度選択に戻る",
      adventureHintRain: "ヒントの雨",
      adventureHintRainHelp: "全マスヒント / 2分制限",
      adventureHeartRush: "ハートラッシュ",
      adventureHeartRushHelp: "全マスハート / 3分制限",
      adventureGrowingMines: "増える地雷",
      adventureGrowingMinesHelp: "10秒ごとに地雷が増える",
      adventureBlind: "ブラインド",
      adventureBlindHelp: "数字非表示 / 5分制限",
      blindHidden: "数字非表示",
      adventureMineSearch: "マインサーチ",
      adventureMineSearchHelp: "地雷以外を埋めろ",
      adventureHeartbeat: "ハートビート",
      adventureHeartbeatHelp: "30秒以内にハートをつなげ",
      adventurePatrol: "パトロール",
      adventurePatrolHelp: "動く封鎖が出現 / 4分制限",
      adventureBomber: "ボマー",
      adventureBomberHelp: "放置すると爆発 / 5分制限",
      adventureCageEater: "ケージリンカー",
      adventureCageEaterHelp: "放置するとケージ融合 / 5分制限",
      adventureNumberClimb: "ナンバークライム",
      adventureNumberClimbHelp: "小さい数字から埋めろ / 5分制限",
      numberClimbNext: "次は {n} 以上",
      numberClimbReset: "{n} でリセット",
      numberClimbBlocked: "今は {n} 以上の数字だけ入力できます。",
      numberClimbRestarted: "{n} 到達！ 1から再スタート",
      numberClimbMineReset: "地雷でリセット！ 次は1以上",
      numberClimbFreeTitle: "自由入力中",
      numberClimbFreeInput: "自由入力 {n}秒",
      adventureSleeper: "スリーパー",
      adventureSleeperHelp: "近くを埋めると周囲封鎖 / 5分制限",
      adventureJammer: "ジャマー",
      adventureJammerHelp: "ケージ内の情報を隠す / 5分制限",
      adventureChaser: "チェイサー",
      adventureChaserHelp: "リアルタイムに追跡 / 5分制限",
      adventureStriker: "ストライカー",
      adventureStrikerHelp: "一直線に突進 / 5分制限",
      adventureLightning: "雷雨",
      adventureLightningHelp: "落雷範囲から逃げろ / 5分制限",
      adventureShiftingCages: "カオスケージ",
      adventureShiftingCagesHelp: "5手毎にシャッフル / 4分制限",
      adventureRogueRun: "ローグラン",
      adventureRogueRunHelp: "能力を選んで5連戦",
      rogueRunStage: "ステージ {current}/{total}",
      rogueRunStageNamed: "{current}/{total} {name}",
      rogueInitialPower: "初期能力",
      rogueAbilityPanel: "能力",
      rogueRewardTitle: "能力を選ぶ",
      rogueRewardIntro: "次のステージに持ち越す能力を1つ選んでください。",
      rogueRewardIntroStart: "最初の能力を1つ選んでローグランを始めます。",
      rogueNextStage: "次のステージへ",
      rogueRunClear: "ローグラン制覇！",
      rogueBossName: "スコア・コア",
      rogueBossStage: "BOSS {name}",
      rogueBossPreview: "スコア獲得でHPを削る",
      rogueBossHp: "HP {current} / {max}",
      rogueBossNextBoard: "ボスHP残存！ 次の盤面へ",
      rogueAbilities: "獲得能力",
      rogueNoAbilities: "能力なし",
      rogueStageClear: "ステージ {current} クリア",
      rogueAbilityHeartPlus: "ハート強化",
      rogueAbilityHeartPlusHelp: "ハートの回復量が1増える",
      rogueAbilityHeartTime: "ハート時計",
      rogueAbilityHeartTimeHelp: "ハートは時間も10秒回復させる",
      rogueAbilityHintSingle: "確定ヒント",
      rogueAbilityHintSingleHelp: "ヒントの効果が2択から1択になる",
      rogueAbilityHintExpand: "広域ヒント",
      rogueAbilityHintExpandHelp: "ヒント発動時の範囲が少し広がる",
      rogueAbilityMineGuard: "不発ガード",
      rogueAbilityMineGuardHelp: "地雷が半分の確率で不発",
      rogueAbilityMineCross: "十字防爆",
      rogueAbilityMineCrossHelp: "地雷発動時の消去範囲を少し狭める",
      rogueAbilityShuffleEasy: "整列シャッフル",
      rogueAbilityShuffleEasyHelp: "シャッフル発動時にケージが少し整理される",
      rogueMasteryHeartPlus: "生命の泉",
      rogueMasteryHintExpand: "千里眼",
      rogueMasteryMineGuard: "防爆フィールド",
      rogueMasteryShuffleEasy: "整然ケージ",
      rogueMasteryHelp: "{ability}を重ねて強化中",
      rogueAbilityHeartStock: "ハート補給",
      rogueAbilityHeartStockHelp: "各ステージにハートを2個追加",
      rogueAbilityHintStock: "ヒント補給",
      rogueAbilityHintStockHelp: "各ステージにヒントを2個追加",
      rogueAbilityShuffleStock: "シャッフル補給",
      rogueAbilityShuffleStockHelp: "各ステージにシャッフルを2個追加",
      rogueAbilityLastCellHint: "ラストヒント",
      rogueAbilityLastCellHintHelp: "残り1マスの列・ブロック・ケージを1択ヒント化",
      rogueAbilityCalmGimmicks: "スローテンポ",
      rogueAbilityCalmGimmicksHelp: "敵と落雷の動きが少しゆっくりになる",
      rogueAbilityComboBonus: "集中力",
      rogueAbilityComboBonusHelp: "正解した際のスコアが少し増える",
      rogueStageWarmup: "準備",
      rogueStageMineGrowth: "増える地雷",
      rogueStageGuardBomb: "封鎖と爆弾",
      rogueStageHiddenStorm: "隠れる雷雨",
      rogueStageFinal: "総力戦",
      rogueNextPreviewStart: "最初のステージ",
      rogueNextPreview: "次のステージ",
      rogueNextPreviewMeta: "{difficulty} / {time} / アイテム {items}",
      roguePreviewNoGimmick: "基本ルールのみ",
      roguePreviewGrowingMines: "時間経過で地雷追加",
      roguePreviewPatrol: "移動する封鎖",
      roguePreviewBomber: "放置で爆発",
      roguePreviewCageEater: "放置でケージ融合",
      roguePreviewNumberClimb: "小さい数字から入力",
      roguePreviewShiftingCages: "一定手数でケージ変化",
      roguePreviewJammer: "ケージ情報を隠す",
      roguePreviewSleeper: "起床で周囲封鎖",
      roguePreviewLightning: "落雷エリアが発生",
      roguePreviewChaser: "リアルタイム追跡",
      roguePreviewStriker: "一直線に突進",
      rogueHeartBoost: "ハート ライフ {n}回復！",
      rogueHeartTime: "時間 10秒回復！",
      rogueMineBlocked: "地雷 不発！",
      rogueHintSingle: "ヒント {n}マス 確定！ +30",
      rogueLastCellHint: "ラストヒント {n}マス 確定！",
      mineSearchMineHelp: "踏んだらゲームオーバー",
      heartTimeHelp: "時間を回復",
      timeUp: "時間切れです。",
      heartbeatUp: "ハートが途切れました。",
      patrolBlocked: "このマスはパトロール中です。",
      patrolDefeated: "封鎖 {n}体 解除！",
      bomberBlocked: "このマスはボマーがいます。",
      bomberDefused: "ボマー鎮火！",
      bomberExploded: "ボマー爆発 {n}マス 消去！",
      cageEaterBlocked: "このマスはケージリンカーがいます。",
      cageEaterCalmed: "ケージリンカーを抑えた！",
      cageEaterMerged: "ケージ融合！ {n}マスに巨大化！",
      cageEaterNoTarget: "融合できる隣接ケージなし！",
      sleeperBlocked: "このマスはスリーパーがいます。",
      sleeperAwake: "スリーパー起動 周囲封鎖！",
      sleeperReleased: "封鎖解除！",
      jammerCleared: "ジャマー解除！",
      jammerBlocked: "このマスはジャマーがいます。",
      chaserBlocked: "このマスはチェイサーがいます。",
      chaserHit: "チェイサー接触！ ライフ -1",
      chaserStunned: "チェイサー停止！",
      strikerHit: "ストライカー直撃！ ライフ -1",
      strikerStunned: "ストライカー停止！",
      lightningHit: "落雷直撃！ ライフ -1",
      mineSearchHit: "地雷を踏みました。",
      mineAdded: "地雷が1つ増えた！",
      cageShifted: "ケージ変更！",
      clear: "クリア",
      gameOver: "ゲームオーバー",
      bestTime: "ベストタイム更新！",
      bestScore: "ベストスコア更新！",
      noMistakeClear: "ノーミスクリア！",
      bestTimeLabel: "ベストタイム",
      bestScoreLabel: "ベストスコア",
      difficultyResult: "難易度",
      mistakeResult: "ミス回数",
      mistakeCount: "{n} 回",
      gameOverText: "ライフがなくなりました。",
      revived: "復活！ ライフ 3/3",
      adUnavailable: "この環境では広告を表示できません。",
      adPreparing: "広告を準備中です。少し待ってから試してください。",
      adClosed: "広告が閉じられました。",
      adLoadFailed: "広告を読み込めませんでした。",
      undoMessage: "直前の操作を戻しました。",
      eraseMemo: "{cell} のメモを消しました。",
      correct: "正解。{cell} に {n} が入りました。",
      numberComplete: "{n} 完了！",
      cageComplete: "ケージ完成！",
      blockComplete: "ブロック完成！",
      streak: "{streak}連続！ +{points}",
      streak100: "{streak}連続達成！ +{points}",
      miss: "ライフ -1。残り {n}",
      wrongKept: "その数字はすでに入っています。",
      mineClear: "地雷 {n}マス 消去！ +{points}",
      mine: "地雷 発動！",
      heartZero: "ハート ライフ 0回復！ +30",
      heart: "ハート ライフ 1回復！",
      hint: "ヒント {n}マス 2択化！ +30",
      shuffleCages: "シャッフル ケージ変更！ +50",
      cellName: "{row}行{col}列",
      introMessage: "ケージ左上の数字は、その点線内の合計です。隠れたアイテムは正解を入れると発動します。",
    },
  },
  en: {
    difficulty: { easy: "Easy", normal: "Normal", hard: "Hard", veryHard: "Very Hard", extreme: "Extreme" },
    difficultyHelp: { easy: "More givens", normal: "Standard", hard: "Fewer givens", veryHard: "No starting digits", extreme: "Items expected" },
    item: { mine: "Mine", heart: "Heart", hint: "Hint", shuffle: "Shuffle" },
    itemHelp: { mine: "Clears the 8 surrounding cells", heart: "Restores 1 life", hint: "Narrows nearby cells to 2 choices", shuffle: "Changes cage layout" },
    ui: {
      appTitle: "Killer Item Sudoku",
      gameInfo: "Game info",
      chooseDifficulty: "Back to Play Selection",
      records: "Records",
      showRecords: "View Records",
      cleared: "Cleared",
      close: "Close",
      normalRecords: "Main Mode",
      adventureRecords: "Adventure",
      rogueRecords: "Rogue Run",
      rogueRecordAbilities: "Powers",
      rogueAbilityRecordUnavailable: "No power record",
      noRecordSummary: "No records yet",
      difficultyLabel: "Difficulty",
      time: "Time",
      mistakes: "Life",
      score: "Score",
      board: "Board",
      numberInput: "Number input",
      tools: "Tools",
      undo: "Undo",
      note: "Notes",
      erase: "Erase",
      itemLegend: "Item guide",
      generating: "Generating...",
      selectDifficulty: "Choose How to Play",
      itemPicker: "Items",
      normalPlaySection: "Main Play",
      specialPlaySection: "Other Modes",
      chainPlayOpen: "Rogue Run",
      chainPlayOpenHelp: "Choose abilities for 5 stages",
      firstRunTitle: "Welcome",
      firstRunText: "A twist on Killer Sudoku where mines, hearts, and hints trigger as you solve.",
      itemIntro: "Item intro",
      startFirst: "Start Playing",
      gameFinished: "Game Finished",
      reviveAd: "Watch Ad to Revive",
      loadingAd: "Loading ad...",
      retry: "Play Again",
      paused: "Paused",
      pausedText: "The game is paused.",
      resume: "Resume",
      resetTitle: "Reset this game?",
      continue: "Continue",
      restart: "Restart",
      dailyChallenge: "Daily Challenge",
      dailyOn: "On Today's fixed board",
      dailyOff: "Play today's board",
      extremeNote: "May not narrow down without items",
      noItems: "No items",
      notPlayed: "Not played",
      dailyRecords: "Daily Records",
      noRecords: "No records yet",
      noMistakeBadge: "No mistakes",
      remaining: "Left",
      allEntered: "All {n}s entered",
      enterNumber: "Enter {n}",
      rowColAria: "Row {row}, column {col}",
      dailyPrefix: "Daily\n{label}",
      adventurePrefix: "Adventure\n{label}",
      adventureTitle: "Adventure",
      adventureOpen: "Adventure",
      adventureOpenHelp: "Single special-rule stages",
      adventureIntro: "Try boards with special rules that play differently from the main mode.",
      adventurePractice: "Practice",
      adventurePracticeHelp: "No time limit / no records",
      adventurePracticeBadge: "Practice",
      adventureCardTimeLimit: "Time limit: {n} min",
      adventureCardNoTimeLimit: "No time limit",
      backToDifficulty: "Back to Difficulty Selection",
      adventureHintRain: "Hint Rain",
      adventureHintRainHelp: "All hints / 2-minute limit",
      adventureHeartRush: "Heart Rush",
      adventureHeartRushHelp: "All hearts / 3-minute limit",
      adventureGrowingMines: "Growing Mines",
      adventureGrowingMinesHelp: "A new mine appears every 10 seconds",
      adventureBlind: "Blind",
      adventureBlindHelp: "Hidden digits / 5-minute limit",
      blindHidden: "Digits hidden",
      adventureMineSearch: "Mine Search",
      adventureMineSearchHelp: "Fill every non-mine cell",
      adventureHeartbeat: "Heartbeat",
      adventureHeartbeatHelp: "Collect hearts within 30 seconds",
      adventurePatrol: "Patrol",
      adventurePatrolHelp: "Moving blockers appear / 4-minute limit",
      adventureBomber: "Bomber",
      adventureBomberHelp: "Explodes if ignored / 5-minute limit",
      adventureCageEater: "Cage Linker",
      adventureCageEaterHelp: "Merges cages if ignored / 5-minute limit",
      adventureNumberClimb: "Number Climb",
      adventureNumberClimbHelp: "Small numbers first / 5-minute limit",
      numberClimbNext: "Next: {n} or higher",
      numberClimbReset: "Reset at {n}",
      numberClimbBlocked: "Only numbers {n} or higher can be entered now.",
      numberClimbRestarted: "Reached {n}! Back to 1",
      numberClimbMineReset: "Mine reset! Next: 1 or higher",
      numberClimbFreeTitle: "Free input",
      numberClimbFreeInput: "Free input: {n}s",
      adventureSleeper: "Sleeper",
      adventureSleeperHelp: "Fill nearby cells to wake it / 5-minute limit",
      adventureJammer: "Jammer",
      adventureJammerHelp: "Hides cage information / 5-minute limit",
      adventureChaser: "Chaser",
      adventureChaserHelp: "Real-time pursuit / 5-minute limit",
      adventureStriker: "Striker",
      adventureStrikerHelp: "Straight-line rush / 5-minute limit",
      adventureLightning: "Thunderstorm",
      adventureLightningHelp: "Dodge lightning zones / 5-minute limit",
      adventureShiftingCages: "Chaos Cages",
      adventureShiftingCagesHelp: "Shuffle every 5 moves / 4-minute limit",
      adventureRogueRun: "Rogue Run",
      adventureRogueRunHelp: "Choose powers across 5 stages",
      rogueRunStage: "Stage {current}/{total}",
      rogueRunStageNamed: "{current}/{total} {name}",
      rogueInitialPower: "Starting Power",
      rogueAbilityPanel: "Powers",
      rogueRewardTitle: "Choose a Power",
      rogueRewardIntro: "Pick one power to carry into the next stage.",
      rogueRewardIntroStart: "Pick one starting power to begin the run.",
      rogueNextStage: "Next Stage",
      rogueRunClear: "Rogue Run Clear!",
      rogueBossName: "Score Core",
      rogueBossStage: "BOSS {name}",
      rogueBossPreview: "Earn score to drain its HP",
      rogueBossHp: "HP {current} / {max}",
      rogueBossNextBoard: "Boss HP remains! Next board",
      rogueAbilities: "Powers",
      rogueNoAbilities: "No powers",
      rogueStageClear: "Stage {current} Clear",
      rogueAbilityHeartPlus: "Stronger Hearts",
      rogueAbilityHeartPlusHelp: "Hearts restore 1 extra life",
      rogueAbilityHeartTime: "Heart Clock",
      rogueAbilityHeartTimeHelp: "Hearts also restore 10 seconds",
      rogueAbilityHintSingle: "Certain Hint",
      rogueAbilityHintSingleHelp: "Hints narrow from 2 choices to 1",
      rogueAbilityHintExpand: "Wide Hint",
      rogueAbilityHintExpandHelp: "Hint activation covers a wider area",
      rogueAbilityMineGuard: "Mine Guard",
      rogueAbilityMineGuardHelp: "Mines fail half the time",
      rogueAbilityMineCross: "Cross Shield",
      rogueAbilityMineCrossHelp: "Mine blasts clear a slightly smaller area",
      rogueAbilityShuffleEasy: "Clean Shuffle",
      rogueAbilityShuffleEasyHelp: "Shuffle activation makes cages cleaner",
      rogueMasteryHeartPlus: "Life Spring",
      rogueMasteryHintExpand: "Far Sight",
      rogueMasteryMineGuard: "Blast Field",
      rogueMasteryShuffleEasy: "Orderly Cages",
      rogueMasteryHelp: "{ability} is strengthened by stacking",
      rogueAbilityHeartStock: "Heart Stock",
      rogueAbilityHeartStockHelp: "Adds 2 heart items to each stage",
      rogueAbilityHintStock: "Hint Stock",
      rogueAbilityHintStockHelp: "Adds 2 hint items to each stage",
      rogueAbilityShuffleStock: "Shuffle Stock",
      rogueAbilityShuffleStockHelp: "Adds 2 shuffle items to each stage",
      rogueAbilityLastCellHint: "Last-Cell Hint",
      rogueAbilityLastCellHintHelp: "Rows, boxes, and cages with 1 cell left become one-choice hints",
      rogueAbilityCalmGimmicks: "Slower Tempo",
      rogueAbilityCalmGimmicksHelp: "Enemies and lightning move a little slower",
      rogueAbilityComboBonus: "Focus",
      rogueAbilityComboBonusHelp: "Correct answers earn a little more score",
      rogueStageWarmup: "Warmup",
      rogueStageMineGrowth: "Growing Mines",
      rogueStageGuardBomb: "Blocks & Bombs",
      rogueStageHiddenStorm: "Hidden Storm",
      rogueStageFinal: "Final Rush",
      rogueNextPreviewStart: "First Stage",
      rogueNextPreview: "Next Stage",
      rogueNextPreviewMeta: "{difficulty} / {time} / {items} items",
      roguePreviewNoGimmick: "Standard rules",
      roguePreviewGrowingMines: "Mines appear over time",
      roguePreviewPatrol: "Moving blockers",
      roguePreviewBomber: "Explodes if ignored",
      roguePreviewCageEater: "Merges cages if ignored",
      roguePreviewNumberClimb: "Enter smaller numbers first",
      roguePreviewShiftingCages: "Cages change after several moves",
      roguePreviewJammer: "Hides cage info",
      roguePreviewSleeper: "Blocks nearby cells",
      roguePreviewLightning: "Lightning zones appear",
      roguePreviewChaser: "Real-time pursuit",
      roguePreviewStriker: "Straight-line rush",
      rogueHeartBoost: "Heart restored {n} lives!",
      rogueHeartTime: "Restored 10 seconds!",
      rogueMineBlocked: "Mine fizzled!",
      rogueHintSingle: "Hint confirmed {n} cells! +30",
      rogueLastCellHint: "Last-cell hint confirmed {n} cells!",
      mineSearchMineHelp: "Game over if stepped on",
      heartTimeHelp: "restores time",
      timeUp: "Time is up.",
      heartbeatUp: "The heartbeat stopped.",
      patrolBlocked: "This cell is being patrolled.",
      patrolDefeated: "{n} blocker removed!",
      bomberBlocked: "A bomber is on this cell.",
      bomberDefused: "Bomber cooled down!",
      bomberExploded: "Bomber cleared {n} cells!",
      cageEaterBlocked: "The Cage Linker is on this cell.",
      cageEaterCalmed: "Cage Linker calmed down!",
      cageEaterMerged: "Cages merged into {n} cells!",
      cageEaterNoTarget: "No adjacent cage can be merged!",
      sleeperBlocked: "A sleeper is on this cell.",
      sleeperAwake: "Sleeper activated and blocked nearby cells!",
      sleeperReleased: "Blocks released!",
      jammerCleared: "Jammer cleared!",
      jammerBlocked: "A jammer is on this cell.",
      chaserBlocked: "The chaser is on this cell.",
      chaserHit: "Chaser hit! Life -1",
      chaserStunned: "Chaser stunned!",
      strikerHit: "Striker hit! Life -1",
      strikerStunned: "Striker stunned!",
      lightningHit: "Lightning hit! Life -1",
      mineSearchHit: "You stepped on a mine.",
      mineAdded: "A mine appeared!",
      cageShifted: "Cages changed!",
      clear: "Clear",
      gameOver: "Game Over",
      bestTime: "Best Time!",
      bestScore: "Best Score!",
      noMistakeClear: "No Mistake Clear!",
      bestTimeLabel: "Best Time",
      bestScoreLabel: "Best Score",
      difficultyResult: "Difficulty",
      mistakeResult: "Mistakes",
      mistakeCount: "{n}",
      gameOverText: "You ran out of lives.",
      revived: "Revived! Life 3/3",
      adUnavailable: "Ads are not available in this environment.",
      adPreparing: "Ad is preparing. Please try again shortly.",
      adClosed: "Ad was closed.",
      adLoadFailed: "Could not load the ad.",
      undoMessage: "Undid the last move.",
      eraseMemo: "Cleared notes in {cell}.",
      correct: "Correct. {n} entered in {cell}.",
      numberComplete: "{n} Complete!",
      cageComplete: "Cage Complete!",
      blockComplete: "Block Complete!",
      streak: "{streak} streak! +{points}",
      streak100: "{streak} streak achieved! +{points}",
      miss: "Life -1. {n} left.",
      wrongKept: "That number is already entered.",
      mineClear: "Mine cleared {n} cells! +{points}",
      mine: "Mine triggered!",
      heartZero: "Heart restored 0 life! +30",
      heart: "Heart restored 1 life!",
      hint: "Hint narrowed {n} cells! +30",
      shuffleCages: "Shuffle changed cages! +50",
      cellName: "R{row}C{col}",
      introMessage: "The number at the top-left of a cage is the sum for that dotted cage. Hidden items trigger when you enter the correct digit.",
    },
  },
};
const ROGUE_RUN_STAGE_COUNT = 5;
const ROGUE_BOSS_HP = 1500;
const ROGUE_ABILITY_DEFS = [
  { id: "heartPlus", titleKey: "rogueAbilityHeartPlus", helpKey: "rogueAbilityHeartPlusHelp", stackable: true },
  { id: "heartTime", titleKey: "rogueAbilityHeartTime", helpKey: "rogueAbilityHeartTimeHelp" },
  { id: "hintSingle", titleKey: "rogueAbilityHintSingle", helpKey: "rogueAbilityHintSingleHelp" },
  { id: "hintExpand", titleKey: "rogueAbilityHintExpand", helpKey: "rogueAbilityHintExpandHelp", stackable: true },
  { id: "mineGuard", titleKey: "rogueAbilityMineGuard", helpKey: "rogueAbilityMineGuardHelp", stackable: true },
  { id: "mineCross", titleKey: "rogueAbilityMineCross", helpKey: "rogueAbilityMineCrossHelp" },
  { id: "shuffleEasy", titleKey: "rogueAbilityShuffleEasy", helpKey: "rogueAbilityShuffleEasyHelp", stackable: true },
  { id: "heartStock", titleKey: "rogueAbilityHeartStock", helpKey: "rogueAbilityHeartStockHelp", stackable: true },
  { id: "hintStock", titleKey: "rogueAbilityHintStock", helpKey: "rogueAbilityHintStockHelp", stackable: true },
  { id: "shuffleStock", titleKey: "rogueAbilityShuffleStock", helpKey: "rogueAbilityShuffleStockHelp", stackable: true },
  { id: "lastCellHint", titleKey: "rogueAbilityLastCellHint", helpKey: "rogueAbilityLastCellHintHelp" },
  { id: "calmGimmicks", titleKey: "rogueAbilityCalmGimmicks", helpKey: "rogueAbilityCalmGimmicksHelp" },
  { id: "comboBonus", titleKey: "rogueAbilityComboBonus", helpKey: "rogueAbilityComboBonusHelp" },
];
const ROGUE_STAGE_PLAN = [
  { nameKey: "rogueStageWarmup", difficulty: "normal", itemCount: 12, initialMines: 4, timeLimitMs: 300000, gimmicks: [] },
  {
    nameKey: "rogueStageMineGrowth",
    difficulty: "hard",
    itemCount: 13,
    initialMines: 7,
    timeLimitMs: 300000,
    gimmicks: ["growingMines"],
    rules: { growingMines: { mineIntervalMs: 18000 } },
  },
  {
    nameKey: "rogueStageGuardBomb",
    difficulty: "hard",
    itemCount: 13,
    initialMines: 6,
    timeLimitMs: 300000,
    gimmicks: ["patrol", "bomber"],
    rules: { bomber: { bomberLimit: 5 } },
  },
  {
    nameKey: "rogueStageHiddenStorm",
    difficulty: "hard",
    itemCount: 13,
    initialMines: 7,
    timeLimitMs: 300000,
    gimmicks: ["jammer", "sleeper", "lightning"],
    rules: { jammer: { jammerCount: 3 }, sleeper: { sleeperBlockTurns: 2 }, lightning: { lightningIntervalMs: 3800, lightningWarnMs: 1550, lightningDangerMs: 380 } },
  },
  {
    nameKey: "rogueStageFinal",
    difficulty: "hard",
    itemCount: 14,
    initialMines: 8,
    timeLimitMs: 300000,
    gimmicks: ["growingMines", "chaser", "striker", "lightning"],
    rules: { growingMines: { mineIntervalMs: 22000 }, chaser: { chaserIntervalMs: 2800 }, striker: { strikerIntervalMs: 1100 }, lightning: { lightningIntervalMs: 4200, lightningWarnMs: 1600, lightningDangerMs: 420 } },
  },
];
const ROGUE_GIMMICK_POOL = ["growingMines", "patrol", "bomber", "cageEater", "numberClimb", "shiftingCages", "sleeper", "jammer", "lightning", "chaser", "striker"];
const ROGUE_STACKABLE_ENEMY_GIMMICKS = new Set(["patrol", "bomber", "cageEater", "sleeper", "jammer", "chaser", "striker"]);
const ROGUE_RANDOM_STAGE_SHAPES = [
  { nameKey: "rogueStageWarmup", difficulty: "normal", itemCount: 12, initialMines: 4, timeLimitMs: 300000, picks: 1, pool: ["growingMines", "patrol", "cageEater", "numberClimb", "shiftingCages", "sleeper", "jammer"] },
  { nameKey: "rogueStageMineGrowth", difficulty: "hard", itemCount: 13, initialMines: 6, timeLimitMs: 300000, picks: 2 },
  { nameKey: "rogueStageGuardBomb", difficulty: "hard", itemCount: 13, initialMines: 6, timeLimitMs: 300000, picks: 2 },
  { nameKey: "rogueStageHiddenStorm", difficulty: "hard", itemCount: 13, initialMines: 7, timeLimitMs: 300000, picks: 3 },
  { nameKey: "rogueStageFinal", difficulty: "hard", itemCount: 14, initialMines: 8, timeLimitMs: 300000, picks: 4 },
];
const ROGUE_GIMMICK_PREVIEW = {
  growingMines: { titleKey: "adventureGrowingMines", helpKey: "roguePreviewGrowingMines" },
  patrol: { titleKey: "adventurePatrol", helpKey: "roguePreviewPatrol" },
  bomber: { titleKey: "adventureBomber", helpKey: "roguePreviewBomber" },
  cageEater: { titleKey: "adventureCageEater", helpKey: "roguePreviewCageEater" },
  numberClimb: { titleKey: "adventureNumberClimb", helpKey: "roguePreviewNumberClimb" },
  shiftingCages: { titleKey: "adventureShiftingCages", helpKey: "roguePreviewShiftingCages" },
  jammer: { titleKey: "adventureJammer", helpKey: "roguePreviewJammer" },
  sleeper: { titleKey: "adventureSleeper", helpKey: "roguePreviewSleeper" },
  lightning: { titleKey: "adventureLightning", helpKey: "roguePreviewLightning" },
  chaser: { titleKey: "adventureChaser", helpKey: "roguePreviewChaser" },
  striker: { titleKey: "adventureStriker", helpKey: "roguePreviewStriker" },
};
const ITEM_SELECTION_KEY = "killer-item-sudoku-item-selection-v1";
const ADVENTURE_PRACTICE_KEY = "killer-item-sudoku-adventure-practice-v1";
const MIN_MAX_SUM_CACHE = new Map();

const boardEl = document.querySelector("#board");
const appShell = document.querySelector(".app-shell");
const padEl = document.querySelector("#numberPad");
const undoButton = document.querySelector("#undoButton");
const noteButton = document.querySelector("#noteButton");
const eraseButton = document.querySelector("#eraseButton");
const legendEntries = document.querySelectorAll(".legend-entry[data-item]");
const mistakeEl = document.querySelector("#mistakeCount");
const scoreEl = document.querySelector("#scoreDisplay");
const scoreStat = scoreEl.closest(".stat");
const timerEl = document.querySelector("#timerDisplay");
const difficultyEl = document.querySelector("#difficultyDisplay");
const statusPanel = document.querySelector(".status-panel");
const recordButton = document.querySelector("#recordButton");
const newGameButton = document.querySelector("#newGameButton");
const difficultyDialog = document.querySelector("#difficultyDialog");
const difficultyList = document.querySelector("#difficultyList");
const dailyHistory = document.querySelector("#dailyHistory");
const itemPicker = document.querySelector("#itemPicker");
const adventureDialog = document.querySelector("#adventureDialog");
const adventureList = document.querySelector("#adventureList");
const adventureBackButton = document.querySelector("#adventureBackButton");
const adventurePracticeInput = document.querySelector("#adventurePracticeInput");
const recordDialog = document.querySelector("#recordDialog");
const recordList = document.querySelector("#recordList");
const closeRecordButton = document.querySelector("#closeRecordButton");
const firstRunDialog = document.querySelector("#firstRunDialog");
const firstRunStartButton = document.querySelector("#firstRunStartButton");
const firstRunDifficultyButton = document.querySelector("#firstRunDifficultyButton");
const dialog = document.querySelector("#gameDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogText = document.querySelector("#dialogText");
const reviveButton = document.querySelector("#reviveButton");
const retryButton = document.querySelector("#retryButton");
const dialogButton = document.querySelector("#dialogButton");
const pauseDialog = document.querySelector("#pauseDialog");
const resumeButton = document.querySelector("#resumeButton");
const pauseDifficultyButton = document.querySelector("#pauseDifficultyButton");
const resetDialog = document.querySelector("#resetDialog");
const cancelResetButton = document.querySelector("#cancelResetButton");
const resetRetryButton = document.querySelector("#resetRetryButton");
const confirmResetButton = document.querySelector("#confirmResetButton");
const loadingOverlay = document.querySelector("#loadingOverlay");
const comboToast = document.querySelector("#comboToast");
const rogueAbilityPanel = document.createElement("section");
rogueAbilityPanel.className = "rogue-ability-panel";
rogueAbilityPanel.hidden = true;
statusPanel.insertAdjacentElement("afterend", rogueAbilityPanel);
const numberClimbPanel = document.createElement("section");
numberClimbPanel.className = "number-climb-panel";
numberClimbPanel.hidden = true;
rogueAbilityPanel.insertAdjacentElement("afterend", numberClimbPanel);
const rogueBossPanel = document.createElement("section");
rogueBossPanel.className = "rogue-boss-panel";
rogueBossPanel.hidden = true;
numberClimbPanel.insertAdjacentElement("afterend", rogueBossPanel);
const rogueRewardDialog = document.createElement("dialog");
rogueRewardDialog.className = "modal rogue-reward-dialog";
rogueRewardDialog.innerHTML = `
  <form method="dialog" class="modal-body">
    <h2 id="rogueRewardTitle"></h2>
    <p id="rogueRewardIntro"></p>
    <div class="rogue-run-progress" id="rogueRunProgress"></div>
    <div class="rogue-result-abilities rogue-current-abilities" id="rogueCurrentAbilities"></div>
    <div class="rogue-next-preview" id="rogueNextPreview"></div>
    <div class="rogue-reward-list" id="rogueRewardList"></div>
  </form>
`;
document.body.append(rogueRewardDialog);
const rogueRewardTitle = rogueRewardDialog.querySelector("#rogueRewardTitle");
const rogueRewardIntro = rogueRewardDialog.querySelector("#rogueRewardIntro");
const rogueRunProgress = rogueRewardDialog.querySelector("#rogueRunProgress");
const rogueCurrentAbilities = rogueRewardDialog.querySelector("#rogueCurrentAbilities");
const rogueNextPreview = rogueRewardDialog.querySelector("#rogueNextPreview");
const rogueRewardList = rogueRewardDialog.querySelector("#rogueRewardList");

function t(key, values = {}) {
  const source = TEXT[LOCALE].ui[key] ?? TEXT.ja.ui[key] ?? key;
  return Object.entries(values).reduce((text, [name, value]) => (
    text.replaceAll(`{${name}}`, value)
  ), source);
}

function difficultyLabel(key) {
  return TEXT[LOCALE].difficulty[key] ?? TEXT.ja.difficulty[key] ?? key;
}

function analyticsMode() {
  if (currentAdventureStage) return "adventure";
  if (currentDailyKey) return "daily";
  return "standard";
}

function trackWebEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    game_mode: analyticsMode(),
    difficulty: currentDifficulty,
    adventure_stage: currentAdventureStage || "",
    daily: Boolean(currentDailyKey),
    practice: Boolean(currentAdventurePractice),
    ...params,
  });
}

function itemLabel(type) {
  return TEXT[LOCALE].item[type] ?? TEXT.ja.item[type] ?? type;
}

function itemHelp(type) {
  return TEXT[LOCALE].itemHelp[type] ?? TEXT.ja.itemHelp[type] ?? type;
}

let solution = [];
let puzzle = [];
let entries = [];
let cages = [];
let cellToCage = new Map();
let cageStarts = new Map();
let items = new Map();
let usedItems = new Set();
let hinted = new Map();
let notes = new Map();
let mineNotes = new Set();
let effects = new Map();
let selected = 0;
let mistakes = 0;
let totalMistakes = 0;
let score = 0;
let streak = 0;
let over = true;
let currentDifficulty = "normal";
let initialState = null;
let startTime = 0;
let elapsedMs = 0;
let timerId = null;
let paused = false;
let selectedItemTypes = readSelectedItemTypes();
let generating = false;
let activeNumber = null;
let toastId = null;
let toastSoftenId = null;
let toastQueue = [];
let toastActive = false;
let randomSource = Math.random;
let dailyChallenge = false;
let currentDailyKey = null;
let currentAdventureStage = null;
let adventurePracticeEnabled = localStorage.getItem(ADVENTURE_PRACTICE_KEY) === "1";
let currentAdventurePractice = false;
let adventureTimeLimitMs = null;
let adventureMineIntervalMs = null;
let adventureMineIntervalId = null;
let heartDeadlineMs = null;
let heartDeadlineStartMs = 0;
let heartDeadlineElapsedMs = 0;
let cageShiftEvery = null;
let cageShiftSteps = 0;
let cageShiftCountedCells = new Set();
let patrolRoute = [];
let patrolSteps = [];
let bomberRoute = [];
let bomberSteps = [];
let bomberHeats = [];
let numberClimbMinimum = 1;
let numberClimbFreeUntilMs = 0;
let sleeperCells = [];
let sleeperBlockedCells = new Set();
let sleeperBlockedTurns = new Map();
let sleeperBlockTurns = 0;
let jammerCageIds = new Set();
let jammerCellsByCage = new Map();
let chaserCell = null;
let chaserPreviousCell = null;
let chaserNextCell = null;
let chaserRetired = false;
let chaserIntervalId = null;
let chaserStunnedUntil = 0;
let chaserStunRemainingMs = 0;
let strikerCell = null;
let strikerDirection = null;
let strikerIntervalId = null;
let strikerStunnedUntil = 0;
let strikerStunRemainingMs = 0;
let lightningCells = [];
let lightningPhase = "idle";
let lightningTimerId = null;
let noteMode = false;
let undoStack = [];
let undoUsed = false;
let reviveUsed = false;
let revivePending = false;
let showScoreCard = false;
let rogueRunActive = false;
let rogueRunStage = 0;
let rogueRunElapsedMs = 0;
let rogueRunScoreCarry = 0;
let rogueBossScoreStart = 0;
let rogueRunTotalMistakes = 0;
let rogueRunAbilities = [];
let rogueRunPlans = [];
let blindIntroActive = false;
let blindIntroTimerId = null;
let recordPausedGame = false;
let recordReturnDialog = null;

const BEST_TIME_KEY = "killer-item-sudoku-best-times-v1";
const BEST_SCORE_KEY = "killer-item-sudoku-best-scores-v1";
const ROGUE_BEST_ABILITIES_KEY = "killer-item-sudoku-rogue-best-abilities-v1";
const NO_MISTAKE_KEY = "killer-item-sudoku-no-mistake-v1";
const FIRST_RUN_KEY = "killer-item-sudoku-first-run-v1";

function nextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function setLoading(active) {
  loadingOverlay.classList.toggle("is-active", active);
  loadingOverlay.setAttribute("aria-hidden", active ? "false" : "true");
}

function clearBlindIntroTimer() {
  if (blindIntroTimerId !== null) {
    window.clearTimeout(blindIntroTimerId);
    blindIntroTimerId = null;
  }
}

function startBlindIntro() {
  clearBlindIntroTimer();
  blindIntroActive = currentAdventureMode() === "blind";
  if (!blindIntroActive) return;
  blindIntroTimerId = window.setTimeout(() => {
    blindIntroActive = false;
    blindIntroTimerId = null;
    showComboToast(t("blindHidden"), "combo-toast-lg", { forceFull: true });
    startTimer();
    render();
  }, 1550);
}

function readSelectedItemTypes() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(ITEM_SELECTION_KEY));
    if (!Array.isArray(saved)) return new Set(ITEM_TYPES);
    return new Set(saved.filter((type) => ITEM_TYPES.includes(type)));
  } catch (_) {
    return new Set(ITEM_TYPES);
  }
}

function saveSelectedItemTypes() {
  const saved = ITEM_TYPES.filter((type) => selectedItemTypes.has(type));
  window.localStorage.setItem(ITEM_SELECTION_KEY, JSON.stringify(saved));
}

function hasSeenFirstRun() {
  return window.localStorage.getItem(FIRST_RUN_KEY) === "1";
}

function markFirstRunSeen() {
  window.localStorage.setItem(FIRST_RUN_KEY, "1");
}

function readBestTimes() {
  try {
    return JSON.parse(window.localStorage.getItem(BEST_TIME_KEY)) || {};
  } catch (_) {
    return {};
  }
}

function saveBestTime(difficultyKey, ms) {
  const bestTimes = readBestTimes();
  const previousBest = bestTimes[difficultyKey] || null;
  const isBest = previousBest === null || ms < previousBest;
  if (isBest) {
    bestTimes[difficultyKey] = ms;
    window.localStorage.setItem(BEST_TIME_KEY, JSON.stringify(bestTimes));
  }
  return { isBest, best: bestTimes[difficultyKey] || previousBest };
}

function readBestScores() {
  try {
    return JSON.parse(window.localStorage.getItem(BEST_SCORE_KEY)) || {};
  } catch (_) {
    return {};
  }
}

function saveBestScore(difficultyKey, value) {
  const bestScores = readBestScores();
  const previousBest = bestScores[difficultyKey] || null;
  const isBest = previousBest === null || value > previousBest;
  if (isBest) {
    bestScores[difficultyKey] = value;
    window.localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(bestScores));
  }
  return { isBest, best: bestScores[difficultyKey] || previousBest };
}

function readRogueBestAbilities() {
  try {
    return JSON.parse(window.localStorage.getItem(ROGUE_BEST_ABILITIES_KEY)) || {};
  } catch (_) {
    return {};
  }
}

function saveRogueBestAbilities(recordKey, abilities) {
  const records = readRogueBestAbilities();
  records[recordKey] = abilities.filter((id) => Boolean(rogueAbilityDef(id)));
  window.localStorage.setItem(ROGUE_BEST_ABILITIES_KEY, JSON.stringify(records));
}

function readNoMistakeRecords() {
  try {
    return JSON.parse(window.localStorage.getItem(NO_MISTAKE_KEY)) || {};
  } catch (_) {
    return {};
  }
}

function saveNoMistakeRecord(recordKey) {
  const records = readNoMistakeRecords();
  records[recordKey] = true;
  window.localStorage.setItem(NO_MISTAKE_KEY, JSON.stringify(records));
}

function random() {
  return randomSource();
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function todayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayLabel() {
  const [, month, day] = todayKey().split("-");
  return `${Number(month)}/${Number(day)}`;
}

function dateKeyFromOffset(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function itemSeedKey() {
  return ITEM_TYPES.filter((type) => selectedItemTypes.has(type)).join("-") || "none";
}

function addScore(points) {
  if (points <= 0) return;
  score += points;
}

function correctInputPoints() {
  const base = streak >= 10 ? 20 : streak >= 5 ? 15 : 10;
  return hasRogueAbility("comboBonus") ? base + 5 : base;
}

function highlightNumber() {
  if (isJammedCell(selected)) return null;
  const selectedValue = entries[selected];
  return selectedValue !== EMPTY ? selectedValue : null;
}

function isGameDialogOpen() {
  return [
    difficultyDialog,
    adventureDialog,
    recordDialog,
    firstRunDialog,
    dialog,
    rogueRewardDialog,
    pauseDialog,
    resetDialog,
  ].some((dialogElement) => dialogElement?.open);
}

function shouldObscureBoard() {
  if (over || generating) return false;
  return Boolean(
    pauseDialog.open ||
    resetDialog.open ||
    recordDialog.open ||
    rogueRewardDialog.open ||
    (difficultyDialog.open && paused) ||
    (adventureDialog.open && paused)
  );
}

function syncBoardObscured() {
  appShell?.classList.toggle("board-obscured", shouldObscureBoard());
}

function moveSelectionBy(rowDelta, colDelta) {
  if (blindIntroActive || generating || isGameDialogOpen()) return false;
  const nextRow = Math.max(0, Math.min(SIZE - 1, rowOf(selected) + rowDelta));
  const nextCol = Math.max(0, Math.min(SIZE - 1, colOf(selected) + colDelta));
  const next = indexOf(nextRow, nextCol);
  if (next === selected) return true;
  selected = next;
  if (checkStrikerCollision()) return true;
  render();
  return true;
}

function comboLevel(count) {
  if (count >= 7) return "combo-toast-xl";
  if (count >= 5) return "combo-toast-lg";
  return "combo-toast-normal";
}

function solvedCountForNumber(number) {
  return entries.filter((value, index) => value === number && solution[index] === number).length;
}

function isCenterBoxCell(index) {
  return Math.floor(rowOf(index) / BOX) === 1 && Math.floor(colOf(index) / BOX) === 1;
}

function clearComboToasts() {
  window.clearTimeout(toastId);
  window.clearTimeout(toastSoftenId);
  toastId = null;
  toastSoftenId = null;
  toastQueue = [];
  toastActive = false;
  comboToast.classList.remove("is-active", "combo-toast-normal", "combo-toast-lg", "combo-toast-xl", "combo-toast-century", "combo-toast-muted", "is-softened");
  comboToast.innerHTML = "";
}

function softenComboToast() {
  if (!toastActive || !comboToast.classList.contains("is-active")) return;
  window.clearTimeout(toastSoftenId);
  comboToast.classList.add("is-softened");
  toastSoftenId = window.setTimeout(() => {
    comboToast.classList.remove("is-softened");
    toastSoftenId = null;
  }, 620);
}

function renderNextComboToast() {
  if (toastActive) return;
  const next = toastQueue.shift();
  if (!next) return;

  toastActive = true;
  window.clearTimeout(toastSoftenId);
  toastSoftenId = null;
  comboToast.classList.remove("combo-toast-normal", "combo-toast-lg", "combo-toast-xl", "combo-toast-century", "combo-toast-muted", "is-softened");
  const label = document.createElement("span");
  label.textContent = next.text;
  comboToast.innerHTML = "";
  comboToast.append(label);
  comboToast.classList.add("is-active", next.level);
  comboToast.classList.toggle("combo-toast-muted", next.muted || isCenterBoxCell(selected));

  const duration = next.level === "combo-toast-century" ? 1250 : next.level === "combo-toast-xl" ? 950 : 760;
  toastId = window.setTimeout(() => {
    window.clearTimeout(toastSoftenId);
    toastSoftenId = null;
    comboToast.classList.remove("is-active", "combo-toast-normal", "combo-toast-lg", "combo-toast-xl", "combo-toast-century", "combo-toast-muted", "is-softened");
    comboToast.innerHTML = "";
    toastActive = false;
    toastId = window.setTimeout(renderNextComboToast, 70);
  }, duration);
}

function showComboToast(text, level = "combo-toast-normal", options = {}) {
  toastQueue.push({
    text,
    level,
    muted: !options.forceFull && isCenterBoxCell(selected),
  });
  renderNextComboToast();
}

function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function indexOf(row, col) {
  return row * SIZE + col;
}

function rowOf(index) {
  return Math.floor(index / SIZE);
}

function colOf(index) {
  return index % SIZE;
}

function blockCellsFor(index) {
  const startRow = Math.floor(rowOf(index) / BOX) * BOX;
  const startCol = Math.floor(colOf(index) / BOX) * BOX;
  const cells = [];
  for (let row = startRow; row < startRow + BOX; row += 1) {
    for (let col = startCol; col < startCol + BOX; col += 1) {
      cells.push(indexOf(row, col));
    }
  }
  return cells;
}

function isCorrectEntry(index) {
  return entries[index] === solution[index];
}

function isWrongEntry(index) {
  return entries[index] !== EMPTY && entries[index] !== solution[index];
}

function isCompletedBlock(index) {
  return blockCellsFor(index).every((cell) => isCorrectEntry(cell));
}

function cageForCell(index) {
  const cageId = cellToCage.get(index);
  return cages.find((cage) => cage.id === cageId) || null;
}

function isCompletedCage(cage) {
  return Boolean(cage) && cage.cells.every((cell) => isCorrectEntry(cell));
}

function isSameBlock(a, b) {
  return Math.floor(rowOf(a) / BOX) === Math.floor(rowOf(b) / BOX)
    && Math.floor(colOf(a) / BOX) === Math.floor(colOf(b) / BOX);
}

function flashCompletedBlock(index) {
  flashCellsEffect(blockCellsFor(index), "effect-block-complete", 850);
}

function flashCompletedCage(cage) {
  if (!cage) return;
  flashCellsEffect(cage.cells, "effect-cage-complete", 760);
}

function generateSolution() {
  const base = Array.from({ length: SIZE }, (_, i) => i + 1);
  const rows = shuffle([0, 1, 2]).flatMap((band) => shuffle([0, 1, 2]).map((row) => band * BOX + row));
  const cols = shuffle([0, 1, 2]).flatMap((stack) => shuffle([0, 1, 2]).map((col) => stack * BOX + col));
  const nums = shuffle(base);

  return rows.flatMap((row) =>
    cols.map((col) => nums[(BOX * (row % BOX) + Math.floor(row / BOX) + col) % SIZE])
  );
}

function makePuzzle(blankCount) {
  const result = [...solution];
  shuffle(Array.from({ length: 81 }, (_, i) => i)).slice(0, blankCount).forEach((index) => {
    result[index] = EMPTY;
  });
  return result;
}

function surroundingCells(index) {
  const row = rowOf(index);
  const col = colOf(index);
  const result = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
        result.push(indexOf(nr, nc));
      }
    }
  }
  return result;
}

function orthogonalCells(index) {
  const row = rowOf(index);
  const col = colOf(index);
  return [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]
    .filter(([nr, nc]) => nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE)
    .map(([nr, nc]) => indexOf(nr, nc));
}

function makeCages(profile = "normal") {
  let best = null;
  let bestSingles = Infinity;
  const attempts = profile === "compact" ? 24 : 16;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const candidate = makeCagesOnce(profile);
    const singles = candidate.filter((cage) => cage.cells.length === 1).length;
    const largeCages = candidate.filter((cage) => cage.cells.length > 3).length;
    const largePenalty = largeCages === 0 ? 0.8 : largeCages > 4 ? (largeCages - 4) * 6 : 0;
    const score = singles * 100 + largePenalty + candidate.length * 0.01;
    if (score < bestSingles) {
      best = candidate;
      bestSingles = score;
    }
    if (singles === 0 && largeCages >= 1 && largeCages <= 4) break;
  }

  return best;
}

function makeCagesOnce(profile = "normal") {
  const unassigned = new Set(Array.from({ length: 81 }, (_, i) => i));
  const made = [];
  let cageId = 0;

  while (unassigned.size) {
    const start = [...unassigned][Math.floor(random() * unassigned.size)];
    const roll = random();
    const targetSize = profile === "extreme"
      ? (roll < 0.25 ? 2 : roll < 0.75 ? 3 : roll < 0.97 ? 4 : 5)
      : profile === "compact" ? (roll < 0.94 ? 2 : 3)
      : profile === "easy" ? (roll < 0.86 ? 2 : roll < 0.99 ? 3 : 4)
      : (roll < 0.75 ? 2 : roll < 0.96 ? 3 : roll < 0.99 ? 4 : 5);
    const cells = [start];
    unassigned.delete(start);

    while (cells.length < targetSize) {
      const usedNumbers = new Set(cells.map((cell) => solution[cell]));
      const frontier = shuffle(cells.flatMap(orthogonalCells)).filter((cell) =>
        unassigned.has(cell) && !usedNumbers.has(solution[cell])
      );
      if (!frontier.length) break;
      const next = frontier[0];
      cells.push(next);
      unassigned.delete(next);
    }

    made.push({
      id: cageId,
      cells,
      sum: cells.reduce((total, cell) => total + solution[cell], 0),
    });
    cageId += 1;
  }

  return mergeSingletonCages(made);
}

function mergeSingletonCages(sourceCages) {
  let merged = sourceCages.map((cage) => ({ ...cage, cells: [...cage.cells] }));
  let changed = true;

  while (changed) {
    changed = false;
    const single = merged.find((cage) => cage.cells.length === 1);
    if (!single) break;

    const cell = single.cells[0];
    const number = solution[cell];
    const candidates = orthogonalCells(cell)
      .map((neighbor) => merged.find((cage) => cage.id !== single.id && cage.cells.includes(neighbor)))
      .filter(Boolean)
      .filter((cage, index, list) => list.findIndex((other) => other.id === cage.id) === index)
      .filter((cage) => cage.cells.length < 4 && !cage.cells.some((cageCell) => solution[cageCell] === number))
      .sort((a, b) => a.cells.length - b.cells.length);

    if (!candidates.length) break;
    candidates[0].cells.push(cell);
    merged = merged.filter((cage) => cage.id !== single.id);
    changed = true;
  }

  return merged.map((cage, id) => ({
    id,
    cells: cage.cells,
    sum: cage.cells.reduce((total, cell) => total + solution[cell], 0),
  }));
}

function buildCageLookups() {
  cellToCage = new Map();
  cageStarts = new Map();

  cages.forEach((cage) => {
    cage.cells.forEach((cell) => cellToCage.set(cell, cage.id));
    const start = cage.cells.reduce((best, cell) => {
      if (rowOf(cell) < rowOf(best)) return cell;
      if (rowOf(cell) === rowOf(best) && colOf(cell) < colOf(best)) return cell;
      return best;
    }, cage.cells[0]);
    cageStarts.set(start, cage.sum);
  });
}

function cageCellsForCell(index) {
  const cageId = cellToCage.get(index);
  const cage = cages.find((entry) => entry.id === cageId);
  return cage ? cage.cells : [index];
}

function remainingUnsolvedCageCount() {
  return cages.filter((cage) => cage.cells.some((cell) => entries[cell] !== solution[cell])).length;
}

function isPatrolEndgameSafeZone() {
  return isPatrolMode() && remainingUnsolvedCageCount() <= 2;
}

function retirePatrolIfEndgame() {
  if (!isPatrolEndgameSafeZone() || !patrolSteps.length) return false;
  patrolSteps = [];
  return true;
}

function patrolBlockedCellsFor(patrolCells = currentPatrolCells()) {
  if (!isPatrolMode() || retirePatrolIfEndgame()) return [];
  return [...new Set(patrolCells.flatMap((cell) => cageCellsForCell(cell)))];
}

function isJammerMode() {
  return currentAdventureMode() === "jammer" || rogueHasGimmick("jammer");
}

function isJammedCage(cageId) {
  return isJammerMode() && jammerCageIds.has(cageId);
}

function isJammedCell(index) {
  return isJammedCage(cellToCage.get(index));
}

function isJammerCell(index) {
  return isJammerMode() && [...jammerCellsByCage.values()].includes(index);
}

function isCageSolved(cageId) {
  const cage = cages.find((entry) => entry.id === cageId);
  return Boolean(cage) && cage.cells.every((cell) => entries[cell] === solution[cell]);
}

function isJammerCageCleared(cageId) {
  const cage = cages.find((entry) => entry.id === cageId);
  if (!cage) return false;
  const jammerCell = jammerMarkerCellFor(cageId);
  return cage.cells
    .filter((cell) => cell !== jammerCell)
    .every((cell) => entries[cell] === solution[cell]);
}

function cageStartCell(cage) {
  return cage.cells.reduce((best, cell) => {
    if (rowOf(cell) < rowOf(best)) return cell;
    if (rowOf(cell) === rowOf(best) && colOf(cell) < colOf(best)) return cell;
    return best;
  }, cage.cells[0]);
}

function jammerMarkerCellFor(cageId) {
  if (jammerCellsByCage.has(cageId)) return jammerCellsByCage.get(cageId);
  const cage = cages.find((entry) => entry.id === cageId);
  return cage ? cageStartCell(cage) : null;
}

function normalizeJammersAfterCageChange() {
  if (!isJammerMode() || !jammerCageIds.size) return;
  const markerCells = [...jammerCellsByCage.values()].filter((cell) => (
    cell !== undefined && puzzle[cell] === EMPTY && entries[cell] === EMPTY
  ));
  jammerCageIds = new Set();
  jammerCellsByCage = new Map();
  markerCells.forEach((cell) => {
    const cageId = cellToCage.get(cell);
    if (cageId === undefined || jammerCageIds.has(cageId)) return;
    jammerCageIds.add(cageId);
    jammerCellsByCage.set(cageId, cell);
  });
  clearSolvedJammerCages(false);
}

function clearSolvedJammerCages(showToast = true) {
  if (!isJammerMode() || !jammerCageIds.size) return false;
  let cleared = false;
  [...jammerCageIds].forEach((cageId) => {
    if (isJammerCageCleared(cageId)) {
      jammerCageIds.delete(cageId);
      jammerCellsByCage.delete(cageId);
      cleared = true;
    }
  });
  if (cleared && showToast) showComboToast(t("jammerCleared"), "combo-toast-normal");
  return cleared;
}

function isChaserMode() {
  return currentAdventureMode() === "chaser" || rogueHasGimmick("chaser");
}

function chaserOpenCells() {
  if (!isChaserMode() || chaserRetired) return [];
  return entries
    .map((value, index) => ({ value, index }))
    .filter(({ value, index }) => puzzle[index] === EMPTY && value === EMPTY)
    .map(({ index }) => index);
}

function chaserPlayableOpenCells() {
  return chaserOpenCells().filter((cell) => cell !== chaserCell);
}

function retireChaserIfEndgame() {
  if (!isChaserMode() || chaserRetired || chaserCell === null) return false;
  if (chaserPlayableOpenCells().length > 2) return false;
  chaserCell = null;
  chaserPreviousCell = null;
  chaserNextCell = null;
  chaserRetired = true;
  stopChaserTimer();
  return true;
}

function chaserDistance(a, b) {
  return Math.abs(rowOf(a) - rowOf(b)) + Math.abs(colOf(a) - colOf(b));
}

function isChaserStunned() {
  return isChaserMode() && chaserStunnedUntil > Date.now();
}

function currentChaserCell() {
  if (!isChaserMode() || chaserRetired) return null;
  if (retireChaserIfEndgame()) return null;
  if (chaserCell === null || puzzle[chaserCell] !== EMPTY || entries[chaserCell] !== EMPTY) {
    const cells = chaserOpenCells().filter((cell) => cell !== selected);
    chaserCell = cells.length ? cells[0] : null;
    chaserPreviousCell = null;
    chaserNextCell = null;
    retireChaserIfEndgame();
  }
  return chaserCell;
}

function chaserJumpCells(current) {
  const row = rowOf(current);
  const col = colOf(current);
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];
  return directions.flatMap((direction) => {
    let nextRow = row + direction.row;
    let nextCol = col + direction.col;
    while (nextRow >= 0 && nextRow < SIZE && nextCol >= 0 && nextCol < SIZE) {
      const cell = indexOf(nextRow, nextCol);
      if (puzzle[cell] === EMPTY && entries[cell] === EMPTY) return [cell];
      nextRow += direction.row;
      nextCol += direction.col;
    }
    return [];
  });
}

function chooseNextChaserCell(current) {
  const candidates = chaserJumpCells(current);
  if (!candidates.length) return null;
  const pool = candidates;
  const movable = pool.length > 1 && chaserPreviousCell !== null
    ? pool.filter((cell) => cell !== chaserPreviousCell)
    : pool;
  return [...(movable.length ? movable : pool)].sort((a, b) => {
    const distance = chaserDistance(a, selected) - chaserDistance(b, selected);
    if (distance !== 0) return distance;
    return chaserDistance(a, current) - chaserDistance(b, current);
  })[0];
}

function nextChaserCell() {
  const current = currentChaserCell();
  if (current === null || isChaserStunned()) return null;
  const candidates = chaserJumpCells(current);
  if (chaserNextCell !== null && candidates.includes(chaserNextCell)) return chaserNextCell;
  chaserNextCell = chooseNextChaserCell(current);
  return chaserNextCell;
}

function setupChaser() {
  chaserCell = null;
  chaserPreviousCell = null;
  chaserNextCell = null;
  chaserRetired = false;
  chaserStunnedUntil = 0;
  chaserStunRemainingMs = 0;
  if (!isChaserMode()) return;
  const cells = chaserOpenCells().filter((cell) => cell !== selected);
  if (!cells.length) return;
  chaserCell = cells.sort((a, b) => chaserDistance(b, selected) - chaserDistance(a, selected))[0];
  retireChaserIfEndgame();
}

function currentChaserStunRemaining() {
  return Math.max(0, chaserStunnedUntil - Date.now(), chaserStunRemainingMs);
}

function stopChaserTimer() {
  if (chaserIntervalId !== null) {
    window.clearInterval(chaserIntervalId);
    chaserIntervalId = null;
  }
  if (chaserStunnedUntil > Date.now()) {
    chaserStunRemainingMs = Math.max(0, chaserStunnedUntil - Date.now());
  }
  chaserStunnedUntil = 0;
}

function startChaserTimer() {
  if (chaserIntervalId !== null) {
    window.clearInterval(chaserIntervalId);
    chaserIntervalId = null;
  }
  if (!isChaserMode() || chaserRetired || over || paused || blindIntroActive) return;
  if (chaserStunRemainingMs > 0) {
    chaserStunnedUntil = Date.now() + chaserStunRemainingMs;
    chaserStunRemainingMs = 0;
  }
  const interval = adventureRuleConfig("chaser").chaserIntervalMs || 2500;
  chaserIntervalId = window.setInterval(moveChaser, interval);
}

function stunChaser(ms = adventureRuleConfig("chaser").chaserStunMs || 5000) {
  if (!isChaserMode() || chaserRetired || currentChaserCell() === null) return false;
  chaserStunnedUntil = Date.now() + ms;
  chaserStunRemainingMs = 0;
  flashEffect(chaserCell, "effect-chaser-stun", 700);
  showComboToast(t("chaserStunned"), "combo-toast-normal");
  render();
  return true;
}

function stunChaserIfHit(targetCells) {
  if (!isChaserMode() || chaserRetired) return false;
  const cell = currentChaserCell();
  if (cell === null || !targetCells.includes(cell)) return false;
  return stunChaser();
}

function handleChaserHit() {
  if (!isChaserMode() || chaserRetired || over) return;
  mistakes += 1;
  totalMistakes += 1;
  if (isRogueRunMode() && rogueRunActive) rogueRunTotalMistakes += 1;
  streak = 0;
  flashEffect(selected, "effect-error", 520);
  showComboToast(t("chaserHit"), "combo-toast-lg", { forceFull: true });
  if (mistakes >= MAX_LIVES) {
    finish(false);
  } else {
    render();
  }
}

function moveChaser() {
  if (!isChaserMode() || chaserRetired || over || paused || blindIntroActive) return;
  if (isChaserStunned()) {
    render();
    return;
  }
  const before = currentChaserCell();
  const next = nextChaserCell();
  if (next === null) return;
  chaserPreviousCell = before;
  chaserCell = next;
  chaserNextCell = null;
  if (before !== next) flashEffect(next, "effect-chaser", 450);
  if (chaserCell === selected) {
    handleChaserHit();
    return;
  }
  render();
}

function isStrikerMode() {
  return currentAdventureMode() === "striker" || rogueHasGimmick("striker");
}

function randomStrikerSpawn() {
  const side = Math.floor(random() * 4);
  const offset = Math.floor(random() * SIZE);
  if (side === 0) return { cell: indexOf(offset, 0), direction: { row: 0, col: 1 }, axis: "horizontal" };
  if (side === 1) return { cell: indexOf(offset, SIZE - 1), direction: { row: 0, col: -1 }, axis: "horizontal" };
  if (side === 2) return { cell: indexOf(0, offset), direction: { row: 1, col: 0 }, axis: "vertical" };
  return { cell: indexOf(SIZE - 1, offset), direction: { row: -1, col: 0 }, axis: "vertical" };
}

function spawnStriker(avoidSelected = false) {
  if (!isStrikerMode()) {
    strikerCell = null;
    strikerDirection = null;
    return;
  }
  let spawn = randomStrikerSpawn();
  for (let attempt = 0; avoidSelected && spawn.cell === selected && attempt < 16; attempt += 1) {
    spawn = randomStrikerSpawn();
  }
  strikerCell = spawn.cell;
  strikerDirection = spawn.direction;
}

function nextStrikerCell() {
  if (!isStrikerMode() || strikerCell === null || !strikerDirection || isStrikerStunned()) return null;
  const row = rowOf(strikerCell) + strikerDirection.row;
  const col = colOf(strikerCell) + strikerDirection.col;
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return null;
  return indexOf(row, col);
}

function setupStriker() {
  strikerCell = null;
  strikerDirection = null;
  strikerStunnedUntil = 0;
  strikerStunRemainingMs = 0;
  if (!isStrikerMode()) return;
  spawnStriker(true);
}

function currentStrikerStunRemaining() {
  return Math.max(0, strikerStunnedUntil - Date.now(), strikerStunRemainingMs);
}

function isStrikerStunned() {
  return isStrikerMode() && strikerStunnedUntil > Date.now();
}

function stopStrikerTimer() {
  if (strikerIntervalId !== null) {
    window.clearInterval(strikerIntervalId);
    strikerIntervalId = null;
  }
  if (strikerStunnedUntil > Date.now()) {
    strikerStunRemainingMs = Math.max(0, strikerStunnedUntil - Date.now());
  }
  strikerStunnedUntil = 0;
}

function startStrikerTimer() {
  if (strikerIntervalId !== null) {
    window.clearInterval(strikerIntervalId);
    strikerIntervalId = null;
  }
  if (!isStrikerMode() || over || paused || blindIntroActive) return;
  if (strikerStunRemainingMs > 0) {
    strikerStunnedUntil = Date.now() + strikerStunRemainingMs;
    strikerStunRemainingMs = 0;
  }
  const interval = adventureRuleConfig("striker").strikerIntervalMs || 900;
  strikerIntervalId = window.setInterval(moveStriker, interval);
}

function stunStriker(ms = adventureRuleConfig("striker").strikerStunMs || 3500) {
  if (!isStrikerMode() || strikerCell === null) return false;
  strikerStunnedUntil = Date.now() + ms;
  strikerStunRemainingMs = 0;
  flashEffect(strikerCell, "effect-striker-stun", 700);
  showComboToast(t("strikerStunned"), "combo-toast-normal");
  render();
  return true;
}

function stunStrikerIfHit(targetCells) {
  if (!isStrikerMode() || strikerCell === null || !targetCells.includes(strikerCell)) return false;
  return stunStriker();
}

function handleStrikerHit() {
  if (!isStrikerMode() || over || strikerCell === null) return;
  mistakes += 1;
  totalMistakes += 1;
  if (isRogueRunMode() && rogueRunActive) rogueRunTotalMistakes += 1;
  streak = 0;
  flashEffect(selected, "effect-error", 520);
  showComboToast(t("strikerHit"), "combo-toast-xl", { forceFull: true });
  spawnStriker(true);
  if (mistakes >= MAX_LIVES) {
    finish(false);
  } else {
    render();
  }
}

function checkStrikerCollision() {
  if (!isStrikerMode() || over || paused || blindIntroActive || isStrikerStunned()) return false;
  if (strikerCell !== selected) return false;
  handleStrikerHit();
  return true;
}

function moveStriker() {
  if (!isStrikerMode() || over || paused || blindIntroActive) return;
  if (isStrikerStunned()) {
    render();
    return;
  }
  const next = nextStrikerCell();
  if (next === null) {
    spawnStriker(false);
  } else {
    strikerCell = next;
  }
  flashEffect(strikerCell, "effect-striker", 360);
  if (checkStrikerCollision()) return;
  render();
}

function isLightningMode() {
  return currentAdventureMode() === "lightning" || rogueHasGimmick("lightning");
}

function lightningTargets() {
  const targets = [];

  for (let row = 0; row < SIZE; row += 1) {
    targets.push({
      cells: Array.from({ length: SIZE }, (_, col) => indexOf(row, col)),
    });
  }

  for (let col = 0; col < SIZE; col += 1) {
    targets.push({
      cells: Array.from({ length: SIZE }, (_, row) => indexOf(row, col)),
    });
  }

  for (let boxRow = 0; boxRow < SIZE; boxRow += BOX) {
    for (let boxCol = 0; boxCol < SIZE; boxCol += BOX) {
      const cells = [];
      for (let row = boxRow; row < boxRow + BOX; row += 1) {
        for (let col = boxCol; col < boxCol + BOX; col += 1) {
          cells.push(indexOf(row, col));
        }
      }
      targets.push({ cells });
    }
  }

  cages.forEach((cage) => {
    if (cage.cells.length >= 2) targets.push({ cells: [...cage.cells] });
  });

  return targets;
}

function chooseLightningCells() {
  const targets = lightningTargets();
  if (!targets.length) return [];
  const selectedTargets = targets.filter((target) => target.cells.includes(selected));
  const targetCount = Math.max(1, adventureRuleConfig("lightning").lightningTargetCount || 1);
  const cells = new Set();
  for (let index = 0; index < targetCount; index += 1) {
    const pool = selectedTargets.length && random() < 0.6 ? selectedTargets : targets;
    pool[Math.floor(random() * pool.length)].cells.forEach((cell) => cells.add(cell));
  }
  return [...cells];
}

function clearLightningTimer() {
  if (lightningTimerId !== null) {
    window.clearTimeout(lightningTimerId);
    lightningTimerId = null;
  }
}

function resetLightning() {
  clearLightningTimer();
  lightningCells = [];
  lightningPhase = "idle";
}

function startLightningTimer(delay = adventureRuleConfig("lightning").lightningIntervalMs || 3200) {
  clearLightningTimer();
  if (!isLightningMode() || over || paused || blindIntroActive) return;
  lightningTimerId = window.setTimeout(beginLightningWarning, delay);
}

function beginLightningWarning() {
  if (!isLightningMode() || over || paused || blindIntroActive) return;
  lightningCells = chooseLightningCells();
  lightningPhase = "warning";
  render();
  const lightningConfig = adventureRuleConfig("lightning");
  const warnMs = lightningConfig.lightningWarnMs || 1400;
  const dangerMs = Math.min(lightningConfig.lightningDangerMs || 360, Math.max(0, warnMs - 120));
  if (dangerMs > 0 && warnMs > dangerMs + 80) {
    lightningTimerId = window.setTimeout(beginLightningDanger, warnMs - dangerMs);
  } else {
    lightningTimerId = window.setTimeout(strikeLightning, warnMs);
  }
}

function beginLightningDanger() {
  if (!isLightningMode() || over || paused || blindIntroActive) return;
  lightningPhase = "danger";
  render();
  lightningTimerId = window.setTimeout(strikeLightning, adventureRuleConfig("lightning").lightningDangerMs || 360);
}

function handleLightningHit() {
  if (!isLightningMode() || over) return;
  mistakes += 1;
  totalMistakes += 1;
  if (isRogueRunMode() && rogueRunActive) rogueRunTotalMistakes += 1;
  streak = 0;
  flashEffect(selected, "effect-lightning-hit", 650);
  showComboToast(t("lightningHit"), "combo-toast-lg", { forceFull: true });
  if (mistakes >= MAX_LIVES) {
    finish(false);
  } else {
    render();
  }
}

function strikeLightning() {
  if (!isLightningMode() || over || paused || blindIntroActive) return;
  lightningPhase = "strike";
  lightningCells.forEach((cell) => flashEffect(cell, "effect-lightning", 520));
  const hit = lightningCells.includes(selected);
  if (hit) handleLightningHit();
  if (over) return;
  render();
  lightningTimerId = window.setTimeout(() => {
    lightningCells = [];
    lightningPhase = "idle";
    render();
    startLightningTimer();
  }, adventureRuleConfig("lightning").lightningStrikeMs || 520);
}

function countSolutionsFor(puzzleValues, cageValues, limit = 2, deadline = Infinity) {
  const grid = [...puzzleValues];
  const rowMasks = Array(SIZE).fill(0);
  const colMasks = Array(SIZE).fill(0);
  const boxMasks = Array(SIZE).fill(0);
  const solverCages = cageValues.map((cage) => ({
    sum: cage.sum,
    cells: [...cage.cells],
    used: 0,
    total: 0,
    empty: cage.cells.length,
  }));
  const solverCellToCage = new Map();

  solverCages.forEach((cage, cageIndex) => {
    cage.cells.forEach((cell) => solverCellToCage.set(cell, cageIndex));
  });

  for (let cell = 0; cell < grid.length; cell += 1) {
    const value = grid[cell];
    if (value === EMPTY) continue;
    const bit = 1 << value;
    const row = rowOf(cell);
    const col = colOf(cell);
    const box = Math.floor(row / BOX) * BOX + Math.floor(col / BOX);
    const cage = solverCages[solverCellToCage.get(cell)];
    if ((rowMasks[row] & bit) || (colMasks[col] & bit) || (boxMasks[box] & bit) || (cage.used & bit)) return 0;
    rowMasks[row] |= bit;
    colMasks[col] |= bit;
    boxMasks[box] |= bit;
    cage.used |= bit;
    cage.total += value;
    cage.empty -= 1;
    if (cage.total > cage.sum) return 0;
  }

  if (solverCages.some((cage) => !cageCanStillMatch(cage))) return 0;

  let count = 0;
  let timedOut = false;
  let nodes = 0;

  const solve = () => {
    nodes += 1;
    if (count >= limit || timedOut) return;
    if (nodes % 128 === 0 && Date.now() > deadline) {
      timedOut = true;
      return;
    }
    let bestCell = -1;
    let bestCandidates = null;

    for (let cell = 0; cell < grid.length; cell += 1) {
      if (grid[cell] !== EMPTY) continue;
      const candidates = candidatesForCell(cell, grid, rowMasks, colMasks, boxMasks, solverCages, solverCellToCage);
      if (!candidates.length) return;
      if (bestCandidates === null || candidates.length < bestCandidates.length) {
        bestCell = cell;
        bestCandidates = candidates;
        if (candidates.length === 1) break;
      }
    }

    if (bestCell < 0) {
      count += 1;
      return;
    }

    const row = rowOf(bestCell);
    const col = colOf(bestCell);
    const box = Math.floor(row / BOX) * BOX + Math.floor(col / BOX);
    const cage = solverCages[solverCellToCage.get(bestCell)];

    bestCandidates.forEach((value) => {
      if (count >= limit) return;
      const bit = 1 << value;
      grid[bestCell] = value;
      rowMasks[row] |= bit;
      colMasks[col] |= bit;
      boxMasks[box] |= bit;
      cage.used |= bit;
      cage.total += value;
      cage.empty -= 1;

      if (cageCanStillMatch(cage)) solve();

      cage.empty += 1;
      cage.total -= value;
      cage.used &= ~bit;
      boxMasks[box] &= ~bit;
      colMasks[col] &= ~bit;
      rowMasks[row] &= ~bit;
      grid[bestCell] = EMPTY;
    });
  };

  solve();
  return timedOut ? limit : count;
}

function maskToDigits(mask) {
  const digits = [];
  for (let value = 1; value <= SIZE; value += 1) {
    if (mask & (1 << value)) digits.push(value);
  }
  return digits.join("");
}

function bitCount(mask) {
  let count = 0;
  let value = mask;
  while (value) {
    value &= value - 1;
    count += 1;
  }
  return count;
}

function makeSolverState(puzzleValues, cageValues) {
  const rowMasks = Array(SIZE).fill(0);
  const colMasks = Array(SIZE).fill(0);
  const boxMasks = Array(SIZE).fill(0);
  const solverCages = cageValues.map((cage) => ({
    sum: cage.sum,
    cells: [...cage.cells],
    used: 0,
    total: 0,
    empty: cage.cells.length,
  }));
  const solverCellToCage = new Map();

  solverCages.forEach((cage, cageIndex) => {
    cage.cells.forEach((cell) => solverCellToCage.set(cell, cageIndex));
  });

  for (let cell = 0; cell < puzzleValues.length; cell += 1) {
    const value = puzzleValues[cell];
    if (value === EMPTY) continue;
    const bit = 1 << value;
    const row = rowOf(cell);
    const col = colOf(cell);
    const box = Math.floor(row / BOX) * BOX + Math.floor(col / BOX);
    const cage = solverCages[solverCellToCage.get(cell)];
    rowMasks[row] |= bit;
    colMasks[col] |= bit;
    boxMasks[box] |= bit;
    cage.used |= bit;
    cage.total += value;
    cage.empty -= 1;
  }

  return { rowMasks, colMasks, boxMasks, solverCages, solverCellToCage };
}

function repeatedBoxPatternRisk(puzzleValues, cageValues) {
  const state = makeSolverState(puzzleValues, cageValues);
  const seen = new Map();

  for (let box = 0; box < SIZE; box += 1) {
    const boxRow = Math.floor(box / BOX) * BOX;
    const boxCol = (box % BOX) * BOX;
    const emptyCells = [];

    for (let rowOffset = 0; rowOffset < BOX; rowOffset += 1) {
      for (let colOffset = 0; colOffset < BOX; colOffset += 1) {
        const cell = indexOf(boxRow + rowOffset, boxCol + colOffset);
        if (puzzleValues[cell] === EMPTY) emptyCells.push(cell);
      }
    }

    if (emptyCells.length < 2 || emptyCells.length > 4) continue;

    let unionMask = 0;
    const cellSignatures = [];
    let hasSingleton = false;

    emptyCells.forEach((cell) => {
      const candidates = candidatesForCell(
        cell,
        puzzleValues,
        state.rowMasks,
        state.colMasks,
        state.boxMasks,
        state.solverCages,
        state.solverCellToCage
      );
      const mask = candidates.reduce((total, value) => total | (1 << value), 0);
      if (bitCount(mask) <= 1) hasSingleton = true;
      unionMask |= mask;

      const cage = state.solverCages[state.solverCellToCage.get(cell)];
      const localRow = rowOf(cell) % BOX;
      const localCol = colOf(cell) % BOX;
      cellSignatures.push(`${localRow}${localCol}:${maskToDigits(mask)}:${cage.sum - cage.total}:${cage.empty}`);
    });

    if (hasSingleton || bitCount(unionMask) !== emptyCells.length) continue;

    const signature = `${maskToDigits(unionMask)}|${cellSignatures.sort().join("|")}`;
    const previous = seen.get(signature);
    if (previous !== undefined) {
      const sameBand = Math.floor(previous / BOX) === Math.floor(box / BOX);
      const sameStack = previous % BOX === box % BOX;
      if (sameBand || sameStack) return true;
    }
    seen.set(signature, box);
  }

  return false;
}

function rowPairCageSwapRisk(puzzleValues, cageValues) {
  const state = makeSolverState(puzzleValues, cageValues);

  for (let topRow = 0; topRow < SIZE - 1; topRow += 1) {
    for (let bottomRow = topRow + 1; bottomRow < SIZE; bottomRow += 1) {
      const columns = [];
      let unionMask = 0;

      for (let col = 0; col < SIZE; col += 1) {
        const topCell = indexOf(topRow, col);
        const bottomCell = indexOf(bottomRow, col);
        if (puzzleValues[topCell] !== EMPTY || puzzleValues[bottomCell] !== EMPTY) continue;

        const topCageIndex = state.solverCellToCage.get(topCell);
        const bottomCageIndex = state.solverCellToCage.get(bottomCell);
        if (topCageIndex !== bottomCageIndex) continue;

        const cage = state.solverCages[topCageIndex];
        if (cage.cells.length !== 2 || !cage.cells.includes(topCell) || !cage.cells.includes(bottomCell)) continue;

        const topCandidates = candidatesForCell(
          topCell,
          puzzleValues,
          state.rowMasks,
          state.colMasks,
          state.boxMasks,
          state.solverCages,
          state.solverCellToCage
        );
        const bottomCandidates = candidatesForCell(
          bottomCell,
          puzzleValues,
          state.rowMasks,
          state.colMasks,
          state.boxMasks,
          state.solverCages,
          state.solverCellToCage
        );
        const mask = [...new Set([...topCandidates, ...bottomCandidates])]
          .reduce((total, value) => total | (1 << value), 0);

        if (bitCount(mask) < 2 || bitCount(mask) > 3) continue;
        columns.push({ col, mask, sum: cage.sum });
        unionMask |= mask;
      }

      if (columns.length < 3) continue;
      if (bitCount(unionMask) !== columns.length) continue;

      return true;
    }
  }

  return false;
}

function colPairCageSwapRisk(puzzleValues, cageValues) {
  const state = makeSolverState(puzzleValues, cageValues);

  for (let leftCol = 0; leftCol < SIZE - 1; leftCol += 1) {
    for (let rightCol = leftCol + 1; rightCol < SIZE; rightCol += 1) {
      const rows = [];
      let unionMask = 0;

      for (let row = 0; row < SIZE; row += 1) {
        const leftCell = indexOf(row, leftCol);
        const rightCell = indexOf(row, rightCol);
        if (puzzleValues[leftCell] !== EMPTY || puzzleValues[rightCell] !== EMPTY) continue;

        const leftCageIndex = state.solverCellToCage.get(leftCell);
        const rightCageIndex = state.solverCellToCage.get(rightCell);
        if (leftCageIndex !== rightCageIndex) continue;

        const cage = state.solverCages[leftCageIndex];
        if (cage.cells.length !== 2 || !cage.cells.includes(leftCell) || !cage.cells.includes(rightCell)) continue;

        const leftCandidates = candidatesForCell(
          leftCell,
          puzzleValues,
          state.rowMasks,
          state.colMasks,
          state.boxMasks,
          state.solverCages,
          state.solverCellToCage
        );
        const rightCandidates = candidatesForCell(
          rightCell,
          puzzleValues,
          state.rowMasks,
          state.colMasks,
          state.boxMasks,
          state.solverCages,
          state.solverCellToCage
        );
        const mask = [...new Set([...leftCandidates, ...rightCandidates])]
          .reduce((total, value) => total | (1 << value), 0);

        if (bitCount(mask) < 2 || bitCount(mask) > 3) continue;
        rows.push({ row, mask, sum: cage.sum });
        unionMask |= mask;
      }

      if (rows.length < 3) continue;
      if (bitCount(unionMask) !== rows.length) continue;

      return true;
    }
  }

  return false;
}

function candidateMaskForCell(cell, puzzleValues, state) {
  return candidatesForCell(
    cell,
    puzzleValues,
    state.rowMasks,
    state.colMasks,
    state.boxMasks,
    state.solverCages,
    state.solverCellToCage
  ).reduce((total, value) => total | (1 << value), 0);
}

function lineCandidateSignature(cells, puzzleValues, state, positionOf) {
  const open = cells
    .filter((cell) => puzzleValues[cell] === EMPTY)
    .map((cell) => ({
      cell,
      position: positionOf(cell),
      mask: candidateMaskForCell(cell, puzzleValues, state),
    }))
    .filter((entry) => bitCount(entry.mask) >= 2 && bitCount(entry.mask) <= 4);

  const riskEntries = [];

  for (let setMask = 0; setMask < (1 << 10); setMask += 1) {
    const setSize = bitCount(setMask);
    if (setSize < 2 || setSize > 4) continue;
    const members = open.filter((entry) => (entry.mask & setMask) === entry.mask);
    if (members.length !== setSize) continue;
    const unionMask = members.reduce((total, entry) => total | entry.mask, 0);
    if (unionMask !== setMask) continue;
    riskEntries.push(`${maskToDigits(setMask)}:${members.map((entry) => entry.position).sort((a, b) => a - b).join(",")}`);
  }

  return riskEntries;
}

function parallelLinePermutationRisk(puzzleValues, cageValues) {
  const state = makeSolverState(puzzleValues, cageValues);
  const seenRows = new Map();
  const seenCols = new Map();

  for (let row = 0; row < SIZE; row += 1) {
    const cells = Array.from({ length: SIZE }, (_, col) => indexOf(row, col));
    lineCandidateSignature(cells, puzzleValues, state, colOf).forEach((signature) => {
      const previous = seenRows.get(signature);
      if (previous !== undefined) {
        seenRows.set(signature, -1);
        return;
      }
      if (previous === undefined) seenRows.set(signature, row);
    });
  }
  if ([...seenRows.values()].includes(-1)) return true;

  for (let col = 0; col < SIZE; col += 1) {
    const cells = Array.from({ length: SIZE }, (_, row) => indexOf(row, col));
    lineCandidateSignature(cells, puzzleValues, state, rowOf).forEach((signature) => {
      const previous = seenCols.get(signature);
      if (previous !== undefined) {
        seenCols.set(signature, -1);
        return;
      }
      if (previous === undefined) seenCols.set(signature, col);
    });
  }
  if ([...seenCols.values()].includes(-1)) return true;

  return false;
}

function puzzlePatternRisk(puzzleValues, cageValues) {
  return repeatedBoxPatternRisk(puzzleValues, cageValues)
    || rowPairCageSwapRisk(puzzleValues, cageValues)
    || colPairCageSwapRisk(puzzleValues, cageValues)
    || parallelLinePermutationRisk(puzzleValues, cageValues);
}

function candidatesForCell(cell, grid, rowMasks, colMasks, boxMasks, solverCages, solverCellToCage) {
  void grid;
  const row = rowOf(cell);
  const col = colOf(cell);
  const box = Math.floor(row / BOX) * BOX + Math.floor(col / BOX);
  const cage = solverCages[solverCellToCage.get(cell)];
  const blocked = rowMasks[row] | colMasks[col] | boxMasks[box] | cage.used;
  const result = [];

  for (let value = 1; value <= SIZE; value += 1) {
    const bit = 1 << value;
    if (blocked & bit) continue;
    cage.total += value;
    cage.empty -= 1;
    if (cageCanStillMatch(cage)) result.push(value);
    cage.empty += 1;
    cage.total -= value;
  }

  return result;
}

function cageCanStillMatch(cage) {
  const remaining = cage.sum - cage.total;
  if (remaining < 0) return false;
  if (cage.empty === 0) return remaining === 0;

  const range = minMaxRemainingSum(cage.used, cage.empty);
  return range !== null && remaining >= range.min && remaining <= range.max;
}

function minMaxRemainingSum(usedMask, count) {
  const key = `${usedMask}:${count}`;
  if (MIN_MAX_SUM_CACHE.has(key)) return MIN_MAX_SUM_CACHE.get(key);

  let availableCount = 0;
  let min = 0;
  let max = 0;

  for (let value = 1; value <= SIZE; value += 1) {
    if (usedMask & (1 << value)) continue;
    availableCount += 1;
    if (availableCount <= count) min += value;
  }

  if (availableCount < count) {
    MIN_MAX_SUM_CACHE.set(key, null);
    return null;
  }

  let picked = 0;
  for (let value = SIZE; value >= 1 && picked < count; value -= 1) {
    if (usedMask & (1 << value)) continue;
    max += value;
    picked += 1;
  }

  const result = { min, max };
  MIN_MAX_SUM_CACHE.set(key, result);
  return result;
}

function puzzleDifficultyScore(puzzleValues, cageValues, strict = false) {
  const state = makeSolverState(puzzleValues, cageValues);
  const masks = Array(SIZE * SIZE).fill(0);
  let totalCandidates = 0;
  let singles = 0;
  let doubles = 0;
  let triples = 0;

  for (let cell = 0; cell < puzzleValues.length; cell += 1) {
    if (puzzleValues[cell] !== EMPTY) continue;
    const mask = candidateMaskForCell(cell, puzzleValues, state);
    masks[cell] = mask;
    const count = bitCount(mask);
    totalCandidates += count;
    if (count === 1) singles += 1;
    if (count === 2) doubles += 1;
    if (count === 3) triples += 1;
  }

  const unitHiddenSingles = (units) => {
    let count = 0;
    units.forEach((cells) => {
      for (let value = 1; value <= SIZE; value += 1) {
        const bit = 1 << value;
        const places = cells.filter((cell) => puzzleValues[cell] === EMPTY && (masks[cell] & bit));
        if (places.length === 1) count += 1;
      }
    });
    return count;
  };

  const rows = Array.from({ length: SIZE }, (_, row) => (
    Array.from({ length: SIZE }, (_, col) => indexOf(row, col))
  ));
  const cols = Array.from({ length: SIZE }, (_, col) => (
    Array.from({ length: SIZE }, (_, row) => indexOf(row, col))
  ));
  const boxes = Array.from({ length: SIZE }, (_, box) => {
    const startRow = Math.floor(box / BOX) * BOX;
    const startCol = (box % BOX) * BOX;
    return Array.from({ length: SIZE }, (_, offset) => (
      indexOf(startRow + Math.floor(offset / BOX), startCol + (offset % BOX))
    ));
  });
  const hiddenSingles = unitHiddenSingles(rows) + unitHiddenSingles(cols) + unitHiddenSingles(boxes);
  const twoCellCages = cageValues.filter((cage) => cage.cells.length === 2).length;
  const largeCages = cageValues.filter((cage) => cage.cells.length >= 4).length;
  const oneMoveSingles = strict ? oneMoveForcedSingles(puzzleValues, cageValues) : 0;

  const singlePenalty = strict ? 420 : 120;
  const hiddenSinglePenalty = strict ? 90 : 34;
  const doublePenalty = strict ? 12 : 5;
  const candidateWeight = strict ? 18 : 12;
  const twoCellPenalty = strict ? 45 : 1.5;
  const oneMovePenalty = strict ? 18 : 0;
  const excessTwoCellPenalty = strict ? Math.max(0, twoCellCages - 8) * 160 : 0;

  return totalCandidates * candidateWeight
    + triples * 4
    + largeCages * 18
    - singles * singlePenalty
    - hiddenSingles * hiddenSinglePenalty
    - doubles * doublePenalty
    - twoCellCages * twoCellPenalty
    - oneMoveSingles * oneMovePenalty
    - excessTwoCellPenalty
    + random();
}

function oneMoveForcedSingles(puzzleValues, cageValues) {
  let total = 0;
  let maxSingles = 0;

  for (let filledCell = 0; filledCell < puzzleValues.length; filledCell += 1) {
    if (puzzleValues[filledCell] !== EMPTY) continue;
    const testPuzzle = [...puzzleValues];
    testPuzzle[filledCell] = solution[filledCell];
    const state = makeSolverState(testPuzzle, cageValues);
    let singles = 0;

    for (let cell = 0; cell < testPuzzle.length; cell += 1) {
      if (testPuzzle[cell] !== EMPTY) continue;
      const count = bitCount(candidateMaskForCell(cell, testPuzzle, state));
      if (count === 1) singles += 1;
    }

    total += singles;
    maxSingles = Math.max(maxSingles, singles);
  }

  return total + maxSingles * 4;
}

function generateUniquePuzzle(config) {
  const totalDeadline = Date.now() + 3600;
  const maxAttempts = config.blanks >= 81 ? 120 : 80;
  const targetUnique = 2;
  let best = null;
  let uniqueCount = 0;

  const rememberCandidate = (candidatePuzzle, candidateCages) => {
    const scoreValue = puzzleDifficultyScore(candidatePuzzle, candidateCages);
    uniqueCount += 1;
    if (!best || scoreValue > best.score) {
      best = {
        score: scoreValue,
        solution: [...solution],
        puzzle: candidatePuzzle,
        cages: candidateCages,
      };
    }
  };

  for (let attempt = 0; attempt < maxAttempts && Date.now() < totalDeadline; attempt += 1) {
    solution = generateSolution();
    const candidatePuzzle = makePuzzle(config.blanks);
    const candidateCages = makeCages("extreme");
    const hasPatternRisk = puzzlePatternRisk(candidatePuzzle, candidateCages);
    if (hasPatternRisk) continue;
    const deadline = Math.min(totalDeadline, Date.now() + (config.blanks >= 81 ? 180 : 120));
    if (countSolutionsFor(candidatePuzzle, candidateCages, 2, deadline) === 1) {
      rememberCandidate(candidatePuzzle, candidateCages);
      if (uniqueCount >= targetUnique || Date.now() > totalDeadline - 1100) break;
    }
  }

  if (!best) {
    for (;;) {
      solution = generateSolution();
      const candidatePuzzle = makePuzzle(config.blanks);
      const candidateCages = makeCages();
      if (puzzlePatternRisk(candidatePuzzle, candidateCages)) continue;
      if (countSolutionsFor(candidatePuzzle, candidateCages, 2, Date.now() + 1500) === 1) {
        rememberCandidate(candidatePuzzle, candidateCages);
        break;
      }
    }
  }

  solution = best.solution;
  puzzle = best.puzzle;
  cages = best.cages;
}

function generateCageOnlyUniquePuzzle(config) {
  const totalDeadline = Date.now() + 4600;
  const maxAttempts = 140;
  const emptyPuzzle = Array(SIZE * SIZE).fill(EMPTY);
  let best = null;
  let uniqueCount = 0;

  const rememberCandidate = (candidatePuzzle, candidateCages) => {
    const scoreValue = puzzleDifficultyScore(candidatePuzzle, candidateCages, true);
    uniqueCount += 1;
    if (!best || scoreValue > best.score) {
      best = {
        score: scoreValue,
        solution: [...solution],
        puzzle: candidatePuzzle,
        cages: candidateCages,
      };
    }
  };

  for (let attempt = 0; attempt < maxAttempts && Date.now() < totalDeadline; attempt += 1) {
    solution = generateSolution();
    const candidateCages = makeCages("extreme");
    if (puzzlePatternRisk(emptyPuzzle, candidateCages)) continue;
    const deadline = Math.min(totalDeadline, Date.now() + 190);
    if (countSolutionsFor(emptyPuzzle, candidateCages, 2, deadline) !== 1) continue;

    const candidatePuzzle = makePuzzle(config.blanks);
    rememberCandidate(candidatePuzzle, candidateCages);
    if (uniqueCount >= 2 || Date.now() > totalDeadline - 1100) break;
  }

  if (!best) {
    generateUniquePuzzle({ ...config, blanks: 81 });
    puzzle = makePuzzle(config.blanks);
    return;
  }

  solution = best.solution;
  puzzle = best.puzzle;
  cages = best.cages;
}

function generateLoosePuzzle(config) {
  const totalDeadline = Date.now() + 2200;
  const maxAttempts = 120;
  let best = null;

  for (let attempt = 0; attempt < maxAttempts && Date.now() < totalDeadline; attempt += 1) {
    solution = generateSolution();
    const candidatePuzzle = makePuzzle(config.blanks);
    const candidateCages = makeCages();
    const scoreValue = puzzleDifficultyScore(candidatePuzzle, candidateCages, true);
    if (!best || scoreValue > best.score) {
      best = {
        score: scoreValue,
        solution: [...solution],
        puzzle: candidatePuzzle,
        cages: candidateCages,
      };
    }
  }

  if (!best) {
    solution = generateSolution();
    best = {
      solution: [...solution],
      puzzle: makePuzzle(config.blanks),
      cages: makeCages("extreme"),
    };
  }

  solution = best.solution;
  puzzle = best.puzzle;
  cages = best.cages;
}

function placeItems(itemCount) {
  const shuffleLimit = ["veryHard", "extreme"].includes(currentDifficulty) ? 2 : 1;
  const includeShuffle = selectedItemTypes.has("shuffle");
  const allowedTypes = ITEM_TYPES.filter((type) => (
    selectedItemTypes.has(type) && type !== "shuffle"
  ));
  if (!allowedTypes.length && !includeShuffle) return new Map();
  const candidates = puzzle.map((value, index) => (value === EMPTY ? index : -1)).filter((index) => index >= 0);
  const available = shuffle(candidates);
  const map = new Map();
  const hintCages = new Set();
  const preferredPattern = ["hint", "mine", "hint", "heart"];
  const itemPattern = preferredPattern.filter((type) => selectedItemTypes.has(type));

  const takeCell = (type) => {
    const index = available.findIndex((cell) => (
      type !== "hint" || !hintCages.has(cellToCage.get(cell))
    ));
    if (index < 0) return null;
    const [cell] = available.splice(index, 1);
    if (type === "hint") hintCages.add(cellToCage.get(cell));
    return cell;
  };

  for (let i = 0; map.size < itemCount && available.length && i < itemCount * 4; i += 1) {
    const type = itemPattern[i % itemPattern.length];
    const cell = takeCell(type);
    if (cell === null) continue;
    map.set(cell, type);
  }

  for (let i = 0; map.size < itemCount && available.length && i < itemCount * Math.max(1, allowedTypes.length) * 4; i += 1) {
    const fallbackTypes = allowedTypes.filter((type) => type !== "hint");
    const typePool = fallbackTypes.length ? fallbackTypes : allowedTypes;
    const type = typePool[i % typePool.length];
    const cell = takeCell(type);
    if (cell !== null) map.set(cell, type);
  }

  if (includeShuffle) {
    for (let i = 0; i < shuffleLimit && available.length; i += 1) {
      const cell = takeCell("shuffle");
      if (cell !== null) map.set(cell, "shuffle");
    }
  }

  return map;
}

function emptyCells() {
  return puzzle.map((value, index) => (value === EMPTY ? index : -1)).filter((index) => index >= 0);
}

function placeAllItems(type) {
  return new Map(emptyCells().map((cell) => [cell, type]));
}

function placeRandomItems(type, count) {
  return new Map(shuffle(emptyCells()).slice(0, count).map((cell) => [cell, type]));
}

function placeBalancedAdventureItems(count) {
  const candidates = shuffle(emptyCells());
  const map = new Map();
  const pattern = ["hint", "mine", "heart", "hint", "mine", "heart"];
  for (let index = 0; map.size < count && index < candidates.length; index += 1) {
    map.set(candidates[index], pattern[index % pattern.length]);
  }
  return map;
}

function countItemsOfType(map, type) {
  return [...map.values()].filter((itemType) => itemType === type).length;
}

function ensureItemTypeCount(map, type, targetCount, options = {}) {
  const preserveTypes = new Set(options.preserveTypes || []);
  const currentCount = () => countItemsOfType(map, type);
  shuffle([...map.keys()].filter((cell) => map.get(cell) !== type && !preserveTypes.has(map.get(cell)))).forEach((cell) => {
    if (currentCount() >= targetCount) return;
    map.set(cell, type);
  });
  shuffle(emptyCells()).forEach((cell) => {
    if (currentCount() >= targetCount) return;
    if (!map.has(cell)) map.set(cell, type);
  });
}

function addRogueStockItems(map, type, count) {
  if (count <= 0) return;
  shuffle(emptyCells()).forEach((cell) => {
    if (count <= 0) return;
    if (map.has(cell)) return;
    map.set(cell, type);
    count -= 1;
  });
}

function rogueShuffleTargetCount() {
  let count = 0;
  if (hasRogueAbility("shuffleEasy")) count = Math.max(count, Math.min(2, rogueAbilityCount("shuffleEasy")));
  count += rogueAbilityCount("shuffleStock") * 2;
  return count;
}

function rogueStockTargetCount(type) {
  if (type === "heart") return rogueAbilityCount("heartStock") * 2;
  if (type === "hint") return rogueAbilityCount("hintStock") * 2;
  if (type === "shuffle") return rogueShuffleTargetCount();
  return 0;
}

function placeRogueItems(stage) {
  const plan = currentRogueStagePlan();
  const map = placeBalancedAdventureItems(plan?.itemCount || stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  const targetMines = plan?.initialMines || 0;
  if (targetMines > 0) ensureItemTypeCount(map, "mine", targetMines);
  addRogueStockItems(map, "heart", rogueStockTargetCount("heart"));
  addRogueStockItems(map, "hint", rogueStockTargetCount("hint"));
  addRogueStockItems(map, "shuffle", rogueStockTargetCount("shuffle"));
  return map;
}

function placeMineSearchItems(stage) {
  const candidates = shuffle(emptyCells());
  const map = new Map();
  const mineCount = stage.mineCount || 12;
  const hintCount = stage.hintCount || 9;
  candidates.slice(0, mineCount).forEach((cell) => {
    map.set(cell, "mine");
  });
  candidates.slice(mineCount, mineCount + hintCount).forEach((cell) => {
    map.set(cell, "hint");
  });
  return map;
}

function placeAdventureItems(stage) {
  if (stage.itemMode === "allHint") return placeAllItems("hint");
  if (stage.itemMode === "allHeart") return placeAllItems("heart");
  if (stage.itemMode === "growingMines") return placeRandomItems("mine", stage.initialMines || 8);
  if (stage.itemMode === "blind") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "mineSearch") return placeMineSearchItems(stage);
  if (stage.itemMode === "heartbeat") return placeHeartbeatItems(stage.itemCount || 16);
  if (stage.itemMode === "patrol") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "bomber") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "cageEater") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "numberClimb") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "sleeper") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "jammer") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "chaser") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "striker") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "lightning") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "shiftingCages") return placeBalancedAdventureItems(stage.itemCount || DIFFICULTIES[stage.difficulty].itemCount);
  if (stage.itemMode === "rogueRun") return placeRogueItems(stage);
  return placeItems(DIFFICULTIES[stage.difficulty].itemCount);
}

function placeHeartbeatItems(itemCount) {
  const map = new Map();
  const cells = shuffle(emptyCells());
  const pattern = ["heart", "heart", "hint", "heart", "mine"];
  for (let index = 0; index < itemCount && index < cells.length; index += 1) {
    map.set(cells[index], pattern[index % pattern.length]);
  }
  return map;
}

function prepareIntroStartCell() {
  const state = makeSolverState(puzzle, cages);
  const immediate = puzzle
    .map((value, index) => (value === EMPTY ? index : -1))
    .filter((index) => index >= 0)
    .find((cell) => bitCount(candidateMaskForCell(cell, puzzle, state)) === 1);
  if (immediate !== undefined) return immediate;

  const cage = cages
    .filter((entry) => entry.cells.length >= 2 && entry.cells.length <= 3)
    .map((entry) => ({
      cage: entry,
      emptyCells: entry.cells.filter((cell) => puzzle[cell] === EMPTY),
    }))
    .filter((entry) => entry.emptyCells.length >= 2)
    .sort((a, b) => a.emptyCells.length - b.emptyCells.length)[0];

  if (!cage) return puzzle.findIndex((value) => value === EMPTY);

  const target = cage.emptyCells[0];
  cage.emptyCells.slice(1).forEach((cell) => {
    puzzle[cell] = solution[cell];
  });
  return target;
}

function placeIntroItems(itemCount, firstHintCell = null) {
  const map = new Map();
  const reserved = new Set();
  const hintCages = new Set();
  const emptyCells = puzzle.map((value, index) => (value === EMPTY ? index : -1)).filter((index) => index >= 0);

  const scoreCell = (cell, type) => {
    const around = surroundingCells(cell);
    if (type === "hint") return around.filter((target) => entries[target] === EMPTY).length;
    if (type === "mine") return around.filter((target) => entries[target] !== EMPTY).length;
    return around.filter((target) => entries[target] === EMPTY).length * 0.5 + 1;
  };

  const takeBest = (type) => {
    const candidates = emptyCells
      .filter((cell) => !reserved.has(cell))
      .filter((cell) => type !== "hint" || !hintCages.has(cellToCage.get(cell)))
      .map((cell) => ({ cell, score: scoreCell(cell, type) }))
      .sort((a, b) => b.score - a.score);
    if (!candidates.length) return null;
    const cell = candidates[0].cell;
    reserved.add(cell);
    if (type === "hint") hintCages.add(cellToCage.get(cell));
    return cell;
  };

  if (firstHintCell !== null && emptyCells.includes(firstHintCell)) {
    reserved.add(firstHintCell);
    hintCages.add(cellToCage.get(firstHintCell));
    map.set(firstHintCell, "hint");
  }

  ["hint", "heart", "mine", "shuffle"].forEach((type) => {
    const cell = takeBest(type);
    if (cell !== null) map.set(cell, type);
  });

  const pattern = ["hint", "mine", "hint", "heart", "shuffle"];
  for (let index = 0; map.size < itemCount && index < itemCount * 5; index += 1) {
    const type = pattern[index % pattern.length];
    const cell = takeBest(type);
    if (cell !== null) map.set(cell, type);
  }

  return map;
}

function renderBoard() {
  const selectedCageId = cellToCage.get(selected);
  const blindMode = currentAdventureMode() === "blind";
  const showPlayerMarker = Boolean(currentAdventureStage) && !blindIntroActive;
  const matchingNumber = blindMode ? null : highlightNumber();
  const patrolCells = currentPatrolCells();
  const patrolCellSet = new Set(patrolCells);
  const patrolBlockedCellSet = new Set(patrolBlockedCellsFor(patrolCells));
  const patrolNextSet = new Set(nextPatrolCells(patrolBlockedCellSet));
  const bomberCells = currentBomberCells();
  const bomberIndexByCell = new Map(bomberCells
    .map((cell, index) => [cell, index])
    .filter(([cell]) => cell !== null));
  const bomberNextSet = new Set(nextBomberCells().filter((cell) => cell !== null));
  const cageEaterActive = isCageEaterMode();
  const chaserCurrent = currentChaserCell();
  const chaserNext = nextChaserCell();
  const chaserStunned = isChaserStunned();
  const strikerCurrent = isStrikerMode() ? strikerCell : null;
  const strikerNext = nextStrikerCell();
  const strikerStunned = isStrikerStunned();
  const lightningSet = new Set(isLightningMode() ? lightningCells : []);
  const bomberLimit = cageEaterActive
    ? adventureRuleConfig("cageEater").eaterLimit || 4
    : adventureRuleConfig("bomber").bomberLimit || 4;
  const bomberDefuseCells = new Set(bomberCells.flatMap((cell, index) => (
    cell !== null && (bomberHeats[index] || 0) >= bomberLimit - 1
      ? surroundingCells(cell).filter((target) => puzzle[target] === EMPTY && entries[target] === EMPTY)
      : []
  )));
  normalizeSleeperBlocks();
  boardEl.innerHTML = "";
  boardEl.classList.toggle("blind-intro", blindMode && blindIntroActive);
  boardEl.append(renderCageOverlay());
  boardEl.append(renderGridOverlay());

  entries.forEach((value, index) => {
    const cell = document.createElement("button");
    const jammed = isJammedCell(index);
    const cageId = cellToCage.get(index);
    const wrongEntry = isWrongEntry(index);
    const canRevealCellInfo = (!blindMode || blindIntroActive || index === selected) && (!jammed || wrongEntry);
    cell.className = "cell";
    cell.type = "button";
    cell.dataset.index = index;
    cell.setAttribute("aria-label", t("rowColAria", { row: rowOf(index) + 1, col: colOf(index) + 1 }));

    if (puzzle[index] !== EMPTY) cell.classList.add("given");
    if (jammed) cell.classList.add("jammed-cell");
    if (jammed && value !== EMPTY && !wrongEntry) cell.classList.add("jammed-filled");
    if (wrongEntry) cell.classList.add("wrong-entry");
    if (blindMode && !blindIntroActive && value !== EMPTY) cell.classList.add("blind-filled");
    const risk = value !== EMPTY ? mineSearchRisk(index) : 0;
    if (risk > 0) cell.classList.add(`mine-risk-${Math.min(4, risk)}`);
    if (index === selected) {
      cell.classList.add("selected");
      if (showPlayerMarker && remainingLives() === 1) cell.classList.add("player-low-life");
    }
    if (!blindMode && isRelated(index, selected) && index !== selected) cell.classList.add("related");
    if (!blindMode && cellToCage.get(index) === selectedCageId && index !== selected) cell.classList.add("selected-cage");
    if (!jammed && matchingNumber && value === matchingNumber && index !== selected) cell.classList.add("same-number");
    if (patrolBlockedCellSet.has(index)) cell.classList.add("patrol-blocked");
    if (patrolNextSet.has(index)) cell.classList.add("patrol-next");
    if (bomberIndexByCell.has(index)) {
      const bomberIndex = bomberIndexByCell.get(index);
      cell.classList.add(
        cageEaterActive ? "cage-eater-blocked" : "bomber-blocked",
        `${cageEaterActive ? "cage-eater" : "bomber"}-heat-${Math.min(3, bomberHeats[bomberIndex] || 0)}`
      );
    }
    if (bomberNextSet.has(index)) cell.classList.add(cageEaterActive ? "cage-eater-next" : "bomber-next");
    if (index === chaserCurrent) cell.classList.add("chaser-blocked", chaserStunned ? "chaser-stunned" : "chaser-active");
    if (index === chaserNext) cell.classList.add("chaser-next");
    if (index === strikerCurrent) {
      cell.classList.add("striker-blocked", strikerStunned ? "striker-stunned" : "striker-active");
      if (strikerDirection?.row !== 0) cell.classList.add("striker-vertical");
      if (strikerDirection?.col < 0) cell.classList.add("striker-left");
      if (strikerDirection?.row < 0) cell.classList.add("striker-up");
    }
    if (index === strikerNext) cell.classList.add("striker-next");
    if (lightningSet.has(index)) {
      cell.classList.add(lightningPhase === "strike"
        ? "lightning-strike"
        : lightningPhase === "danger" ? "lightning-danger" : "lightning-warning");
    }
    if (bomberDefuseCells.has(index)) cell.classList.add(cageEaterActive ? "cage-eater-defuse-zone" : "bomber-defuse-zone");
    if (sleeperBlockedCells.has(index)) {
      const blockedTurns = sleeperBlockedTurns.get(index) || sleeperBlockTurns || 1;
      cell.classList.add("sleeper-blocked-zone", `sleeper-blocked-turn-${Math.max(1, Math.min(3, blockedTurns))}`);
    }
    if (effects.has(index)) cell.classList.add(effects.get(index));
    if (notes.has(index) && value === EMPTY && canRevealCellInfo) cell.classList.add("has-pencil-notes");

    const sum = cageStarts.get(index);
    if (sum && !isJammedCage(cageId)) {
      const label = document.createElement("span");
      label.className = "cage-sum";
      label.textContent = sum;
      cell.append(label);
    }

    const item = items.get(index);
    if (item && item !== "mine" && !usedItems.has(index) && (entries[index] === EMPTY || isWrongEntry(index))) {
      cell.classList.add("item", `item-${item}`);
      cell.title = itemLabel(item);
      const marker = document.createElement("span");
      marker.className = `item-icon item-icon-${item}`;
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (value !== EMPTY && canRevealCellInfo) {
      const digit = document.createElement("span");
      digit.className = "digit";
      digit.textContent = value;
      cell.append(digit);
    }

    if (hinted.has(index) && value === EMPTY && canRevealCellInfo) {
      if (item === "mine" && !usedItems.has(index)) {
        const mineMarker = document.createElement("span");
        mineMarker.className = "hint-mine-marker";
        mineMarker.setAttribute("aria-hidden", "true");
        cell.append(mineMarker);
      }

      if (!isMineSearchMode() || item !== "mine") {
        const notes = document.createElement("span");
        notes.className = "notes";
        notes.textContent = hinted.get(index).join("");
        cell.append(notes);
      }
    } else if (notes.has(index) && value === EMPTY && canRevealCellInfo) {
      const pencil = document.createElement("span");
      pencil.className = "pencil-notes";
      const values = notes.get(index);
      for (let note = 1; note <= SIZE; note += 1) {
        const mark = document.createElement("span");
        const completed = entries.filter((value, index) => value === note && value === solution[index]).length >= SIZE;
        mark.textContent = values.has(note) && !completed ? note : "";
        pencil.append(mark);
      }
      cell.append(pencil);
    }

    if (isMineSearchMode() && mineNotes.has(index) && value === EMPTY) {
      const marker = document.createElement("span");
      marker.className = "mine-note-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (isJammedCage(cageId) && index === jammerMarkerCellFor(cageId)) {
      const marker = document.createElement("span");
      marker.className = "jammer-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (patrolCellSet.has(index)) {
      const marker = document.createElement("span");
      marker.className = "patrol-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (bomberIndexByCell.has(index)) {
      const marker = document.createElement("span");
      marker.className = cageEaterActive ? "cage-eater-marker" : "bomber-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (index === chaserCurrent) {
      const marker = document.createElement("span");
      marker.className = "chaser-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (index === strikerCurrent) {
      const marker = document.createElement("span");
      marker.className = "striker-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (sleeperCells.includes(index) && entries[index] === EMPTY) {
      const marker = document.createElement("span");
      marker.className = "sleeper-marker";
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    if (showPlayerMarker && index === selected) {
      const marker = document.createElement("span");
      marker.className = `player-marker${remainingLives() === 1 ? " player-marker-danger" : ""}`;
      marker.setAttribute("aria-hidden", "true");
      cell.append(marker);
    }

    boardEl.append(cell);
  });
}

function selectBoardCell(index) {
  if (blindIntroActive || index < 0 || index >= CELL_COUNT) return;
  selected = index;
  if (checkStrikerCollision()) return;
  render();
}

function renderGridOverlay() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("grid-overlay");
  svg.setAttribute("viewBox", "0 0 900 900");
  svg.setAttribute("aria-hidden", "true");

  for (let line = 0; line <= SIZE; line += 1) {
    const position = line * 100;
    const lineType = line % BOX === 0 ? "grid-line-heavy" : "grid-line";
    [
      `M ${position} 0 L ${position} 900`,
      `M 0 ${position} L 900 ${position}`,
    ].forEach((pathData) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);
      path.classList.add(lineType);
      svg.append(path);
    });
  }

  return svg;
}

function renderCageOverlay() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("cage-overlay");
  svg.setAttribute("viewBox", "0 0 900 900");
  svg.setAttribute("aria-hidden", "true");

  const cageGeometry = makeInsetCageGeometry();
  cageGeometry.paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.classList.add("cage-path");
    svg.append(path);
  });

  cageGeometry.corners.forEach((pathData) => {
    const corner = document.createElementNS("http://www.w3.org/2000/svg", "path");
    corner.setAttribute("d", pathData);
    corner.classList.add("cage-corner-mark");
    svg.append(corner);
  });

  return svg;
}

function makeInsetCageGeometry() {
  const paths = [];
  const corners = new Map();
  const inset = 8;

  const addCorner = (x, y, horizontalDirection, verticalDirection) => {
    const length = 9;
    const key = `${x},${y},${horizontalDirection},${verticalDirection}`;
    corners.set(key, `M ${x} ${y} L ${x + horizontalDirection * length} ${y} M ${x} ${y} L ${x} ${y + verticalDirection * length}`);
  };

  const addPath = (x1, y1, x2, y2) => {
    paths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
  };

  const addHorizontalRuns = (segments, y) => {
    let start = null;
    for (let col = 0; col <= SIZE; col += 1) {
      const active = col < SIZE && segments[col];
      if (active && start === null) start = col;
      if ((!active || col === SIZE) && start !== null) {
        addPath(start * 100 + inset, y, col * 100 - inset, y);
        start = null;
      }
    }
  };

  const addVerticalRuns = (segments, x) => {
    let start = null;
    for (let row = 0; row <= SIZE; row += 1) {
      const active = row < SIZE && segments[row];
      if (active && start === null) start = row;
      if ((!active || row === SIZE) && start !== null) {
        addPath(x, start * 100 + inset, x, row * 100 - inset);
        start = null;
      }
    }
  };

  cages.forEach((cage) => {
    const cageCells = new Set(cage.cells);

    for (let row = 0; row < SIZE; row += 1) {
      const top = Array(SIZE).fill(false);
      const bottom = Array(SIZE).fill(false);
      for (let col = 0; col < SIZE; col += 1) {
        const cell = indexOf(row, col);
        if (!cageCells.has(cell)) continue;
        if (row === 0 || !cageCells.has(indexOf(row - 1, col))) top[col] = true;
        if (row === SIZE - 1 || !cageCells.has(indexOf(row + 1, col))) bottom[col] = true;
      }
      addHorizontalRuns(top, row * 100 + inset);
      addHorizontalRuns(bottom, (row + 1) * 100 - inset);
    }

    for (let col = 0; col < SIZE; col += 1) {
      const left = Array(SIZE).fill(false);
      const right = Array(SIZE).fill(false);
      for (let row = 0; row < SIZE; row += 1) {
        const cell = indexOf(row, col);
        if (!cageCells.has(cell)) continue;
        if (col === 0 || !cageCells.has(indexOf(row, col - 1))) left[row] = true;
        if (col === SIZE - 1 || !cageCells.has(indexOf(row, col + 1))) right[row] = true;
      }
      addVerticalRuns(left, col * 100 + inset);
      addVerticalRuns(right, (col + 1) * 100 - inset);
    }

    for (let row = 1; row < SIZE; row += 1) {
      for (let col = 1; col < SIZE; col += 1) {
        const tl = cageCells.has(indexOf(row - 1, col - 1));
        const tr = cageCells.has(indexOf(row - 1, col));
        const bl = cageCells.has(indexOf(row, col - 1));
        const br = cageCells.has(indexOf(row, col));
        const count = [tl, tr, bl, br].filter(Boolean).length;
        if (count !== 3) continue;

        const x = col * 100;
        const y = row * 100;
        if (!tl) addCorner(x + inset, y + inset, -1, -1);
        if (!tr) addCorner(x - inset, y + inset, 1, -1);
        if (!bl) addCorner(x + inset, y - inset, -1, 1);
        if (!br) addCorner(x - inset, y - inset, 1, 1);
      }
    }
  });

  return {
    paths,
    corners: [...corners.values()],
  };
}

function renderPad() {
  padEl.innerHTML = "";
  for (let number = 1; number <= 9; number += 1) {
    const solved = entries.filter((value, index) => value === number && value === solution[index]).length >= SIZE;
    const lockedByMineNote = noteMode && mineNotes.has(selected);
    const noted = notes.get(selected)?.has(number);
    const button = document.createElement("button");
    button.className = solved ? "number-button number-button-complete" : "number-button";
    const climbLocked = isNumberClimbMode() && !noteMode && number < numberClimbMinimumAllowed();
    if (climbLocked) button.classList.add("number-button-climb-locked");
    if (noted) button.classList.add(noteMode ? "number-button-noted" : "number-button-candidate");
    button.type = "button";
    button.textContent = number;
    button.disabled = solved || blindIntroActive || lockedByMineNote || climbLocked;
    button.setAttribute("aria-label", solved ? t("allEntered", { n: number }) : t("enterNumber", { n: number }));
    button.addEventListener("click", () => enterNumber(number));
    padEl.append(button);
  }
}

function renderLegend() {
  legendEntries.forEach((entry) => {
    const type = entry.dataset.item;
    const total = [...items.values()].filter((item) => item === type).length;
    const used = [...items.entries()].filter(([cell, item]) => item === type && usedItems.has(cell)).length;
    const label = entry.querySelector("span:not(.legend-icon)");
    const count = entry.querySelector(".legend-count") || document.createElement("em");
    if (label) {
      const help = type === "mine" && isMineSearchMode()
        ? t("mineSearchMineHelp")
        : type === "heart" && isHeartbeatMode() ? `${itemHelp(type)} / ${t("heartTimeHelp")}` : itemHelp(type);
      label.innerHTML = `<strong>${itemLabel(type)}</strong>${help}`;
    }
    count.className = "legend-count";
    count.textContent = `${t("remaining")} ${Math.max(0, total - used)}/${total}`;
    entry.classList.toggle("legend-entry-disabled", total === 0 || (!currentAdventureStage && !selectedItemTypes.has(type)));
    entry.classList.toggle("legend-entry-action", type === "mine" && canUseMineNote(selected));
    entry.classList.toggle("legend-entry-noted", type === "mine" && mineNotes.has(selected));
    if (!count.parentElement) entry.append(count);
  });
}

function renderDifficultyChoices() {
  difficultyList.innerHTML = "";

  const normalHeading = document.createElement("div");
  normalHeading.className = "menu-section-title";
  normalHeading.textContent = t("normalPlaySection");
  difficultyList.append(normalHeading);

  const dailyButton = document.createElement("button");
  dailyButton.className = `daily-toggle${dailyChallenge ? " is-active" : ""}`;
  dailyButton.type = "button";
  dailyButton.innerHTML = `<strong>${t("dailyChallenge")}</strong><span class="daily-date">${todayLabel()}</span><small>${dailyChallenge ? t("dailyOn") : t("dailyOff")}</small>`;
  dailyButton.addEventListener("click", () => {
    dailyChallenge = !dailyChallenge;
    renderDifficultyChoices();
  });
  difficultyList.append(dailyButton);

  Object.entries(DIFFICULTIES).forEach(([key, config]) => {
    const button = document.createElement("button");
    button.className = "difficulty-button";
    button.type = "button";
    const note = key === "extreme"
      ? `<small>${t("extremeNote")}</small>`
      : "";
    button.innerHTML = `<strong>${difficultyLabel(key)}</strong><span>${difficultyChoiceText(key)}${note}</span>`;
    button.addEventListener("click", () => {
      void newGame(key);
    });
    difficultyList.append(button);
  });

  const specialHeading = document.createElement("div");
  specialHeading.className = "menu-section-title";
  specialHeading.textContent = t("specialPlaySection");
  difficultyList.append(specialHeading);

  const routeGrid = document.createElement("div");
  routeGrid.className = "play-route-grid";

  const adventureButton = document.createElement("button");
  adventureButton.className = "difficulty-button adventure-button adventure-gateway play-route-button";
  adventureButton.type = "button";
  adventureButton.innerHTML = `<strong>${t("adventureOpen")}</strong><span>${t("adventureOpenHelp")}</span>`;
  adventureButton.addEventListener("click", showAdventureDialog);
  routeGrid.append(adventureButton);

  const rogueButton = document.createElement("button");
  rogueButton.className = "difficulty-button rogue-run-gateway play-route-button";
  rogueButton.type = "button";
  rogueButton.innerHTML = `<strong>${t("chainPlayOpen")}</strong><span>${t("chainPlayOpenHelp")}</span>`;
  rogueButton.addEventListener("click", () => {
    void startRogueRun();
  });
  routeGrid.append(rogueButton);

  difficultyList.append(routeGrid);

  renderDailyHistory();
}

function renderAdventureChoices() {
  adventureList.innerHTML = "";
  if (adventurePracticeInput) adventurePracticeInput.checked = adventurePracticeEnabled;
  const bestTimes = readBestTimes();
  const bestScores = readBestScores();
  [
    ["hintRain", t("adventureHintRain"), t("adventureHintRainHelp")],
    ["heartRush", t("adventureHeartRush"), t("adventureHeartRushHelp")],
    ["growingMines", t("adventureGrowingMines"), t("adventureGrowingMinesHelp")],
    ["blind", t("adventureBlind"), t("adventureBlindHelp")],
    ["mineSearch", t("adventureMineSearch"), t("adventureMineSearchHelp")],
    ["heartbeat", t("adventureHeartbeat"), t("adventureHeartbeatHelp")],
    ["shiftingCages", t("adventureShiftingCages"), t("adventureShiftingCagesHelp")],
    ["patrol", t("adventurePatrol"), t("adventurePatrolHelp")],
    ["bomber", t("adventureBomber"), t("adventureBomberHelp")],
    ["cageEater", t("adventureCageEater"), t("adventureCageEaterHelp")],
    ["numberClimb", t("adventureNumberClimb"), t("adventureNumberClimbHelp")],
    ["sleeper", t("adventureSleeper"), t("adventureSleeperHelp")],
    ["jammer", t("adventureJammer"), t("adventureJammerHelp")],
    ["chaser", t("adventureChaser"), t("adventureChaserHelp")],
    ["striker", t("adventureStriker"), t("adventureStrikerHelp")],
    ["lightning", t("adventureLightning"), t("adventureLightningHelp")],
  ].forEach(([key, title, help]) => {
    const button = document.createElement("button");
    button.className = "difficulty-button adventure-button";
    button.type = "button";
    const recordSummary = recordSummaryFromStores(`adventure:${key}`, bestTimes, bestScores);
    const statusText = adventurePracticeEnabled
      ? t("adventurePracticeBadge")
      : recordSummary ? `${t("cleared")} ${recordSummary}` : "";
    const statusClass = adventurePracticeEnabled ? "practice-badge" : "clear-badge";
    const statusHidden = statusText ? "" : " is-empty";
    const description = help.split(" / ")[0];
    const stageTimeLimitMs = ADVENTURE_STAGES[key]?.timeLimitMs || null;
    const timeLimit = adventurePracticeEnabled || !stageTimeLimitMs
      ? t("adventureCardNoTimeLimit")
      : t("adventureCardTimeLimit", { n: Math.round(stageTimeLimitMs / 60000) });
    button.innerHTML = `<span class="adventure-card-title"><strong>${title}</strong><small class="adventure-card-status ${statusClass}${statusHidden}">${statusText || t("adventurePracticeBadge")}</small></span><span class="adventure-card-copy"><b>${description}</b><small>${timeLimit}</small></span>`;
    button.addEventListener("click", () => {
      void startAdventureStage(key);
    });
    adventureList.append(button);
  });
}

function renderItemPicker() {
  itemPicker.querySelectorAll(".item-toggle").forEach((element) => element.remove());

  ITEM_TYPES.forEach((type) => {
    const label = document.createElement("label");
    label.className = "item-toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = selectedItemTypes.has(type);
    input.addEventListener("change", () => {
      if (input.checked) {
        selectedItemTypes.add(type);
      } else {
        selectedItemTypes.delete(type);
      }
      saveSelectedItemTypes();
      renderLegend();
      renderItemPicker();
      renderDifficultyChoices();
    });

    const text = document.createElement("span");
    text.innerHTML = `<strong>${itemLabel(type)}</strong>`;
    label.append(input, text);
    itemPicker.append(label);
  });
}

function difficultyHelp(key) {
  return TEXT[LOCALE].difficultyHelp[key] ?? TEXT.ja.difficultyHelp[key] ?? "";
}

function dailyRecordKey(dailyKey, difficultyKey) {
  return `daily:${dailyKey}:${difficultyKey}:${itemSeedKey()}`;
}

function parseDailyRecordKey(key) {
  const parts = key.split(":");
  if (parts.length < 4 || parts[0] !== "daily") return null;
  const [, date, difficulty, ...itemParts] = parts;
  if (!DIFFICULTIES[difficulty]) return null;
  return { date, difficulty, itemKey: itemParts.join(":") };
}

function itemTypesFromKey(itemKey) {
  if (!itemKey || itemKey === "none") return [];
  return itemKey.split("-").filter((type) => ITEM_TYPES.includes(type));
}

function dailyItemBadges(itemKey) {
  const types = itemTypesFromKey(itemKey);
  if (!types.length) return `<em class="daily-item-badge daily-item-none">${t("noItems")}</em>`;
  return types.map((type) => (
    `<em class="daily-item-badge daily-item-${type}">${itemLabel(type)}</em>`
  )).join("");
}

function difficultyChoiceText(key) {
  if (!dailyChallenge) return difficultyHelp(key);

  const recordKey = dailyRecordKey(todayKey(), key);
  const bestTimes = readBestTimes();
  const bestScores = readBestScores();
  const bestTime = bestTimes[recordKey];
  const bestScore = bestScores[recordKey];
  if (bestTime && bestScore) return `${formatTime(bestTime)} / ${bestScore}`;
  if (bestTime) return formatTime(bestTime);
  if (bestScore) return `${bestScore}`;
  return t("notPlayed");
}

function recordSummaryFromStores(recordKey, bestTimes, bestScores) {
  const bestTime = bestTimes[recordKey];
  const bestScore = bestScores[recordKey];
  if (bestTime && bestScore) return `${formatTime(bestTime)} / ${bestScore}`;
  if (bestTime) return formatTime(bestTime);
  if (bestScore) return `${bestScore}`;
  return null;
}

function appendRecordSection(title, records) {
  const section = document.createElement("section");
  section.className = "record-section";
  section.innerHTML = `<h3>${title}</h3>`;

  const visibleRecords = records.filter((record) => record.summary);
  if (!visibleRecords.length) {
    const empty = document.createElement("p");
    empty.className = "record-empty";
    empty.textContent = t("noRecordSummary");
    section.append(empty);
    recordList.append(section);
    return;
  }

  visibleRecords.forEach((record) => {
    const row = document.createElement("div");
    row.className = "record-card";
    row.innerHTML = `<span>${record.label}${record.badges || ""}</span><strong>${record.summary}</strong>${record.detail ? `<small>${record.detail}</small>` : ""}`;
    section.append(row);
  });
  recordList.append(section);
}

function buildDailyRecordGroups(bestTimes, bestScores, noMistakeRecords) {
  const recentDates = Array.from({ length: 7 }, (_, index) => dateKeyFromOffset(index));
  const dateSet = new Set(recentDates);
  const recordsByDate = new Map(recentDates.map((date) => [date, new Map()]));
  const addRecordKey = (key) => {
    const parsed = parseDailyRecordKey(key);
    if (!parsed || !dateSet.has(parsed.date)) return;
    const dayRecords = recordsByDate.get(parsed.date);
    const sortKey = `${Object.keys(DIFFICULTIES).indexOf(parsed.difficulty)}:${parsed.difficulty}:${parsed.itemKey}`;
    dayRecords.set(sortKey, parsed);
  };

  Object.keys(bestTimes).forEach(addRecordKey);
  Object.keys(bestScores).forEach(addRecordKey);
  Object.keys(noMistakeRecords).forEach(addRecordKey);

  return recentDates.map((date) => {
    const records = [...recordsByDate.get(date).entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, record]) => {
      const recordKey = `daily:${record.date}:${record.difficulty}:${record.itemKey}`;
      const time = bestTimes[recordKey] || null;
      const scoreValue = bestScores[recordKey] || null;
      const noMistake = Boolean(noMistakeRecords[recordKey]);
      if (!time && !scoreValue) return null;
      return { ...record, time, score: scoreValue, noMistake };
    }).filter(Boolean);
    return { date, records };
  }).filter((group) => group.records.length > 0);
}

function renderRecords() {
  recordList.innerHTML = "";
  const bestTimes = readBestTimes();
  const bestScores = readBestScores();
  const noMistakeRecords = readNoMistakeRecords();
  const noMistakeBadge = (recordKey) => (
    noMistakeRecords[recordKey] ? `<span class="daily-item-badges"><em class="daily-no-mistake">${t("noMistakeBadge")}</em></span>` : ""
  );

  appendRecordSection(t("normalRecords"), Object.keys(DIFFICULTIES).map((key) => ({
    label: difficultyLabel(key),
    summary: recordSummaryFromStores(key, bestTimes, bestScores),
    badges: noMistakeBadge(key),
  })));

  appendRecordSection(t("adventureRecords"), Object.keys(ADVENTURE_STAGES).filter((key) => key !== "rogueRun").map((key) => {
    const recordKey = `adventure:${key}`;
    return {
      label: adventureStageLabel(key),
      summary: recordSummaryFromStores(recordKey, bestTimes, bestScores),
      badges: noMistakeBadge(recordKey),
    };
  }));

  const rogueRecordKey = "adventure:rogueRun";
  const rogueAbilityRecords = readRogueBestAbilities();
  const recordedAbilities = Array.isArray(rogueAbilityRecords[rogueRecordKey])
    ? rogueAbilityRecords[rogueRecordKey].filter((id) => Boolean(rogueAbilityDef(id)))
    : [];
  const abilityLabels = rogueAbilitySummaryLabels(recordedAbilities);
  appendRecordSection(t("rogueRecords"), [{
    label: t("adventureRogueRun"),
    summary: recordSummaryFromStores(rogueRecordKey, bestTimes, bestScores),
    badges: noMistakeBadge(rogueRecordKey),
    detail: abilityLabels.length
      ? `${t("rogueRecordAbilities")}: ${abilityLabels.join(" / ")}`
      : t("rogueAbilityRecordUnavailable"),
  }]);

  const dailyRecords = buildDailyRecordGroups(bestTimes, bestScores, noMistakeRecords).flatMap((group) => (
    group.records.map((record) => {
      const recordKey = `daily:${record.date}:${record.difficulty}:${record.itemKey}`;
      const timeText = record.time ? formatTime(record.time) : "-";
      const scoreText = record.score ?? "-";
      return {
        label: `${formatDailyDate(record.date)} ${difficultyLabel(record.difficulty)}`,
        summary: `${timeText} / ${scoreText}`,
        badges: noMistakeBadge(recordKey),
        detail: dailyItemBadges(record.itemKey),
      };
    })
  ));
  appendRecordSection(t("dailyRecords"), dailyRecords);
}

function formatDailyDate(dateText) {
  const [, month, day] = dateText.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function renderDailyHistory() {
  dailyHistory.innerHTML = "";
  if (!dailyChallenge) {
    dailyHistory.hidden = true;
    return;
  }

  const bestTimes = readBestTimes();
  const bestScores = readBestScores();
  const noMistakeRecords = readNoMistakeRecords();
  const recentDates = Array.from({ length: 7 }, (_, index) => dateKeyFromOffset(index));
  const dateSet = new Set(recentDates);
  const recordsByDate = new Map(recentDates.map((date) => [date, new Map()]));
  const addRecordKey = (key) => {
    const parsed = parseDailyRecordKey(key);
    if (!parsed || !dateSet.has(parsed.date)) return;
    const dayRecords = recordsByDate.get(parsed.date);
    const sortKey = `${Object.keys(DIFFICULTIES).indexOf(parsed.difficulty)}:${parsed.difficulty}:${parsed.itemKey}`;
    dayRecords.set(sortKey, parsed);
  };

  Object.keys(bestTimes).forEach(addRecordKey);
  Object.keys(bestScores).forEach(addRecordKey);
  Object.keys(noMistakeRecords).forEach(addRecordKey);

  const dailyGroups = recentDates.map((date) => {
    const records = [...recordsByDate.get(date).entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, record]) => {
      const recordKey = `daily:${record.date}:${record.difficulty}:${record.itemKey}`;
      const time = bestTimes[recordKey] || null;
      const scoreValue = bestScores[recordKey] || null;
      const noMistake = Boolean(noMistakeRecords[recordKey]);
      if (!time && !scoreValue) return null;
      return { ...record, time, score: scoreValue, noMistake };
    }).filter(Boolean);
    return { date, records };
  }).filter((group) => group.records.length > 0);

  dailyHistory.hidden = false;
  dailyHistory.innerHTML = `<h3>${t("dailyRecords")}</h3>`;

  if (!dailyGroups.length) {
    const empty = document.createElement("p");
    empty.className = "daily-history-empty";
    empty.textContent = t("noRecords");
    dailyHistory.append(empty);
    return;
  }

  const list = document.createElement("div");
  list.className = "daily-history-list";
  dailyGroups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "daily-history-day";
    section.innerHTML = `<h4>${formatDailyDate(group.date)}</h4>`;
    group.records.forEach((record) => {
      const row = document.createElement("div");
      row.className = "daily-history-row";
      const timeText = record.time ? formatTime(record.time) : "-";
      const scoreText = record.score ?? "-";
      const noMistakeBadge = record.noMistake ? `<em class="daily-no-mistake">${t("noMistakeBadge")}</em>` : "";
      row.innerHTML = `<span>${difficultyLabel(record.difficulty)}<span class="daily-item-badges">${dailyItemBadges(record.itemKey)}</span>${noMistakeBadge}</span><strong>${timeText} / ${scoreText}</strong>`;
      section.append(row);
    });
    list.append(section);
  });
  dailyHistory.append(list);
}

function difficultyDisplayLabel() {
  if (currentAdventureStage) {
    const label = currentAdventurePractice
      ? `${adventureStageLabel(currentAdventureStage)} ${t("adventurePracticeBadge")}`
      : adventureStageLabel(currentAdventureStage);
    const stageLabel = isRogueRunMode() && rogueRunActive
      ? `${label}\n${rogueStageDisplayLabel(rogueRunStage || 1)}`
      : label;
    return t("adventurePrefix", { label: stageLabel });
  }
  const label = difficultyLabel(currentDifficulty);
  return currentDailyKey ? t("dailyPrefix", { label }) : label;
}

function difficultyResultLabel() {
  if (currentAdventureStage) {
    const label = currentAdventurePractice
      ? `${adventureStageLabel(currentAdventureStage)} ${t("adventurePracticeBadge")}`
      : adventureStageLabel(currentAdventureStage);
    return `${t("adventureTitle")}\n${label}`;
  }
  return difficultyDisplayLabel();
}

function currentRecordKey() {
  if (currentAdventureStage) return `adventure:${currentAdventureStage}`;
  return currentDailyKey ? dailyRecordKey(currentDailyKey, currentDifficulty) : currentDifficulty;
}

function adventureStageLabel(stageKey) {
  if (stageKey === "rogueRun") return t("adventureRogueRun");
  if (stageKey === "hintRain") return t("adventureHintRain");
  if (stageKey === "heartRush") return t("adventureHeartRush");
  if (stageKey === "growingMines") return t("adventureGrowingMines");
  if (stageKey === "blind") return t("adventureBlind");
  if (stageKey === "mineSearch") return t("adventureMineSearch");
  if (stageKey === "heartbeat") return t("adventureHeartbeat");
  if (stageKey === "patrol") return t("adventurePatrol");
  if (stageKey === "bomber") return t("adventureBomber");
  if (stageKey === "cageEater") return t("adventureCageEater");
  if (stageKey === "numberClimb") return t("adventureNumberClimb");
  if (stageKey === "sleeper") return t("adventureSleeper");
  if (stageKey === "jammer") return t("adventureJammer");
  if (stageKey === "chaser") return t("adventureChaser");
  if (stageKey === "striker") return t("adventureStriker");
  if (stageKey === "lightning") return t("adventureLightning");
  if (stageKey === "shiftingCages") return t("adventureShiftingCages");
  return stageKey;
}

function currentAdventureMode() {
  return ADVENTURE_STAGES[currentAdventureStage]?.itemMode || null;
}

function isRogueRunMode() {
  return currentAdventureMode() === "rogueRun";
}

function rogueStageCount() {
  return rogueRunPlans.length || ADVENTURE_STAGES.rogueRun?.stages || ROGUE_STAGE_PLAN.length || ROGUE_RUN_STAGE_COUNT;
}

function rogueRegularStageCount() {
  return rogueRunPlans.filter((plan) => !plan.boss).length || ROGUE_RUN_STAGE_COUNT;
}

function rogueStagePlanAt(stageNumber) {
  const plans = rogueRunPlans.length ? rogueRunPlans : ROGUE_STAGE_PLAN;
  return plans[Math.max(0, Math.min(plans.length - 1, stageNumber - 1))] || plans[0] || ROGUE_STAGE_PLAN[0];
}

function currentRogueStagePlan() {
  return rogueStagePlanAt(rogueRunStage);
}

function rogueGimmickTitle(gimmick) {
  const info = ROGUE_GIMMICK_PREVIEW[gimmick] || {};
  return info.titleKey ? t(info.titleKey) : gimmick;
}

function rogueStagePlanName(plan = currentRogueStagePlan()) {
  if (plan?.boss) return t("rogueBossName");
  if (!plan?.gimmicks?.length) return plan?.nameKey ? t(plan.nameKey) : "";
  return [...rogueGimmickCounts(plan.gimmicks)].map(([gimmick, count]) => {
    const countLabel = count > 1 ? ` x${count}` : "";
    return `${rogueGimmickTitle(gimmick)}${countLabel}`;
  }).join(" + ");
}

function rogueStageDisplayLabel(stageNumber, plan = rogueStagePlanAt(stageNumber)) {
  if (plan?.boss) return t("rogueBossStage", { name: rogueStagePlanName(plan) });
  return t("rogueRunStageNamed", {
    current: stageNumber,
    total: rogueRegularStageCount(),
    name: rogueStagePlanName(plan),
  });
}

function isRogueBossStage() {
  return isRogueRunMode() && Boolean(currentRogueStagePlan()?.boss);
}

function rogueBossRemainingHp() {
  if (!isRogueBossStage()) return 0;
  const maxHp = currentRogueStagePlan()?.bossHp || ROGUE_BOSS_HP;
  return Math.max(0, maxHp - Math.max(0, score - rogueBossScoreStart));
}

async function continueRogueBossBattle() {
  const carry = {
    bossScoreStart: rogueBossScoreStart,
    elapsedMs: currentElapsedMs(),
    mistakes,
    totalMistakes,
    undoUsed,
    reviveUsed,
  };
  rogueRunScoreCarry = score;
  await newGame(ADVENTURE_STAGES.rogueRun.difficulty, {
    adventureStage: "rogueRun",
    rogueContinue: true,
    bossContinue: carry,
  });
  if (!over) showComboToast(t("rogueBossNextBoard"), "combo-toast-lg", { forceFull: true });
}

function renderRogueBossPanel() {
  const visible = isRogueBossStage() && !over;
  rogueBossPanel.hidden = !visible;
  if (!visible) return;
  const maxHp = currentRogueStagePlan()?.bossHp || ROGUE_BOSS_HP;
  const hp = rogueBossRemainingHp();
  const ratio = maxHp > 0 ? Math.max(0, Math.min(1, hp / maxHp)) : 0;
  rogueBossPanel.innerHTML = `
    <div><strong>BOSS</strong><span>${t("rogueBossName")}</span></div>
    <small>${t("rogueBossHp", { current: hp, max: maxHp })}</small>
    <div class="rogue-boss-track"><i style="width:${ratio * 100}%"></i></div>
  `;
}

function rogueStageName() {
  const plan = currentRogueStagePlan();
  return rogueStagePlanName(plan);
}

function rogueHasGimmick(name) {
  return isRogueRunMode() && Boolean(currentRogueStagePlan()?.gimmicks?.includes(name));
}

function rogueGimmickCounts(gimmicks = currentRogueStagePlan()?.gimmicks || []) {
  return gimmicks.reduce((counts, gimmick) => {
    counts.set(gimmick, (counts.get(gimmick) || 0) + 1);
    return counts;
  }, new Map());
}

function rogueGimmickCount(name) {
  return isRogueRunMode() ? rogueGimmickCounts().get(name) || 0 : 0;
}

function adventureRuleConfig(name) {
  const base = ADVENTURE_STAGES[name] || {};
  const plan = isRogueRunMode() ? currentRogueStagePlan() : null;
  const override = plan?.rules?.[name] || {};
  const config = { ...base, ...override };
  if (hasRogueAbility("calmGimmicks")) {
    if (name === "growingMines" && config.mineIntervalMs) config.mineIntervalMs = Math.round(config.mineIntervalMs * 1.25);
    if (name === "chaser" && config.chaserIntervalMs) config.chaserIntervalMs = Math.round(config.chaserIntervalMs * 1.2);
    if (name === "striker" && config.strikerIntervalMs) config.strikerIntervalMs = Math.round(config.strikerIntervalMs * 1.2);
    if (name === "lightning" && config.lightningIntervalMs) config.lightningIntervalMs = Math.round(config.lightningIntervalMs * 1.2);
    if (name === "bomber" && config.bomberLimit) config.bomberLimit += 1;
    if (name === "cageEater" && config.eaterLimit) config.eaterLimit += 1;
    if (name === "numberClimb" && config.climbStep) config.climbStep = Math.max(1, config.climbStep - 1);
    if (name === "shiftingCages" && config.cageShiftEvery) config.cageShiftEvery += 1;
  }
  return config;
}

function hasRogueAbility(id) {
  return isRogueRunMode() && rogueRunAbilities.includes(id);
}

function rogueAbilityCount(id) {
  return isRogueRunMode() ? rogueRunAbilities.filter((abilityId) => abilityId === id).length : 0;
}

function rogueAbilityDef(id) {
  return ROGUE_ABILITY_DEFS.find((ability) => ability.id === id) || null;
}

function rogueAbilityLabel(id) {
  const ability = rogueAbilityDef(id);
  return ability ? t(ability.titleKey) : id;
}

function rogueAbilityHelp(id) {
  const ability = rogueAbilityDef(id);
  return ability ? t(ability.helpKey) : "";
}

function rogueAbilityMasteryLabel(id, count) {
  if (count < 2) return null;
  if (id === "heartPlus") return t("rogueMasteryHeartPlus");
  if (id === "hintExpand") return t("rogueMasteryHintExpand");
  if (id === "mineGuard") return t("rogueMasteryMineGuard");
  if (id === "shuffleEasy") return t("rogueMasteryShuffleEasy");
  return null;
}

function rogueAbilitySummaryLabels(abilities = rogueRunAbilities) {
  const counts = new Map();
  abilities.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
  return [...counts.entries()].flatMap(([id, count]) => {
    const label = count > 1 ? `${rogueAbilityLabel(id)} x${count}` : rogueAbilityLabel(id);
    const mastery = rogueAbilityMasteryLabel(id, count);
    return mastery ? [label, mastery] : [label];
  });
}

function rogueAbilitySummaryEntries() {
  const counts = new Map();
  rogueRunAbilities.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
  return [...counts.entries()].flatMap(([id, count]) => {
    const label = count > 1 ? `${rogueAbilityLabel(id)} x${count}` : rogueAbilityLabel(id);
    const entries = [{ id, label, help: rogueAbilityHelp(id) }];
    const mastery = rogueAbilityMasteryLabel(id, count);
    if (mastery) entries.push({ id, label: mastery, help: t("rogueMasteryHelp", { ability: rogueAbilityLabel(id) }) });
    return entries;
  });
}

function rogueRewardLabel(ability) {
  const nextCount = rogueAbilityCount(ability.id) + 1;
  return ability.stackable && nextCount > 1 ? `${t(ability.titleKey)} x${nextCount}` : t(ability.titleKey);
}

function randomRogueGimmicks(shape) {
  const pool = shape.pool || ROGUE_GIMMICK_POOL;
  const gimmicks = [];
  for (let index = 0; index < shape.picks; index += 1) {
    const candidates = pool.filter((gimmick) => !(
      (gimmicks.includes(gimmick) && !ROGUE_STACKABLE_ENEMY_GIMMICKS.has(gimmick)) ||
      (gimmick === "bomber" && gimmicks.includes("cageEater")) ||
      (gimmick === "cageEater" && gimmicks.includes("bomber"))
    ));
    gimmicks.push(candidates[Math.floor(random() * candidates.length)]);
  }
  return gimmicks;
}

function rogueRulesFromGimmicks(gimmicks, stageIndex) {
  const counts = rogueGimmickCounts(gimmicks);
  const rules = {};
  const count = (name) => counts.get(name) || 0;
  if (count("growingMines")) {
    rules.growingMines = { mineIntervalMs: Math.max(9000, 23000 - stageIndex * 1800 - (count("growingMines") - 1) * 4200) };
  }
  if (count("patrol")) {
    rules.patrol = { guardianCount: Math.min(5, 1 + count("patrol")) };
  }
  if (count("bomber")) {
    rules.bomber = { bomberLimit: Math.max(2, 6 - count("bomber")) };
  }
  if (count("cageEater")) {
    rules.cageEater = { eaterLimit: Math.max(2, 6 - count("cageEater")) };
  }
  if (count("numberClimb")) {
    rules.numberClimb = { climbStep: Math.min(3, count("numberClimb")) };
  }
  if (count("shiftingCages")) {
    rules.shiftingCages = { cageShiftEvery: Math.max(3, 6 - count("shiftingCages")) };
  }
  if (count("sleeper")) {
    rules.sleeper = { sleeperCount: Math.min(7, 2 + count("sleeper")), sleeperBlockTurns: Math.max(2, 4 - Math.min(2, count("sleeper"))) };
  }
  if (count("jammer")) {
    rules.jammer = { jammerCount: Math.min(8, 2 + count("jammer") * 2) };
  }
  if (count("lightning")) {
    rules.lightning = {
      lightningTargetCount: Math.min(3, count("lightning")),
      lightningIntervalMs: Math.max(2600, 4600 - stageIndex * 180 - (count("lightning") - 1) * 520),
      lightningWarnMs: Math.max(1250, 1700 - (count("lightning") - 1) * 120),
      lightningDangerMs: 400,
    };
  }
  if (count("chaser")) {
    rules.chaser = { chaserIntervalMs: Math.max(1200, 3300 - stageIndex * 130 - (count("chaser") - 1) * 520) };
  }
  if (count("striker")) {
    rules.striker = { strikerIntervalMs: Math.max(430, 1250 - stageIndex * 80 - (count("striker") - 1) * 230) };
  }
  return rules;
}

function createRogueRunPlans() {
  const stages = ROGUE_RANDOM_STAGE_SHAPES.map((shape, index) => {
    const gimmicks = randomRogueGimmicks(shape);
    return {
      nameKey: shape.nameKey,
      difficulty: shape.difficulty,
      itemCount: shape.itemCount + Math.max(0, Math.min(2, gimmicks.length - 1)),
      initialMines: shape.initialMines + Math.max(0, rogueGimmickCounts(gimmicks).get("growingMines") || 0),
      timeLimitMs: shape.timeLimitMs,
      gimmicks,
      rules: rogueRulesFromGimmicks(gimmicks, index),
    };
  });
  stages.push({
    boss: true,
    nameKey: "rogueBossName",
    difficulty: "hard",
    itemCount: 14,
    initialMines: 6,
    timeLimitMs: 300000,
    bossHp: ROGUE_BOSS_HP,
    gimmicks: [],
    rules: {},
  });
  return stages;
}

function rogueNextStageNumber(isInitial) {
  return isInitial ? 1 : Math.min(rogueRunStage + 1, rogueStageCount());
}

function rogueGimmickPreviewHtml(plan) {
  if (plan?.boss) return `<span class="rogue-gimmick-chip rogue-boss-preview-chip"><strong>${t("rogueBossHp", { current: plan.bossHp || ROGUE_BOSS_HP, max: plan.bossHp || ROGUE_BOSS_HP })}</strong><small>${t("rogueBossPreview")}</small></span>`;
  if (!plan?.gimmicks?.length) return `<span class="rogue-gimmick-chip is-quiet">${t("roguePreviewNoGimmick")}</span>`;
  return [...rogueGimmickCounts(plan.gimmicks)].map(([gimmick, count]) => {
    const info = ROGUE_GIMMICK_PREVIEW[gimmick] || {};
    const title = rogueGimmickTitle(gimmick);
    const help = info.helpKey ? t(info.helpKey) : "";
    const countLabel = count > 1 ? ` x${count}` : "";
    return `<span class="rogue-gimmick-chip"><strong>${title}${countLabel}</strong><small>${help}</small></span>`;
  }).join("");
}

function renderRogueNextPreview(isInitial) {
  const nextStage = rogueNextStageNumber(isInitial);
  const plan = rogueStagePlanAt(nextStage);
  const stageTitle = rogueStageDisplayLabel(nextStage, plan);
  const meta = t("rogueNextPreviewMeta", {
    difficulty: difficultyLabel(plan.difficulty),
    time: formatTime(plan.timeLimitMs),
    items: plan.itemCount,
  });
  rogueNextPreview.innerHTML = `
    <div class="rogue-next-preview-head">
      <span>${isInitial ? t("rogueNextPreviewStart") : t("rogueNextPreview")}</span>
      <strong>${stageTitle}</strong>
      <small>${meta}</small>
    </div>
    <div class="rogue-next-gimmicks">${rogueGimmickPreviewHtml(plan)}</div>
  `;
}

function resetRogueRunState() {
  rogueRunActive = false;
  rogueRunStage = 0;
  rogueRunElapsedMs = 0;
  rogueRunScoreCarry = 0;
  rogueBossScoreStart = 0;
  rogueRunTotalMistakes = 0;
  rogueRunAbilities = [];
  rogueRunPlans = [];
}

function chooseRogueRewards() {
  const remaining = ROGUE_ABILITY_DEFS.filter((ability) => ability.stackable || !rogueRunAbilities.includes(ability.id));
  return shuffle(remaining.length ? remaining : ROGUE_ABILITY_DEFS).slice(0, 3);
}

function showRogueRewardDialog() {
  const isInitial = !currentAdventureStage && rogueRunActive && rogueRunStage === 1 && rogueRunAbilities.length === 0;
  const rewards = chooseRogueRewards();
  rogueRewardTitle.textContent = t("rogueRewardTitle");
  rogueRewardIntro.textContent = isInitial ? t("rogueRewardIntroStart") : t("rogueRewardIntro");
  rogueRunProgress.textContent = isInitial
    ? t("rogueInitialPower")
    : t("rogueStageClear", { current: rogueRunStage });
  const currentAbilityEntries = rogueAbilitySummaryEntries();
  rogueCurrentAbilities.innerHTML = `<strong>${t("rogueAbilities")}</strong><div></div><p class="rogue-current-ability-detail" hidden></p>`;
  const currentAbilityList = rogueCurrentAbilities.querySelector("div");
  if (currentAbilityEntries.length) {
    currentAbilityEntries.forEach((entry) => {
      const button = document.createElement("button");
      button.className = "rogue-current-ability-chip";
      button.type = "button";
      button.textContent = entry.label;
      button.dataset.abilityHelp = entry.help;
      button.setAttribute("aria-label", `${entry.label} ${entry.help}`);
      currentAbilityList.append(button);
    });
  } else {
    const empty = document.createElement("span");
    empty.textContent = t("rogueNoAbilities");
    currentAbilityList.append(empty);
  }
  renderRogueNextPreview(isInitial);
  rogueRewardList.innerHTML = "";
  rewards.forEach((ability) => {
    const button = document.createElement("button");
    button.className = "rogue-reward-option";
    button.type = "button";
    button.innerHTML = `<strong>${rogueRewardLabel(ability)}</strong><span>${t(ability.helpKey)}</span>`;
    button.addEventListener("click", () => {
      if (ability.stackable || !rogueRunAbilities.includes(ability.id)) rogueRunAbilities.push(ability.id);
      if (rogueRewardDialog.open) rogueRewardDialog.close();
      if (!isInitial) rogueRunStage += 1;
      void newGame(ADVENTURE_STAGES.rogueRun.difficulty, { adventureStage: "rogueRun", rogueContinue: true });
    });
    rogueRewardList.append(button);
  });
  rogueRewardDialog.showModal();
}

async function startRogueRun() {
  resetRogueRunState();
  rogueRunActive = true;
  rogueRunStage = 1;
  rogueRunPlans = createRogueRunPlans();
  dailyChallenge = false;
  currentAdventureStage = null;
  currentAdventurePractice = false;
  if (difficultyDialog.open) difficultyDialog.close();
  if (adventureDialog.open) adventureDialog.close();
  showRogueRewardDialog();
}

function rogueResultAbilityHtml() {
  const labels = rogueAbilitySummaryLabels().map((label) => `<span>${label}</span>`).join("");
  return `<div class="rogue-result-abilities"><strong>${t("rogueAbilities")}</strong><div>${labels || `<span>${t("rogueNoAbilities")}</span>`}</div></div>`;
}

function rewindElapsed(ms) {
  const current = currentElapsedMs();
  elapsedMs = Math.max(0, current - ms);
  startTime = Date.now();
}

function rogueHintTargetCells(index) {
  const targets = new Set(surroundingCells(index));
  const expandCount = rogueAbilityCount("hintExpand");
  const row = rowOf(index);
  const col = colOf(index);
  if (expandCount === 1) {
    [
      [row - 2, col],
      [row + 2, col],
      [row, col - 2],
      [row, col + 2],
    ].forEach(([nextRow, nextCol]) => {
      if (nextRow >= 0 && nextRow < SIZE && nextCol >= 0 && nextCol < SIZE) {
        targets.add(indexOf(nextRow, nextCol));
      }
    });
  } else if (expandCount >= 2) {
    const radius = Math.min(3, expandCount);
    for (let nextRow = row - radius; nextRow <= row + radius; nextRow += 1) {
      for (let nextCol = col - radius; nextCol <= col + radius; nextCol += 1) {
        if (nextRow === row && nextCol === col) continue;
        if (nextRow >= 0 && nextRow < SIZE && nextCol >= 0 && nextCol < SIZE) {
          targets.add(indexOf(nextRow, nextCol));
        }
      }
    }
  }
  return [...targets].filter((cell) => entries[cell] === EMPTY);
}

function renderRogueAbilityPanel() {
  if (!isRogueRunMode() || !rogueRunActive) {
    rogueAbilityPanel.hidden = true;
    rogueAbilityPanel.innerHTML = "";
    return;
  }
  rogueAbilityPanel.hidden = false;
  const entries = rogueAbilitySummaryEntries();
  const chips = entries.length
    ? entries.map((entry) => `<button class="rogue-ability-chip" type="button" data-ability-id="${entry.id}" data-ability-help="${entry.help}" aria-label="${entry.label} ${entry.help}">${entry.label}</button>`).join("")
    : `<span>${t("rogueNoAbilities")}</span>`;
  rogueAbilityPanel.innerHTML = `<strong>${t("rogueAbilityPanel")}</strong><div>${chips}</div><p class="rogue-ability-detail" hidden></p>`;
}

function rogueLastHintUnits() {
  const units = [];
  for (let row = 0; row < SIZE; row += 1) {
    units.push(Array.from({ length: SIZE }, (_, col) => indexOf(row, col)));
  }
  for (let col = 0; col < SIZE; col += 1) {
    units.push(Array.from({ length: SIZE }, (_, row) => indexOf(row, col)));
  }
  for (let boxRow = 0; boxRow < SIZE; boxRow += BOX) {
    for (let boxCol = 0; boxCol < SIZE; boxCol += BOX) {
      const boxCells = [];
      for (let row = boxRow; row < boxRow + BOX; row += 1) {
        for (let col = boxCol; col < boxCol + BOX; col += 1) {
          boxCells.push(indexOf(row, col));
        }
      }
      units.push(boxCells);
    }
  }
  cages.filter((cage) => cage.cells.length >= 2).forEach((cage) => units.push([...cage.cells]));
  return units;
}

function applyRogueLastCellHints() {
  if (!hasRogueAbility("lastCellHint")) return 0;
  const targets = new Set();
  rogueLastHintUnits().forEach((cells) => {
    const empty = cells.filter((cell) => entries[cell] === EMPTY);
    if (empty.length === 1 && !hinted.has(empty[0])) targets.add(empty[0]);
  });
  targets.forEach((cell) => {
    hinted.set(cell, [solution[cell]]);
    notes.delete(cell);
    mineNotes.delete(cell);
    flashEffect(cell, "effect-hint-target", 700);
  });
  if (targets.size > 0) {
    showComboToast(t("rogueLastCellHint", { n: targets.size }), comboLevel(targets.size));
  }
  return targets.size;
}

function isHeartbeatMode() {
  return currentAdventureMode() === "heartbeat";
}

function isShiftingCagesMode() {
  return currentAdventureMode() === "shiftingCages" || rogueHasGimmick("shiftingCages");
}

function isGrowingMinesMode() {
  return currentAdventureMode() === "growingMines" || rogueHasGimmick("growingMines");
}

function isMineSearchMode() {
  return currentAdventureMode() === "mineSearch";
}

function isMineSearchMine(index) {
  return isMineSearchMode() && items.get(index) === "mine";
}

function mineSearchRisk(index) {
  if (!isMineSearchMode()) return 0;
  return surroundingCells(index).filter((cell) => items.get(cell) === "mine").length;
}

function isMineSearchCleared() {
  if (!isMineSearchMode()) return false;
  return entries.every((value, index) => (
    items.get(index) === "mine" || value === solution[index]
  ));
}

function isPatrolMode() {
  return currentAdventureMode() === "patrol" || rogueHasGimmick("patrol");
}

function isBomberMode() {
  return currentAdventureMode() === "bomber" || rogueHasGimmick("bomber");
}

function isCageEaterMode() {
  return currentAdventureMode() === "cageEater" || rogueHasGimmick("cageEater");
}

function isNumberClimbMode() {
  return currentAdventureMode() === "numberClimb" || rogueHasGimmick("numberClimb");
}

function numberClimbResetNumber() {
  for (let number = 9; number >= 1; number -= 1) {
    if (solvedCountForNumber(number) < SIZE) return number;
  }
  return 1;
}

function currentNumberClimbElapsedMs() {
  return currentElapsedMs();
}

function numberClimbFreeRemainingMs() {
  if (!isNumberClimbMode()) return 0;
  return Math.max(0, numberClimbFreeUntilMs - currentNumberClimbElapsedMs());
}

function isNumberClimbFreeInputActive() {
  return numberClimbFreeRemainingMs() > 0;
}

function activateNumberClimbFreeInput(durationMs = NUMBER_CLIMB_FREE_INPUT_MS) {
  if (!isNumberClimbMode()) return;
  numberClimbFreeUntilMs = Math.max(numberClimbFreeUntilMs, currentNumberClimbElapsedMs() + durationMs);
}

function numberClimbMinimumAllowed() {
  if (isNumberClimbFreeInputActive()) return 1;
  return Math.max(1, numberClimbMinimum - 1);
}

function advanceNumberClimb(number, resetNumber) {
  if (!isNumberClimbMode()) return;
  if (isNumberClimbFreeInputActive()) return;
  if (number < numberClimbMinimum) return;
  if (number >= resetNumber) {
    numberClimbMinimum = 1;
    showComboToast(t("numberClimbRestarted", { n: resetNumber }), "combo-toast-lg");
    return;
  }
  const climbStep = adventureRuleConfig("numberClimb").climbStep || 1;
  numberClimbMinimum = Math.min(resetNumber, number + climbStep);
}

function renderNumberClimbPanel() {
  const visible = isNumberClimbMode() && !over;
  numberClimbPanel.hidden = !visible;
  if (!visible) return;
  const resetNumber = numberClimbResetNumber();
  const displayMinimum = numberClimbMinimumAllowed();
  const freeRemainingMs = numberClimbFreeRemainingMs();
  const freeInputActive = freeRemainingMs > 0;
  numberClimbPanel.classList.toggle("is-free-input", freeInputActive);
  const digits = Array.from({ length: 9 }, (_, index) => index + 1).map((number) => {
    const classes = ["number-climb-step"];
    if (number < displayMinimum) classes.push("is-locked");
    if (number === displayMinimum) classes.push("is-next");
    if (number === resetNumber) classes.push("is-reset");
    if (solvedCountForNumber(number) >= SIZE) classes.push("is-complete");
    return `<span class="${classes.join(" ")}">${number}</span>`;
  }).join("");
  const titleText = freeInputActive
    ? t("numberClimbFreeTitle")
    : t("numberClimbNext", { n: displayMinimum });
  const statusText = freeInputActive
    ? t("numberClimbFreeInput", { n: Math.ceil(freeRemainingMs / 1000) })
    : t("numberClimbReset", { n: resetNumber });
  numberClimbPanel.innerHTML = `<strong>${titleText}</strong><div>${digits}</div><small>${statusText}</small>`;
}

function isBomberLikeMode() {
  return isBomberMode() || isCageEaterMode();
}

function isSleeperMode() {
  return currentAdventureMode() === "sleeper" || rogueHasGimmick("sleeper");
}

function makePatrolRoute() {
  const route = [];
  let top = 0;
  let bottom = SIZE - 1;
  let left = 0;
  let right = SIZE - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col += 1) route.push(top * SIZE + col);
    for (let row = top + 1; row <= bottom; row += 1) route.push(row * SIZE + right);
    if (top < bottom) {
      for (let col = right - 1; col >= left; col -= 1) route.push(bottom * SIZE + col);
    }
    if (left < right) {
      for (let row = bottom - 1; row > top; row -= 1) route.push(row * SIZE + left);
    }
    top += 1;
    bottom -= 1;
    left += 1;
    right -= 1;
  }

  return route;
}

function patrolOpenCellCount() {
  return entries.filter((value, cell) => puzzle[cell] === EMPTY && value === EMPTY).length;
}

function patrolGuardianTargetCount() {
  return adventureRuleConfig("patrol").guardianCount || PATROL_GUARDIAN_COUNT;
}

function canInputByNumberClimb(index) {
  return !isNumberClimbMode() || solution[index] >= numberClimbMinimumAllowed();
}

function canPatrolOccupy(index, occupied = new Set()) {
  if (!isPatrolMode() || puzzle[index] !== EMPTY || entries[index] !== EMPTY || occupied.has(index)) return false;
  if (retirePatrolIfEndgame()) return false;
  const blockedCells = new Set(occupied);
  cageCellsForCell(index).forEach((cell) => blockedCells.add(cell));
  return entries.some((value, cell) => (
    puzzle[cell] === EMPTY &&
    value === EMPTY &&
    !blockedCells.has(cell) &&
    canInputByNumberClimb(cell)
  ));
}

function patrolDirection(guardianIndex) {
  return guardianIndex % 2 === 0 ? 1 : -1;
}

function normalizePatrolStep(guardianIndex, occupied = new Set()) {
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return null;
  const direction = patrolDirection(guardianIndex);
  let step = patrolSteps[guardianIndex] ?? 0;
  for (let count = 0; count < patrolRoute.length; count += 1) {
    const cell = patrolRoute[((step % patrolRoute.length) + patrolRoute.length) % patrolRoute.length];
    if (canPatrolOccupy(cell, occupied)) {
      patrolSteps[guardianIndex] = ((step % patrolRoute.length) + patrolRoute.length) % patrolRoute.length;
      return cell;
    }
    step = (step + direction + patrolRoute.length) % patrolRoute.length;
  }
  return null;
}

function currentPatrolCells() {
  if (retirePatrolIfEndgame()) return [];
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return [];
  const occupied = new Set();
  const cells = [];
  for (let index = 0; index < patrolSteps.length; index += 1) {
    const cell = normalizePatrolStep(index, occupied);
    if (cell !== null) {
      cageCellsForCell(cell).forEach((blockedCell) => occupied.add(blockedCell));
      cells.push(cell);
    }
  }
  return cells;
}

function nextPatrolCells(blockedCells = new Set()) {
  if (retirePatrolIfEndgame()) return [];
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return [];
  const nextCells = [];
  const occupied = new Set(blockedCells);
  for (let index = 0; index < patrolSteps.length; index += 1) {
    const direction = patrolDirection(index);
    for (let count = 1; count < patrolRoute.length; count += 1) {
      const step = (patrolSteps[index] + direction * count + patrolRoute.length * count) % patrolRoute.length;
      const cell = patrolRoute[step];
      if (canPatrolOccupy(cell, occupied)) {
        cageCellsForCell(cell).forEach((blockedCell) => occupied.add(blockedCell));
        nextCells.push(cell);
        break;
      }
    }
  }
  return nextCells;
}

function setupPatrol() {
  patrolRoute = [];
  patrolSteps = [];
  if (!isPatrolMode()) return;
  patrolRoute = makePatrolRoute();
  const targetCount = patrolGuardianTargetCount();
  if (patrolOpenCellCount() <= targetCount) return;
  const occupied = new Set();
  for (let guardian = 0; guardian < targetCount; guardian += 1) {
    const start = Math.floor((patrolRoute.length / targetCount) * guardian);
    const open = patrolRoute.findIndex((_, offset) => {
      const index = (start + offset) % patrolRoute.length;
      return canPatrolOccupy(patrolRoute[index], occupied);
    });
    if (open < 0) break;
    const step = (start + open) % patrolRoute.length;
    patrolSteps.push(step);
    cageCellsForCell(patrolRoute[step]).forEach((blockedCell) => occupied.add(blockedCell));
  }
}

function advancePatrol() {
  if (retirePatrolIfEndgame()) return false;
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return false;
  const before = currentPatrolCells();
  const occupied = new Set(patrolBlockedCellsFor(before));
  const after = [];
  for (let index = 0; index < patrolSteps.length; index += 1) {
    const direction = patrolDirection(index);
    for (let count = 0; count < patrolRoute.length; count += 1) {
      patrolSteps[index] = (patrolSteps[index] + direction + patrolRoute.length) % patrolRoute.length;
      const cell = patrolRoute[patrolSteps[index]];
      if (canPatrolOccupy(cell, occupied)) {
        cageCellsForCell(cell).forEach((blockedCell) => occupied.add(blockedCell));
        after.push(cell);
        break;
      }
    }
  }
  after.forEach((cell, index) => {
    if (cell !== before[index]) flashEffect(cell, "effect-patrol", 500);
  });
  return after.some((cell, index) => cell !== before[index]);
}

function defeatPatrolGuardians(targetCells) {
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return [];
  const targets = new Set(targetCells);
  const currentCells = currentPatrolCells();
  const defeated = [];
  patrolSteps = patrolSteps.filter((step, index) => {
    const cell = currentCells[index];
    if (cell !== undefined && targets.has(cell)) {
      defeated.push(cell);
      flashEffect(cell, "effect-mine", 700);
      return false;
    }
    return true;
  });
  return defeated;
}

function bomberAvoidCells() {
  if (!isPatrolMode() || !patrolRoute.length || !patrolSteps.length) return new Set();
  const patrolCells = currentPatrolCells();
  return new Set([...patrolCells, ...patrolBlockedCellsFor(patrolCells)]);
}

function bomberTargetCount() {
  if (!isRogueRunMode()) return 1;
  const gimmick = isCageEaterMode() ? "cageEater" : "bomber";
  return Math.max(1, rogueGimmickCount(gimmick));
}

function canBomberOccupy(index, avoidCells = bomberAvoidCells(), occupied = new Set()) {
  if (!isBomberLikeMode() || puzzle[index] !== EMPTY || entries[index] !== EMPTY) return false;
  if (avoidCells.has(index) || occupied.has(index)) return false;
  const openCells = entries.filter((value, cell) => puzzle[cell] === EMPTY && value === EMPTY).length;
  return openCells - occupied.size > 1;
}

function normalizeBomberStep(index, occupied = new Set()) {
  if (!isBomberLikeMode() || !bomberRoute.length || bomberSteps[index] === undefined) return null;
  const avoidCells = bomberAvoidCells();
  for (let count = 0; count < bomberRoute.length; count += 1) {
    const step = ((bomberSteps[index] % bomberRoute.length) + bomberRoute.length) % bomberRoute.length;
    const cell = bomberRoute[step];
    if (canBomberOccupy(cell, avoidCells, occupied)) {
      bomberSteps[index] = step;
      return cell;
    }
    bomberSteps[index] = (bomberSteps[index] + 1) % bomberRoute.length;
  }
  return null;
}

function currentBomberCells() {
  if (!isBomberLikeMode()) return [];
  const occupied = new Set();
  return bomberSteps.map((_, index) => {
    const cell = normalizeBomberStep(index, occupied);
    if (cell !== null) occupied.add(cell);
    return cell;
  });
}

function nextBomberCells() {
  if (!isBomberLikeMode() || !bomberRoute.length) return [];
  const avoidCells = bomberAvoidCells();
  const currentCells = currentBomberCells();
  const occupied = new Set(currentCells.filter((cell) => cell !== null));
  return bomberSteps.map((step, index) => {
    occupied.delete(currentCells[index]);
    for (let count = 1; count < bomberRoute.length; count += 1) {
      const cell = bomberRoute[(step + count) % bomberRoute.length];
      if (!canBomberOccupy(cell, avoidCells, occupied)) continue;
      occupied.add(cell);
      return cell;
    }
    if (currentCells[index] !== null) occupied.add(currentCells[index]);
    return null;
  });
}

function setupBomber() {
  bomberRoute = [];
  bomberSteps = [];
  bomberHeats = [];
  if (!isBomberLikeMode()) return;
  bomberRoute = makePatrolRoute();
  const avoidCells = bomberAvoidCells();
  const occupied = new Set();
  const targetCount = bomberTargetCount();
  for (let bomber = 0; bomber < targetCount; bomber += 1) {
    const start = Math.floor((bomberRoute.length / targetCount) * bomber);
    let chosenStep = -1;
    for (let offset = 0; offset < bomberRoute.length; offset += 1) {
      const step = (start + offset) % bomberRoute.length;
      const cell = bomberRoute[step];
      if (!canBomberOccupy(cell, avoidCells, occupied)) continue;
      chosenStep = step;
      occupied.add(cell);
      break;
    }
    if (chosenStep < 0) break;
    bomberSteps.push(chosenStep);
    bomberHeats.push(0);
  }
}

function advanceBombers() {
  if (!isBomberLikeMode() || !bomberRoute.length || !bomberSteps.length) return false;
  const before = currentBomberCells();
  const avoidCells = bomberAvoidCells();
  const occupied = new Set(before.filter((cell) => cell !== null));
  let moved = false;
  bomberSteps.forEach((step, index) => {
    occupied.delete(before[index]);
    for (let count = 0; count < bomberRoute.length; count += 1) {
      bomberSteps[index] = (bomberSteps[index] + 1) % bomberRoute.length;
      const cell = bomberRoute[bomberSteps[index]];
      if (!canBomberOccupy(cell, avoidCells, occupied)) continue;
      occupied.add(cell);
      if (cell !== before[index]) {
        moved = true;
        flashEffect(cell, "effect-bomber", 500);
      }
      break;
    }
  });
  return moved;
}

function clearAroundEnemy(index) {
  const cleared = surroundingCells(index).filter((cell) => (
    entries[cell] !== EMPTY && (isSameBlock(cell, index) || !isCompletedBlock(cell))
  ));
  cleared.forEach((cell) => {
    entries[cell] = EMPTY;
    puzzle[cell] = EMPTY;
    hinted.delete(cell);
    notes.delete(cell);
    mineNotes.delete(cell);
    flashEffect(cell, "effect-cleared", 700);
  });
  return cleared;
}

function canMergeCages(first, second) {
  if (!first || !second || first.id === second.id) return false;
  const cells = [...new Set([...first.cells, ...second.cells])];
  if (cells.length > SIZE) return false;
  const digits = new Set(cells.map((cell) => solution[cell]));
  return digits.size === cells.length;
}

function mergeAdjacentCage(index) {
  const source = cageForCell(index);
  if (!source) return null;
  const neighborIds = new Set(source.cells.flatMap(orthogonalCells)
    .map((cell) => cellToCage.get(cell))
    .filter((cageId) => cageId !== undefined && cageId !== source.id));
  const candidates = shuffle([...neighborIds]
    .map((cageId) => cages.find((cage) => cage.id === cageId))
    .filter((cage) => canMergeCages(source, cage)));
  const target = candidates[0];
  if (!target) return null;

  const mergedCells = [...new Set([...source.cells, ...target.cells])];
  const remaining = cages.filter((cage) => cage.id !== source.id && cage.id !== target.id);
  remaining.push({
    id: -1,
    cells: mergedCells,
    sum: mergedCells.reduce((total, cell) => total + solution[cell], 0),
  });
  cages = remaining.map((cage, cageId) => ({ ...cage, id: cageId }));
  buildCageLookups();
  normalizeJammersAfterCageChange();
  flashCellsEffect(mergedCells, "effect-cage-shift", 760);
  return mergedCells;
}

function updateBomberAfterInput(inputCell) {
  if (!isBomberLikeMode()) return { clearedCells: [] };
  const bomberCells = currentBomberCells();
  if (!bomberCells.some((cell) => cell !== null)) return { clearedCells: [] };
  const limit = isCageEaterMode()
    ? adventureRuleConfig("cageEater").eaterLimit || 4
    : adventureRuleConfig("bomber").bomberLimit || 4;
  const clearedCells = new Set();
  let mergedCage = false;

  bomberCells.forEach((bomberCell, index) => {
    if (bomberCell === null) return;
    if (surroundingCells(bomberCell).includes(inputCell)) {
      bomberHeats[index] = 0;
      showComboToast(t(isCageEaterMode() ? "cageEaterCalmed" : "bomberDefused"), "combo-toast-normal");
      return;
    }

    bomberHeats[index] = (bomberHeats[index] || 0) + 1;
    if (bomberHeats[index] < limit) return;

    if (isCageEaterMode()) {
      const mergedCells = mergeAdjacentCage(bomberCell);
      bomberHeats[index] = 0;
      flashEffect(bomberCell, "effect-cage-shift", 760);
      showComboToast(mergedCells
        ? t("cageEaterMerged", { n: mergedCells.length })
        : t("cageEaterNoTarget"), "combo-toast-lg");
      mergedCage = mergedCage || Boolean(mergedCells);
      return;
    }
    const cleared = clearAroundEnemy(bomberCell);
    bomberHeats[index] = 0;
    cleared.forEach((cell) => clearedCells.add(cell));
    flashEffect(bomberCell, "effect-mine", 700);
    showComboToast(t("bomberExploded", { n: cleared.length }), comboLevel(cleared.length));
  });

  advanceBombers();
  return { clearedCells: [...clearedCells], mergedCage };
}

function setupSleeper() {
  sleeperCells = [];
  sleeperBlockedCells = new Set();
  sleeperBlockedTurns = new Map();
  sleeperBlockTurns = 0;
  if (!isSleeperMode()) return;
  const candidates = shuffle(emptyCells());
  sleeperCells = candidates.slice(0, adventureRuleConfig("sleeper").sleeperCount || SLEEPER_COUNT);
}

function setupJammer() {
  jammerCageIds = new Set();
  jammerCellsByCage = new Map();
  if (!isJammerMode()) return;
  const targetCount = adventureRuleConfig("jammer").jammerCount || 4;
  const candidates = shuffle(cages.filter((cage) => (
    cage.cells.length >= 2 && cage.cells.filter((cell) => puzzle[cell] === EMPTY).length >= 2
  )));
  candidates.slice(0, targetCount).forEach((cage) => {
    const emptyCageCells = cage.cells.filter((cell) => puzzle[cell] === EMPTY);
    const markerCell = cageStartCell({ cells: emptyCageCells.length ? emptyCageCells : cage.cells });
    jammerCageIds.add(cage.id);
    jammerCellsByCage.set(cage.id, markerCell);
  });
}

function normalizeSleeperBlocks() {
  if (!sleeperBlockedTurns.size && sleeperBlockedCells.size && sleeperBlockTurns > 0) {
    sleeperBlockedTurns = new Map([...sleeperBlockedCells].map((cell) => [cell, sleeperBlockTurns]));
  }
  sleeperCells = sleeperCells.filter((cell) => puzzle[cell] === EMPTY && entries[cell] === EMPTY);
  sleeperBlockedTurns = new Map([...sleeperBlockedTurns].filter(([cell, turns]) => (
    turns > 0 && puzzle[cell] === EMPTY && entries[cell] === EMPTY
  )));
  sleeperBlockedCells = new Set(sleeperBlockedTurns.keys());
  const sleeperSet = new Set(sleeperCells);
  const emptyCellsRemaining = entries
    .map((value, index) => (puzzle[index] === EMPTY && value === EMPTY ? index : -1))
    .filter((index) => index >= 0);
  const openCellsWithoutSleepers = emptyCellsRemaining.filter((cell) => (
    !sleeperSet.has(cell) && !sleeperBlockedCells.has(cell)
  ));
  if (sleeperCells.length && openCellsWithoutSleepers.length === 0) sleeperCells = [];

  if (!sleeperBlockedCells.size) return;
  const currentSleeperSet = new Set(sleeperCells);
  const remainingEmptyCells = entries
    .map((value, index) => (puzzle[index] === EMPTY && value === EMPTY ? index : -1))
    .filter((index) => index >= 0);
  const openCells = remainingEmptyCells.filter((cell) => (
    !currentSleeperSet.has(cell) && !sleeperBlockedCells.has(cell)
  ));
  if (!sleeperBlockedCells.size || openCells.length === 0) {
    sleeperBlockedCells = new Set();
    sleeperBlockedTurns = new Map();
    sleeperBlockTurns = 0;
  }
}

function isSleeperBlockedCell(index) {
  normalizeSleeperBlocks();
  return sleeperBlockedCells.has(index);
}

function releaseSleeperBlocks(showToast = false) {
  if (!sleeperBlockedCells.size) return;
  sleeperBlockedCells = new Set();
  sleeperBlockedTurns = new Map();
  sleeperBlockTurns = 0;
  if (showToast) showComboToast(t("sleeperReleased"), "combo-toast-normal");
}

function tickSleeperBlocks() {
  if (!sleeperBlockedTurns.size) return false;
  let released = false;
  sleeperBlockedTurns = new Map([...sleeperBlockedTurns].map(([cell, turns]) => [cell, turns - 1])
    .filter(([cell, turns]) => {
      const keep = turns > 0;
      if (!keep) released = true;
      return keep;
    }));
  sleeperBlockedCells = new Set(sleeperBlockedTurns.keys());
  sleeperBlockTurns = sleeperBlockedTurns.size ? Math.max(...sleeperBlockedTurns.values()) : 0;
  normalizeSleeperBlocks();
  return released;
}

function updateSleeperAfterInput(inputCell) {
  if (!isSleeperMode()) return;
  const released = tickSleeperBlocks();

  const awakenedSleepers = sleeperCells.filter((cell) => surroundingCells(cell).includes(inputCell));
  if (awakenedSleepers.length) {
    const sleeperSet = new Set(sleeperCells);
    const blockTurns = adventureRuleConfig("sleeper").sleeperBlockTurns || 3;
    awakenedSleepers.forEach((sleeper) => {
      surroundingCells(sleeper).forEach((cell) => {
        if (puzzle[cell] === EMPTY && entries[cell] === EMPTY && !sleeperSet.has(cell)) {
          if (!sleeperBlockedTurns.has(cell)) sleeperBlockedTurns.set(cell, blockTurns);
        }
      });
    });
    sleeperCells = sleeperCells.filter((cell) => !awakenedSleepers.includes(cell));
    sleeperBlockedCells = new Set(sleeperBlockedTurns.keys());
    sleeperBlockTurns = sleeperBlockedTurns.size ? Math.max(...sleeperBlockedTurns.values()) : 0;
    normalizeSleeperBlocks();
    if (sleeperBlockedCells.size) {
      showComboToast(t("sleeperAwake"), "combo-toast-lg");
    }
    return;
  }

  if (released) showComboToast(t("sleeperReleased"), "combo-toast-normal");
}

function shouldShowRemainingCells() {
  return currentAdventureMode() === "blind" || isMineSearchMode();
}

function remainingCellsCount() {
  if (isMineSearchMode()) {
    return entries.filter((value, index) => items.get(index) !== "mine" && value !== solution[index]).length;
  }
  return entries.filter((value, index) => puzzle[index] === EMPTY && value !== solution[index]).length;
}

function toggleScoreCard() {
  if (!shouldShowRemainingCells()) return;
  showScoreCard = !showScoreCard;
  render();
}

function isRelated(a, b) {
  return rowOf(a) === rowOf(b) || colOf(a) === colOf(b) || (
    Math.floor(rowOf(a) / BOX) === Math.floor(rowOf(b) / BOX) &&
    Math.floor(colOf(a) / BOX) === Math.floor(colOf(b) / BOX)
  );
}

function remainingLives() {
  return Math.max(0, MAX_LIVES - mistakes);
}

function render() {
  renderBoard();
  renderPad();
  renderLegend();
  renderToolRow();
  renderRogueAbilityPanel();
  renderNumberClimbPanel();
  renderRogueBossPanel();
  difficultyEl.textContent = difficultyDisplayLabel();
  difficultyEl.classList.toggle("is-daily", Boolean(currentDailyKey));
  difficultyEl.classList.toggle("is-adventure", Boolean(currentAdventureStage));
  difficultyEl.classList.toggle("is-long", currentDifficulty === "extreme");
  mistakeEl.textContent = `${remainingLives()} / ${MAX_LIVES}`;
  const statLabels = document.querySelectorAll(".status-panel .stat span");
  const canToggleScoreCard = shouldShowRemainingCells();
  const showingRemaining = canToggleScoreCard && !showScoreCard;
  if (statLabels[3]) statLabels[3].textContent = showingRemaining ? t("remaining") : t("score");
  scoreEl.textContent = showingRemaining ? remainingCellsCount() : score;
  scoreStat.classList.toggle("stat-toggle", canToggleScoreCard);
  scoreStat.setAttribute("role", canToggleScoreCard ? "button" : "presentation");
  scoreStat.tabIndex = canToggleScoreCard ? 0 : -1;
  timerEl.textContent = timerDisplayText();
  rogueRewardTitle.textContent = t("rogueRewardTitle");
  rogueRewardIntro.textContent = t("rogueRewardIntro");
}

function setReviveButtonVisible(visible) {
  const disabled = window.KILLER_WEB_DEMO_NO_ADS === true;
  reviveButton.hidden = disabled || !visible;
  reviveButton.disabled = revivePending;
  reviveButton.textContent = revivePending ? t("loadingAd") : t("reviveAd");
}

function cloneSetMap(map) {
  return new Map([...map.entries()].map(([key, value]) => [key, new Set(value)]));
}

function snapshotState() {
  return {
    puzzle: [...puzzle],
    entries: [...entries],
    cages: cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum })),
    items: cloneMap(items),
    usedItems: new Set(usedItems),
    hinted: cloneMap(hinted),
    notes: cloneSetMap(notes),
    mineNotes: new Set(mineNotes),
    selected,
    score,
    streak,
    activeNumber,
    noteMode,
    patrolSteps: [...patrolSteps],
    bomberRoute: [...bomberRoute],
    bomberSteps: [...bomberSteps],
    bomberHeats: [...bomberHeats],
    numberClimbMinimum,
    numberClimbFreeUntilMs,
    sleeperCells: [...sleeperCells],
    sleeperBlockedCells: new Set(sleeperBlockedCells),
    sleeperBlockedTurns: new Map(sleeperBlockedTurns),
    sleeperBlockTurns,
    jammerCageIds: new Set(jammerCageIds),
    jammerCellsByCage: new Map(jammerCellsByCage),
    chaserCell,
    chaserPreviousCell,
    chaserNextCell,
    chaserRetired,
    chaserStunRemainingMs: currentChaserStunRemaining(),
    strikerCell,
    strikerDirection: strikerDirection ? { ...strikerDirection } : null,
    strikerStunRemainingMs: currentStrikerStunRemaining(),
  };
}

function restoreSnapshot(snapshot) {
  puzzle = [...snapshot.puzzle];
  entries = [...snapshot.entries];
  cages = snapshot.cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum }));
  items = cloneMap(snapshot.items);
  usedItems = new Set(snapshot.usedItems);
  hinted = cloneMap(snapshot.hinted);
  notes = cloneSetMap(snapshot.notes);
  mineNotes = new Set(snapshot.mineNotes || []);
  selected = snapshot.selected;
  score = snapshot.score;
  streak = snapshot.streak;
  activeNumber = snapshot.activeNumber;
  noteMode = snapshot.noteMode;
  patrolSteps = [...(snapshot.patrolSteps || [])];
  bomberRoute = [...(snapshot.bomberRoute || [])];
  bomberSteps = [...(snapshot.bomberSteps || (snapshot.bomberStep !== undefined ? [snapshot.bomberStep] : []))];
  bomberHeats = [...(snapshot.bomberHeats || (snapshot.bomberHeat !== undefined ? [snapshot.bomberHeat] : []))];
  numberClimbMinimum = snapshot.numberClimbMinimum || 1;
  numberClimbFreeUntilMs = snapshot.numberClimbFreeUntilMs || 0;
  sleeperCells = [...(snapshot.sleeperCells || (snapshot.sleeperCell !== undefined && snapshot.sleeperCell !== null ? [snapshot.sleeperCell] : []))];
  sleeperBlockedCells = new Set(snapshot.sleeperBlockedCells || []);
  sleeperBlockedTurns = new Map(snapshot.sleeperBlockedTurns || [...sleeperBlockedCells].map((cell) => [cell, snapshot.sleeperBlockTurns || 0]));
  sleeperBlockTurns = snapshot.sleeperBlockTurns || 0;
  jammerCageIds = new Set(snapshot.jammerCageIds || []);
  jammerCellsByCage = new Map(snapshot.jammerCellsByCage || []);
  chaserCell = snapshot.chaserCell ?? null;
  chaserPreviousCell = snapshot.chaserPreviousCell ?? null;
  chaserNextCell = snapshot.chaserNextCell ?? null;
  chaserRetired = Boolean(snapshot.chaserRetired);
  chaserStunRemainingMs = snapshot.chaserStunRemainingMs || 0;
  chaserStunnedUntil = chaserStunRemainingMs > 0 ? Date.now() + chaserStunRemainingMs : 0;
  strikerCell = snapshot.strikerCell ?? null;
  strikerDirection = snapshot.strikerDirection ? { ...snapshot.strikerDirection } : null;
  strikerStunRemainingMs = snapshot.strikerStunRemainingMs || 0;
  strikerStunnedUntil = strikerStunRemainingMs > 0 ? Date.now() + strikerStunRemainingMs : 0;
  normalizeSleeperBlocks();
  buildCageLookups();
}

function pushUndo() {
  undoStack.push(snapshotState());
  if (undoStack.length > 80) undoStack.shift();
}

function sealItemEffectsInLastUndo(inputCell, scoreBeforeInput, streakBeforeInput, inputPoints, effect = {}) {
  const snapshot = undoStack[undoStack.length - 1];
  if (!snapshot) return;
  const lastIndex = undoStack.length - 1;
  const clearedCells = new Set(effect.clearedCells || []);
  const effectScore = Math.max(0, score - scoreBeforeInput - inputPoints);

  undoStack.forEach((entry, index) => {
    entry.puzzle = [...puzzle];
    entry.cages = cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum }));
    entry.items = cloneMap(items);
    entry.usedItems = new Set(usedItems);
    entry.hinted = cloneMap(hinted);
    entry.notes = cloneSetMap(notes);
    entry.mineNotes = new Set(mineNotes);
    entry.patrolSteps = [...patrolSteps];
    entry.bomberRoute = [...bomberRoute];
    entry.bomberSteps = [...bomberSteps];
    entry.bomberHeats = [...bomberHeats];
    entry.numberClimbFreeUntilMs = numberClimbFreeUntilMs;
    entry.sleeperCells = [...sleeperCells];
    entry.sleeperBlockedCells = new Set(sleeperBlockedCells);
    entry.sleeperBlockedTurns = new Map(sleeperBlockedTurns);
    entry.sleeperBlockTurns = sleeperBlockTurns;
    entry.jammerCageIds = new Set(jammerCageIds);
    entry.jammerCellsByCage = new Map(jammerCellsByCage);
    entry.chaserCell = chaserCell;
    entry.chaserPreviousCell = chaserPreviousCell;
    entry.chaserNextCell = chaserNextCell;
    entry.chaserRetired = chaserRetired;
    entry.chaserStunRemainingMs = currentChaserStunRemaining();
    entry.strikerCell = strikerCell;
    entry.strikerDirection = strikerDirection ? { ...strikerDirection } : null;
    entry.strikerStunRemainingMs = currentStrikerStunRemaining();
    if (effect.numberClimbReset) {
      entry.numberClimbMinimum = 1;
      entry.numberClimbFreeUntilMs = numberClimbFreeUntilMs;
    }
    clearedCells.forEach((cell) => {
      entry.entries[cell] = EMPTY;
    });
    if (index !== lastIndex) {
      entry.score += effectScore;
    }
  });

  snapshot.puzzle = [...puzzle];
  snapshot.entries = [...entries];
  snapshot.entries[inputCell] = EMPTY;
  snapshot.cages = cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum }));
  snapshot.items = cloneMap(items);
  snapshot.usedItems = new Set(usedItems);
  snapshot.hinted = cloneMap(hinted);
  snapshot.notes = cloneSetMap(notes);
  snapshot.mineNotes = new Set(mineNotes);
  snapshot.patrolSteps = [...patrolSteps];
  snapshot.bomberRoute = [...bomberRoute];
  snapshot.bomberSteps = [...bomberSteps];
  snapshot.bomberHeats = [...bomberHeats];
  snapshot.numberClimbFreeUntilMs = numberClimbFreeUntilMs;
  snapshot.sleeperCells = [...sleeperCells];
  snapshot.sleeperBlockedCells = new Set(sleeperBlockedCells);
  snapshot.sleeperBlockedTurns = new Map(sleeperBlockedTurns);
  snapshot.sleeperBlockTurns = sleeperBlockTurns;
  snapshot.jammerCageIds = new Set(jammerCageIds);
  snapshot.jammerCellsByCage = new Map(jammerCellsByCage);
  snapshot.chaserCell = chaserCell;
  snapshot.chaserPreviousCell = chaserPreviousCell;
  snapshot.chaserNextCell = chaserNextCell;
  snapshot.chaserRetired = chaserRetired;
  snapshot.chaserStunRemainingMs = currentChaserStunRemaining();
  snapshot.strikerCell = strikerCell;
  snapshot.strikerDirection = strikerDirection ? { ...strikerDirection } : null;
  snapshot.strikerStunRemainingMs = currentStrikerStunRemaining();
  if (effect.numberClimbReset) {
    snapshot.numberClimbMinimum = 1;
    snapshot.numberClimbFreeUntilMs = numberClimbFreeUntilMs;
  }
  snapshot.score = Math.max(scoreBeforeInput, score - inputPoints);
  snapshot.streak = streakBeforeInput;
  snapshot.activeNumber = null;
  snapshot.noteMode = false;
}

function undoMove() {
  if (over || paused || !undoStack.length) return;
  const snapshot = undoStack.pop();
  restoreSnapshot(snapshot);
  undoUsed = true;
  message(t("undoMessage"));
  render();
}

function renderToolRow() {
  undoButton.disabled = over || paused || blindIntroActive || undoStack.length === 0;
  eraseButton.disabled = over || paused || blindIntroActive || (!notes.has(selected) && !mineNotes.has(selected) && !isWrongEntry(selected));
  noteButton.disabled = over || paused || blindIntroActive;
  noteButton.classList.toggle("is-active", noteMode);
  noteButton.setAttribute("aria-pressed", noteMode ? "true" : "false");
}

function canUseNotes(index) {
  return !over
    && !paused
    && !blindIntroActive
    && puzzle[index] === EMPTY
    && entries[index] === EMPTY
    && !hinted.has(index)
    && !mineNotes.has(index);
}

function toggleNoteMode() {
  if (over || paused) return;
  noteMode = !noteMode;
  render();
}

function toggleNote(number) {
  if (!canUseNotes(selected)) return;
  pushUndo();
  const values = new Set(notes.get(selected) || []);
  if (values.has(number)) {
    values.delete(number);
  } else {
    values.add(number);
  }
  if (values.size) {
    notes.set(selected, values);
  } else {
    notes.delete(selected);
  }
  activeNumber = null;
  render();
}

function eraseSelected() {
  if ((!notes.has(selected) && !mineNotes.has(selected) && !isWrongEntry(selected)) || over || paused || blindIntroActive) return;
  pushUndo();
  const erasedWrongEntry = isWrongEntry(selected);
  if (erasedWrongEntry) entries[selected] = EMPTY;
  notes.delete(selected);
  mineNotes.delete(selected);
  message(t(erasedWrongEntry ? "clearCell" : "eraseMemo", { cell: cellName(selected) }));
  render();
}

function canUseMineNote(index) {
  return isMineSearchMode()
    && noteMode
    && !over
    && !paused
    && !blindIntroActive
    && puzzle[index] === EMPTY
    && entries[index] === EMPTY;
}

function toggleMineNote() {
  if (!canUseMineNote(selected)) return;
  pushUndo();
  if (mineNotes.has(selected)) {
    mineNotes.delete(selected);
  } else {
    mineNotes.add(selected);
    notes.delete(selected);
  }
  activeNumber = null;
  render();
}

function enterNumber(number) {
  if (blindIntroActive) return;
  activeNumber = number;
  if (noteMode) {
    toggleNote(number);
    return;
  }
  if (over || paused || puzzle[selected] !== EMPTY || isCorrectEntry(selected)) return;

  if (isNumberClimbMode() && number < numberClimbMinimumAllowed()) {
    message(t("numberClimbBlocked", { n: numberClimbMinimumAllowed() }));
    return;
  }

  if (patrolBlockedCellsFor().includes(selected)) {
    message(t("patrolBlocked"));
    flashEffect(selected, "effect-patrol-blocked", 500);
    render();
    return;
  }

  if (currentBomberCells().includes(selected)) {
    message(t(isCageEaterMode() ? "cageEaterBlocked" : "bomberBlocked"));
    flashEffect(selected, "effect-bomber-blocked", 500);
    render();
    return;
  }

  normalizeSleeperBlocks();
  if (sleeperCells.includes(selected) || isSleeperBlockedCell(selected)) {
    message(t("sleeperBlocked"));
    flashEffect(selected, "effect-sleeper-blocked", 500);
    render();
    return;
  }

  if (isJammerCell(selected)) {
    message(t("jammerBlocked"));
    flashEffect(selected, "effect-jammer-blocked", 500);
    render();
    return;
  }

  if (selected === currentChaserCell()) {
    message(t("chaserBlocked"));
    flashEffect(selected, "effect-chaser-blocked", 500);
    render();
    return;
  }

  if (isMineSearchMine(selected)) {
    totalMistakes += 1;
    flashEffect(selected, "effect-mine-search-hit", 900);
    showComboToast(t("mineSearchHit"), "combo-toast-xl", { forceFull: true });
    paused = true;
    window.setTimeout(() => {
      if (over) return;
      finish(false, { reason: "mineSearchHit" });
    }, 720);
    return;
  }

  if (number !== solution[selected]) {
    flashEffect(selected, "effect-error");
    if (entries[selected] === number) {
      message(t("wrongKept"));
      render();
      return;
    }
    pushUndo();
    entries[selected] = number;
    hinted.delete(selected);
    notes.delete(selected);
    mineNotes.delete(selected);
    handleMistake();
    return;
  }

  pushUndo();
  const scoreBeforeInput = score;
  const streakBeforeInput = streak;
  const blockWasComplete = isCompletedBlock(selected);
  const selectedCage = cageForCell(selected);
  const cageWasComplete = isCompletedCage(selectedCage);
  const numberSolvedBefore = solvedCountForNumber(number);
  const numberClimbReset = numberClimbResetNumber();
  entries[selected] = number;
  streak += 1;
  const points = correctInputPoints();
  addScore(points);
  hinted.delete(selected);
  notes.delete(selected);
  mineNotes.delete(selected);
  message(t("correct", { cell: cellName(selected), n: number }));
  if (streak % 5 === 0) {
    const level = streak >= 100 ? "combo-toast-century" : streak >= 10 ? "combo-toast-lg" : "combo-toast-normal";
    showComboToast(streak >= 100
      ? t("streak100", { streak, points })
      : t("streak", { streak, points }), level);
  }
  const triggeredItem = triggerItem(selected);
  advanceNumberClimb(number, numberClimbReset);
  if (triggeredItem?.numberClimbReset) {
    numberClimbMinimum = 1;
    activateNumberClimbFreeInput();
    showComboToast(t("numberClimbMineReset"), "combo-toast-lg");
  }
  const bomberEffect = updateBomberAfterInput(selected);
  updateSleeperAfterInput(selected);
  clearSolvedJammerCages(true);
  applyRogueLastCellHints();
  if (!blockWasComplete && isCompletedBlock(selected)) {
    flashCompletedBlock(selected);
    showComboToast(t("blockComplete"));
  }
  const completedCage = cageForCell(selected);
  if (!cageWasComplete && isCompletedCage(completedCage) && completedCage.cells.length >= 2) {
    flashCompletedCage(completedCage);
    showComboToast(t("cageComplete"));
  }
  const boardSolved = isMineSearchMode() ? isMineSearchCleared() : entries.every((value, index) => value === solution[index]);
  const won = isRogueBossStage() ? rogueBossRemainingHp() <= 0 : boardSolved;
  const shiftedCages = !won && maybeShiftCages(selected);
  if (numberSolvedBefore < SIZE && solvedCountForNumber(number) >= SIZE) {
    showComboToast(t("numberComplete", { n: number }));
  }
  if (!won) advancePatrol();
  if (triggeredItem || shiftedCages || bomberEffect.clearedCells.length || bomberEffect.mergedCage) {
    sealItemEffectsInLastUndo(selected, scoreBeforeInput, streakBeforeInput, points, {
      clearedCells: [...(triggeredItem?.clearedCells || []), ...bomberEffect.clearedCells],
      numberClimbReset: Boolean(triggeredItem?.numberClimbReset),
    });
  }
  if (won) {
    finish(true);
    return;
  }
  if (isRogueBossStage() && boardSolved) {
    void continueRogueBossBattle();
    return;
  }
  render();
}

function handleMistake() {
  mistakes += 1;
  totalMistakes += 1;
  if (isRogueRunMode() && rogueRunActive) rogueRunTotalMistakes += 1;
  streak = 0;
  message(t("miss", { n: remainingLives() }));
  if (mistakes >= MAX_LIVES) {
    finish(false);
  } else {
    render();
  }
}

function triggerItem(index) {
  const item = items.get(index);
  if (!item || usedItems.has(index)) return null;
  const result = { type: item, clearedCells: [], numberClimbReset: false };
  usedItems.add(index);
  flashEffect(index, `effect-${item}`, 700);

  if (item === "mine") {
    const mineGuardCount = rogueAbilityCount("mineGuard");
    const mineGuardChance = mineGuardCount >= 3 ? 1 : 1 - Math.pow(0.5, mineGuardCount);
    if (mineGuardCount > 0 && random() < mineGuardChance) {
      showComboToast(t("rogueMineBlocked"), "combo-toast-lg");
      return result;
    }
    result.numberClimbReset = isNumberClimbMode();
    const blastCells = hasRogueAbility("mineCross") ? orthogonalCells(index) : surroundingCells(index);
    const cleared = blastCells.filter((cell) => (
      entries[cell] !== EMPTY && (isSameBlock(cell, index) || !isCompletedBlock(cell))
    ));
    cleared.forEach((cell) => {
      entries[cell] = EMPTY;
      puzzle[cell] = EMPTY;
      hinted.delete(cell);
      notes.delete(cell);
      mineNotes.delete(cell);
      flashEffect(cell, "effect-cleared", 700);
    });
    result.clearedCells = cleared;
    const defeated = defeatPatrolGuardians(blastCells);
    stunChaserIfHit(blastCells);
    stunStrikerIfHit(blastCells);
    message(`Mine cleared ${cleared.length} cells.`);
    const points = cleared.length * 100;
    addScore(points);
    showComboToast(cleared.length > 0
      ? t("mineClear", { n: cleared.length, points })
      : t("mine"), comboLevel(cleared.length));
    if (defeated.length > 0) {
      showComboToast(t("patrolDefeated", { n: defeated.length }), "combo-toast-lg");
    }
  }

  if (item === "heart") {
    const recoveryAmount = 1 + rogueAbilityCount("heartPlus");
    const recovered = Math.min(mistakes, recoveryAmount);
    mistakes = Math.max(0, mistakes - recoveryAmount);
    if (recovered === 0) addScore(30);
    boostHeartDeadline();
    if (hasRogueAbility("heartTime") && adventureTimeLimitMs) {
      rewindElapsed(10000);
      showComboToast(t("rogueHeartTime"), "combo-toast-normal");
    }
    message(`Heart restored ${recovered} life.`);
    showComboToast(recovered === 0 ? t("heartZero") : recovered > 1 ? t("rogueHeartBoost", { n: recovered }) : t("heart"));
  }

  if (item === "hint") {
    const targets = rogueHintTargetCells(index);
    targets.forEach((cell) => {
      const correct = solution[cell];
      const wrong = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => n !== correct))[0];
      hinted.set(cell, hasRogueAbility("hintSingle") ? [correct] : shuffle([correct, wrong]));
      notes.delete(cell);
      mineNotes.delete(cell);
      flashEffect(cell, "effect-hint-target", 700);
    });
    message(`Hint narrowed ${targets.length} cells.`);
    addScore(30);
    showComboToast(hasRogueAbility("hintSingle")
      ? t("rogueHintSingle", { n: targets.length })
      : t("hint", { n: targets.length }), comboLevel(targets.length));
  }

  if (item === "shuffle") {
    const shuffleEasyCount = rogueAbilityCount("shuffleEasy");
    changeCageLayout(shuffleEasyCount >= 2 ? "compact" : shuffleEasyCount >= 1 ? "easy" : "normal");
    addScore(50);
    showComboToast(t("shuffleCages"), "combo-toast-lg");
  }
  return result;
}

function stopAdventureMineTimer() {
  if (adventureMineIntervalId !== null) {
    window.clearInterval(adventureMineIntervalId);
    adventureMineIntervalId = null;
  }
}

function startAdventureMineTimer() {
  stopAdventureMineTimer();
  if (!adventureMineIntervalMs || over || paused) return;
  adventureMineIntervalId = window.setInterval(addAdventureMine, adventureMineIntervalMs);
}

function currentHeartElapsedMs() {
  if (!isHeartbeatMode()) return 0;
  return timerId === null ? heartDeadlineElapsedMs : heartDeadlineElapsedMs + Date.now() - heartDeadlineStartMs;
}

function startHeartDeadline() {
  heartDeadlineElapsedMs = 0;
  heartDeadlineStartMs = Date.now();
}

function pauseHeartDeadline() {
  if (!isHeartbeatMode() || timerId === null) return;
  heartDeadlineElapsedMs = currentHeartElapsedMs();
}

function resumeHeartDeadline() {
  if (!isHeartbeatMode()) return;
  heartDeadlineStartMs = Date.now();
}

function boostHeartDeadline() {
  if (!isHeartbeatMode()) return;
  heartDeadlineElapsedMs = Math.max(0, currentHeartElapsedMs() - (ADVENTURE_STAGES.heartbeat.heartBoostMs || 20000));
  heartDeadlineStartMs = Date.now();
}

function maybeShiftCages(inputCell) {
  if (!isShiftingCagesMode() || !cageShiftEvery) return false;
  if (cageShiftCountedCells.has(inputCell)) return false;
  cageShiftCountedCells.add(inputCell);
  cageShiftSteps += 1;
  if (cageShiftSteps < cageShiftEvery) return false;
  cageShiftSteps = 0;
  changeCageLayout("extreme");
  showComboToast(t("cageShifted"), "combo-toast-normal");
  return true;
}

function changeCageLayout(profile = "normal") {
  cages = makeCages(profile);
  buildCageLookups();
  normalizeJammersAfterCageChange();
  flashCellsEffect(emptyCells(), "effect-cage-shift", 520);
}

function addAdventureMine() {
  if (over || paused || !isGrowingMinesMode()) return;
  const candidates = shuffle(emptyCells()).filter((cell) => entries[cell] === EMPTY);
  if (!candidates.length) return;
  const cell = candidates[0];
  items.set(cell, "mine");
  usedItems.delete(cell);
  flashEffect(cell, "effect-mine", 700);
  showComboToast(t("mineAdded"), "combo-toast-normal");
  render();
}

function flashEffect(index, className, duration = 360) {
  effects.set(index, className);
  if (!over) render();
  window.setTimeout(() => {
    effects.delete(index);
    if (!over) render();
  }, duration);
}

function flashCellsEffect(cells, className, duration = 360) {
  cells.forEach((cell) => effects.set(cell, className));
  if (!over) render();
  window.setTimeout(() => {
    cells.forEach((cell) => {
      if (effects.get(cell) === className) effects.delete(cell);
    });
    if (!over) render();
  }, duration);
}

function cellName(index) {
  return t("cellName", { row: rowOf(index) + 1, col: colOf(index) + 1 });
}

function message(text) {
  void text;
}

function applyLocale() {
  document.documentElement.lang = LOCALE;
  document.title = t("appTitle");
  const title = document.querySelector(".topbar h1");
  if (title) {
    title.textContent = t("appTitle");
    title.classList.toggle("title-ja", LOCALE === "ja");
  }
  document.querySelector(".topbar")?.setAttribute("aria-label", t("gameInfo"));
  recordButton.textContent = t("showRecords");
  newGameButton.setAttribute("aria-label", t("chooseDifficulty"));

  const statLabels = document.querySelectorAll(".status-panel .stat span");
  [t("difficultyLabel"), t("time"), t("mistakes"), t("score")].forEach((text, index) => {
    if (statLabels[index]) statLabels[index].textContent = text;
  });

  document.querySelector(".board-wrap")?.setAttribute("aria-label", t("board"));
  document.querySelector(".controls")?.setAttribute("aria-label", t("numberInput"));
  document.querySelector(".tool-row")?.setAttribute("aria-label", t("tools"));
  undoButton.textContent = t("undo");
  noteButton.textContent = t("note");
  eraseButton.textContent = t("erase");

  document.querySelector(".item-legend")?.setAttribute("aria-label", t("itemLegend"));
  legendEntries.forEach((entry) => {
    const type = entry.dataset.item;
    const label = entry.querySelector("span:not(.legend-icon)");
    if (label) label.innerHTML = `<strong>${itemLabel(type)}</strong>${itemHelp(type)}`;
  });

  document.querySelector("#loadingOverlay strong").textContent = t("generating");
  document.querySelector("#difficultyDialog h2").textContent = t("selectDifficulty");
  itemPicker.setAttribute("aria-label", t("itemPicker"));
  document.querySelector(".picker-title").textContent = t("itemPicker");
  document.querySelector("#adventureDialog h2").textContent = t("adventureTitle");
  document.querySelector(".adventure-intro").textContent = t("adventureIntro");
  document.querySelector(".adventure-practice-toggle strong").textContent = t("adventurePractice");
  document.querySelector(".adventure-practice-toggle small").textContent = t("adventurePracticeHelp");
  adventureBackButton.textContent = t("backToDifficulty");
  document.querySelector("#recordDialog h2").textContent = t("records");
  closeRecordButton.textContent = t("close");

  document.querySelector("#firstRunDialog h2").textContent = t("firstRunTitle");
  document.querySelector("#firstRunDialog p").textContent = t("firstRunText");
  document.querySelector(".intro-items")?.setAttribute("aria-label", t("itemIntro"));
  document.querySelectorAll(".intro-items span").forEach((entry, index) => {
    const type = ITEM_TYPES[index];
    const icon = entry.querySelector(".legend-icon");
    entry.textContent = "";
    if (icon) entry.append(icon);
    entry.append(document.createTextNode(itemLabel(type)));
  });
  firstRunStartButton.textContent = t("startFirst");
  firstRunDifficultyButton.textContent = t("chooseDifficulty");

  dialogTitle.textContent = t("gameFinished");
  reviveButton.textContent = t("reviveAd");
  retryButton.textContent = t("retry");
  dialogButton.textContent = t("chooseDifficulty");

  document.querySelector("#pauseDialog h2").textContent = t("paused");
  document.querySelector("#pauseDialog p").textContent = t("pausedText");
  resumeButton.textContent = t("resume");
  pauseDifficultyButton.textContent = t("chooseDifficulty");

  document.querySelector("#resetDialog h2").textContent = t("resetTitle");
  cancelResetButton.textContent = t("continue");
  resetRetryButton.textContent = t("restart");
  confirmResetButton.textContent = t("chooseDifficulty");
}

function startTimer() {
  stopTimer();
  startTime = Date.now();
  elapsedMs = 0;
  if (isHeartbeatMode()) startHeartDeadline();
  timerId = window.setInterval(() => {
    updateTimerTick();
  }, 250);
  startAdventureMineTimer();
  startChaserTimer();
  startStrikerTimer();
  startLightningTimer();
}

function stopTimer() {
  if (timerId !== null) {
    elapsedMs = currentElapsedMs();
    pauseHeartDeadline();
    window.clearInterval(timerId);
    timerId = null;
  }
  stopAdventureMineTimer();
  stopChaserTimer();
  stopStrikerTimer();
  resetLightning();
}

function resumeTimer() {
  if (timerId !== null) return;
  startTime = Date.now();
  resumeHeartDeadline();
  timerId = window.setInterval(() => {
    updateTimerTick();
  }, 250);
  startAdventureMineTimer();
  startChaserTimer();
  startStrikerTimer();
  startLightningTimer();
}

function currentElapsedMs() {
  return timerId === null ? elapsedMs : elapsedMs + Date.now() - startTime;
}

function timerDisplayText() {
  if (isHeartbeatMode() && heartDeadlineMs) return formatTime(Math.max(0, heartDeadlineMs - currentHeartElapsedMs()));
  if (!adventureTimeLimitMs) return formatTime(currentElapsedMs());
  const remaining = Math.max(0, adventureTimeLimitMs - currentElapsedMs());
  return formatTime(remaining);
}

function updateTimerTick() {
  timerEl.textContent = timerDisplayText();
  if (isNumberClimbMode()) renderNumberClimbPanel();
  if (adventureTimeLimitMs && currentElapsedMs() >= adventureTimeLimitMs && !over) {
    finish(false, { reason: "timeUp" });
    return;
  }
  if (isHeartbeatMode() && heartDeadlineMs && currentHeartElapsedMs() >= heartDeadlineMs && !over) {
    finish(false, { reason: "heartbeatUp" });
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function finish(won, options = {}) {
  over = true;
  paused = false;
  stopTimer();
  const recordKey = currentRecordKey();
  const resultElapsedMs = isRogueRunMode() ? rogueRunElapsedMs + elapsedMs : elapsedMs;
  if (won && isRogueRunMode() && rogueRunActive && rogueRunStage < rogueStageCount()) {
    rogueRunElapsedMs += elapsedMs;
    rogueRunScoreCarry = score;
    render();
    trackWebEvent("rogue_stage_clear", {
      record_key: recordKey,
      stage: rogueRunStage,
      time_seconds: Math.floor(rogueRunElapsedMs / 1000),
      score,
      abilities: rogueRunAbilities.join(","),
    });
    showRogueRewardDialog();
    return;
  }
  const mistakeResultCount = isRogueRunMode() ? rogueRunTotalMistakes : totalMistakes;
  const noMistakeClear = won && mistakeResultCount === 0;
  const canSaveRecord = won && !currentAdventurePractice;
  if (canSaveRecord && noMistakeClear) saveNoMistakeRecord(recordKey);
  const timeRecord = canSaveRecord ? saveBestTime(recordKey, resultElapsedMs) : null;
  const scoreRecord = canSaveRecord ? saveBestScore(recordKey, score) : null;
  if (canSaveRecord && isRogueRunMode()) {
    const savedAbilities = readRogueBestAbilities();
    if (scoreRecord.isBest || !Array.isArray(savedAbilities[recordKey])) {
      saveRogueBestAbilities(recordKey, rogueRunAbilities);
    }
  }
  if (won && !currentAdventurePractice) renderDifficultyChoices();
  render();
  trackWebEvent(won ? "game_clear" : "game_over", {
    record_key: recordKey,
    time_seconds: Math.floor(resultElapsedMs / 1000),
    score,
    mistakes: mistakeResultCount,
    no_mistake: noMistakeClear,
    rogue_abilities: isRogueRunMode() ? rogueRunAbilities.join(",") : "",
    reason: options.reason || "",
  });
  dialogTitle.textContent = won && isRogueRunMode() ? t("rogueRunClear") : won ? t("clear") : t("gameOver");
  if (won) {
    const badges = currentAdventurePractice
      ? `<span class="best-badge subtle-badge">${t("adventurePracticeBadge")}</span>`
      : `${timeRecord.isBest ? `<span class="best-badge">${t("bestTime")}</span>` : ""}${scoreRecord.isBest ? `<span class="best-badge">${t("bestScore")}</span>` : ""}${noMistakeClear ? `<span class="best-badge subtle-badge">${t("noMistakeClear")}</span>` : ""}`;
    const rogueSummary = isRogueRunMode() ? rogueResultAbilityHtml() : "";
    const bestStats = currentAdventurePractice
      ? ""
      : `<div><dt>${t("bestTimeLabel")}</dt><dd>${formatTime(timeRecord.best)}</dd></div><div><dt>${t("bestScoreLabel")}</dt><dd>${scoreRecord.best}</dd></div>`;
    dialogText.innerHTML = `${badges}${rogueSummary}<dl class="result-grid"><div><dt>${t("time")}</dt><dd>${formatTime(resultElapsedMs)}</dd></div><div><dt>${t("score")}</dt><dd>${score}</dd></div>${bestStats}<div><dt>${t("mistakeResult")}</dt><dd>${t("mistakeCount", { n: isRogueRunMode() ? rogueRunTotalMistakes : mistakes })}</dd></div><div><dt>${t("difficultyResult")}</dt><dd>${difficultyResultLabel()}</dd></div></dl>`;
  } else {
    const reason = options.reason === "timeUp"
      ? t("timeUp")
      : options.reason === "heartbeatUp" ? t("heartbeatUp")
      : options.reason === "mineSearchHit" ? t("mineSearchHit") : t("gameOverText");
    const rogueSummary = isRogueRunMode() ? rogueResultAbilityHtml() : "";
    dialogText.innerHTML = `<span>${reason}</span>${rogueSummary}<dl class="result-grid"><div><dt>${t("time")}</dt><dd>${formatTime(resultElapsedMs)}</dd></div><div><dt>${t("score")}</dt><dd>${score}</dd></div></dl>`;
  }
  setReviveButtonVisible(!won && !reviveUsed && options.reason !== "timeUp" && options.reason !== "heartbeatUp" && options.reason !== "mineSearchHit");
  retryButton.hidden = false;
  dialog.showModal();
}

function reviveAfterReward() {
  if (!over || reviveUsed) return;
  revivePending = false;
  reviveUsed = true;
  mistakes = 0;
  over = false;
  paused = false;
  if (dialog.open) dialog.close();
  resumeTimer();
  render();
  showComboToast(t("revived"), "combo-toast-lg");
}

function cancelReviveRequest(messageText = t("adLoadFailed")) {
  revivePending = false;
  setReviveButtonVisible(over && !reviveUsed);
  message(messageText);
}

function requestRewardedRevive() {
  if (window.KILLER_WEB_DEMO_NO_ADS === true) return;
  if (!over || reviveUsed || revivePending) return;
  revivePending = true;
  setReviveButtonVisible(true);
  const bridge = window.KillerItemSudokuAds;
  if (bridge && typeof bridge.showRewardedRevive === "function") {
    bridge.showRewardedRevive();
    return;
  }
  cancelReviveRequest(t("adUnavailable"));
}

window.onRewardedReviveEarned = reviveAfterReward;
window.onRewardedReviveUnavailable = () => cancelReviveRequest(t("adPreparing"));
window.onRewardedReviveClosed = () => cancelReviveRequest(t("adClosed"));

function showDifficultyDialog() {
  if (difficultyDialog.open) return;
  if (adventureDialog.open) adventureDialog.close();
  if (firstRunDialog.open) firstRunDialog.close();
  if (rogueRewardDialog.open) rogueRewardDialog.close();
  renderDifficultyChoices();
  difficultyDialog.showModal();
  syncBoardObscured();
}

function showAdventureDialog() {
  if (adventureDialog.open) return;
  if (difficultyDialog.open) difficultyDialog.close();
  if (firstRunDialog.open) firstRunDialog.close();
  if (rogueRewardDialog.open) rogueRewardDialog.close();
  renderAdventureChoices();
  adventureDialog.showModal();
  syncBoardObscured();
}

function showCurrentModeSelectionDialog() {
  if (isRogueRunMode()) {
    showDifficultyDialog();
  } else if (currentAdventureStage) {
    showAdventureDialog();
  } else {
    showDifficultyDialog();
  }
}

function showRecordDialog() {
  if (recordDialog.open) return;
  recordReturnDialog = difficultyDialog.open ? "difficulty" : adventureDialog.open ? "adventure" : null;
  if (difficultyDialog.open) difficultyDialog.close();
  if (adventureDialog.open) adventureDialog.close();
  if (firstRunDialog.open) firstRunDialog.close();
  recordPausedGame = !recordReturnDialog && !over && !paused;
  if (recordPausedGame) pauseGame(false);
  renderRecords();
  recordDialog.showModal();
  syncBoardObscured();
}

function closeRecordDialog() {
  if (recordDialog.open) recordDialog.close();
  syncBoardObscured();
}

function backToDifficultyDialog() {
  if (adventureDialog.open) adventureDialog.close();
  showDifficultyDialog();
}

async function startFirstRunGame() {
  markFirstRunSeen();
  selectedItemTypes = new Set(ITEM_TYPES);
  saveSelectedItemTypes();
  dailyChallenge = false;
  renderItemPicker();
  renderDifficultyChoices();
  if (firstRunDialog.open) firstRunDialog.close();
  await newGame("easy", { intro: true });
}

function showFirstRunDifficulty() {
  markFirstRunSeen();
  if (firstRunDialog.open) firstRunDialog.close();
  showDifficultyDialog();
}

function pauseGame(showDialog = true) {
  if (over || paused) return;
  paused = true;
  stopTimer();
  render();
  if (
    showDialog &&
    !pauseDialog.open &&
    !dialog.open &&
    !rogueRewardDialog.open &&
    !firstRunDialog.open &&
    !difficultyDialog.open &&
    !resetDialog.open
  ) {
    pauseDialog.showModal();
  }
  syncBoardObscured();
}

function resumeGame() {
  if (over || !paused) return;
  paused = false;
  if (pauseDialog.open) pauseDialog.close();
  resumeTimer();
  render();
  syncBoardObscured();
}

function showResetDialog() {
  if (over) {
    showCurrentModeSelectionDialog();
    return;
  }
  pauseGame(false);
  resetRetryButton.hidden = Boolean(currentAdventureStage);
  if (!resetDialog.open) resetDialog.showModal();
  syncBoardObscured();
}

function cancelReset() {
  if (resetDialog.open) resetDialog.close();
  resumeGame();
  syncBoardObscured();
}

function confirmReset() {
  if (resetDialog.open) resetDialog.close();
  if (pauseDialog.open) pauseDialog.close();
  over = true;
  paused = false;
  stopTimer();
  render();
  showCurrentModeSelectionDialog();
  syncBoardObscured();
}

function cloneMap(map) {
  return new Map([...map.entries()].map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]));
}

function saveInitialState() {
  initialState = {
    difficulty: currentDifficulty,
    dailyKey: currentDailyKey,
    adventureStage: currentAdventureStage,
    adventurePractice: currentAdventurePractice,
    adventureTimeLimitMs,
    adventureMineIntervalMs,
    heartDeadlineMs,
    cageShiftEvery,
    patrolRoute: [...patrolRoute],
    patrolSteps: [...patrolSteps],
    bomberRoute: [...bomberRoute],
    bomberSteps: [...bomberSteps],
    bomberHeats: [...bomberHeats],
    numberClimbMinimum,
    numberClimbFreeUntilMs,
    sleeperCells: [...sleeperCells],
    sleeperBlockedCells: new Set(sleeperBlockedCells),
    sleeperBlockedTurns: new Map(sleeperBlockedTurns),
    sleeperBlockTurns,
    jammerCageIds: new Set(jammerCageIds),
    jammerCellsByCage: new Map(jammerCellsByCage),
    chaserCell,
    chaserPreviousCell,
    chaserNextCell,
    chaserRetired,
    chaserStunRemainingMs: currentChaserStunRemaining(),
    strikerCell,
    strikerDirection: strikerDirection ? { ...strikerDirection } : null,
    strikerStunRemainingMs: currentStrikerStunRemaining(),
    solution: [...solution],
    puzzle: [...puzzle],
    cages: cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum })),
    items: cloneMap(items),
    selected,
  };
}

function retryGame() {
  if (currentAdventureStage) {
    const stageKey = currentAdventureStage;
    if (dialog.open) dialog.close();
    if (pauseDialog.open) pauseDialog.close();
    if (resetDialog.open) resetDialog.close();
    void startAdventureStage(stageKey);
    return;
  }
  if (!initialState) return;
  currentDifficulty = initialState.difficulty;
  currentDailyKey = initialState.dailyKey;
  currentAdventureStage = initialState.adventureStage;
  currentAdventurePractice = Boolean(initialState.adventurePractice);
  adventureTimeLimitMs = initialState.adventureTimeLimitMs;
  adventureMineIntervalMs = initialState.adventureMineIntervalMs;
  heartDeadlineMs = initialState.heartDeadlineMs || null;
  heartDeadlineElapsedMs = 0;
  heartDeadlineStartMs = 0;
  cageShiftEvery = initialState.cageShiftEvery || null;
  cageShiftSteps = 0;
  cageShiftCountedCells = new Set();
  patrolRoute = [...(initialState.patrolRoute || [])];
  patrolSteps = [...(initialState.patrolSteps || [])];
  bomberRoute = [...(initialState.bomberRoute || [])];
  bomberSteps = [...(initialState.bomberSteps || (initialState.bomberStep !== undefined ? [initialState.bomberStep] : []))];
  bomberHeats = [...(initialState.bomberHeats || (initialState.bomberHeat !== undefined ? [initialState.bomberHeat] : []))];
  numberClimbMinimum = initialState.numberClimbMinimum || 1;
  numberClimbFreeUntilMs = initialState.numberClimbFreeUntilMs || 0;
  sleeperCells = [...(initialState.sleeperCells || (initialState.sleeperCell !== undefined && initialState.sleeperCell !== null ? [initialState.sleeperCell] : []))];
  sleeperBlockedCells = new Set(initialState.sleeperBlockedCells || []);
  sleeperBlockedTurns = new Map(initialState.sleeperBlockedTurns || [...sleeperBlockedCells].map((cell) => [cell, initialState.sleeperBlockTurns || 0]));
  sleeperBlockTurns = initialState.sleeperBlockTurns || 0;
  jammerCageIds = new Set(initialState.jammerCageIds || []);
  jammerCellsByCage = new Map(initialState.jammerCellsByCage || []);
  chaserCell = initialState.chaserCell ?? null;
  chaserPreviousCell = initialState.chaserPreviousCell ?? null;
  chaserNextCell = initialState.chaserNextCell ?? null;
  chaserRetired = Boolean(initialState.chaserRetired);
  chaserStunRemainingMs = initialState.chaserStunRemainingMs || 0;
  chaserStunnedUntil = chaserStunRemainingMs > 0 ? Date.now() + chaserStunRemainingMs : 0;
  strikerCell = initialState.strikerCell ?? null;
  strikerDirection = initialState.strikerDirection ? { ...initialState.strikerDirection } : null;
  strikerStunRemainingMs = initialState.strikerStunRemainingMs || 0;
  strikerStunnedUntil = strikerStunRemainingMs > 0 ? Date.now() + strikerStunRemainingMs : 0;
  normalizeSleeperBlocks();
  solution = [...initialState.solution];
  puzzle = [...initialState.puzzle];
  entries = [...puzzle];
  cages = initialState.cages.map((cage) => ({ id: cage.id, cells: [...cage.cells], sum: cage.sum }));
  buildCageLookups();
  items = cloneMap(initialState.items);
  usedItems = new Set();
  hinted = new Map();
  notes = new Map();
  mineNotes = new Set();
  effects = new Map();
  selected = initialState.selected;
  mistakes = 0;
  totalMistakes = 0;
  score = 0;
  showScoreCard = false;
  streak = 0;
  activeNumber = null;
  noteMode = false;
  undoStack = [];
  undoUsed = false;
  reviveUsed = false;
  revivePending = false;
  over = false;
  paused = false;
  if (dialog.open) dialog.close();
  if (pauseDialog.open) pauseDialog.close();
  if (resetDialog.open) resetDialog.close();
  clearBlindIntroTimer();
  blindIntroActive = false;
  startTimer();
  render();
}

async function startAdventureStage(stageKey) {
  const stage = ADVENTURE_STAGES[stageKey];
  if (!stage) return;
  if (stageKey === "rogueRun") {
    await startRogueRun();
    return;
  }
  resetRogueRunState();
  dailyChallenge = false;
  await newGame(stage.difficulty, { adventureStage: stageKey });
}

async function newGame(difficultyKey = currentDifficulty, options = {}) {
  if (generating) return;
  generating = true;
  const requestedAdventureStage = options.adventureStage || null;
  const continuingRogueRun = requestedAdventureStage === "rogueRun" && options.rogueContinue && rogueRunActive;
  const bossContinuation = continuingRogueRun ? options.bossContinue || null : null;
  const roguePlan = continuingRogueRun ? currentRogueStagePlan() : null;
  currentDifficulty = roguePlan?.difficulty || difficultyKey;
  const config = DIFFICULTIES[currentDifficulty];
  const adventureStage = requestedAdventureStage ? ADVENTURE_STAGES[requestedAdventureStage] : null;
  if (!continuingRogueRun) resetRogueRunState();
  const nextDailyKey = dailyChallenge && !options.adventureStage ? todayKey() : null;
  const seed = nextDailyKey ? hashSeed(`daily-v1:${nextDailyKey}:${difficultyKey}:${itemSeedKey()}`) : null;
  const previousRandomSource = randomSource;
  if (dialog.open) dialog.close();
  if (pauseDialog.open) pauseDialog.close();
  if (resetDialog.open) resetDialog.close();
  if (rogueRewardDialog.open) rogueRewardDialog.close();
  if (firstRunDialog.open) firstRunDialog.close();
  if (difficultyDialog.open) difficultyDialog.close();
  if (adventureDialog.open) adventureDialog.close();
  stopTimer();
  clearBlindIntroTimer();
  clearComboToasts();
  blindIntroActive = false;
  setLoading(true);
  await nextPaint();
  try {
    currentAdventureStage = requestedAdventureStage;
    currentAdventurePractice = Boolean(currentAdventureStage && adventurePracticeEnabled);
    adventureTimeLimitMs = currentAdventurePractice ? null : roguePlan?.timeLimitMs || adventureStage?.timeLimitMs || null;
    adventureMineIntervalMs = isGrowingMinesMode() ? adventureRuleConfig("growingMines").mineIntervalMs || adventureStage?.mineIntervalMs || null : null;
    heartDeadlineMs = currentAdventurePractice ? null : adventureStage?.heartDeadlineMs || null;
    heartDeadlineElapsedMs = 0;
    heartDeadlineStartMs = 0;
    cageShiftEvery = isShiftingCagesMode()
      ? adventureRuleConfig("shiftingCages").cageShiftEvery || adventureStage?.cageShiftEvery || 5
      : null;
    cageShiftSteps = 0;
    cageShiftCountedCells = new Set();
    patrolRoute = [];
    patrolSteps = [];
    bomberRoute = [];
    bomberSteps = [];
    bomberHeats = [];
    numberClimbMinimum = 1;
    numberClimbFreeUntilMs = 0;
    sleeperCells = [];
    sleeperBlockedCells = new Set();
    sleeperBlockedTurns = new Map();
    sleeperBlockTurns = 0;
    jammerCageIds = new Set();
    jammerCellsByCage = new Map();
    chaserCell = null;
    chaserPreviousCell = null;
    chaserNextCell = null;
    chaserRetired = false;
    chaserStunnedUntil = 0;
    chaserStunRemainingMs = 0;
    strikerCell = null;
    strikerDirection = null;
    strikerStunnedUntil = 0;
    strikerStunRemainingMs = 0;
    lightningCells = [];
    lightningPhase = "idle";
    currentDailyKey = currentAdventureStage ? null : nextDailyKey;
    if (seed !== null) randomSource = seededRandom(seed);
    if (adventureStage?.itemMode === "growingMines" || isShiftingCagesMode()) {
      generateCageOnlyUniquePuzzle(config);
    } else if (config.loose) {
      generateLoosePuzzle(config);
    } else {
      generateUniquePuzzle(config);
    }
    const introStartCell = options.intro ? prepareIntroStartCell() : null;
    entries = [...puzzle];
    buildCageLookups();
    items = adventureStage
      ? placeAdventureItems(adventureStage)
      : options.intro ? placeIntroItems(config.itemCount, introStartCell) : placeItems(config.itemCount);
    usedItems = new Set();
    hinted = new Map();
    notes = new Map();
    mineNotes = new Set();
    effects = new Map();
    selected = options.intro
      ? introStartCell ?? [...items.entries()].find(([, item]) => item === "hint")?.[0] ?? puzzle.findIndex((value) => value === EMPTY)
      : puzzle.findIndex((value) => value === EMPTY);
    setupPatrol();
    setupBomber();
    setupSleeper();
    setupJammer();
    setupChaser();
    setupStriker();
    const patrolCells = currentPatrolCells();
    const patrolBlockedCells = patrolBlockedCellsFor(patrolCells);
    const bomberCells = currentBomberCells();
    const blockedChaserCell = currentChaserCell();
    if (patrolBlockedCells.includes(selected) || bomberCells.includes(selected) || selected === blockedChaserCell || sleeperCells.includes(selected) || isSleeperBlockedCell(selected) || isJammerCell(selected)) {
      const blockedCells = new Set([
        ...patrolBlockedCells,
        ...bomberCells,
        blockedChaserCell,
        ...sleeperCells,
        ...sleeperBlockedCells,
        ...jammerCellsByCage.values(),
      ].filter((cell) => cell !== null));
      const openCell = puzzle.findIndex((value, index) => value === EMPTY && !blockedCells.has(index));
      if (openCell >= 0) selected = openCell;
    }
    mistakes = bossContinuation?.mistakes ?? 0;
    totalMistakes = bossContinuation?.totalMistakes ?? 0;
    score = continuingRogueRun ? rogueRunScoreCarry : 0;
    rogueBossScoreStart = roguePlan?.boss ? bossContinuation?.bossScoreStart ?? score : 0;
    elapsedMs = bossContinuation?.elapsedMs ?? 0;
    startTime = 0;
    showScoreCard = false;
    streak = 0;
    activeNumber = null;
    noteMode = false;
    undoStack = [];
    undoUsed = bossContinuation?.undoUsed ?? false;
    reviveUsed = bossContinuation?.reviveUsed ?? false;
    revivePending = false;
    over = false;
    paused = false;
    if (selected < 0) selected = 0;
    message(t("introMessage"));
    saveInitialState();
    if (currentAdventureMode() === "blind") {
      startBlindIntro();
    } else {
      startTimer();
    }
    render();
    trackWebEvent("game_start", {
      record_key: currentRecordKey(),
      source: options.intro ? "intro" : currentAdventureStage ? "adventure" : currentDailyKey ? "daily" : "menu",
      item_key: itemSeedKey(),
    });
  } finally {
    randomSource = previousRandomSource;
    setLoading(false);
    generating = false;
  }
}

applyLocale();

recordButton.addEventListener("click", showRecordDialog);
closeRecordButton.addEventListener("click", closeRecordDialog);
adventurePracticeInput?.addEventListener("change", () => {
  adventurePracticeEnabled = adventurePracticeInput.checked;
  localStorage.setItem(ADVENTURE_PRACTICE_KEY, adventurePracticeEnabled ? "1" : "0");
  renderAdventureChoices();
});
recordDialog.addEventListener("close", () => {
  const returnDialog = recordReturnDialog;
  recordReturnDialog = null;
  if (recordPausedGame) {
    recordPausedGame = false;
    resumeGame();
  }
  if (returnDialog === "difficulty") showDifficultyDialog();
  if (returnDialog === "adventure") showAdventureDialog();
});
newGameButton.addEventListener("click", showResetDialog);
scoreStat.addEventListener("click", toggleScoreCard);
scoreStat.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  toggleScoreCard();
});
legendEntries.forEach((entry) => {
  entry.addEventListener("click", () => {
    if (entry.dataset.item === "mine") toggleMineNote();
  });
});
boardEl.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  const cell = event.target.closest(".cell");
  if (!cell || !boardEl.contains(cell)) return;
  event.preventDefault();
  const index = Number(cell.dataset.index);
  if (isCenterBoxCell(index)) softenComboToast();
  selectBoardCell(index);
});
boardEl.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const cell = event.target.closest(".cell");
  if (!cell || !boardEl.contains(cell)) return;
  event.preventDefault();
  selectBoardCell(Number(cell.dataset.index));
});
undoButton.addEventListener("click", undoMove);
noteButton.addEventListener("click", toggleNoteMode);
eraseButton.addEventListener("click", eraseSelected);
reviveButton.addEventListener("click", requestRewardedRevive);
retryButton.addEventListener("click", retryGame);
dialogButton.addEventListener("click", () => {
  if (dialog.open) dialog.close();
  showCurrentModeSelectionDialog();
});
rogueRewardDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});
rogueRewardDialog.addEventListener("click", (event) => {
  const chip = event.target.closest(".rogue-current-ability-chip");
  if (!chip) return;
  const detail = rogueCurrentAbilities.querySelector(".rogue-current-ability-detail");
  if (!detail) return;
  const shouldClose = chip.classList.contains("is-selected") && !detail.hidden;
  rogueCurrentAbilities.querySelectorAll(".rogue-current-ability-chip").forEach((button) => {
    button.classList.toggle("is-selected", !shouldClose && button === chip);
  });
  if (shouldClose) {
    detail.textContent = "";
    detail.hidden = true;
    return;
  }
  detail.textContent = chip.dataset.abilityHelp || "";
  detail.hidden = false;
});
rogueAbilityPanel.addEventListener("click", (event) => {
  const chip = event.target.closest(".rogue-ability-chip");
  if (!chip) return;
  const detail = rogueAbilityPanel.querySelector(".rogue-ability-detail");
  if (!detail) return;
  const shouldClose = chip.classList.contains("is-selected") && !detail.hidden;
  rogueAbilityPanel.querySelectorAll(".rogue-ability-chip").forEach((button) => {
    button.classList.toggle("is-selected", !shouldClose && button === chip);
  });
  if (shouldClose) {
    detail.textContent = "";
    detail.hidden = true;
    return;
  }
  detail.textContent = chip.dataset.abilityHelp || "";
  detail.hidden = false;
});
[difficultyDialog, adventureDialog, recordDialog, firstRunDialog, dialog, pauseDialog, resetDialog, rogueRewardDialog].forEach((dialogElement) => {
  dialogElement.addEventListener("close", syncBoardObscured);
});
resumeButton.addEventListener("click", resumeGame);
adventureBackButton.addEventListener("click", backToDifficultyDialog);
pauseDifficultyButton.addEventListener("click", confirmReset);
cancelResetButton.addEventListener("click", cancelReset);
resetRetryButton.addEventListener("click", retryGame);
confirmResetButton.addEventListener("click", confirmReset);
firstRunStartButton.addEventListener("click", () => {
  void startFirstRunGame();
});
firstRunDifficultyButton.addEventListener("click", showFirstRunDifficulty);

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    undoMove();
    return;
  }
  const arrowMoves = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };
  if (event.key in arrowMoves) {
    if (moveSelectionBy(...arrowMoves[event.key])) event.preventDefault();
    return;
  }
  if (event.key.toLowerCase() === "m") {
    toggleNoteMode();
    return;
  }
  if (event.key === "Backspace" || event.key === "Delete") {
    eraseSelected();
    return;
  }
  if (event.key >= "1" && event.key <= "9") enterNumber(Number(event.key));
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseGame(true);
});

window.history.replaceState({ screen: "game" }, "");
window.history.pushState({ screen: "guard" }, "");
window.addEventListener("popstate", () => {
  pauseGame(true);
  window.history.pushState({ screen: "guard" }, "");
});

renderPad();
renderLegend();
renderItemPicker();
renderDifficultyChoices();
renderAdventureChoices();
render();
if (hasSeenFirstRun()) {
  showDifficultyDialog();
} else {
  firstRunDialog.showModal();
}

