/* 教材課文：從講義整理成「讀了就能懂」的原創講解。每章對應題庫章節，讀完接著做該章的題。
   資料以全域變數提供（file:// 也能讀）。內容為 HTML 片段。 */
window.LESSONS = {
  "1": { title: "網路基礎入門", done: true, html: `
<h3>1. 為什麼要先懂網路？</h3>
<p>幾乎所有攻擊都在「網路」上發生：偵蒐、傳輸、竊聽、注入。看不懂封包怎麼走、資料在哪一層被處理，就無法判斷「這種攻擊該在哪一層防」。所以網路是資安的地基。</p>

<h3>2. OSI 七層——資安的「分層地圖」</h3>
<p>把網路通訊拆成七層，每層各司其職。<b>記憶重點是「哪一層 → 對應什麼攻擊 → 用什麼防」</b>：</p>
<ul>
<li><b>L7 應用層</b>（HTTP/DNS/SSH）：SQLi、XSS 在這 → 輸入驗證、WAF</li>
<li><b>L4 傳輸層</b>（<b>TCP/UDP</b>）：SYN 洪水 → 防火牆、SYN cookie</li>
<li><b>L3 網路層</b>（<b>IP/路由器</b>）：IP 欺騙 → 網路層防火牆</li>
<li><b>L2 資料鏈路層</b>（<b>MAC/ARP/交換機</b>）：ARP 欺騙 → 埠安全</li>
<li>L1 實體層：線纜/位元流</li>
</ul>
<p>OSI 由 ISO 於 1984 提出（理論 7 層）；實務上用 <b>TCP/IP（4–5 層）</b>。</p>

<h3>3. TCP vs UDP vs IP</h3>
<ul>
<li><b>TCP</b>：連接導向、可靠、有序，先做「<b>三向交握</b>」（SYN → SYN-ACK → ACK）才傳。</li>
<li><b>UDP</b>：無連接、快、無重傳（串流、DNS 查詢用）。</li>
<li><b>IP</b>：無連接、<b>盡力而為（Best Effort）、不可靠</b>——可靠性交給上層的 TCP。</li>
</ul>

<h3>4. IP 位址與子網路（會考計算）</h3>
<ul>
<li>IPv4＝<b>32</b> 位、IPv6＝<b>128</b> 位。</li>
<li>私有 IP（RFC1918）：<b>10/8、172.16/12、192.168/16</b>；特殊：127.0.0.1（本機）、169.254（DHCP 失敗 APIPA）、255.255.255.255（廣播）。</li>
<li><b>網路位址 = IP AND 遮罩</b>；<b>可用主機 = 2^(主機位) − 2</b>（扣掉網路位址與廣播位址）。例：/24 有 254 台、/26 有 62 台。</li>
<li><b>NAT</b>：把私有 IP 轉公共 IP 上網（PAT 用埠號多對一），順帶隱藏內部——但 NAT 不是安全機制。</li>
<li><b>VLAN（L2）</b> 用標籤分段、<b>子網路（L3）</b> 用 IP 分段；分段的目的都是「限制橫向移動、縮小事故範圍」。</li>
</ul>

<h3>5. 通訊埠與 Wireshark</h3>
<ul>
<li>埠範圍：0–1023 熟知、1024–49151 註冊、49152–65535 動態（總 0–65535）。</li>
<li>常考：HTTP 80／HTTPS 443／SSH 22／DNS 53／FTP 21,20／SMTP 25／RDP 3389。</li>
<li>Wireshark <b>顯示過濾</b>（越精確越好）如 <code>ip.addr==x and tcp.port==443</code>；<b>擷取過濾</b>（BPF，如 <code>host x</code>）越寬鬆越好。掃埠工具：<b>Nmap</b>。</li>
</ul>

<h3>6. 網路服務：DNS / HTTP / FTP / SSH</h3>
<ul>
<li><b>DNS</b>：域名→IP。記錄 <b>A</b>(IPv4)/<b>AAAA</b>(IPv6)/<b>CNAME</b>(別名)/<b>MX</b>(郵件)。<b>DNSSEC＝驗證（不加密）</b>；<b>DoH/DoT＝加密查詢</b>——別搞混「驗證」與「加密」。</li>
<li><b>HTTP</b> 無狀態 → 用 Cookie/Session。狀態碼：<b>401 需登入</b> vs <b>403 沒權限</b>（對應認證失效 vs 存取控制失效）；404 找不到、5xx 伺服器錯。</li>
<li><b>HTTPS＝HTTP＋TLS(443)</b>：加密＋驗證伺服器＋完整性，擋中間人。</li>
<li>「明文老協定 → 加密替代品」成對記：<b>FTP(21/20)→SFTP(22)、Telnet→SSH(22)、HTTP→HTTPS</b>。</li>
</ul>

<h3>7. Ping / ICMP / TTL</h3>
<ul>
<li>ping 靠 <b>ICMP</b>：送 Echo Request(<b>Type 8</b>)、回 Echo Reply(<b>Type 0</b>)。</li>
<li><b>TTL 每經一個路由器減 1</b>，歸零丟棄（避免無限繞行）；預設 Windows 128、Linux 64——可藉此粗判 OS。traceroute 就是利用 TTL 逐跳遞增。</li>
</ul>

<h3>8. 威脅與偵查（大分類）</h3>
<ul>
<li>攻擊：<b>DDoS</b>（破壞可用性）、<b>中間人 MITM</b>（HTTPS/VPN 防）、<b>ARP 欺騙</b>（一 IP 對多 MAC）。</li>
<li>設備：<b>IDS 偵測告警</b> vs <b>IPS 主動阻擋</b>；SIEM 集中日誌。</li>
<li>惡意程式：<b>蠕蟲</b>(自走)/<b>病毒</b>(寄生)/<b>木馬</b>(偽裝)/後門/勒索。</li>
<li>評估：<b>弱點掃描</b>(自動找已知漏洞) vs <b>滲透測試</b>(模擬實攻、黑/白/灰箱)——都需授權。</li>
</ul>
<p class="tip">讀完了？去做「第 1 章」的題驗證一下——尤其子網計算與 401/403、DNSSEC vs DoH 這幾個高頻考點。</p>
` },

  "2": { title: "系統基礎入門", done: true, html: `
<h3>1. 作業系統為什麼是資安防線</h3>
<p>OS 管理硬體與程式，也是攻擊者最想拿下的目標（拿到系統＝控制一切）。核心觀念：<b>權限分層</b>——核心模式（Kernel，最高權限、直接管硬體）vs 使用者模式（跑應用、權限受限），把不可信程式關在低權限。</p>

<h3>2. Linux 檔案權限（必考）</h3>
<ul>
<li>r=4、w=2、x=1；<code>755</code>=rwxr-xr-x、<code>644</code>=rw-r--r--、敏感檔用 600/700。</li>
<li>對象：擁有者 u / 群組 g / 其他 o；指令 chmod/chown/umask。</li>
<li><b>/etc/shadow</b>＝加密密碼、只有 root 可讀（第一道防線）。</li>
<li><b>特殊權限</b>：<b>SUID(4)</b> 以「檔案擁有者」身分執行 → root+SUID 有漏洞就被提權；SGID(2)；Sticky(1，/tmp 限制只能刪自己的檔）。</li>
</ul>

<h3>3. 常用指令與 Shell 安全</h3>
<ul>
<li>監控：<code>tail -f</code> 看日誌、<code>grep</code> 找可疑、<code>ps aux</code> 找程序、<b>ss/netstat</b> 看連線。</li>
<li>危險：<code>rm -rf /</code>（用 <code>--preserve-root</code> 防呆）；<b>PATH 劫持</b>＝竄改 PATH 讓系統跑到惡意程式。</li>
</ul>

<h3>4. Windows 安全</h3>
<ul>
<li><b>UAC</b>：提權前跳確認，避免程式偷偷取得管理員權限。</li>
<li><b>BitLocker</b>（整顆磁碟，常搭 TPM）vs <b>EFS</b>（個別檔案）。</li>
<li>防火牆設定檔：公用/私人/網域；<b>RDP 要開 NLA</b>（連線前先驗證）；事件檢視器（攻擊者會清日誌反鑑識）；Sysinternals（Autoruns 查自啟動）。</li>
<li>Linux 強化：SELinux/AppArmor（強制存取控制）。</li>
</ul>

<h3>5. 帳號與驗證</h3>
<ul>
<li><b>MFA 三因素</b>：知識(密碼)／擁有(裝置)／生物(指紋)——要兩種<b>不同類</b>才算多因素。</li>
<li>帳號攻擊：<b>暴力破解</b>(單帳號猛試) vs <b>密碼噴灑</b>(一密碼試多帳號、避開鎖定)；APT（長期潛伏）。</li>
</ul>
<p class="tip">重點：權限數字換算、SUID 提權、暴力破解 vs 密碼噴灑、BitLocker vs EFS。</p>
` },

  "3": { title: "網站開發基礎", done: true, html: `
<h3>1. 前端三本柱</h3>
<p>HTML＝結構、CSS＝樣式、JavaScript＝互動行為。理解它們才懂前端漏洞在哪。</p>
<ul>
<li>HTML：block（div/p 獨佔一行）vs inline（span/a 並排）；語意標籤 nav/header/article；表單 method <b>GET(參數在URL)/POST(body,送敏感資料)</b>、label 的 <code>for</code> 綁 <code>id</code>。</li>
<li>CSS：選擇器 <code>#id .class 元素</code>；盒模型 margin(外)/padding(內)；<b>Flexbox 一維</b> vs <b>Grid 二維</b>；<code>@media</code>＝RWD。</li>
<li>JS：<b>let/const</b>(區塊作用域) vs var；DOM 的 <b>innerText</b>(安全) vs <b>innerHTML</b>(會解析 HTML → XSS 風險)。</li>
</ul>

<h3>2. 資安三支柱 CIA（貫穿全課）</h3>
<ul>
<li><b>機密性</b>(不被看到→加密)、<b>完整性</b>(不被竄改→雜湊/簽章)、<b>可用性</b>(需要時可用→備份/防 DDoS)。</li>
<li>看任何攻擊都問「它傷哪個 C/I/A」。</li>
</ul>

<h3>3. XSS（跨站腳本）</h3>
<ul>
<li>把惡意 JS 注入網頁、在別人瀏覽器執行。三型：<b>儲存型</b>(存 DB、危害最廣)／<b>反射型</b>(夾在 URL、靠釣魚)／<b>DOM 型</b>(前端 Source→Sink)。</li>
<li>防禦：<b>HTML 實體編碼</b>、用 textContent、<b>CSP</b>、<b>HttpOnly Cookie</b>(讓 JS 偷不到 Cookie)。</li>
</ul>

<h3>4. CSRF（跨站請求偽造）</h3>
<p>借「你已登入的身分」偽造請求（如轉帳）。防禦：<b>CSRF Token、SameSite Cookie、驗 Referer</b>。一句話：<b>XSS＝跑我的碼；CSRF＝借你的身分</b>。</p>
<p class="tip">重點：XSS 三型與防禦、CSRF vs XSS、CIA 三要素。</p>
` },

  "4": { title: "Web 應用程式安全（OWASP）", done: true, html: `
<h3>1. OWASP 與 Top 10（本課用 2025 版！）</h3>
<p>OWASP＝非營利國際組織，Top 10 是最常見的 Web 風險清單。<b>本課排序與網路上 2021 版不同，以講義為準</b>：</p>
<ul>
<li>A01 存取控制失效、A02 安全配置錯誤、A03 軟體供應鏈、A04 加密機制失效、<b>A05 注入</b></li>
<li>A06 不安全設計、A07 認證失效、A08 完整性失效、A09 日誌/告警失效、A10 異常處理不當</li>
</ul>
<p>防護對照：A01→最小權限/強制授權；A04→HTTPS/強演算法；A05→參數化查詢；A07→MFA。案例：Equifax(Struts 未修補)、SolarWinds(供應鏈)、WannaCry(MS17-010 SMB)。</p>

<h3>2. 漏洞掃描</h3>
<ul>
<li>工具：<b>OWASP ZAP</b>、Nikto、OpenVAS、Burp、Nessus。</li>
<li><b>CVSS</b> 0–10 評估嚴重性（危急 9–10）；<b>誤報</b>(多報假) vs <b>漏報</b>(放過真、更危險)——所以要人工驗證。</li>
</ul>

<h3>3. 防火牆 vs WAF</h3>
<ul>
<li>網路層防火牆（<b>L3/L4</b>，看 IP/埠；封包過濾/狀態檢測/NGFW）擋不了應用層攻擊。</li>
<li><b>WAF（L7）</b>：反向代理、深檢 HTTP、防 XSS/SQLi；<b>虛擬補丁</b>可在官方修補前先擋零日。</li>
</ul>

<h3>4. 兩個大觀念</h3>
<ul>
<li><b>認證(你是誰) vs 授權(你能做什麼)</b>——對應 401/403、A07/A01。</li>
<li><b>縱深防禦</b>：多層互補，一層破了還有下一層。</li>
</ul>
<p class="tip">重點：OWASP 2025 排序、注入防禦、防火牆 vs WAF、認證 vs 授權、誤報 vs 漏報。</p>
` },

  "5": { title: "資料庫基礎", done: true, html: `
<h3>1. SQL 分類與資料庫種類</h3>
<ul>
<li><b>DDL</b> 定義結構(CREATE/ALTER)｜<b>DML</b> 操作資料(SELECT/INSERT/UPDATE/DELETE)｜<b>DCL</b> 控權限(GRANT/REVOKE)。</li>
<li><b>RDBMS</b>(MySQL，表格關聯) vs <b>NoSQL</b>(Not Only SQL，鍵值/文件/圖形)。</li>
</ul>

<h3>2. 查詢與子句順序</h3>
<p>邏輯順序：FROM → <b>WHERE</b>(過濾列) → <b>GROUP BY</b> → <b>HAVING</b>(過濾聚合結果) → SELECT → ORDER BY → <b>LIMIT/OFFSET</b>(分頁)。所以聚合函數只能寫在 HAVING、不能寫在 WHERE。</p>
<ul>
<li>聚合：COUNT/SUM/AVG/MIN/MAX；NULL 用 <b>IS NULL</b>/COALESCE（不能用 =NULL）。</li>
</ul>

<h3>3. 鍵與關聯</h3>
<ul>
<li><b>主鍵 PK</b>：唯一、不可重複/NULL、一表一個；<b>外鍵 FK</b>：ON DELETE RESTRICT(禁刪)/CASCADE(連刪)。</li>
<li><b>INNER JOIN</b>(交集) vs <b>LEFT JOIN</b>(左表全部＋右邊補 NULL)；<b>UNION</b>(去重) vs UNION ALL(不去重)。</li>
</ul>

<h3>4. 進階</h3>
<p>索引加速查找（代價是佔空間/略增寫入）；<b>交易</b> BEGIN/COMMIT/ROLLBACK 保證<b>原子性</b>（全成或全不成，ACID 的 A）。</p>
<p class="tip">重點：DDL/DML/DCL、WHERE vs HAVING、JOIN 類型、UNION（也是 SQLi 基礎）、交易原子性。</p>
` },

  "6": { title: "資料庫安全入門", done: true, html: `
<h3>1. 資料庫安全六面向</h3>
<p>存取控制(避免 sa/root)、資料加密(AES/RSA＋金鑰管理)、備份、網路(SSL/防火牆)、應用(參數化查詢)、監控稽核。</p>

<h3>2. SQL Injection 原理與攻擊鏈</h3>
<ul>
<li>未過濾輸入被當 SQL 語法：<code>' OR '1'='1</code> 使條件恆真、<code>admin'--</code> 用註解截斷密碼檢查。</li>
<li>類型：錯誤型(讀錯誤訊息)、布林盲注、時間盲注。</li>
<li><b>union-based 完整鏈</b>：<code>order by N</code> 試欄位數 → <code>union select database(),version()</code> 探環境 → 查 <b>information_schema</b> 列舉表/欄 → <b>GROUP_CONCAT</b> 撈出帳密。</li>
</ul>

<h3>3. 防禦（三層縱深，貫穿觀念）</h3>
<ul>
<li><b>參數化查詢/Prepared Statement</b>（語法層，主力）——讓輸入永遠只當資料。</li>
<li><b>最小權限</b> DB 帳號（權限層，縮小爆炸半徑）——但不能取代參數化。</li>
<li><b>Stored Procedure ≠ 安全</b>：若 SP 內部動態拼接輸入（CONCAT+PREPARE）一樣可注入。</li>
<li>不明文存密碼(用 bcrypt 雜湊加鹽)、關詳細錯誤訊息、WAF；工具 <b>sqlmap</b> 驗證。</li>
</ul>

<h3>4. 管理與機密</h3>
<p><b>GRANT/REVOKE</b> 授/收權；<b>mysqldump</b> 備份(完整/差異/增量)；<b>.env</b> 存帳密要放文件根目錄外、擋 HTTP、加 <b>.gitignore</b>（別把密碼推上 GitHub）。</p>
<p class="tip">重點：SQLi 原理與 union 鏈、三層縱深防禦、SP 不等於安全、GRANT/REVOKE、.env。</p>
` }
};
