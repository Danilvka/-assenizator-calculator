(function(){
var S=window.SETTLEMENTS||[];
var sel=document.getElementById("settlement"),hose=document.getElementById("hose"),total=document.getElementById("total"),summary=document.getElementById("summary"),price=document.getElementById("placePrice"),wash=document.getElementById("wash"),wrap=document.getElementById("washWrap"),count=document.getElementById("washCount");
function money(n){return new Intl.NumberFormat("ru-RU").format(Math.round(n))+" ₽"}
S.forEach(function(x){var o=document.createElement("option");o.value=x.name;o.textContent=x.name;sel.appendChild(o)});
function vol(){var x=document.querySelector('input[name="volume"]:checked');return x?x.value:""}
function place(){return S.find(function(x){return x.name===sel.value})}
function calc(){
var v=vol(),p=place();
if(p&&v){price.textContent="Базовая стоимость: "+money(p[v])}else price.textContent="";
if(!p||!v){total.textContent="—";summary.textContent="Сначала выберите объём и населённый пункт.";return}
var b=p[v],h=+hose.value,eh=document.getElementById("extraHouse").checked?b*.5:0,sm=document.getElementById("siteMove").checked?300:0,w=wash.checked?300*Math.max(1,+count.value||1):0;
total.textContent=money(b+h+eh+sm+w);
summary.innerHTML="Населённый пункт: <b>"+p.name+"</b><br>Основная стоимость: <b>"+money(b)+"</b><br>Дополнительный шланг: <b>+"+money(h)+"</b>"+(eh?"<br>Дополнительный дом: <b>+"+money(eh)+"</b>":"")+(sm?"<br>Переезд по участку: <b>+300 ₽</b>":"")+(w?"<br>Промывка: <b>+"+money(w)+"</b>":"")
}
document.querySelectorAll('input[name="volume"]').forEach(function(x){x.addEventListener("change",calc)});
sel.addEventListener("change",calc);hose.addEventListener("change",calc);
["extraHouse","siteMove"].forEach(function(id){document.getElementById(id).addEventListener("change",calc)});
wash.addEventListener("change",function(){wrap.hidden=!wash.checked;calc()});count.addEventListener("input",calc);calc()
})();