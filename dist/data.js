(function () {
  const zhHant = {
    appTitle: "人工青口：藍灣失蹤的信號",
    tagLine: "一場在地圖上展開的海洋科學探索",
    demoNote: "約 8–10 分鐘 · 適合小四至小五",
    start: "開始探索", next: "下一步", continue: "繼續", close: "關閉", restart: "重新開始",
    uiLanguage: "遊戲介面語言", voiceLanguage: "語音語言", captions: "重要語音會同時顯示文字",
    zhHant: "繁體中文", zhHans: "简体中文", english: "English", mandarin: "普通話", cantonese: "粵語", englishVoice: "English",
    voiceOn: "語音開啟", voiceOff: "語音靜音", replay: "重聽",
    stagePrepare: "準備", stageLearn: "教學", stageExplore: "探索", stageFinish: "完成",
    now: "現在要做", devicesLeft: "人工青口：{count}", locked: "尚未解鎖", unmonitored: "等待探索", monitored: "監測完成",
    locationPurpose: "來到這裡可以", deploy: "部署人工青口", advanceTime: "讓時間前進", scanNow: "開始掃描", openMap: "打開藍灣地圖", viewEnding: "查看藍灣結局", playAgain: "再探索一次",
    assistantName: "小潮", roleBadge: "見習海洋探索員",

    homeTitle: "藍灣的最後一個信號，正在等你。",
    homeLead: "進入海洋保護區，準備真正的人工青口，逐步修復失去聯絡的監測網絡。",

    storyTitle: "藍灣來訊", storyLead: "研究船即將進入一片失去長期監測信號的海洋保護區。",
    story1Title: "暴風雨過後", story1Body: "藍灣的監測浮標一個接一個失去聯絡。",
    story2Title: "最後一段訊息", story2Body: "「海水看起來正常……但有一個微弱信號一直出現。」",
    story3Title: "你的任務", story3Body: "帶上人工青口，重新點亮藍灣的監測地圖。", enterBay: "進入藍灣",

    missionBriefTitle: "修復三個監測空白", missionBriefLead: "暴風雨令原有浮標失去聯絡。你要用人工青口收集一段時間的水中線索，找出值得科學家繼續調查的區域。",
    goalLabel: "任務目標", missionGoal: "找出值得繼續調查的海域", methodLabel: "任務方法", missionMethod: "部署、等待、回收和比較", lightLabel: "點亮代表", missionLight: "這個地點重新取得了監測資料", enterLab: "前往實驗室",

    equipmentTitle: "打開研究站的設備箱", equipmentLead: "箱子裡不是機械青口，而是一件真實存在的海洋監測工具。", openCase: "打開設備箱",
    realPhotoTag: "PPT 第 9 頁 · 人工青口實物", equipmentQuestion: "它明明不像真正的青口，為甚麼叫人工青口？",
    equipmentAnswer: "因為它和青口一樣，會讓海水進入，並把水中的物質收集起來。", inspectDevice: "我明白了",
    realDeviceNote: "人工青口是監測工具，不會把海水中的污染清除。",
    watchForTitle: "我們在尋找甚麼？", watchForLead: "海水看起來清澈，也可能含有肉眼看不見的金屬或放射性物質信號。",
    metalExplainTitle: "重金屬", metalExplainBody: "例如鉛、汞和鎘。含量太高時，可能傷害海洋生物。", radExplainTitle: "放射性物質", radExplainBody: "有些物質會留下看不見的放射性信號，需要儀器才能分析。",
    clearWaterNote: "看起來乾淨，不代表沒有看不見的變化。人工青口會替我們累積線索。", goAssemble: "看看它怎樣工作",

    prepareTitle: "準備第一個人工青口", prepareLead: "依次完成三個簡化步驟。正式設備的製作與分析由科學家完成。",
    prepCollectTitle: "放入收集材料", prepCollectBody: "它會在一段時間內收集水中的目標物質。",
    prepGelTitle: "加入凝膠和海水", prepGelBody: "讓裝置內部保持適合監測的環境。",
    prepCapTitle: "裝上保護蓋", prepCapBody: "小孔讓海水進入，同時保護裝置。", stepInstalled: "完成",
    prepareReady: "人工青口準備好了！", prepareDevice: "帶它去地圖", optionalScience: "想知道材料名稱？可以在結尾打開科學圖鑑。",
    principleTitle: "人工青口怎樣收集線索？", principleLead: "它是一個被動監測工具：不用電，也不會把污染清除。",
    principleWater: "海水從小孔進入", principleCapture: "收集材料捕捉水中的目標物質", principleWait: "留在水中數星期，慢慢累積信號", principleAnalyse: "回收後交給實驗室分析",
    knowledgeCheck: "小挑戰", quizCorrect: "答對了！", quizTryAgain: "再想一想，你可以重新選擇。", quizNext: "繼續任務",
    q1: "人工青口的主要工作是甚麼？", q1a: "把海水中的污染全部清除", q1b: "長時間收集水中的監測線索", q1c: "修理失去聯絡的監測浮標",

    tutorialTitle: "教學任務：跟著信號走", tutorialLead: "河口的舊浮標曾閃過一次異常信號。先去信號出現的附近看看。", tutorialMission: "點擊正在發光的河口",
    followSkillTitle: "追線索", followSkillBody: "去異常信號出現的附近看看。", riverIntro: "舊浮標在這裡留下了一條不完整的記錄。", riverPurpose: "追查最後的浮標信號",

    monitorTitle: "人工青口正在收集線索", monitorLead: "裝置會留在水中一段時間。你只需要讓任務時間快速前進。", weeks: "8 星期後",
    monitorEventTitle: "監測中的小發現", monitorEventBody: "河口的水流每天都在變化，所以一次水樣未必能看見整段時間的情況。", monitoring: "監測中……",
    weeksPassing: "星期正在快速前進", sunrise: "日出", sunset: "黃昏", night: "夜晚",

    scanTitle: "回收並掃描", scanLead: "人工青口已經回到研究站。啟動掃描儀，看看它收集到了甚麼。", scanReady: "掃描完成",
    heavyMetal: "重金屬信號", radionuclide: "放射性物質信號", higher: "較高", medium: "中等", lower: "較低",
    riverFinding: "河口的重金屬信號比較高。這是一條值得繼續調查的線索。", resultLimit: "一次結果不能證明污染來自哪裡。", continueCompare: "去另一個地方看看",
    labAnalysisTitle: "把收集到的線索交給實驗室", labAnalysisLead: "真實研究需要取出收集材料，再用實驗室儀器分析。遊戲把這個過程縮短成一段動畫。", beginAnalysis: "開始實驗室分析", analysing: "分析中……",
    retrieveStep: "回收", openStep: "取出材料", instrumentStep: "儀器分析", analysisDone: "分析完成",
    heavyMetalWhat: "重金屬不是一種單獨的物質", heavyMetalBody: "鉛、汞和鎘都是例子。較強信號表示這裡值得關注，還不能單獨證明污染來源。", abnormalHigher: "異常偏高", attentionNeeded: "需要關注",
    q2: "河口出現較強的重金屬信號，可以說明甚麼？", q2a: "已經證明污染一定來自河口", q2b: "河口值得繼續調查", q2c: "藍灣所有地方的情況都一樣",

    compareTitle: "教學任務：換個地方比一比", compareLead: "現在去一個不同的地方看看，兩邊是不是一樣。", compareMission: "點擊剛剛解鎖的保護區",
    compareSkillTitle: "作比較", compareSkillBody: "去另一種環境看看，兩邊是否一樣。", reserveIntro: "這裡遠離河口，適合和第一個結果放在一起看。", reservePurpose: "和河口的結果比一比",
    compareMonitorTitle: "第二個監測點已經亮起", compareMonitorLead: "讓時間前進，人工青口會自動回到掃描儀。",
    compareMonitorEventTitle: "為甚麼也要等 8 星期？", compareMonitorEventBody: "兩個地點監測一樣久，放在一起比較才更公平。",
    compareFinding: "保護區的兩種信號都比較低。現在你看見了兩個地點的差別。", skillUnlocked: "你學會了兩種探索方法",
    referenceRiver: "將結果和河口放在一起比較", returnMap: "返回地圖，選別的地點",
    q3: "為甚麼還要去保護區監測？", q3a: "建立一個不同環境的比較結果", q3b: "因為每一個地點都必須變成同一顏色", q3c: "用人工青口清除保護區的污染",

    eventArrived: "藍灣傳來新消息", eventLead: "這條消息是一個值得查看的線索，不是已經確定的答案。", chooseNext: "下一站由你決定",
    freeTitle: "自由探索：選擇下一站", freeLead: "你已經學會追線索和作比較。現在選一種方法繼續修復監測網絡。", freeMission: "在兩個亮起的地點中選擇一個",
    harborIntro: "港口有一份尚未核對的舊維修記錄。它是一條線索，不是已經確定的答案。", offshoreIntro: "外海的水流和內灣相連，這裡能提供一個不同環境的結果。",
    harborPurpose: "查看尚未核對的維修記錄", offshorePurpose: "把內灣和外海的結果比一比",

    finalMonitorTitle: "最後一個監測點", finalMonitorLead: "部署完成。讓時間前進，看看你的選擇帶來了甚麼新線索。",
    finalFindingHarbor: "港口的重金屬信號屬於中等。維修記錄值得繼續核對，但還不能確認來源。",
    finalFindingOffshore: "外海的放射性物質信號屬於中等。它擴大了比較範圍，但還需要更多監測。",

    endingTitle: "藍灣的監測網絡重新亮起", endingLead: "你用三個人工青口恢復了三個監測點，也找到了需要繼續關注的區域。",
    endingFollow: "你跟隨了河口的異常信號。", endingCompare: "你用保護區建立了第一組地點比較。",
    endingChoiceHarbor: "你繼續追查了港口的記錄。", endingChoiceOffshore: "你把監測範圍擴展到了外海。",
    endingUnknown: "信號來源仍未確認。真正的科學調查還會繼續。", networkRestored: "監測網絡：3 / 3",
    taskComplete: "階段任務完成",

    realTitle: "從遊戲回到真實世界", realLead: "你剛才使用的人工青口不是虛構道具。現實中的科學家確實使用它監測水中的金屬和放射性物質。",
    realFact1: "它可以在一段時間內累積監測信號。", realFact2: "科學家可以比較不同地點和不同監測期。",
    realFact3: "結果能指出值得關注的地方，但確認來源仍需要更多證據。", achievement: "藍灣監測網絡探索員",
    structureDetails: "科學圖鑑：實際結構包括塑膠管、凝膠、人工海水、收集材料和帶孔保護蓋。", scienceBook: "打開人工青口科學圖鑑",
    q4: "完成三個監測點後，科學家下一步應該做甚麼？", q4a: "立刻宣布已經找到污染來源", q4b: "根據結果安排更多監測和調查", q4c: "停止收集其他證據"
  };

  const zhHans = {
    ...zhHant,
    appTitle: "人工青口：蓝湾失踪的信号", tagLine: "一场在地图上展开的海洋科学探索", demoNote: "约 8–10 分钟 · 适合小学四至五年级",
    start: "开始探索", next: "下一步", continue: "继续", close: "关闭", restart: "重新开始",
    uiLanguage: "游戏界面语言", voiceLanguage: "语音语言", captions: "重要语音会同时显示文字", voiceOn: "语音开启", voiceOff: "语音静音", replay: "重听",
    stagePrepare: "准备", stageLearn: "教学", stageExplore: "探索", stageFinish: "完成", now: "现在要做", devicesLeft: "人工青口：{count}", locked: "尚未解锁", unmonitored: "等待探索", monitored: "监测完成",
    locationPurpose: "来到这里可以", deploy: "部署人工青口", advanceTime: "让时间前进", scanNow: "开始扫描", openMap: "打开蓝湾地图", viewEnding: "查看蓝湾结局", playAgain: "再探索一次", assistantName: "小潮", roleBadge: "见习海洋探索员",
    homeTitle: "蓝湾的最后一个信号，正在等你。", homeLead: "进入海洋保护区，准备真正的人工青口，逐步修复失去联络的监测网络。",
    storyTitle: "蓝湾来讯", storyLead: "研究船即将进入一片失去长期监测信号的海洋保护区。", story1Title: "暴风雨过后", story1Body: "蓝湾的监测浮标一个接一个失去联络。", story2Title: "最后一段消息", story2Body: "“海水看起来正常……但有一个微弱信号一直出现。”", story3Title: "你的任务", story3Body: "带上人工青口，重新点亮蓝湾的监测地图。", enterBay: "进入蓝湾",
    equipmentTitle: "打开研究站的设备箱", equipmentLead: "箱子里不是机械青口，而是一件真实存在的海洋监测工具。", openCase: "打开设备箱", realPhotoTag: "PPT 第 9 页 · 人工青口实物", equipmentQuestion: "它明明不像真正的青口，为什么叫人工青口？", equipmentAnswer: "因为它和青口一样，会让海水进入，并把水中的物质收集起来。", inspectDevice: "我明白了", realDeviceNote: "人工青口是监测工具，不会把海水中的污染清除。",
    prepareTitle: "准备第一个人工青口", prepareLead: "依次完成三个简化步骤。正式设备的制作与分析由科学家完成。", prepCollectTitle: "放入收集材料", prepCollectBody: "它会在一段时间内收集水中的目标物质。", prepGelTitle: "加入凝胶和海水", prepGelBody: "让装置内部保持适合监测的环境。", prepCapTitle: "装上保护盖", prepCapBody: "小孔让海水进入，同时保护装置。", stepInstalled: "完成", prepareReady: "人工青口准备好了！", prepareDevice: "带它去地图", optionalScience: "想知道材料名称？可以在结尾打开科学图鉴。",
    tutorialTitle: "教学任务：跟着信号走", tutorialLead: "河口的旧浮标曾闪过一次异常信号。先去信号出现的附近看看。", tutorialMission: "点击正在发光的河口", followSkillTitle: "追线索", followSkillBody: "去异常信号出现的附近看看。", riverIntro: "旧浮标在这里留下了一条不完整的记录。", riverPurpose: "追查最后的浮标信号",
    monitorTitle: "人工青口正在收集线索", monitorLead: "装置会留在水中一段时间。你只需要让任务时间快速前进。", weeks: "8 星期后", monitorEventTitle: "监测中的小发现", monitorEventBody: "河口的水流每天都在变化，所以一次水样未必能看见整段时间的情况。", monitoring: "监测中……",
    scanTitle: "回收并扫描", scanLead: "人工青口已经回到研究站。启动扫描仪，看看它收集到了什么。", scanReady: "扫描完成", heavyMetal: "重金属信号", radionuclide: "放射性物质信号", higher: "较高", medium: "中等", lower: "较低", riverFinding: "河口的重金属信号比较高。这是一条值得继续调查的线索。", resultLimit: "一次结果不能证明污染来自哪里。", continueCompare: "去另一个地方看看",
    compareTitle: "教学任务：换个地方比一比", compareLead: "现在去一个不同的地方看看，两边是不是一样。", compareMission: "点击刚刚解锁的保护区", compareSkillTitle: "作比较", compareSkillBody: "去另一种环境看看，两边是否一样。", reserveIntro: "这里远离河口，适合和第一个结果放在一起看。", reservePurpose: "和河口的结果比一比", compareMonitorTitle: "第二个监测点已经亮起", compareMonitorLead: "让时间前进，人工青口会自动回到扫描仪。", compareMonitorEventTitle: "为什么也要等 8 星期？", compareMonitorEventBody: "两个地点监测一样久，放在一起比较才更公平。", compareFinding: "保护区的两种信号都比较低。现在你看见了两个地点的差别。", skillUnlocked: "你学会了两种探索方法",
    eventArrived: "蓝湾传来新消息", eventLead: "这条消息是一个值得查看的线索，不是已经确定的答案。", chooseNext: "下一站由你决定", freeTitle: "自由探索：选择下一站", freeLead: "你已经学会追线索和作比较。现在选择一种方法继续修复监测网络。", freeMission: "在两个亮起的地点中选择一个", harborIntro: "港口有一份尚未核对的旧维修记录。它是一条线索，不是已经确定的答案。", offshoreIntro: "外海的水流和内湾相连，这里能提供一个不同环境的结果。", harborPurpose: "查看尚未核对的维修记录", offshorePurpose: "把内湾和外海的结果比一比",
    finalMonitorTitle: "最后一个监测点", finalMonitorLead: "部署完成。让时间前进，看看你的选择带来了什么新线索。", finalFindingHarbor: "港口的重金属信号属于中等。维修记录值得继续核对，但还不能确认来源。", finalFindingOffshore: "外海的放射性物质信号属于中等。它扩大了比较范围，但还需要更多监测。",
    endingTitle: "蓝湾的监测网络重新亮起", endingLead: "你用三个人工青口恢复了三个监测点，也找到了需要继续关注的区域。", endingFollow: "你跟随了河口的异常信号。", endingCompare: "你用保护区建立了第一组地点比较。", endingChoiceHarbor: "你继续追查了港口的记录。", endingChoiceOffshore: "你把监测范围扩展到了外海。", endingUnknown: "信号来源仍未确认。真正的科学调查还会继续。", networkRestored: "监测网络：3 / 3",
    realTitle: "从游戏回到真实世界", realLead: "你刚才使用的人工青口不是虚构道具。现实中的科学家确实使用它监测水中的金属和放射性物质。", realFact1: "它可以在一段时间内累积监测信号。", realFact2: "科学家可以比较不同地点和不同监测期。", realFact3: "结果能指出值得关注的地方，但确认来源仍需要更多证据。", achievement: "蓝湾监测网络探索员", structureDetails: "科学图鉴：实际结构包括塑料管、凝胶、人工海水、收集材料和带孔保护盖。",
    missionBriefTitle: "修复三个监测空白", missionBriefLead: "暴风雨让原有浮标失去联络。你要用人工青口收集一段时间的水中线索，找出值得科学家继续调查的区域。", goalLabel: "任务目标", missionGoal: "找出值得继续调查的海域", methodLabel: "任务方法", missionMethod: "部署、等待、回收和比较", lightLabel: "点亮代表", missionLight: "这个地点重新取得了监测数据", enterLab: "前往实验室",
    watchForTitle: "我们在寻找什么？", watchForLead: "海水看起来清澈，也可能含有肉眼看不见的金属或放射性物质信号。", metalExplainTitle: "重金属", metalExplainBody: "例如铅、汞和镉。含量太高时，可能伤害海洋生物。", radExplainTitle: "放射性物质", radExplainBody: "有些物质会留下看不见的放射性信号，需要仪器才能分析。", clearWaterNote: "看起来干净，不代表没有看不见的变化。人工青口会替我们累积线索。", goAssemble: "看看它怎样工作",
    principleTitle: "人工青口怎样收集线索？", principleLead: "它是一种被动监测工具：不用电，也不会把污染清除。", principleWater: "海水从小孔进入", principleCapture: "收集材料捕捉水中的目标物质", principleWait: "留在水中数星期，慢慢累积信号", principleAnalyse: "回收后交给实验室分析", knowledgeCheck: "小挑战", quizCorrect: "答对了！", quizTryAgain: "再想一想，你可以重新选择。", quizNext: "继续任务",
    q1: "人工青口的主要工作是什么？", q1a: "把海水中的污染全部清除", q1b: "长时间收集水中的监测线索", q1c: "修理失去联络的监测浮标", weeksPassing: "星期正在快速前进", sunrise: "日出", sunset: "黄昏", night: "夜晚",
    labAnalysisTitle: "把收集到的线索交给实验室", labAnalysisLead: "真实研究需要取出收集材料，再用实验室仪器分析。游戏把这个过程缩短成一段动画。", beginAnalysis: "开始实验室分析", analysing: "分析中……", retrieveStep: "回收", openStep: "取出材料", instrumentStep: "仪器分析", analysisDone: "分析完成", heavyMetalWhat: "重金属不是一种单独的物质", heavyMetalBody: "铅、汞和镉都是例子。较强信号表示这里值得关注，还不能单独证明污染来源。", abnormalHigher: "异常偏高", attentionNeeded: "需要关注",
    q2: "河口出现较强的重金属信号，可以说明什么？", q2a: "已经证明污染一定来自河口", q2b: "河口值得继续调查", q2c: "蓝湾所有地方的情况都一样", referenceRiver: "将结果和河口放在一起比较", returnMap: "返回地图，选择别的地点", q3: "为什么还要去保护区监测？", q3a: "建立一个不同环境的比较结果", q3b: "因为每一个地点都必须变成同一种颜色", q3c: "用人工青口清除保护区的污染", taskComplete: "阶段任务完成", scienceBook: "打开人工青口科学图鉴", q4: "完成三个监测点后，科学家下一步应该做什么？", q4a: "立刻宣布已经找到污染来源", q4b: "根据结果安排更多监测和调查", q4c: "停止收集其他证据"
  };

  const en = {
    appTitle: "Artificial Mussel: The Lost Signal of Blue Bay", tagLine: "A marine-science adventure played on one changing map", demoNote: "About 8–10 minutes · Primary 4–5",
    start: "Start exploring", next: "Next", continue: "Continue", close: "Close", restart: "Restart",
    uiLanguage: "Game interface language", voiceLanguage: "Voice language", captions: "Key voice lines also appear as text",
    zhHant: "繁體中文", zhHans: "简体中文", english: "English", mandarin: "Mandarin", cantonese: "Cantonese", englishVoice: "English",
    voiceOn: "Voice on", voiceOff: "Voice muted", replay: "Replay voice",
    stagePrepare: "Prepare", stageLearn: "Learn", stageExplore: "Explore", stageFinish: "Finish",
    now: "Do this now", devicesLeft: "Artificial Mussels: {count}", locked: "Not unlocked", unmonitored: "Waiting to explore", monitored: "Monitoring complete",
    locationPurpose: "You can use this place to", deploy: "Deploy Artificial Mussel", advanceTime: "Move time forward", scanNow: "Start scan", openMap: "Open the Blue Bay map", viewEnding: "See the Blue Bay ending", playAgain: "Explore again",
    assistantName: "Tide", roleBadge: "Junior Ocean Explorer",
    homeTitle: "Blue Bay's last signal is waiting for you.", homeLead: "Enter the marine reserve, prepare a real Artificial Mussel and reconnect the missing monitoring network one site at a time.",
    storyTitle: "A message from Blue Bay", storyLead: "The research vessel is approaching a marine reserve that has lost its long-term monitoring signals.", story1Title: "After the storm", story1Body: "Blue Bay's monitoring buoys lost contact one after another.", story2Title: "The final message", story2Body: "“The water looks normal… but one faint signal keeps returning.”", story3Title: "Your mission", story3Body: "Take the Artificial Mussels and light up the monitoring map again.", enterBay: "Enter Blue Bay",
    equipmentTitle: "Open the research station equipment case", equipmentLead: "The case does not contain a robot mussel. It contains a real marine-monitoring tool.", openCase: "Open the equipment case", realPhotoTag: "Slide 9 of the source deck · real Artificial Mussel", equipmentQuestion: "It does not look like a real mussel. Why is it called an Artificial Mussel?", equipmentAnswer: "Like a mussel, it lets water enter and collects substances from the water.", inspectDevice: "I understand", realDeviceNote: "An Artificial Mussel monitors the water. It does not remove pollution.",
    prepareTitle: "Prepare the first Artificial Mussel", prepareLead: "Complete three simplified preparation steps. Scientists make and analyse the real device.", prepCollectTitle: "Add the collection material", prepCollectBody: "It collects target substances from the water over time.", prepGelTitle: "Add gel and seawater", prepGelBody: "They keep the inside ready for monitoring.", prepCapTitle: "Fit the protective caps", prepCapBody: "Small openings let water enter while the caps protect the device.", stepInstalled: "Done", prepareReady: "The Artificial Mussel is ready!", prepareDevice: "Take it to the map", optionalScience: "Want the material names? Open the Science Notebook at the end.",
    tutorialTitle: "Tutorial: follow the signal", tutorialLead: "An old buoy at the river mouth flashed an unusual signal. First, check near where the signal appeared.", tutorialMission: "Tap the glowing river mouth", followSkillTitle: "Follow a clue", followSkillBody: "Check near where an unusual signal appeared.", riverIntro: "An old buoy left an incomplete record here.", riverPurpose: "follow the buoy's final signal",
    monitorTitle: "The Artificial Mussel is collecting clues", monitorLead: "The device stays in the water for a monitoring period. Move mission time forward.", weeks: "8 weeks later", monitorEventTitle: "A clue during monitoring", monitorEventBody: "Water flow at the river mouth changes every day, so one water sample may miss what happens over time.", monitoring: "Monitoring…",
    scanTitle: "Retrieve and scan", scanLead: "The Artificial Mussel has returned to the station. Start the scanner to see what it collected.", scanReady: "Scan complete", heavyMetal: "Heavy-metal signal", radionuclide: "Radioactive-substance signal", higher: "Higher", medium: "Medium", lower: "Lower", riverFinding: "The heavy-metal signal is higher at the river mouth. This clue is worth investigating.", resultLimit: "One result cannot prove where pollution came from.", continueCompare: "Check a different place",
    compareTitle: "Tutorial: compare a different place", compareLead: "Now check a different place and see whether the two results are alike.", compareMission: "Tap the newly unlocked reserve", compareSkillTitle: "Make a comparison", compareSkillBody: "Check a different environment to see whether it is the same.", reserveIntro: "This area is away from the river mouth, making it useful for comparison.", reservePurpose: "compare it with the river-mouth result", compareMonitorTitle: "The second monitoring point is glowing", compareMonitorLead: "Move time forward. The Artificial Mussel will return to the scanner automatically.", compareMonitorEventTitle: "Why wait 8 weeks again?", compareMonitorEventBody: "Monitoring both places for the same time makes the comparison fairer.", compareFinding: "Both signals are lower in the reserve. You can now see a difference between two places.", skillUnlocked: "You learned two ways to explore",
    eventArrived: "A new message reaches Blue Bay", eventLead: "This message is a clue worth checking, not a confirmed answer.", chooseNext: "You choose the next stop", freeTitle: "Free exploration: choose the next stop", freeLead: "You can now follow clues and make comparisons. Choose one way to continue repairing the network.", freeMission: "Choose one of the two glowing locations", harborIntro: "The harbour has an old maintenance record that has not been checked. It is a clue, not a confirmed answer.", offshoreIntro: "Offshore currents connect with the inner bay, so this site can provide a result from a different environment.", harborPurpose: "check an unverified maintenance record", offshorePurpose: "compare the inner bay with offshore water",
    finalMonitorTitle: "The final monitoring point", finalMonitorLead: "Deployment complete. Move time forward and see what new clue your choice reveals.", finalFindingHarbor: "The heavy-metal signal at the harbour is medium. The maintenance record is worth checking, but it does not confirm a source.", finalFindingOffshore: "The radioactive-substance signal offshore is medium. This widens the comparison, but more monitoring is still needed.",
    endingTitle: "Blue Bay's monitoring network lights up again", endingLead: "You used three Artificial Mussels to restore three monitoring points and found areas that deserve more attention.", endingFollow: "You followed the unusual river-mouth signal.", endingCompare: "You used the reserve to create the first location comparison.", endingChoiceHarbor: "You continued checking the harbour record.", endingChoiceOffshore: "You expanded the monitoring network offshore.", endingUnknown: "The source of the signals is still unknown. Real scientific investigation continues.", networkRestored: "Monitoring network: 3 / 3",
    realTitle: "From the game to the real world", realLead: "The Artificial Mussel you used is not fictional. Scientists really use it to monitor metals and radioactive substances in water.", realFact1: "It can collect a monitoring signal over a period of time.", realFact2: "Scientists can compare places and monitoring periods.", realFact3: "Results show where to look next, but confirming a source needs more evidence.", achievement: "Blue Bay Monitoring Network Explorer", structureDetails: "Science Notebook: the real structure includes plastic tubing, gel, artificial seawater, collection material and protective caps with openings.",
    missionBriefTitle: "Restore three missing monitoring points", missionBriefLead: "The storm cut off the old buoys. Use Artificial Mussels to collect clues over time and show scientists where to investigate next.", goalLabel: "Mission goal", missionGoal: "Find areas that need more investigation", methodLabel: "Mission method", missionMethod: "Deploy, wait, retrieve and compare", lightLabel: "A lit point means", missionLight: "This site has usable monitoring data again", enterLab: "Go to the laboratory",
    watchForTitle: "What are we looking for?", watchForLead: "Clear-looking water can still contain metal or radioactive-substance signals that our eyes cannot see.", metalExplainTitle: "Heavy metals", metalExplainBody: "Examples include lead, mercury and cadmium. High amounts can harm marine life.", radExplainTitle: "Radioactive substances", radExplainBody: "Some substances leave invisible radioactive signals that need laboratory instruments to analyse.", clearWaterNote: "Water that looks clean can still be changing. The Artificial Mussel collects clues over time.", goAssemble: "See how it works",
    principleTitle: "How does an Artificial Mussel collect clues?", principleLead: "It is a passive monitoring tool. It needs no electricity and does not remove pollution.", principleWater: "Seawater enters through small openings", principleCapture: "Collection material captures target substances", principleWait: "It stays underwater for weeks and builds up a signal", principleAnalyse: "Scientists retrieve it for laboratory analysis", knowledgeCheck: "Quick challenge", quizCorrect: "Correct!", quizTryAgain: "Think again. You can choose another answer.", quizNext: "Continue the mission",
    q1: "What is the Artificial Mussel's main job?", q1a: "Remove all pollution from the water", q1b: "Collect monitoring clues over time", q1c: "Repair disconnected monitoring buoys", weeksPassing: "Weeks are passing", sunrise: "Sunrise", sunset: "Sunset", night: "Night",
    labAnalysisTitle: "Bring the collected clues to the laboratory", labAnalysisLead: "Real research removes the collection material and analyses it with laboratory instruments. The game shortens that process into an animation.", beginAnalysis: "Start laboratory analysis", analysing: "Analysing…", retrieveStep: "Retrieve", openStep: "Remove material", instrumentStep: "Analyse", analysisDone: "Analysis complete", heavyMetalWhat: "Heavy metal is a group, not one single substance", heavyMetalBody: "Lead, mercury and cadmium are examples. A stronger signal marks a place to investigate; it does not prove the source by itself.", abnormalHigher: "Unusually high", attentionNeeded: "Needs attention",
    q2: "What does the stronger heavy-metal signal at the river mouth tell us?", q2a: "It proves the pollution came from the river mouth", q2b: "The river mouth deserves more investigation", q2c: "Every part of Blue Bay must be the same", referenceRiver: "Compare this result with the river mouth", returnMap: "Return to the map and choose another site", q3: "Why monitor the marine reserve too?", q3a: "To create a comparison in a different environment", q3b: "Because every map point must turn the same colour", q3c: "To remove pollution from the reserve", taskComplete: "Mission stage complete", scienceBook: "Open the Artificial Mussel Science Book", q4: "After restoring three monitoring points, what should scientists do next?", q4a: "Immediately announce that the source is confirmed", q4b: "Plan more monitoring and investigation from the results", q4c: "Stop collecting other evidence"
  };

  Object.assign(zhHant, {
    demoNote: "約 10–12 分鐘 · 適合小四至小五",
    back: "返回上一步",
    introBadge: "故事序章",
    introEyebrow: "三語旁白 · 字幕同步",
    introTitle: "暴風雨後，藍灣少了三份重要資料",
    introLead: "原有浮標失去聯絡，科學家無法知道海水在這段時間發生了甚麼。你將加入研究站，把空白的監測資料補回來。",
    introBeat1Title: "暴風雨切斷聯絡",
    introBeat1Body: "藍灣三個浮標停止傳送新資料。",
    introBeat2Title: "最後記錄不完整",
    introBeat2Body: "河口在失聯前曾出現重複但未完成的異常記錄。",
    introBeat3Title: "你的探索開始",
    introBeat3Body: "使用人工青口重新取得可比較的監測資料。",
    introCaption: "我是小潮，藍灣研究站的任務導航員。我會告訴你現在要做甚麼，也會提醒你哪些結論還需要更多證據。",
    replayStory: "重播故事",
    seeMissionSummary: "查看任務總結",
    storyLead: "藍灣有三處監測資料空白，等你補上。",
    story1Body: "暴風雨令三個浮標停止傳送新資料，地圖上出現空白。",
    story2Title: "失聯前的記錄",
    story2Body: "河口曾出現重複但不完整的異常記錄，科學家還不知道原因。",
    story3Body: "部署人工青口，取得三個地點可比較的資料，找出下一步該去哪裡調查。",
    storyFlowTitle: "每個地點都用同一個科學循環",
    flowDeploy: "部署", flowWait: "等待", flowRetrieve: "回收", flowAnalyse: "分析", flowLight: "點亮",
    lightMeaning: "點亮不是「海水安全」。它只表示這個地點的新資料已上傳，科學家現在可以把它和其他地點比較。",
    assistantIntro: "你好，我是小潮，研究站的任務導航員。你是見習探索員；跟著提示完成一次後，就可以自己選下一站。",
    understandMission: "我知道要做甚麼了",
    assistantRole: "任務導航員",
    playerRole: "見習海洋探索員",
    youLabel: "你",
    missionBriefTitle: "取得三個地點的可比較資料",
    missionBriefLead: "浮標失聯造成資料空白。你要在三個地點完成「部署、等待、回收、分析」，讓科學家知道哪些區域值得繼續調查。",
    missionGoal: "取得並上傳三個地點的資料，找出下一步調查方向",
    missionMethod: "先做兩個教學地點，再自選港口或外海",
    missionLight: "資料已上傳，可以和其他地點比較；不代表安全",
    equipmentLead: "這是真實存在的監測工具。它像青口一樣讓海水進入，長時間累積肉眼看不見的物質線索。",
    metalExplainBody: "鉛、汞、鎘等金屬在含量太高時可能傷害生物。遊戲只顯示相對信號，不代替真實安全標準。",
    radExplainBody: "某些物質會發出肉眼看不見的放射性信號，需用儀器量度；發現信號不等於已找到危險來源。",
    relativeScaleTitle: "先記住",
    relativeScaleNote: "較高、中等、較低只用來比較本次任務中的地點；單次結果不能確認污染來源。",
    q0: "海水看起來很清澈，可以直接說沒有看不見的物質變化嗎？",
    q0a: "可以，眼睛看不到就代表沒有",
    q0b: "不可以，需要監測工具收集和分析線索",
    q0c: "只要有魚游過就代表一定安全",
    q0AFeedback: "有些金屬和放射性物質的變化無法用眼睛直接看見。",
    q0BFeedback: "正確。外觀看起來清澈，仍要靠監測和儀器找出看不見的變化。",
    q0CFeedback: "看到魚不能代替科學監測，也不能單獨證明水質安全。",
    challengeProgress: "知識挑戰 {current} / {total}", quizNextQuestion: "下一題",
    q5: "下列哪一句最能說明甚麼是重金屬？", q5a: "只有看得見的金屬垃圾才是重金屬", q5b: "鉛、汞等金屬含量過高時，可能傷害海洋生物", q5c: "重金屬是一種令海水變黑的塑膠",
    q5AFeedback: "重金屬不只是看得見的金屬垃圾；水中的變化通常要靠監測和分析。", q5BFeedback: "正確。鉛、汞等金屬含量過高時，可能傷害海洋生物。", q5CFeedback: "重金屬是金屬元素的一類，不是塑膠，也不能只靠海水顏色判斷。",
    q6: "我們應該怎樣發現水中的放射性物質信號？", q6a: "看海水有沒有發光", q6b: "使用監測工具收集線索，再用儀器分析", q6c: "看海面有沒有垃圾",
    q6AFeedback: "放射性信號通常看不見，水和物體也不一定會發光。", q6BFeedback: "正確。需要先用監測工具收集線索，再交給儀器分析。", q6CFeedback: "海面垃圾和放射性信號不是同一回事，不能只靠外觀判斷。",
    q1AFeedback: "人工青口收集線索，不會把海水中的污染全部清除。",
    q1BFeedback: "正確。它留在水中一段時間，把監測線索慢慢累積起來。",
    q1CFeedback: "人工青口不會修理浮標；它負責補回缺少的監測資料。",
    q2AFeedback: "單一地點的較強信號不能證明來源，還要比較和繼續調查。",
    q2BFeedback: "正確。較強信號是一條需要繼續查證的線索。",
    q2CFeedback: "河口的結果只代表這次監測，不能推論整個藍灣都一樣。",
    q3AFeedback: "正確。不同環境用同樣時間監測，才有可比較的資料。",
    q3BFeedback: "地圖顏色只表示結果，不需要把每個地點變成一樣。",
    q3CFeedback: "人工青口負責監測和收集線索，不負責清除污染。",
    q4AFeedback: "三個結果仍不足以確認來源，不能立刻下定論。",
    q4BFeedback: "正確。科學家會用結果安排更多監測、採樣和來源調查。",
    q4CFeedback: "可靠結論需要更多證據，不能在這裡停止收集資料。",
    otherDevicesReady: "你已學會準備方法。研究站已按同樣步驟準備好另外兩個裝置。",
    repeatedAnalysisNote: "小潮提醒：研究站會重複你已學會的回收和分析步驟，讓任務保持簡單。",
    moonPhases: "8 星期 · 兩輪簡化月相",
    stormEventWeek: "第 3 星期", stormEventEyebrow: "突發事件", stormEventTitle: "暴雨令河口的水突然變渾了！", stormEventBody: "小潮問：只看見水變渾，現在應該怎樣做？", stormEventA: "馬上認定重金屬污染加重", stormEventB: "記錄暴雨，繼續等待檢測結果", stormNoFail: "兩個選項都不會令任務失敗；小潮會和你一起判斷。", stormFeedbackLearnTitle: "先別急著下結論", stormFeedbackLearnBody: "海水變渾是看得見的現象，卻不能直接證明重金屬增加。小潮已替你記錄天氣，監測會繼續。", stormFeedbackGoodTitle: "好判斷！", stormFeedbackGoodBody: "先記錄天氣，再等待人工青口和儀器的結果，才能把觀察與檢測分清楚。餘下監測會繼續。",
    reviewOnlyLead: "這個地點已經部署。返回這一頁只會查看進度，不會重複消耗裝置。",
    reviewOnlyMission: "已部署；返回下一步繼續監測",
    continueMonitoring: "繼續監測",
    awaitingUpload: "分析完成 · 等待上傳",
    routeEqualNote: "港口和外海都能完成任務；這是兩種調查路線，不是對錯題。",
    routeResultEqual: "無論選港口或外海，取得並上傳第三份資料都算完成；兩條路線沒有輸贏。",
    routeATitle: "路線 A · 追查線索",
    routeBTitle: "路線 B · 擴大比較",
    bothRoutesComplete: "兩條路線都能取得第三份資料並完成任務",
    recordReady: "分析完成：{place}的資料等待上傳",
    recordSaved: "資料已上傳，這個地點現在亮起",
    lightMeaningShort: "點亮＝有新的可比較資料；不代表安全，也不代表已找到污染源。",
    uploadAndLight: "上傳資料並點亮",
    taskProgress: "監測地圖：3 / 3 已有可比較資料",
    alternateOffshore: "本次選了港口；外海保留為下一次探索路線。",
    alternateHarbor: "本次選了外海；港口保留為下一次探索路線。",
    endingTitle: "三份資料已上傳，這次任務完成",
    endingLead: "你完成了三次監測循環，並親手把三份結果放回藍灣地圖。",
    whyCompleteTitle: "為甚麼現在完成？",
    whyCompleteBody: "你已完成本次任務三個地點的資料收集、實驗室檢測和上傳，因此點亮了藍灣地圖上的三個監測資料點。它們現在可以互相比較，幫助科學家規劃下一步調查。",
    scienceBoundary: "遊戲中的高、中、低是教學用相對比較；真實研究要配合儀器校準、標準值和更多證據。"
  });

  Object.assign(zhHans, {
    demoNote: "约 10–12 分钟 · 适合小学四至五年级", back: "返回上一步", introBadge: "故事序章", introEyebrow: "三语旁白 · 字幕同步",
    introTitle: "暴风雨后，蓝湾少了三份重要数据", introLead: "原有浮标失去联络，科学家无法知道海水在这段时间发生了什么。你将加入研究站，把空白的监测数据补回来。",
    introBeat1Title: "暴风雨切断联络", introBeat1Body: "蓝湾三个浮标停止传送新数据。", introBeat2Title: "最后记录不完整", introBeat2Body: "河口在失联前曾出现重复但未完成的异常记录。", introBeat3Title: "你的探索开始", introBeat3Body: "使用人工青口重新取得可比较的监测数据。",
    introCaption: "我是小潮，蓝湾研究站的任务导航员。我会告诉你现在要做什么，也会提醒你哪些结论还需要更多证据。", replayStory: "重播故事", seeMissionSummary: "查看任务总结",
    storyLead: "蓝湾有三处监测数据空白，等你补上。", story1Body: "暴风雨让三个浮标停止传送新数据，地图上出现空白。", story2Title: "失联前的记录", story2Body: "河口曾出现重复但不完整的异常记录，科学家还不知道原因。", story3Body: "部署人工青口，取得三个地点可比较的数据，找出下一步该去哪里调查。",
    storyFlowTitle: "每个地点都用同一个科学循环", flowDeploy: "部署", flowWait: "等待", flowRetrieve: "回收", flowAnalyse: "分析", flowLight: "点亮", lightMeaning: "点亮不是“海水安全”。它只表示这个地点的新数据已上传，科学家现在可以把它和其他地点比较。",
    assistantIntro: "你好，我是小潮，研究站的任务导航员。你是见习探索员；跟着提示完成一次后，就可以自己选下一站。", understandMission: "我知道要做什么了", assistantRole: "任务导航员", playerRole: "见习海洋探索员", youLabel: "你",
    missionBriefTitle: "取得三个地点的可比较数据", missionBriefLead: "浮标失联造成数据空白。你要在三个地点完成“部署、等待、回收、分析”，让科学家知道哪些区域值得继续调查。", missionGoal: "取得并上传三个地点的数据，找出下一步调查方向", missionMethod: "先做两个教学地点，再自选港口或外海", missionLight: "数据已上传，可以和其他地点比较；不代表安全",
    equipmentLead: "这是真实存在的监测工具。它像青口一样让海水进入，长时间累积肉眼看不见的物质线索。", metalExplainBody: "铅、汞、镉等金属在含量太高时可能伤害生物。游戏只显示相对信号，不代替真实安全标准。", radExplainBody: "某些物质会发出肉眼看不见的放射性信号，需要用仪器测量；发现信号不等于已找到危险来源。", relativeScaleTitle: "先记住", relativeScaleNote: "较高、中等、较低只用来比较本次任务中的地点；单次结果不能确认污染来源。",
    q0: "海水看起来很清澈，可以直接说没有看不见的物质变化吗？", q0a: "可以，眼睛看不到就代表没有", q0b: "不可以，需要监测工具收集和分析线索", q0c: "只要有鱼游过就代表一定安全",
    q0AFeedback: "有些金属和放射性物质的变化无法用眼睛直接看见。", q0BFeedback: "正确。外观看起来清澈，仍要靠监测和仪器找出看不见的变化。", q0CFeedback: "看到鱼不能代替科学监测，也不能单独证明水质安全。",
    challengeProgress: "知识挑战 {current} / {total}", quizNextQuestion: "下一题",
    q5: "下面哪一句最能说明什么是重金属？", q5a: "只有看得见的金属垃圾才是重金属", q5b: "铅、汞等金属含量过高时，可能伤害海洋生物", q5c: "重金属是一种让海水变黑的塑料",
    q5AFeedback: "重金属不只是看得见的金属垃圾；水中的变化通常要靠监测和分析。", q5BFeedback: "正确。铅、汞等金属含量过高时，可能伤害海洋生物。", q5CFeedback: "重金属是金属元素的一类，不是塑料，也不能只靠海水颜色判断。",
    q6: "我们应该怎样发现水中的放射性物质信号？", q6a: "看海水有没有发光", q6b: "使用监测工具收集线索，再用仪器分析", q6c: "看海面有没有垃圾",
    q6AFeedback: "放射性信号通常看不见，水和物体也不一定会发光。", q6BFeedback: "正确。需要先用监测工具收集线索，再交给仪器分析。", q6CFeedback: "海面垃圾和放射性信号不是一回事，不能只靠外观判断。",
    q1AFeedback: "人工青口收集线索，不会把海水中的污染全部清除。", q1BFeedback: "正确。它留在水中一段时间，把监测线索慢慢累积起来。", q1CFeedback: "人工青口不会修理浮标；它负责补回缺少的监测数据。",
    q2AFeedback: "单一地点的较强信号不能证明来源，还要比较和继续调查。", q2BFeedback: "正确。较强信号是一条需要继续查证的线索。", q2CFeedback: "河口的结果只代表这次监测，不能推论整个蓝湾都一样。",
    q3AFeedback: "正确。不同环境用同样时间监测，才有可比较的数据。", q3BFeedback: "地图颜色只表示结果，不需要把每个地点变成一样。", q3CFeedback: "人工青口负责监测和收集线索，不负责清除污染。",
    q4AFeedback: "三个结果仍不足以确认来源，不能立刻下定论。", q4BFeedback: "正确。科学家会用结果安排更多监测、采样和来源调查。", q4CFeedback: "可靠结论需要更多证据，不能在这里停止收集数据。",
    otherDevicesReady: "你已学会准备方法。研究站已按同样步骤准备好另外两个装置。", repeatedAnalysisNote: "小潮提醒：研究站会重复你已学会的回收和分析步骤，让任务保持简单。", moonPhases: "8 星期 · 两轮简化月相", reviewOnlyLead: "这个地点已经部署。返回这一页只会查看进度，不会重复消耗装置。", reviewOnlyMission: "已部署；返回下一步继续监测", continueMonitoring: "继续监测",
    stormEventWeek: "第 3 星期", stormEventEyebrow: "突发事件", stormEventTitle: "暴雨让河口的水突然变浑了！", stormEventBody: "小潮问：只看见水变浑，现在应该怎样做？", stormEventA: "马上认定重金属污染加重", stormEventB: "记录暴雨，继续等待检测结果", stormNoFail: "两个选项都不会让任务失败；小潮会和你一起判断。", stormFeedbackLearnTitle: "先别急着下结论", stormFeedbackLearnBody: "海水变浑是看得见的现象，却不能直接证明重金属增加。小潮已替你记录天气，监测会继续。", stormFeedbackGoodTitle: "好判断！", stormFeedbackGoodBody: "先记录天气，再等待人工青口和仪器的结果，才能把观察与检测分清楚。余下监测会继续。",
    awaitingUpload: "分析完成 · 等待上传", routeEqualNote: "港口和外海都能完成任务；这是两种调查路线，不是对错题。", routeResultEqual: "无论选港口或外海，取得并上传第三份数据都算完成；两条路线没有输赢。", routeATitle: "路线 A · 追查线索", routeBTitle: "路线 B · 扩大比较", bothRoutesComplete: "两条路线都能取得第三份数据并完成任务", recordReady: "分析完成：{place}的数据等待上传", recordSaved: "数据已上传，这个地点现在亮起", lightMeaningShort: "点亮＝有新的可比较数据；不代表安全，也不代表已找到污染源。", uploadAndLight: "上传数据并点亮",
    taskProgress: "监测地图：3 / 3 已有可比较数据", alternateOffshore: "本次选了港口；外海保留为下一次探索路线。", alternateHarbor: "本次选了外海；港口保留为下一次探索路线。", endingTitle: "三份数据已上传，这次任务完成", endingLead: "你完成了三次监测循环，并亲手把三份结果放回蓝湾地图。", whyCompleteTitle: "为什么现在完成？", whyCompleteBody: "你已完成本次任务三个地点的数据收集、实验室检测和上传，因此点亮了蓝湾地图上的三个监测数据点。它们现在可以互相比较，帮助科学家规划下一步调查。", scienceBoundary: "游戏中的高、中、低是教学用相对比较；真实研究要配合仪器校准、标准值和更多证据。"
  });

  Object.assign(en, {
    demoNote: "About 10–12 minutes · Primary 4–5", back: "Back one step", introBadge: "Story prologue", introEyebrow: "Three voice tracks · captions included",
    introTitle: "After the storm, Blue Bay is missing three sets of data", introLead: "The old buoys stopped communicating, leaving scientists unable to see what changed in the water. Join the station and fill the monitoring gaps.",
    introBeat1Title: "The storm cuts contact", introBeat1Body: "Three Blue Bay buoys stop sending new data.", introBeat2Title: "The last record is incomplete", introBeat2Body: "Before contact was lost, the river mouth recorded a repeated but unfinished unusual result.", introBeat3Title: "Your expedition begins", introBeat3Body: "Use Artificial Mussels to collect comparable monitoring data.",
    introCaption: "I am Tide, Blue Bay station's mission navigator. I will show you what to do and remind you when a conclusion still needs more evidence.", replayStory: "Replay story", seeMissionSummary: "See mission summary",
    storyLead: "Blue Bay has three gaps in its monitoring data. You can fill them.", story1Body: "The storm stopped three buoys from sending new data, leaving blank places on the map.", story2Title: "The record before contact was lost", story2Body: "The river mouth showed a repeated but incomplete unusual result. Scientists still do not know why.", story3Body: "Deploy Artificial Mussels, collect comparable data at three sites and identify where scientists should investigate next.",
    storyFlowTitle: "Use the same science cycle at every site", flowDeploy: "Deploy", flowWait: "Wait", flowRetrieve: "Retrieve", flowAnalyse: "Analyse", flowLight: "Light up", lightMeaning: "Lit up does not mean safe. It means new data from this site has been uploaded and can now be compared with other sites.",
    assistantIntro: "Hello! I am Tide, the station's mission navigator. You are the junior explorer. Follow my first route, then choose your own final site.", understandMission: "I know what to do", assistantRole: "Mission navigator", playerRole: "Junior ocean explorer", youLabel: "You",
    missionBriefTitle: "Collect comparable data from three sites", missionBriefLead: "The disconnected buoys left data gaps. Complete deploy, wait, retrieve and analyse at three sites so scientists can choose where to investigate next.", missionGoal: "Collect and upload data from three sites to guide the next investigation", missionMethod: "Finish two tutorial sites, then choose harbour or offshore", missionLight: "Data has been uploaded for comparison; this does not mean the site is safe",
    equipmentLead: "This is a real monitoring tool. Like a mussel, it lets water enter and builds up clues from invisible substances over time.", metalExplainBody: "Metals such as lead, mercury and cadmium can harm living things at high amounts. The game shows relative signals, not real safety limits.", radExplainBody: "Some substances emit invisible radioactive signals that instruments can measure. Detecting a signal does not identify a dangerous source by itself.", relativeScaleTitle: "Remember", relativeScaleNote: "Higher, medium and lower compare only the sites in this mission. One result cannot confirm a pollution source.",
    q0: "If seawater looks clear, can we say there are no invisible changes?", q0a: "Yes. If our eyes cannot see it, it is not there", q0b: "No. Monitoring tools must collect and analyse clues", q0c: "If a fish swims past, the water must be safe",
    q0AFeedback: "Changes in some metals and radioactive substances cannot be seen directly.", q0BFeedback: "Correct. Clear-looking water still needs monitoring and instruments to reveal invisible changes.", q0CFeedback: "Seeing a fish cannot replace scientific monitoring or prove that the water is safe.",
    challengeProgress: "Knowledge challenge {current} / {total}", quizNextQuestion: "Next question",
    q5: "Which sentence best explains heavy metals?", q5a: "Only visible pieces of metal rubbish are heavy metals", q5b: "Metals such as lead and mercury can harm marine life at high amounts", q5c: "Heavy metal is a plastic that turns seawater black",
    q5AFeedback: "Heavy metals are not limited to visible metal rubbish. Changes in water usually need monitoring and analysis.", q5BFeedback: "Correct. Metals such as lead and mercury can harm marine life at high amounts.", q5CFeedback: "Heavy metals are a group of metallic elements, not plastic, and water colour alone cannot identify them.",
    q6: "How should we find radioactive-substance signals in water?", q6a: "Look for glowing seawater", q6b: "Collect clues with a monitoring tool, then analyse them with instruments", q6c: "Look for rubbish floating on the surface",
    q6AFeedback: "Radioactive signals are usually invisible, and water or objects do not have to glow.", q6BFeedback: "Correct. A monitoring tool collects clues before laboratory instruments analyse them.", q6CFeedback: "Surface rubbish and radioactive signals are different, so appearance alone is not enough.",
    q1AFeedback: "Artificial Mussels collect clues; they do not remove all pollution.", q1BFeedback: "Correct. The device stays in water and builds up monitoring clues over time.", q1CFeedback: "It does not repair buoys. It helps replace the monitoring data that is missing.",
    q2AFeedback: "One stronger signal cannot prove a source. Scientists still need comparison and investigation.", q2BFeedback: "Correct. A stronger signal is a clue that deserves further investigation.", q2CFeedback: "The river result describes this monitoring period. It does not mean all of Blue Bay is the same.",
    q3AFeedback: "Correct. Monitoring different environments for the same period creates comparable data.", q3BFeedback: "Map colours show results; every site does not need to become the same.", q3CFeedback: "Artificial Mussels monitor and collect clues; they do not remove pollution.",
    q4AFeedback: "Three results are still not enough to confirm a source, so scientists should not announce one yet.", q4BFeedback: "Correct. Scientists use the results to plan more monitoring, sampling and source investigation.", q4CFeedback: "A reliable conclusion needs more evidence, so data collection should continue.",
    otherDevicesReady: "You learned the preparation method. The station has prepared the other two devices in the same way.", repeatedAnalysisNote: "Tide: the station repeats the retrieval and analysis steps you already learned, keeping the mission simple.", moonPhases: "8 weeks · two simplified moon cycles", reviewOnlyLead: "This site has already been deployed. Going back lets you review progress without using another device.", reviewOnlyMission: "Already deployed; go forward to continue monitoring", continueMonitoring: "Continue monitoring",
    stormEventWeek: "Week 3", stormEventEyebrow: "Unexpected event", stormEventTitle: "Heavy rain suddenly makes the river mouth look cloudy!", stormEventBody: "Tide asks: if the water only looks cloudy, what should we do?", stormEventA: "Immediately decide that heavy-metal pollution increased", stormEventB: "Record the rain and wait for the test results", stormNoFail: "Neither choice ends the mission. Tide will help you think it through.", stormFeedbackLearnTitle: "Do not conclude too quickly", stormFeedbackLearnBody: "Cloudy water is visible, but it does not prove that heavy metals increased. Tide records the weather and monitoring continues.", stormFeedbackGoodTitle: "Good judgement!", stormFeedbackGoodBody: "Record the weather, then wait for the Artificial Mussel and instrument results. This separates observation from testing. Monitoring continues.",
    awaitingUpload: "Analysis complete · waiting to upload", routeEqualNote: "Harbour and offshore can both complete the mission. They are two investigation routes, not a right-or-wrong choice.", routeResultEqual: "Harbour and offshore both count once the third record is collected and uploaded. Neither route loses.", routeATitle: "Route A · Follow a clue", routeBTitle: "Route B · Broaden the comparison", bothRoutesComplete: "Either route can collect the third record and complete the mission", recordReady: "Analysis complete: {place} data is ready to upload", recordSaved: "Data uploaded; this site is now lit", lightMeaningShort: "Lit = new comparable data. It does not mean safe or prove a pollution source.", uploadAndLight: "Upload data and light site",
    taskProgress: "Monitoring map: 3 / 3 comparable records", alternateOffshore: "You chose the harbour. Offshore remains an alternate route for the next play-through.", alternateHarbor: "You chose offshore. The harbour remains an alternate route for the next play-through.", endingTitle: "Three records uploaded — mission complete", endingLead: "You completed three monitoring cycles and placed all three results back on the Blue Bay map.", whyCompleteTitle: "Why is the mission complete now?", whyCompleteBody: "You collected, tested and uploaded the three records required for this mission, lighting three monitoring-data points on the Blue Bay map. Scientists can now compare them and plan the next investigation.", scienceBoundary: "The game's high, medium and low levels are relative teaching comparisons. Real research uses calibrated instruments, standards and more evidence."
  });

  const locations = [
    { id: "LAB", css: "lab", icon: "⌂", names: { "zh-Hant": "研究站", "zh-Hans": "研究站", en: "Research station" }, signals: { hm: 0, rad: 0 } },
    { id: "RIV", css: "riv", icon: "⌁", names: { "zh-Hant": "河口", "zh-Hans": "河口", en: "River mouth" }, signals: { hm: 3, rad: 1 } },
    { id: "RES", css: "res", icon: "♧", names: { "zh-Hant": "保護區", "zh-Hans": "保护区", en: "Marine reserve" }, signals: { hm: 1, rad: 1 } },
    { id: "HAR", css: "har", icon: "⚓", names: { "zh-Hant": "港口", "zh-Hans": "港口", en: "Harbour" }, signals: { hm: 2, rad: 1 } },
    { id: "OFF", css: "off", icon: "≈", names: { "zh-Hant": "外海", "zh-Hans": "外海", en: "Offshore station" }, signals: { hm: 1, rad: 2 } }
  ];

  const events = [
    { id: "HAR", icon: "📜", copy: {
      "zh-Hant": { title: "未核對的維修記錄", body: "港口浮標找到一份舊維修記錄。它值得查看，但不能證明港口就是污染來源。" },
      "zh-Hans": { title: "未核对的维修记录", body: "港口浮标找到一份旧维修记录。它值得查看，但不能证明港口就是污染来源。" },
      en: { title: "An unverified maintenance record", body: "A harbour buoy found an old maintenance record. It is worth checking, but it does not prove the harbour is a pollution source." }
    }},
    { id: "OFF", icon: "🌊", copy: {
      "zh-Hant": { title: "新的水流資料", body: "新資料顯示海水會在外海和內灣之間移動。比較兩邊可能會發現新的線索。" },
      "zh-Hans": { title: "新的水流数据", body: "新数据显示海水会在外海和内湾之间移动。比较两边可能会发现新的线索。" },
      en: { title: "New water-current data", body: "New data shows water moving between the inner bay and offshore area. Comparing both sides may reveal a new clue." }
    }}
  ];

  window.GAME_DATA = { strings: { "zh-Hant": zhHant, "zh-Hans": zhHans, en }, locations, events };
})();

// V2 evidence-mission copy. The original copy remains available for reference,
// while the new interface uses this smaller, action-led vocabulary.
(function () {
  const hant = {
    appTitle: "人工青口：藍灣證據任務",
    v2Tagline: "用證據解開藍灣的海洋謎題",
    v2HomeTitle: "收集海水線索，決定下一步去哪裡調查。",
    v2HomeLead: "使用真實存在的人工青口，在三個地點收集、分析和比較重金屬信號。",
    v2Time: "約 10 分鐘 · 適合小四至小五 · 語音文字同步",
    v2NewMission: "開始新任務", v2ContinueMission: "繼續上次任務", v2Reset: "重新開始",
    v2StageKnow: "認識", v2StageCollect: "收集", v2StageCompare: "比較", v2StageDecide: "決定", v2Evidence: "證據",
    v2MissionEyebrow: "藍灣研究站來訊", v2MissionTitle: "河口出現了一個不尋常的信號", v2MissionLead: "海水看起來正常，但舊監測資料顯示河口曾出現重金屬變化。只有一個結果，科學家還不能知道原因。", v2MissionQuestion: "科學家下一步應該調查哪裡？",
    v2MissionClueLabel: "現有線索", v2MissionClue: "河口曾出現異常信號", v2MissionGoalLabel: "你的目標", v2MissionGoal: "取得三份可以比較的證據", v2MissionHowLabel: "你的方法", v2MissionHow: "部署、分析、比較、決定", v2MeetDevice: "先認識監測工具",
    v2DeviceEyebrow: "真實海洋科學工具", v2DeviceTitle: "這就是人工青口", v2DeviceLead1: "它讓海水從小孔進入，裡面的材料會在數星期內慢慢收集水中的金屬線索。它負責監測，不會清除污染。", v2BenefitTime: "長時間收集", v2BenefitInvisible: "發現看不見的變化", v2BenefitCompare: "比較不同地點",
    v2MetalTitle: "先認識重金屬", v2MetalPrompt: "含量過高時，可能發生甚麼？", v2MetalA: "人工青口會立即把它們清除", v2MetalB: "一些海洋生物的健康可能受影響", v2MetalC: "海水一定會立即變黑", v2MetalGood: "正確。鉛、汞和鎘等金屬含量過高時，可能影響海洋生物的生長和健康。", v2MetalRetryA: "人工青口只收集監測線索，不會把重金屬從海水中清除。", v2MetalRetryC: "重金屬通常看不見，不能只靠海水顏色判斷。", v2MetalContinue: "帶人工青口去河口",
    v2RiverTitle: "第一站：跟著線索去河口", v2RiverLead: "先完成一次完整監測，看看人工青口怎樣把看不見的變化變成證據。", v2MapSelectRiver: "點擊地圖上的河口", v2RiverReadyTitle: "為甚麼先去河口？", v2RiverWhy: "舊資料曾在這裡留下異常記錄。把人工青口放在同一區域，可以重新取得一段時間的資料。", v2WhyHere: "選擇理由", v2RiverWhyShort: "重新檢查異常信號出現的區域", v2Deploy: "部署人工青口", v2DeployDone: "部署完成",
    v2CollectingTitle: "人工青口正在慢慢收集線索", v2CollectingLead: "它不用電，會留在水中八星期，累積一次取水可能錯過的變化。", v2Advance: "讓八星期過去", v2Weeks: "8 星期監測期", v2WeeksMoving: "星期正在前進……",
    v2StormEyebrow: "第 3 星期 · 現場觀察", v2StormTitle: "暴雨令河口的水變渾了", v2StormLead: "只看見水變渾，現在可以說重金屬增加了嗎？", v2StormA: "可以，立即宣布重金屬增加", v2StormB: "不可以；記錄暴雨，等待檢測", v2StormGood: "好判斷！水變渾是現場觀察；重金屬有沒有改變，要靠人工青口和儀器檢測。", v2StormRetry: "先別急著下結論。水變渾不等於重金屬增加；我們要記錄天氣並等待檢測。", v2RetrieveAnalyse: "回收並分析",
    v2AnalyzingTitle: "把收集材料交給實驗室", v2AnalyzingLead: "人工青口負責收集；科學家要取出材料，再用儀器量度重金屬信號。", v2Analyzing: "正在分析……", v2RiverResultTitle: "第一份證據：河口信號較高", v2RiverFinding: "這表示河口值得繼續調查，但不能證明重金屬來自哪裡。", v2NotProof: "較強信號是一條線索，不是污染來源的證明。", v2EvidenceSaved: "證據卡已加入", v2ToCompare: "找一個地方作比較",
    v2CompareTitle: "第二站：建立比較", v2CompareLead: "只有河口一份資料還不夠。找一個環境不同的地方，用同樣方法監測。", v2SelectReserve: "點擊地圖上的保護區", v2ReserveTitle: "保護區可以回答甚麼？", v2ReserveLead: "這裡遠離河口。使用相同裝置、監測相同時間，結果才適合放在一起比較。", v2FairCompare: "和河口監測同樣八星期", v2DeployReserve: "部署第二個人工青口", v2FinalCollect: "相同方法，相同監測時間", v2SameTime: "研究站會自動完成你已學會的回收和分析步驟。",
    v2CompareResultTitle: "現在可以看見兩個地點的差別", v2CompareResultLead: "河口信號較高，保護區較低。這個差別能幫助我們選擇下一步。", v2LookAtEvidence: "觀察證據", v2ObservePrompt: "哪一句最符合這兩份結果？", v2ObserveA: "保護區一定完全沒有重金屬", v2ObserveB: "這次河口信號比保護區高", v2ObserveC: "已經證明污染來自河口", v2ObserveGood: "正確！你比較的是這次任務中兩個地點的相對信號。", v2ObserveRetry: "再看看兩張卡。我們只能描述這次結果的差別，不能說完全沒有重金屬或已找到來源。", v2ChooseQuestion: "選擇第三個調查問題",
    v2ChoiceTitle: "第三站由你決定", v2ChoiceLead: "你不是在猜對錯，而是在選擇下一個想回答的科學問題。", v2HarborQuestion: "港口會不會提供來源線索？", v2HarborLead: "追查一份尚未核對的維修記錄", v2OffshoreQuestion: "較強信號有沒有延伸到外海？", v2OffshoreLead: "擴大比較範圍，查看外灣", v2Choose: "在港口和外海中選一個", v2SelectedQuestion: "你選擇研究", v2ChangeChoice: "換一個問題", v2ConfirmRoute: "部署第三個人工青口",
    v2HarborResult: "港口的重金屬信號屬於中等。維修記錄值得核對，但這仍不能確認污染來源。", v2OffshoreResult: "外海的重金屬信號較低。信號暫時較集中在內灣和河口附近，但仍需要更多監測。", v2ThirdResultTitle: "第三份證據已取得", v2ToDecision: "用三份證據作決定",
    v2DecisionTitle: "現在，像科學家一樣作出建議", v2DecisionLead: "可靠的決定要同時說清楚：我們知道甚麼、還不知道甚麼，以及下一步要做甚麼。", v2EvidenceReady: "三份證據已準備", v2KnownTitle: "我們知道", v2KnownHarbor: "河口較高、港口中等、保護區較低", v2KnownOffshore: "河口較高；保護區和外海較低", v2UnknownTitle: "我們還不知道", v2Unknown: "重金屬信號的真正來源", v2DecisionPrompt: "哪一個是最合理的下一步？", v2DecisionA: "立即宣布河口就是污染來源", v2DecisionBHarbor: "繼續監測河口，並核對港口記錄", v2DecisionBOffshore: "在河口及上游增加監測，縮小調查範圍", v2DecisionC: "三份資料已經足夠，不用再調查", v2DecisionGoodHarbor: "有證據的建議！港口結果和維修記錄值得繼續核對，同時要保留河口監測。", v2DecisionGoodOffshore: "有證據的建議！外海較低令調查更集中，但還要在河口及上游收集更多資料。", v2DecisionRetryA: "較高信號不能單獨證明來源。科學家需要更多地點和不同時間的證據。", v2DecisionRetryC: "三份證據能指出方向，但還不足以停止調查。", v2Finish: "查看真實世界的人工青口",
    v2RealTitle: "你完成了一次真正的科學思考循環", v2RealLead: "現實中的科學家也會部署人工青口、回收分析、比較證據，再決定下一步調查。", v2Takeaway1: "人工青口長時間收集水中的物質線索", v2Takeaway2: "回收後仍要使用實驗室儀器分析", v2Takeaway3: "比較不同地點可以發現差別", v2Takeaway4: "一份結果是線索，不是來源證明", v2Achievement: "藍灣證據探索員", v2RealPhoto: "真實人工青口照片", v2Optional: "可選延伸", v2NotebookTitle: "人工青口科學圖鑑", v2NotebookBody: "實際裝置包括塑膠管、凝膠、人工海水、收集材料和帶孔保護蓋。除金屬外，科學家也可以配合不同收集材料研究其他物質，例如放射性核素。", v2NotebookBoundary: "遊戲中的高、中、低是相對比較；真實研究還要使用校準儀器、標準值和更多證據。",
    v2BayMap: "藍灣監測地圖", v2TapToChoose: "點擊選擇", v2LabResult: "實驗室結果"
  };

  const hans = Object.fromEntries(Object.entries(hant).map(([key, value]) => [key, value
    .replaceAll("甚麼", "什么")
    .replaceAll("證據", "证据").replaceAll("資料", "数据").replaceAll("調查", "调查").replaceAll("應該", "应该")
    .replaceAll("這", "这").replaceAll("個", "个").replaceAll("裡", "里").replaceAll("與", "与").replaceAll("較", "较")
    .replaceAll("會", "会").replaceAll("為", "为").replaceAll("麼", "么").replaceAll("長", "长").replaceAll("開", "开")
    .replaceAll("時", "时").replaceAll("過", "过").replaceAll("學", "学").replaceAll("實", "实").replaceAll("現", "现")
    .replaceAll("讓", "让").replaceAll("從", "从").replaceAll("種", "种").replaceAll("選", "选").replaceAll("擇", "择")
    .replaceAll("問", "问").replaceAll("題", "题").replaceAll("點", "点").replaceAll("擊", "击").replaceAll("圖", "图")
    .replaceAll("監", "监").replaceAll("測", "测").replaceAll("變", "变").replaceAll("數", "数").replaceAll("學", "学")
    .replaceAll("驗", "验").replaceAll("覺", "觉").replaceAll("認", "认").replaceAll("識", "识").replaceAll("響", "响")
    .replaceAll("顯", "显").replaceAll("異", "异").replaceAll("裝", "装").replaceAll("無", "无").replaceAll("確", "确")
    .replaceAll("並", "并").replaceAll("將", "将").replaceAll("僅", "仅").replaceAll("張", "张").replaceAll("進", "进")
    .replaceAll("還", "还").replaceAll("來", "来").replaceAll("發", "发").replaceAll("現", "现").replaceAll("連", "连")
    .replaceAll("續", "续").replaceAll("範", "范").replaceAll("圍", "围").replaceAll("達", "达").replaceAll("標", "标")
    .replaceAll("護", "护").replaceAll("灣", "湾").replaceAll("線", "线").replaceAll("歸", "归").replaceAll("終", "终")
    .replaceAll("啟", "启").replaceAll("體", "体").replaceAll("總", "总").replaceAll("結", "结").replaceAll("與", "与")
    .replaceAll("風", "风").replaceAll("錄", "录").replaceAll("導", "导").replaceAll("繼", "继").replaceAll("續", "续")
    .replaceAll("區", "区").replaceAll("號", "号").replaceAll("屬", "属").replaceAll("準", "准").replaceAll("備", "备")
    .replaceAll("寫", "写").replaceAll("說", "说").replaceAll("濃", "浓").replaceAll("據", "据").replaceAll("樣", "样")
    .replaceAll("藍", "蓝").replaceAll("謎", "谜").replaceAll("決", "决").replaceAll("約", "约").replaceAll("鐘", "钟")
    .replaceAll("適", "适").replaceAll("語", "语").replaceAll("務", "务").replaceAll("見", "见").replaceAll("習", "习")
    .replaceAll("質", "质").replaceAll("設", "设").replaceAll("舊", "旧").replaceAll("夠", "够").replaceAll("內", "内")
    .replaceAll("層", "层").replaceAll("鉛", "铅").replaceAll("鎘", "镉").replaceAll("傷", "伤").replaceAll("們", "们")
    .replaceAll("著", "着").replaceAll("電", "电").replaceAll("錯", "错").replaceAll("渾", "浑").replaceAll("檢", "检")
    .replaceAll("斷", "断").replaceAll("儀", "仪").replaceAll("條", "条").replaceAll("遠", "远").replaceAll("動", "动")
    .replaceAll("兩", "两").replaceAll("幫", "帮").replaceAll("觀", "观").replaceAll("當", "当").replaceAll("對", "对")
    .replaceAll("維", "维").replaceAll("擴", "扩").replaceAll("換", "换").replaceAll("縮", "缩").replaceAll("環", "环")
    .replaceAll("鑑", "鉴").replaceAll("膠", "胶").replaceAll("帶", "带").replaceAll("蓋", "盖").replaceAll("遊", "游")
    .replaceAll("邊", "边").replaceAll("確", "确").replaceAll("區", "区").replaceAll("處", "处").replaceAll("聲", "声")
  ]));

  const en = {
    appTitle: "Artificial Mussel: Blue Bay Evidence Mission",
    v2Tagline: "Use evidence to solve Blue Bay's marine mystery",
    v2HomeTitle: "Collect clues from the sea. Decide where to investigate next.",
    v2HomeLead: "Use a real monitoring tool called an Artificial Mussel to collect, analyse and compare heavy-metal signals at three locations.",
    v2Time: "About 10 minutes · Primary 4–5 · Narration with text highlighting",
    v2NewMission: "Start new mission", v2ContinueMission: "Continue mission", v2Reset: "Start again",
    v2StageKnow: "Discover", v2StageCollect: "Collect", v2StageCompare: "Compare", v2StageDecide: "Decide", v2Evidence: "evidence",
    v2MissionEyebrow: "Message from Blue Bay Research Station", v2MissionTitle: "An unusual signal appeared at the river mouth", v2MissionLead: "The water looks normal, but old monitoring data showed a change in heavy metals at the river mouth. One result cannot tell scientists the cause.", v2MissionQuestion: "Where should scientists investigate next?",
    v2MissionClueLabel: "Clue so far", v2MissionClue: "An unusual signal appeared at the river mouth", v2MissionGoalLabel: "Your goal", v2MissionGoal: "Collect three pieces of comparable evidence", v2MissionHowLabel: "Your method", v2MissionHow: "Deploy, analyse, compare, decide", v2MeetDevice: "Meet the monitoring tool",
    v2DeviceEyebrow: "A real marine-science tool", v2DeviceTitle: "This is an Artificial Mussel", v2DeviceLead1: "Seawater enters through small holes. Materials inside slowly collect chemical clues over several weeks. It monitors the water; it does not remove pollution.", v2BenefitTime: "Collects over time", v2BenefitInvisible: "Finds invisible changes", v2BenefitCompare: "Compares locations",
    v2MetalTitle: "Heavy metals", v2MetalPrompt: "What may happen when their levels are too high?", v2MetalA: "The Artificial Mussel removes them immediately", v2MetalB: "The health of some marine life may be harmed", v2MetalC: "The seawater must turn black immediately", v2MetalGood: "Correct. High levels of metals such as lead, mercury and cadmium may affect the growth and health of marine life.", v2MetalRetryA: "An Artificial Mussel collects monitoring clues. It does not remove heavy metals from seawater.", v2MetalRetryC: "Heavy metals are usually invisible. We cannot judge them only by the colour of the water.", v2MetalContinue: "Take the Artificial Mussel to the river mouth",
    v2RiverTitle: "First stop: follow the clue to the river mouth", v2RiverLead: "Complete one monitoring cycle and see how an Artificial Mussel turns an invisible change into evidence.", v2MapSelectRiver: "Tap the river mouth on the map", v2RiverReadyTitle: "Why start at the river mouth?", v2RiverWhy: "Old data recorded an unusual signal here. Placing an Artificial Mussel in the same area collects a new set of data over time.", v2WhyHere: "Why this location?", v2RiverWhyShort: "Check the area where the unusual signal appeared", v2Deploy: "Deploy Artificial Mussel", v2DeployDone: "Deployment complete",
    v2CollectingTitle: "The Artificial Mussel is slowly collecting clues", v2CollectingLead: "It needs no electricity. It stays in the water for eight weeks and collects changes that a single water sample might miss.", v2Advance: "Let eight weeks pass", v2Weeks: "8-week monitoring period", v2WeeksMoving: "The weeks are passing…",
    v2StormEyebrow: "Week 3 · Field observation", v2StormTitle: "A storm has made the river water cloudy", v2StormLead: "Can we now say that heavy metals have increased?", v2StormA: "Yes. Announce an increase immediately", v2StormB: "No. Record the storm and wait for testing", v2StormGood: "Good judgement! Cloudy water is an observation. We need the Artificial Mussel and laboratory instruments to test whether heavy metals changed.", v2StormRetry: "Not so fast. Cloudy water does not prove that heavy metals increased. Record the weather and wait for testing.", v2RetrieveAnalyse: "Retrieve and analyse",
    v2AnalyzingTitle: "Send the collecting material to the laboratory", v2AnalyzingLead: "The Artificial Mussel collects clues. Scientists remove the material and use instruments to measure the heavy-metal signal.", v2Analyzing: "Analysing…", v2RiverResultTitle: "First evidence: a higher river-mouth signal", v2RiverFinding: "This means the river mouth deserves more investigation, but it does not prove where the heavy metals came from.", v2NotProof: "A stronger signal is a clue, not proof of the pollution source.", v2EvidenceSaved: "Evidence card added", v2ToCompare: "Find a place to compare",
    v2CompareTitle: "Second stop: make a fair comparison", v2CompareLead: "One river-mouth result is not enough. Monitor a different environment with the same method.", v2SelectReserve: "Tap the marine reserve on the map", v2ReserveTitle: "What can the marine reserve tell us?", v2ReserveLead: "It is far from the river mouth. Using the same device for the same amount of time makes the results suitable for comparison.", v2FairCompare: "Use the same eight-week monitoring period", v2DeployReserve: "Deploy the second Artificial Mussel", v2FinalCollect: "Same method, same monitoring time", v2SameTime: "The research station will complete the retrieval and analysis steps you already learned.",
    v2CompareResultTitle: "Now we can see a difference between two places", v2CompareResultLead: "The river-mouth signal is higher and the reserve signal is lower. This difference helps us choose the next step.", v2LookAtEvidence: "Read the evidence", v2ObservePrompt: "Which statement best matches these two results?", v2ObserveA: "The reserve definitely has no heavy metals", v2ObserveB: "In this mission, the river-mouth signal is higher", v2ObserveC: "We have proved pollution came from the river mouth", v2ObserveGood: "Correct! You compared the relative signals at two locations in this mission.", v2ObserveRetry: "Look at both cards again. We can describe the difference, but we cannot say there are no metals or that we have found the source.", v2ChooseQuestion: "Choose the third investigation question",
    v2ChoiceTitle: "You decide the third stop", v2ChoiceLead: "You are not guessing a right answer. You are choosing the next scientific question to investigate.", v2HarborQuestion: "Could the harbour provide a clue to the source?", v2HarborLead: "Check an unconfirmed maintenance record", v2OffshoreQuestion: "Does the stronger signal extend offshore?", v2OffshoreLead: "Widen the comparison to the outer bay", v2Choose: "Choose the harbour or offshore area", v2SelectedQuestion: "Your research question", v2ChangeChoice: "Choose another question", v2ConfirmRoute: "Deploy the third Artificial Mussel",
    v2HarborResult: "The harbour has a medium heavy-metal signal. Its maintenance record is worth checking, but this still does not confirm a source.", v2OffshoreResult: "The offshore heavy-metal signal is lower. The signal currently seems more concentrated near the inner bay and river mouth, but more monitoring is needed.", v2ThirdResultTitle: "The third piece of evidence is ready", v2ToDecision: "Make a decision with three pieces of evidence",
    v2DecisionTitle: "Now make a recommendation like a scientist", v2DecisionLead: "A reliable decision states what we know, what we do not know, and what we should do next.", v2EvidenceReady: "Three pieces of evidence ready", v2KnownTitle: "What we know", v2KnownHarbor: "River mouth: higher; harbour: medium; reserve: lower", v2KnownOffshore: "River mouth: higher; reserve and offshore: lower", v2UnknownTitle: "What we do not know", v2Unknown: "The true source of the heavy-metal signal", v2DecisionPrompt: "What is the most reasonable next step?", v2DecisionA: "Announce that the river mouth is the pollution source", v2DecisionBHarbor: "Keep monitoring the river mouth and check the harbour record", v2DecisionBOffshore: "Add monitoring at the river mouth and upstream to narrow the search", v2DecisionC: "Three results are enough. Stop investigating", v2DecisionGoodHarbor: "An evidence-based recommendation! The harbour result and record deserve checking, while river-mouth monitoring should continue.", v2DecisionGoodOffshore: "An evidence-based recommendation! The lower offshore result narrows the search, but more evidence is needed at the river mouth and upstream.", v2DecisionRetryA: "A higher signal alone cannot prove a source. Scientists need evidence from more locations and times.", v2DecisionRetryC: "Three pieces of evidence can show a direction, but they are not enough to stop the investigation.", v2Finish: "See a real-world Artificial Mussel",
    v2RealTitle: "You completed a real scientific-thinking cycle", v2RealLead: "Scientists also deploy Artificial Mussels, retrieve and analyse them, compare evidence, and decide what to investigate next.", v2Takeaway1: "An Artificial Mussel collects chemical clues in water over time", v2Takeaway2: "Laboratory instruments are still needed after retrieval", v2Takeaway3: "Comparing locations helps us find differences", v2Takeaway4: "One result is a clue, not proof of a source", v2Achievement: "Blue Bay Evidence Explorer", v2RealPhoto: "Photo of a real Artificial Mussel", v2Optional: "Optional extension", v2NotebookTitle: "Artificial Mussel science notebook", v2NotebookBody: "A real device includes a plastic tube, gel, artificial seawater, collecting material and a protective cap with holes. With different collecting materials, scientists can study other substances too, including radionuclides.", v2NotebookBoundary: "High, medium and low in this game are relative comparisons. Real research also needs calibrated instruments, standards and more evidence.",
    v2BayMap: "Blue Bay monitoring map", v2TapToChoose: "Tap to choose", v2LabResult: "Laboratory result"
  };

  Object.assign(window.GAME_DATA.strings["zh-Hant"], hant);
  Object.assign(window.GAME_DATA.strings["zh-Hans"], hans);
  Object.assign(window.GAME_DATA.strings.en, en);
})();
