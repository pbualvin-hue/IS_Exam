/* 期中考題庫 —— 由講義內容出題，每題附「來源」與「延伸學習」。
   資料以全域變數提供，讓 index.html 用 file:// 直接開啟也能讀取（免架伺服器）。
   要擴充：直接在 questions 陣列加物件即可，欄位見下方說明。
   欄位：
     id        唯一編號
     ch        章節（1~7）
     topic     子主題（顯示與篩選用）
     src       來源：講義檔名＋頁碼（作答後對照用）
     core      true=核心必考（核心速覽模式只出這些）
     diff      難度 1易 2中 3難
     q         題目
     options   選項陣列
     ans       正確選項的索引（0起算）
     exp       解析（為什麼對、為什麼其他錯）
     learn     延伸學習 {label, url}（影片替代 / 網路資料）
*/
window.QUIZ_DATA = {
  meta: {
    title: "資安攻防與 AI 應用實戰班 — 期中考題庫",
    scope: "第一章～第六章",
    exam: { minutes: 60, attempts: 2, type: "選擇題" },
    updated: "2026-07-05",
    // 收斂後的「模擬考精選題」：每章挑出最能貫穿主題的重點題（皆單選）。
    // 其餘題目保留為「融會貫通學習題」，在章節練習/核心速覽中使用。
    examSet: [
      // 第1章 網路
      "1-07", "1-15", "1-24", "1-33", "1-34",
      // 第2章 系統
      "2-01", "2-03", "2-12", "2-15", "2-17",
      // 第3章 網站開發
      "3-11", "3-13", "3-16",
      // 第4章 Web 安全
      "4-02", "4-03", "4-16", "4-19",
      // 第5章 資料庫
      "5-11", "5-12", "5-14",
      // 第6章 資料庫安全
      "6-04", "6-09", "6-13", "6-14",
      // 圖片型簡報補充的貫穿題（CIA、DDL/DML/DCL、union SQLi、.env、滲透測試）
      "1-37", "3-19", "5-21", "6-18", "6-20",
      // 情境／應用題（提升出題方向多元度）
      "2-21", "2-22", "3-21", "4-22", "5-23", "6-21",
      // 大觀念／重點詞／資安種類與應用（鞏固核心）
      "1-41", "1-42", "1-43", "2-23", "2-24", "4-23", "4-24", "4-25", "4-26", "4-27", "6-22",
      // 跨章整合（最能貫穿全局）
      "X-01", "X-02", "X-04", "X-06", "X-07"
    ]
  },
  chapters: {
    "1": "網路基礎入門",
    "2": "系統基礎入門",
    "3": "網站開發基礎",
    "4": "Web 應用程式安全入門",
    "5": "資料庫基礎",
    "6": "資料庫安全入門",
    "7": "（進階／未來範圍）網路防禦"
  },
  questions: [
    /* ================= 第一章 網路基礎 ================= */
    {
      id: "1-01", ch: 1, topic: "OSI 模型", src: "1.2 OSI模型與TCP/IP協議 p.4", core: true, diff: 1,
      q: "OSI 七層模型是由哪個組織、於何時提出？",
      options: ["IEEE，1990 年", "ISO（國際標準化組織），1984 年", "IETF，1981 年", "ANSI，1977 年"],
      ans: 1,
      exp: "講義明確指出 OSI 由國際標準化組織 (ISO) 於 1984 年提出，目的是解決不同廠商設備無法互通的問題。",
      learn: { label: "Cloudflare：什麼是 OSI 模型", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/open-systems-interconnection-model-osi/" }
    },
    {
      id: "1-02", ch: 1, topic: "OSI 分層", src: "1.2 OSI模型與TCP/IP協議 p.9~10", core: true, diff: 2,
      q: "路由器（Router）與 IP 協定主要運作在 OSI 的哪一層？",
      options: ["第二層 資料鏈路層", "第三層 網路層", "第四層 傳輸層", "第七層 應用層"],
      ans: 1,
      exp: "第三層網路層負責跨網路的路由與封包轉發，協定為 IP/ICMP，代表設備是路由器。第二層才是交換機與 MAC/ARP。",
      learn: { label: "Cloudflare：OSI 各層說明", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/open-systems-interconnection-model-osi/" }
    },
    {
      id: "1-03", ch: 1, topic: "OSI 安全", src: "1.2 OSI模型與TCP/IP協議 p.11", core: true, diff: 2,
      q: "ARP 欺騙（ARP Spoofing）攻擊發生在 OSI 哪一層？",
      options: ["第一層 實體層", "第二層 資料鏈路層", "第三層 網路層", "第四層 傳輸層"],
      ans: 1,
      exp: "ARP 用來把 IP 對應到 MAC，屬於第二層資料鏈路層的協定，因此 ARP 欺騙、MAC 欺騙、監聽都是第二層的安全威脅。",
      learn: { label: "PortSwigger 之外可看 Cloudflare：ARP 欺騙", url: "https://www.cloudflare.com/learning/ssl/glossary/what-is-arp-spoofing/" }
    },
    {
      id: "1-04", ch: 1, topic: "TCP/UDP", src: "1.2 OSI模型與TCP/IP協議 p.9", core: true, diff: 1,
      q: "關於 TCP 與 UDP，下列敘述何者正確？",
      options: [
        "TCP 無連接、不保證送達；UDP 連接導向、可靠",
        "TCP 連接導向、可靠、有序；UDP 無連接、速度快、無重傳",
        "兩者都保證封包順序",
        "UDP 有三向交握，TCP 沒有"
      ],
      ans: 1,
      exp: "TCP 特性：連接導向、有序、錯誤檢測、流量與擁塞控制。UDP 特性：無連接、無序、速度快、開銷小、無重傳機制。三向交握是 TCP 專有。",
      learn: { label: "Cloudflare：TCP/IP 是什麼", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/tcp-ip/" }
    },
    {
      id: "1-05", ch: 1, topic: "IP 特性", src: "1.2 OSI模型與TCP/IP協議 p.15", core: true, diff: 2,
      q: "IP 協定的特點，下列何者正確？",
      options: [
        "連接導向、保證送達",
        "無連接、盡力而為 (Best Effort)、不可靠",
        "保證封包順序與內容正確",
        "內建重傳機制"
      ],
      ans: 1,
      exp: "IP 是無連接、盡力而為、不可靠——不保證送達、順序或內容正確。可靠性由上層的 TCP 負責。",
      learn: { label: "MDN/Cloudflare：IP 協定", url: "https://www.cloudflare.com/zh-tw/learning/network-layer/internet-protocol/" }
    },
    {
      id: "1-06", ch: 1, topic: "IPv4/IPv6", src: "1.2 OSI模型與TCP/IP協議 p.16", core: false, diff: 1,
      q: "IPv4 與 IPv6 的位址長度分別是多少位元？",
      options: ["16 位 / 64 位", "32 位 / 128 位", "64 位 / 256 位", "48 位 / 128 位"],
      ans: 1,
      exp: "IPv4 為 32 位（約 43 億個位址，點分十進制），IPv6 為 128 位（八組十六進制），並內建 IPsec 支援。",
      learn: { label: "Cloudflare：IPv4 vs IPv6", url: "https://www.cloudflare.com/zh-tw/learning/network-layer/internet-protocol/" }
    },
    {
      id: "1-07", ch: 1, topic: "通訊埠", src: "1.2 OSI模型與TCP/IP協議 p.20~21", core: true, diff: 2,
      q: "熟知埠（Well-known ports）的範圍是？",
      options: ["0–1023", "1024–49151", "49152–65535", "0–65535"],
      ans: 0,
      exp: "0–1023 為熟知埠（常用服務）；1024–49151 為註冊埠；49152–65535 為動態/私有埠。埠號總範圍 0–65535（16 位元）。",
      learn: { label: "IANA 埠號對照", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" }
    },
    {
      id: "1-08", ch: 1, topic: "通訊埠", src: "1.2 OSI模型與TCP/IP協議 p.19", core: true, diff: 1,
      q: "下列服務與通訊埠對應，何者錯誤？",
      options: ["HTTPS = 443/tcp", "SSH = 22/tcp", "DNS = 53（udp/tcp）", "FTP 控制 = 80/tcp"],
      ans: 3,
      exp: "FTP 控制為 21/tcp、資料為 20/tcp；80 是 HTTP。其餘皆正確：HTTPS 443、SSH 22、DNS 53。",
      learn: { label: "IANA 埠號對照", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" }
    },
    {
      id: "1-09", ch: 1, topic: "Wireshark", src: "1.2 OSI模型與TCP/IP協議 p.26,52~54", core: true, diff: 2,
      q: "在 Wireshark 中，要「只顯示 HTTP 的 GET 請求」，正確的顯示過濾語法是？",
      options: [
        "http.request.method == \"GET\"",
        "host http and get",
        "tcp.port = GET",
        "filter: http-get"
      ],
      ans: 0,
      exp: "顯示過濾語法為 [協議].[欄位] [運算符] [值]，故為 http.request.method == \"GET\"。捕獲過濾（BPF）才是 host/port 這種語法。",
      learn: { label: "Wireshark 官方使用手冊（Display Filters）", url: "https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html" }
    },
    {
      id: "1-10", ch: 1, topic: "Wireshark", src: "1.2 OSI模型與TCP/IP協議 p.49", core: false, diff: 3,
      q: "關於 Wireshark 的兩種過濾條件，何者正確？",
      options: [
        "擷取過濾（Capture Filter）越寬鬆越好，顯示過濾（Display Filter）越精確越好",
        "擷取過濾（Capture Filter）越精確越好，顯示過濾（Display Filter）分析時越精準越好",
        "兩者語法完全相同",
        "顯示過濾在錄製封包當下就生效"
      ],
      ans: 1,
      exp: "擷取過濾在錄製當下生效、要謹慎精確以免漏包；顯示過濾是錄製後分析時輸入，為找出問題應越精準越好。兩者語法不同（BPF vs 顯示過濾語法）。",
      learn: { label: "Wireshark 官方手冊（Capture Filters）", url: "https://www.wireshark.org/docs/wsug_html_chunked/ChCapCaptureFilterSection.html" }
    },
    {
      id: "1-11", ch: 1, topic: "埠掃描", src: "1.2 OSI模型與TCP/IP協議 p.23", core: false, diff: 1,
      q: "下列何者是最常見的通訊埠掃描工具？",
      options: ["Wireshark", "Nmap", "Photoshop", "Apache"],
      ans: 1,
      exp: "常見埠掃描工具為 Nmap、Angry IP Scanner、Masscan。Wireshark 是封包分析工具，非掃描工具。",
      learn: { label: "Nmap 官方文件", url: "https://nmap.org/book/man.html" }
    },
    {
      id: "1-12", ch: 1, topic: "封包模式", src: "1.2 OSI模型與TCP/IP協議 p.45", core: false, diff: 2,
      q: "網際網路封包傳遞模式不包含下列哪一種？",
      options: ["廣播 Broadcast", "群播 Multicast", "定點 Unicast", "疊播 Supercast"],
      ans: 3,
      exp: "三種模式為廣播 (Broadcast)、群播 (Multicast)、定點 (Unicast)。並無「疊播 Supercast」這種模式。",
      learn: { label: "Cloudflare：Unicast/Multicast/Broadcast", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/" }
    },

    /* ================= 第二章 系統基礎 ================= */
    {
      id: "2-01", ch: 2, topic: "Linux 權限", src: "2.2 Linux基礎操作 p.16,19", core: true, diff: 2,
      q: "chmod 755 對應的符號權限是？",
      options: ["rw-r--r--", "rwxr-xr-x", "rwxrwxrwx", "r-xr-xr-x"],
      ans: 1,
      exp: "數字法 r=4、w=2、x=1。7=rwx（擁有者）、5=r-x（群組）、5=r-x（其他人），即 rwxr-xr-x。",
      learn: { label: "Linux Journey：Permissions", url: "https://linuxjourney.com/lesson/file-permissions" }
    },
    {
      id: "2-02", ch: 2, topic: "Linux 權限", src: "2.2 Linux基礎操作 p.16", core: true, diff: 1,
      q: "在 Linux 數字權限中，讀 (r)、寫 (w)、執行 (x) 分別代表哪些數值？",
      options: ["r=1, w=2, x=4", "r=4, w=2, x=1", "r=2, w=4, x=1", "r=4, w=1, x=2"],
      ans: 1,
      exp: "r=4、w=2、x=1，加總得到權限數字（例如 rwx=7、r-x=5）。",
      learn: { label: "Linux Journey：Permissions", url: "https://linuxjourney.com/lesson/file-permissions" }
    },
    {
      id: "2-03", card: "Linux 哪種特殊權限最常被用於權限提升？為什麼？（root + 它 = 危險）", ch: 2, topic: "特殊權限", src: "2.2 Linux基礎操作 p.20~21", core: true, diff: 3,
      q: "下列哪一種特殊權限，若設定在擁有者為 root 的程式上，最容易被用於權限提升 (privilege escalation)？",
      options: ["SUID", "Sticky Bit", "唯讀屬性", "umask"],
      ans: 0,
      exp: "SUID(4) 讓程式以「檔案擁有者」權限執行；若擁有者是 root 且程式有漏洞，攻擊者可藉此提權。Sticky Bit 用於限制刪除（如 /tmp），與提權無直接關係。",
      learn: { label: "GTFOBins：SUID 提權清單", url: "https://gtfobins.github.io/" }
    },
    {
      id: "2-04", ch: 2, topic: "敏感檔案", src: "2.2 Linux基礎操作 p.18", core: true, diff: 2,
      q: "Linux 中儲存加密後使用者密碼、且只有 root 可讀取的檔案是？",
      options: ["/etc/passwd", "/etc/shadow", "/etc/hosts", "/var/log/auth.log"],
      ans: 1,
      exp: "/etc/shadow 存放加密密碼且僅 root 可讀，是檔案權限作為第一道防線的典型例子。/etc/passwd 一般使用者可讀但不含密碼雜湊。",
      learn: { label: "Linux Journey：Users", url: "https://linuxjourney.com/lesson/users-and-groups" }
    },
    {
      id: "2-05", ch: 2, topic: "危險指令", src: "2.2 Linux基礎操作 p.7,36", core: false, diff: 1,
      q: "下列哪個指令具破壞性，講義特別提醒可用 --preserve-root 作為保護？",
      options: ["ls -la", "rm -rf /", "cat /etc/hosts", "pwd"],
      ans: 1,
      exp: "rm -rf / 會遞迴強制刪除；講義提到破壞性命令與 --preserve-root 保護，並提醒勿隨意複製貼上網路指令（命令注入風險）。",
      learn: { label: "OverTheWire Bandit（Linux 實戰練習）", url: "https://overthewire.org/wargames/bandit/" }
    },
    {
      id: "2-06", ch: 2, topic: "Linux 指令", src: "2.2 Linux基礎操作 p.8", core: false, diff: 2,
      q: "要「即時監控」一個持續增長的日誌檔（如偵測入侵嘗試），最適合的指令是？",
      options: ["cat", "tail -f", "head", "ls"],
      ans: 1,
      exp: "tail -f 會持續輸出檔案新增內容，適合即時監控日誌。cat 一次全印、head 印開頭、ls 列目錄。",
      learn: { label: "Linux Journey：The Filesystem", url: "https://linuxjourney.com/lesson/the-filesystem" }
    },
    {
      id: "2-07", ch: 2, topic: "Shell", src: "2.2 Linux基礎操作 p.25", core: false, diff: 1,
      q: "在 Shell 中，管道符號 | 的作用是？",
      options: [
        "將前一個命令的輸出，作為後一個命令的輸入",
        "把輸出覆蓋寫入檔案",
        "把輸出追加到檔案",
        "從檔案讀取輸入"
      ],
      ans: 0,
      exp: "| 是管道，串接命令；> 覆蓋寫檔、>> 追加寫檔、< 由檔案輸入。",
      learn: { label: "Linux Journey：Pipes/Redirection", url: "https://linuxjourney.com/lesson/pipe-data" }
    },
    {
      id: "2-08", ch: 2, topic: "Shell 安全", src: "2.2 Linux基礎操作 p.28,38", core: false, diff: 3,
      q: "攻擊者修改 PATH 環境變數，使系統優先執行惡意程式，這種手法稱為？",
      options: ["SQL 注入", "PATH 劫持 (PATH hijacking)", "XSS", "DDoS"],
      ans: 1,
      exp: "PATH 決定執行檔搜尋順序；若被竄改指向惡意目錄，系統可能優先執行惡意程式，稱為 PATH 劫持。",
      learn: { label: "Linux Journey：Environment", url: "https://linuxjourney.com/lesson/environment-variables" }
    },

    /* ================= 第三章 網站開發基礎 ================= */
    {
      id: "3-01", ch: 3, topic: "HTTP", src: "3.1 網頁技術基礎 v3", core: true, diff: 1,
      q: "使用者要向伺服器「提交表單資料」，通常使用哪個 HTTP 方法？",
      options: ["GET", "POST", "HEAD", "OPTIONS"],
      ans: 1,
      exp: "POST 將資料放在請求主體 (body) 提交，適合送出表單/敏感資料；GET 將參數附在 URL，會被記錄且長度受限。",
      learn: { label: "MDN：HTTP 請求方法", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods" }
    },
    {
      id: "3-02", ch: 3, topic: "HTTP 狀態碼", src: "3.1 網頁技術基礎 v3", core: true, diff: 1,
      q: "HTTP 狀態碼 404 代表什麼？",
      options: ["伺服器內部錯誤", "找不到資源 (Not Found)", "請求成功", "需要授權"],
      ans: 1,
      exp: "404 = 找不到資源；200 成功、500 伺服器內部錯誤、401 需授權、403 禁止存取。",
      learn: { label: "MDN：HTTP 狀態碼", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status" }
    },
    {
      id: "3-03", ch: 3, topic: "前端技術", src: "3.1 網頁技術基礎 v3", core: false, diff: 1,
      q: "HTML、CSS、JavaScript 三者在網頁中的角色，正確的是？",
      options: [
        "HTML 結構、CSS 樣式、JavaScript 互動行為",
        "HTML 樣式、CSS 行為、JavaScript 結構",
        "三者都只負責樣式",
        "HTML 行為、CSS 結構、JavaScript 樣式"
      ],
      ans: 0,
      exp: "HTML 定義內容結構、CSS 負責外觀樣式、JavaScript 負責互動與動態行為。",
      learn: { label: "MDN：Web 開發入門", url: "https://developer.mozilla.org/zh-TW/docs/Learn" }
    },
    {
      id: "3-04", ch: 3, topic: "會話管理", src: "3.2 基礎網站安全 v2", core: true, diff: 2,
      q: "HTTP 是無狀態協定，網站通常用什麼機制在多次請求間辨識同一使用者？",
      options: ["IP 位址", "Cookie / Session", "MAC 位址", "URL 長度"],
      ans: 1,
      exp: "伺服器發給瀏覽器 Cookie（常含 Session ID）以在無狀態的 HTTP 上維持登入狀態。若 Session 被竊取即會話劫持。",
      learn: { label: "MDN：使用 HTTP Cookie", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies" }
    },
    {
      id: "3-05", ch: 3, topic: "XSS", src: "3.2 基礎網站安全 v2", core: true, diff: 2,
      q: "攻擊者將惡意 JavaScript 注入網頁，讓其他使用者的瀏覽器執行，屬於哪種攻擊？",
      options: ["SQL 注入", "跨站腳本 (XSS)", "暴力破解", "阻斷服務"],
      ans: 1,
      exp: "XSS（Cross-Site Scripting）是把惡意腳本注入頁面，於受害者瀏覽器執行，可竊取 Cookie/Session。防禦：輸出編碼、輸入驗證、CSP。",
      learn: { label: "PortSwigger：跨站腳本 XSS", url: "https://portswigger.net/web-security/cross-site-scripting" }
    },

    /* ================= 第四章 Web 應用程式安全 ================= */
    {
      id: "4-01", ch: 4, topic: "OWASP 組織", src: "4.1 OWASP Top 10 p.5", core: true, diff: 1,
      q: "OWASP 是什麼樣的組織？",
      options: [
        "營利性防毒軟體公司",
        "非營利國際組織，致力改善軟體安全並提供免費資源",
        "政府資安主管機關",
        "硬體防火牆製造商"
      ],
      ans: 1,
      exp: "OWASP = Open Web Application Security Project，非營利國際組織，提供免費工具、標準與資源；Top 10 每 3–4 年更新一次。",
      learn: { label: "OWASP 官方網站", url: "https://owasp.org/" }
    },
    {
      id: "4-02", ch: 4, topic: "OWASP Top 10", src: "4.1 OWASP Top 10 p.8", core: true, diff: 2,
      q: "依講義的 OWASP Top 10（2025）排序，排名第一 A01 的風險是？",
      options: [
        "注入攻擊 (Injection)",
        "存取控制失效 (Broken Access Control)",
        "加密機制失效 (Cryptographic Failures)",
        "認證失效 (Authentication Failures)"
      ],
      ans: 1,
      exp: "本課程講義使用 2025 版排序：A01 存取控制失效。注意這與部分舊資料不同，請以講義為準。",
      learn: { label: "OWASP Top 10 官方", url: "https://owasp.org/www-project-top-ten/" }
    },
    {
      id: "4-03", card: "依講義 OWASP 2025，注入攻擊 (Injection) 排第幾？主要防護是什麼？", ch: 4, topic: "OWASP Top 10", src: "4.1 OWASP Top 10 p.12", core: true, diff: 2,
      q: "依講義（2025 版），注入攻擊 (Injection) 的排名是？其防護措施包含下列何者？",
      options: ["A05；防護為參數化查詢、ORM 與輸入驗證", "A03；防護為建立 SBOM 與相依套件掃描", "A01；防護為最小權限與強制授權檢查", "A07；防護為多因素認證與強密碼策略"],
      ans: 0,
      exp: "講義將注入列為 A05:2025，常見案例含 SQL/NoSQL/OS 命令/LDAP 注入；防護為參數化查詢、ORM 框架、輸入驗證與過濾。",
      learn: { label: "PortSwigger：SQL Injection", url: "https://portswigger.net/web-security/sql-injection" }
    },
    {
      id: "4-04", ch: 4, topic: "OWASP Top 10", src: "4.1 OWASP Top 10 p.10", core: false, diff: 3,
      q: "講義 2025 版新增/強調的 A03「軟體供應鏈缺失」，下列何者是其防護措施？",
      options: [
        "使用弱加密演算法",
        "建立 SBOM、用 SCA 工具掃描第三方套件、驗證套件簽章與雜湊",
        "開啟所有預設服務",
        "回傳完整堆疊追蹤給使用者"
      ],
      ans: 1,
      exp: "軟體供應鏈缺失的防護：相依套件清單/SBOM、SCA 掃描、可信來源、驗證簽章與雜湊、保護 CI/CD 管線與憑證。",
      learn: { label: "OWASP：Software Supply Chain", url: "https://owasp.org/www-project-top-ten/" }
    },
    {
      id: "4-05", ch: 4, topic: "練習平台", src: "4.1 OWASP Top 10 p.18", core: false, diff: 1,
      q: "下列何者「不是」講義提到的 Web 漏洞練習平台？",
      options: ["OWASP Juice Shop", "WebGoat", "Metasploitable", "Microsoft Word"],
      ans: 3,
      exp: "講義列出的合法練習環境為 OWASP Juice Shop、WebGoat、Metasploitable。",
      learn: { label: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/" }
    },
    {
      id: "4-06", ch: 4, topic: "真實案例", src: "4.1 OWASP Top 10 p.20", core: false, diff: 2,
      q: "2017 年 Equifax 大規模資料外洩的主因是？",
      options: [
        "Apache Struts 的已知漏洞未及時修補",
        "員工密碼設為 123456",
        "機房淹水",
        "使用者自行刪除資料"
      ],
      ans: 0,
      exp: "Equifax(2017) 因 Apache Struts 已知漏洞未即時修補；教訓是及時修補與監控。SolarWinds(2020) 為供應鏈攻擊、Capital One(2019) 為 WAF 錯誤配置與 SSRF。",
      learn: { label: "OWASP Top 10 專案", url: "https://owasp.org/www-project-top-ten/" }
    },
    {
      id: "4-07", ch: 4, topic: "存取控制", src: "4.1 OWASP Top 10 p.8", core: true, diff: 2,
      q: "使用者直接修改 URL 或 API 參數就能存取他人資料，屬於哪類 OWASP 風險？其正確防護為何？",
      options: [
        "加密失效；改用明文",
        "存取控制失效；實施最小權限、強制授權機制與良好存取控制模型",
        "日誌失效；關閉告警",
        "供應鏈失效；移除 SBOM"
      ],
      ans: 1,
      exp: "此為存取控制失效 (Broken Access Control)，常見案例含直接存取 URL 繞過驗證、API 未做權限檢查、權限提升。防護為最小權限、強制授權、良好存取控制模型。",
      learn: { label: "PortSwigger：Access Control", url: "https://portswigger.net/web-security/access-control" }
    },

    /* ================= 第五章 資料庫基礎 ================= */
    {
      id: "5-01", ch: 5, topic: "SQL 查詢", src: "5.2 基礎語法", core: true, diff: 1,
      q: "要從 users 資料表取出所有欄位的所有資料，正確的 SQL 是？",
      options: ["GET * FROM users;", "SELECT * FROM users;", "SHOW users ALL;", "READ users;"],
      ans: 1,
      exp: "SELECT 用於查詢，* 代表所有欄位，FROM 指定資料表。",
      learn: { label: "SQLBolt 互動教學", url: "https://sqlbolt.com/" }
    },
    {
      id: "5-02", ch: 5, topic: "SQL 條件", src: "5.2 基礎語法", core: true, diff: 1,
      q: "要查詢 users 表中 age 大於 18 的資料，應使用哪個子句？",
      options: ["ORDER BY age > 18", "WHERE age > 18", "GROUP BY age", "HAVING > 18 only"],
      ans: 1,
      exp: "WHERE 用來過濾符合條件的列。ORDER BY 排序、GROUP BY 分組、HAVING 用於分組後過濾。",
      learn: { label: "SQLBolt：WHERE", url: "https://sqlbolt.com/lesson/select_queries_with_constraints" }
    },
    {
      id: "5-03", ch: 5, topic: "資料庫概念", src: "5.1 資料庫基本概念", core: true, diff: 2,
      q: "關於「主鍵 (Primary Key)」，下列敘述何者正確？",
      options: [
        "允許重複值與 NULL",
        "唯一識別資料表中每一列，不可重複、不可為 NULL",
        "只能是文字型別",
        "一個資料表可以有很多個主鍵"
      ],
      ans: 1,
      exp: "主鍵唯一識別每一列，值不可重複也不可為 NULL；一個資料表只有一個主鍵（可由多欄組成複合主鍵）。",
      learn: { label: "W3Schools：SQL PRIMARY KEY", url: "https://www.w3schools.com/sql/sql_primarykey.asp" }
    },
    {
      id: "5-04", ch: 5, topic: "SQL 操作", src: "5.2 基礎語法", core: false, diff: 2,
      q: "下列 SQL 指令與用途配對，何者「錯誤」？",
      options: [
        "INSERT — 新增資料列",
        "UPDATE — 修改既有資料",
        "DELETE — 刪除資料列",
        "SELECT — 刪除整張資料表"
      ],
      ans: 3,
      exp: "SELECT 是查詢資料，不會刪除。刪除整張表結構是 DROP TABLE，清空資料是 DELETE/TRUNCATE。",
      learn: { label: "W3Schools：SQL 語法", url: "https://www.w3schools.com/sql/" }
    },
    {
      id: "5-05", ch: 5, topic: "資料表關聯", src: "5.2 基礎語法", core: false, diff: 2,
      q: "要把兩張資料表依共同欄位合併查詢，使用哪個關鍵字？",
      options: ["MERGE", "JOIN", "UNION（僅上下合併相同欄位）", "LINK"],
      ans: 1,
      exp: "JOIN 依關聯欄位合併兩表（INNER/LEFT/RIGHT）。UNION 是把兩個查詢結果上下疊加，需欄位數與型別相容——這也是 union-based SQLi 的基礎。",
      learn: { label: "SQLBolt：Multi-table JOIN", url: "https://sqlbolt.com/lesson/select_queries_with_joins" }
    },

    /* ================= 第六章 資料庫安全 ================= */
    {
      id: "6-01", ch: 6, topic: "SQL 注入", src: "6.1 資料庫安全入門 / 4.1 p.19", core: true, diff: 2,
      q: "登入框輸入 ' OR '1'='1 就能繞過密碼驗證，這是利用什麼原理？",
      options: [
        "把使用者輸入當成 SQL 語法的一部分，使 WHERE 條件恆為真",
        "暴力破解密碼",
        "竊取瀏覽器 Cookie",
        "耗盡伺服器頻寬"
      ],
      ans: 0,
      exp: "未過濾的輸入被拼進 SQL，'1'='1' 讓 WHERE 條件恆為真，繞過驗證。這對應 OWASP 的注入攻擊。防禦：參數化查詢。",
      learn: { label: "PortSwigger：SQL Injection", url: "https://portswigger.net/web-security/sql-injection" }
    },
    {
      id: "6-02", ch: 6, topic: "SQLi 手法", src: "6.2 SQLi Labs p.4", core: true, diff: 3,
      q: "在 sqli-labs Less-1，攻擊者輸入 ?id=1' order by 3--+ 的主要目的是？",
      options: [
        "刪除資料表",
        "判斷查詢回傳的欄位數量",
        "關閉資料庫",
        "加密欄位"
      ],
      ans: 1,
      exp: "用 order by 逐一增加數字直到報錯，可推測 SELECT 回傳的欄位數（講義示範 order by 1→4 發現錯誤，推測共三個欄位），為後續 union 注入鋪路。--+ 是註解符號 -- 加空格。",
      learn: { label: "PortSwigger：UNION attacks", url: "https://portswigger.net/web-security/sql-injection/union-attacks" }
    },
    {
      id: "6-03", ch: 6, topic: "SQLi 手法", src: "6.2 SQLi Labs p.4", core: false, diff: 3,
      q: "sqli-labs 中，輸入 ?id=1' 後頁面回傳 SQL 語法錯誤訊息，這種可從錯誤訊息取得資訊的注入稱為？",
      options: ["時間盲注", "錯誤型注入 (Error-based)", "跨站腳本", "檔案包含"],
      ans: 1,
      exp: "頁面直接回傳資料庫錯誤訊息，攻擊者據此推斷查詢結構，稱錯誤型 (error-based) 注入。若無錯誤但有真假差異則為布林盲注，無回應差異則靠時間盲注。",
      learn: { label: "PortSwigger：Blind SQLi", url: "https://portswigger.net/web-security/sql-injection/blind" }
    },
    {
      id: "6-04", ch: 6, topic: "SQLi 防禦", src: "6.1 資料庫安全入門", core: true, diff: 2,
      q: "防禦 SQL 注入「最根本」的做法是？",
      options: ["使用參數化查詢／預備語句 (Prepared Statement)", "對輸入做 HTML 實體編碼後再拼進 SQL", "把查詢包成 Stored Procedure 即可自動防護", "為資料庫帳號設定最小權限就能防止注入"],
      ans: 0,
      exp: "參數化查詢/預備語句讓輸入只當資料、不會被當成 SQL 語法，是最根本的防禦；並輔以最小權限資料庫帳號、輸入驗證、關閉詳細錯誤訊息。",
      learn: { label: "OWASP：SQLi 防禦速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" }
    },
    {
      id: "6-05", ch: 6, topic: "最小權限", src: "6.1 資料庫安全入門", core: false, diff: 2,
      q: "為降低資料庫被入侵後的損害，網站連線資料庫用的帳號應該？",
      options: [
        "使用 root/最高權限帳號以免出錯",
        "僅授予應用所需的最小權限 (least privilege)",
        "所有網站共用同一組管理員帳號",
        "停用密碼方便連線"
      ],
      ans: 1,
      exp: "最小權限原則：應用帳號只給必要權限，即使被 SQLi 攻破也難以刪庫或存取其他資料。這與 Linux 權限、OWASP 存取控制的原則一致。",
      learn: { label: "OWASP：資料庫安全速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html" }
    },

    /* ========= GitHub 實作 repo（2026AI_05）補充題 ========= */
    /* --- 第三章 網站開發：HTML/CSS/JS --- */
    {
      id: "3-06", ch: 3, topic: "HTML 元素", src: "repo 01_HTML/03_blockinline", core: false, diff: 1,
      q: "關於區塊元素 (block) 與行內元素 (inline)，下列敘述何者正確？",
      options: [
        "block 元素（如 div、p）會獨佔一行；inline 元素（如 span、a）不換行、與文字並排",
        "inline 元素一定會換行",
        "block 元素不能設定寬高",
        "兩者顯示行為完全相同"
      ],
      ans: 0,
      exp: "block（div/p/h1）預設獨佔整行、可設寬高；inline（span/a/img）依內容寬度、與相鄰內容並排，寬高設定多半無效。",
      learn: { label: "MDN：區塊與行內排版", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML/Block-level_elements" }
    },
    {
      id: "3-07", ch: 3, topic: "CSS 引入方式", src: "repo 02_CSS/02_usingcss", core: false, diff: 1,
      q: "CSS 套用到 HTML 的三種方式，不包含下列哪一種？",
      options: ["行內 inline（style 屬性）", "內部 internal（<style> 標籤）", "外部 external（<link> 引入 .css）", "編譯 compiled（<script> 引入 .css）"],
      ans: 3,
      exp: "三種方式為 inline、internal（<style>）、external（<link href=...css>）。並沒有用 <script> 「編譯」CSS 這種方式。",
      learn: { label: "MDN：如何加入 CSS", url: "https://developer.mozilla.org/zh-TW/docs/Learn/CSS/First_steps/How_CSS_is_structured" }
    },
    {
      id: "3-08", ch: 3, topic: "CSS 版面", src: "repo 02_CSS/07_flex, 08_grid", core: true, diff: 2,
      q: "關於 CSS Flexbox 與 Grid 版面，下列敘述何者最正確？",
      options: [
        "Flexbox 適合一維（單軸）排列；Grid 適合二維（列與欄同時）排版",
        "兩者都只能做垂直排列",
        "Grid 只能用於文字，不能排版",
        "Flexbox 是用來寫資料庫查詢的"
      ],
      ans: 0,
      exp: "Flexbox 主打一維（一列或一欄）彈性排列；Grid 是二維系統，可同時控制列與欄，適合整體版面。float 是較早期的排版手法。",
      learn: { label: "CSS-Tricks：Flexbox 完整指南", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
    },
    {
      id: "3-09", ch: 3, topic: "響應式設計", src: "repo 02_CSS/09_media", core: false, diff: 2,
      q: "要讓網頁在手機與桌機呈現不同版面（響應式設計 RWD），主要使用哪個 CSS 機制？",
      options: ["@media 媒體查詢", "@import", "@keyframes", "@font-face"],
      ans: 0,
      exp: "@media 媒體查詢依螢幕寬度等條件套用不同樣式，是 RWD 的核心。@keyframes 做動畫、@font-face 載字型、@import 引入樣式。",
      learn: { label: "MDN：媒體查詢", url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS/Media_Queries/Using_media_queries" }
    },
    {
      id: "3-10", ch: 3, topic: "JavaScript 變數", src: "repo 03_JS/02_var", core: false, diff: 2,
      q: "JavaScript 中 let 與 var 的主要差別是？",
      options: [
        "let 為區塊作用域 (block scope)；var 為函式作用域且會提升 (hoisting)",
        "兩者完全相同",
        "var 不能存數字",
        "let 宣告的變數不能改值"
      ],
      ans: 0,
      exp: "let/const 是區塊作用域、較安全；var 是函式作用域且有提升行為，易產生非預期 bug。（不能改值的是 const，不是 let。）",
      learn: { label: "MDN：let", url: "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let" }
    },
    {
      id: "3-11", ch: 3, topic: "DOM 與安全", src: "repo 03_JS/05_dom + 04 XSS", core: true, diff: 3,
      q: "在 JavaScript 操作 DOM 時，為何安全上建議優先用 textContent 而非 innerHTML？",
      options: ["textContent 當純文字、不解析標籤，可避免 DOM XSS", "innerHTML 會自動過濾 <script>，兩者一樣安全", "textContent 會執行內嵌腳本，風險其實更高", "兩者都解析 HTML，差別只在載入速度"],
      ans: 0,
      exp: "innerHTML 會把字串當 HTML 解析，若含 <script>/事件屬性可能被執行造成 XSS；textContent 只當純文字放入，是較安全的 Sink。",
      learn: { label: "MDN：Node.textContent", url: "https://developer.mozilla.org/zh-TW/docs/Web/API/Node/textContent" }
    },

    /* --- 第四章 Web 安全：XSS / CSRF（repo 04） --- */
    {
      id: "4-08", ch: 4, topic: "XSS 分類", src: "repo 04_WebsiteSecurity/01_xss.html", core: true, diff: 2,
      q: "三種 XSS 中，惡意腳本被『永久寫入伺服器資料庫』、每個瀏覽該頁的使用者都會中招、危害範圍最廣的是？",
      options: ["反射型 Reflected XSS", "儲存型 Stored XSS", "DOM 型 DOM-based XSS", "以上皆非"],
      ans: 1,
      exp: "儲存型 (Stored) 把 payload 存進伺服器（如留言板），凡讀取該資料的使用者都會執行，危害最廣。反射型靠 URL 夾帶+釣魚連結，DOM 型完全在前端 JS 處理。",
      learn: { label: "PortSwigger：Stored XSS", url: "https://portswigger.net/web-security/cross-site-scripting/stored" }
    },
    {
      id: "4-09", ch: 4, topic: "XSS 分類", src: "repo 04_WebsiteSecurity/01_xss.html", core: true, diff: 3,
      q: "DOM-based XSS 的特徵是什麼？",
      options: [
        "完全發生在瀏覽器端 JS：從不安全的 Source（如 location.hash）讀入，未轉義寫入不安全的 Sink（如 innerHTML）",
        "一定要伺服器把資料存進資料庫",
        "只會發生在後端 PHP",
        "與 JavaScript 無關"
      ],
      ans: 0,
      exp: "DOM 型不經伺服器反射，而是前端 JS 把來源 (Source，如 location.hash / document.URL) 的資料，未經轉義寫入危險 Sink（innerHTML、document.write）而觸發。",
      learn: { label: "PortSwigger：DOM-based XSS", url: "https://portswigger.net/web-security/cross-site-scripting/dom-based" }
    },
    {
      id: "4-10", ch: 4, topic: "XSS 防禦", src: "repo 04_WebsiteSecurity/01_xss.html", core: true, diff: 3,
      q: "下列哪一項『不是』講義／實驗室列出的 XSS 防禦手段？",
      options: [
        "HTML 實體編碼（把 < 轉成 &lt;）",
        "為 Cookie 加上 HttpOnly，阻止 JS 用 document.cookie 讀取",
        "設定 CSP（內容安全政策）限制腳本來源、禁止行內腳本",
        "把所有輸入直接用 innerHTML 顯示以加快速度"
      ],
      ans: 3,
      exp: "正確防禦：HTML 實體編碼、用 textContent 取代 innerHTML、CSP、HttpOnly Cookie。用 innerHTML 直接輸出未過濾輸入正是造成 XSS 的原因。",
      learn: { label: "OWASP：XSS 防禦速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" }
    },
    {
      id: "4-11", ch: 4, topic: "HttpOnly", src: "repo 04_WebsiteSecurity/01_xss.html", core: false, diff: 2,
      q: "為敏感 Cookie 加上 HttpOnly 屬性的主要資安目的是？",
      options: [
        "阻止 JavaScript 透過 document.cookie 讀取該 Cookie，降低 XSS 竊取 Session 的風險",
        "讓 Cookie 永不過期",
        "加密整個網站流量",
        "加速網頁載入"
      ],
      ans: 0,
      exp: "HttpOnly 讓 Cookie 無法被前端 JS（document.cookie）存取，即使發生 XSS 也較難竊取 Session Cookie。加密傳輸是 HTTPS/Secure 屬性的職責。",
      learn: { label: "MDN：Set-Cookie HttpOnly", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies#restrict_access_to_cookies" }
    },
    {
      id: "4-12", ch: 4, topic: "CSRF", src: "repo 04_WebsiteSecurity/src/06_transfer.php, 04_csrf.html", core: true, diff: 2,
      q: "攻擊者誘導『已登入』的使用者在不知情下，向其信任的網站送出非本意的請求（如轉帳），屬於哪種攻擊？其常見防禦為何？",
      options: [
        "XSS；防禦為關閉 JavaScript",
        "CSRF（跨站請求偽造）；防禦為 CSRF Token、SameSite Cookie、驗證 Referer",
        "SQL 注入；防禦為參數化查詢",
        "暴力破解；防禦為加長密碼"
      ],
      ans: 1,
      exp: "CSRF 利用使用者已通過驗證的身分（瀏覽器自動帶 Cookie）偽造請求。防禦：不可預測的 CSRF Token、SameSite Cookie、關鍵操作二次驗證。它與 XSS 不同：XSS 是注入腳本，CSRF 是偽造請求。",
      learn: { label: "PortSwigger：CSRF", url: "https://portswigger.net/web-security/csrf" }
    },

    /* --- 第五章 資料庫：外鍵（repo 05_SQL） --- */
    {
      id: "5-06", ch: 5, topic: "外鍵", src: "repo 05_SQL/fk.sql", core: true, diff: 2,
      q: "外鍵 (FOREIGN KEY) 設定 ON DELETE RESTRICT，代表什麼行為？",
      options: [
        "若子表仍有參照該筆的資料，就『禁止』刪除父表該筆資料",
        "刪父表資料時，連帶自動刪掉子表相關資料",
        "把子表的外鍵設為 NULL",
        "外鍵沒有任何約束作用"
      ],
      ans: 0,
      exp: "RESTRICT：只要有子資料參照就不准刪父資料（保護參照完整性）。CASCADE 則會連帶刪除子資料；SET NULL 把外鍵設為 NULL。",
      learn: { label: "SQLBolt：關聯與外鍵概念", url: "https://sqlbolt.com/lesson/select_queries_with_joins" }
    },
    {
      id: "5-07", ch: 5, topic: "外鍵", src: "repo 05_SQL/fk.sql（註解）", core: false, diff: 2,
      q: "依 repo 註解，SQLite 對外鍵約束的預設行為是？",
      options: [
        "預設『不啟用』外鍵約束檢查，需 PRAGMA foreign_keys = ON 才生效",
        "預設一律強制啟用，無法關閉",
        "SQLite 不支援外鍵",
        "外鍵只能在 MySQL 使用"
      ],
      ans: 0,
      exp: "SQLite 為相容性預設不啟用外鍵約束，需執行 PRAGMA foreign_keys = ON。這是實作細節但常被忽略，導致以為有約束其實沒有。",
      learn: { label: "SQLite 官方：Foreign Keys", url: "https://www.sqlite.org/foreignkeys.html" }
    },

    /* --- 第六章 SQLi Lab（repo 06_SQLi）— 貫穿大觀念 --- */
    {
      id: "6-06", ch: 6, topic: "SQLi 根因", src: "repo 06_SQLi/.../unsafe.php", core: true, diff: 2,
      q: "unsafe.php 用 \"...WHERE id = $id\" 直接把使用者輸入串進 SQL。造成 SQL Injection 的『根本原因』是？",
      options: [
        "把不可信的使用者輸入，以字串串接方式當成 SQL 語法的一部分",
        "資料表欄位太多",
        "使用了 SELECT 而非 INSERT",
        "網頁用了 HTTPS"
      ],
      ans: 0,
      exp: "根因是『字串串接把輸入當程式碼』。因此 ?id=1 OR 1=1 會讓條件恆真、傾印整表。與欄位數、SELECT/INSERT、是否 HTTPS 無關。",
      learn: { label: "PortSwigger：SQL Injection", url: "https://portswigger.net/web-security/sql-injection" }
    },
    {
      id: "6-07", ch: 6, topic: "Prepared Statement", src: "repo 06_SQLi/.../safe-pdo.php + README", core: true, diff: 3,
      q: "safe-pdo.php 用 PDO Prepared Statement（WHERE id = ? 綁定參數）擋下注入。依 repo 說明，關於它的定位下列何者最正確？",
      options: [
        "它是『語法層』防護：讓輸入只當資料不當語法；但仍直連 users 表，不等於權限層防護",
        "它同時解決語法與權限問題，之後不必再管資料庫帳號權限",
        "它是權限層防護，與 SQL 語法無關",
        "用了它就可以放心用 root 帳號連線"
      ],
      ans: 0,
      exp: "repo 明講：Prepared Statement 是『語法層』防護（輸入只當資料），是防 SQLi 的主要手段；但 safe-pdo 仍以 webtable 直連 table，權限層要另外靠最小權限處理。兩者是不同層次、要並用。",
      learn: { label: "OWASP：Query Parameterization", url: "https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html" }
    },
    {
      id: "6-08", ch: 6, topic: "最小權限", src: "repo 06_SQLi/.../04_grants.sql, README", core: true, diff: 3,
      q: "Lab 建立 webtable（只能 CRUD users、不能 CALL SP）與 websp（不能 CRUD、只能 CALL 指定 SP）兩個帳號。這種權限切分的主要目的是？",
      options: [
        "落實最小權限，縮小被攻破後的『爆炸半徑』，但不能取代 Prepared Statement",
        "讓查詢速度變快",
        "完全防止 SQL Injection，之後不需再做輸入處理",
        "方便所有人共用 root 帳號"
      ],
      ans: 0,
      exp: "最小權限讓每個帳號只有必要權限，即使被注入，損害範圍（爆炸半徑）也受限。但 repo 強調：最小權限『只能降低爆炸半徑，不能取代 Prepared Statement』。",
      learn: { label: "OWASP：資料庫安全速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html" }
    },
    {
      id: "6-09", ch: 6, topic: "Stored Procedure", src: "repo 06_SQLi/.../sp-unsafe.php, README", core: true, diff: 3,
      q: "Lab 的 sp_search_users_unsafe 是 Stored Procedure，卻仍可被 SQL Injection。原因是？（貫穿觀念題）",
      options: ["SP 內用 CONCAT 動態拼接輸入，SP 不等於自動安全", "因為呼叫時沒改用 websp 最小權限帳號", "因為 SP 的參數沒有宣告 VARCHAR 型別", "因為 MySQL 的 SP 不支援參數綁定"],
      ans: 0,
      exp: "關鍵觀念：把邏輯包進 SP 不會自動安全。若 SP 內部仍用 CONCAT 串接輸入再 PREPARE/EXECUTE 動態 SQL，一樣可被注入。安全與否取決於『有沒有拼接不可信輸入』，不是包不包成 SP。",
      learn: { label: "OWASP：Query Parameterization", url: "https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html" }
    },
    {
      id: "6-10", ch: 6, topic: "SP DEFINER", src: "repo 06_SQLi/.../03_procedures.sql, README", core: false, diff: 3,
      q: "Lab 的 Stored Procedure 使用 SQL SECURITY DEFINER 且 DEFINER='sp_owner'。這代表 SP 執行時以誰的權限運作？",
      options: [
        "以定義者 sp_owner 的權限執行，讓只能 CALL 的 websp 不必直接擁有 users 表權限",
        "以呼叫者 websp 的權限執行",
        "以 root 權限執行",
        "不需要任何權限"
      ],
      ans: 0,
      exp: "SQL SECURITY DEFINER 讓 SP 以『定義者』(sp_owner) 權限執行；因此 websp 帳號自己沒有 users 表權限，也能透過受控的 SP 完成操作——這正是用 SP 做權限封裝的設計。相對地 INVOKER 是以呼叫者權限執行。",
      learn: { label: "MySQL 官方：Stored Program Privileges", url: "https://dev.mysql.com/doc/refman/8.0/en/stored-programs-security.html" }
    },
    {
      id: "6-11", ch: 6, topic: "sqlmap", src: "repo 06_SQLi/.../scripts, requests", core: true, diff: 2,
      q: "Lab 用 sqlmap 搭配 request file（sqlmap -r unsafe.txt --batch --level=2 --risk=1）驗證漏洞。sqlmap 是什麼？",
      options: [
        "自動化偵測與利用 SQL Injection 的工具",
        "資料庫備份工具",
        "網頁排版框架",
        "防火牆設定程式"
      ],
      ans: 0,
      exp: "sqlmap 是自動化 SQLi 偵測/利用工具；-r 讀取攔截下來的 HTTP request 檔，--level/--risk 控制測試強度。它用來『驗證』unsafe 頁面有洞、safe-pdo 頁面擋得住。",
      learn: { label: "sqlmap 官方", url: "https://github.com/sqlmapproject/sqlmap/wiki/Usage" }
    },
    {
      id: "6-12", ch: 6, topic: "密碼儲存", src: "repo 06_SQLi 教學備註（password_plain）", core: false, diff: 1,
      q: "Lab 刻意保留 password_plain（明文密碼）欄位。依教學備註，這給我們的資安啟示是？",
      options: [
        "正式系統『絕不可』明文儲存密碼，應用雜湊加鹽（如 bcrypt）保存",
        "明文存密碼很方便，正式環境也建議照做",
        "密碼不需要保護",
        "明文密碼可加快登入速度所以較好"
      ],
      ans: 0,
      exp: "password_plain 只為展示『資料一旦外洩，明文密碼直接曝光』的風險。正式系統必須用單向雜湊加鹽（bcrypt/argon2）儲存，資料庫被拖走也難還原原始密碼。",
      learn: { label: "OWASP：密碼儲存速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }
    },
    {
      id: "6-13", ch: 6, topic: "縱深防禦（總整合）", src: "repo 06_SQLi/README（Teaching Notes）", core: true, diff: 3,
      q: "（總整合題）綜合整個 SQLi Lab，要真正防住 SQL Injection 並限縮損害，最完整的做法是？",
      options: ["Prepared Statement 為主、最小權限縮小爆炸半徑、SP 內不拼接輸入", "把查詢改成 Stored Procedure 封裝即可自動參數化", "用最小權限帳號連線，被注入也只能讀有限資料", "在前端用 JavaScript 過濾特殊字元再送出即可"],
      ans: 0,
      exp: "這是全 Lab 的核心：Prepared Statement（主要、語法層）+ 最小權限（縮小爆炸半徑、權限層）+ 不在 SP 內拼接輸入，三者縱深防禦。單靠 SP、單靠權限、或只靠前端檢查都會被繞過。",
      learn: { label: "OWASP：SQLi 防禦速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" }
    },

    /* ========= 第五章 SQL 加深（repo 05_SQL/imdbdemo.sql） ========= */
    {
      id: "5-08", ch: 5, topic: "CRUD", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 1,
      q: "SQL 的 CRUD 四大操作，與指令的對應何者正確？",
      options: [
        "Create=INSERT、Read=SELECT、Update=UPDATE、Delete=DELETE",
        "Create=SELECT、Read=INSERT、Update=DELETE、Delete=UPDATE",
        "Create=UPDATE、Read=DELETE、Update=INSERT、Delete=SELECT",
        "四者都用 SELECT 完成"
      ],
      ans: 0,
      exp: "CRUD＝Create(INSERT 新增)/Read(SELECT 查詢)/Update(UPDATE 修改)/Delete(DELETE 刪除)，是資料庫最基本的四種操作。",
      learn: { label: "SQLBolt：CRUD 練習", url: "https://sqlbolt.com/" }
    },
    {
      id: "5-09", ch: 5, topic: "分頁 LIMIT/OFFSET", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 2,
      q: "SQL 查詢 `SELECT * FROM titles LIMIT 5 OFFSET 10;` 會取出什麼？",
      options: [
        "跳過前 10 筆，取接續的 5 筆（分頁效果）",
        "取前 5 筆",
        "取第 5 到第 10 筆共 6 筆",
        "刪除前 10 筆"
      ],
      ans: 0,
      exp: "LIMIT 限制筆數、OFFSET 指定跳過幾筆。LIMIT 5 OFFSET 10＝略過前 10 筆後取 5 筆，是常見的分頁 (pagination) 寫法。",
      learn: { label: "SQLBolt：ORDER BY / LIMIT", url: "https://sqlbolt.com/lesson/filtering_sorting_query_results" }
    },
    {
      id: "5-10", ch: 5, topic: "聚合函數", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 2,
      q: "下列何者『不是』SQL 標準的聚合函數 (aggregate function)？",
      options: ["COUNT()", "AVG()", "SUM()", "MERGE()"],
      ans: 3,
      exp: "常見聚合函數：COUNT（筆數）、SUM（總和）、AVG（平均）、MIN、MAX。並無 MERGE() 這個聚合函數。",
      learn: { label: "W3Schools：SQL 聚合函數", url: "https://www.w3schools.com/sql/sql_count_avg_sum.asp" }
    },
    {
      id: "5-11", ch: 5, topic: "GROUP BY / HAVING", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 3,
      q: "要『依 type 分組計數，並只留下數量超過 1000 的組別』，WHERE 與 HAVING 該怎麼用？",
      options: ["用 HAVING COUNT(*) > 1000（過濾分組後的聚合結果）", "用 WHERE COUNT(*) > 1000（WHERE 可直接過濾聚合）", "用 GROUP BY COUNT(*) > 1000 一併分組並過濾", "先 ORDER BY COUNT(*) 再取大於 1000 的列"],
      ans: 0,
      exp: "WHERE 在分組『前』過濾單筆列、不能用聚合函數；HAVING 在 GROUP BY『後』過濾分組結果，才能寫 COUNT(*)>1000。這是常考的區別。",
      learn: { label: "SQLBolt：GROUP BY / HAVING", url: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2" }
    },
    {
      id: "5-12", card: "INNER JOIN 與 LEFT JOIN 的差別是什麼？", ch: 5, topic: "JOIN 類型", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 3,
      q: "關於 INNER JOIN 與 LEFT JOIN 的差別，下列何者正確？",
      options: ["INNER JOIN 取兩表交集；LEFT JOIN 保留左表全部、右缺補 NULL", "INNER JOIN 保留左表全部並補 NULL、LEFT 只取交集", "兩者結果相同，只是 LEFT JOIN 語法較新", "LEFT JOIN 只回傳右表獨有的列"],
      ans: 0,
      exp: "INNER JOIN＝交集（兩邊都有才出現）；LEFT JOIN＝保留左表全部，右表無對應處補 NULL（例：列出所有電影，沒評分的 rating 為 NULL）。",
      learn: { label: "SQLBolt：JOIN 教學", url: "https://sqlbolt.com/lesson/select_queries_with_outer_joins" }
    },
    {
      id: "5-13", ch: 5, topic: "JOIN（SQLite 限制）", src: "repo 05_SQL/imdbdemo.sql（註解）", core: false, diff: 2,
      q: "依 repo 註解，SQLite 對 RIGHT JOIN 的支援情況與替代做法是？",
      options: [
        "舊版 SQLite 不直接支援 RIGHT JOIN，可交換兩表順序改用 LEFT JOIN 達成相同效果",
        "SQLite 只支援 RIGHT JOIN，不支援 LEFT JOIN",
        "SQLite 完全不支援任何 JOIN",
        "RIGHT JOIN 與 INNER JOIN 完全相同"
      ],
      ans: 0,
      exp: "repo 註明 RIGHT JOIN 在（舊版）SQLite 會報錯，可把左右表對調並用 LEFT JOIN 得到等效結果。這是實作差異，跨資料庫時要留意。",
      learn: { label: "SQLite 官方：JOIN", url: "https://www.sqlite.org/syntax/join-operator.html" }
    },
    {
      id: "5-14", ch: 5, topic: "UNION vs UNION ALL", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 2,
      q: "UNION 與 UNION ALL 的差別是？",
      options: ["UNION 去除重複列；UNION ALL 保留全部、效能較快", "UNION ALL 去除重複；UNION 保留重複列", "兩者相同，UNION ALL 只是舊版寫法", "UNION 會自動排序、UNION ALL 隨機排列"],
      ans: 0,
      exp: "兩者都把多個查詢結果上下合併（欄位數與型別需相容）。UNION 做去重（需額外排序、較慢）；UNION ALL 不去重、較快。這個去重差異也是 union-based SQLi 常見細節。",
      learn: { label: "W3Schools：SQL UNION", url: "https://www.w3schools.com/sql/sql_union.asp" }
    },
    {
      id: "5-15", ch: 5, topic: "子查詢", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 3,
      q: "`SELECT ... WHERE r.rating > (SELECT AVG(rating) FROM ratings)` 這種寫法屬於？",
      options: [
        "子查詢 (subquery)：括號內先算出一個值，再供外層查詢比較",
        "交易 (transaction)",
        "觸發器 (trigger)",
        "外鍵約束"
      ],
      ans: 0,
      exp: "括號內的 SELECT 是子查詢，先算出全體平均評分，外層再篩選高於平均的電影。子查詢可回傳單值、一欄或一個暫時結果集。",
      learn: { label: "SQLBolt：子查詢概念", url: "https://sqlbolt.com/" }
    },
    {
      id: "5-16", ch: 5, topic: "字串比對 LIKE", src: "repo 05_SQL/imdbdemo.sql", core: false, diff: 1,
      q: "要搜尋 primary_title 中『包含』Star Wars 的電影，正確寫法是？",
      options: [
        "WHERE primary_title LIKE '%Star Wars%'",
        "WHERE primary_title = 'Star Wars'",
        "WHERE primary_title CONTAINS Star Wars",
        "WHERE primary_title > 'Star Wars'"
      ],
      ans: 0,
      exp: "LIKE 搭配萬用字元 %（任意長度字串）做模糊比對；%Star Wars% 表示前後可有任意字元。= 只做完全相等比對。",
      learn: { label: "W3Schools：SQL LIKE", url: "https://www.w3schools.com/sql/sql_like.asp" }
    },
    {
      id: "5-17", ch: 5, topic: "NULL 處理", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 2,
      q: "關於 SQL 的 NULL，下列何者正確？",
      options: [
        "判斷是否為空要用 IS NULL / IS NOT NULL；可用 COALESCE/IFNULL 提供預設值",
        "NULL 等於 0，可用 = 0 判斷",
        "NULL = NULL 會回傳 TRUE",
        "NULL 就是空字串 ''"
      ],
      ans: 0,
      exp: "NULL 代表『未知/無值』，不等於 0 也不等於空字串；不能用 =NULL 判斷，要用 IS NULL。COALESCE(x,'預設')／IFNULL 可在 x 為 NULL 時給替代值。",
      learn: { label: "SQLBolt：NULL 處理", url: "https://sqlbolt.com/lesson/select_queries_with_nulls" }
    },
    {
      id: "5-18", ch: 5, topic: "CASE WHEN", src: "repo 05_SQL/imdbdemo.sql", core: false, diff: 2,
      q: "SQL 中要依片長把資料分類成 Short/Medium/Long（條件邏輯），使用哪個語法？",
      options: ["CASE WHEN ... THEN ... ELSE ... END", "IF ELSE 區塊", "FOR 迴圈", "GOTO"],
      ans: 0,
      exp: "CASE WHEN 條件 THEN 值 ... ELSE 值 END 是 SQL 的條件邏輯運算式，可在 SELECT 中依條件輸出不同結果（如 runtime<90 → 'Short'）。",
      learn: { label: "W3Schools：SQL CASE", url: "https://www.w3schools.com/sql/sql_case.asp" }
    },
    {
      id: "5-19", ch: 5, topic: "索引與效能", src: "repo 05_SQL/imdbdemo.sql（EXPLAIN QUERY PLAN）", core: true, diff: 3,
      q: "對已建立索引的欄位做 ORDER BY，相較無索引的欄位，通常有什麼差別？",
      options: [
        "有索引可加速排序/查找；無索引常需全表掃描並用暫存結構排序（較慢）",
        "有沒有索引對效能完全沒差",
        "索引一定會讓查詢變慢",
        "索引只影響 INSERT，不影響查詢"
      ],
      ans: 0,
      exp: "索引像書的目錄：有索引時查找/排序可走索引（EXPLAIN 顯示 USING INDEX）；無索引則全表掃描並可能用暫存 B-Tree 排序。代價是索引會佔空間、略增寫入成本。",
      learn: { label: "Use The Index, Luke（索引入門）", url: "https://use-the-index-luke.com/" }
    },
    {
      id: "5-20", ch: 5, topic: "交易 Transaction", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 3,
      q: "用 BEGIN TRANSACTION ... COMMIT 包住『同時新增電影與評分』兩個操作，主要目的是確保什麼？",
      options: [
        "原子性 (Atomicity)：兩個操作要嘛全部成功，要嘛全部不生效（出錯可 ROLLBACK）",
        "讓查詢速度變快",
        "自動幫欄位加索引",
        "把明文密碼加密"
      ],
      ans: 0,
      exp: "交易確保一組操作的原子性——全成或全不成。中途出錯用 ROLLBACK 回復，避免只寫一半造成資料不一致。這是 ACID 特性中的 A。",
      learn: { label: "Wikipedia：ACID（交易特性）", url: "https://zh.wikipedia.org/zh-tw/ACID" }
    },

    /* ================= 多元題型 · 融會貫通 ================= */
    /* --- 填空（主動回想，強迫想出來而非認出來） --- */
    {
      id: "F-01", ch: 1, topic: "通訊埠（回想）", src: "1.2 OSI模型與TCP/IP協議 p.19", core: true, diff: 1,
      type: "fill", accept: ["443", "443/tcp", "tcp443"],
      q: "HTTPS 的標準通訊埠號是多少？（只填數字）",
      exp: "HTTPS = 443/tcp。對照：HTTP 80、SSH 22、DNS 53、FTP 21。",
      insight: "埠號要成組記：明文/加密成對——HTTP 80↔HTTPS 443、FTP 21↔SFTP 22(走SSH)、DNS 53。看到『加密版服務』就想到它多半換了一個埠，這也是埠掃描判斷服務的依據。",
      learn: { label: "IANA 埠號對照", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" }
    },
    {
      id: "F-02", ch: 2, topic: "Linux 權限（回想）", src: "2.2 Linux基礎操作 p.16,19", core: true, diff: 2,
      type: "fill", accept: ["755", "rwxr-xr-x"],
      q: "要讓權限成為「擁有者可讀寫執行、群組與其他人可讀與執行」，chmod 要給哪個三位數字？",
      exp: "rwx=7、r-x=5、r-x=5 → 755。記法：r=4、w=2、x=1 相加。",
      insight: "權限數字＝把 rwx 當二進位：r(4)w(2)x(1)。常見值背起來——755(程式/目錄)、644(一般檔)、600/700(敏感檔只給自己)、777(危險，人人可寫)。資安上看到 777 或全域可寫目錄就要警覺，這與 SUID 一起是提權的常見破口。",
      learn: { label: "Linux Journey：Permissions", url: "https://linuxjourney.com/lesson/file-permissions" }
    },
    {
      id: "F-03", ch: 6, topic: "SQLi 防禦（回想）", src: "repo 06_SQLi/README", core: true, diff: 2,
      type: "fill", accept: ["參數化查詢", "prepared statement", "預備語句", "預處理", "參數化"],
      q: "防禦 SQL Injection「最根本」的技術叫什麼？（中文或英文皆可）",
      exp: "參數化查詢 / Prepared Statement：讓使用者輸入永遠只當『資料』，不會被當成 SQL 語法解析。",
      insight: "把它想成『資料與程式碼分離』這個大原則的一個實例。同一原則在各領域換名字：SQL 叫參數化查詢、作業系統命令叫避免拼接改用參數陣列、前端顯示叫輸出編碼/textContent。凡是『把不可信輸入拼進要被解析執行的字串』就會出事——這是所有注入類漏洞的共通根因。",
      learn: { label: "OWASP：Query Parameterization", url: "https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html" }
    },
    {
      id: "F-04", ch: 5, topic: "SQL 子句（回想）", src: "repo 05_SQL/imdbdemo.sql", core: true, diff: 2,
      type: "fill", accept: ["HAVING", "having"],
      q: "GROUP BY 分組之後，要再依聚合結果（如 COUNT(*)>1000）過濾，用哪個關鍵字？",
      exp: "HAVING 過濾『分組後』的結果；WHERE 只能過濾『分組前』的單筆列、不能用聚合函數。",
      insight: "記住 SQL 邏輯執行順序：FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT。WHERE 在分組前、HAVING 在分組後，這就解釋了為何聚合函數只能寫在 HAVING。理解順序，很多『這裡能不能用別名/聚合』的題目都能自己推出來。",
      learn: { label: "SQLBolt：GROUP BY / HAVING", url: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2" }
    },
    {
      id: "F-05", ch: 4, topic: "OWASP（回想）", src: "4.1 OWASP Top 10 p.8", core: true, diff: 2,
      type: "fill", accept: ["存取控制失效", "broken access control", "存取控制", "broken access"],
      q: "依講義 OWASP Top 10（2025 版），排名第一 A01 的風險名稱是？",
      exp: "A01:2025＝存取控制失效 (Broken Access Control)。",
      insight: "本課用 2025 排序，別背成 2021 版（那版 A01 是注入）。理解為何『存取控制』排第一：多數 Web 功能的安全其實靠『這個人能不能做這件事』的檢查，一旦漏檢，改個 URL/參數就能越權——這也和第二章 Linux 的最小權限、第六章 DB 帳號權限切分是同一個『授權』大主題。",
      learn: { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }
    },

    /* --- 多選（要全對，逼你逐項判斷，不能猜一個） --- */
    {
      id: "M-01", ch: 4, topic: "XSS 防禦（多選）", src: "repo 04_WebsiteSecurity/01_xss.html", core: true, diff: 3,
      type: "multi", ans: [0, 1, 2],
      q: "下列哪些是有效的 XSS 防禦手段？（多選）",
      options: [
        "HTML 實體編碼（< 轉成 &lt;）",
        "為 Cookie 加上 HttpOnly",
        "設定 CSP 限制腳本來源、禁止行內腳本",
        "把使用者輸入直接用 innerHTML 塞進頁面"
      ],
      exp: "前三者皆為正確防禦；第四項用 innerHTML 直接輸出未過濾輸入，正是造成 XSS 的原因。",
      insight: "把 XSS 防禦分兩線思考：①『不要讓輸入變成可執行的 HTML/JS』——輸出編碼、用 textContent、CSP；②『就算被 XSS 了也少受傷』——HttpOnly 讓 JS 偷不到 Cookie。這種『主要防線＋降低災損』的雙層思路，和第六章 SQLi 的『參數化查詢＋最小權限』是完全一樣的縱深防禦模式。",
      learn: { label: "OWASP：XSS 防禦速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" }
    },
    {
      id: "M-02", ch: 2, topic: "權限提升（多選）", src: "2.2 Linux基礎操作 p.20~21,37", core: true, diff: 3,
      type: "multi", ans: [0, 1, 2],
      q: "下列哪些情況可能被利用來做 Linux 權限提升 (privilege escalation)？（多選）",
      options: [
        "擁有者為 root 且有漏洞的 SUID 程式",
        "設定錯誤、過度寬鬆的 sudo 權限",
        "全域可寫 (world-writable) 的目錄或被劫持的 PATH",
        "把敏感檔權限設為 600（只有擁有者可讀寫）"
      ],
      exp: "前三者都是常見提權破口；600 是『收緊』權限的正確做法，不是破口。",
      insight: "提權的本質是『用低權限帳號取得高權限執行』。SUID(以擁有者身分跑)、sudo 錯配、PATH 劫持(讓系統跑到你的假程式)全都是這條路徑的不同入口。防禦則反過來——最小權限、收緊敏感檔(600/700)、審查 SUID。這正對應第六章 DB 的最小權限與『縮小爆炸半徑』。",
      learn: { label: "GTFOBins：SUID 提權", url: "https://gtfobins.github.io/" }
    },
    {
      id: "M-03", ch: 6, topic: "SQLi 縱深防禦（多選）", src: "repo 06_SQLi/README", core: true, diff: 3,
      type: "multi", ans: [0, 1],
      q: "要「真正防住並限縮」SQL Injection 的損害，下列哪些該採用？（多選）",
      options: [
        "以參數化查詢 / Prepared Statement 為主要防線",
        "用最小權限的 DB 帳號連線以縮小爆炸半徑",
        "只要把查詢包成 Stored Procedure 就好",
        "只在前端用 JavaScript 檢查輸入即可"
      ],
      exp: "①②要並用：參數化查詢是語法層主要防線，最小權限是權限層降低災損。③SP 內若動態拼接仍會注入；④前端檢查可被繞過（直接送請求）。",
      insight: "這題把整個第六章縫起來：防線分層——語法層(參數化查詢)是主力、權限層(最小權限)縮小災損、而『包成 SP』或『前端檢查』都是常見的假安全感。安全要問『這層防的是什麼、能不能被繞過』，而不是『有沒有做某個動作』。",
      learn: { label: "OWASP：SQLi 防禦速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" }
    },
    {
      id: "M-04", ch: 1, topic: "熟知埠（多選）", src: "1.2 OSI模型與TCP/IP協議 p.19~21", core: false, diff: 2,
      type: "multi", ans: [0, 1, 2],
      q: "下列哪些服務使用的是熟知埠 (0–1023)？（多選）",
      options: ["HTTP (80)", "SSH (22)", "DNS (53)", "臨時的用戶端來源埠 (如 51000)"],
      exp: "80/22/53 都在 0–1023 熟知埠範圍；51000 屬於 49152–65535 的動態/私有埠，通常是用戶端連線時臨時分配的來源埠。",
      insight: "一次連線有兩個埠：伺服器端用『固定的熟知埠』(如 443) 讓人找得到，用戶端用『臨時的高位埠』當來源。在 Wireshark 看封包時，判斷誰是伺服器就看哪一端是熟知埠——這是讀封包、做流量分析的基本功。",
      learn: { label: "IANA 埠號對照", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" }
    },

    /* --- 跨章情境／整合（全方位貫穿） --- */
    {
      id: "X-01", ch: 4, topic: "跨章：注入的共通根因", src: "整合 ch4/ch6 + repo", core: true, diff: 3,
      q: "SQL Injection 與 XSS 表面上一個打資料庫、一個打瀏覽器，但它們最根本的『共通成因』是什麼？",
      options: ["不可信輸入被混進會被解析執行的內容（資料與程式碼未分離）", "都因為伺服器沒裝防火牆或 WAF 過濾流量", "都因為使用者密碼強度不足、容易被猜中", "都只發生在沒有啟用 HTTPS 的網站上"],
      ans: 0,
      exp: "SQLi 把輸入拼進 SQL 被資料庫執行；XSS 把輸入輸出到 HTML 被瀏覽器執行。共同點：不可信輸入被當成程式碼解析。",
      insight: "抓住這個大觀念，整個 Web 安全就串起來了：注入類漏洞＝『資料與程式碼混在一起』。所以防禦也同源——都要在『資料進入解析器之前』把它標記成純資料：SQL 用參數化查詢、HTML 用輸出編碼、命令列用參數陣列。換了場景，原則不變。",
      learn: { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }
    },
    {
      id: "X-02", ch: 4, topic: "跨章情境：辨識漏洞", src: "整合 ch4/ch6", core: true, diff: 2,
      q: "情境：在留言板送出的內容 `<script>steal()</script>` 被存進資料庫，之後每位開啟該頁的訪客瀏覽器都執行了它。這屬於什麼漏洞？",
      options: ["儲存型 XSS (Stored XSS)", "反射型 XSS (Reflected XSS)", "SQL Injection", "CSRF"],
      ans: 0,
      exp: "惡意腳本被『存到伺服器』並對每個讀取者執行 → 儲存型 XSS。反射型是夾在 URL 當次反射；SQLi 打的是資料庫查詢；CSRF 是偽造請求。",
      insight: "用『payload 從哪來、在哪執行』三問來分類 XSS：存進 DB→Stored、夾在 URL 當次反射→Reflected、純前端 JS 從 Source(如 location.hash) 流到 Sink(如 innerHTML)→DOM-based。同樣的『來源→執行點』分析法，也能用來理解 SQLi 的注入點。",
      learn: { label: "PortSwigger：XSS", url: "https://portswigger.net/web-security/cross-site-scripting" }
    },
    {
      id: "X-03", ch: 1, topic: "跨章：OSI 層對應攻擊", src: "整合 1.2 OSI 各層安全考量", core: true, diff: 3,
      type: "multi", ans: [0, 1, 2],
      q: "下列『攻擊 ↔ OSI 層』的對應，哪些正確？（多選）",
      options: [
        "ARP 欺騙 ↔ 第二層 資料鏈路層",
        "IP 欺騙 ↔ 第三層 網路層",
        "SYN 洪水 ↔ 第四層 傳輸層",
        "SQL Injection ↔ 第一層 實體層"
      ],
      exp: "ARP→L2、IP 欺騙→L3、SYN Flood(打 TCP)→L4 都正確；SQL Injection 是應用層(L7)漏洞，不是實體層。",
      insight: "把攻擊掛到 OSI 層上，能一眼看出『防禦要放哪一層』：L2 用埠安全/DAI 防 ARP、L3/L4 用防火牆與 SYN cookie、L7 用輸入驗證與 WAF。這張『分層地圖』把第一章(網路)、第四章(Web)、第七章(防火牆/IDS)全部連起來——資安幾乎都是在問『這發生在哪一層、那一層怎麼防』。",
      learn: { label: "Cloudflare：OSI 模型", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/open-systems-interconnection-model-osi/" }
    },
    {
      id: "X-04", ch: 6, topic: "跨章：為何權限不能取代參數化", src: "整合 ch2/ch6 repo", core: true, diff: 3,
      q: "為什麼「用最小權限的資料庫帳號」不能取代「參數化查詢」來防 SQL Injection？",
      options: ["最小權限只縮小損害範圍、注入仍會發生；參數化才從源頭阻止", "因為最小權限帳號會拖慢資料庫查詢速度", "因為參數化查詢其實就是最小權限的一種", "因為最小權限只能防 XSS、不能防 SQL 注入"],
      ans: 0,
      exp: "最小權限是『被攻破後』的損害控制（縮小爆炸半徑）；參數化查詢是『不讓攻擊成立』的源頭防護。層次不同，要並用。",
      insight: "這是縱深防禦的精髓：不同防線防的是攻擊鏈的不同階段——『防止發生』(參數化查詢) vs『限制後果』(最小權限)。同樣道理，XSS 的輸出編碼(防發生)＋HttpOnly(限後果)、Linux 的收緊權限(防發生)＋帳號隔離(限後果)。永遠問：這層在攻擊鏈的哪一段？只做後段而缺前段，等於門沒鎖只買保險。",
      learn: { label: "OWASP：資料庫安全速查表", url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html" }
    },
    {
      id: "X-05", ch: 3, topic: "跨章：前端安全 API", src: "整合 ch3 DOM + ch4 XSS", core: false, diff: 2,
      type: "multi", ans: [0, 1],
      q: "在 JavaScript 要把『使用者提供的字串』顯示到頁面上，下列哪些做法相對安全、不易造成 DOM-based XSS？（多選）",
      options: [
        "用 element.textContent = 使用者字串",
        "先做 HTML 實體編碼再輸出",
        "用 element.innerHTML = 使用者字串",
        "用 document.write(使用者字串)"
      ],
      exp: "textContent 把內容當純文字、不解析標籤；先做實體編碼也安全。innerHTML 與 document.write 會解析 HTML，是危險的 Sink。",
      insight: "第三章學的 DOM 操作，到第四章就變成安全問題：innerHTML/document.write 是危險 Sink，textContent 是安全 Sink。學任何前端 API 時多問一句『這會不會把字串當程式碼解析』，開發與資安的視角就接上了。",
      learn: { label: "MDN：Node.textContent", url: "https://developer.mozilla.org/zh-TW/docs/Web/API/Node/textContent" }
    },
    {
      id: "X-06", ch: 5, topic: "跨章：UNION 從查詢到攻擊", src: "整合 ch5 UNION + ch6 SQLi", core: true, diff: 3,
      q: "第五章學的 UNION（合併兩個查詢結果）為什麼會變成第六章 union-based SQL Injection 的關鍵手法？",
      options: ["攻擊者用 UNION 把自寫的 SELECT 接在原查詢後，撈出其他表資料", "因為 UNION 執行時會清空原本的資料表", "因為 UNION 能把攻擊者的資料加密回傳", "因為 UNION 只能在前端 JavaScript 執行"],
      ans: 0,
      exp: "注入點若可拼接，攻擊者用 `... UNION SELECT 帳號,密碼 FROM users` 把敏感資料併進原本的輸出。前提是欄位數要相同——這就是為何先用 order by 試出欄位數。",
      insight: "這題示範『正常功能被武器化』：UNION 本是合法查詢工具，一旦注入點允許拼接，就成了跨表竊資料的武器。所以第六章的攻擊流程(order by 試欄位數→union select 撈資料)其實是第五章 SQL 語法的直接應用。懂 SQL 才懂 SQLi，防守方也一樣。",
      learn: { label: "PortSwigger：UNION attacks", url: "https://portswigger.net/web-security/sql-injection/union-attacks" }
    },
    {
      id: "X-07", card: "CSRF 與 XSS 的核心差異是什麼？（一句話：一個跑我的碼、一個借你的身分）", ch: 4, topic: "跨章：CSRF vs XSS", src: "整合 ch4 repo 04", core: true, diff: 3,
      q: "CSRF 與 XSS 常被搞混，關於兩者的核心差異，何者正確？",
      options: ["XSS 是注入並執行惡意腳本；CSRF 是冒用已登入身分偽造請求", "兩者相同，都是把腳本注入頁面讓瀏覽器執行", "CSRF 必須先用 SQL 注入取得資料庫權限", "XSS 只影響伺服器、CSRF 只影響資料庫"],
      ans: 0,
      exp: "XSS 重點在『執行了不該執行的腳本』；CSRF 重點在『瀏覽器自動帶上 Cookie，讓攻擊者偽造的請求被當成本人操作』。防禦也不同：XSS→輸出編碼/CSP；CSRF→CSRF Token/SameSite Cookie。",
      insight: "一句話記：XSS 是『我讓你的瀏覽器跑我的碼』，CSRF 是『我借你的身分送一個請求』。有趣的是若網站有 XSS，往往能繞過 CSRF 防護——這說明漏洞會互相加乘，資安要看『組合拳』而非單點。",
      learn: { label: "PortSwigger：CSRF", url: "https://portswigger.net/web-security/csrf" }
    },

    /* ================= 第一章加深 · 多角度單選（1.3 IP / 1.4 服務） ================= */
    /* --- 1.3 IP 位址與子網路 --- */
    {
      id: "1-13", ch: 1, topic: "私有 IP", src: "1.3 IP網路基礎 p.14", core: true, diff: 2,
      q: "依 RFC 1918，下列哪一個『不是』私有 IP 位址範圍？",
      options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "8.8.8.0/24"],
      ans: 3,
      exp: "私有範圍：10.0.0.0/8、172.16.0.0/12、192.168.0.0/16。8.8.8.8 是 Google 的公共 DNS，屬公共 IP。",
      insight: "記三段私有網段：10 開頭(大)、172.16–172.31(中)、192.168(小)。它們不會在公網路由，要靠 NAT 轉成公共 IP 才能上網——這也是為什麼你家電腦都是 192.168.x.x 卻能連外。",
      learn: { label: "Cloudflare：私有 IP", url: "https://www.cloudflare.com/zh-tw/learning/network-layer/internet-protocol/" }
    },
    {
      id: "1-14", ch: 1, topic: "特殊 IP", src: "1.3 IP網路基礎 p.16", core: false, diff: 2,
      q: "127.0.0.1 這個 IP 位址的用途是？",
      options: ["本機回送位址 (localhost)，測試本機網路功能", "預設閘道", "廣播位址", "公共 DNS 伺服器"],
      ans: 0,
      exp: "127.0.0.1 是 loopback / localhost，指向自己，用來測試本機 TCP/IP 是否正常。169.254.x.x 是 DHCP 失敗時的 APIPA；255.255.255.255 是廣播。",
      learn: { label: "Wikipedia：localhost", url: "https://zh.wikipedia.org/wiki/Localhost" }
    },
    {
      id: "1-15", ch: 1, topic: "子網路遮罩", src: "1.3 IP網路基礎 p.32~33", core: true, diff: 3,
      q: "IP 192.168.1.15 搭配子網路遮罩 255.255.255.0，其『網路位址』是多少？",
      options: ["192.168.1.0", "192.168.1.15", "192.168.1.255", "192.168.0.0"],
      ans: 0,
      exp: "IP 與遮罩做位元 AND：遮罩前 24 位為 1、後 8 位為 0，故保留 192.168.1、主機位歸零 → 網路位址 192.168.1.0。",
      insight: "『網路位址＝IP AND 遮罩』是子網計算的核心。遮罩裡的 1 圈出網路部分、0 圈出主機部分。學會這個，就能推出網路位址、廣播位址(主機位全 1)、可用範圍——子網題全靠它。",
      learn: { label: "SubnettingPractice（練習）", url: "https://subnetipv4.com/" }
    },
    {
      id: "1-16", ch: 1, topic: "CIDR", src: "1.3 IP網路基礎 p.13,35", core: true, diff: 2,
      q: "CIDR 表示法 /24 等同於下列哪個子網路遮罩？",
      options: ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.255"],
      ans: 0,
      exp: "/24＝前 24 位為 1＝255.255.255.0。/16＝255.255.0.0、/8＝255.0.0.0、/32＝單一主機。",
      insight: "/N 就是『遮罩裡有幾個連續的 1』。常見對照背起來：/8、/16、/24 剛好落在位元組邊界。前綴愈長 → 網路愈小 → 可用主機愈少。",
      learn: { label: "Cloudflare：什麼是 CIDR", url: "https://www.cloudflare.com/zh-tw/learning/network-layer/what-is-cidr/" }
    },
    {
      id: "1-17", ch: 1, topic: "可用主機數", src: "1.3 IP網路基礎 p.34,59", core: false, diff: 3, kind: "fact",
      q: "一個 /26 的子網路，可用主機數量是多少？",
      options: ["64", "62", "30", "126"],
      ans: 1,
      exp: "/26 主機位＝32−26＝6 位，2^6＝64，扣掉網路位址與廣播位址 → 64−2＝62。",
      insight: "公式：可用主機＝2^(主機位數)−2。那個『−2』永遠是扣掉網路位址(主機位全0)和廣播位址(主機位全1)。/24→254、/25→126、/26→62、/30→2(點對點常用)。",
      learn: { label: "SubnettingPractice", url: "https://subnetipv4.com/" }
    },
    {
      id: "1-18", ch: 1, topic: "NAT", src: "1.3 IP網路基礎 p.17,18", core: true, diff: 2,
      q: "關於 NAT（網路位址轉換）的敘述，何者最正確？",
      options: [
        "把私有 IP 轉為公共 IP，節省 IPv4 位址並隱藏內部網路結構；PAT 用不同埠號做多對一映射",
        "NAT 是一種加密協定，可取代 HTTPS",
        "NAT 只能用於 IPv6",
        "NAT 會把公共 IP 轉成私有 IP 供外網直接連線"
      ],
      ans: 0,
      exp: "NAT 讓多台私有 IP 主機共用公共 IP 上網（PAT/NAPT 靠埠號區分），順帶隱藏內部結構。但講義提醒：NAT 不是安全機制的替代品，仍需防火牆。",
      insight: "NAT 之所以『看起來安全』，是因為外部無法主動連進內部——但那是副作用不是設計目的。這呼應資安的常見陷阱：把某功能的副作用當成防護（就像第六章『Stored Procedure 不等於安全』）。",
      learn: { label: "Cloudflare：什麼是 NAT", url: "https://www.cloudflare.com/zh-tw/learning/network-layer/what-is-nat/" }
    },
    {
      id: "1-19", ch: 1, topic: "VLAN vs 子網路", src: "1.3 IP網路基礎 p.54", core: false, diff: 3,
      q: "VLAN 與子網路 (Subnet) 分別在 OSI 哪一層做網路分段？",
      options: [
        "VLAN 在第二層（資料鏈路層）、子網路在第三層（網路層）",
        "兩者都在第三層",
        "VLAN 在第三層、子網路在第二層",
        "兩者都在第七層"
      ],
      ans: 0,
      exp: "VLAN 用標籤在 L2 分段、子網路用 IP/遮罩在 L3 分段。通常一個 VLAN 對應一個子網路，但非必須。",
      insight: "把它接回第一章 OSI 分層：L2 看 MAC/標籤、L3 看 IP。網路分段(VLAN/子網/DMZ)的目的都是『限制橫向移動、縮小事故範圍』——這和第六章 DB 的最小權限、爆炸半徑是同一種資安思維，只是換到網路層。",
      learn: { label: "Cloudflare：VLAN", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-lan/" }
    },
    {
      id: "1-20", ch: 1, topic: "ARP 安全", src: "1.3 IP網路基礎 p.84", core: false, diff: 2,
      q: "在 ARP 表中發現『多個不同的 MAC 位址對應到同一個 IP』，最可能代表什麼？",
      options: ["ARP 欺騙 (ARP Spoofing) 攻擊的跡象", "網路速度變快", "DNS 設定正確", "IP 位址用完了"],
      ans: 0,
      exp: "正常情況一個 IP 只對應一個 MAC。同一 IP 出現多個 MAC，常是有人偽造 ARP 回應想攔截流量（中間人）。",
      insight: "這題把『指令(arp)→現象→攻擊(ARP欺騙 L2)→防禦』串起來。資安很多時候就是『觀察到異常對應關係』——一 IP 多 MAC(ARP欺騙)、一域名多結果(DNS劫持)、一帳號多地登入(盜用)，都是同一種偵測直覺。",
      learn: { label: "Cloudflare：ARP 欺騙", url: "https://www.cloudflare.com/learning/ssl/glossary/what-is-arp-spoofing/" }
    },
    /* --- 1.4 DNS --- */
    {
      id: "1-21", ch: 1, topic: "DNS 概念", src: "1.4 基礎網路服務 p.4", core: true, diff: 1,
      q: "DNS（域名系統）的主要功能是？",
      options: [
        "將網域名稱（如 www.google.com）解析成 IP 位址",
        "加密網頁流量",
        "分配私有 IP 位址",
        "掃描開放的通訊埠"
      ],
      ans: 0,
      exp: "DNS 是分散式資料庫，像網際網路的電話簿，把好記的網域名稱轉成機器用的 IP 位址。加密是 TLS、配 IP 是 DHCP、掃埠是 Nmap。",
      learn: { label: "Cloudflare：什麼是 DNS", url: "https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/" }
    },
    {
      id: "1-22", ch: 1, topic: "DNS 記錄", src: "1.4 基礎網路服務 p.10~11", core: true, diff: 2,
      q: "DNS 記錄類型中，將『域名對應到 IPv4 位址』的是哪一種？",
      options: ["A 記錄", "AAAA 記錄", "MX 記錄", "CNAME 記錄"],
      ans: 0,
      exp: "A＝域名→IPv4；AAAA＝域名→IPv6；MX＝郵件伺服器；CNAME＝別名（域名指向另一域名）；NS＝權威名稱伺服器；PTR＝反向解析。",
      insight: "記法：A 是 Address(IPv4)、AAAA 是四倍長的位址(IPv6, 128 位)、MX 的 M 是 Mail、NS 是 Name Server、PTR 是反查(IP→域名)。考題常拿這幾個互相混淆，成組記最不會錯。",
      learn: { label: "Cloudflare：DNS 記錄類型", url: "https://www.cloudflare.com/zh-tw/learning/dns/dns-records/" }
    },
    {
      id: "1-23", ch: 1, topic: "DNS 查詢", src: "1.4 基礎網路服務 p.8", core: false, diff: 2,
      q: "「客戶端只發一次請求，就由 DNS 伺服器負責取得完整答案」屬於哪種查詢？",
      options: ["遞迴查詢 (Recursive)", "迭代查詢 (Iterative)", "反向查詢", "區域傳輸"],
      ans: 0,
      exp: "遞迴查詢：客戶端把工作全交給 DNS 伺服器（通常是 ISP 的）代為完成。迭代查詢是伺服器之間互相問、每次得到部分答案再往下查。",
      learn: { label: "Cloudflare：遞迴 vs 迭代", url: "https://www.cloudflare.com/zh-tw/learning/dns/what-is-recursive-dns/" }
    },
    {
      id: "1-24", card: "DNSSEC 與 DoH/DoT 各自保護什麼？（一個管『驗證/完整性』、一個管『加密/機密性』）", ch: 1, topic: "DNS 安全", src: "1.4 基礎網路服務 p.14", core: true, diff: 3,
      q: "關於 DNSSEC 與 DoH/DoT，下列敘述何者正確？",
      options: ["DNSSEC 做來源驗證與完整性（不加密）；DoH/DoT 加密查詢防竊聽", "DNSSEC 會加密整個 DNS 查詢內容以防竊聽", "DoH/DoT 只做來源驗證、確保記錄未被竄改", "三者都同時提供加密與驗證，功能完全一樣"],
      ans: 0,
      exp: "DNSSEC 用數位簽章確保記錄真實、未被竄改（防投毒/劫持），但查詢本身仍是明文；DoH(走 443)/DoT(走 853)則加密查詢防窺探。",
      insight: "這題點破一個大觀念：『驗證完整性』與『加密機密性』是兩回事。DNSSEC 管『這答案是不是真的』、DoH/DoT 管『別人看不看得到我問了什麼』。同樣的區分也出現在 HTTPS(既驗證又加密)、數位簽章 vs 加密——搞混這兩者是資安常見錯誤。",
      learn: { label: "Cloudflare：DNSSEC", url: "https://www.cloudflare.com/zh-tw/dns/dnssec/how-dnssec-works/" }
    },
    /* --- 1.4 HTTP / HTTPS --- */
    {
      id: "1-25", ch: 1, topic: "HTTP 狀態碼", src: "1.4 基礎網路服務 p.23", core: true, diff: 2,
      q: "HTTP 狀態碼 401 與 403 的差別是？",
      options: [
        "401 = 需要身份驗證（還沒登入）；403 = 已知你是誰但『權限不足』被拒絕",
        "401 = 找不到頁面；403 = 伺服器錯誤",
        "兩者完全相同",
        "401 = 成功；403 = 重定向"
      ],
      ans: 0,
      exp: "401 Unauthorized＝尚未通過驗證，請先登入；403 Forbidden＝身份沒問題但無權存取此資源。404 才是找不到、5xx 是伺服器錯。",
      insight: "把狀態碼按百位分類記：2xx 成功、3xx 轉址(301永久/302臨時)、4xx 你的錯(400語法/401要登入/403沒權限/404找不到)、5xx 伺服器的錯。401 vs 403＝『沒驗證』vs『沒授權』，正好對應第四章 OWASP 的認證失效 vs 存取控制失效。",
      learn: { label: "MDN：HTTP 狀態碼", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status" }
    },
    {
      id: "1-26", ch: 1, topic: "HTTPS", src: "1.4 基礎網路服務 p.28", core: true, diff: 1,
      q: "HTTPS 與 HTTP 的關係，以及其預設通訊埠是？",
      options: [
        "HTTPS = HTTP + TLS/SSL，預設埠 443",
        "HTTPS = HTTP + FTP，預設埠 21",
        "HTTPS 和 HTTP 完全無關，預設埠 22",
        "HTTPS = HTTP + DNS，預設埠 53"
      ],
      ans: 0,
      exp: "HTTPS 是在 HTTP 之下加了 TLS/SSL 這層加密，走 443 埠，提供機密性、身份驗證與完整性，防中間人攻擊。",
      insight: "HTTPS 一次解決 HTTP 的三個弱點：明文(→加密)、無法確認伺服器(→憑證驗證)、可被竄改(→完整性)。用 Wireshark 看：HTTP 內容全裸、HTTPS 只看得到加密資料——這也是為何抓包分析要區分兩者。",
      learn: { label: "Cloudflare：什麼是 HTTPS", url: "https://www.cloudflare.com/zh-tw/learning/ssl/what-is-https/" }
    },
    {
      id: "1-27", ch: 1, topic: "Cookie 安全屬性", src: "1.4 基礎網路服務 p.26", core: true, diff: 3,
      q: "Cookie 的三個安全屬性中，用來『防止 CSRF』的是哪一個？",
      options: [
        "SameSite（限制跨站請求自動帶上 Cookie）",
        "Secure（只在 HTTPS 傳輸）",
        "HttpOnly（禁止 JavaScript 讀取）",
        "Domain（限制網域）"
      ],
      ans: 0,
      exp: "SameSite=Strict/Lax 讓 Cookie 不隨跨站請求自動送出 → 防 CSRF；Secure 防明文竊聽；HttpOnly 防 XSS 竊取 Cookie。",
      insight: "三個屬性各擋一種威脅，一定要分清楚：Secure↔竊聽、HttpOnly↔XSS、SameSite↔CSRF。這題把第一章(Cookie 機制)、第三/四章(XSS、CSRF)縫在一起——同一個 Cookie，用不同屬性防不同攻擊，正是縱深防禦的縮影。",
      learn: { label: "MDN：Cookie 安全", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies#restrict_access_to_cookies" }
    },
    /* --- 1.4 FTP / SSH --- */
    {
      id: "1-28", ch: 1, topic: "FTP", src: "1.4 基礎網路服務 p.35", core: false, diff: 2,
      q: "傳統 FTP 的特性，下列何者正確？",
      options: [
        "使用兩個連接（21 控制、20 資料），且帳密與檔案皆『明文』傳輸",
        "只用單一加密連接",
        "預設走 443 埠並加密",
        "與 SSH 相同、天生安全"
      ],
      ans: 0,
      exp: "FTP 用 21(控制)/20(資料)兩條連接，且認證與內容都是明文，易被監聽。安全替代：FTPS(FTP+TLS)、SFTP(走 SSH 22)。",
      insight: "記『明文老協定 → 加密替代品』這組對照：FTP→FTPS/SFTP、Telnet→SSH、HTTP→HTTPS。看到明文協定就想到它的加密版，這也是滲透測試找弱點、和防守方加固的共同清單。",
      learn: { label: "Cloudflare：FTP", url: "https://www.cloudflare.com/learning/ddos/glossary/file-transfer-protocol-ftp/" }
    },
    {
      id: "1-29", ch: 1, topic: "SSH vs Telnet", src: "1.4 基礎網路服務 p.45~46", core: true, diff: 2,
      q: "關於 SSH 與 Telnet，下列敘述何者正確？",
      options: [
        "SSH 加密傳輸、走 22 埠；Telnet 是其前身、完全明文，公網應避免使用",
        "Telnet 加密、SSH 明文",
        "兩者都走 443 埠且加密",
        "SSH 只能傳檔不能遠端登入"
      ],
      ans: 0,
      exp: "SSH（22 埠）提供加密通道、強認證與完整性檢查，可遠端登入/傳檔/埠轉發；Telnet 明文傳輸，公共網路上使用極不安全。",
      insight: "SSH 的公鑰認證比密碼認證更安全（不怕暴力破解、便於自動化）：公鑰放伺服器 authorized_keys、私鑰留客戶端。這與第二章 Linux 的『禁止 root 直接登入、fail2ban 限制嘗試』是同一套主機加固思路。",
      learn: { label: "Cloudflare：什麼是 SSH", url: "https://www.cloudflare.com/zh-tw/learning/access-management/what-is-ssh/" }
    },

    /* ================= 第二章加深 · 多角度單選（2.2 Linux） ================= */
    {
      id: "2-09", ch: 2, topic: "權限符號法", src: "2.2 Linux基礎操作 p.16,17", core: true, diff: 2,
      q: "檔案權限顯示為 -rwxr-x---，代表下列哪一種存取權限？",
      options: [
        "擁有者可讀寫執行、群組可讀與執行、其他人完全沒有權限",
        "所有人都可讀寫執行",
        "只有其他人可讀",
        "擁有者只能讀"
      ],
      ans: 0,
      exp: "九碼分三組：擁有者 rwx(7)、群組 r-x(5)、其他 ---(0)，即 chmod 750。開頭的 - 表示一般檔案。",
      insight: "讀權限字串就切三段各 3 碼、每段換數字(rwx=7)。這題等於 chmod 750。把符號法↔數字法自由互換，是第二章權限題的基本功，也連到 SUID/敏感檔 600 等安全設定。",
      learn: { label: "Linux Journey：Permissions", url: "https://linuxjourney.com/lesson/file-permissions" }
    },
    {
      id: "2-10", ch: 2, topic: "Sticky Bit", src: "2.2 Linux基礎操作 p.20", core: false, diff: 3,
      q: "/tmp 目錄常設定 Sticky Bit，其作用是？",
      options: [
        "限制刪除：即使目錄可寫，使用者也只能刪自己的檔案，不能刪別人的",
        "讓所有人都能刪任何檔案",
        "以擁有者權限執行程式",
        "禁止任何人寫入"
      ],
      ans: 0,
      exp: "Sticky Bit(1) 用於共用可寫目錄(如 /tmp)：大家都能建檔，但只能刪自己的，防止互刪。SUID(4) 才是以擁有者權限執行。",
      insight: "三個特殊權限別混：SUID(以檔案擁有者身分執行,提權風險)、SGID(以群組身分執行)、Sticky(限制刪除)。SUID 是攻擊面、Sticky 是保護措施——同屬『特殊權限』卻方向相反，正是考題愛設的陷阱。",
      learn: { label: "Linux Journey：Permissions", url: "https://linuxjourney.com/lesson/file-permissions" }
    },
    {
      id: "2-11", ch: 2, topic: "網路指令", src: "2.2 Linux基礎操作 p.12", core: false, diff: 2,
      q: "在 Linux 要查看目前的網路連線狀態、偵測是否有未授權的對外連線，最適合的指令是？",
      options: ["netstat / ss", "chmod", "grep", "passwd"],
      ans: 0,
      exp: "netstat/ss 顯示連線狀態與監聽埠（ss 是現代替代品，-t TCP、-u UDP、-l 監聽、-n 數字）。chmod 改權限、grep 搜文字、passwd 改密碼。",
      insight: "把主機監控指令成組記：ss/netstat 看連線、ps aux 看程序、tail -f 看日誌、lsof 看開啟的檔。資安監控就是這幾把刀輪流用——發現可疑外連(ss)→找出是哪個程序(ps)→查它動了什麼(lsof/日誌)。",
      learn: { label: "Linux Journey", url: "https://linuxjourney.com/" }
    },

    /* ================= 第四章加深 · 多角度單選（4.1 OWASP 2025） ================= */
    {
      id: "4-13", ch: 4, topic: "OWASP 安全原則", src: "4.1 OWASP Top 10 p.7", core: false, diff: 2,
      q: "下列何者『不是』講義列出的 OWASP 安全設計原則？",
      options: [
        "盡量擴大攻擊面以分散風險",
        "最小權限原則 (least privilege)",
        "縱深防禦 (defense in depth)",
        "職責分離 (separation of duties)"
      ],
      ans: 0,
      exp: "正確原則含：最小化攻擊面、最小權限、縱深防禦、職責分離、保持安全簡單、正確修復問題。『擴大攻擊面』與資安背道而馳。",
      insight: "這些原則是整門課的骨架：最小權限(第2章Linux/第6章DB帳號)、縱深防禦(第6章SQLi多層/第4章Cookie屬性)、最小化攻擊面(第1章關閉不必要的埠)。原則不變，只是換到不同章節的場景反覆出現。",
      learn: { label: "OWASP：安全設計原則", url: "https://owasp.org/www-project-top-ten/" }
    },
    {
      id: "4-14", ch: 4, topic: "OWASP A04 加密", src: "4.1 OWASP Top 10 p.11", core: true, diff: 2,
      q: "OWASP『加密機制失效 (Cryptographic Failures)』的常見案例與防護，下列何者正確？",
      options: [
        "案例：明文傳輸敏感資料、用弱加密演算法；防護：實施 HTTPS、使用強演算法、妥善管理金鑰",
        "案例：密碼太長；防護：改用明文",
        "案例：開了 HTTPS；防護：關掉加密",
        "與加密完全無關"
      ],
      ans: 0,
      exp: "加密失效常見於明文傳輸、弱演算法、不當金鑰管理；防護為 HTTPS、強加密演算法、妥善保護與更新金鑰。",
      insight: "把它接回第一章：HTTP 明文的三大弱點(可竊聽/可竄改/無法驗證身份)正是『加密失效』的具體表現，HTTPS 就是防護。第一章的網路服務知識，到第四章就變成 OWASP 的風險項目——知識是連續的。",
      learn: { label: "OWASP：Cryptographic Failures", url: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/" }
    },
    {
      id: "4-15", ch: 4, topic: "OWASP A07 認證", src: "4.1 OWASP Top 10 p.14", core: true, diff: 2,
      q: "針對『認證失效 (Authentication Failures)』，下列何者是正確的防護措施？",
      options: [
        "強密碼策略、多因素認證 (MFA)、安全的會話管理",
        "允許弱密碼以方便使用者",
        "把 Session ID 放在網址上公開",
        "移除所有登入機制"
      ],
      ans: 0,
      exp: "認證失效常見於弱密碼、缺乏 MFA、會話劫持；防護為強密碼策略、多因素認證、安全會話管理。",
      insight: "認證(你是誰) vs 授權/存取控制(你能做什麼)是兩件事，分別是 OWASP 的 A07 與 A01。對照第一章 HTTP：401(沒認證)對認證失效、403(沒授權)對存取控制失效。把這組對立概念釘死，很多題自然會分。",
      learn: { label: "OWASP：Authentication Failures", url: "https://owasp.org/www-project-top-ten/" }
    },

    /* ================= 全 PDF 精讀補充題（尚未細作的簡報內容） ================= */
    /* --- 1.1 網路基本概念 --- */
    {
      id: "1-30", ch: 1, topic: "網路類型", src: "1.1 網路基本概念 p.8~9", core: false, diff: 1,
      q: "關於 LAN 與 WAN 的區別，下列何者正確？",
      options: [
        "LAN 覆蓋範圍小、傳輸快（如教室/家庭）；WAN 跨城市或國家（如跨國企業網路）",
        "LAN 一定比 WAN 慢",
        "WAN 只用於單一房間內",
        "兩者範圍完全相同"
      ],
      ans: 0,
      exp: "LAN(區域網路)範圍小、速度高；WAN(廣域網路)跨地理範圍大，常用 VPN 加密保護傳輸、面臨 DDoS 等公共基礎設施風險。",
      learn: { label: "Cloudflare：LAN/WAN", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-lan/" }
    },
    {
      id: "1-31", ch: 1, topic: "無線安全", src: "1.1 網路基本概念 p.10", core: false, diff: 2,
      q: "關於有線與無線網路的安全性，下列敘述何者正確？",
      options: [
        "無線信號易被截獲、安全性較低，應使用強加密（如 WPA3）與認證機制",
        "無線網路天生比有線安全",
        "有線網路無法加密",
        "WPA3 是一種病毒"
      ],
      ans: 0,
      exp: "無線靈活但信號易被截獲，安全性較有線低，需靠 WPA3 等強加密與認證彌補。有線一般較穩定安全。",
      learn: { label: "Wi-Fi Alliance：WPA3", url: "https://www.wi-fi.org/discover-wi-fi/security" }
    },
    {
      id: "1-32", ch: 1, topic: "網路效能指標", src: "1.1 網路基本概念 p.12", core: false, diff: 2,
      q: "網路效能指標中，「數據從來源傳到目的地所需的時間」是指哪一項？",
      options: ["延遲 (Latency)", "頻寬 (Bandwidth)", "吞吐量 (Throughput)", "抖動 (Jitter)"],
      ans: 0,
      exp: "延遲＝傳輸所需時間；頻寬＝最大理論速率；吞吐量＝實際傳輸率；抖動＝延遲的變化程度；封包遺失率＝未成功傳輸比例。",
      learn: { label: "Cloudflare：什麼是延遲", url: "https://www.cloudflare.com/zh-tw/learning/performance/glossary/what-is-latency/" }
    },
    {
      id: "1-33", ch: 1, topic: "資安設備 IDS/IPS", src: "1.1 網路基本概念 p.14", core: true, diff: 2, examKey: true,
      q: "IDS 與 IPS 最關鍵的差別是什麼？",
      options: ["IDS 只偵測並告警入侵；IPS 能主動阻擋攻擊", "IDS 會主動阻擋攻擊，IPS 只負責記錄告警", "兩者相同，都會即時阻斷可疑連線", "IDS 用於內網、IPS 只用於防火牆外側"],
      ans: 0,
      exp: "IDS(入侵偵測系統)偵測異常並發出告警但不擋；IPS(入侵防禦系統)在偵測到攻擊時能主動阻斷。NAC 管設備入網、SIEM 集中日誌分析。",
      insight: "『偵測 vs 阻擋』這組對比貫穿整門課：IDS/IPS、WAF 的監控模式 vs 主動模式、資安的『偵測』與『防禦』兩種功能。同一威脅，先能看見(偵測)才談得上攔阻(防禦)——這也對應第七章 IDS/IPS 與防火牆的分工。",
      learn: { label: "Cloudflare：IDS vs IPS", url: "https://www.cloudflare.com/learning/ddos/glossary/intrusion-detection-system/" }
    },
    {
      id: "1-34", ch: 1, topic: "中間人攻擊", src: "1.1 網路基本概念 p.17", core: true, diff: 2,
      q: "在公共 Wi-Fi 上遭竊聽的『中間人攻擊 (MITM)』，最主要的防禦是？",
      options: ["使用 HTTPS 加密、VPN 與憑證驗證", "定期更換 Wi-Fi 密碼並隱藏 SSID", "把敏感資料改用 GET 方法傳送", "安裝防毒軟體並定期全盤掃描"],
      ans: 0,
      exp: "MITM 靠攔截明文竊聽/竄改；用 HTTPS/VPN 加密通道、驗證憑證即可讓攔截者看不懂也改不了內容。",
      insight: "MITM 的剋星永遠是『端到端加密＋身份驗證』。這把第一章(HTTPS/VPN)、1.4(TLS 憑證)、第四章(加密機制失效)全串起來——只要通道加密且能驗證對方身份，中間人就無計可施。",
      learn: { label: "Cloudflare：中間人攻擊", url: "https://www.cloudflare.com/zh-tw/learning/security/threats/man-in-the-middle-attack/" }
    },

    /* --- 2.1 / 2.3 系統基礎（Windows / Linux） --- */
    {
      id: "2-12", ch: 2, topic: "核心/使用者模式", src: "2.1 作業系統基礎 p.6", core: true, diff: 2, examKey: true,
      q: "作業系統為何要分「核心模式 (Kernel Mode)」與「使用者模式 (User Mode)」？",
      options: ["核心模式可直存硬體、權限最高；使用者模式受限，藉此隔離風險", "為了讓系統開機更快、減少記憶體用量", "兩種模式權限相同，只是執行的程式不同", "使用者模式權限最高、可直接存取硬體"],
      ans: 0,
      exp: "核心模式直接管理硬體與資源、權限最高；一般應用跑在受限的使用者模式。這種分層是為了把不可信的程式關在低權限，避免直接搞垮系統。",
      insight: "這就是『權限分層／最小權限』在作業系統層的體現——和 Linux 的一般使用者 vs root、資料庫的 webtable vs 高權限帳號、網路的分段是同一種思維：把能造成大破壞的能力收在最小範圍。",
      learn: { label: "Wikipedia：保護環", url: "https://zh.wikipedia.org/wiki/%E4%BF%9D%E8%AD%B7%E7%92%B0" }
    },
    {
      id: "2-13", ch: 2, topic: "Windows UAC", src: "2.3 Windows系統操作 p.10 / 2.1 p.6", core: true, diff: 2,
      q: "Windows 的 UAC（使用者帳戶控制）主要作用是？",
      options: [
        "在執行需要系統管理權限的操作前跳出確認，避免程式在使用者不知情下取得高權限",
        "加速開機",
        "掃描病毒",
        "加密整顆硬碟"
      ],
      ans: 0,
      exp: "UAC 讓使用者平時以標準權限運作，需提權時才彈出同意視窗，降低惡意程式偷偷提權的機會。磁碟加密是 BitLocker、防毒是 Defender。",
      learn: { label: "Microsoft：UAC", url: "https://learn.microsoft.com/zh-tw/windows/security/application-security/application-control/user-account-control/" }
    },
    {
      id: "2-14", ch: 2, topic: "Windows 加密", src: "2.3 Windows系統操作 p.21", core: false, diff: 2,
      q: "Windows 中 BitLocker 與 EFS 的差別是？",
      options: [
        "BitLocker 加密『整顆磁碟/磁區』；EFS 加密『個別檔案或資料夾』",
        "兩者都只能加密單一檔案",
        "BitLocker 是防毒、EFS 是防火牆",
        "兩者完全相同"
      ],
      ans: 0,
      exp: "BitLocker 是全磁碟加密（常搭配 TPM 晶片與安全開機）；EFS(加密檔案系統)針對個別檔案/資料夾加密。",
      learn: { label: "Microsoft：BitLocker", url: "https://learn.microsoft.com/zh-tw/windows/security/operating-system-security/data-protection/bitlocker/" }
    },
    {
      id: "2-15", card: "MFA 的三大類因素是什麼？指紋／臉部辨識屬於哪一類？", ch: 2, topic: "多因素驗證", src: "2.1 作業系統基礎 p.10", core: true, diff: 2, examKey: true,
      q: "多因素驗證 (MFA) 的三大類因素中，指紋或臉部辨識屬於哪一種？",
      options: [
        "生物因素 (你是誰)",
        "知識因素 (你知道什麼)",
        "擁有因素 (你有什麼)",
        "行為因素"
      ],
      ans: 0,
      exp: "知識因素＝密碼(你知道)；擁有因素＝實體裝置/手機(你有)；生物因素＝指紋/臉(你是誰)。MFA 要求兩種以上不同類別，才算真正的多因素。",
      insight: "MFA 的精神是『多種獨立因素』——只用兩個密碼不算 MFA，因為同類。這對應第四章 OWASP『認證失效』的防護(強密碼＋MFA)，也是為何偷到密碼還不夠、還要第二因素才進得去。",
      learn: { label: "CISA：多因素驗證", url: "https://www.cisa.gov/MFA" }
    },
    {
      id: "2-16", ch: 2, topic: "Linux 強制存取控制", src: "2.1 作業系統基礎 p.7", core: false, diff: 2,
      q: "下列哪一組是 Linux 上用來強化權限控制的安全模組？",
      options: ["SELinux、AppArmor", "BitLocker、EFS", "Windows Defender、UAC", "Nmap、Wireshark"],
      ans: 0,
      exp: "SELinux(安全增強型 Linux)與 AppArmor 提供強制存取控制(MAC)，比傳統 rwx 更細緻地限制程式能做什麼。BitLocker/Defender/UAC 是 Windows 的。",
      learn: { label: "Red Hat：SELinux", url: "https://www.redhat.com/zh/topics/linux/what-is-selinux" }
    },
    {
      id: "2-17", ch: 2, topic: "帳號攻擊", src: "2.1 作業系統基礎 p.13", core: true, diff: 3, examKey: true,
      q: "「用少數幾個常見密碼，去嘗試登入大量不同帳號」以避開帳號鎖定，這種攻擊稱為？",
      options: ["密碼噴灑 (Password Spraying)", "傳統暴力破解（對單一帳號連續試密碼）", "字典攻擊（用常見密碼字典逐一嘗試）", "憑證填充（用外洩的帳密組合登入）"],
      ans: 0,
      exp: "密碼噴灑是『一個密碼試很多帳號』，剛好繞過『同一帳號試太多次就鎖定』的防護；傳統暴力破解則是對單一帳號猛試，容易觸發鎖定。",
      insight: "兩者都是猜密碼，但方向相反——這說明防禦要對症：帳號鎖定擋得住暴力破解，卻擋不住噴灑；要靠 MFA、偵測異常登入來補。防禦有效與否，取決於它擋的是哪種攻擊模式（呼應第六章『最小權限擋不了注入本身』）。",
      learn: { label: "MITRE ATT&CK：Password Spraying", url: "https://attack.mitre.org/techniques/T1110/003/" }
    },
    {
      id: "2-18", ch: 2, topic: "Windows 防火牆", src: "2.3 Windows系統操作 p.11", core: false, diff: 2,
      q: "Windows 防火牆的設定檔 (Profile) 分為哪三種網路類型？",
      options: [
        "公用 (Public)、私人 (Private)、網域 (Domain)",
        "紅、黃、綠",
        "讀取、寫入、執行",
        "TCP、UDP、ICMP"
      ],
      ans: 0,
      exp: "依所在網路套用不同規則：公用(如咖啡廳 Wi-Fi，最嚴)、私人(家用)、網域(企業 AD 環境)，可分別設定入站/出站規則。",
      learn: { label: "Microsoft：Windows 防火牆", url: "https://learn.microsoft.com/zh-tw/windows/security/operating-system-security/network-security/windows-firewall/" }
    },
    {
      id: "2-19", ch: 2, topic: "日誌與鑑識", src: "2.3 Windows系統操作 p.16", core: false, diff: 3,
      q: "攻擊者入侵 Windows 後常會「清除事件檢視器 (Event Viewer) 的日誌」，主要目的是？",
      options: [
        "抹除入侵痕跡、妨礙事後鑑識與追蹤",
        "讓電腦跑更快",
        "幫系統管理員整理紀錄",
        "備份重要資料"
      ],
      ans: 0,
      exp: "日誌記錄登入、權限變更等關鍵事件；攻擊者清除日誌是為了反鑑識、隱藏行蹤。因此日誌『集中保存、防竄改』很重要。",
      insight: "這正對應第四章 OWASP『安全日誌與告警失效』：沒有日誌就看不到攻擊、事後也追不到路徑。攻防雙方都盯著日誌——防守方要它完整、攻擊方要它消失。",
      learn: { label: "Microsoft：Windows 事件日誌", url: "https://learn.microsoft.com/zh-tw/windows/win32/eventlog/event-logging" }
    },
    {
      id: "2-20", ch: 2, topic: "遠端桌面安全", src: "2.3 Windows系統操作 p.23", core: false, diff: 2,
      q: "強化 Windows 遠端桌面 (RDP) 安全時，啟用「網路層級認證 (NLA)」的好處是？",
      options: [
        "要求連線者在建立完整 RDP 工作階段『之前』就先通過身份驗證，降低被攻擊面",
        "讓畫面變清晰",
        "自動加快網速",
        "停用所有密碼"
      ],
      ans: 0,
      exp: "NLA 讓使用者在耗用伺服器資源、開啟完整工作階段前就先認證，減少未認證連線帶來的攻擊面（如 RDP 弱點利用）。",
      learn: { label: "Microsoft：RDP NLA", url: "https://learn.microsoft.com/zh-tw/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access" }
    },

    /* --- 3.1 網頁技術基礎（HTML/CSS/JS 深化） --- */
    {
      id: "3-12", ch: 3, topic: "語意標籤", src: "3.1 網頁技術基礎 p.34", core: false, diff: 1,
      q: "下列哪一個是 HTML5『語意化 (semantic)』標籤，用來表示導覽列？",
      options: ["<nav>", "<div>", "<span>", "<b>"],
      ans: 0,
      exp: "語意標籤如 <header>/<nav>/<section>/<article>/<footer>/<main> 讓結構有意義、利於 SEO 與無障礙；<div>/<span> 是無語意的通用容器。",
      learn: { label: "MDN：HTML 語意元素", url: "https://developer.mozilla.org/zh-TW/docs/Glossary/Semantics" }
    },
    {
      id: "3-13", ch: 3, topic: "表單方法", src: "3.1 網頁技術基礎 p.55", core: true, diff: 2, examKey: true,
      q: "HTML 表單 <form> 的 method 屬性，傳送『密碼等敏感資料』時應選哪個？為什麼？",
      options: [
        "POST：資料放在請求主體 (body)，不會像 GET 直接顯示在網址列與瀏覽紀錄中",
        "GET：把參數放在網址列比較快，而且瀏覽器會自動幫網址參數加密",
        "GET 或 POST 皆可，只要欄位設成 type=password，傳輸內容就會被加密",
        "改用 PUT 方法，因為 PUT 的請求主體預設會經過加密再傳送"
      ],
      ans: 0,
      exp: "GET 把參數接在 URL（會被記錄、快取、留在瀏覽紀錄），不適合傳敏感資料；POST 放在 body，較適合送出表單/密碼。但兩者都需搭配 HTTPS 才真正安全。",
      insight: "注意：POST 只是『不顯示在網址』，並非加密——沒有 HTTPS，POST 內容一樣被監聽。這串起第一章(HTTP 明文)、1.4(HTTPS)、第四章(加密失效)：真正保護傳輸靠的是 TLS，不是 GET/POST 的選擇。",
      learn: { label: "MDN：HTTP 請求方法", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods" }
    },
    {
      id: "3-14", ch: 3, topic: "表單元素", src: "3.1 網頁技術基礎 p.56", core: false, diff: 1,
      q: "在 HTML 中，<label> 的 for 屬性要對應到輸入框的哪個屬性，才能點文字就聚焦輸入框？",
      options: ["對應到 <input> 的 id", "對應到 <input> 的 name", "對應到 <input> 的 value", "對應到 <input> 的 type"],
      ans: 0,
      exp: "<label for=\"username\"> 綁定 <input id=\"username\">：點 label 文字會 focus 到該輸入框，提升 UX 與無障礙（螢幕閱讀器可讀出用途）。name 是給後端辨識的欄位名。",
      learn: { label: "MDN：label 元素", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/label" }
    },
    {
      id: "3-15", ch: 3, topic: "CSS 選擇器", src: "3.1 網頁技術基礎 p.74", core: true, diff: 2,
      q: "CSS 選擇器中，用來選取『class 為 button 的元素』的寫法是？",
      options: [".button", "#button", "button", "*button"],
      ans: 0,
      exp: ".button 選 class；#button 選 id（唯一）；button 選 <button> 元素；* 是通用選擇器。屬性選擇器如 [type=\"text\"]。",
      learn: { label: "MDN：CSS 選擇器", url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Selectors" }
    },
    {
      id: "3-16", ch: 3, topic: "CSS 盒模型", src: "3.1 網頁技術基礎 p.103~105", core: true, diff: 2, examKey: true,
      q: "CSS 盒模型中，margin 與 padding 的差別是？",
      options: ["margin 是元素外部空白（與其他元素距離）；padding 是內容與邊框間空白", "margin 是內部空白、padding 是外部空白（剛好相反）", "兩者相同，都是元素與邊框之間的距離", "margin 控制文字大小、padding 控制背景色"],
      ans: 0,
      exp: "由內到外：內容 → padding(內距) → border(邊框) → margin(外距)。padding 撐開內部、margin 推開外部相鄰元素。",
      insight: "盒模型是所有 CSS 排版的地基——flex/grid 都建立在『每個元素是一個盒子』之上。搞懂 content/padding/border/margin 四層，才不會在版面錯位時瞎猜。",
      learn: { label: "MDN：盒模型", url: "https://developer.mozilla.org/zh-TW/docs/Learn/CSS/Building_blocks/The_box_model" }
    },
    {
      id: "3-17", ch: 3, topic: "CSS 顏色", src: "3.1 網頁技術基礎 p.77", core: false, diff: 1,
      q: "CSS 中 rgba(255, 0, 0, 0.5) 的最後一個值 0.5 代表什麼？",
      options: ["透明度 (alpha)，0 全透明、1 不透明", "紅色深淺", "字體大小", "邊框粗細"],
      ans: 0,
      exp: "rgba 的 a 是 alpha 透明度(0~1)。此例為半透明紅色。HEX #FF0000、rgb(255,0,0) 也都是紅色。",
      learn: { label: "MDN：CSS color", url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS/color_value" }
    },
    {
      id: "3-18", ch: 3, topic: "DOM 操作", src: "3.1 網頁技術基礎 p.148", core: true, diff: 2,
      q: "JavaScript DOM 操作中，innerText 與 innerHTML 的差別是？",
      options: [
        "innerText 只處理純文字；innerHTML 會把字串當 HTML 解析（因此有 XSS 風險）",
        "兩者完全相同",
        "innerText 會執行 <script>",
        "innerHTML 只能讀不能寫"
      ],
      ans: 0,
      exp: "innerText 取/設純文字；innerHTML 會解析標籤，若把未過濾的使用者輸入塞進 innerHTML 就可能造成 XSS。取用元素可用 getElementById / querySelector。",
      insight: "第三章的 DOM API 到第四章就是安全議題：innerHTML 是危險 Sink、innerText/textContent 是安全 Sink。學前端 API 順手問一句『它會不會把字串當程式碼』，開發與資安視角就接上了。",
      learn: { label: "MDN：innerHTML 的風險", url: "https://developer.mozilla.org/zh-TW/docs/Web/API/Element/innerHTML#security_considerations" }
    },

    /* --- 4.2 漏洞掃描 / 4.3 WAF --- */
    {
      id: "4-16", ch: 4, topic: "誤報/漏報", src: "4.2 基本的漏洞掃描 p.9,21", core: true, diff: 2, examKey: true,
      q: "漏洞掃描結果中，False Positive（誤報）與 False Negative（漏報）分別指什麼？",
      options: ["誤報＝把不存在的漏洞報成有；漏報＝真漏洞卻沒被發現", "誤報＝真漏洞沒被發現；漏報＝多報了假漏洞", "兩者相同，都表示掃描工具設定錯誤", "誤報指掃描逾時、漏報指被防火牆擋下"],
      ans: 0,
      exp: "誤報浪費人力去查不存在的問題；漏報更危險——真漏洞被放過。所以掃描結果要人工驗證、多工具交叉檢查來排除誤報、補足漏報。",
      insight: "誤報 vs 漏報這組概念到處出現：WAF 誤阻(擋到正常請求) vs 漏檢(放過攻擊)、IDS 告警、資安判斷。安全永遠在『太鬆(漏報)』與『太緊(誤報)』間權衡——這也是為何自動化工具一定要配人工驗證。",
      learn: { label: "OWASP：漏洞掃描", url: "https://owasp.org/www-community/Vulnerability_Scanning_Tools" }
    },
    {
      id: "4-17", ch: 4, topic: "CVSS", src: "4.2 基本的漏洞掃描 p.22,25", core: false, diff: 2,
      q: "CVSS (Common Vulnerability Scoring System) 是用來做什麼的？",
      options: [
        "以標準化分數（0~10）評估漏洞的嚴重性與優先級",
        "掃描開放的通訊埠",
        "加密資料庫",
        "產生強密碼"
      ],
      ans: 0,
      exp: "CVSS 是業界標準評分，分數分級：危急 9.0–10、高 7.0–8.9、中 4.0–6.9、低 0.1–3.9。用來排定修補優先順序。",
      learn: { label: "FIRST：CVSS", url: "https://www.first.org/cvss/" }
    },
    {
      id: "4-18", ch: 4, topic: "掃描工具", src: "4.2 基本的漏洞掃描 p.13~14", core: false, diff: 1,
      q: "下列何者是 OWASP 維護、適合初學者的開源 Web 漏洞掃描器？",
      options: ["OWASP ZAP", "Microsoft Excel", "BitLocker", "Photoshop"],
      ans: 0,
      exp: "OWASP ZAP(Zed Attack Proxy)是開源 Web 掃描器，可做主動/被動掃描與攔截代理。其他常見工具：Nikto、OpenVAS、Burp Suite、Nessus。",
      learn: { label: "OWASP ZAP", url: "https://www.zaproxy.org/" }
    },
    {
      id: "4-19", ch: 4, topic: "防火牆 vs WAF", src: "4.3 網站防火牆基礎 p.9", core: true, diff: 3, examKey: true,
      q: "傳統網路層防火牆與 Web 應用程式防火牆 (WAF) 的關鍵差別是？",
      options: ["網路層防火牆在 L3/L4 過濾 IP/埠；WAF 在 L7 檢查 HTTP 內容防 XSS/SQLi", "WAF 運作在 L3/L4、只看 IP 和埠不看內容", "兩者都在 L7 運作、功能完全重疊可互換", "網路層防火牆能深檢 HTTP、WAF 只擋埠"],
      ans: 0,
      exp: "網路層防火牆(封包過濾/狀態檢測/NGFW)看 IP/埠、開銷低但無法解讀 HTTP 內容；WAF 是應用層(L7)、常以反向代理部署，深度檢查請求內容以防 XSS/SQLi。",
      insight: "這題把第一章 OSI 分層變成防禦策略：不同層要不同防火牆。網路層擋不了應用層攻擊(SQLi/XSS)，所以要 WAF 補上——這正是『縱深防禦』：網路層防火牆是第一道、WAF 是第二道，各守一層。",
      learn: { label: "Cloudflare：什麼是 WAF", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/web-application-firewall-waf/" }
    },
    {
      id: "4-20", ch: 4, topic: "WAF 虛擬補丁", src: "4.3 網站防火牆基礎 p.14,23", core: true, diff: 3,
      q: "當一個新漏洞被公開、但官方修補程式還沒發布時，WAF 的哪項能力可提供即時防護？",
      options: [
        "虛擬補丁 (Virtual Patching)：以 WAF 規則暫時阻擋針對該漏洞的攻擊請求",
        "格式化硬碟",
        "關閉整個網站",
        "把伺服器搬到雲端"
      ],
      ans: 0,
      exp: "虛擬補丁讓你不改原始碼、也不必等官方 patch，就能先用 WAF 規則擋住利用該漏洞的請求，爭取修補時間（對零日漏洞特別有用）。",
      insight: "呼應 4.2『高風險漏洞平均 15 天內就被利用』——修補有時間差，WAF 的虛擬補丁正是填補這個『暴露窗口』的緩衝層。這也是縱深防禦的價值：一層來不及，還有另一層頂著。",
      learn: { label: "OWASP：Virtual Patching", url: "https://owasp.org/www-community/Virtual_Patching_Best_Practices" }
    },
    {
      id: "4-21", ch: 4, topic: "真實案例 WannaCry", src: "4.2 基本的漏洞掃描 p.36", core: false, diff: 2,
      q: "2017 年 WannaCry 勒索軟體全球大爆發，主要是利用了什麼？帶來的教訓是？",
      options: [
        "利用未修補的 Windows SMB 漏洞 (MS17-010)；教訓是及時修補與更新系統的重要性",
        "利用使用者密碼太長",
        "因為大家都用 HTTPS",
        "因為防火牆開太多"
      ],
      ans: 0,
      exp: "WannaCry 靠 MS17-010 這個 SMB 漏洞蠕蟲式擴散，影響 150 國逾 30 萬台。核心教訓：定期漏洞掃描 + 及時修補已知漏洞。",
      learn: { label: "Wikipedia：WannaCry", url: "https://zh.wikipedia.org/wiki/WannaCry" }
    },

    /* --- 6.1 資料庫安全（權限管理 / 備份） --- */
    {
      id: "6-14", ch: 6, topic: "MySQL 權限", src: "6.1 資料庫安全入門 p.22", core: true, diff: 2, examKey: true,
      q: "在 MySQL 中，「授予」與「收回」使用者權限分別用哪兩個指令？",
      options: ["GRANT（授予）與 REVOKE（收回）", "ALLOW（授予）與 DENY（收回）", "ADD（授予）與 DROP（收回）", "PERMIT（授予）與 DENY（收回）"],
      ans: 0,
      exp: "GRANT 授予權限（可到資料庫/表/欄位層級，如 SELECT、INSERT）、REVOKE 收回。搭配角色(管理員/讀寫/唯讀)實現最小權限。",
      insight: "GRANT/REVOKE 是把『最小權限原則』落地的工具：只給應用帳號必要的權限。這正是第六章 SQLi Lab 裡 webtable/websp 帳號切分的底層機制——理論(最小權限)與指令(GRANT/REVOKE)要一起記。",
      learn: { label: "MySQL：GRANT", url: "https://dev.mysql.com/doc/refman/8.0/en/grant.html" }
    },
    {
      id: "6-15", ch: 6, topic: "資料庫備份", src: "6.1 資料庫安全入門 p.16,19", core: false, diff: 2,
      q: "MySQL 中用來『備份』與『還原』資料庫的常見做法，配對何者正確？",
      options: [
        "備份用 mysqldump 匯出成 .sql；還原用 mysql 匯入該 .sql 檔",
        "備份用 mysql；還原用 mysqldump",
        "兩者都用 SELECT",
        "備份用 DROP TABLE"
      ],
      ans: 0,
      exp: "備份：mysqldump -u root -p db > backup.sql；還原：mysql -u root -p db < backup.sql。可搭配 Cron Job 定時自動備份。",
      learn: { label: "MySQL：mysqldump", url: "https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html" }
    },
    {
      id: "6-16", ch: 6, topic: "備份策略", src: "6.1 資料庫安全入門 p.15", core: false, diff: 2,
      q: "資料庫備份策略中，「只備份自上次『完整備份』以來變動的資料」屬於哪一種？",
      options: ["差異備份 (Differential)", "完整備份 (Full)", "無備份", "即時備份"],
      ans: 0,
      exp: "完整備份＝全部；差異備份＝自上次完整備份以來的變動；增量備份＝自上次任一次備份以來的變動。差異還原較快、增量省空間。",
      learn: { label: "備份策略概念", url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html" }
    },
    {
      id: "6-17", ch: 6, topic: "資料加密", src: "6.1 資料庫安全入門 p.6", core: false, diff: 2,
      q: "資料庫中儲存信用卡號、密碼等機敏資料時，應採取什麼措施？其中金鑰管理為何重要？",
      options: [
        "用 AES/RSA 等演算法加密；金鑰若外洩則加密形同虛設，故必須妥善保管與控管金鑰",
        "存成明文以方便查詢",
        "只要改欄位名稱就安全",
        "把資料庫關掉就好"
      ],
      ans: 0,
      exp: "機敏資料應加密(如 AES 對稱、RSA 非對稱)，避免外洩後被直接利用。加密的安全性取決於金鑰——金鑰外洩等於沒加密，所以金鑰管理與備份還原都要謹慎。",
      insight: "呼應第六章 Lab 的 password_plain 反例：明文存密碼一旦資料庫被拖走就全曝光。加密＋金鑰管理，加上密碼用雜湊加鹽，才是完整的資料保護——這也是 OWASP『加密機制失效』要防的。",
      learn: { label: "OWASP：加密儲存", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html" }
    },

    /* ================= 圖片型簡報補充題（100% 覆蓋） ================= */
    /* --- 0 課前基本認識（Ping / ICMP / 滲透測試 / 安全框架） --- */
    {
      id: "1-35", ch: 1, topic: "TTL", src: "0 課前基本認識 p.36~37", core: false, diff: 2,
      q: "封包的 TTL (Time To Live) 欄位主要作用，以及常見作業系統的預設值，何者正確？",
      options: [
        "TTL 是跳站數 (hop count)，每經一個路由器減 1，歸零即丟棄以避免封包無限繞行；Windows 預設 128、Linux 64",
        "TTL 是封包大小，Windows 預設 64",
        "TTL 是加密金鑰長度",
        "TTL 只有 IPv6 才有"
      ],
      ans: 0,
      exp: "TTL 每過一個路由器減 1，歸零就丟棄，避免封包在網路上無限繞圈。預設值：Linux/FreeBSD 64、Windows 128、Cisco 254——可藉此粗略推測對方作業系統。",
      insight: "TTL 順帶洩漏了主機資訊：看回應的 TTL 接近 64 多半是 Linux、接近 128 是 Windows。這和 traceroute 利用 TTL 逐跳遞增來畫出路徑是同一個機制——一個小欄位，攻防雙方都能拿來做偵查。",
      learn: { label: "Wikipedia：TTL", url: "https://en.wikipedia.org/wiki/Time_to_live" }
    },
    {
      id: "1-36", ch: 1, topic: "ICMP", src: "0 課前基本認識 p.40~41", core: true, diff: 2,
      q: "ping 指令是靠哪個協定運作？成功收到回應時對應的 ICMP 類型是？",
      options: [
        "ICMP 協定；送出 Echo Request (Type 8)、成功收到 Echo Reply (Type 0)",
        "TCP 協定；靠三向交握",
        "HTTP 協定；靠 GET 請求",
        "DNS 協定；靠 A 記錄"
      ],
      ans: 0,
      exp: "ping 用 ICMP：送 Echo Request(Type 8)、對方回 Echo Reply(Type 0)。其他常見類型：Type 3 目的不可達、Type 11 逾時(TTL 用盡)。許多伺服器/防火牆會擋 ICMP 以降低可見性。",
      insight: "ping 看似簡單卻牽動整條鏈：先 ARP 解析 MAC(L2)、再送 ICMP(L3)。防火牆擋不擋 ICMP、TTL 多少、有沒有回 Type 3，都是偵查資訊——這正是課程說的『Ping 其實學問很大』。",
      learn: { label: "IANA：ICMP 參數", url: "https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml" }
    },
    {
      id: "1-37", ch: 1, topic: "滲透測試 vs 弱點掃描", src: "0 課前基本認識 p.56~58", core: true, diff: 3, examKey: true,
      q: "「滲透測試 (Penetration Testing)」與「弱點掃描 (Vulnerability Scanning)」最主要的差別是？",
      options: ["弱點掃描自動找已知漏洞；滲透測試模擬真實攻擊、實際利用（黑白灰箱）", "兩者相同，都是自動列出系統已知漏洞清單", "滲透測試只是模擬所以不需授權，弱點掃描才需要", "弱點掃描會實際入侵取得權限、滲透測試只被動掃描"],
      ans: 0,
      exp: "弱點掃描用工具(Nessus/OpenVAS)自動列出已知漏洞、偏廣度；滲透測試模擬駭客實際攻擊鏈、驗證能否真正得手，分黑箱(無資訊)/白箱(全資訊)/灰箱(部分)。兩者都須取得授權。",
      insight: "『掃描找出可能有問題、滲透驗證真的能被打穿』——這對應 4.2 漏洞掃描的『誤報要人工驗證』：自動化負責廣度、人工/滲透負責深度與確認。兩者互補，構成完整的主動防禦。",
      learn: { label: "OWASP：滲透測試", url: "https://owasp.org/www-project-web-security-testing-guide/" }
    },
    {
      id: "1-38", ch: 1, topic: "安全設計原則", src: "0 課前基本認識 p.15", core: false, diff: 2,
      q: "資安設計原則中，「預設不信任任何人或裝置，每次存取都要驗證」是指哪一個原則？",
      options: ["零信任 (Zero Trust)", "最小權限 (Least Privilege)", "縱深防禦 (Defense in Depth)", "職責分離 (Separation of Duties)"],
      ans: 0,
      exp: "零信任＝不因為在內網就自動信任，每次存取都需驗證授權(never trust, always verify)。最小權限＝只給必要權限；縱深防禦＝多層防護；職責分離＝拆分權責避免單點濫權。",
      insight: "這些原則(CISSP 領域 3 列出)貫穿整門課：最小權限(Linux/DB 帳號)、縱深防禦(SQLi 多層/WAF+防火牆)、零信任(每次驗證)。理解原則，就能推出各章的具體做法為何長那樣。",
      learn: { label: "NIST：零信任架構", url: "https://www.nist.gov/publications/zero-trust-architecture" }
    },

    /* --- 3.2 基礎網站安全（CIA 三大支柱） --- */
    {
      id: "3-19", ch: 3, topic: "CIA 三大支柱", src: "3.2 基礎網站安全 p.4~6", core: true, diff: 2, examKey: true,
      q: "資訊安全的三大支柱 (CIA) 是指哪三者？",
      options: ["機密性 (Confidentiality)、完整性 (Integrity)、可用性 (Availability)", "身分驗證 (Authentication)、授權 (Authorization)、稽核 (Accounting)", "預防 (Prevention)、偵測 (Detection)、回應 (Response)", "加密 (Encryption)、雜湊 (Hashing)、簽章 (Signature)"],
      ans: 0,
      exp: "CIA＝機密性(資料不被未授權者看到)、完整性(資料不被竄改)、可用性(需要時可正常使用)。這是評估任何資安措施的根本框架。",
      insight: "CIA 是整門課的最上層地圖：加密/存取控制守『機密性』、雜湊/數位簽章守『完整性』、備份/防 DoS 守『可用性』。看任何攻擊都可問『它破壞了哪個 C/I/A』——SQLi 竊資料(C)、竄改資料(I)；DDoS 打(A)。",
      learn: { label: "Cloudflare：CIA 三要素", url: "https://www.cloudflare.com/learning/security/glossary/what-is-the-cia-triad/" }
    },
    {
      id: "3-20", ch: 3, topic: "CIA 對應", src: "3.2 基礎網站安全 p.5~7", core: true, diff: 3,
      q: "使用雜湊 (checksum/hash) 或數位簽章來確保『資料在傳輸/儲存中沒有被竄改』，主要保護 CIA 中的哪一項？",
      options: ["完整性 (Integrity)", "機密性 (Confidentiality)", "可用性 (Availability)", "以上皆非"],
      ans: 0,
      exp: "雜湊/數位簽章驗證資料未被更動 → 完整性。加密→機密性；備份/災難復原/防 DDoS→可用性。",
      insight: "把防護手段對應到 CIA，是把零散知識點收斂的好方法：加密↔C、雜湊/簽章↔I、備份/負載平衡/防 DoS↔A。第一章 md5sum/sha256sum、1.4 的 TLS 完整性、第六章備份，全都能掛回這張表。",
      learn: { label: "Cloudflare：CIA 三要素", url: "https://www.cloudflare.com/learning/security/glossary/what-is-the-cia-triad/" }
    },

    /* --- 5.1 資料庫基本概念（DDL/DML/DCL、RDBMS/NoSQL） --- */
    {
      id: "5-21", card: "SQL 的 DDL / DML / DCL 各負責什麼？各舉一個指令。", ch: 5, topic: "SQL 語言分類", src: "5.1 資料庫基本概念 p.16", core: true, diff: 3, examKey: true,
      q: "SQL 依功能可分為 DDL / DML / DCL。下列配對何者正確？",
      options: ["DDL 定義結構、DML 操作資料(SELECT/INSERT)、DCL 控權限(GRANT/REVOKE)", "DDL 控制權限、DML 定義結構、DCL 操作資料", "DDL 定義結構、DML 控制權限、DCL 操作資料", "DDL 資料備份、DML 資料還原、DCL 資料加密"],
      ans: 0,
      exp: "DDL(Data Definition Language)定義/修改結構如 CREATE TABLE；DML(Data Manipulation)增刪查改資料；DCL(Data Control)管權限 GRANT/REVOKE。",
      insight: "這個分類把第五、六章縫起來：DML 是你平常寫的查詢、DDL 建表定型別與主鍵、DCL 就是第六章『最小權限』用的 GRANT/REVOKE。同一個 SQL，用途一分類，權限管理與資料操作的界線就清楚了。",
      learn: { label: "Wikipedia：SQL 分類", url: "https://en.wikipedia.org/wiki/Data_definition_language" }
    },
    {
      id: "5-22", ch: 5, topic: "關聯式 vs NoSQL", src: "5.1 資料庫基本概念 p.16~17", core: false, diff: 2,
      q: "關於關聯式資料庫 (RDBMS) 與非關聯式資料庫 (NoSQL)，下列敘述何者正確？",
      options: [
        "RDBMS(如 MySQL/PostgreSQL)以表格與明確關聯儲存、結構清晰；NoSQL(如 MongoDB/Redis)無固定表格，以鍵值/文件/圖形儲存、彈性高",
        "NoSQL 就是沒有任何資料庫",
        "RDBMS 不支援 SQL",
        "兩者完全相同"
      ],
      ans: 0,
      exp: "RDBMS 用表格(欄位/記錄)與外鍵建立關聯、適合結構化資料；NoSQL(Not Only SQL)以 key-value/document/graph 儲存、適合大量非結構化資料、擴展性強。",
      learn: { label: "MongoDB：SQL vs NoSQL", url: "https://www.mongodb.com/nosql-explained" }
    },

    /* --- 6.2 SQLi Labs（union-based 列舉） / 5補充（.env） --- */
    {
      id: "6-18", ch: 6, topic: "union-based SQLi", src: "6.2 SQLi Labs p.6~8", core: true, diff: 3, examKey: true,
      q: "在 union-based SQL injection 中，攻擊者查詢 information_schema 的主要目的是？",
      options: ["列舉資料庫結構（有哪些表、每表哪些欄），鎖定要竊取的目標", "取得資料庫的版本與作業系統資訊", "繞過登入頁面的密碼驗證機制", "在資料庫植入後門帳號以長期存取"],
      ans: 0,
      exp: "information_schema 是 MySQL 記錄『元資料』的系統資料庫。攻擊者用 UNION SELECT ... FROM information_schema.tables/columns 列舉表名與欄名，找到 users 後再 UNION 撈 username/password。",
      insight: "完整攻擊鏈把第五、六章串起來：先 order by 試欄位數 → union select database()/version() 探環境 → 查 information_schema 列舉結構 → GROUP_CONCAT 把多筆壓成一格撈出帳密。每一步都是合法 SQL 語法被武器化——懂 SQL 才擋得住 SQLi。",
      learn: { label: "PortSwigger：UNION attacks", url: "https://portswigger.net/web-security/sql-injection/union-attacks" }
    },
    {
      id: "6-19", ch: 6, topic: "SQLi 注入點閉合", src: "6.2 SQLi Labs p.10", core: false, diff: 3, kind: "fact",
      q: "sqli-labs 各關卡要嘗試 1' OR '1'='1、1) OR (1=1、1')) OR (('1'='1 等不同 payload，主要是為了？",
      options: [
        "試出後端 SQL 對輸入的『閉合方式』（是用單引號、括號還是雙括號包住參數），才能正確注入",
        "測試網路速度",
        "破解密碼雜湊",
        "產生亂數"
      ],
      ans: 0,
      exp: "後端可能寫成 id='$id'、id=($id)、id=('$id') 等不同閉合。攻擊者要先猜對閉合符號(引號/括號數量)，注入的 payload 才能讓語法正確、條件生效。",
      learn: { label: "PortSwigger：SQL injection", url: "https://portswigger.net/web-security/sql-injection" }
    },
    {
      id: "6-20", card: "用 .env 存資料庫帳密時，三個防範重點是什麼？（放哪、擋什麼、加什麼）", ch: 6, topic: "機密設定管理", src: "5 補充1 PHP+MYSQL（.env）", core: true, diff: 3, examKey: true,
      q: "把資料庫帳密（DB_HOST/DB_USER/DB_PASSWORD）放進 .env 檔管理時，正確的防範做法包含哪些？",
      options: ["放在網站根目錄之外、設 WebServer 拒絕 .env 的 HTTP 請求、並加入 .gitignore", "把 .env 放進 public 資料夾方便程式讀取", "把帳密改寫在 config.php 並上傳 GitHub 備份", "在 .env 開頭加註解說明以避免被誤刪"],
      ans: 0,
      exp: "機密設定不可外洩：.env 放在文件根目錄外(避免被直接下載)、WebServer 設 deny 規則擋 .env 請求、加入 .gitignore(改用 .env.example 當範本)避免連同密碼推上版控。",
      insight: "這正是 OWASP『安全配置錯誤/機密外洩』的實務：很多外洩不是被駭，而是密碼被 commit 到 GitHub 或 .env 能被直接下載。呼應第六章 Lab『Web 不用 root 帳號』——保護憑證與最小權限一起，才是完整的資料庫防線。",
      learn: { label: "OWASP：Secrets Management", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" }
    },

    /* ================= 情境／應用題（提升出題方向多元度，皆單選） ================= */
    {
      id: "1-39", ch: 1, topic: "TTL", src: "0 課前基本認識 p.37（應用）", core: false, diff: 2, kind: "fact",
      q: "情境：你 ping 一台伺服器，回應封包的 TTL 約為 128。這台主機最可能是什麼作業系統？",
      options: ["Windows", "Linux", "Cisco 網路設備", "無法從 TTL 判斷"],
      ans: 0,
      exp: "常見預設 TTL：Windows 128、Linux/FreeBSD 64、Cisco 254。回應 TTL 已被沿途路由器減過，但接近 128 仍最可能是 Windows。",
      insight: "這題把『死記的預設值』變成『能推理的線索』——考試常這樣考：不是問你 128 是誰，而是給你現象要你反推。把 64=Linux、128=Windows 記牢，就能一眼判斷。",
      learn: { label: "TTL 預設值對照", url: "https://subinsb.com/default-device-ttl-values/" }
    },
    {
      id: "1-40", ch: 1, topic: "Wireshark", src: "1.2 OSI（應用）", core: false, diff: 3,
      q: "情境：你只想在 Wireshark 看『本機與 192.168.1.10 之間的 HTTPS 流量』，最適合的顯示過濾語法是？",
      options: [
        "ip.addr == 192.168.1.10 and tcp.port == 443",
        "http and 192.168.1.10",
        "port 443 and host 192.168.1.10",
        "tcp.flags.syn == 1"
      ],
      ans: 0,
      exp: "顯示過濾用『欄位 運算符 值』並可用 and 組合：ip.addr==192.168.1.10 圈出該主機、tcp.port==443 圈出 HTTPS。選項 C 是擷取過濾(BPF)語法、不是顯示過濾。",
      insight: "記住兩套語法別混：顯示過濾 ip.addr/tcp.port==（點號欄位）；擷取過濾 host/port（BPF）。這題考的是『把需求翻譯成過濾式』——資安分析最常做的事就是精準篩流量。",
      learn: { label: "Wireshark 顯示過濾", url: "https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html" }
    },
    {
      id: "2-21", ch: 2, topic: "檔案權限", src: "2.2 Linux（情境）", core: true, diff: 3, examKey: true,
      q: "情境：某網站把使用者『上傳檔案的目錄』權限設成 777。這最可能造成什麼風險？",
      options: ["任何人可寫入該目錄，攻擊者能上傳並執行 webshell 控制伺服器", "檔案讀寫少了權限檢查，網站存取速度會明顯變快", "777 代表最高保護等級，上傳的檔案會被自動加密", "上傳目錄本就該開放最大權限，這是常見且正確的設定"],
      ans: 0,
      exp: "777＝所有人可讀寫執行。可寫的上傳目錄若又能執行，攻擊者上傳 webshell 即可遠端控制。正確做法：最小權限、上傳目錄禁止執行、驗證檔案類型。",
      insight: "把第二章的權限數字接到真實攻擊：777 不是抽象的『太寬鬆』，而是『別人能放 webshell』。這也呼應 OWASP 的安全配置錯誤——很多入侵源於一個過寬的權限設定。",
      learn: { label: "OWASP：檔案上傳", url: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html" }
    },
    {
      id: "2-22", ch: 2, topic: "日誌監控", src: "2.2 Linux p.8,30（應用）", core: false, diff: 2, examKey: true,
      q: "情境：你想『即時』盯著系統，看是否有人不斷嘗試登入失敗。最適合的指令組合是？",
      options: ["tail -f /var/log/auth.log | grep \"Failed password\"", "grep root /etc/passwd | wc -l", "cat /var/log/auth.log > /dev/null", "netstat -an | grep :22"],
      ans: 0,
      exp: "tail -f 即時追蹤日誌新增內容、grep 篩出『Failed password』失敗紀錄，管道 | 串接兩者。這正是偵測暴力破解/密碼噴灑的基本手法。",
      insight: "這題把 tail -f、grep、管道三個第二章工具組成一個真實的『監控腳本』——資安監控就是這樣把小工具串成偵測能力，對應 OWASP『日誌與告警』的實作面。",
      learn: { label: "Linux Journey：Pipes", url: "https://linuxjourney.com/lesson/pipe-data" }
    },
    {
      id: "3-21", ch: 3, topic: "HTTP 狀態碼", src: "1.4 / 3.1（情境）", core: true, diff: 2, examKey: true,
      q: "情境：使用者『尚未登入』就想存取需要驗證的 /admin 頁面。依語意，伺服器最適合回應哪個 HTTP 狀態碼？",
      options: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500 Internal Server Error"],
      ans: 0,
      exp: "尚未驗證身分→401(要你先登入)；若已登入但沒權限→403 Forbidden。404 是找不到資源、500 是伺服器錯誤。",
      insight: "401 vs 403 是『沒認證 vs 沒授權』，正好對應 OWASP 的認證失效(A07) vs 存取控制失效(A01)。看到狀態碼能反推是哪種安全問題——這是把第一章 HTTP 和第四章 OWASP 串起來的關鍵。",
      learn: { label: "MDN：401", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status/401" }
    },
    {
      id: "4-22", card: "勒索軟體加密檔案讓人無法使用，破壞了 CIA 的哪一項？", ch: 4, topic: "CIA 應用", src: "3.2 基礎網站安全（情境）", core: true, diff: 2, examKey: true,
      q: "情境：勒索軟體加密了公司所有檔案，員工完全無法開啟使用。這主要破壞了資安 CIA 三要素中的哪一項？",
      options: [
        "可用性 (Availability)",
        "機密性 (Confidentiality)",
        "完整性 (Integrity)",
        "以上皆非"
      ],
      ans: 0,
      exp: "資料還在、也沒被外洩，但『無法使用』→ 破壞可用性。若是被竊取→機密性；被竄改→完整性。防禦可用性靠備份、災難復原。",
      insight: "同一個攻擊可用 CIA 拆解看它傷到哪：勒索軟體主打可用性(加密鎖住)、有時兼具機密性(先竊資料再加密勒索雙重勒索)。學會用 C/I/A 分類任何事件，資安思路就成形了。",
      learn: { label: "Cloudflare：CIA 三要素", url: "https://www.cloudflare.com/learning/security/glossary/what-is-the-cia-triad/" }
    },
    {
      id: "5-23", ch: 5, topic: "GROUP BY / HAVING", src: "5.2 / imdbdemo（應用）", core: true, diff: 3, examKey: true,
      q: "情境：你要查『每個電影類型 (type) 的平均評分，且只顯示平均評分大於 8 的類型』。SQL 該怎麼組合？",
      options: ["SELECT type, AVG(rating) FROM t GROUP BY type HAVING AVG(rating) > 8", "SELECT type, AVG(rating) FROM t WHERE AVG(rating) > 8 GROUP BY type", "SELECT type, AVG(rating) FROM t GROUP BY type WHERE AVG(rating) > 8", "SELECT type FROM t GROUP BY type ORDER BY AVG(rating) > 8"],
      ans: 0,
      exp: "先 GROUP BY type 分組算 AVG，再用 HAVING 過濾分組後的聚合值。WHERE 不能用聚合函數（它在分組前作用）。",
      insight: "這題把 GROUP BY / HAVING / WHERE 的差別變成實作：要『對分組結果篩選』就一定是 HAVING。記住執行順序 WHERE→GROUP BY→HAVING，這類題就能自己推出來。",
      learn: { label: "SQLBolt：GROUP BY / HAVING", url: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2" }
    },
    {
      id: "6-21", ch: 6, topic: "SQL 注入", src: "6.1 / 6.2（情境）", core: true, diff: 3, examKey: true,
      q: "情境：登入框帳號欄輸入 admin'-- 後，不用密碼就成功登入了。這是為什麼？",
      options: ["-- 是 SQL 註解，把後面的密碼比對整段註解掉，只剩比對 admin", "因為 admin 是資料庫預設的萬用管理帳號", "因為單引號讓查詢自動跳過了密碼欄位", "因為 -- 會讓資料庫忽略密碼的大小寫"],
      ans: 0,
      exp: "後端若拼成 ...WHERE username='admin'-- ' AND password='...'，註解符號 -- 讓密碼條件失效，查詢只剩比對 username='admin'，於是繞過密碼。根本防禦：參數化查詢。",
      insight: "這和 ' OR '1'='1 是同一類注入的不同手法：一個讓條件恆真、一個把驗證註解掉。共通點都是『輸入被當成 SQL 語法』——所以防禦也同一招：參數化查詢讓輸入永遠只是資料。",
      learn: { label: "PortSwigger：SQL Injection", url: "https://portswigger.net/web-security/sql-injection" }
    },

    /* ================= 大觀念 / 重點詞解釋 / 資安種類與應用（鞏固核心） ================= */
    {
      id: "1-41", ch: 1, topic: "惡意程式種類", src: "1.1 網路基本概念（概念）", core: true, diff: 2, examKey: true, kind: "term",
      card: "蠕蟲 (Worm) 與病毒 (Virus) 的關鍵差別是什麼？",
      q: "惡意程式中，能『自我複製並主動透過網路擴散、不需依附在其他檔案上』的是哪一種？",
      options: [
        "蠕蟲 (Worm)",
        "病毒 (Virus，需依附宿主檔案才能傳播)",
        "木馬 (Trojan，偽裝成正常程式)",
        "後門 (Backdoor，留一條隱藏通道)"
      ],
      ans: 0,
      exp: "蠕蟲會自我複製並主動透過網路擴散（如 WannaCry）；病毒需依附宿主檔案；木馬偽裝成正常程式誘騙執行；後門是攻擊者預留的隱藏存取通道。",
      insight: "把惡意程式當『種類地圖』記：看『怎麼傳播』分蠕蟲(自走)/病毒(寄生)；看『怎麼騙進來』分木馬(偽裝)/釣魚；看『進來後做什麼』分後門(潛伏)/勒索(加密勒贖)。分類清楚，遇到新名詞就能歸位。",
      learn: { label: "Cloudflare：惡意軟體", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/malware/" }
    },
    {
      id: "1-42", ch: 1, topic: "DDoS", src: "1.1 網路基本概念 p.16（概念）", core: true, diff: 2, examKey: true, kind: "concept",
      card: "DDoS 攻擊想破壞 CIA 的哪一項？用什麼手法、怎麼防？",
      q: "DDoS（分散式阻斷服務）攻擊主要破壞資安 CIA 的哪一項？",
      options: [
        "可用性 (Availability)",
        "機密性 (Confidentiality)",
        "完整性 (Integrity)",
        "以上皆非"
      ],
      ans: 0,
      exp: "DDoS 用海量流量灌爆伺服器/頻寬，讓服務無法回應 → 破壞可用性。防禦：CDN、流量清洗、負載平衡。",
      insight: "用 CIA 給攻擊分類：DDoS→可用性、竊資料→機密性、竄改→完整性。這種『攻擊 → 它傷哪個 C/I/A → 對應哪類防禦』的思路，比背某次攻擊的細節更能舉一反三。",
      learn: { label: "Cloudflare：什麼是 DDoS", url: "https://www.cloudflare.com/zh-tw/learning/ddos/what-is-a-ddos-attack/" }
    },
    {
      id: "1-43", ch: 1, topic: "加密種類", src: "1.4 基礎網路服務（TLS）/ 6.1（概念）", core: true, diff: 3, examKey: true, kind: "term",
      card: "對稱式與非對稱式加密差在哪？各舉一例、各解決什麼問題？",
      q: "對稱式加密與非對稱式加密的關鍵差別是？",
      options: ["對稱用同一把金鑰(AES)、快；非對稱用公私鑰(RSA)、解決金鑰交換", "對稱較慢、非對稱較快，但兩者用途完全相同", "非對稱加密只能用來產生雜湊值、不能加密", "對稱式只能做數位簽章、非對稱式才能加密"],
      ans: 0,
      exp: "對稱(AES)同一把鑰匙、快，但雙方要先安全交換鑰匙；非對稱(RSA)公鑰加密私鑰解密，解決金鑰交換與驗證身分的問題。",
      insight: "HTTPS/TLS 正是兩者合用的經典：先用『非對稱』安全交換一把臨時金鑰，之後用『對稱』快速加密大量資料——這解釋了為何 TLS 握手要用憑證(公鑰)。理解『各解決什麼問題』比背演算法名字有用。",
      learn: { label: "Cloudflare：加密", url: "https://www.cloudflare.com/zh-tw/learning/ssl/what-is-encryption/" }
    },
    {
      id: "2-23", ch: 2, topic: "最小權限", src: "2.1/2.2（大觀念）", core: true, diff: 2, examKey: true, kind: "concept",
      card: "什麼是最小權限原則 (Least Privilege)？在哪些地方會用到？",
      q: "『最小權限原則 (Least Privilege)』的核心概念是？",
      options: ["只授予完成工作所需的最低權限，縮小被攻破後的損害", "預設給予最高權限，事後再逐步收回不必要的", "讓同部門帳號共用權限，方便集中管理", "只要密碼夠強，權限給多給少都沒關係"],
      ans: 0,
      exp: "最小權限＝能不給就不給。應用遍及全課：Linux 一般帳號 vs root、資料庫 webtable/websp、Windows 標準帳號、存取控制。即使被入侵，權限越小、爆炸半徑越小。",
      insight: "這是貫穿整門課的『大觀念』之一，和縱深防禦、零信任並列。看到任何『帳號/權限』設計，都可以問一句：有沒有遵守最小權限？這比記某個指令更能建立資安直覺。",
      learn: { label: "Wikipedia：最小權限原則", url: "https://zh.wikipedia.org/wiki/最小权限原则" }
    },
    {
      id: "2-24", ch: 2, topic: "社交工程", src: "2.1 作業系統基礎 p.13（種類）", core: true, diff: 2, examKey: true, kind: "term",
      card: "社交工程 (Social Engineering) 攻擊利用的是什麼？舉一個典型例子。",
      q: "『社交工程 (Social Engineering)』攻擊的本質是？",
      options: ["利用人的心理弱點（信任/恐懼/好奇）誘騙洩密或操作", "利用作業系統或軟體的技術漏洞入侵", "透過大量流量癱瘓目標的服務", "在傳輸過程中攔截並竄改封包內容"],
      ans: 0,
      exp: "社交工程攻擊的是人不是機器：釣魚郵件、假冒客服、誘騙點連結。再強的技術防護也擋不住人被騙，所以『資安意識訓練』是重要防線。",
      insight: "資安不只是技術——最弱的一環常是『人』。釣魚(phishing)是社交工程最常見的形式，常與惡意程式、憑證竊取結合。這提醒我們：防禦要涵蓋技術＋流程＋人的意識。",
      learn: { label: "Cloudflare：社交工程", url: "https://www.cloudflare.com/zh-tw/learning/security/threats/social-engineering-attack/" }
    },
    {
      id: "4-23", ch: 4, topic: "認證與授權", src: "4.1 OWASP（大觀念）", core: true, diff: 2, examKey: true, kind: "concept",
      card: "認證 (Authentication) 與授權 (Authorization) 有什麼不同？",
      q: "資安中『認證 (Authentication)』與『授權 (Authorization)』的差別是？",
      options: ["認證＝確認你是誰（驗證身分）；授權＝確認你能做什麼（權限）", "認證＝確認你能做什麼；授權＝確認你是誰（剛好相反）", "兩者相同，只是認證用於前端、授權用於後端", "認證負責加密資料、授權負責解密資料"],
      ans: 0,
      exp: "先認證(你是誰)、再授權(你能做什麼)。對應 HTTP 401(未認證) vs 403(已認證但無權限)，也對應 OWASP 的認證失效(A07) vs 存取控制失效(A01)。",
      insight: "這組概念是 Web 安全的地基：把『你是誰』和『你能做什麼』分開想，很多題目（狀態碼、OWASP 分類、權限設計）就一次串通。搞混這兩者是初學者最常見的觀念錯誤。",
      learn: { label: "Cloudflare：認證 vs 授權", url: "https://www.cloudflare.com/zh-tw/learning/access-management/authn-vs-authz/" }
    },
    {
      id: "4-24", ch: 4, topic: "注入攻擊種類", src: "4.1 OWASP A05（種類）", core: true, diff: 2, examKey: true, kind: "term",
      card: "『注入攻擊 (Injection)』這一大類包含哪些？共通根因是什麼？",
      q: "關於『注入攻擊 (Injection)』這一類，何者最正確？",
      options: ["SQL/OS 命令/LDAP 注入都屬於它，共通根因是輸入被當成命令執行", "只有 SQL 注入算注入，其餘都歸類為 XSS", "注入只發生在前端，與後端資料庫無關", "注入攻擊與使用者輸入無關，是伺服器設定問題"],
      ans: 0,
      exp: "注入是一個『類別』：SQL/NoSQL/OS 命令/LDAP 注入都是同一原理的不同場景——輸入未經妥善處理就進了解析器。防禦同源：參數化/白名單/輸出編碼，讓輸入只當資料。",
      insight: "把它當『大類』而非單一攻擊：XSS 本質上也是把輸入注入到 HTML 被瀏覽器執行。抓住『資料與程式碼未分離』這個共通根因，就能理解一整片注入類漏洞，而不是逐個死背。",
      learn: { label: "OWASP：Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" }
    },
    {
      id: "4-25", ch: 4, topic: "防火牆種類", src: "4.3 網站防火牆（種類）", core: false, diff: 2, examKey: true, kind: "term",
      card: "網路層防火牆有哪幾種類型？和 WAF 的分工是什麼？",
      q: "傳統網路層防火牆依運作方式主要分為哪幾類？",
      options: ["封包過濾、狀態檢測、下一代防火牆 (NGFW)", "軟體防火牆、硬體防火牆、雲端防火牆", "對稱防火牆、非對稱防火牆、混合防火牆", "第一層、第二層、第三層階層式防火牆"],
      ans: 0,
      exp: "封包過濾(看標頭)、狀態檢測(追蹤連線狀態)、NGFW(整合應用辨識/入侵防禦)。這些運作在 L3/L4；應用層攻擊(XSS/SQLi)則交給 L7 的 WAF。",
      insight: "把防禦工具依『守哪一層』分類：網路層防火牆守 L3/L4、WAF 守 L7、IDS/IPS 偵測與阻擋。理解各自的位置與分工，才知道一個攻擊該由誰擋——這就是縱深防禦的佈局。",
      learn: { label: "Cloudflare：防火牆", url: "https://www.cloudflare.com/zh-tw/learning/security/what-is-a-firewall/" }
    },
    {
      id: "4-26", ch: 4, topic: "縱深防禦", src: "4.3 / 0 課前（大觀念）", core: true, diff: 2, examKey: true, kind: "concept",
      card: "什麼是縱深防禦 (Defense in Depth)？舉出課程中的例子。",
      q: "『縱深防禦 (Defense in Depth)』的核心概念是？",
      options: ["用多層互補的防護，一層被突破仍有其他層擋著", "集中資源打造單一最強防線，夠強就不需其他層", "把所有防護部署在網路最外層，形成一道邊界", "把重要資料重複加密兩次以上，層數越多越安全"],
      ans: 0,
      exp: "縱深防禦＝多層防護疊加。課程例子：SQLi 的參數化查詢＋最小權限、Cookie 的 Secure/HttpOnly/SameSite、網路層防火牆＋WAF、修補＋虛擬補丁。",
      insight: "這是資安最重要的『大觀念』之一：沒有單一銀彈，任何一層都可能失效，所以要層層設防。你會發現整門課的防禦措施，幾乎都能歸到『這是第幾層、補的是哪個缺口』。",
      learn: { label: "Wikipedia：縱深防禦", url: "https://en.wikipedia.org/wiki/Defense_in_depth_(computing)" }
    },
    {
      id: "4-27", ch: 4, topic: "存取控制", src: "4.1 OWASP A01（大觀念）", core: true, diff: 2, examKey: true, kind: "term",
      card: "存取控制 (Access Control) 是什麼？失效會怎樣？",
      q: "『存取控制 (Access Control)』在資安中的目的是？",
      options: ["確保只有經授權者能存取特定資源，防止越權", "確保資料在傳輸過程中不被竊聽或竄改", "確保系統在遭受攻擊下仍能維持正常運作", "確保每筆操作都留下無法否認的紀錄"],
      ans: 0,
      exp: "存取控制決定『誰能存取什麼』。失效就是 OWASP 2025 排第一的『存取控制失效』——如改個 URL/參數就看到別人資料。防護：最小權限、強制授權檢查、良好的存取控制模型。",
      insight: "存取控制是『授權』的落實，和認證(你是誰)互補。它排 OWASP 榜首，因為多數功能的安全都靠『這個人能不能做這件事』的檢查——漏一個就出事。與 Linux/DB 的權限、最小權限同屬一個大主題。",
      learn: { label: "PortSwigger：Access Control", url: "https://portswigger.net/web-security/access-control" }
    },
    {
      id: "6-22", ch: 6, topic: "雜湊與加密", src: "6.1 資料庫安全（重點詞）", core: true, diff: 3, examKey: true, kind: "term",
      card: "雜湊 (hash) 與加密 (encryption) 有什麼根本不同？密碼該用哪個存？",
      q: "『雜湊 (hashing)』與『加密 (encryption)』的根本差別是？",
      options: ["雜湊單向不可還原（驗完整性/存密碼）；加密可用金鑰還原（保機密性）", "兩者都可用金鑰還原，差別只在演算法速度", "雜湊可還原、加密不可還原（剛好相反）", "雜湊用於加密傳輸、加密用於驗證完整性"],
      ans: 0,
      exp: "雜湊(如 SHA-256)單向不可逆，適合存密碼(加鹽)與驗證檔案完整性；加密(如 AES)可用金鑰還原，適合保護要再讀回的機敏資料。密碼要『雜湊加鹽』，不是加密。",
      insight: "常見大誤解：『把密碼加密儲存』——其實密碼應該『雜湊加鹽』，因為系統不需要還原密碼、只需比對。雜湊對應 CIA 的完整性、加密對應機密性；分清這兩者，密碼儲存與資料保護的題目就不會錯。",
      learn: { label: "OWASP：密碼儲存", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }
    },

    /* ================= 反向出題／挑錯改對（給有錯的設定，指出錯在哪、怎麼改） ================= */
    {
      id: "FIX-1", ch: 6, topic: "SQL 注入", src: "整合 ch6（挑錯）", core: true, diff: 3, examKey: true, kind: "fixit",
      card: "PHP 用字串串接組 SQL 查詢，錯在哪、該怎麼改？",
      q: "某後端這樣寫：$sql = \"SELECT * FROM users WHERE id = $id\";（$id 直接來自使用者）。主要問題與正確修正是？",
      options: ["有 SQL Injection 漏洞（輸入被當語法）；應改用參數化查詢", "改用字串跳脫函式（addslashes）處理即可，跳脫後就安全", "把 $id 用單引號包成 WHERE id='$id'，變成字串就安全", "在前端限制輸入只能填數字，後端就不必再處理"],
      ans: 0,
      exp: "字串串接把 $id 當成 SQL 語法 → 可注入。修正：用 PDO/mysqli 的參數化查詢 `WHERE id = ?` 綁定參數。改名、改 SELECT 都無效。",
      insight: "挑錯的重點是認出『不可信輸入被拼進要執行的字串』這個病根，並知道對症的藥＝參數化查詢。看到字串串接組 SQL/HTML/命令，直覺就要警覺。",
      learn: { label: "OWASP：Query Parameterization", url: "https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html" }
    },
    {
      id: "FIX-2", ch: 2, topic: "檔案權限", src: "整合 ch2（挑錯）", core: true, diff: 2, examKey: true, kind: "fixit",
      card: "把使用者上傳目錄設成 chmod 777，錯在哪、怎麼改？",
      q: "管理員把網站『使用者上傳目錄』權限設為 chmod 777。這樣做的問題與正確修正是？",
      options: ["777 任何人可讀寫執行、可上傳 webshell；應收緊權限並禁止執行", "777 是伺服器預設標準權限，維持它上傳功能才正常", "應再加上 SUID 位（4777）讓程式以擁有者身分執行", "只要上傳目錄不放在網站根目錄下就沒有風險"],
      ans: 0,
      exp: "777 過度寬鬆＋可執行＝webshell 溫床。修正：最小權限（如目錄 755、檔案 644）、上傳目錄關閉執行、白名單驗證副檔名與內容。沒有 999 這種權限。",
      insight: "把權限數字連到真實後果：777 不是抽象的『太鬆』，而是『別人能放後門』。這就是最小權限原則要防的。",
      learn: { label: "OWASP：檔案上傳", url: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html" }
    },
    {
      id: "FIX-3", ch: 6, topic: "密碼儲存", src: "整合 ch6（挑錯）", core: true, diff: 3, examKey: true, kind: "fixit",
      card: "系統把使用者密碼用 md5() 或明文存進資料庫，錯在哪、怎麼改？",
      q: "某系統把使用者密碼用 md5(密碼) 存入資料庫。這樣做的問題與正確修正是？",
      options: ["MD5 快又可被彩虹表/暴力破解；應改用 bcrypt/argon2 加鹽", "MD5 是單向雜湊無法還原，用來存密碼已足夠安全", "改用 Base64 編碼儲存即可，編碼後別人看不懂", "把密碼連續做兩次 MD5（雙重雜湊）就夠強"],
      ans: 0,
      exp: "MD5 運算太快、易被破解，明文更糟。修正：用 bcrypt/scrypt/argon2 這類慢雜湊＋隨機鹽。系統只需比對、不需還原密碼，所以要『雜湊』不是『加密』。",
      insight: "這題連到『雜湊 vs 加密』與『資料外洩風險』：密碼該單向雜湊加鹽。看到 md5/明文存密碼，就要知道錯在哪、怎麼修。",
      learn: { label: "OWASP：密碼儲存", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }
    },
    {
      id: "FIX-4", ch: 4, topic: "Cookie 安全", src: "整合 ch4（挑錯）", core: false, diff: 2, kind: "fixit",
      card: "登入後設 Set-Cookie: session=... 但沒有任何安全屬性，該補什麼？",
      q: "某網站登入後回傳 `Set-Cookie: session=abc123`（沒有任何安全屬性）。應補上哪些屬性、各防什麼？",
      options: [
        "HttpOnly（防 JS/XSS 竊取）、Secure（只走 HTTPS）、SameSite（防 CSRF）",
        "只要加 Expires 讓它永不過期",
        "把 session 值加長就安全了",
        "Cookie 不需要任何屬性"
      ],
      ans: 0,
      exp: "缺安全屬性的 Session Cookie 易被 XSS 竊取、明文外洩、被 CSRF 利用。修正：HttpOnly＋Secure＋SameSite，三者各擋一種威脅。",
      insight: "同一個 Cookie，用不同屬性防不同攻擊（XSS/竊聽/CSRF）——這就是縱深防禦的縮影。",
      learn: { label: "MDN：Cookie 安全", url: "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies#restrict_access_to_cookies" }
    },
    {
      id: "FIX-5", ch: 3, topic: "XSS", src: "整合 ch3（挑錯）", core: true, diff: 2, examKey: true, kind: "fixit",
      card: "PHP 直接 echo $_GET['q'] 到頁面，錯在哪、怎麼改？",
      q: "某頁面直接 `echo $_GET['q'];` 把使用者輸入輸出到 HTML。問題與正確修正是？",
      options: ["有反射型 XSS 風險（輸入被當 HTML/JS 執行）；應做輸出編碼", "在 echo 前用 trim() 去除前後空白就不會有 XSS", "改用 print 或 printf 輸出就會自動過濾危險標籤", "在前端用 JavaScript 事先過濾 <script> 字串就夠"],
      ans: 0,
      exp: "未編碼就輸出使用者輸入 → 反射型 XSS。修正：輸出時做 HTML 實體編碼（htmlspecialchars），前端用 textContent 取代 innerHTML，並可加 CSP。print/改名無效。",
      insight: "注入類漏洞的共通病根：輸入未經處理進了會被解析執行的地方。SQLi 用參數化、XSS 用輸出編碼——藥不同，病理相同。",
      learn: { label: "OWASP：XSS 防禦", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" }
    },
    {
      id: "FIX-6", ch: 6, topic: "最小權限", src: "整合 ch6（挑錯）", core: true, diff: 2, examKey: true, kind: "fixit",
      card: "網站程式用 root 帳號連資料庫，錯在哪、怎麼改？",
      q: "某網站程式直接用資料庫的 root（最高權限）帳號連線。問題與正確修正是？",
      options: ["被注入即得全庫最高權限（爆炸半徑極大）；應改用最小權限帳號", "用 root 沒關係，只要把資料庫連接埠改成非預設值", "只要 root 密碼夠長且定期更換就不會有風險", "改用具 GRANT 權限的帳號，方便動態調整權限"],
      ans: 0,
      exp: "用 root 連線違反最小權限：被攻破即全盤皆輸。修正：建立只有該應用所需權限（如僅 SELECT/INSERT 特定表）的帳號。這不能取代參數化查詢，兩者要並用。",
      insight: "最小權限是『限制後果』、參數化是『防止發生』——縱深防禦要兩層都做。用 root 連線是很常見卻很危險的設定錯誤。",
      learn: { label: "OWASP：資料庫安全", url: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html" }
    },
    {
      id: "FIX-7", ch: 1, topic: "HTTPS", src: "整合 ch1（挑錯）", core: true, diff: 2, kind: "fixit",
      card: "登入頁用 HTTP 明文傳帳號密碼，錯在哪、怎麼改？",
      q: "某登入頁使用 HTTP（非 HTTPS）傳送帳號密碼。問題與正確修正是？",
      options: [
        "明文傳輸可被監聽/竄改（中間人攻擊）；應改用 HTTPS（TLS）加密，並用 HSTS 強制",
        "HTTP 有密碼欄位就安全了",
        "把密碼欄位設成 type=password 就安全",
        "只要網址很長就不會被監聽"
      ],
      ans: 0,
      exp: "HTTP 明文＝任何在路徑上的人都能看到帳密。type=password 只是畫面遮住、傳輸仍是明文。修正：全站 HTTPS＋HSTS。",
      insight: "『看不見』不等於『加密』：type=password、POST 都只是不顯示，真正保護傳輸的是 TLS。這連到 HTTP 明文的三大弱點與 OWASP 加密失效。",
      learn: { label: "Cloudflare：HTTPS", url: "https://www.cloudflare.com/zh-tw/learning/ssl/what-is-https/" }
    },

    /* ================= 遷移題（丟到沒看過的新情境）================= */
    {
      id: "TR-1", ch: 2, topic: "最小權限", src: "整合 ch2（遷移）", core: true, diff: 3, examKey: true, kind: "transfer",
      card: "全公司共用同一組管理員帳號登入系統，會有什麼問題？",
      q: "某公司所有員工都用『同一組管理員帳號』登入內部系統。這主要違反什麼原則、會帶來什麼風險？",
      options: ["違反最小權限與可歸責性：人人皆管理員，出事無法追查是誰", "共用一組帳號比較好管理、權限統一，是推薦做法", "唯一影響是同時登入人數多時較慢，安全上沒問題", "共用帳號可減少帳號數、縮小攻擊面，反而更安全"],
      ans: 0,
      exp: "共用高權限帳號＝每個人都能造成最大破壞，且日誌無法對應到個人（不可歸責）。修正：個別帳號、最小權限、必要時才提權、稽核日誌。",
      insight: "把『最小權限＋職責分離＋可歸責性』這組觀念遷移到一個沒明講的情境——這正是理解(而非背題)才答得出來的題型。",
      learn: { label: "NIST：存取控制", url: "https://csrc.nist.gov/glossary/term/least_privilege" }
    },
    {
      id: "TR-2", ch: 4, topic: "安全配置", src: "整合 ch4（遷移）", core: true, diff: 2, examKey: true, kind: "transfer",
      card: "網站把含 SQL 語句與堆疊的詳細錯誤訊息直接顯示給使用者，問題？",
      q: "某網站發生錯誤時，把含 SQL 語句、檔案路徑、堆疊追蹤的『詳細錯誤訊息』直接顯示給使用者。主要風險是？",
      options: ["資訊洩漏：把系統結構與漏洞線索送給攻擊者；應顯示通用錯誤", "顯示詳細錯誤能讓使用者回報問題，對安全有幫助", "正式環境顯示完整堆疊有助快速除錯，是建議做法", "錯誤訊息只是純文字，對資安沒有實質影響"],
      ans: 0,
      exp: "詳細錯誤等於免費情報（對應 OWASP 安全配置錯誤／異常處理不當）。修正：使用者看通用訊息、詳情記在後端日誌、fail securely。",
      insight: "遷移『資訊洩漏』與『安全的錯誤處理』到新情境。攻擊者最愛這種『幫他偵查』的設定——SQLi 也常靠錯誤訊息推斷結構。",
      learn: { label: "OWASP：錯誤處理", url: "https://owasp.org/www-community/Improper_Error_Handling" }
    },
    {
      id: "TR-3", ch: 1, topic: "網路分段", src: "整合 ch1（遷移）", core: true, diff: 3, examKey: true, kind: "transfer",
      card: "把伺服器、員工電腦、訪客 WiFi 全放同一網段，會有什麼問題？",
      q: "某公司把『核心伺服器、員工電腦、訪客 WiFi』全部放在同一個網段。主要風險與正確做法是？",
      options: ["缺乏網路分段：被入侵的電腦可橫向移動到核心；應以 VLAN 分段隔離", "全放同一網段可減少路由、提升速度，是推薦做法", "只要訪客 WiFi 密碼夠強，同一網段也不會有問題", "網路分段會阻斷正常通訊、降低可用性，應避免"],
      ans: 0,
      exp: "扁平網路＝一台被攻破就能打到全部（橫向移動）。修正：網路分段（子網/VLAN）、最小化跨段通訊、DMZ 隔離對外服務。",
      insight: "把『網路分段、橫向移動、DMZ、最小權限』遷移到公司網路設計。分段的精神和 DB 帳號隔離一樣：縮小事故的爆炸半徑。",
      learn: { label: "Cloudflare：網路分段", url: "https://www.cloudflare.com/learning/access-management/what-is-network-segmentation/" }
    },
    {
      id: "TR-4", ch: 4, topic: "輸入驗證", src: "整合 ch4（遷移）", core: true, diff: 3, examKey: true, kind: "transfer",
      card: "只在前端用 JavaScript 檢查輸入、後端完全不檢查，為什麼危險？",
      q: "某網站只在『前端用 JavaScript』檢查輸入是否合法，後端完全不驗證。為什麼這樣不安全？",
      options: ["前端檢查可被繞過（用 curl 直接送請求）；驗證必須在後端做", "前端 JavaScript 已能擋大部分惡意輸入，後端多餘", "後端驗證增加伺服器負擔，交給前端做較好也夠安全", "瀏覽器的 JavaScript 驗證無法被關閉或竄改，可信"],
      ans: 0,
      exp: "攻擊者不透過你的網頁、直接送請求就繞過前端。修正：所有安全相關驗證都要在後端做（前端可另做以提升體驗）。",
      insight: "遷移『信任邊界』觀念：前端在使用者掌控中、不可信。這也是為何 SQLi/XSS 防禦一定要在伺服器端做，不能只靠前端。",
      learn: { label: "OWASP：輸入驗證", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html" }
    },

    /* ================= 連結題（A 觀念與 B 觀念的關係）================= */
    {
      id: "CN-1", ch: 4, topic: "跨章：OSI 與防禦分工", src: "整合 ch1/ch4（連結）", core: true, diff: 3, examKey: true, kind: "connect",
      card: "OSI 分層 和『防火牆 vs WAF 的分工』有什麼關係？",
      q: "『OSI 分層』和『網路層防火牆 vs WAF 的分工』之間的關係，何者最正確？",
      options: ["不同層攻擊要不同層工具擋：L3/L4 給防火牆、L7 的 XSS/SQLi 給 WAF", "兩者無關，一個防火牆就能擋所有層級的攻擊", "WAF 運作在第一層實體層，處理線路訊號", "OSI 分層只跟硬體有關，與資安防禦無關"],
      ans: 0,
      exp: "把攻擊掛回 OSI 層，就知道該由誰防：網路層防火牆守 L3/L4、WAF 守 L7、IDS/IPS 偵測與阻擋。這就是縱深防禦的分工。",
      insight: "連結題把第一章(OSI)和第四章(防火牆/WAF)織成網：理解『這攻擊在哪一層 → 哪個工具擋』，比分開背兩章更牢。",
      learn: { label: "Cloudflare：WAF", url: "https://www.cloudflare.com/zh-tw/learning/ddos/glossary/web-application-firewall-waf/" }
    },
    {
      id: "CN-2", ch: 6, topic: "跨章：權限落實", src: "整合 ch2/ch6（連結）", core: true, diff: 3, examKey: true, kind: "connect",
      card: "Linux 檔案權限 和 資料庫 GRANT/REVOKE 有什麼共通點？",
      q: "『Linux 檔案權限 (rwx)』和『資料庫的 GRANT/REVOKE』之間的關係，何者最正確？",
      options: ["兩者都是最小權限原則在不同層的落實，只給必要存取", "兩者無關，一個管檔案、一個管網路連線", "一個是加密機制、另一個是資料備份機制", "都是用來提升系統執行速度的效能設定"],
      ans: 0,
      exp: "檔案權限管『誰能讀寫執行這個檔』、GRANT/REVOKE 管『誰能對這張表做什麼』，本質都是存取控制＋最小權限。",
      insight: "連結題揭示『同一個大觀念，換層換名字』：最小權限在作業系統叫檔案權限、在資料庫叫 GRANT/REVOKE、在網路叫分段。抓住原則就一通百通。",
      learn: { label: "MySQL：GRANT", url: "https://dev.mysql.com/doc/refman/8.0/en/grant.html" }
    },
    {
      id: "CN-3", ch: 4, topic: "跨章：注入是一類", src: "整合 ch4/ch6（連結）", core: true, diff: 2, examKey: true, kind: "connect",
      card: "OWASP 的『注入 (Injection)』和 SQL Injection 是什麼關係？",
      q: "OWASP 的『注入攻擊 (Injection)』和『SQL Injection』之間的關係是？",
      options: ["SQL Injection 是『注入』大類下的一個實例；OS/LDAP 注入同原理", "兩者完全相同、沒有大類與實例之分", "SQL Injection 不屬於注入，屬於存取控制問題", "注入攻擊只有 SQL 一種，沒有其他類型"],
      ans: 0,
      exp: "『注入』是類別、SQLi 是實例。共通根因：不可信輸入被當成命令/查詢的一部分執行。理解類別，就能一次掌握一整片相關漏洞。",
      insight: "連結『大類 ↔ 實例』：與其分開背 SQLi、命令注入、LDAP 注入，不如記住它們同屬『資料與程式碼未分離』，防禦也同源。",
      learn: { label: "OWASP：Injection", url: "https://owasp.org/Top10/A03_2021-Injection/" }
    }
  ]
};
