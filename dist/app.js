(function () {
  "use strict";

  const { strings, locations } = window.GAME_DATA;
  const app = document.getElementById("app");
  const scienceDialog = document.getElementById("science-dialog");
  const STORAGE_KEY = "artificial-mussel-preferences-v10";
  const SCENES = ["HOME", "ALERT", "WHY", "LENS", "BUILD", "FLOW", "DEPLOY", "TIME", "LAB", "EVIDENCE", "DECISION", "COMPLETE"];
  let timer = null;
  let speechRun = 0;
  let speechVoices = [];
  let dragPayload = null;
  let lensDrag = null;
  let pointerDrag = null;
  let suppressClickUntil = 0;
  let narrationActive = false;
  let speechCanSkip = false;
  let speechSkipTimer = null;
  let speechFallbackTimer = null;

  const HANT = {
    title: "人工青口出動！", subtitle: "藍灣海洋監測任務", role: "小小海洋工程師",
    homeTitle: "造一隻會替海水記日記的人工青口", homeLead: "親手組裝、放進海裡、帶回分析，再幫科學家決定下一步。", start: "接受藍灣任務", resume: "繼續任務", duration: "約 10 分鐘 · 適合小四至小五", uiLanguage: "介面", voiceLanguage: "語音", traditional: "繁中", simplified: "簡中", english: "English", mandarin: "普通話", cantonese: "粵語", voiceEnglish: "English",
    back: "返回", home: "首頁", replay: "重聽", soundOn: "語音開啟", soundOff: "語音靜音", next: "繼續", mission: "任務", toolbox: "工具箱", samples: "樣本", collected: "已取得", locked: "等待回收",
    alertName: "藍灣的奇怪訊號", alertMission: "找出為甚麼需要長期監測", alertSpeaker: "研究站來訊", alert1: "河口曾出現奇怪的金屬訊號，但今天海水看起來很正常。", alert2: "只取一瓶水，只能看到那一刻，可能會錯過潮汐、暴雨或排放令金屬含量短暫升高或降低的變化。", alertQuestion: "有甚麼工具可以留在海裡，替我們記住幾星期的線索？", answerRadio: "拿起通訊器", alertReply: "我來造一隻人工青口！",
    lensName: "看不見的海水線索", lensMission: "用科學觀察鏡找線索", lensHint: "把觀察鏡拖到水樣上", lensFound: "找到了！海水看起來清澈，裡面仍可能有肉眼看不到的金屬。", heavyDefinition: "在這次任務中，「重金屬」是鉛、汞、鎘等金屬污染物的簡稱。它們可以天然存在，但人類活動也可能令環境中的含量升高。", lensMetal: "含量過高或接觸時間太長時，它們可能在生物體內累積，影響生長、活動、繁殖或神經系統。", metalScanTitle: "重金屬危害掃描", metalScanPrompt: "逐一按下 3 種金屬，看看它們可能怎樣影響生物。", metalPb: "鉛 Pb", metalHg: "汞 Hg", metalCd: "鎘 Cd", metalPbHarm: "鉛可以被貝類等水生生物吸收；含量過高時，可能影響生長和正常活動。", metalHgHarm: "某些形態的汞會在魚和貝類體內累積，還可能沿食物網增加，影響神經系統。", metalCdHarm: "水生生物長期接觸過量的鎘，生長、繁殖、發育和行為都可能受影響。", metalProgress: "已查看 {n}/3", metalReady: "3 種金屬已記錄，可以開始製作監測工具。", metalGuard: "記住：發現訊號 ≠ 已證明有危險。還要用儀器量度、和標準比較，並收集更多證據。", lensAction: "拖動觀察鏡", toBuild: "去工作台造工具",
    buildName: "研究站工作台", buildMission: "親手完成 AM-01", buildTitle: "把人工青口組裝起來", buildLead: "依次把三組部件放進發光的位置。點擊也可以安裝。", partCollector: "收集材料", partCollectorHelp: "它會慢慢留下水中的目標物質。", partGel: "凝膠＋人工海水", partGelHelp: "讓裝置內部保持適合監測的環境。", partCap: "帶孔保護蓋", partCapHelp: "讓海水進入，同時保護裝置。", install: "安裝", installed: "完成", wrongPart: "這個部件還未到。先跟著發光的編號組裝。", deviceReady: "AM-01 組裝完成！", chooseMark: "選一個標記，讓它成為你的人工青口。", markChosen: "這是你的 AM-01", toFlow: "放進測試水槽",
    flowName: "人工青口原理測試", flowMission: "看看海水和線索怎樣移動", flowTitle: "按下水流閥，看看裡面發生甚麼", flowStart: "開啟水流", flowRunning: "海水正在從小孔進入……", flowWater: "海水從小孔進入", flowCapture: "收集材料留下金屬線索", flowWait: "留在水中數星期，慢慢累積", flowNoPower: "不用電，也不會把污染清除", flowDone: "測試成功！現在把三隻人工青口帶到藍灣。", toMap: "前往藍灣",
    deployName: "藍灣部署行動", deployMission: "把三隻人工青口送到監測點", deployTitle: "先選工具箱裡的裝置，再點地圖位置", deployRiver: "AM-01 去河口：重新檢查異常訊號。", deployReserve: "AM-02 去保護區：建立一個比較地點。", deployThird: "AM-03 由你決定：港口還是外海？", riverQuestion: "異常訊號會再次出現嗎？", reserveQuestion: "和遠離河口的地點有甚麼差別？", harborQuestion: "港口記錄是否值得繼續核對？", offshoreQuestion: "較強訊號有沒有延伸到外海？", selectDeviceFirst: "先從工具箱選一隻人工青口。", wrongSite: "這一站要先完成指定的研究問題。", deployed: "部署完成", allDeployed: "三隻人工青口都在工作了！", toTime: "開始八星期監測",
    timeName: "八星期監測期", timeMission: "記錄事件，不急著下結論", timeTitle: "轉動時間輪，讓人工青口留在海中", week: "第 {n} 星期", turnWheel: "轉動時間輪", stormTitle: "現場記錄：暴雨令河口的水變渾", stormQuestion: "現在應該怎樣做？", stormRush: "立即宣布重金屬增加", stormRecord: "記錄暴雨，繼續等待檢測", stormWrong: "水變渾是觀察，不是重金屬增加的證明。把它寫進記錄，再等待分析。", stormGood: "記錄完成。人工青口會繼續收集，之後再用儀器分析。", weeksDone: "八星期完成，可以回收裝置了。", retrieve: "乘研究船回收",
    labName: "研究站分析室", labMission: "把三個樣本交給儀器", labTitle: "親手完成回收後的分析", labStepOpen: "轉開保護蓋", labStepExtract: "取出收集材料", labStepInsert: "放進分析儀", labScanning: "儀器正在量度重金屬訊號……", labResult: "分析完成", signalHigh: "較高", signalMedium: "中等", signalLow: "較低", nextSample: "分析下一個樣本", allResults: "三份調查檔案都印好了！", toEvidence: "帶到證據牆",
    evidenceName: "藍灣證據牆", evidenceMission: "把結果貼回地點並找出差別", evidenceTitle: "把三張貼紙放回正確的監測點", placeHint: "點擊貼紙，或把它拖到相同地點。", chooseHighest: "哪一個地點的訊號最高？請把磁圈放上去。", signalLegend: "訊號格只比較本次三個地點，不代表真實安全標準。", highestWrong: "再比較三張貼紙的訊號格數。", highestGood: "河口在這次任務中較高。這是一條線索，還不是污染來源的證明。", known: "我們知道", knownText: "這次不同地點的重金屬訊號有差別。", unknown: "我們還不知道", unknownText: "訊號的真正來源，以及其他時間是否相同。", toDecision: "制定下一步計劃",
    decisionName: "制定調查計劃", decisionMission: "提出有證據的下一步", decisionTitle: "哪一個計劃能幫科學家取得更多證據？", decisionDeclare: "立即宣布河口就是污染來源", decisionMoreHarbor: "繼續監測河口，並核對港口記錄", decisionMoreOffshore: "在河口和上游增加監測，縮小調查範圍", decisionStop: "已有三份結果，不用再調查", decisionWrongDeclare: "訊號較高不能單獨證明來源。科學家還需要更多地點和時間的證據。", decisionWrongStop: "三份結果指出了方向，但仍有問題未回答。", decisionGood: "好計劃！你用證據決定了下一步，而不是太早下結論。", completeMission: "提交調查計劃",
    completeName: "任務完成", completeMissionLabel: "藍灣小小監測員", completeTitle: "你完成了一次真正的海洋科學任務！", completeLead: "你造好人工青口、長期收集、用儀器分析、比較地點，再提出下一步調查。", takeaway1: "人工青口會長時間收集水中的金屬線索", takeaway2: "鉛、汞、鎘含量過高可能傷害海洋生物", takeaway3: "回收分析並比較地點，才能看見差別", takeaway4: "一份結果是線索，不是危險或來源的證明", realPhoto: "真實人工青口", scienceBook: "打開科學圖鑑", playAgain: "再執行一次任務", scienceTitle: "人工青口科學圖鑑", scienceBody: "真實裝置包括塑膠管、凝膠、人工海水、收集材料和帶孔保護蓋。科學家可以使用不同收集材料研究金屬或其他物質。", scienceMetal: "鉛、汞和鎘等金屬可以天然存在；當環境中的含量過高時，可能在生物體內累積並造成傷害。不同金屬、含量和形態帶來的影響並不相同。", scienceBoundary: "遊戲中的高、中、低是相對比較。真實研究還需要校準儀器、標準值和更多證據。"
  };

  const EN = {
    title: "Artificial Mussel: Action!", subtitle: "Blue Bay monitoring mission", role: "Junior ocean engineer",
    homeTitle: "Build an Artificial Mussel that remembers the sea", homeLead: "Build it, place it in the sea, analyse it in the lab, and help scientists choose their next step.", start: "Accept Blue Bay mission", resume: "Continue mission", duration: "About 10 minutes · Primary 4–5", uiLanguage: "Interface", voiceLanguage: "Voice", traditional: "繁中", simplified: "简中", english: "English", mandarin: "Mandarin", cantonese: "Cantonese", voiceEnglish: "English",
    back: "Back", home: "Home", replay: "Replay", soundOn: "Narration on", soundOff: "Narration muted", next: "Continue", mission: "Mission", toolbox: "Toolbox", samples: "Samples", collected: "Collected", locked: "Waiting",
    alertName: "A strange signal in Blue Bay", alertMission: "Find out why long-term monitoring is needed", alertSpeaker: "Research station calling", alert1: "A strange metal signal appeared at the river mouth, but the water looks normal today.", alert2: "One bottle captures only one moment, so it may miss short-lived rises or falls in metal levels caused by tides, storms or discharges.", alertQuestion: "What tool could stay in the sea and remember several weeks of clues?", answerRadio: "Answer the radio", alertReply: "I will build an Artificial Mussel!",
    lensName: "Invisible clues in seawater", lensMission: "Use the science lens to find clues", lensHint: "Drag the science lens over the water sample", lensFound: "You found them! Clear-looking water may still contain metals our eyes cannot see.", heavyDefinition: "In this mission, heavy metals means metal pollutants such as lead, mercury and cadmium. They occur naturally, but human activity can raise their levels in the environment.", lensMetal: "At high levels or after long exposure, they may build up in organisms and affect growth, movement, reproduction or nervous systems.", metalScanTitle: "Heavy-metal impact scan", metalScanPrompt: "Open all three metal files to see how they may affect living things.", metalPb: "Lead Pb", metalHg: "Mercury Hg", metalCd: "Cadmium Cd", metalPbHarm: "Lead can be taken up by shellfish and other aquatic life. Too much may affect growth and normal activity.", metalHgHarm: "Some forms of mercury build up in fish and shellfish and can increase through food webs, affecting nervous systems.", metalCdHarm: "Long exposure to too much cadmium may affect aquatic animals' growth, reproduction, development and behaviour.", metalProgress: "Viewed {n}/3", metalReady: "All three metal files are recorded. You can build the monitoring tool.", metalGuard: "Remember: detecting a signal does not prove danger. Scientists must measure it, compare it with standards and collect more evidence.", lensAction: "Drag the science lens", toBuild: "Build the tool",
    buildName: "Research station workbench", buildMission: "Build AM-01", buildTitle: "Assemble the Artificial Mussel", buildLead: "Put the three parts into the glowing spaces in order. You can tap to install them too.", partCollector: "Collection material", partCollectorHelp: "It slowly keeps target substances from the water.", partGel: "Gel + artificial seawater", partGelHelp: "They keep the inside ready for monitoring.", partCap: "Protective caps with holes", partCapHelp: "They let seawater enter while protecting the device.", install: "Install", installed: "Done", wrongPart: "Not this part yet. Follow the glowing number.", deviceReady: "AM-01 is ready!", chooseMark: "Choose a mark to make this Artificial Mussel yours.", markChosen: "This is your AM-01", toFlow: "Test it in the water tank",
    flowName: "How the Artificial Mussel works", flowMission: "Watch seawater and clues move", flowTitle: "Open the water valve and look inside", flowStart: "Open water valve", flowRunning: "Seawater is entering through the holes…", flowWater: "Seawater enters through small holes", flowCapture: "Collection material keeps metal clues", flowWait: "Several weeks build a longer record", flowNoPower: "No electricity; it does not remove pollution", flowDone: "Test passed! Take three Artificial Mussels to Blue Bay.", toMap: "Go to Blue Bay",
    deployName: "Blue Bay deployment", deployMission: "Send three Artificial Mussels to monitoring sites", deployTitle: "Choose a device, then tap its location", deployRiver: "AM-01 to the river mouth: check the unusual signal again.", deployReserve: "AM-02 to the reserve: create a comparison site.", deployThird: "You decide AM-03: harbour or offshore?", riverQuestion: "Does the unusual signal appear again?", reserveQuestion: "How is it different from a site far from the river?", harborQuestion: "Should scientists check the harbour record?", offshoreQuestion: "Does the stronger signal reach offshore?", selectDeviceFirst: "Choose an Artificial Mussel from the toolbox first.", wrongSite: "Complete the current research question first.", deployed: "Deployed", allDeployed: "All three Artificial Mussels are working!", toTime: "Begin eight-week monitoring",
    timeName: "Eight-week monitoring", timeMission: "Record events without jumping to conclusions", timeTitle: "Turn the time wheel and leave the devices in the sea", week: "Week {n}", turnWheel: "Turn the time wheel", stormTitle: "Field note: a storm made the river cloudy", stormQuestion: "What should you do?", stormRush: "Announce that heavy metals increased", stormRecord: "Record the storm and wait for testing", stormWrong: "Cloudy water is an observation, not proof of more heavy metals. Record it and wait for analysis.", stormGood: "Note saved. The device keeps collecting, and instruments will test it later.", weeksDone: "Eight weeks are complete. Retrieve the devices.", retrieve: "Retrieve them by research boat",
    labName: "Research station laboratory", labMission: "Analyse three samples", labTitle: "Complete the steps after retrieval", labStepOpen: "Twist off the protective cap", labStepExtract: "Remove the collection material", labStepInsert: "Put it in the analyser", labScanning: "Measuring the heavy-metal signal…", labResult: "Analysis complete", signalHigh: "Higher", signalMedium: "Medium", signalLow: "Lower", nextSample: "Analyse next sample", allResults: "All three investigation files are ready!", toEvidence: "Take them to the evidence wall",
    evidenceName: "Blue Bay evidence wall", evidenceMission: "Return results to the map and find the difference", evidenceTitle: "Place each sticker at its monitoring site", placeHint: "Tap a sticker, or drag it to the matching place.", chooseHighest: "Which place has the highest signal? Put the magnetic ring on it.", signalLegend: "Signal blocks compare only these three sites; they are not real safety standards.", highestWrong: "Compare the number of signal blocks on all three stickers.", highestGood: "The river mouth is higher in this mission. It is a clue, not proof of a source.", known: "What we know", knownText: "Heavy-metal signals differ between locations in this mission.", unknown: "What we do not know", unknownText: "The true source, and whether other times are the same.", toDecision: "Make an investigation plan",
    decisionName: "Investigation plan", decisionMission: "Choose an evidence-based next step", decisionTitle: "Which plan will help scientists collect more evidence?", decisionDeclare: "Announce that the river mouth is the source", decisionMoreHarbor: "Keep monitoring the river and check the harbour record", decisionMoreOffshore: "Add monitoring at the river mouth and upstream", decisionStop: "Three results are enough; stop investigating", decisionWrongDeclare: "A higher signal alone cannot prove a source. Scientists need more places and times.", decisionWrongStop: "Three results show a direction, but questions remain.", decisionGood: "Good plan! You used evidence to choose the next step without jumping to a conclusion.", completeMission: "Submit investigation plan",
    completeName: "Mission complete", completeMissionLabel: "Junior Blue Bay monitor", completeTitle: "You completed a real marine-science mission!", completeLead: "You built an Artificial Mussel, collected over time, analysed samples, compared sites and chose the next investigation.", takeaway1: "An Artificial Mussel collects metal clues over time", takeaway2: "Too much lead, mercury or cadmium may harm marine life", takeaway3: "Lab analysis and site comparison reveal differences", takeaway4: "One result is a clue, not proof of danger or a source", realPhoto: "Real Artificial Mussel", scienceBook: "Open science notebook", playAgain: "Run mission again", scienceTitle: "Artificial Mussel science notebook", scienceBody: "A real device includes plastic tubing, gel, artificial seawater, collection material and protective caps with holes. Different collection materials can study metals or other substances.", scienceMetal: "Metals such as lead, mercury and cadmium occur naturally. At high environmental levels, they may build up in organisms and cause harm. Effects depend on the metal, amount and chemical form.", scienceBoundary: "High, medium and low are relative in this game. Real research also needs calibrated instruments, standards and more evidence."
  };

  Object.assign(HANT, {
    resume: "",
    progress: "任務進度", stageKnow: "認識", stageBuild: "製作", stageMonitor: "監測", stageAnalyse: "分析", stageDecide: "決定",
    sampleProgress: "樣本 {n}/3", returnHome: "回到標題", homeConfirm: "確定回到標題頁嗎？本次任務進度會清除。",
    lensMission: "先找出看不見的海水線索", metalScanPrompt: "按下 3 種金屬，觀看它們在生物體內可能造成的影響。",
    impactDemo: "動畫放大示意", impactPb1: "鉛進入水生生物體內", impactPb2: "過量時，活動和生長可能受影響", impactHg1: "汞由浮游生物進入小魚", impactHg2: "沿食物網累積，可能影響神經系統", impactCd1: "鎘在長期接觸中累積", impactCd2: "過量時，發育和繁殖可能受影響",
    radioTitle: "人工青口也能追蹤放射性物質", radioIntro: "放射性物質會放出我們看不見的輻射，例如某些形態的鈾、鍶和銫。合適的收集材料可以留下它們的線索，再交給專門儀器量度。",
    radioMaterial: "不同目標要用合適材料", radioMeasure: "人工青口負責收集；實驗室儀器負責量度", radioSafety: "發現訊號不等於有危險，仍要比較標準和更多證據。", radioAction: "查看放射性物質線索", radioDone: "放射性物質資料已記錄，可以開始造工具。",
    buildLead: "依次安裝三組部件。點擊發光部件即可；完成後可點裝置上的標記，認識每個部件。", exploreParts: "點擊裝置上的標記認識部件", componentTube: "透明塑膠管", componentTubeHelp: "固定內部材料，也讓科學家看見裝置狀態。", componentWater: "凝膠與人工海水", componentWaterHelp: "讓裝置內部保持穩定、適合交換物質的環境。", componentCollector: "收集材料", componentCollectorHelp: "像一個線索捕手；不同材料會收集不同目標。", componentCap: "帶孔保護蓋", componentCapHelp: "小孔讓海水進出，同時保護內部材料。", componentHint: "部件說明",
    flowCapture: "收集材料吸附或交換水中的線索", flowScale: "動畫放大示意：真實物質肉眼未必看得見", materialMetal: "金屬：樹脂等材料", materialRadio: "部分放射性物質：需選合適材料", flowNoPower: "不用電；負責監測，不會把污染清除",
    deployTitle: "點擊發光地點，系統會自動放下一隻人工青口", deployMission: "把三隻人工青口送到監測點", deploying: "研究船正在前往……", autoDevice: "下一隻已準備好", chooseSite: "只要選擇監測地點",
    timeObservation0: "剛剛部署：收集材料仍很乾淨。", timeObservation2: "第 2 星期：開始留下少量、肉眼看不見的線索。", timeObservation4: "第 4 星期：線索繼續累積；記錄暴雨，但不能直接下結論。", timeObservation6: "第 6 星期：較長時間的記錄逐漸形成。", timeObservation8: "第 8 星期：長期記錄完成，可以回收分析。", clueCount: "累積線索",
    labMission: "分析三個地點的回收樣本", labTitle: "分析河口樣本", labCoach: "跟著發光位置：開蓋 → 取出收集材料 → 放入分析儀。", batchTitle: "河口樣本分析完成", batchExplain: "接下來讓儀器分析其餘兩份樣本。", batchAction: "分析其餘 2 份樣本", batchRunning: "儀器正在依次分析其餘樣本……", batchOne: "第 2 份：保護區樣本完成", batchTwo: "第 3 份：第三監測點樣本完成", fairCompare: "", allResults: "三份調查檔案都印好了！",
    evidenceMission: "把三張結果放回地圖並比較", scienceRadio: "放射性物質也可能看不見。科學家可按目標選擇不同收集材料，再用專門儀器量度；人工青口本身不會顯示危險程度。",
    takeaway1: "人工青口能用數星期收集金屬或放射性物質的線索", scienceBody: "真實裝置包括塑膠管、凝膠、人工海水、收集材料和帶孔保護蓋。海水進入後，目標物質會在合適的收集材料上累積；回收後才用實驗室儀器量度。",
    knowledgeTitle: "四份看不見的海水檔案", knowledgePrompt: "用箭嘴逐頁查看。四份檔案都看完，才開始製作監測工具。", knowledgeProgress: "第 {n} / 4 頁", knowledgeSeen: "已閱讀 {n}/4", knowledgePrev: "上一頁", knowledgeNext: "下一頁", knowledgeKey: "記住這個", knowledgeComplete: "四份檔案已閱讀，可以開始製作人工青口。",
    filePbTitle: "鉛 Pb｜可能影響活動與生長", filePbDefinition: "鉛是自然界存在的金屬，但工業、交通和其他人類活動可能令環境中的含量升高。", filePbKey: "海水看起來清澈，也可能含有肉眼看不見的鉛；要用儀器量度才知道含量。",
    fileHgTitle: "汞 Hg｜可能沿食物網累積", fileHgDefinition: "某些形態的汞會先進入浮游生物和小魚，再被較大的魚吃下。長期累積可能影響神經系統。", fileHgKey: "當一種生物被另一種生物吃下，汞也可能轉移到另一種生物體內。",
    fileCdTitle: "鎘 Cd｜長期接觸可能造成影響", fileCdDefinition: "水生生物長期接觸過量的鎘，生長、發育、繁殖和行為都可能受到影響。", fileCdKey: "鎘的傷害和接觸含量、接觸時間及生物種類都有關。",
    fileRadTitle: "放射性物質｜需要合適材料與專門儀器", fileRadDefinition: "某些形態的鈾、鍶和銫會放出看不見的輻射。人工青口可用合適材料收集線索，回收後再由專門儀器量度。", fileRadKey: "人工青口負責收集，不會自行判斷危險，也不會清除污染。",
    componentExploreProgress: "部件探索 {n}/4", componentExploreReady: "四個部件都認識了！現在替 AM-01 選一個標記。", componentExplorePrompt: "四個編號都在發光。逐一點擊，看看每個部件負責甚麼。",
    routeFromStation: "研究站碼頭 → 河口", routeFromRiver: "河口 → 保護區", routeFromReserve: "保護區 → 第三監測點", boatLaunching: "研究船沿調查路線出發", boatDropping: "到達監測點，正在放下人工青口",
    stormEarly: "現在回收河口裝置，提早分析", stormMove: "把保護區裝置移到河口，加強收集", stormKeep: "記錄暴雨；三個地點按原計劃完成相同監測時間", stormEarlyFeedback: "提早回收會令河口只監測四星期，不能和其他八星期樣本公平比較。", stormMoveFeedback: "移走保護區裝置，就失去原本的比較地點。先保持設計，再記錄暴雨。", stormGood: "好選擇！記錄暴雨，同時保持相同地點和監測時間，之後才能公平比較。",
    clueBoardTitle: "人工青口的海水日記", weekAction: "推進兩星期", stormChoiceHint: "三個方案都看似有用；想一想哪個能保留公平比較。",
    evidenceTitle: "把三份調查檔案釘回正確地點", placeHint: "拖動紙張到相同地點；點擊紙張也可以自動歸檔。", evidenceFile: "藍灣調查檔案", evidenceStamp: "儀器分析完成", evidenceFiled: "已釘到地圖", chooseHighest: "三份檔案都已釘好。哪一個地點的訊號較高？", evidenceReady: "三份檔案已歸位，現在比較訊號格。",
    decisionTitle: "下一步怎樣調查，才能保留比較又找到更多線索？", decisionDeclare: "在河口多放兩隻裝置，暫停其他地點", decisionMoreHarbor: "保留三個比較點，在河口上游加一點，並核對港口與暴雨記錄", decisionMoreOffshore: "保留三個比較點，在河口上游加一點，並繼續比較外海", decisionStop: "下個月只重測河口，其他地點先不監測", decisionWrongDeclare: "增加河口裝置看似更快，但失去其他地點後，就難以判斷差別是否只出現在河口。", decisionWrongStop: "只重測河口可以看到時間變化，卻失去了同一時間的地點比較。", decisionGood: "好計劃！你保留比較地點，又增加上游線索和事件記錄，能更有系統地縮小調查範圍。",
    playerSpeaking: "小小監測員報告", photoCap: "帶孔保護蓋", photoCollector: "內部收集材料", photoTube: "透明塑膠管",
    voiceSpeed: "朗讀速度", speedSlow: "慢 0.8×", speedNormal: "標準 1.0×", speedFast: "快 1.2×",
    speakingNow: "正在朗讀，聽完再繼續……", skipSpeech: "跳過朗讀", voiceUnavailable: "這部裝置未提供所選語音，已解除操作限制。",
    alertIncoming: "監測浮標傳來即時警報。拿起通訊器，聽聽研究站發現了甚麼。",
    alert1: "監測浮標剛剛把河口的一次異常金屬訊號傳回研究站。",
    alert2: "浮標負責即時量度和發出提醒；但一次警報不能告訴我們幾星期內發生過甚麼。",
    alertQuestion: "我們還需要一種留在海裡、長期收集線索的工具。",
    alertContinue: "認識兩種監測工具",
    whyName: "為甚麼叫人工青口", whyMission: "分清即時警報與長期收集",
    whyTitle: "它像青口一樣，長時間接觸海水",
    whyIntro: "真正的青口會不斷接觸和過濾周圍的海水。人工青口借用了這個概念，讓合適的材料在海中慢慢收集物質線索。",
    buoyRoleTitle: "監測浮標：即時傳訊", buoyRoleBody: "感應器量度當刻狀況，利用通訊設備把數據傳回研究站，異常時可以提醒人員。",
    musselRoleTitle: "人工青口：長期收集", musselRoleBody: "不用電、沒有通訊器、不會報警。它安靜地留在海裡數星期，回收後才由實驗室儀器量度。",
    roleRule: "記住：浮標負責『現在發生甚麼』；人工青口幫我們回看『這段時間留下了甚麼』。",
    whyAction: "尋找看不見的線索",
    buoyMapLabel: "即時監測浮標", buoySending: "傳送數據", musselQuietLabel: "人工青口：收集中，不傳訊",
    priorityTitle: "分析結果出來了！按訊號由高至低安排深入調查",
    priorityPrompt: "這些是回收後由實驗室量出的結果，不是人工青口在海中發出的警報。先點最高，再點次高。",
    priorityProgress: "已安排 {n}/3", priorityCorrect: "判斷正確！下一個地點是哪裡？", priorityWrong: "先比較尚未安排地點的訊號格，選擇最高的一個。",
    priorityDone: "三個地點已排好次序。現在決定怎樣部署下一輪，才不會失去比較。", followupTitle: "選擇下一輪深入調查方案"
  });

  Object.assign(EN, {
    resume: "",
    progress: "Mission progress", stageKnow: "DISCOVER", stageBuild: "BUILD", stageMonitor: "MONITOR", stageAnalyse: "ANALYSE", stageDecide: "DECIDE",
    sampleProgress: "Samples {n}/3", returnHome: "Title page", homeConfirm: "Return to the title page? This mission progress will be cleared.",
    metalScanPrompt: "Open all three metal files and watch how they may affect living things.", impactDemo: "Magnified animation", impactPb1: "Lead enters an aquatic organism", impactPb2: "Too much may affect activity and growth", impactHg1: "Mercury moves from plankton to small fish", impactHg2: "It may build up through a food web and affect nerves", impactCd1: "Cadmium builds up during long exposure", impactCd2: "Too much may affect development and reproduction",
    radioTitle: "Artificial Mussels can also track radioactive substances", radioIntro: "Radioactive substances release radiation we cannot see, including some forms of uranium, strontium and caesium. A suitable collection material keeps their clues for specialist instruments to measure later.", radioMaterial: "Different targets need suitable materials", radioMeasure: "The Artificial Mussel collects; laboratory instruments measure", radioSafety: "A signal does not automatically mean danger. Compare standards and more evidence.", radioAction: "Open the radioactive-substance file", radioDone: "Radioactive-substance notes recorded. You can build the tool.",
    buildLead: "Install the three groups in order. Tap the glowing part; when finished, tap labels on the device to learn what each part does.", exploreParts: "Tap the labels to learn the parts", componentTube: "Clear plastic tube", componentTubeHelp: "It holds the inner materials and lets scientists inspect the device.", componentWater: "Gel and artificial seawater", componentWaterHelp: "They keep a stable environment for substances to exchange.", componentCollector: "Collection material", componentCollectorHelp: "It catches clues; different materials collect different targets.", componentCap: "Caps with holes", componentCapHelp: "Small holes let seawater through while protecting the inside.", componentHint: "Part guide",
    flowCapture: "Collection material adsorbs or exchanges clues from water", flowScale: "Magnified animation: real substances may be invisible", materialMetal: "Metals: resins and related materials", materialRadio: "Some radioactive substances need a suitable material", flowNoPower: "No electricity; it monitors but does not clean pollution",
    deployTitle: "Tap the glowing site; the next Artificial Mussel deploys automatically", deploying: "Research boat deploying…", autoDevice: "Next device ready", chooseSite: "Choose the monitoring site",
    timeObservation0: "Just deployed: the collection material is still clean.", timeObservation2: "Week 2: a few invisible clues are being retained.", timeObservation4: "Week 4: clues keep building up. Record the storm, but do not jump to a conclusion.", timeObservation6: "Week 6: a longer record is taking shape.", timeObservation8: "Week 8: the long-term record is ready for lab analysis.", clueCount: "Clues accumulated",
    labMission: "Analyse the samples from three sites", labTitle: "Analyse the river-mouth sample", labCoach: "Follow the glow: open the cap → remove the collector → place it in the analyser.", batchTitle: "River-mouth analysis complete", batchExplain: "Now let the instrument analyse the other two samples.", batchAction: "Analyse the other 2 samples", batchRunning: "The instrument is analysing the other samples in order…", batchOne: "Sample 2: reserve complete", batchTwo: "Sample 3: third site complete", fairCompare: "", allResults: "All three investigation files are ready!",
    evidenceMission: "Return three results to the map and compare", scienceRadio: "Radioactive substances may also be invisible. Scientists choose collection materials for the target and use specialist instruments after retrieval; an Artificial Mussel does not show danger by itself.", takeaway1: "Artificial Mussels collect clues about metals or radioactive substances over several weeks", scienceBody: "A real device contains a plastic tube, gel, artificial seawater, collection material and caps with holes. Seawater enters, target substances build up on a suitable material, and laboratory instruments measure them after retrieval.",
    knowledgeTitle: "Four invisible-water files", knowledgePrompt: "Use the arrows to inspect every file before building the monitor.", knowledgeProgress: "Page {n} / 4", knowledgeSeen: "Read {n}/4", knowledgePrev: "Previous", knowledgeNext: "Next", knowledgeKey: "Remember this", knowledgeComplete: "All four files are complete. You can build the Artificial Mussel.",
    filePbTitle: "Lead Pb | May affect activity and growth", filePbDefinition: "Lead occurs naturally, but industry, transport and other human activity can raise its level in the environment.", filePbKey: "Clear-looking seawater may still contain lead that our eyes cannot see; instruments are needed to measure how much is present.",
    fileHgTitle: "Mercury Hg | May build up through a food web", fileHgDefinition: "Some forms of mercury enter plankton and small fish, then move when larger fish eat them. Long-term build-up may affect nervous systems.", fileHgKey: "When one organism is eaten by another, mercury may transfer into the other organism's body.",
    fileCdTitle: "Cadmium Cd | Long exposure may cause harm", fileCdDefinition: "Long exposure to too much cadmium may affect aquatic organisms' growth, development, reproduction and behaviour.", fileCdKey: "Cadmium's effects depend on the amount, exposure time and kind of organism.",
    fileRadTitle: "Radioactive substances | Need suitable materials and instruments", fileRadDefinition: "Some forms of uranium, strontium and caesium emit invisible radiation. Suitable materials collect clues for specialist instruments to measure after retrieval.", fileRadKey: "The Artificial Mussel collects; it does not judge danger or remove pollution.",
    componentExploreProgress: "Parts explored {n}/4", componentExploreReady: "You know all four parts. Choose a mark for AM-01.", componentExplorePrompt: "All four numbers are glowing. Open each one to learn its job.",
    routeFromStation: "Research dock → river mouth", routeFromRiver: "River mouth → reserve", routeFromReserve: "Reserve → third site", boatLaunching: "Research boat following the survey route", boatDropping: "At the site: lowering the Artificial Mussel",
    stormEarly: "Retrieve the river-mouth device now and analyse early", stormMove: "Move the reserve device to the river mouth", stormKeep: "Record the storm; keep all sites for the same monitoring time", stormEarlyFeedback: "Early retrieval gives the river sample only four weeks, so it cannot be fairly compared with eight-week samples.", stormMoveFeedback: "Moving the reserve device removes the comparison site. Keep the design and record the storm.", stormGood: "Good choice. Record the storm and keep the same sites and duration for a fair comparison.",
    clueBoardTitle: "The Artificial Mussel's sea diary", weekAction: "Advance two weeks", stormChoiceHint: "Each plan sounds useful. Which one preserves a fair comparison?",
    evidenceTitle: "Pin the three investigation files to their sites", placeHint: "Drag each paper to the matching site. You can also click to file it automatically.", evidenceFile: "Blue Bay investigation file", evidenceStamp: "Instrument analysis complete", evidenceFiled: "Pinned to map", chooseHighest: "All files are pinned. Which site has the higher signal?", evidenceReady: "The three files are in place. Compare their signal blocks.",
    decisionTitle: "Which next investigation keeps a comparison and finds more clues?", decisionDeclare: "Put two more devices at the river and pause other sites", decisionMoreHarbor: "Keep all comparison sites, add one upstream, and check harbour and storm records", decisionMoreOffshore: "Keep all comparison sites, add one upstream, and continue the offshore comparison", decisionStop: "Retest only the river next month and pause other sites", decisionWrongDeclare: "More river devices sound useful, but without other sites it is harder to tell whether the difference is unique to the river.", decisionWrongStop: "Retesting the river shows time change, but removes the same-time site comparison.", decisionGood: "Good plan. You keep comparison sites, add an upstream clue and use event records to narrow the investigation.",
    playerSpeaking: "Junior monitor's report", photoCap: "Caps with holes", photoCollector: "Collection material", photoTube: "Clear plastic tube",
    voiceSpeed: "Reading speed", speedSlow: "Slow 0.8×", speedNormal: "Normal 1.0×", speedFast: "Fast 1.2×",
    speakingNow: "Narration is playing. Listen before continuing…", skipSpeech: "Skip narration", voiceUnavailable: "The selected voice is unavailable on this device. Controls have been unlocked.",
    alertIncoming: "A monitoring buoy has sent a live alert. Pick up the communicator to hear what the station found.",
    alert1: "A monitoring buoy has just sent the station an unusual metal signal from the river mouth.",
    alert2: "The buoy measures the present moment and transmits alerts, but one alert cannot show what happened over several weeks.",
    alertQuestion: "We also need a tool that stays in the sea and gathers a longer record of clues.",
    alertContinue: "Meet the two monitoring tools",
    whyName: "Why is it an Artificial Mussel?", whyMission: "Separate live alerts from long-term collection",
    whyTitle: "It stays in contact with seawater, like a mussel",
    whyIntro: "A real mussel continually contacts and filters the water around it. An Artificial Mussel borrows that idea, using suitable material to collect chemical clues slowly in the sea.",
    buoyRoleTitle: "Monitoring buoy: live transmission", buoyRoleBody: "Sensors measure current conditions. Communications equipment sends data to the station and can alert staff to unusual readings.",
    musselRoleTitle: "Artificial Mussel: long-term collection", musselRoleBody: "It has no power, transmitter or alarm. It quietly stays in the sea for weeks, then laboratory instruments measure it after retrieval.",
    roleRule: "Remember: a buoy tells us what is happening now; an Artificial Mussel helps us look back at what accumulated over time.",
    whyAction: "Find the invisible clues",
    buoyMapLabel: "Live monitoring buoy", buoySending: "Sending data", musselQuietLabel: "Artificial Mussel: collecting, not transmitting",
    priorityTitle: "Lab results are ready! Rank sites from highest to lowest",
    priorityPrompt: "These results were measured in the laboratory after retrieval. They are not live alarms from the Artificial Mussels. Tap the highest result, then the next.",
    priorityProgress: "Ranked {n}/3", priorityCorrect: "Correct. Which site comes next?", priorityWrong: "Compare the signal blocks on the unranked sites and choose the highest one.",
    priorityDone: "All three sites are ranked. Now plan the next deployment without losing the comparison.", followupTitle: "Choose the next investigation plan"
  });

  const SIMPLIFY = [["藍","蓝"],["灣","湾"],["監","监"],["測","测"],["任","任"],["務","务"],["隻","只"],["會","会"],["記","记"],["錄","录"],["裡","里"],["幾","几"],["變","变"],["麼","么"],["這","这"],["個","个"],["觀","观"],["鏡","镜"],["線","线"],["體","体"],["鉛","铅"],["鎘","镉"],["過","过"],["時","时"],["響","响"],["組","组"],["裝","装"],["來","来"],["臺","台"],["膠","胶"],["護","护"],["蓋","盖"],["讓","让"],["進","进"],["環","环"],["發","发"],["選","选"],["標","标"],["記","记"],["開","开"],["學","学"],["圖","图"],["將","将"],["與","与"],["較","较"],["區","区"],["對","对"],["處","处"],["訊","讯"],["點","点"],["還","还"],["實","实"],["驗","验"],["結","结"],["論","论"],["轉","转"],["輪","轮"],["場","场"],["應","应"],["樣","样"],["檢","检"],["儀","仪"],["號","号"],["證","证"],["據","据"],["牆","墙"],["擇","择"],["貼","贴"],["發","发"],["現","现"],["單","单"],["獨","独"],["劃","划"],["繼","继"],["續","续"],["並","并"],["範","范"],["圍","围"],["達","达"],["執","执"],["際","际"],["準","准"],["確","确"],["報","报"],["電","电"],["覺","觉"],["離","离"],["從","从"],["聲","声"],["態","态"],["門","门"],["為","为"],["帶","带"],["啟","启"],["長","长"],["間","间"],["無","无"],["質","质"],["價","价"],["庫","库"],["屬","属"],["遊","游"],["戲","戏"],["內","内"],["專","专"],["業","业"],["壓","压"],["縮","缩"],["頁","页"],["終","终"],["調","调"],["查","查"],["寫","写"],["說","说"],["東","东"],["養","养"],["錯","错"],["潔","洁"],["況","况"],["準","准"],["備","备"],["門","门"],["稱","称"],["類","类"],["積","积"],["傷","伤"],["經","经"],["統","统"],["種","种"],["掃","扫"],["製","制"],["繁","繁"],["為","为"],["險","险"]];
  SIMPLIFY.push(["認","认"],["識","识"],["鈾","铀"],["鍶","锶"],["銫","铯"],["輻","辐"],["餘","余"],["儘","尽"],["憶","忆"],["穩","稳"],["獲","获"],["親","亲"],["幫","帮"],["決","决"],["語","语"],["師","师"],["驟","骤"],["顯","显"],["導","导"],["領","领"],["數","数"],["濁","浊"],["機","机"],["讀","读"],["檔","档"],["儲","储"],["寬","宽"],["羅","罗"],["據","据"],["別","别"],["動","动"],["話","话"],["粵","粤"],["約","约"],["鐘","钟"],["適","适"],["簡","简"],["閱","阅"],["歸","归"],["釘","钉"],["紙","纸"],["員","员"],["隨","随"],["碼","码"]);
  function simplify(value) {
    if (typeof value !== "string") return value;
    let output = value.replaceAll("甚麼", "什么").replaceAll("介面", "界面");
    for (const [from, to] of SIMPLIFY) output = output.replaceAll(from, to);
    return output;
  }
  function getCopy() {
    if (state.uiLocale === "en") return EN;
    if (state.uiLocale === "zh-Hans") return Object.fromEntries(Object.entries(HANT).map(([key, value]) => [key, simplify(value)]));
    return HANT;
  }
  function base(key) {
    const table = strings[state.uiLocale] || strings.en;
    return table[key] ?? strings.en[key] ?? key;
  }
  function freshState(settings = {}) {
    return {
      version: 10, scene: "HOME", history: [],
      uiLocale: settings.uiLocale || "zh-Hant", voiceLocale: settings.voiceLocale || "zh-HK", voiceMuted: Boolean(settings.voiceMuted), voiceRate: Number(settings.voiceRate) || 1,
      radioAnswered: false,
      lensFound: false, knowledgePage: 0, knowledgeVisited: [],
      buildStep: 0, componentFocus: "", componentVisited: [], deviceMark: "", flowRunning: false, flowDone: false,
      deployments: [], deploymentAnimating: "", thirdSite: "", week: 0, stormHandled: false, stormFeedback: "",
      labPhase: "sealed", batchPhase: "", results: [], evidencePlaced: [], lastEvidencePlaced: "", highestSelected: false,
      priorityOrder: [], decision: "", feedback: "", hint: ""
    };
  }
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem("artificial-mussel-preferences-v9"));
      return freshState(saved || {});
    } catch (_) { return freshState(); }
  }
  let state = loadState();
  function copy() { return getCopy(); }
  function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ uiLocale: state.uiLocale, voiceLocale: state.voiceLocale, voiceMuted: state.voiceMuted, voiceRate: state.voiceRate })); }
  function loc(id) { return locations.find(item => item.id === id); }
  function locName(id) { return loc(id)?.names[state.uiLocale] || id; }
  function format(text, vars = {}) { let out = text; for (const [key, value] of Object.entries(vars)) out = out.replaceAll(`{${key}}`, String(value)); return out; }
  function signalLevel(id) { return id === "RIV" ? 3 : id === "HAR" ? 2 : 1; }
  function signalText(level) { const c = copy(); return level === 3 ? c.signalHigh : level === 2 ? c.signalMedium : c.signalLow; }
  function currentSampleId() { return state.deployments[0] || "RIV"; }
  function knowledgeFiles() {
    const c = copy();
    return [
      { code:"Pb", title:c.filePbTitle, body:c.filePbDefinition, key:c.filePbKey, visual:"lead" },
      { code:"Hg", title:c.fileHgTitle, body:c.fileHgDefinition, key:c.fileHgKey, visual:"mercury" },
      { code:"Cd", title:c.fileCdTitle, body:c.fileCdDefinition, key:c.fileCdKey, visual:"cadmium" },
      { code:"☢", title:c.fileRadTitle, body:c.fileRadDefinition, key:c.fileRadKey, visual:"radioactive" }
    ];
  }

  function sceneMeta() {
    const c = copy();
    const map = {
      ALERT: [c.alertName, c.alertMission], WHY: [c.whyName, c.whyMission], LENS: [c.lensName, c.lensMission], BUILD: [c.buildName, c.buildMission], FLOW: [c.flowName, c.flowMission],
      DEPLOY: [c.deployName, c.deployMission], TIME: [c.timeName, c.timeMission], LAB: [c.labName, c.labMission], EVIDENCE: [c.evidenceName, c.evidenceMission],
      DECISION: [c.decisionName, c.decisionMission], COMPLETE: [c.completeName, c.completeMissionLabel]
    };
    return map[state.scene] || [c.title, c.subtitle];
  }
  function sampleCount() { return state.results.length; }
  function stageIndex() {
    const groups = [["ALERT","WHY","LENS"],["BUILD","FLOW"],["DEPLOY","TIME"],["LAB","EVIDENCE"],["DECISION","COMPLETE"]];
    return Math.max(0, groups.findIndex(group => group.includes(state.scene)));
  }

  function render() {
    const c = copy();
    document.documentElement.lang = state.uiLocale === "en" ? "en" : state.uiLocale;
    document.title = `${c.title} · ${sceneMeta()[0]}`;
    const home = state.scene === "HOME";
    app.innerHTML = `<div class="g3-shell ${home ? "is-home" : ""}">${home ? "" : renderHud()}<main id="game-screen" class="g3-screen scene-${state.scene.toLowerCase()}" tabindex="-1">${renderScene()}</main></div>`;
    document.getElementById("game-screen")?.focus({ preventScroll: true });
    syncNarrationGuard();
  }

  function renderHud() {
    const c = copy(); const [name, mission] = sceneMeta(); const currentStage = stageIndex();
    const stages = [c.stageKnow,c.stageBuild,c.stageMonitor,c.stageAnalyse,c.stageDecide];
    return `<header class="g3-hud"><div class="g3-brand"><span class="g3-logo">◎</span><div><strong>${c.title}</strong><small>${name}</small></div></div><div class="g3-center"><div class="g3-progress" aria-label="${c.progress}">${stages.map((label,index)=>{const done=index < currentStage || state.scene === "COMPLETE" && index === currentStage;return `<div class="${done ? "done" : index === currentStage ? "current" : ""}"><span>${done ? "✓" : index + 1}</span><strong>${label}</strong></div>`;}).join("")}</div><div class="g3-mission"><span>▣</span><div><small>${c.mission}</small><strong>${mission}</strong></div></div></div><div class="g3-samples" aria-label="${format(c.sampleProgress,{n:sampleCount()})}"><small>${format(c.sampleProgress,{n:sampleCount()})}</small><div>${[0,1,2].map(i => `<span class="${i < sampleCount() ? "filled" : ""}">${i < sampleCount() ? "✓" : i + 1}</span>`).join("")}</div></div><div class="g3-tools"><button data-action="home" aria-label="${c.returnHome}">⌂</button><button data-action="back" aria-label="${c.back}">←</button><button data-action="voice-toggle" aria-label="${state.voiceMuted ? c.soundOff : c.soundOn}">${state.voiceMuted ? "🔇" : "🔊"}</button><button data-action="voice-replay" aria-label="${c.replay}">↻</button></div></header>`;
  }

  function renderScene() {
    switch (state.scene) {
      case "HOME": return renderHome(); case "ALERT": return renderAlert(); case "WHY": return renderWhy(); case "LENS": return renderLens(); case "BUILD": return renderBuild();
      case "FLOW": return renderFlow(); case "DEPLOY": return renderDeploy(); case "TIME": return renderTime(); case "LAB": return renderLab();
      case "EVIDENCE": return renderEvidence(); case "DECISION": return renderDecision(); case "COMPLETE": return renderComplete(); default: return renderHome();
    }
  }
  function speechLine(key, text, tag = "p") { return `<${tag} class="speech-line" data-speech="${key}">${text}</${tag}>`; }
  function localeRadio(name, value, label, checked) { return `<label><input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}><span>${label}</span></label>`; }

  function renderHome() {
    const c = copy();
    return `<section class="g3-home"><img src="assets/blue-bay-mission.png" alt="Blue Bay"><div class="home-tint"></div><div class="home-ticket"><span class="role-sticker">⚙ ${c.role}</span><h1>${c.homeTitle}</h1><p>${c.homeLead}</p><div class="verb-route"><span><b>1</b>${c.stageKnow}</span><i>→</i><span><b>2</b>${c.stageBuild}</span><i>→</i><span><b>3</b>${c.stageMonitor}</span><i>→</i><span><b>4</b>${c.stageAnalyse}</span><i>→</i><span><b>5</b>${c.stageDecide}</span></div><div class="home-settings"><fieldset><legend>${c.uiLanguage}</legend><div>${localeRadio("ui-locale", "zh-Hant", c.traditional, state.uiLocale === "zh-Hant")}${localeRadio("ui-locale", "zh-Hans", c.simplified, state.uiLocale === "zh-Hans")}${localeRadio("ui-locale", "en", c.english, state.uiLocale === "en")}</div></fieldset><fieldset><legend>${c.voiceLanguage}</legend><div>${localeRadio("voice-locale", "zh-CN", c.mandarin, state.voiceLocale === "zh-CN")}${localeRadio("voice-locale", "zh-HK", c.cantonese, state.voiceLocale === "zh-HK")}${localeRadio("voice-locale", "en-US", c.voiceEnglish, state.voiceLocale === "en-US")}</div></fieldset><fieldset><legend>${c.voiceSpeed}</legend><div>${localeRadio("voice-rate", "0.8", c.speedSlow, state.voiceRate === .8)}${localeRadio("voice-rate", "1", c.speedNormal, state.voiceRate === 1)}${localeRadio("voice-rate", "1.2", c.speedFast, state.voiceRate === 1.2)}</div></fieldset></div><footer><small>${c.duration}</small><button class="game-button primary next-target" data-action="new-game">${c.start} →</button></footer></div></section>`;
  }

  function renderMentorBubble(speaker, lines, action = "") {
    return `<div class="mentor-wrap"><div class="mentor" aria-hidden="true"><span class="mentor-hair"></span><span class="mentor-face"><i class="eye left"></i><i class="eye right"></i><i class="mentor-mouth"></i></span><span class="mentor-body">◎</span></div><div class="speech-bubble"><strong>${speaker}</strong>${lines.map((line, index) => typeof line === "string" ? speechLine(index, line) : speechLine(line.key, line.text)).join("")}${action}</div></div>`;
  }

  function renderAlert() {
    const c = copy();
    const lines = state.radioAnswered ? [{key:"alert-1",text:c.alert1},{key:"alert-2",text:c.alert2},{key:"alert-3",text:c.alertQuestion}] : [{key:"incoming",text:c.alertIncoming}];
    const action = state.radioAnswered ? `<button class="game-button primary next-target" data-action="goto" data-scene="WHY" data-narration-lock>${c.alertContinue} →</button>` : `<button class="game-button primary next-target radio-answer" data-action="answer-radio">📻 ${c.answerRadio}</button>`;
    return `<section class="world-scene alert-world"><img src="assets/blue-bay-mission.png" alt="Blue Bay research station"><div class="world-shade"></div><div class="alert-beacon"><span>!</span><i></i><i></i></div>${renderMentorBubble(c.alertSpeaker, lines, action)}<div class="radio-reply">${c.alertReply}</div></section>`;
  }

  function renderWhy() {
    const c = copy();
    return `<section class="why-world"><div class="why-hero"><div class="real-mussel" aria-hidden="true"><span></span><i>≈</i></div><div class="why-device">${renderDevice(true,3)}</div></div><article class="why-card">${speechLine("why-title",c.whyTitle,"h1")}${speechLine("why-intro",c.whyIntro)}<div class="role-compare"><section class="role-tool buoy-role"><div class="buoy-graphic"><span>⌁</span><i></i><b>)))</b></div><div>${speechLine("buoy-title",c.buoyRoleTitle,"h2")}${speechLine("buoy-body",c.buoyRoleBody)}</div></section><section class="role-tool mussel-role"><div class="mussel-graphic">◎<small>···</small></div><div>${speechLine("mussel-title",c.musselRoleTitle,"h2")}${speechLine("mussel-body",c.musselRoleBody)}</div></section></div>${speechLine("role-rule",c.roleRule,"strong")}<button class="game-button primary next-target" data-action="goto" data-scene="LENS" data-narration-lock>${c.whyAction} →</button></article></section>`;
  }

  function renderLens() {
    const c = copy();
    if (!state.lensFound) {
      return `<section class="world-scene lens-world"><div class="lab-wall"></div><div class="sample-table"><div class="sample-glass"><span>${state.uiLocale === "en" ? "SEAWATER" : "海水樣本"}</span><i></i><i></i><i></i><i></i></div><button class="science-lens next-target" data-action="lens" data-lens aria-label="${c.lensAction}"><span></span></button></div>${renderMentorBubble("🔎",[c.lensHint])}<div class="touch-hint">☝ ${c.lensAction}</div></section>`;
    }
    const files = knowledgeFiles();
    const page = Math.max(0,Math.min(3,state.knowledgePage)); const file = files[page]; const complete = state.knowledgeVisited.length >= 4;
    const visual = `<div class="knowledge-visual ${file.visual}" aria-hidden="true"><span class="k-particles">••••</span><span class="k-plankton">✦</span><span class="k-fish small"><i></i></span><span class="k-fish large"><i></i></span><span class="k-shell"></span><span class="k-collector">★</span><span class="k-scanner">◎</span><b class="k-arrow">→</b></div>`;
    return `<section class="v6-knowledge"><div class="knowledge-sample"><div class="sample-glass revealed"><span>${state.uiLocale === "en" ? "SEAWATER" : "海水樣本"}</span><i></i><i></i><i></i><i></i></div><div class="science-lens found"><span></span></div><div class="knowledge-found">✓ ${c.lensFound}</div></div><article class="knowledge-card" data-feedback><header><div><small>${c.knowledgeTitle}</small>${speechLine("knowledge-title",file.title,"h2")}</div><span>${format(c.knowledgeProgress,{n:page+1})}</span></header>${speechLine("knowledge-body",file.body)}${visual}<div class="knowledge-key"><small>${c.knowledgeKey}</small>${speechLine("knowledge-key",file.key,"strong")}</div><div class="knowledge-footer"><button data-action="knowledge-prev" data-narration-lock ${page===0 ? "disabled" : ""} aria-label="${c.knowledgePrev}">←</button><div class="knowledge-dots">${files.map((_,index)=>`<i class="${index===page?"current":""} ${state.knowledgeVisited.includes(index)?"seen":""}"></i>`).join("")}<small>${format(c.knowledgeSeen,{n:state.knowledgeVisited.length})}</small></div>${page<3?`<button class="next-target" data-action="knowledge-next" data-narration-lock aria-label="${c.knowledgeNext}">→</button>`:`<span class="knowledge-end" aria-hidden="true">✓</span>`}</div><div class="metal-guard">⚠ ${c.metalGuard}</div>${complete ? `<div class="knowledge-complete">✓ ${c.knowledgeComplete}</div><button class="game-button primary next-target" data-action="goto" data-scene="BUILD" data-narration-lock>${c.toBuild} →</button>` : ""}</article></section>`;
  }

  function partCard(index, icon, title, help) {
    const c = copy(); const installed = state.buildStep > index; const current = state.buildStep === index;
    return `<button class="part-card ${installed ? "installed" : ""} ${current ? "current next-target" : ""}" data-action="install-part" data-part="${index}" draggable="${!installed}"><span>${installed ? "✓" : icon}</span><div><strong>${title}</strong><small>${help}</small></div><em>${installed ? c.installed : c.install}</em></button>`;
  }
  function renderDevice(large = false, forcedStep = null) {
    const displayStep = forcedStep ?? state.buildStep;
    const mark = state.deviceMark || ""; const interactive = state.scene === "BUILD" && state.buildStep >= 3;
    const hotspot = (id,label,klass) => { const seen=state.componentVisited.includes(id); return `<button class="component-hotspot ${klass} ${seen?"seen":"next-target"}" data-action="component-focus" data-component="${id}" aria-label="${label}">${seen?"✓":label}</button>`; };
    const collectorAction = interactive ? ` data-action="component-focus" data-component="collector" role="button" aria-label="${copy().componentCollector}"` : "";
    return `<div class="device-model ${large ? "large" : ""} step-${displayStep} ${interactive ? "interactive" : ""}"><div class="cap left"><i></i><i></i><i></i></div><div class="tube"><div class="gel"></div><div class="collector"${collectorAction}></div><span class="device-mark">${mark}</span></div><div class="cap right"><i></i><i></i><i></i></div>${interactive ? `${hotspot("cap","1","cap-hotspot")}${hotspot("tube","2","tube-hotspot")}${hotspot("water","3","water-hotspot")}${hotspot("collector","4","collector-hotspot")}` : ""}</div>`;
  }
  function renderBuild() {
    const c = copy(); const done = state.buildStep >= 3;
    const parts = { cap:[c.componentCap,c.componentCapHelp], tube:[c.componentTube,c.componentTubeHelp], water:[c.componentWater,c.componentWaterHelp], collector:[c.componentCollector,c.componentCollectorHelp] };
    const focused = parts[state.componentFocus]; const explored = state.componentVisited.length >= 4;
    return `<section class="workbench-world v5-build v6-build"><div class="pegboard"><span></span><span></span><span></span></div><div class="build-copy">${speechLine("build-lead",c.buildLead)}${state.hint ? `<div class="coach-hint" data-feedback>💡 ${state.hint}</div>` : ""}</div><div class="assembly-zone" data-drop="build"><div class="assembly-glow">${renderDevice(true)}</div>${done ? `<strong class="ready-label">✓ ${c.deviceReady}</strong><small class="explore-label ${explored?"complete":""}">${explored?c.componentExploreReady:c.componentExplorePrompt}</small>` : `<strong class="drop-label">${state.uiLocale === "en" ? "TAP OR DROP THE GLOWING PART" : "點擊或拖動發光部件"}</strong>`}</div><aside class="parts-tray">${speechLine("build-title",c.buildTitle,"h2")}${partCard(0,"●",c.partCollector,c.partCollectorHelp)}${partCard(1,"≈",c.partGel,c.partGelHelp)}${partCard(2,"•••",c.partCap,c.partCapHelp)}${done ? `<div class="component-progress"><span>${format(c.componentExploreProgress,{n:state.componentVisited.length})}</span>${[1,2,3,4].map((n,i)=>`<i class="${i<state.componentVisited.length?"seen":""}">${i<state.componentVisited.length?"✓":n}</i>`).join("")}</div><div class="component-guide ${focused?"has-focus":""}"><small>${focused?c.componentHint:c.exploreParts}</small><strong>${focused?focused[0]:c.componentExplorePrompt}</strong>${focused?`<p>${focused[1]}</p>`:""}</div>` : ""}</aside>${done && explored ? `<div class="mark-picker"><strong>${c.chooseMark}</strong><div><button data-action="choose-mark" data-mark="★" class="${!state.deviceMark ? "next-target" : ""}">★</button><button data-action="choose-mark" data-mark="≈">≈</button><button data-action="choose-mark" data-mark="🐚">🐚</button></div>${state.deviceMark ? `<p>${c.markChosen} ${state.deviceMark}</p><button class="game-button primary next-target" data-action="goto" data-scene="FLOW">${c.toFlow} →</button>` : ""}</div>` : ""}</section>`;
  }

  function renderFlow() {
    const c = copy();
    return `<section class="flow-world v6-flow ${state.flowRunning ? "running" : ""} ${state.flowDone ? "done" : ""}"><div class="tank"><div class="water-top"></div>${renderDevice(true)}<div class="flow-particles">${Array.from({length:14},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div><div class="captured-particles">${Array.from({length:12},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div><div class="fish one"></div><div class="fish two"></div><small class="scale-note">🔎 ${c.flowScale}</small></div><div class="flow-console">${speechLine("flow-title",c.flowTitle,"h2")}<button class="valve ${!state.flowRunning && !state.flowDone ? "next-target" : ""}" data-action="run-flow" data-narration-lock ${state.flowRunning || state.flowDone ? "disabled" : ""}><span>↻</span><strong>${state.flowRunning ? c.flowRunning : c.flowStart}</strong></button><div class="principle-path"><article class="${state.flowRunning || state.flowDone ? "on" : ""}"><b>1</b>${speechLine("flow-water",c.flowWater,"span")}</article><article class="${state.flowRunning || state.flowDone ? "on delay1" : ""}"><b>2</b>${speechLine("flow-capture",c.flowCapture,"span")}</article><article class="${state.flowDone ? "on" : ""}"><b>3</b>${speechLine("flow-wait",c.flowWait,"span")}</article><article class="${state.flowDone ? "on" : ""}"><b>4</b>${speechLine("flow-power",c.flowNoPower,"span")}</article></div>${state.flowDone ? `<div class="success-banner" data-feedback>✓ ${c.flowDone}</div><button class="game-button primary next-target" data-action="goto" data-scene="DEPLOY">${c.toMap} →</button>` : ""}</div></section>`;
  }

  function renderMapSites(mode = "deploy") {
    const c = copy(); const deployed = state.deployments;
    const expectedIndex = deployed.length;
    const firstUnplaced = state.results.find(result => !state.evidencePlaced.includes(result.id))?.id;
    const routePath = (klass,d) => `<path class="${klass}" d="${d}"/>`;
    const routes = `${deployed.includes("RIV") || state.deploymentAnimating === "RIV" ? routePath(state.deploymentAnimating === "RIV" ? "active" : "complete","M130 110 Q230 65 350 205") : ""}${deployed.includes("RES") || state.deploymentAnimating === "RES" ? routePath(state.deploymentAnimating === "RES" ? "active" : "complete","M350 205 Q570 65 790 165") : ""}${deployed.some(id=>["HAR","OFF"].includes(id)) || ["HAR","OFF"].includes(state.deploymentAnimating) ? routePath(state.deploymentAnimating ? "active" : "complete",(state.deploymentAnimating || deployed.find(id=>["HAR","OFF"].includes(id))) === "HAR" ? "M790 165 Q900 390 735 550" : "M790 165 Q485 395 155 550") : ""}`;
    const leg = expectedIndex + 1; const routeLabel = leg === 1 ? c.routeFromStation : leg === 2 ? c.routeFromRiver : c.routeFromReserve;
    const telemetry = `<svg class="telemetry-line" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true"><path d="M282 255 Q205 155 135 110"/></svg><div class="monitoring-buoy"><span>⌁</span><i></i><strong>${c.buoyMapLabel}</strong><small>${c.buoySending}</small></div><div class="quiet-monitor"><span>◎</span><small>${c.musselQuietLabel}</small></div>`;
    return `<div class="mission-map" data-map><div class="map-land north"></div><div class="map-land south"></div><div class="map-river"></div><svg class="survey-routes" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">${routes}</svg>${telemetry}<span class="map-current m1">›</span><span class="map-current m2">›</span>${["RIV","RES","HAR","OFF"].map(id => {
      const isDone = deployed.includes(id); const expected = expectedIndex === 0 ? id === "RIV" : expectedIndex === 1 ? id === "RES" : expectedIndex === 2 ? ["HAR","OFF"].includes(id) : false;
      const result = state.results.find(item => item.id === id); const placed = state.evidencePlaced.includes(id);
      const dropTarget = mode === "evidence" && id === firstUnplaced;
      return `<button class="map-site site-${id.toLowerCase()} ${isDone ? "deployed" : ""} ${expected && mode === "deploy" ? "target next-target" : ""} ${placed ? "placed" : ""} ${dropTarget ? "drop-target" : ""} ${state.lastEvidencePlaced===id ? "just-pinned" : ""}" data-action="${mode === "deploy" ? "deploy-site" : "evidence-site"}" data-site="${id}" data-drop="${mode}" ${mode === "deploy" && (!expected || state.deploymentAnimating) ? "disabled" : ""}><span>${placed ? "📌" : isDone ? "✓" : loc(id)?.icon || "○"}</span><div><strong>${locName(id)}</strong>${mode === "deploy" && expected ? `<small>AM-0${expectedIndex+1}</small>` : ""}${result && placed ? `<small>${c.evidenceFiled} · ${signalText(result.level)}</small>` : ""}</div></button>`;
    }).join("")}${state.deploymentAnimating && mode === "deploy" ? `<div class="deployment-animation leg-${leg} to-${state.deploymentAnimating.toLowerCase()}"><div class="boat-unit"><span class="deploy-boat">🚤</span><i class="deploy-rope"></i><b>${state.deviceMark || "◎"}</b><i class="deploy-splash">◌</i></div><em><small>${routeLabel}</small>${c.boatLaunching}</em></div>` : ""}<div class="research-station"><span>⚓</span><strong>${locName("LAB")}</strong><small>${state.uiLocale==="en"?"RESEARCH DOCK":"研究站碼頭"}</small></div></div>`;
  }
  function renderDeploy() {
    const c = copy(); const next = state.deployments.length; const prompt = next === 0 ? c.deployRiver : next === 1 ? c.deployReserve : next === 2 ? c.deployThird : c.allDeployed;
    return `<section class="deploy-world">${renderMapSites("deploy")}<aside class="deploy-drawer"><h2>${c.deployTitle}</h2>${speechLine("deploy",prompt)}<div class="auto-deploy-note"><span>${state.deviceMark || "◎"}</span><div><small>${next < 3 ? c.autoDevice : c.allDeployed}</small><strong>${next < 3 ? `AM-0${next + 1}` : "✓ 3/3"}</strong><em>${next < 3 ? c.chooseSite : ""}</em></div></div><div class="device-crate status-only">${[0,1,2].map(i => `<div class="crate-device ${i < next ? "used" : i === next ? "current" : "locked"}"><span>${i < next ? "✓" : state.deviceMark || "◎"}</span><strong>AM-0${i + 1}</strong><small>${i < next ? c.deployed : i === next ? c.toolbox : "🔒"}</small></div>`).join("")}</div>${state.hint ? `<div class="coach-hint" data-feedback>💡 ${state.hint}</div>` : ""}${next >= 3 ? `<button class="game-button primary next-target" data-action="goto" data-scene="TIME">${c.toTime} →</button>` : ""}</aside></section>`;
  }

  function renderTime() {
    const c = copy(); const storm = state.week >= 4 && !state.stormHandled;
    const observation = c[`timeObservation${state.week}`] || c.timeObservation8;
    const dots = Math.min(12, Math.round(state.week * 1.5));
    return `<section class="time-world v6-time ${storm ? "storm" : ""} week-${state.week}"><div class="time-scene"><div class="sky-cycle"><span class="sun">☀</span><span class="moon">☾</span>${storm ? `<div class="rain"></div>` : ""}</div><div class="sea-cycle">${renderDevice(false)}<div class="time-clues">${Array.from({length:12},(_,i)=>`<i class="${i < dots ? "visible" : ""}" style="--i:${i}"></i>`).join("")}</div><div class="fish one"></div><div class="fish two"></div></div></div><aside class="time-dashboard"><div class="time-wheel" style="--progress:${state.week / 8}"><button class="${!storm && state.week < 8 ? "next-target" : ""}" data-action="advance-week" ${storm || state.week >= 8 ? "disabled" : ""}><span>${state.week}</span><small>/ 8</small></button><strong>${format(c.week,{n:state.week})}</strong><em>${c.weekAction}</em></div><div class="week-observation"><small>${c.clueBoardTitle}</small><div class="clue-meter"><b>${c.clueCount}</b><span>${Array.from({length:12},(_,i)=>`<i class="${i<dots?"on":""}"></i>`).join("")}</span><strong>${dots}/12</strong></div>${speechLine("time",observation)}</div>${storm ? `<div class="field-note"><span>🌧</span>${speechLine("storm-title",c.stormTitle,"h2")}${speechLine("storm-question",c.stormChoiceHint)}<div class="storm-options next-target-group"><button data-action="storm-choice" data-value="early"><b>A</b>${c.stormEarly}</button><button data-action="storm-choice" data-value="move"><b>B</b>${c.stormMove}</button><button data-action="storm-choice" data-value="record"><b>C</b>${c.stormKeep}</button></div>${state.stormFeedback ? `<div class="coach-hint ${state.stormFeedback===c.stormGood?"good":""}" data-feedback>${state.stormFeedback}</div>` : ""}</div>` : ""}${state.week >= 8 && state.stormHandled ? `<div class="weeks-complete"><strong>✓ ${c.weeksDone}</strong><button class="game-button primary next-target" data-action="goto" data-scene="LAB">🚤 ${c.retrieve}</button></div>` : ""}</aside></section>`;
  }

  function renderSignalBlocks(level) { return `<div class="signal-blocks">${[1,2,3].map(i => `<i class="${i <= level ? "on" : ""}"></i>`).join("")}</div>`; }
  function renderLab() {
    const c = copy(); const id = currentSampleId(); const level = signalLevel(id); const result = state.results.find(item => item.id === id); const batchDone = state.results.length >= 3;
    return `<section class="lab-world v6-lab"><div class="sample-rack">${state.deployments.map((site,index)=>{const done=state.results.some(item=>item.id===site);const active=index===0&&!result;return `<div class="rack-item ${active ? "current" : ""} ${done ? "done" : ""}"><span>${done ? "✓" : loc(site)?.icon}</span><strong>${locName(site)}</strong></div>`;}).join("")}</div><div class="lab-workspace"><div class="lab-bench"><div class="bench-label">${state.uiLocale==="en"?"SAMPLE WORKBENCH":"樣本工作台"}</div><div class="lab-device phase-${state.labPhase}"><button class="lab-cap ${state.labPhase === "sealed" ? "next-target" : ""}" data-action="lab-open" ${state.labPhase !== "sealed" ? "disabled" : ""}>•••</button><div class="lab-tube"><button class="lab-collector ${state.labPhase === "opened" ? "next-target" : ""}" data-action="lab-extract" ${state.labPhase !== "opened" ? "disabled" : ""}>●●●</button></div></div><div class="transfer-arrow">→</div><button class="analyser ${state.labPhase} ${state.labPhase === "extracted" ? "next-target" : ""}" data-action="lab-insert" ${state.labPhase !== "extracted" ? "disabled" : ""}><span class="scanner-line"></span><strong>${state.labPhase === "scanning" ? c.labScanning : c.labStepInsert}</strong></button>${state.batchPhase ? `<div class="batch-machine ${batchDone ? "done" : "running"}"><span class="batch-scan"></span><strong>${batchDone ? c.allResults : c.batchRunning}</strong><div>${state.deployments.slice(1).map((site,index)=>`<article class="${state.results.some(item=>item.id===site)?"done":""}"><span>${state.results.some(item=>item.id===site)?"✓":"…"}</span><b>${locName(site)}</b><small>${index===0?c.batchOne:c.batchTwo}</small></article>`).join("")}</div></div>` : ""}</div><aside class="lab-instructions">${speechLine("lab",c.labTitle,"h2")}<p class="lab-coach">${c.labCoach}</p><ol><li class="${["opened","extracted","scanning","result"].includes(state.labPhase) ? "done" : "current"}"><span>1</span>${c.labStepOpen}</li><li class="${["extracted","scanning","result"].includes(state.labPhase) ? "done" : state.labPhase === "opened" ? "current" : ""}"><span>2</span>${c.labStepExtract}</li><li class="${["result"].includes(state.labPhase) ? "done" : ["extracted","scanning"].includes(state.labPhase) ? "current" : ""}"><span>3</span>${c.labStepInsert}</li></ol>${state.labPhase === "result" || result ? `<div class="printed-result"><small>${c.labResult}</small><strong>${locName(id)}</strong>${renderSignalBlocks(level)}<b>${signalText(level)}</b></div><div class="analysis-summary"><strong>${c.batchTitle}</strong><p>${c.batchExplain}</p></div>${!state.batchPhase ? `<button class="game-button primary next-target" data-action="batch-analysis">${c.batchAction} →</button>` : batchDone ? `<div class="success-banner">✓ ${c.allResults}</div><button class="game-button primary next-target" data-action="goto" data-scene="EVIDENCE">${c.toEvidence} →</button>` : `<div class="batch-wait">⏳ ${c.batchRunning}</div>`}` : ""}</aside></div></section>`;
  }

  function evidenceCard(item) {
    const c = copy(); const placed = state.evidencePlaced.includes(item.id);
    const firstUnplaced = state.results.find(result => !state.evidencePlaced.includes(result.id))?.id;
    return `<button class="evidence-file ${placed ? "placed" : ""} ${!placed && firstUnplaced === item.id ? "next-target" : ""}" data-action="place-evidence" data-site="${item.id}" draggable="${!placed}" ${placed?"disabled":""}><span class="file-clip"></span><header><small>${c.evidenceFile}</small><b>AM-${item.id}</b></header><div class="file-place"><span>${loc(item.id)?.icon}</span><strong>${locName(item.id)}</strong></div><div class="file-result"><small>${c.evidenceStamp}</small>${renderSignalBlocks(item.level)}<b>${signalText(item.level)}</b></div><i>${placed?"✓":"↗"}</i></button>`;
  }
  function renderEvidence() {
    const c = copy(); const allPlaced = state.evidencePlaced.length >= 3;
    return `<section class="evidence-world v6-evidence"><div class="evidence-map-wrap">${renderMapSites("evidence")}${speechLine("evidence",allPlaced ? c.chooseHighest : c.evidenceTitle,"h2")}</div><aside class="evidence-tray ${allPlaced ? "is-ready" : ""} ${state.highestSelected ? "is-solved" : ""}"><div class="case-header"><span>🗂</span><div><small>${state.uiLocale==="en"?"CASE FILES":"調查檔案盤"}</small><p>${allPlaced ? c.evidenceReady : c.placeHint}</p></div></div><div class="signal-legend">▥ ${c.signalLegend}</div><div class="evidence-cards">${state.results.map(evidenceCard).join("")}</div>${allPlaced ? `<div class="compare-callout">${c.chooseHighest}</div><div class="magnet-choice next-target-group">${state.results.map(item => `<button data-action="select-highest" data-site="${item.id}" class="${state.highestSelected && item.id === "RIV" ? "chosen" : ""}"><span>${loc(item.id)?.icon}</span>${locName(item.id)}</button>`).join("")}</div>` : ""}${state.hint ? `<div class="coach-hint ${state.highestSelected?"good":""}" data-feedback>💡 ${state.hint}</div>` : ""}${state.highestSelected ? `<div class="known-unknown"><article><span>✓</span><div><small>${c.known}</small><strong>${c.knownText}</strong></div></article><article><span>?</span><div><small>${c.unknown}</small><strong>${c.unknownText}</strong></div></article></div><button class="game-button primary next-target" data-action="goto" data-scene="DECISION">${c.toDecision} →</button>` : ""}</aside></section>`;
  }

  function renderDecision() {
    const c = copy(); const recommended = state.thirdSite === "HAR" ? c.decisionMoreHarbor : c.decisionMoreOffshore;
    const ranked = state.priorityOrder || []; const rankingDone = ranked.length >= state.results.length;
    const orderedResults = [...state.results].sort((a,b) => b.level - a.level || a.id.localeCompare(b.id));
    const resultButtons = orderedResults.map((item,index) => {
      const selectedIndex = ranked.indexOf(item.id); const selected = selectedIndex >= 0;
      return `<button class="priority-result ${selected ? "ranked" : ""}" style="--pop:${index}" data-action="choose-priority" data-site="${item.id}" ${selected ? "disabled" : ""}><span class="priority-rank">${selected ? selectedIndex + 1 : "!"}</span><span class="priority-icon">${loc(item.id)?.icon}</span><strong>${locName(item.id)}</strong>${renderSignalBlocks(item.level)}<small>${signalText(item.level)}</small></button>`;
    }).join("");
    const rankingPanel = `<div class="priority-game"><div class="priority-radar"><div class="radar-ring r1"></div><div class="radar-ring r2"></div><div class="radar-sweep"></div>${resultButtons}</div><div class="priority-copy">${speechLine("priority-title",c.priorityTitle,"h2")}${speechLine("priority-prompt",c.priorityPrompt)}<div class="priority-progress">${format(c.priorityProgress,{n:ranked.length})}<span>${[0,1,2].map(i=>`<i class="${i<ranked.length?"done":""}">${i<ranked.length?"✓":i+1}</i>`).join("")}</span></div>${state.feedback ? `<div class="coach-hint ${state.feedback === c.priorityWrong ? "" : "good"}" data-feedback>${state.feedback}</div>` : ""}</div></div>`;
    const planPanel = `<div class="evidence-board priority-summary"><h2>${c.priorityDone}</h2><div class="ranked-results">${ranked.map((id,index)=>{const item=state.results.find(result=>result.id===id);return `<article><b>${index+1}</b><span>${loc(id)?.icon}</span><strong>${locName(id)}</strong>${renderSignalBlocks(item?.level||1)}<small>${signalText(item?.level||1)}</small></article>`;}).join("")}</div><div class="known-unknown"><article><span>✓</span><div><small>${c.known}</small><strong>${c.knownText}</strong></div></article><article><span>?</span><div><small>${c.unknown}</small><strong>${c.unknownText}</strong></div></article></div></div><div class="plan-cards"><div class="plan-prompt speech-line" data-speech="plan">${c.followupTitle}</div><div class="plan-choice-group next-target-group"><button data-action="choose-plan" data-value="declare" class="${state.decision==="declare"?"selected wrong":""}"><span>A</span><strong>${c.decisionDeclare}</strong></button><button data-action="choose-plan" data-value="more" class="${state.decision==="more"?"selected good":""}"><span>B</span><strong>${recommended}</strong></button><button data-action="choose-plan" data-value="stop" class="${state.decision==="stop"?"selected wrong":""}"><span>C</span><strong>${c.decisionStop}</strong></button></div>${state.feedback ? `<div class="coach-hint ${state.decision === "more" ? "good" : ""}" data-feedback>${state.feedback}</div>` : ""}${state.decision === "more" ? `<button class="game-button primary next-target" data-action="goto" data-scene="COMPLETE">${c.completeMission} →</button>` : ""}</div>`;
    return `<section class="decision-world v6-decision ${rankingDone ? "ranking-done" : "ranking-active"}">${rankingDone ? planPanel : rankingPanel}</section>`;
  }

  function renderComplete() {
    const c = copy();
    return `<section class="complete-world v6-complete"><div class="real-device-photo"><div class="photo-frame"><img src="assets/artificial-mussel-real.jpg" alt="${c.realPhoto}"><span class="photo-callout cap-callout">${c.photoCap}</span><span class="photo-callout tube-callout">${c.photoTube}</span><span class="photo-callout collector-callout">${c.photoCollector}</span></div><b>${c.realPhoto}</b></div><div class="mission-complete"><span class="medal">★ ${c.completeMissionLabel}</span>${speechLine("complete-title",c.completeTitle,"h1")}<div class="player-report"><small>${c.playerSpeaking}</small>${speechLine("complete-lead",c.completeLead,"strong")}</div><div class="takeaways"><article><span>1</span>${c.takeaway1}</article><article><span>2</span>${c.takeaway2}</article><article><span>3</span>${c.takeaway3}</article><article><span>4</span>${c.takeaway4}</article></div><div class="complete-actions"><button class="game-button secondary" data-action="open-science">${c.scienceBook}</button><button class="game-button primary" data-action="restart">${c.playAgain}</button></div></div></section>`;
  }

  function narration() {
    const c = copy();
    if (state.scene === "ALERT") return state.radioAnswered ? [{key:"alert-1",text:c.alert1},{key:"alert-2",text:c.alert2},{key:"alert-3",text:c.alertQuestion}] : [];
    if (state.scene === "WHY") return [{key:"why-title",text:c.whyTitle},{key:"why-intro",text:c.whyIntro},{key:"buoy-title",text:c.buoyRoleTitle},{key:"buoy-body",text:c.buoyRoleBody},{key:"mussel-title",text:c.musselRoleTitle},{key:"mussel-body",text:c.musselRoleBody},{key:"role-rule",text:c.roleRule}];
    if (state.scene === "LENS") {
      if (!state.lensFound) return [{key:0,text:c.lensHint}];
      const file = knowledgeFiles()[Math.max(0,Math.min(3,state.knowledgePage))];
      return [{key:"knowledge-title",text:file.title},{key:"knowledge-body",text:file.body},{key:"knowledge-key",text:file.key}];
    }
    if (state.scene === "BUILD") return [{key:"build-title",text:c.buildTitle},{key:"build-lead",text:c.buildLead}];
    if (state.scene === "FLOW") return state.flowDone ? [] : [{key:"flow-title",text:c.flowTitle},{key:"flow-water",text:c.flowWater},{key:"flow-capture",text:c.flowCapture},{key:"flow-wait",text:c.flowWait},{key:"flow-power",text:c.flowNoPower}];
    if (state.scene === "DEPLOY") return [{key:"deploy",text:state.deployments.length === 0 ? c.deployRiver : state.deployments.length === 1 ? c.deployReserve : state.deployments.length === 2 ? c.deployThird : c.allDeployed}];
    if (state.scene === "TIME") {
      if (state.week >= 4 && !state.stormHandled) return [{key:"storm-title",text:c.stormTitle},{key:"storm-question",text:c.stormChoiceHint}];
      return [{key:"time",text:c[`timeObservation${state.week}`] || c.timeObservation8}];
    }
    if (state.scene === "LAB") return [{key:"lab",text:c.labTitle}];
    if (state.scene === "EVIDENCE") return [{key:"evidence",text:state.evidencePlaced.length >= 3 ? c.chooseHighest : c.evidenceTitle}];
    if (state.scene === "DECISION") return state.priorityOrder.length >= state.results.length ? [{key:"plan",text:c.followupTitle}] : [{key:"priority-title",text:c.priorityTitle},{key:"priority-prompt",text:c.priorityPrompt}];
    if (state.scene === "COMPLETE") return [{key:"complete-title",text:c.completeTitle},{key:"complete-lead",text:c.completeLead}];
    return [];
  }
  function clearSpeech() { document.querySelectorAll(".is-speaking").forEach(el => el.classList.remove("is-speaking")); }
  function syncNarrationGuard() {
    const shell = document.querySelector(".g3-shell"); if (!shell) return;
    shell.classList.toggle("narration-active",narrationActive);
    document.querySelectorAll("button[data-action]").forEach(button => {
      const exempt = ["voice-toggle","voice-replay","home","back","skip-narration"].includes(button.dataset.action);
      if (narrationActive && !exempt) {
        if (!button.disabled) button.dataset.narrationDisabled = "true";
        button.disabled = true;
      } else if (button.dataset.narrationDisabled === "true") {
        button.disabled = false; delete button.dataset.narrationDisabled;
      }
    });
    document.querySelector(".speech-status")?.remove();
    if (!narrationActive) return;
    const status = document.createElement("div"); status.className = "speech-status";
    status.innerHTML = `<span><i></i>${copy().speakingNow}</span>${speechCanSkip ? `<button data-action="skip-narration">${copy().skipSpeech}</button>` : ""}`;
    shell.append(status);
  }
  function setNarrationGuard(active) {
    narrationActive = active; speechCanSkip = false;
    if (speechSkipTimer) clearTimeout(speechSkipTimer);
    speechSkipTimer = null; syncNarrationGuard();
    if (active) speechSkipTimer = setTimeout(() => { if (!narrationActive) return; speechCanSkip = true; syncNarrationGuard(); },2000);
  }
  function cancelSpeech(unlock = true) {
    speechRun += 1;
    if (speechFallbackTimer) clearTimeout(speechFallbackTimer);
    speechFallbackTimer = null;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    clearSpeech();
    if (unlock) setNarrationGuard(false);
  }
  function rememberSpeechVoices() {
    if (!("speechSynthesis" in window)) return [];
    const available = speechSynthesis.getVoices();
    if (available.length) speechVoices = available;
    return speechVoices;
  }
  function pickSpeechVoice(voices, locale) {
    const requested = locale.toLowerCase();
    const lang = voice => (voice.lang || "").toLowerCase().replace("_","-");
    const name = voice => (voice.name || "").toLowerCase();
    // Cantonese must never fall back to a generic zh-* voice: on iPad that is
    // commonly Mandarin. Some engines label Cantonese as yue-HK instead.
    if (requested === "zh-hk") {
      return voices.find(voice => /^yue(?:-|$)/.test(lang(voice))) ||
        voices.find(voice => /cantonese|粵語|粤语|sin[- ]?ji|hiumaan|hiugaai/.test(name(voice))) ||
        null;
    }
    const exact = voices.find(voice => lang(voice) === requested);
    if (exact) return exact;
    if (requested === "zh-cn") {
      return voices.find(voice => /^(?:cmn-cn|zh-sg)$/.test(lang(voice))) ||
        voices.find(voice => /mandarin|普通話|普通话|ting[- ]?ting/.test(name(voice))) ||
        voices.find(voice => /^zh(?:-|$)/.test(lang(voice))) ||
        null;
    }
    if (requested.startsWith("en-")) return voices.find(voice => /^en(?:-|$)/.test(lang(voice))) || null;
    return voices.find(voice => lang(voice).split("-")[0] === requested.split("-")[0]) || null;
  }
  function waitForSpeechVoices(locale) {
    const current = rememberSpeechVoices();
    if (pickSpeechVoice(current,locale)) return Promise.resolve(current);
    return new Promise(resolve => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        speechSynthesis.removeEventListener("voiceschanged",onVoicesChanged);
        resolve(rememberSpeechVoices());
      };
      const onVoicesChanged = () => {
        const available = rememberSpeechVoices();
        if (available.length && (pickSpeechVoice(available,locale) || locale.toLowerCase() !== "zh-hk")) finish();
      };
      speechSynthesis.addEventListener("voiceschanged",onVoicesChanged);
      setTimeout(finish,1200);
    });
  }
  async function speak(chunks = narration(), feedback = false) {
    cancelSpeech(true); const run = speechRun;
    const segments = chunks.map((chunk,index) => typeof chunk === "string" ? {key:index,text:chunk} : chunk).filter(segment => segment?.text);
    if (!("speechSynthesis" in window) || state.voiceMuted || !segments.length) return;
    if (!feedback) setNarrationGuard(true);
    const requestedLocale = state.voiceLocale;
    const voices = await waitForSpeechVoices(requestedLocale);
    if (run !== speechRun || state.voiceMuted) { if (!feedback) setNarrationGuard(false); return; }
    const selectedVoice = pickSpeechVoice(voices,requestedLocale);
    if (requestedLocale.toLowerCase() === "zh-hk" && !selectedVoice) {
      setNarrationGuard(false);
      const notice = document.createElement("div"); notice.className = "voice-notice"; notice.textContent = copy().voiceUnavailable;
      document.querySelector(".g3-shell")?.append(notice); setTimeout(() => notice.remove(),4000);
      return;
    }
    let index = 0;
    const next = () => {
      if (run !== speechRun || index >= segments.length) { clearSpeech(); if (!feedback) setNarrationGuard(false); return; }
      clearSpeech();
      const segment = segments[index];
      const target = feedback ? document.querySelector("[data-feedback]") : document.querySelector(`[data-speech="${segment.key}"]`);
      target?.classList.add("is-speaking");
      const u = new SpeechSynthesisUtterance(segment.text); u.lang = selectedVoice?.lang || requestedLocale; u.rate = state.voiceRate;
      u.voice = selectedVoice;
      let finished = false;
      const finish = () => { if (finished) return; finished = true; if (speechFallbackTimer) clearTimeout(speechFallbackTimer); speechFallbackTimer = null; index += 1; next(); };
      u.onend = u.onerror = finish;
      speechFallbackTimer = setTimeout(finish,Math.min(18000,Math.max(5500,segment.text.length * 190)));
      try { speechSynthesis.speak(u); } catch (_) { finish(); }
    };
    next();
  }
  function speakFeedback(text) { speak([text], true); }
  function go(scene, record = true) { if (!SCENES.includes(scene)) return; cancelSpeech(true); if (record && state.scene !== scene) state.history = [...state.history,state.scene].slice(-20); state.scene = scene; state.hint = ""; state.feedback = ""; persist(); render(); setTimeout(() => speak(),100); }
  function back() { cancelSpeech(true); const history = [...state.history]; const previous = history.pop() || "HOME"; state.history = history; state.scene = previous; persist(); render(); }
  function installPart(index) {
    const c = copy();
    if (index !== state.buildStep) { state.hint = c.wrongPart; persist(); render(); speakFeedback(state.hint); return; }
    state.buildStep += 1; state.hint = ""; persist(); render();
  }
  function deployTo(site) {
    const c = copy(); const index = state.deployments.length;
    if (state.deploymentAnimating) return;
    const valid = index === 0 ? site === "RIV" : index === 1 ? site === "RES" : index === 2 ? ["HAR","OFF"].includes(site) : false;
    if (!valid) { state.hint = c.wrongSite; persist(); render(); speakFeedback(state.hint); return; }
    state.deploymentAnimating = site; state.hint = ""; render();
    timer = setTimeout(() => { state.deployments.push(site); if (index === 2) state.thirdSite = site; state.deploymentAnimating = ""; persist(); render(); speakFeedback(`${c.deployed}：${locName(site)}`); },3000);
  }
  function startScan() {
    if (state.labPhase !== "extracted") return;
    state.labPhase = "scanning"; persist(); render();
    timer = setTimeout(() => { const id = currentSampleId(); if (!state.results.some(item => item.id === id)) state.results.push({id,level:signalLevel(id)}); state.labPhase = "result"; persist(); render(); speakFeedback(copy().labResult); },1800);
  }
  function startBatchAnalysis() {
    if (state.results.length !== 1 || state.batchPhase) return;
    const remaining = state.deployments.slice(1); state.batchPhase = "running"; render();
    timer = setTimeout(() => {
      const first = remaining[0]; if (first && !state.results.some(item => item.id === first)) state.results.push({ id:first, level:signalLevel(first) }); render();
      timer = setTimeout(() => {
        const second = remaining[1]; if (second && !state.results.some(item => item.id === second)) state.results.push({ id:second, level:signalLevel(second) }); state.batchPhase = "done"; render(); speakFeedback(copy().allResults);
      },1200);
    },1200);
  }
  function placeEvidence(site) {
    if (!site || state.evidencePlaced.includes(site)) return;
    state.evidencePlaced.push(site); state.lastEvidencePlaced = site; persist(); render();
    timer = setTimeout(() => { state.lastEvidencePlaced = ""; render(); },900);
  }
  function openScience() {
    const c = copy(); scienceDialog.innerHTML = `<header><span>📖</span><div><small>${c.realPhoto}</small><h2>${c.scienceTitle}</h2></div><button data-action="close-science" aria-label="Close">×</button></header><div class="science-content"><img src="assets/artificial-mussel-structure.jpg" alt="Artificial Mussel structure"><div><p>${c.scienceBody}</p><div class="science-note metal-note">${c.scienceMetal}</div><div class="science-note radio-note">☢ ${c.scienceRadio}</div><div class="science-note">${c.scienceBoundary}</div></div></div>`; scienceDialog.showModal();
  }

  app.addEventListener("change", event => {
    if (event.target.name === "ui-locale") { state.uiLocale = event.target.value; persist(); render(); }
    if (event.target.name === "voice-locale") { state.voiceLocale = event.target.value; persist(); }
    if (event.target.name === "voice-rate") { state.voiceRate = Number(event.target.value) || 1; persist(); }
  });
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]"); if (!button || button.disabled) return;
    if (Date.now() < suppressClickUntil && button.dataset.action === "place-evidence") { event.preventDefault(); return; }
    const action = button.dataset.action; const c = copy();
    if (action === "new-game") { cancelSpeech(true); state = freshState({uiLocale:state.uiLocale,voiceLocale:state.voiceLocale,voiceMuted:state.voiceMuted,voiceRate:state.voiceRate}); state.history=["HOME"]; state.scene="ALERT"; persist(); render(); }
    if (action === "home") { cancelSpeech(true); state = freshState({uiLocale:state.uiLocale,voiceLocale:state.voiceLocale,voiceMuted:state.voiceMuted,voiceRate:state.voiceRate}); persist(); render(); }
    if (action === "goto") go(button.dataset.scene);
    if (action === "back") back();
    if (action === "answer-radio") { state.radioAnswered=true;persist();render();setTimeout(()=>speak(),100); }
    if (action === "skip-narration") cancelSpeech(true);
    if (action === "voice-toggle") { state.voiceMuted=!state.voiceMuted; persist(); cancelSpeech(true); render(); if(!state.voiceMuted) speak(); }
    if (action === "voice-replay") speak();
    if (action === "lens" && !state.lensFound && !lensDrag) { state.lensFound=true; state.knowledgePage=0; state.knowledgeVisited=[0]; persist(); render(); speak(); }
    if (action === "knowledge-next") { state.knowledgePage=Math.min(3,state.knowledgePage+1);if(!state.knowledgeVisited.includes(state.knowledgePage))state.knowledgeVisited.push(state.knowledgePage);persist();render();speak(); }
    if (action === "knowledge-prev") { state.knowledgePage=Math.max(0,state.knowledgePage-1);persist();render();speak(); }
    if (action === "install-part") installPart(Number(button.dataset.part));
    if (action === "component-focus") { const id=button.dataset.component;state.componentFocus=id;if(!state.componentVisited.includes(id))state.componentVisited.push(id);persist();render(); }
    if (action === "choose-mark") { state.deviceMark=button.dataset.mark; persist(); render(); }
    if (action === "run-flow") { state.flowRunning=true; persist(); render(); timer=setTimeout(()=>{state.flowRunning=false;state.flowDone=true;persist();render();speakFeedback(copy().flowDone);},3200); }
    if (action === "deploy-site") deployTo(button.dataset.site);
    if (action === "advance-week") { state.week=Math.min(8,state.week+2); persist(); render(); }
    if (action === "storm-choice") { const value=button.dataset.value;if(value==="record"){state.stormHandled=true;state.stormFeedback=c.stormGood;}else if(value==="early"){state.stormFeedback=c.stormEarlyFeedback;}else{state.stormFeedback=c.stormMoveFeedback;}persist();render();speakFeedback(state.stormFeedback); }
    if (action === "lab-open" && state.labPhase === "sealed") { state.labPhase="opened";persist();render(); }
    if (action === "lab-extract" && state.labPhase === "opened") { state.labPhase="extracted";persist();render(); }
    if (action === "lab-insert") startScan();
    if (action === "batch-analysis") startBatchAnalysis();
    if (action === "place-evidence") placeEvidence(button.dataset.site);
    if (action === "select-highest") { if(button.dataset.site==="RIV"){state.highestSelected=true;state.hint=c.highestGood;}else state.hint=c.highestWrong;persist();render();speakFeedback(state.hint); }
    if (action === "choose-priority") { const ordered=[...state.results].sort((a,b)=>b.level-a.level||a.id.localeCompare(b.id));const expected=ordered[state.priorityOrder.length]?.id;if(button.dataset.site===expected){state.priorityOrder.push(expected);state.feedback=state.priorityOrder.length>=ordered.length?c.priorityDone:c.priorityCorrect;}else state.feedback=c.priorityWrong;persist();render();speakFeedback(state.feedback); }
    if (action === "choose-plan") { const value=button.dataset.value;state.decision=value;state.feedback=value==="more"?c.decisionGood:value==="declare"?c.decisionWrongDeclare:c.decisionWrongStop;persist();render();speakFeedback(state.feedback); }
    if (action === "open-science") openScience();
    if (action === "close-science") scienceDialog.close();
    if (action === "restart") { cancelSpeech(true);state=freshState({uiLocale:state.uiLocale,voiceLocale:state.voiceLocale,voiceMuted:state.voiceMuted,voiceRate:state.voiceRate});persist();render(); }
  });

  app.addEventListener("pointerdown", event => {
    const evidence = event.target.closest(".evidence-file:not(:disabled)");
    if (evidence) {
      event.preventDefault(); pointerDrag={x:event.clientX,y:event.clientY,element:evidence,site:evidence.dataset.site,pointerId:event.pointerId,moved:false};
      evidence.classList.add("is-pointer-dragging"); evidence.setPointerCapture?.(event.pointerId); return;
    }
    const lens = event.target.closest("[data-lens]"); if (!lens || state.lensFound) return;
    lensDrag = { x:event.clientX, y:event.clientY, element:lens, moved:false }; lens.setPointerCapture?.(event.pointerId);
  });
  app.addEventListener("pointermove", event => {
    if (pointerDrag) {
      event.preventDefault(); const dx=event.clientX-pointerDrag.x;const dy=event.clientY-pointerDrag.y;if(Math.abs(dx)+Math.abs(dy)>10)pointerDrag.moved=true;
      pointerDrag.element.style.transform=`translate3d(${dx}px,${dy}px,0) rotate(0deg) scale(1.04)`; return;
    }
    if (!lensDrag) return; const dx=event.clientX-lensDrag.x; const dy=event.clientY-lensDrag.y; if(Math.abs(dx)+Math.abs(dy)>12) lensDrag.moved=true; lensDrag.element.style.transform=`translate(${dx}px,${dy}px)`;
  });
  app.addEventListener("pointerup", event => {
    if (pointerDrag) {
      const drag=pointerDrag;pointerDrag=null;drag.element.releasePointerCapture?.(drag.pointerId);drag.element.classList.remove("is-pointer-dragging");drag.element.style.transform="";
      if(drag.moved){suppressClickUntil=Date.now()+450;const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-drop="evidence"]');if(target?.dataset.site===drag.site)placeEvidence(drag.site);} return;
    }
    if (!lensDrag) return; const found=lensDrag.moved; lensDrag=null; if(found){state.lensFound=true;state.knowledgePage=0;state.knowledgeVisited=[0];persist();render();speak();}
  });
  app.addEventListener("pointercancel", () => { if(!pointerDrag)return;pointerDrag.element.classList.remove("is-pointer-dragging");pointerDrag.element.style.transform="";pointerDrag=null; });
  app.addEventListener("dragstart", event => {
    const part=event.target.closest("[data-part]"); const evidence=event.target.closest(".evidence-file");
    dragPayload = part ? {type:"part",value:Number(part.dataset.part)} : evidence ? {type:"evidence",value:evidence.dataset.site} : null;
    if(dragPayload) event.dataTransfer?.setData("text/plain",JSON.stringify(dragPayload));
  });
  app.addEventListener("dragover", event => { if(event.target.closest("[data-drop]")) event.preventDefault(); });
  app.addEventListener("drop", event => {
    const target=event.target.closest("[data-drop]"); if(!target||!dragPayload)return;event.preventDefault();
    if(target.dataset.drop==="build"&&dragPayload.type==="part")installPart(dragPayload.value);
    if(target.dataset.drop==="evidence"&&dragPayload.type==="evidence"&&dragPayload.value===target.dataset.site)placeEvidence(dragPayload.value);
    dragPayload=null;
  });
  scienceDialog.addEventListener("click", event => { if(event.target===scienceDialog)scienceDialog.close(); });
  if ("speechSynthesis" in window) {
    rememberSpeechVoices();
    speechSynthesis.addEventListener("voiceschanged",rememberSpeechVoices);
  }
  window.addEventListener("beforeunload",()=>{if(timer)clearTimeout(timer);cancelSpeech(true);});
  render();
})();
