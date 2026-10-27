const S=[["Basic Hydra Facial","A gentle, multi-step facial that cleanses, exfoliates and hydrates the skin. A good starting point for fresher, smoother-looking skin.","M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"],
["Signature Hydra","An enhanced hydra facial with extra steps chosen for your skin's needs. Your specialist will guide the right options at consultation.","M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11zM9 14a3 3 0 0 0 3 3"],
["Microneedling","Controlled micro-channels made with a fine needling pen to support skin renewal. Suitability and number of sessions are decided at consultation.","M5 19L19 5M15 5l4 4M3 21l2-2M8 14l2 2"],
["PRP (Face)","A treatment using a preparation from your own blood, applied to the face to support skin refresh. Your specialist explains the process first.","M12 4v16M4 12h16M7 7l10 10M17 7L7 17"],
["Carbon Laser","A carbon mask followed by laser, often called a carbon peel, aimed at refreshing the skin's surface. Ask us if it suits your skin type.","M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3z"],
["Hair Removal: Full Body","Laser sessions for hair reduction across the whole body, planned in stages. The number of sessions depends on your hair and skin.","M12 3v18M7 8l5-5 5 5M6 21h12"],
["Full Face Laser","Laser hair removal for the whole face, done with care around sensitive areas. Your plan is set after a skin check.","M12 3a7 7 0 0 0-7 7c0 5 4 11 7 11s7-6 7-11a7 7 0 0 0-7-7zM9 10h.01M15 10h.01"],
["Underarms Laser","A quick laser session for the underarm area. Most areas need several sessions, which we will plan together with you.","M5 5c2 6 4 8 7 8s5-2 7-8M12 13v8"],
["Full Arms / Full Legs Laser","Laser hair reduction for larger areas such as full arms or full legs, planned in sessions that suit your schedule.","M8 3c0 6 4 6 4 12v6M16 3c0 6-4 6-4 12"],
["Microneedling (Scalp)","A needling pen treatment for the scalp, offered after a consultation about your hair and scalp concerns.","M4 14a8 8 0 0 1 16 0M8 14v3M12 14v5M16 14v3"],
["PRP (Scalp)","A preparation from your own blood applied to the scalp, offered after a consultation about your hair concerns.","M4 14a8 8 0 0 1 16 0M12 8v8M8 12h8"],
["Whitening Drips","An intravenous drip session offered after consultation. Your specialist will explain what the drip contains and who it suits.","M9 3h6M10 3v6l-4 9a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3l-4-9V3"],
["Multivitamin Drips","A multivitamin drip to support general wellness, given after a consultation and suitability check.","M9 3h6M10 3v6l-4 9a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3l-4-9V3M8 15h8"]];
const ic=p=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${p}"/></svg>`;
const G=[["Facial Treatments",[0,1,2,3,4]],["Laser Hair Removal",[5,6,7,8]],["Scalp Treatments",[9,10]],["Wellness Drips",[11,12]]];
const st='stroke="#3E2F13" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"',W="#FEFFFE",Gd="#D09D3F";
const sp=(x,y,s=1)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0-12L3-3 12 0 3 3 0 12-3 3-12 0-3-3z" fill="${W}"/>`;
const dr=(x,y,s=1)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0-30c15 20 24 33 24 46a24 24 0 0 1-48 0c0-13 9-26 24-46z" fill="${W}" ${st}/>`;
const fc=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${W}" ${st}/>`;
const bag=(x,c)=>`<path d="M${x-26} 14h52v50a26 26 0 0 1-52 0z" fill="${W}" ${st}/><path d="M${x-22} 42h44v22a22 22 0 0 1-44 0z" fill="${c}"/><path d="M${x} 90v22" ${st}/>`;
const tube=(x,c)=>`<rect x="${x-17}" y="12" width="34" height="96" rx="17" fill="${W}" ${st}/><rect x="${x-13}" y="56" width="26" height="48" rx="13" fill="${c}"/>`;
const beams=(x)=>`<path d="M${x} 36l54 14M${x} 60h56M${x} 84l54-14" stroke="${W}" stroke-width="4" stroke-dasharray="1 9" stroke-linecap="round"/>`;
const dev=`<rect x="14" y="40" width="34" height="40" rx="8" fill="${W}" ${st}/><circle cx="31" cy="60" r="7" fill="${Gd}"/>`;
const fig=(w)=>`<circle cx="100" cy="24" r="13" fill="${W}" ${st}/><path d="M100 40v36M${100-w} 52l${w} 8 ${w}-8M100 76l-20 36M100 76l20 36" fill="none" ${st} stroke-width="6"/>`;
const PH={"0": "/static/images/basic-hydra-facial.jpg", "1": "/static/images/signature-hydra.jpg", "2": "/static/images/microneedling.jpg", "3": "/static/images/prp-face.jpg", "4": "/static/images/carbon-laser.jpg", "6": "/static/images/full-face-laser.jpg", "7": "/static/images/underarms-laser.jpg", "11": "/static/images/whitening-drips.jpg", "12": "/static/images/multivitamin-drips.jpg", "5": "/static/images/hair-removal-full-body.jpg", "10": "/static/images/prp-scalp.jpg", "9": "/static/images/microneedling-scalp.jpg", "8": "/static/images/full-arms-full-legs-laser.jpg"};
const ILL=[
dr(100,52,1.2)+sp(46,36,1)+sp(158,34,.8)+`<circle cx="156" cy="84" r="6" fill="${W}"/><circle cx="44" cy="86" r="4" fill="${W}"/>`,
dr(88,54,1)+sp(136,38,1.4)+sp(160,76,.8)+sp(50,30,.7)+`<path d="M78 66a10 10 0 0 0 10 10" fill="none" stroke="${Gd}" stroke-width="4" stroke-linecap="round"/>`,
`<g transform="rotate(-28 100 60)"><rect x="66" y="44" width="68" height="30" rx="9" fill="${W}" ${st}/><path d="M76 74v14M88 74v14M100 74v14M112 74v14M124 74v14" ${st}/><path d="M100 44V8" ${st} stroke-width="6"/></g>`+sp(160,30,.9)+sp(40,94,.7),
tube(86,Gd)+dr(140,70,.8)+sp(46,36,.9)+sp(160,28,.7),
dev+beams(52)+fc(160,60,32)+`<circle cx="152" cy="52" r="3" fill="#3E2F13"/><circle cx="168" cy="52" r="3" fill="#3E2F13"/><path d="M150 72q10 8 20 0" fill="none" ${st}/>`,
fig(34)+sp(46,40,.9)+sp(156,52,.9)+sp(150,96,.6),
fc(100,64,38)+`<circle cx="88" cy="58" r="3" fill="#3E2F13"/><circle cx="112" cy="58" r="3" fill="#3E2F13"/><path d="M88 78q12 9 24 0" fill="none" ${st}/>`+`<path d="M100 8v14M60 20l8 12M140 20l-8 12" stroke="${W}" stroke-width="4" stroke-linecap="round"/>`+sp(42,86,.8)+sp(162,90,.8),
`<circle cx="100" cy="24" r="13" fill="${W}" ${st}/><path d="M100 40v38M100 50l-34-22M100 50l34-22M100 78l-18 34M100 78l18 34" fill="none" ${st} stroke-width="6"/>`+sp(56,22,1)+sp(144,22,1)+sp(162,84,.7),
fig(26)+`<path d="M60 60v10M140 60v10" ${st}/>`+sp(44,40,.8)+sp(158,40,.8)+sp(44,96,.6)+sp(158,96,.6),
`<circle cx="100" cy="72" r="36" fill="${W}" ${st}/><path d="M66 62a36 36 0 0 1 68 0" fill="none" stroke="${Gd}" stroke-width="6" stroke-linecap="round"/><g transform="rotate(20 100 24)"><rect x="82" y="8" width="36" height="16" rx="6" fill="${W}" ${st}/></g>`+sp(40,40,.8)+sp(162,38,.8),
`<circle cx="84" cy="72" r="34" fill="${W}" ${st}/><path d="M52 62a34 34 0 0 1 64 0" fill="none" stroke="${Gd}" stroke-width="6" stroke-linecap="round"/>`+tube(152,Gd)+sp(40,30,.8),
bag(100,"#F7F0E1")+dr(52,70,.5)+dr(152,76,.55)+sp(150,28,.9)+sp(46,32,.7),
bag(100,Gd)+`<circle cx="52" cy="40" r="10" fill="${W}" ${st}/><path d="M42 40h20" ${st}/><circle cx="152" cy="52" r="10" fill="${W}" ${st}/><path d="M142 52h20" ${st}/>`+sp(158,96,.8)+sp(44,92,.7)];

/* Elements that only exist on some pages. Every feature below checks that its element is present. */
const $=id=>document.getElementById(id),sg=$("sg"),sel=$("sel"),dg=$("dg"),tgd=$("tgd"),tg=$("tg"),m=$("m"),wab=$("wab"),f=$("f"),ok=$("ok"),lb=$("lb"),lbc=$("lbc"),lbp=$("lbp"),lbn=$("lbn"),lbi=$("lbi"),rm=$("rm"),abp=$("abp"),abx=$("abx"),home=location.pathname==="/",bk=home?"#book":"/#book";
if(sg)sg.innerHTML=G.map(g=>`<div class="grp"><h3 class="gt">${g[0]}</h3><div class="mn">${g[1].map(i=>`<a class="mi" href="${home?"":"/?treatment="+encodeURIComponent(S[i][0])}#book" data-t="${S[i][0]}">${PH[i]?`<span class="ph2" style="--bg:url(${PH[i]})"><img class="il" style="object-position:50% ${i==5?'56%':'50%'}" src="${PH[i]}" alt="${S[i][0]}" loading="lazy"></span>`:`<svg class="il" viewBox="0 0 200 120" role="img" aria-label="${S[i][0]}">${ILL[i]}</svg>`}<span class="tx"><b>${S[i][0]}</b><span>${S[i][1]}</span></span><span class="go btn sm">Book Now</span></a>`).join("")}</div></div>`).join("");
if(sel){sel.innerHTML='<option value="">Not sure yet</option>'+S.map(s=>`<option>${s[0]}</option>`).join("");const q=new URLSearchParams(location.search).get("treatment");if(q)sel.value=q}
if(tgd)tgd.innerHTML=[["Dr. Khola Ishtiaq","MBBS Medical Practitioner<br>D-Aesthetics London<br>Aesthetics UK"],["Dr. Mussa Khalid","MBBS Medical Practitioner"]].map(t=>`<article class="tm"><div class="tp" role="img" aria-label="Photo placeholder"><span>Photo</span></div><h3>${t[0]}</h3><p class="tq">${t[1]}</p></article>`).join("");
/* mobile menu (hamburger): open/close, and keep the 3-line icon in sync */
const closeMenu=()=>{if(m)m.classList.remove("open");if(tg)tg.setAttribute("aria-expanded","false")};
document.addEventListener("click",e=>{const a=e.target.closest("[data-t]");if(a&&sel)sel.value=a.dataset.t;if(m&&(e.target.closest("#m a")||(m.classList.contains("open")&&!e.target.closest("header"))))closeMenu()});
if(tg)tg.onclick=()=>{const o=m.classList.toggle("open");tg.setAttribute("aria-expanded",o)};
addEventListener("keydown",e=>{if(e.key==="Escape"&&m&&m.classList.contains("open")){closeMenu();if(tg)tg.focus()}});
matchMedia("(min-width:768px)").addEventListener("change",e=>{if(e.matches)closeMenu()});

const WA="923038922114";/* clinic WhatsApp number: country code + number, digits only, e.g. 923001234567 */
if(wab)wab.href=`https://wa.me/${WA}?text=${encodeURIComponent("Hello VIORA Aesthetics, I would like to book a consultation.")}`;
if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);const msg=`Hello VIORA Aesthetics, I would like to book a consultation.\nName: ${d.get("n")}\nPhone: ${d.get("p")}\nTreatment: ${d.get("t")||"Not sure yet"}`+(d.get("m")?`\nMessage: ${d.get("m")}`:"");ok.style.display="block";window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank","noopener");f.reset()};
/* Lightbox photos are read from the gallery already on the page. The server builds that gallery from GALLERY in app.py (same list for / and /gallery). */
let gi=0;const GI=[...document.querySelectorAll(".gal .gi")];
function show(n){if(!GI.length)return;gi=(n+GI.length)%GI.length;const im=GI[gi].querySelector("img");lbi.src=im.getAttribute("src");lbi.alt=im.alt}
GI.forEach((b,k)=>b.onclick=()=>{show(k);lb.hidden=false;lbc.focus()});
if(lb){lbc.onclick=()=>lb.hidden=true;lb.onclick=e=>{if(e.target===lb)lb.hidden=true};lbp.onclick=()=>show(gi-1);lbn.onclick=()=>show(gi+1)}
addEventListener("keydown",e=>{if(!lb||lb.hidden)return;if(e.key==="Escape")lb.hidden=true;if(e.key==="ArrowLeft")show(gi-1);if(e.key==="ArrowRight")show(gi+1)});
const CAT={0:"f",1:"f",2:"f",3:"f",4:"f",6:"fh",5:"hb",7:"hb",8:"hb",9:"h",10:"h",11:"b",12:"b"};
document.querySelectorAll(".mi").forEach(a=>a.dataset.c=CAT[S.findIndex(s=>s[0]===a.dataset.t)]||"");
document.querySelectorAll(".fl button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".fl button").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-pressed",x===b)});const f=b.dataset.f;document.querySelectorAll(".mi").forEach(a=>a.hidden=!(f==="all"||a.dataset.c.includes(f)));document.querySelectorAll(".grp").forEach(g=>g.hidden=!g.querySelector(".mi:not([hidden])"))});
if(rm)rm.onclick=()=>{const o=abp.classList.toggle("clamp");abx.hidden=o;rm.textContent=o?"Read More":"Read Less";rm.setAttribute("aria-expanded",!o)};
