/* 參數化題庫：每次作答數字/情境都不同，答案跟著變 → 無法背答案，只能懂「方法」。
   每個生成器有穩定 id（給 SRS/觀念掌握度追蹤），gen() 回傳一道全新的單選 MCQ。
   皆為單選，符合期中考格式；也用於鞏固觀念（練方法而非背特例）。 */
(function(){
  function R(n){ return Math.floor(Math.random()*n); }          // 0..n-1
  function pick(a){ return a[R(a.length)]; }
  function shuffleArr(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]];} return a; }
  // 組成 4 選項：正解 + 3 個不重複誘答；不足時用 padFn 補
  function buildOptions(correct, cands, padFn){
    const opts=[correct], seen=new Set([correct]);
    for(const c of cands){ if(opts.length>=4) break; if(!seen.has(c)){ opts.push(c); seen.add(c); } }
    let g=0;
    while(opts.length<4 && g++<200){ const c=padFn(); if(!seen.has(c)){ opts.push(c); seen.add(c); } }
    return { options: opts, ans: 0 };   // ans=0；顯示時 App 會再洗牌
  }
  const sym = v => (v&4?'r':'-')+(v&2?'w':'-')+(v&1?'x':'-');
  function maskOf(n){ const b='1'.repeat(n)+'0'.repeat(32-n);
    return [0,1,2,3].map(i=>parseInt(b.slice(i*8,i*8+8),2)).join('.'); }

  window.QUIZ_GENERATORS = [
    {
      id:"GEN-chmod-n2s", ch:2, topic:"檔案權限", kind:"apply", core:true, examKey:true, src:"參數化：權限換算",
      gen(){
        const a=R(8),b=R(8),c=R(8), correct=sym(a)+sym(b)+sym(c);
        const {options,ans}=buildOptions(correct, [], ()=>sym(R(8))+sym(R(8))+sym(R(8)));
        return { q:`chmod ${a}${b}${c} 對應的符號權限 (rwx) 是？`, options, ans,
          exp:`每位數字拆成 r=4、w=2、x=1：${a}=${sym(a)}、${b}=${sym(b)}、${c}=${sym(c)} → ${correct}。`,
          insight:`數字每次都不同，背答案沒用——把每個 0–7 拆成 r(4)/w(2)/x(1) 才是能帶走的方法。` };
      }
    },
    {
      id:"GEN-chmod-s2n", ch:2, topic:"檔案權限", kind:"apply", core:false, src:"參數化：權限換算",
      gen(){
        const seg=()=>{const r=R(2),w=R(2),x=R(2);return {s:(r?'r':'-')+(w?'w':'-')+(x?'x':'-'),n:r*4+w*2+x};};
        const A=seg(),B=seg(),C=seg(), correct=`${A.n}${B.n}${C.n}`;
        const {options,ans}=buildOptions(correct, [], ()=>`${R(8)}${R(8)}${R(8)}`);
        return { q:`權限 ${A.s}${B.s}${C.s} 對應的 chmod 數字是？`, options, ans,
          exp:`r=4、w=2、x=1 相加：${A.s}=${A.n}、${B.s}=${B.n}、${C.s}=${C.n} → ${correct}。`,
          insight:`符號↔數字互轉，靠的是 r4/w2/x1，不是背某個組合。` };
      }
    },
    {
      id:"GEN-subnet-hosts", ch:1, topic:"子網路遮罩", kind:"apply", core:true, examKey:true, src:"參數化：子網計算",
      gen(){
        const n=24+R(6); // /24../29
        const hosts=Math.pow(2,32-n)-2, correct=String(hosts);
        const cands=[String(hosts+2), String(Math.pow(2,33-n)-2), String(Math.max(0,Math.pow(2,31-n)-2)), String(hosts+1)].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>String(hosts+3+R(60)));
        return { q:`一個 /${n} 的子網路，可用主機數是多少？`, options, ans,
          exp:`可用主機 = 2^(主機位數) − 2 = 2^(32−${n}) − 2 = 2^${32-n} − 2 = ${hosts}。（扣掉網路位址與廣播位址）`,
          insight:`重點是公式 2^(32−N)−2，N 每次不同就背不了；那個 −2 永遠是網路位址＋廣播位址。` };
      }
    },
    {
      id:"GEN-subnet-net", ch:1, topic:"子網路遮罩", kind:"apply", core:false, src:"參數化：子網計算",
      gen(){
        const nn=25+R(5); // /25../29
        const block=Math.pow(2,32-nn);           // 最後一段的區塊大小 2..128
        const c2=R(256), host=R(256), net=Math.floor(host/block)*block;
        const correct=`192.168.${c2}.${net}`;
        const cands=[`192.168.${c2}.${host}`, `192.168.${c2}.${net+block-1}`, `192.168.${c2}.0`].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>`192.168.${c2}.${R(256)}`);
        return { q:`IP 192.168.${c2}.${host} 使用 /${nn} 遮罩，其網路位址是？`, options, ans,
          exp:`/${nn} 在最後一段的區塊大小 = ${block}；${host} 落在 ${net}–${net+block-1} 這段 → 網路位址 192.168.${c2}.${net}。`,
          insight:`網路位址 = IP AND 遮罩；用「區塊大小 = 256 − 遮罩末段」找邊界。數字會變，方法不變。` };
      }
    },
    {
      id:"GEN-cidr2mask", ch:1, topic:"CIDR", kind:"apply", core:true, examKey:true, src:"參數化：CIDR 換算",
      gen(){
        const n=8+R(23); // /8../30
        const correct=maskOf(n);
        const cands=[maskOf(n+1),maskOf(Math.max(1,n-1)),maskOf(Math.min(32,n+2)),maskOf(Math.max(1,n-2))].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>maskOf(8+R(23)));
        return { q:`CIDR /${n} 對應的子網路遮罩（點分十進制）是？`, options, ans,
          exp:`/${n} = 前 ${n} 位為 1，其餘為 0，每 8 位轉十進制 → ${correct}。`,
          insight:`把 /N 想成「N 個連續的 1」，/24=255.255.255.0、/16、/8 落在位元組邊界，其餘照推。` };
      }
    },
    {
      id:"GEN-port", ch:1, topic:"通訊埠", kind:"term", core:false, src:"參數化：埠號回想",
      gen(){
        const P=[['HTTP',80],['HTTPS',443],['SSH',22],['FTP 控制',21],['DNS',53],['SMTP',25],['Telnet',23],['RDP',3389],['MySQL',3306],['POP3',110]];
        const [svc,port]=pick(P), correct=String(port);
        const cands=shuffleArr(P.filter(p=>p[1]!==port).map(p=>String(p[1])));
        const {options,ans}=buildOptions(correct, cands, ()=>String(1+R(9999)));
        return { q:`服務 ${svc} 的預設通訊埠號是？`, options, ans,
          exp:`${svc} = ${port}。成組記：HTTP 80 / HTTPS 443、FTP 21 / SSH 22、DNS 53、SMTP 25。`,
          insight:`每次隨機抽服務，背位置沒用；用「明文↔加密成對」記：HTTP80↔HTTPS443、Telnet23↔SSH22。` };
      }
    },
    {
      id:"GEN-bin2dec", ch:1, topic:"IP 位址", kind:"apply", core:false, src:"參數化：二進制換算",
      gen(){
        const v=R(256), bin=v.toString(2).padStart(8,'0'), correct=String(v);
        const cands=[String((v+1+R(8))%256), String((v+248+R(8))%256), String((v^ (1<<R(8))) & 255)].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>String(R(256)));
        return { q:`二進制 ${bin} 轉成十進制是多少？`, options, ans,
          exp:`位權 128,64,32,16,8,4,2,1 對應為 1 的位相加：${bin} = ${v}。`,
          insight:`IP 每一段就是一個 8 位二進制；學會位權相加，任何一段都能換算，不必背。` };
      }
    },
    {
      id:"GEN-subnet-bcast", ch:1, topic:"子網路遮罩", kind:"apply", core:false, src:"參數化：子網計算",
      gen(){
        const nn=25+R(5); // /25../29
        const block=Math.pow(2,32-nn), c2=R(256), host=R(256);
        const net=Math.floor(host/block)*block, bcast=net+block-1;
        const correct=`192.168.${c2}.${bcast}`;
        const cands=[`192.168.${c2}.${net}`, `192.168.${c2}.${host}`, `192.168.${c2}.255`].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>`192.168.${c2}.${R(256)}`);
        return { q:`IP 192.168.${c2}.${host} 使用 /${nn} 遮罩，其廣播位址是？`, options, ans,
          exp:`區塊大小 = ${block}；此段範圍 ${net}–${bcast}，廣播位址 = 該段最後一個(主機位全 1) = 192.168.${c2}.${bcast}。`,
          insight:`廣播位址 = 網路位址 + 區塊大小 − 1（主機位全 1）；網路位址與廣播位址不可分配給主機，這就是「−2」的由來。` };
      }
    },
    {
      id:"GEN-ttl-hops", ch:1, topic:"TTL", kind:"apply", core:false, src:"參數化：TTL 遞減",
      gen(){
        const init=[64,128,255][R(3)], hops=1+R(20), correct=String(init-hops);
        const cands=[String(init), String(init-hops+1), String(init-hops-1), String(hops)].filter(x=>x!==correct);
        const {options,ans}=buildOptions(correct, cands, ()=>String(init-1-R(30)));
        return { q:`一個封包初始 TTL = ${init}，經過 ${hops} 個路由器（跳站）後，TTL 剩多少？`, options, ans,
          exp:`TTL 每經過一個路由器減 1：${init} − ${hops} = ${init-hops}。歸零就會被丟棄，避免封包無限繞行。`,
          insight:`重點是「每一跳減 1」這個機制，不是背某個初始值。traceroute 正是利用逐步加大 TTL、看在第幾跳被回報，畫出路徑。` };
      }
    }
  ];
})();
