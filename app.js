
'use strict';
const $ = id => document.getElementById(id);
let W = 669, H = 2037;
const SCALE=3;
// All ratios and windows are measured from the exact sample images supplied by the team.
const layouts = [
 {id:'strip4', name:'Dải 4 ảnh dọc',count:4,w:223*SCALE,h:679*SCALE, description:'Dải film cao và hẹp; 4 ô ảnh xếp thẳng theo mẫu 223 × 679.',slots:[[22,26,179,137],[22,173,179,134],[22,319,179,135],[22,465,179,138]].map(a=>a.map(v=>v*SCALE))},
 {id:'grid4', name:'Dải 4 ảnh vuông',count:4,w:444*SCALE,h:669*SCALE, description:'4 ảnh chia lưới 2 × 2, kích thước và khoảng cách đúng mẫu 444 × 669.',slots:[[26,45,192,291],[230,45,191,291],[26,347,192,290],[230,347,191,290]].map(a=>a.map(v=>v*SCALE))},
 {id:'press', name:'Photobooth báo chí',count:1,w:403*SCALE,h:577*SCALE, description:'Một ô ảnh nằm ngang giữa trang báo; giữ tiêu đề ở trên và nội dung ở dưới theo mẫu 403 × 577.',slots:[[22,166,357,200]].map(a=>a.map(v=>v*SCALE))}
];
const frames=[
 {id:'fem2',custom:{"w": 475, "h": 1447, "slots": [[40, 184, 397, 273], [40, 474, 397, 275], [40, 766, 397, 280], [40, 1063, 397, 315]]},title:'Nữ tính 2',category:'Nữ tính',layouts:['strip4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'fem3',custom:{"w": 486, "h": 1456, "slots": [[49, 62, 387, 270], [49, 367, 387, 272], [50, 668, 387, 267], [50, 965, 387, 267]]},title:'Nữ tính 3',category:'Nữ tính',layouts:['strip4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'fem4',custom:{"w": 458, "h": 1388, "slots": [[52, 218, 351, 222], [52, 487, 351, 225], [52, 760, 351, 231], [52, 1037, 351, 225]]},title:'Nữ tính 4',category:'Nữ tính',layouts:['strip4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'fem5',custom:{"w": 399, "h": 1276, "slots": [[58, 173, 282, 198], [58, 432, 282, 203], [58, 696, 282, 202], [58, 961, 282, 201]]},title:'Nữ tính 5',category:'Nữ tính',layouts:['strip4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'fem6',custom:{"w": 526, "h": 1472, "slots": [[48, 120, 431, 280], [48, 421, 431, 279], [48, 721, 431, 279], [48, 1022, 431, 279]]},title:'Nữ tính 6',category:'Nữ tính',layouts:['strip4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'retro1',custom:{"w": 517, "h": 1509, "slots": [[46, 82, 424, 309], [46, 416, 424, 303], [46, 743, 424, 297], [46, 1064, 424, 268]]},title:'Retro đỏ',category:'Retro',layouts:['strip4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retro2',custom:{"w": 520, "h": 1510, "slots": [[47, 82, 424, 309], [47, 415, 424, 304], [47, 742, 424, 297], [47, 1062, 424, 267]]},title:'Retro vàng',category:'Retro',layouts:['strip4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retro3',custom:{"w": 520, "h": 1508, "slots": [[48, 80, 424, 310], [48, 413, 424, 305], [48, 741, 424, 297], [48, 1062, 423, 268]]},title:'Retro đen',category:'Retro',layouts:['strip4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retro4',custom:{"w": 507, "h": 1494, "slots": [[47, 53, 415, 308], [46, 385, 416, 308], [47, 714, 415, 307], [47, 1042, 415, 298]]},title:'Retro airmail',category:'Retro',layouts:['strip4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'basic1',custom:{"w": 474, "h": 1456, "slots": [[40, 40, 395, 296], [40, 359, 395, 296], [40, 677, 395, 295], [40, 994, 395, 295]]},title:'Basic xanh',category:'Basic',layouts:['strip4'],bg:'#161616',ink:'#ffffff',accent:'#bcbcbc'},
 {id:'basic2',custom:{"w": 472, "h": 1461, "slots": [[38, 42, 395, 296], [38, 361, 395, 296], [38, 679, 395, 296], [38, 996, 395, 303]]},title:'Basic hồng nhạt',category:'Basic',layouts:['strip4'],bg:'#161616',ink:'#ffffff',accent:'#bcbcbc'},
 {id:'basic3',custom:{"w": 473, "h": 1458, "slots": [[39, 41, 394, 297], [39, 360, 394, 297], [39, 679, 394, 295], [39, 996, 394, 301]]},title:'Basic hồng',category:'Basic',layouts:['strip4'],bg:'#161616',ink:'#ffffff',accent:'#bcbcbc'},
 {id:'basic4',custom:{"w": 473, "h": 1462, "slots": [[39, 42, 396, 297], [39, 361, 396, 297], [39, 679, 396, 297], [39, 997, 396, 301]]},title:'Basic xám',category:'Basic',layouts:['strip4'],bg:'#161616',ink:'#ffffff',accent:'#bcbcbc'},
{id:'gridsq1',custom:{"w":1290,"h":1900,"slots":[[85, 218, 525, 680], [680, 218, 525, 680], [85, 1020, 525, 680], [680, 1020, 525, 680]]},title:'4 ô vuông xanh',category:'Nữ tính',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'gridsq2',custom:{"w":1290,"h":1900,"slots":[[85, 218, 525, 680], [680, 218, 525, 680], [85, 1020, 525, 680], [680, 1020, 525, 680]]},title:'4 ô vuông nơ hồng',category:'Nữ tính',layouts:['grid4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'gridsq3',custom:{"w":1290,"h":1900,"slots":[[85, 218, 525, 680], [680, 218, 525, 680], [85, 1020, 525, 680], [680, 1020, 525, 680]]},title:'4 ô vuông ruy băng',category:'Nữ tính',layouts:['grid4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'gridsq4',custom:{"w":1290,"h":1900,"slots":[[85, 218, 525, 680], [680, 218, 525, 680], [85, 1020, 525, 680], [680, 1020, 525, 680]]},title:'4 ô vuông kem',category:'Nữ tính',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'gridsq5',custom:{"w":1290,"h":1900,"slots":[[85, 218, 525, 680], [680, 218, 525, 680], [85, 1020, 525, 680], [680, 1020, 525, 680]]},title:'4 ô vuông tem thư',category:'Nữ tính',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid1',custom:{"w":1024,"h":1536,"slots":[[95,167,401,530],[534,167,403,529],[96,740,400,531],[534,739,404,532]]},title:'Retro thư tình',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid2',custom:{"w":1024,"h":1536,"slots":[[96,132,392,582],[535,132,393,583],[96,763,392,578],[535,763,393,578]]},title:'Retro bưu thiếp',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid3',custom:{"w":1024,"h":1536,"slots":[[112,280,385,519],[527,280,384,519],[114,825,383,521],[528,825,383,520]]},title:'Retro film đen',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid4',custom:{"w":1024,"h":1536,"slots":[[115,255,384,549],[527,255,384,549],[117,831,382,581],[528,831,382,581]]},title:'Retro film vàng',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid5',custom:{"w":1024,"h":1536,"slots":[[104,276,396,514],[526,276,398,514],[104,817,396,531],[526,817,398,531]]},title:'Retro film đỏ',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'retrogrid6',custom:{"w":1024,"h":1536,"slots":[[113,260,384,509],[528,260,385,509],[112,798,385,541],[528,798,385,541]]},title:'Retro film xanh',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},

 {id:'basicgrid1',custom:{"w":1545,"h":2000,"slots":[[202,148,553,840],[787,148,553,840],[202,1016,553,838],[787,1016,553,838]]},title:'Basic đen 4 ô',category:'Basic',layouts:['grid4'],bg:'#111111',ink:'#ffffff',accent:'#777777'},
 {id:'basicgrid2',custom:{"w":1545,"h":2000,"slots":[[203,147,552,841],[788,147,551,841],[203,1016,552,838],[788,1016,551,838]]},title:'Basic xám 4 ô',category:'Basic',layouts:['grid4'],bg:'#9c9c9c',ink:'#ffffff',accent:'#d0d0d0'},
 {id:'basicgrid3',custom:{"w":1545,"h":2000,"slots":[[203,146,552,841],[788,146,551,842],[203,1016,552,838],[788,1016,551,838]]},title:'Basic hồng nhạt 4 ô',category:'Basic',layouts:['grid4'],bg:'#efc2c8',ink:'#ffffff',accent:'#f6d8dd'},
 {id:'basicgrid4',custom:{"w":1545,"h":2000,"slots":[[215,165,540,823],[788,165,539,823],[215,1015,540,820],[788,1016,539,819]]},title:'Basic hồng 4 ô',category:'Basic',layouts:['grid4'],bg:'#cb5c64',ink:'#ffffff',accent:'#e2a0a6'},
 {id:'basicgrid5',custom:{"w":1545,"h":2000,"slots":[[203,147,551,840],[789,147,551,840],[203,1017,551,836],[789,1017,551,836]]},title:'Basic xanh 4 ô',category:'Basic',layouts:['grid4'],bg:'#2d5f9d',ink:'#ffffff',accent:'#7da0c6'},

 {id:'press_new_1',custom:{"w": 1378, "h": 1964, "slots": [[67, 549, 1241, 700]]},title:"Báo chí · Special Edition",category:'Tất cả',layouts:['press'],bg:'#f6eee3',ink:'#ad253b',accent:'#cb9b88'},
 {id:'press_new_2',custom:{"w": 1329, "h": 1994, "slots": [[51, 561, 716, 598], [799, 892, 494, 419]]},title:"Báo chí · Số báo đặc biệt",category:'Tất cả',layouts:['press'],bg:'#f6eee3',ink:'#ad253b',accent:'#cb9b88'},
 {id:'press_new_3',custom:{"w": 1413, "h": 2000, "slots": [[57, 491, 1299, 605]]},title:"Báo chí · Những nàng SJC",category:'Tất cả',layouts:['press'],bg:'#f6eee3',ink:'#ad253b',accent:'#cb9b88'},
  {id:'feminine',title:'Nữ tính',category:'Nữ tính',layouts:['grid4'],bg:'#fbe4ed',ink:'#b64f70',accent:'#f0adc5'},
 {id:'retro',title:'Retro',category:'Retro',layouts:['grid4'],bg:'#eee1cd',ink:'#705341',accent:'#b07956'},
 {id:'basic',title:'Basic',category:'Basic',layouts:['strip4','grid4'],bg:'#161616',ink:'#ffffff',accent:'#bcbcbc'}
];
const state={screen:'home',layout:'strip4',frame:'fem2',category:'Tất cả',uploadedFrames:{},shots:[],camera:null,mirror:true,shooting:false,objects:[],selected:null,filter:'none',brightness:100,bg:'#ffe6ec',dragging:false,dragOffset:{x:0,y:0},transitioning:false,resumeScreen:null};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const availableFrames=()=>frames.filter(f=>!f.layouts||f.layouts.includes(state.layout));
const currentFrame=()=>availableFrames().find(f=>f.id===state.frame)||availableFrames()[0]||frames[0];
const currentKey=()=>state.layout+'_'+state.frame;
const frameImages={};
const frameSlotCache={};
function orderSlots(slots, layoutId){
  if(layoutId==='grid4' && slots.length===4){
    const enriched=slots.map(s=>({s,cx:s[0]+s[2]/2,cy:s[1]+s[3]/2})).sort((a,b)=>a.cy-b.cy);
    const top=enriched.slice(0,2).sort((a,b)=>a.cx-b.cx);
    const bottom=enriched.slice(2).sort((a,b)=>a.cx-b.cx);
    return [...top,...bottom].map(v=>v.s);
  }
  return slots.slice().sort((a,b)=>a[1]-b[1] || a[0]-b[0]);
}
function fitSlotsToFrame(slots, layoutId, frameId){
  let out=orderSlots(slots, layoutId);
  if(layoutId==='grid4' && /^gridsq/.test(frameId||'')){
    out=out.map(([x,y,w,h])=>{
      const padX=Math.max(12, Math.round(w*0.03));
      const padY=Math.max(12, Math.round(h*0.03));
      return [x+padX, y+padY, Math.max(20,w-padX*2), Math.max(20,h-padY*2)];
    });
  }
  return out;
}
function detectTransparentSlots(img){
  const w=img.naturalWidth||img.width,h=img.naturalHeight||img.height; if(!w||!h) return null;
  const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext('2d',{willReadFrequently:true}); ctx.drawImage(img,0,0,w,h);
  const data=ctx.getImageData(0,0,w,h).data;
  const visited=new Uint8Array(w*h); const comps=[];
  const idx=(x,y)=>y*w+x, alpha=(x,y)=>data[idx(x,y)*4+3];
  for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++){
    const i=idx(x,y); if(visited[i]||alpha(x,y)>8) continue;
    let qx=[x], qy=[y], head=0, area=0, minX=x,maxX=x,minY=y,maxY=y, touches=false; visited[i]=1;
    while(head<qx.length){
      const cx=qx[head], cy=qy[head++]; area++; if(cx===0||cy===0||cx===w-1||cy===h-1) touches=true;
      if(cx<minX)minX=cx; if(cx>maxX)maxX=cx; if(cy<minY)minY=cy; if(cy>maxY)maxY=cy;
      const n=[[cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1]];
      for(const [nx,ny] of n){ if(nx<0||ny<0||nx>=w||ny>=h) continue; const ni=idx(nx,ny); if(visited[ni]||alpha(nx,ny)>8) continue; visited[ni]=1; qx.push(nx); qy.push(ny); }
    }
    const bw=maxX-minX+1, bh=maxY-minY+1;
    if(!touches && area>Math.max(1800, w*h*0.006) && bw>w*0.18 && bh>h*0.08) comps.push([minX,minY,bw,bh,area]);
  }
  if(!comps.length || (state.layout!=='press' && comps.length<2)) return null;
  comps.sort((a,b)=>b[4]-a[4]);
  const picked=[];
  for(const c of comps){
    const [x,y,bw,bh,area]=c;
    let overlap=false;
    for(const p of picked){
      const [px,py,pw,ph]=p;
      const interW=Math.max(0, Math.min(x+bw, px+pw)-Math.max(x,px));
      const interH=Math.max(0, Math.min(y+bh, py+ph)-Math.max(y,py));
      const inter=interW*interH;
      if(inter>0.12*Math.min(bw*bh,pw*ph)){ overlap=true; break; }
    }
    if(!overlap) picked.push([x,y,bw,bh,area]);
  }
  const target = state.layout==='press' ? Math.min(8,picked.length) : 4;
  const use = picked.slice(0,target);
  if(use.length===target) return {w,h,slots:use.map(([x,y,bw,bh])=>[x,y,bw,bh])};
  return null;
}
function resolveFrameGeometry(frame, layoutId){
 const base=layouts.find(l=>l.id===layoutId)||layouts[0];
 const key=layoutId+'_'+frame.id;
 if(layoutId==='press' && frame.custom && !state.uploadedFrames[key]) {return {...base, w:frame.custom.w, h:frame.custom.h, count:frame.custom.slots.length, slots:frame.custom.slots};}
 // Chuẩn hoá 5 frame Nữ tính 4 ô: khớp trực tiếp với 4 vùng PNG trong suốt.
 // Không dò tự động và không co vào 3%, tránh lặp lỗi tràn/mất viền.
 if(layoutId==='grid4' && /^(gridsq[1-5]|retrogrid[1-6]|basicgrid[1-5])$/.test(frame.id) && !state.uploadedFrames[key]){
   return {...base,w:frame.custom.w,h:frame.custom.h,slots:frame.custom.slots};
 }
 const detected=frameSlotCache[key];
 if(detected && detected.slots && (layoutId==='press' ? detected.slots.length>0 : detected.slots.length===base.count)) return {...base,w:detected.w,h:detected.h,count:layoutId==='press'?detected.slots.length:base.count,slots:fitSlotsToFrame(detected.slots, layoutId, frame.id)};
 const overlay=state.uploadedFrames[key]||frameImages[key];
 if(frame?.custom && overlay){
   const iw=overlay.naturalWidth||overlay.width||frame.custom.w;
   const ih=overlay.naturalHeight||overlay.height||frame.custom.h;
   const sx=iw/frame.custom.w, sy=ih/frame.custom.h;
   return {...base,w:iw,h:ih,count:layoutId==='press'?frame.custom.slots.length:base.count,slots:fitSlotsToFrame(frame.custom.slots.map(([x,y,w,h])=>[Math.round(x*sx),Math.round(y*sy),Math.round(w*sx),Math.round(h*sy)]), layoutId, frame.id)};
 }
 if(frame?.custom) return {...base,w:frame.custom.w,h:frame.custom.h,slots:fitSlotsToFrame(frame.custom.slots, layoutId, frame.id)};
 if(overlay){
   const iw=overlay.naturalWidth||overlay.width||base.w;
   const ih=overlay.naturalHeight||overlay.height||base.h;
   return {...base,w:iw,h:ih};
 }
 return base;
}
const currentLayout=()=>resolveFrameGeometry(currentFrame(), state.layout);
const count=()=>currentLayout().count;
const FRAME_URLS={"strip4_feminine":"assets/frames/strip4_feminine.webp","strip4_retro":"assets/frames/strip4_retro.webp","strip4_basic":"assets/frames/strip4_basic.webp","grid4_feminine":"assets/frames/grid4_feminine.webp","grid4_retro":"assets/frames/grid4_retro.webp","grid4_basic":"assets/frames/grid4_basic.webp","press_feminine":"assets/frames/press_feminine.webp","press_retro":"assets/frames/press_retro.webp","press_basic":"assets/frames/press_basic.webp","press_press_new_1":"assets/frames/press_special_edition_2010.png","press_press_new_2":"assets/frames/press_so_bao_dac_biet_2010.png","press_press_new_3":"assets/frames/press_nhung_nang_sjc_2010.png","strip4_fem2":"assets/frames_user/fem2.png","strip4_fem3":"assets/frames_user/fem3.png","strip4_fem4":"assets/frames_user/fem4.png","strip4_fem5":"assets/frames_user/fem5.png","strip4_fem6":"assets/frames_user/fem6.png","strip4_retro1":"assets/frames_user/retro1.png","strip4_retro2":"assets/frames_user/retro2.png","strip4_retro3":"assets/frames_user/retro3.png","strip4_retro4":"assets/frames_user/retro4.png","strip4_basic1":"assets/frames_user/basic1.png","strip4_basic2":"assets/frames_user/basic2.png","strip4_basic3":"assets/frames_user/basic3.png","strip4_basic4":"assets/frames_user/basic4.png","grid4_gridsq1":"assets/frames_user/gridsq1.png","grid4_gridsq2":"assets/frames_user/gridsq2.png","grid4_gridsq3":"assets/frames_user/gridsq3.png","grid4_gridsq4":"assets/frames_user/gridsq4.png","grid4_gridsq5":"assets/frames_user/gridsq5.png","grid4_retrogrid1":"assets/frames_user/retrogrid1.png","grid4_retrogrid2":"assets/frames_user/retrogrid2.png","grid4_retrogrid3":"assets/frames_user/retrogrid3.png","grid4_retrogrid4":"assets/frames_user/retrogrid4.png","grid4_retrogrid5":"assets/frames_user/retrogrid5.png","grid4_retrogrid6":"assets/frames_user/retrogrid6.png","grid4_basicgrid1":"assets/frames_user/basicgrid1.png","grid4_basicgrid2":"assets/frames_user/basicgrid2.png","grid4_basicgrid3":"assets/frames_user/basicgrid3.png","grid4_basicgrid4":"assets/frames_user/basicgrid4.png","grid4_basicgrid5":"assets/frames_user/basicgrid5.png"};
function ensureCanvasSizes(){
  W=currentLayout().w;H=currentLayout().h;
  ['setupCanvas','captureCanvas','editorCanvas','finalCanvas'].forEach(id=>{
   const c=$(id);if(c.width!==W)c.width=W;if(c.height!==H)c.height=H;
  });
}
Object.entries(FRAME_URLS).forEach(([key,url])=>{
 const img=new Image();img.onload=()=>{
   frameImages[key]=img;
   if(!/^grid4_(gridsq[1-5]|basicgrid[1-5])$/.test(key) && !/^press_press_new_/.test(key)){
     const detected=detectTransparentSlots(img); if(detected) frameSlotCache[key]=detected;
   }
   if(key===currentKey()) ensureCanvasSizes();
   if(state.screen==='setup')paint($('setupCanvas'),false);configureFrames(false)
 };
 img.src=url + (url.includes('?')?'&':'?') + 'v=20261018_grid4norm_basic';
});
const viewport = ['home','setup','capture','editor','finish'];
// Điều hướng giữa các bước chỉ thay phần hiển thị, KHÔNG xóa ảnh, frame hoặc sticker.
const PREVIOUS_STEP={setup:'home',capture:'setup',editor:'capture',finish:'editor'};
function go(screen){
  if(!viewport.includes(screen))return;
  if(screen!=='home')state.resumeScreen=screen;
  document.querySelectorAll('.screen').forEach(el=>el.classList.toggle('active',el.id===screen));
  state.screen=screen;
  $('navBack').hidden=!PREVIOUS_STEP[screen];
  // Từ trang chủ vẫn có thể quay lại đúng công đoạn đang làm dở.
  if(screen==='home')$('welcomeStart').textContent=state.resumeScreen?'TIẾP TỤC TẠO ẢNH':'BẮT ĐẦU CHỤP ẢNH';
  window.scrollTo({top:0,behavior:'instant'});
  if(screen==='setup')paint($('setupCanvas'),false);
  if(screen==='capture'){
    if(!state.camera)$('cameraHelp').classList.remove('hidden');
    updateShots();stopPreviewLoop();renderCapturePreview();
  }else stopPreviewLoop();
  if(screen==='editor')paint($('editorCanvas'),true);
  if(screen==='finish')paint($('finalCanvas'),false);
}
async function travel(screen){
  if(state.transitioning)return;
  state.transitioning=true;
  $('transition').classList.add('go');
  await sleep(430);
  $('dialogue').classList.remove('open');$('letterModal').classList.remove('open');
  go(screen);
  await sleep(210);
  $('transition').classList.remove('go');
  await sleep(350);state.transitioning=false;
}
$('welcomeStart').addEventListener('click',()=>{if(state.resumeScreen){go(state.resumeScreen);return;}$('letterModal').classList.add('open')});
$('letterContinue').addEventListener('click',()=>{
  $('letterModal').classList.remove('open');
  $('dialogue').classList.add('open');
  $('askBubble').style.display='block';$('dialogueChoices').style.display='grid';
  $('dialogueResponse').classList.remove('active');
});
$('choiceYes').addEventListener('click',()=>travel('setup'));
$('choiceNo').addEventListener('click',async()=>{
  const ask=$('askBubble'), choices=$('dialogueChoices');
  ask.style.transition='opacity .26s ease,transform .26s ease';
  choices.style.transition='opacity .26s ease,transform .26s ease';
  ask.style.opacity='0';ask.style.transform='translateY(-20px) scale(.95)';
  choices.style.opacity='0';choices.style.transform='translateY(20px)';
  await sleep(285);
  ask.style.display='none';choices.style.display='none';
  $('dialogueResponse').classList.add('active');
  ask.style.opacity='';ask.style.transform='';choices.style.opacity='';choices.style.transform='';
});
$('responseNext').addEventListener('click',()=>travel('setup'));
$('homeButton').addEventListener('click',()=>{if(state.camera)stopCamera();go('home')});
$('navBack').addEventListener('click',()=>{
  if(state.transitioning||state.shooting)return;
  const previous=PREVIOUS_STEP[state.screen];
  if(!previous)return;
  if(previous==='home'&&state.camera)stopCamera();
  go(previous);
});
function configureLayout(){
 const box=$('layoutChoices');box.innerHTML='';
 layouts.forEach(l=>{
  const btn=document.createElement('button');btn.className='layout-choice'+(state.layout===l.id?' active':'');
  const icon=document.createElement('span');icon.className='tiny-layout '+l.id;
  for(let i=0;i<l.count;i++)icon.append(document.createElement('i'));
  const detail=document.createElement('span');detail.className='layout-detail';
  const title=document.createElement('strong');title.textContent=l.name;
  const note=document.createElement('small');note.textContent='';
  detail.append(title,note);btn.append(icon,detail);
  btn.onclick=()=>{
   state.layout=l.id;state.shots=[];state.objects=[];state.selected=null;
   const avail=availableFrames();if(!avail.some(f=>f.id===state.frame)&&avail.length) state.frame=avail[0].id;
   ensureCanvasSizes();configureLayout();configureCategories();configureFrames();updateShots();paint($('setupCanvas'),false);
  };box.append(btn);
 });
 $('layoutExplain').textContent='';
 $('selectedFormat').textContent='';
}
function configureCategories(){
 const categories=state.layout==='press' ? ['Tất cả'] : ['Tất cả','Retro','Basic','Nữ tính'];
 const dynamic=categories.filter(c=>c==='Tất cả'||availableFrames().some(f=>f.category===c));
 if(state.category!=='Tất cả'&&!dynamic.includes(state.category)) state.category='Tất cả';
 const box=$('frameCategories');box.innerHTML='';
 dynamic.forEach(c=>{const btn=document.createElement('button');btn.textContent=c;btn.className=state.category===c?'active':'';btn.onclick=()=>{state.category=c;configureCategories();configureFrames()};box.append(btn)});
}
function drawMiniPreview(c,f){
 const l=resolveFrameGeometry(f, state.layout); c.width=l.w; c.height=l.h; const x=c.getContext('2d');
 x.fillStyle=f.bg;x.fillRect(0,0,l.w,l.h);
 l.slots.forEach(([a,b,w,h])=>{x.fillStyle='#fffafc';x.fillRect(a,b,w,h);x.fillStyle='#e9dfe5';x.font=`bold ${Math.max(24,Math.round(l.w*.025))}px Nunito,Arial,sans-serif`;x.textAlign='center';x.fillText('ẢNH',a+w/2,b+h/2)});
 const image=state.uploadedFrames[state.layout+'_'+f.id]||frameImages[state.layout+'_'+f.id];
 if(image)x.drawImage(image,0,0,l.w,l.h);
}
function configureFrames(){
 const box=$('frameGallery');box.innerHTML='';
 availableFrames().filter(f=>state.category==='Tất cả'||f.category===state.category).forEach(f=>{
  const btn=document.createElement('button');btn.className='frame-choice'+(state.frame===f.id?' active':'');
  const canvas=document.createElement('canvas');canvas.className='frame-thumb';drawMiniPreview(canvas,f);
  const label=document.createElement('span');label.textContent=f.title;
  btn.append(canvas,label);
  btn.onclick=()=>{state.frame=f.id;ensureCanvasSizes();configureFrames();paint($('setupCanvas'),false)};box.append(btn);
 });
}
function slots(){return currentLayout().slots}
function drawCover(ctx,img,x,y,w,h){
  if(!img)return;
  const iw=img.videoWidth||img.naturalWidth||img.width,ih=img.videoHeight||img.naturalHeight||img.height;if(!iw||!ih)return;
  const s=Math.max(w/iw,h/ih),dw=iw*s,dh=ih*s;
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();
}
function drawBase(ctx){
 const f=currentFrame();ctx.save();ctx.fillStyle=state.bg||f.bg;ctx.fillRect(0,0,W,H);
 for(const [x,y,w,h] of slots()){
  ctx.fillStyle='#f9f2f4';ctx.fillRect(x,y,w,h);
 }
 slots().forEach(([x,y,w,h],i)=>{
  if(state.shots[i]){ctx.save();ctx.filter=`${state.filter} brightness(${state.brightness}%)`;drawCover(ctx,state.shots[i],x,y,w,h);ctx.restore()}
  else{
   ctx.fillStyle='#fff9fc';ctx.fillRect(x,y,w,h);
   ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#c5a7b5';
   ctx.font=`800 ${Math.round(Math.min(w,h)*.17)}px Nunito, Arial, sans-serif`;
   ctx.fillText('ẢNH '+(i+1),x+w/2,y+h/2);
   ctx.textBaseline='alphabetic';
  }
 });
 const overlay=state.uploadedFrames[currentKey()]||frameImages[currentKey()];
 if(overlay)ctx.drawImage(overlay,0,0,W,H);
 else {
  // Fallback on the first frame while the local image asset is loading.
  ctx.fillStyle=f.ink;ctx.textAlign='center';ctx.font=`900 ${Math.round(W*.052)}px Nunito,Arial,sans-serif`;
  ctx.fillText('NÀNG PHOTOBOOTH',W/2,H*.045);
 }
 ctx.restore();
}
function drawObjects(ctx,selectedOutline){
  for(const o of state.objects){
    ctx.save();ctx.translate(o.x,o.y);ctx.rotate((o.rotation||0)*Math.PI/180);
    if(o.type==='emoji'){ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=o.size+'px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';ctx.fillText(o.value,0,0)}
    if(o.type==='text'){ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`900 ${o.size}px Nunito, Arial, sans-serif`;ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.strokeText(o.value,0,0);ctx.fillStyle='#b74868';ctx.fillText(o.value,0,0)}
    if(o.type==='image')ctx.drawImage(o.img,-o.size/2,-o.size/2,o.size,o.size);
    if(selectedOutline && state.selected===o){const box=objectBounds(ctx,o);ctx.strokeStyle='#3675c6';ctx.lineWidth=4;ctx.setLineDash([8,5]);ctx.strokeRect(-box.w/2,-box.h/2,box.w,box.h)}
    ctx.restore();
  }
}
function objectBounds(ctx,o){if(o.type==='text'){ctx.font=`900 ${o.size}px Nunito, Arial, sans-serif`;return{w:Math.max(o.size,ctx.measureText(o.value).width+22),h:o.size*1.3}}return{w:o.size*1.15,h:o.size*1.15}}
function paint(canvas,select){
  const ctx=canvas.getContext('2d');ctx.clearRect(0,0,W,H);drawBase(ctx);drawObjects(ctx,!!select);
}
function loadFile(file){return new Promise((resolve,reject)=>{if(!file){reject(Error('No file'));return;}const image=new Image();const url=URL.createObjectURL(file);image.onload=()=>{URL.revokeObjectURL(url);resolve(image)};image.onerror=()=>{URL.revokeObjectURL(url);reject(Error('Không thể đọc ảnh'))};image.src=url})}
$('frameUpload').addEventListener('change',async e=>{
 const f=e.target.files[0];if(!f)return;
 try{
  const img=await loadFile(f);
  state.uploadedFrames[currentKey()]=img;
  const detected=detectTransparentSlots(img);
  if(detected) frameSlotCache[currentKey()]=detected;
  configureFrames(); ensureCanvasSizes(); paint($('setupCanvas'),false);
 }catch(error){alert(error.message)}
});
$('clearFrame').onclick=()=>{
 delete state.uploadedFrames[currentKey()];$('frameUpload').value='';
 configureFrames();paint($('setupCanvas'),false);
};
$('toCapture').onclick=()=>{go('capture');updateShots()};
let previewRAF=0;
function stopPreviewLoop(){if(previewRAF){cancelAnimationFrame(previewRAF);previewRAF=0;}}
function renderCapturePreview(){
  const canvas=$('captureCanvas'); if(!canvas) return; ensureCanvasSizes(); if(canvas.width!==W)canvas.width=W; if(canvas.height!==H)canvas.height=H;
  const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,W,H);
  const f=currentFrame(); ctx.fillStyle=state.bg||f.bg; ctx.fillRect(0,0,W,H);
  const currentIndex=Math.min(state.shots.length, count()-1);
  slots().forEach(([x,y,w,h],i)=>{
    ctx.fillStyle='#fff9fc';ctx.fillRect(x,y,w,h);
    if(state.shots[i]){ctx.save();ctx.filter=`${state.filter} brightness(${state.brightness}%)`;drawCover(ctx,state.shots[i],x,y,w,h);ctx.restore();}
    else if(i===currentIndex && state.camera && $('video').videoWidth){ctx.save(); if(state.mirror){ctx.translate(x+w, y); ctx.scale(-1,1); drawCover(ctx,$('video'),0,0,w,h);} else drawCover(ctx,$('video'),x,y,w,h); ctx.restore(); ctx.strokeStyle='#d94c65';ctx.lineWidth=6;ctx.strokeRect(x+3,y+3,w-6,h-6);} 
    else {ctx.fillStyle='#f7edf2';ctx.fillRect(x,y,w,h);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#c5a7b5';ctx.font=`800 ${Math.round(Math.min(w,h)*.17)}px Nunito, Arial, sans-serif`;ctx.fillText('ẢNH '+(i+1),x+w/2,y+h/2);} 
  });
  const overlay=state.uploadedFrames[currentKey()]||frameImages[currentKey()]; if(overlay)ctx.drawImage(overlay,0,0,W,H);
  $('currentShotLabel').textContent='Ảnh '+String(currentIndex+1);
  if(state.screen==='capture') previewRAF=requestAnimationFrame(renderCapturePreview);
}

async function startCamera(){
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw Error('Trình duyệt chỉ cho phép camera khi website chạy trên HTTPS hoặc localhost. Bạn vẫn có thể tải ảnh lên.');
    stopCamera();state.camera=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:1280},height:{ideal:960}},audio:false});
    $('video').srcObject=state.camera;await $('video').play();$('cameraHelp').classList.add('hidden');stopPreviewLoop();renderCapturePreview();
  }catch(e){$('cameraHelp').classList.remove('hidden');alert('Không mở được camera: '+e.message)}
}
function stopCamera(){if(state.camera){state.camera.getTracks().forEach(t=>t.stop());state.camera=null}$('video').srcObject=null;stopPreviewLoop();if(state.screen==='capture')renderCapturePreview();}
$('startCamera').onclick=startCamera;
$('flipCamera').onclick=()=>{state.mirror=!state.mirror;stopPreviewLoop();renderCapturePreview();};
async function takePhoto(){
  if(!state.camera||!$('video').videoWidth){alert('Vui lòng bật camera trước khi chụp.');return false}
  for(let i=Number($('timerSelect').value);i>=1;i--){$('cameraCountdown').textContent=i;await sleep(750)}$('cameraCountdown').textContent='';
  const v=$('video'),c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;
  const cx=c.getContext('2d');if(state.mirror){cx.translate(c.width,0);cx.scale(-1,1)}cx.drawImage(v,0,0,c.width,c.height);
  const img=new Image();img.src=c.toDataURL('image/jpeg',.92);await img.decode();
  if(state.shots.length>=count())state.shots=[];state.shots.push(img);updateShots();stopPreviewLoop();renderCapturePreview();return true;
}
$('takeOne').onclick=async()=>{if(state.shooting)return;state.shooting=true;try{await takePhoto()}finally{state.shooting=false}};
$('takeAuto').onclick=async()=>{if(state.shooting)return;state.shooting=true;try{while(state.shots.length<count()){if(!await takePhoto())break;await sleep(280)}}finally{state.shooting=false}};
function updateShots(){
  $('shotStatus').textContent=`Đã có ${state.shots.length}/${count()} ảnh`;
  $('captureLayoutLabel').textContent=currentLayout().name;
  $('shotThumbnails').innerHTML='';
  for(let i=0;i<count();i++){
    let div=document.createElement('div');div.className='thumb';
    if(state.shots[i]){let img=document.createElement('img');img.src=state.shots[i].src;div.append(img)}else div.textContent=String(i+1).padStart(2,'0');
    $('shotThumbnails').append(div);
  }
}
$('photoUpload').addEventListener('change',async e=>{
  const fs=[...e.target.files].slice(0,count());state.shots=[];
  for(const f of fs){try{state.shots.push(await loadFile(f))}catch(err){console.warn(err)}}updateShots();stopPreviewLoop();renderCapturePreview();
});
$('clearShots').onclick=()=>{state.shots=[];updateShots();stopPreviewLoop();renderCapturePreview();};
$('toEditor').onclick=()=>{if(!state.shots.length){alert('Bạn hãy chụp hoặc tải lên ít nhất một ảnh trước nhé.');return}go('editor')};
$('backCapture').onclick=()=>go('capture');
$('photoFilter').onchange=e=>{state.filter=e.target.value;paint($('editorCanvas'),true)};
$('bgColor').oninput=e=>{state.bg=e.target.value;paint($('editorCanvas'),true)};
$('brightness').oninput=e=>{state.brightness=+e.target.value;paint($('editorCanvas'),true)};
const STICKER_ASSETS=[
  'stickers_curated/generated_01.png',
  'stickers_curated/generated_02.png',
  'stickers_curated/generated_03.png',
  'stickers_curated/generated_04.png',
  'stickers_curated/generated_05.png',
  'stickers_curated/generated_06.png',
  'stickers_curated/generated_07.png',
  'stickers_curated/generated_08.png',
  'stickers_curated/generated_09.png',
  'stickers_curated/generated_10.png',
  'stickers_curated/generated_11.png',
  'stickers_curated/generated_12.png',
  'stickers_curated/generated_13.png',
  'stickers_curated/generated_14.png'
];
function addStickerButtonFromSrc(src){
  const btn=document.createElement('button');
  btn.className='sticker-btn image-sticker-btn';
  btn.type='button';
  const im=document.createElement('img');
  im.src=src;
  im.alt='sticker';
  im.loading='lazy';
  btn.append(im);
  btn.title='Thêm sticker';
  // Tận dụng trực tiếp ảnh đang hiển thị trong thư viện sticker.
  // Đặc biệt không dùng crossOrigin="anonymous": Chrome chặn cách tải đó
  // khi trang web được mở dưới dạng file:// sau khi giải nén ZIP.
  btn.onclick=async()=>{
    if(btn.disabled)return;
    btn.disabled=true;
    try{
      if(!im.complete || !im.naturalWidth){
        im.loading='eager';
        await im.decode();
      }
      if(!im.naturalWidth)throw new Error('Ảnh sticker chưa tải được.');
      addObject({type:'image',img:im});
    }catch(error){
      console.error('Lỗi thêm sticker:',src,error);
      alert('Không thể mở sticker này. Hãy kiểm tra thư mục stickers_curated có nằm cùng với index.html.');
    }finally{btn.disabled=false;}
  };
  $('stickerTray').append(btn);
}
for(const src of STICKER_ASSETS){addStickerButtonFromSrc(src)}
function addObject(o){o.x=W/2;o.y=H/2;o.size=o.type==='text'?46:108;o.rotation=0;state.objects.push(o);state.selected=o;syncSliders();paint($('editorCanvas'),true)}
$('stickerUpload').onchange=async e=>{try{const img=await loadFile(e.target.files[0]);addObject({type:'image',img})}catch(e){alert(e.message)}};
$('addText').onclick=()=>{const value=$('textInput').value.trim();if(value){addObject({type:'text',value});$('textInput').value=''}};
$('deleteSelected').onclick=()=>{if(!state.selected)return;state.objects=state.objects.filter(o=>o!==state.selected);state.selected=null;paint($('editorCanvas'),true)};
$('duplicateSelected').onclick=()=>{if(!state.selected)return;let o={...state.selected,x:state.selected.x+38,y:state.selected.y+38};state.objects.push(o);state.selected=o;paint($('editorCanvas'),true)};
$('undoObject').onclick=()=>{state.objects.pop();state.selected=null;paint($('editorCanvas'),true)};
function syncSliders(){if(state.selected){$('objectSize').value=state.selected.size;$('objectRotation').value=state.selected.rotation||0}}
$('objectSize').oninput=e=>{if(state.selected){state.selected.size=Number(e.target.value);paint($('editorCanvas'),true)}};
$('objectRotation').oninput=e=>{if(state.selected){state.selected.rotation=Number(e.target.value);paint($('editorCanvas'),true)}};
const ec=$('editorCanvas');
function pointer(e){const rect=ec.getBoundingClientRect();return{x:(e.clientX-rect.left)*W/rect.width,y:(e.clientY-rect.top)*H/rect.height}}
ec.onpointerdown=e=>{
  const p=pointer(e),ctx=ec.getContext('2d');
  let hit=null;
  for(let i=state.objects.length-1;i>=0;i--){const o=state.objects[i];ctx.save();const bounds=objectBounds(ctx,o);ctx.restore();const dx=p.x-o.x,dy=p.y-o.y,ang=-(o.rotation||0)*Math.PI/180;const rx=dx*Math.cos(ang)-dy*Math.sin(ang),ry=dx*Math.sin(ang)+dy*Math.cos(ang);if(Math.abs(rx)<bounds.w/2+8&&Math.abs(ry)<bounds.h/2+8){hit=o;break}}
  state.selected=hit;state.dragging=!!hit;if(hit){state.dragOffset={x:p.x-hit.x,y:p.y-hit.y};ec.setPointerCapture(e.pointerId);syncSliders()}paint(ec,true);
};
ec.onpointermove=e=>{if(!state.dragging||!state.selected)return;const p=pointer(e);state.selected.x=Math.max(-30,Math.min(W+30,p.x-state.dragOffset.x));state.selected.y=Math.max(-30,Math.min(H+30,p.y-state.dragOffset.y));paint(ec,true)};
ec.onpointerup=()=>{state.dragging=false};ec.onpointercancel=()=>{state.dragging=false};
$('toFinish').onclick=()=>{state.selected=null;go('finish')};$('backEditor').onclick=()=>go('editor');
function renderExport(){paint($('finalCanvas'),false);return $('finalCanvas').toDataURL('image/png')}
$('download').onclick=()=>{const a=document.createElement('a');a.download='NANG-PHOTOBOOTH-20-10.png';a.href=renderExport();document.body.append(a);a.click();a.remove()};
$('print').onclick=()=>{const png=renderExport(),w=window.open('','_blank');if(!w){alert('Vui lòng cho phép popup để sử dụng chức năng in ảnh.');return}w.document.write(`<html><head><title>In ảnh NÀNG PHOTOBOOTH</title><style>body{margin:0;text-align:center}img{max-width:100%;height:95vh;object-fit:contain}</style></head><body><img src="${png}" onload="window.print()"></body></html>`);w.document.close()};
$('startAgain').onclick=()=>{state.shots=[];state.objects=[];state.selected=null;updateShots();go('setup')};
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('letterModal').classList.contains('open'))$('letterModal').classList.remove('open');if((e.key==='Delete'||e.key==='Backspace')&&state.screen==='editor'&&document.activeElement.tagName!=='INPUT'){if(state.selected){state.objects=state.objects.filter(o=>o!==state.selected);state.selected=null;paint(ec,true)}}});
ensureCanvasSizes();configureLayout();configureCategories();configureFrames();updateShots();paint($('setupCanvas'),false);
