const items={
'オフィスホワイトニング':33000,
'ホームホワイトニング':27500,
'ホーム薬液追加':5500,
'ホーム薬液ウィズ差額':1100,
'デュアルホワイトニング':55000,
'プロフェッショナルクリーニング':13200,
'デンタルエステ':16500,
'ルシェロホワイト歯磨き粉':1900,
'ルシェロホワイト歯ブラシ':380};
const s=document.getElementById('item');
Object.keys(items).forEach(k=>{let o=document.createElement('option');o.text=o.value=k;s.add(o);});
function calc(){let t=items[s.value]*Number(qty.value);total.textContent=t.toLocaleString();}
function receipt(){calc();out.textContent=`領収書\n患者:${name.value}\n商品:${s.value}\n金額:${total.textContent}円\n支払:${pay.value}\n\nSHIMA DENTAL ANNEX\n富山市千石町3-6-16\n076-456-2061`; }
calc();