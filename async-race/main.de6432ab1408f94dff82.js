(()=>{"use strict";var e={659:(e,t,n)=>{n.r(t)},508:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),n(8)},333:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Garage=void 0;t.Garage=class{constructor(){this.inputTextCreate=document.querySelector(".input-name_create"),this.inputColorCreate=document.querySelector(".input-color_create"),this.btnCarCreate=document.querySelector(".btn__car_create"),this.inputTextUpdate=document.querySelector(".input-name_update"),this.inputColorUpdate=document.querySelector(".input-color_update"),this.btnCarUpdate=document.querySelector(".btn__car_update"),this.carAmount=document.querySelector(".main-box__header"),this.pageNumber=document.querySelector(".main-box__page-num"),this.btnCarsRace=document.querySelector(".btn__cars_race"),this.btnCarsReset=document.querySelector(".btn__cars_reset"),this.btnCarsGenerate=document.querySelector(".btn__cars_generate"),this.btnPagePrev=document.querySelector(".page-nav_prev"),this.btnPageNext=document.querySelector(".page-nav_next")}seekerCreateCar(e){this.btnCarCreate.addEventListener("click",(()=>e(this.inputTextCreate,this.inputColorCreate)))}seekerUpdateCar(e){this.btnCarUpdate.addEventListener("click",(()=>e(this.inputTextUpdate,this.inputColorUpdate,this.inputTextUpdate,this.btnCarUpdate)))}seekerRaceCars(e){this.btnCarsRace.addEventListener("click",(()=>e(this.btnCarsRace,this.btnCarsReset)))}seekerResetCars(e){this.btnCarsReset.addEventListener("click",(()=>e(this.btnCarsRace,this.btnCarsReset)))}seekerGenerateCars(e){this.btnCarsGenerate.addEventListener("click",(()=>e()))}seekerPreviosPageNav(e){this.btnPagePrev.addEventListener("click",(()=>e(this.btnPagePrev,this.btnPageNext,this.pageNumber,this.carAmount)))}seekerNextPageNav(e){this.btnPageNext.addEventListener("click",(()=>e(this.btnPagePrev,this.btnPageNext,this.pageNumber,this.carAmount)))}seekerCreateAllow(e){this.inputTextCreate.addEventListener("input",(()=>e(this.inputTextCreate,this.btnCarCreate)))}getUpdateFields(){return[this.inputTextUpdate,this.inputColorUpdate]}getCreateFields(){return[this.inputTextCreate,this.inputColorCreate]}getAllCars(){return document.querySelectorAll(".car-image")}}},549:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Navigation=void 0;t.Navigation=class{constructor(){this.links=document.querySelectorAll(".header-box__item")}seekerLinks(e){return this.links.forEach((t=>t.addEventListener("click",(()=>e(t)))))}}},689:function(e,t){var n=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{s(a.next(e))}catch(e){i(e)}}function c(e){try{s(a.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.updateWinnerRequest=t.deleteWinnerRequest=t.createWinnerRequest=t.getWinnerRequest=t.getAllWinnersRequest=t.switchCarEngineState=t.updateCarRequest=t.deleteCarRequest=t.createCarRequest=t.getCarRequest=t.getAllCarsRequest=void 0;const a="http://127.0.0.1:3000";t.getAllCarsRequest=(e,t)=>n(void 0,void 0,void 0,(function*(){const n=`_page=${e}&_limit=${t}`;let r;r=void 0!==e&&void 0!==t?yield fetch(`${a}/garage?${n}`):yield fetch(`${a}/garage`);return yield r.json()}));t.getCarRequest=e=>n(void 0,void 0,void 0,(function*(){const t=`id=${e}`,n=yield fetch(`${a}/garage/${e}?${t}`);return yield n.json()}));t.createCarRequest=e=>n(void 0,void 0,void 0,(function*(){return yield fetch(`${a}/garage`,{method:"POST",headers:{"Content-Type":"application/json"},body:e})}));t.deleteCarRequest=e=>n(void 0,void 0,void 0,(function*(){const t=`id=${e}`;return yield fetch(`${a}/garage/${e}?${t}`,{method:"DELETE"})}));t.updateCarRequest=(e,t)=>n(void 0,void 0,void 0,(function*(){return yield fetch(`${a}/garage/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:t})}));t.switchCarEngineState=(e,t)=>n(void 0,void 0,void 0,(function*(){const n=`id=${e}&status=${t}`;return yield fetch(`${a}/engine?${n}`,{method:"PATCH"})}));t.getAllWinnersRequest=(e,t,r,i)=>n(void 0,void 0,void 0,(function*(){const e=yield fetch(`${a}/winners`);return yield e.json()}));t.getWinnerRequest=e=>n(void 0,void 0,void 0,(function*(){const t=`id=${e}`,n=yield fetch(`${a}/winners/${e}?${t}`);return yield n.json()}));t.createWinnerRequest=e=>n(void 0,void 0,void 0,(function*(){return yield fetch(`${a}/winners`,{method:"POST",headers:{"Content-Type":"application/json"},body:e})}));t.deleteWinnerRequest=e=>n(void 0,void 0,void 0,(function*(){const t=`id=${e}`;return yield fetch(`${a}/winners/${e}?${t}`,{method:"DELETE"})}));t.updateWinnerRequest=(e,t)=>n(void 0,void 0,void 0,(function*(){const n=`id=${e}`;return yield fetch(`${a}/winners/${e}?${n}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:t})}))},222:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;t.State=class{constructor(){this._selectedCar={id:null,color:null,name:null},this._pageName="garage",this._pageNumber=1,this._selectClass="car-item-selected",this._pageCarRangeMin=0,this._pageCarRangeMax=0,this._totalCarAmount=0,this._pageCarsAmount=0,this._carsPerPage=7}get selectedCar(){return this._selectedCar}set selectedCar(e){this._selectedCar=e}get pageName(){return this._pageName}set pageName(e){this._pageName=e}get pageNumber(){return this._pageNumber}set pageNumber(e){this._pageNumber=e}get selectClass(){return this._selectClass}get carAmount(){return this._totalCarAmount}set carAmount(e){this._totalCarAmount=e}get pageCarRange(){return[this._pageCarRangeMin,this._pageCarRangeMax]}set pageCarRange(e){this._pageCarRangeMin=e[0],this._pageCarRangeMax=e[1]}get pageCarsAmount(){return this._pageCarsAmount}set pageCarsAmount(e){this._pageCarsAmount=e}get carsPerPage(){return this._carsPerPage}set carsPerPage(e){this._carsPerPage=e}setState(e){Object.keys(e).forEach((t=>{Object.assign(this,{[`${t}`]:e[t]})}))}}},410:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{s(a.next(e))}catch(e){i(e)}}function c(e){try{s(a.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.carsReturn=t.carsStartRace=t.setPageTotalCarAmount=t.checkViewBtn=t.undisableButton=t.disableButton=t.setCarControlHandlers=t.renderManyCars=t.renderNewCar=t.updateCarData=t.getCarData=t.setStorageState=t.getStorageState=t.checkState=void 0;const r=n(373),i=n(689),o=n(333),c=n(222),s=".car-item__model",d="fill",l="button-disabled",u=new c.State;function g(e){const t=m();return t?e.setState(t):(p(e),e)}function m(){return JSON.parse(localStorage.getItem("state"))}function p(e){localStorage.setItem("state",JSON.stringify(e))}function _(e){const t=e.querySelector(".car-item__car-img-box"),n=e.querySelector(s).innerText;return{id:Number(t.getAttribute("data-id")),name:n,color:t.querySelector("g").getAttribute(d)}}function h(e){return a(this,void 0,void 0,(function*(){const t=new o.Garage;u.setState(m()),console.log(u.pageCarsAmount);const n=yield A(e);if(u.pageCarsAmount<u.carsPerPage){const e=(new r.GarageView).renderCar(n);yield C(e),u.pageCarsAmount=u.pageCarsAmount+1}if(u.pageCarRange[1]<=u.carAmount){x(document.querySelector(".page-nav_next"))}u.carAmount=u.carAmount+1,t.carAmount.innerText=`Garage (${u.carAmount})`,p(u)}))}function v(){return`${["Acura","Audi","BMW","Cadillac","Chevrolet","Dodge","Fiat","Ford","Honda","Hyundai","Infinity","Jaguar","Kia","Lexus","Mazda","Mitsubishi","Nissan","Porsche","Scion","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"][f(0,24)]} ${["2 Series","3 Series","4 Series","5 Series","X1","X2","X3","X4","X5","X6","X7","M2","M3","M5","M8","A3","A4","A4 Allroad","A5","A6","Q1","Q2","Q3","Q4","Q5","Q6","RS 1","RS 2","RS 3","RS 5","CT4","CT5","XT4","XT5","Challenger","Endge","Escape","Ranger","Clarity","Insight","Accord","Cayenne","Macan","Panamera","Taycan","Carnival","Forte","Rio","Soul","Sportage","Stinger","Niro"][f(0,51)]}`}function b(){let e="";for(let t=0;t<6;t++)e+=y();return`#${e}`}function y(){return{0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"A",11:"B",12:"C",13:"D",14:"E",15:"F"}[f(0,15)]}function f(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function C(e){return a(this,void 0,void 0,(function*(){const t=(new o.Garage).getUpdateFields(),n=e.select,r=e.remove,s=e.start,d=e.return;S(d),n.addEventListener("click",(()=>{const n=_(e.car);!function(e,t,n,r,i,o){a(this,void 0,void 0,(function*(){const a={id:e,name:t,color:n};u.selectedCar=a,o.classList.toggle(u.selectClass),p(u),r.value=t,i.value=n;x(document.querySelector(".btn__car_update"))}))}(n.id,n.name,n.color,t[0],t[1],e.car)})),r.addEventListener("click",(()=>{!function(e,t){a(this,void 0,void 0,(function*(){const n=yield(0,i.deleteCarRequest)(e);if(console.log(n),n.ok){const e=new c.State;e.setState(m()),t.parentElement.removeChild(t),e.carAmount=e.carAmount-1,e.pageCarsAmount=e.pageCarsAmount-1,w(e.carAmount),p(e)}}))}(_(e.car).id,e.car)})),s.addEventListener("click",(()=>{const t=_(e.car),n=e.car.querySelector(".car-image"),r=e.car.querySelector(".car-item__btn_type_start"),o=e.car.querySelector(".car-item__btn_type_back");!function(e,t,n,r){a(this,void 0,void 0,(function*(){const o=yield L(e,"started");return function(e,t,n,r,o){a(this,void 0,void 0,(function*(){let a=0,c=0;const s=1e3,d=5,l=1920,u=.00105;function g(e){a+=d*s/e,n.style.marginLeft=`calc(${a}% - ${u*(l-window.innerWidth)*a}px)`,c=requestAnimationFrame(g),a>=88&&(cancelAnimationFrame(c),x(o))}S(r),g(t);500===(yield(0,i.switchCarEngineState)(e,"drive")).status&&(cancelAnimationFrame(c),x(o))}))}(e,o,t,n,r),o}))}(t.id,n,r,o)})),d.addEventListener("click",(()=>{const t=_(e.car),n=e.car.querySelector(".car-image"),r=e.car.querySelector(".car-item__btn_type_start"),i=e.car.querySelector(".car-item__btn_type_back");!function(e,t,n,r){a(this,void 0,void 0,(function*(){yield L(e,"stopped"),function(e,t,n,a){let r=85,i=0;const o=1e3,c=80;function s(e){r-=c*(o/e),t.style.marginLeft=`calc(${r}%`,i=requestAnimationFrame(s),r<=.5&&(cancelAnimationFrame(i),t.style.marginLeft="0",x(n))}S(a),s(e)}(1e3,t,n,r)}))}(t.id,n,r,i)}))}))}function S(e){e.classList.contains(l)||e.classList.add(l)}function x(e){e.classList.contains(l)&&e.classList.remove(l)}function w(e){document.querySelector(".main-box__header").innerText=`Garage (${e})`}function L(e,t){return a(this,void 0,void 0,(function*(){const n=yield(0,i.switchCarEngineState)(e,t),a=yield A(n);return"started"===t?a.distance/a.velocity:a}))}function A(e){return a(this,void 0,void 0,(function*(){const t=e.body.getReader(),n=new ReadableStream({start:e=>function n(){return t.read().then((({done:t,value:a})=>{if(!t)return e.enqueue(a),n();e.close()}))}()}),a=new Response(n),r=yield a.blob();return JSON.parse(yield r.text())}))}g(u),t.checkState=g,t.getStorageState=m,t.setStorageState=p,t.getCarData=_,t.updateCarData=function(e,t,n){const a=e.querySelector(s),r=e.querySelector("g");a.innerText=t,r.setAttribute(d,n)},t.renderNewCar=h,t.renderManyCars=function(e){return a(this,void 0,void 0,(function*(){u.setState(m());for(let t=0;t<e;t++){const e={name:v(),color:b()},t=yield(0,i.createCarRequest)(JSON.stringify(e));yield h(t)}}))},t.setCarControlHandlers=C,t.disableButton=S,t.undisableButton=x,t.checkViewBtn=function(e,t){const n=document.querySelector(".header-box__item_type_garage"),a=document.querySelector(".header-box__item_type_winners"),r=document.querySelector(".page-nav_prev"),i=document.querySelector(".page-nav_next"),o=document.querySelector(".input-name_create"),c=document.querySelector(".input-name_update"),s=document.querySelector(".btn__car_create"),d=document.querySelector(".btn__car_update");"garage"===e?(S(n),x(a),o.value.length<4&&S(s),c.value.length<4&&S(d)):"winners"===e&&(S(a),x(n)),t.pageCarRange[0]<=1&&S(r),t.pageCarRange[1]>=t.carAmount&&S(i)},t.setPageTotalCarAmount=w,t.carsStartRace=function(){return a(this,void 0,void 0,(function*(){const e=document.querySelectorAll(".car-item");console.log(e),e.forEach((e=>{e.querySelector(".car-item__btn_type_start").click()}))}))},t.carsReturn=function(){return a(this,void 0,void 0,(function*(){const e=document.querySelectorAll(".car-item");console.log(e),e.forEach((e=>{e.querySelector(".car-item__btn_type_back").click()}))}))}},964:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Winners=void 0;t.Winners=class{constructor(){this.btnPagePrev=document.querySelector(".page-nav_prev"),this.btnPageNext=document.querySelector(".page-nav_next")}}},8:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});(new(n(747).RootView)).render();(0,n(144).navigationController)()},382:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{s(a.next(e))}catch(e){i(e)}}function c(e){try{s(a.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.garageController=void 0;const r=n(689),i=n(333),o=n(410),c=n(373),s=new(n(222).State);(0,o.checkState)(s);function d(e,t){return a(this,void 0,void 0,(function*(){if(e.value.length>3){const n={name:e.value,color:t.value},a=yield(0,r.createCarRequest)(JSON.stringify(n));(0,o.renderNewCar)(a)}e.value=""}))}function l(e,t,n,i){return a(this,void 0,void 0,(function*(){s.setState((0,o.getStorageState)());const a=s.selectedCar.id;if(a&&null!=a&&null!==a){const c={name:e.value,color:t.value};if((yield(0,r.updateCarRequest)(a,JSON.stringify(c))).ok){const e=document.querySelector(`.${s.selectClass}`);(0,o.updateCarData)(e,c.name,c.color),e.classList.toggle(s.selectClass)}const d={id:null,name:null,color:null};s.selectedCar=d,(0,o.setStorageState)(s),n.value="",(0,o.disableButton)(i)}}))}function u(e,t){return a(this,void 0,void 0,(function*(){(0,o.disableButton)(e),yield(0,o.carsStartRace)(),(0,o.undisableButton)(t)}))}function g(e,t){return a(this,void 0,void 0,(function*(){(0,o.disableButton)(t),yield(0,o.carsReturn)(),(0,o.undisableButton)(e)}))}function m(){return a(this,void 0,void 0,(function*(){yield(0,o.renderManyCars)(100)}))}function p(e,t,n,r){return a(this,void 0,void 0,(function*(){s.setState((0,o.getStorageState)()),s.pageCarRange[0]>1&&(s.pageNumber=s.pageNumber-1,s.pageCarRange=[s.pageCarRange[0]-7,s.pageCarRange[1]-7],s.pageCarsAmount=7,h(n,r),(0,o.undisableButton)(t),s.pageCarRange[0]>1||(0,o.disableButton)(e))}))}function _(e,t,n,r){return a(this,void 0,void 0,(function*(){s.setState((0,o.getStorageState)()),s.pageCarRange[1]<s.carAmount&&(s.pageNumber=s.pageNumber+1,s.pageCarRange=[s.pageCarRange[0]+7,s.pageCarRange[1]+7],h(n,r),(0,o.undisableButton)(e),s.pageCarRange[1]<s.carAmount||(0,o.disableButton)(t))}))}function h(e,t){return a(this,void 0,void 0,(function*(){const n=new c.GarageView;t.innerText=`Garage (${s.carAmount})`,e.innerText=`Page #${s.pageNumber}`;const a=yield(0,r.getAllCarsRequest)(s.pageNumber,s.carsPerPage);s.pageCarsAmount=a.length,(0,o.setStorageState)(s),n.clearCarList(),a.map((e=>{const t=n.renderCar(e);(0,o.setCarControlHandlers)(t)}))}))}function v(e,t){e.value.length<4?(0,o.disableButton)(t):(0,o.undisableButton)(t)}t.garageController=()=>a(void 0,void 0,void 0,(function*(){const e=new i.Garage;e.seekerCreateCar(d),e.seekerUpdateCar(l),e.seekerRaceCars(u),e.seekerResetCars(g),e.seekerGenerateCars(m),e.seekerPreviosPageNav(p),e.seekerNextPageNav(_),e.seekerCreateAllow(v)}))},144:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{s(a.next(e))}catch(e){i(e)}}function c(e){try{s(a.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.navigationController=void 0;const r=n(689),i=n(549),o=n(524),c=n(525),s=n(373),d=n(689),l=n(382),u=n(713),g=n(410),m=new(n(222).State);(0,g.checkState)(m);const p=()=>a(void 0,void 0,void 0,(function*(){m.setState((0,g.getStorageState)());const e=new s.GarageView,t=(yield(0,d.getAllCarsRequest)()).length,n=void 0!==m.pageNumber?m.pageNumber:1,a=void 0!==m.carsPerPage?m.carsPerPage:7;m.carAmount=t;const r=n*a,i=n*a-a-1;m.pageCarRange=[i<0?1:i,r];const o=yield(0,d.getAllCarsRequest)(n,a);m.pageCarsAmount=o.length,e.render(m.carAmount,n),o.forEach((t=>{const n=e.renderCar(t);(0,g.setCarControlHandlers)(n)})),(0,l.garageController)(),(0,g.setStorageState)(m),(0,g.checkViewBtn)("garage",m)}));function _(e){return console.log(e),"garage"===e.getAttribute("data-type")?p():a(void 0,void 0,void 0,(function*(){m.setState((0,g.getStorageState)());const e=new c.WinnersView,t=yield(0,r.getAllWinnersRequest)();e.render(t.length,1),t.forEach((t=>a(void 0,void 0,void 0,(function*(){const n=yield(0,r.getCarRequest)(t.id);e.addWinner(t,n)})))),(0,u.winnersController)(),(0,g.checkViewBtn)("winners",m)}))}t.navigationController=()=>a(void 0,void 0,void 0,(function*(){(new o.NavigationView).render();const e=new i.Navigation;yield p(),e.seekerLinks(_)}))},713:function(e,t,n){var a=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,i){function o(e){try{s(a.next(e))}catch(e){i(e)}}function c(e){try{s(a.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((a=a.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.winnersController=void 0;const r=n(964);t.winnersController=()=>a(void 0,void 0,void 0,(function*(){new r.Winners}))},373:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GarageView=void 0;const a=n(627);t.GarageView=class{constructor(){this.target=document.querySelector(".main-box")}render(e,t){const n=document.createElement("div");n.classList.add("main__box","main-box");const r=(0,a.renderControl)();n.append(r);const i=document.createElement("h3");i.classList.add("main-box__header"),i.innerText=`Garage (${e})`;const o=document.createElement("p");o.classList.add("main-box__page-num"),o.innerText=`Page #${t}`;const c=document.createElement("ul");c.classList.add("main-box__car-list","car-list");const s=(0,a.getPageNavBox)();return n.append(i,o,c,s),this.target.replaceWith(n),[i,o]}clearCarList(){document.querySelector(".car-list").innerHTML=""}renderCar(e){const t=document.querySelector(".car-list"),n=document.createElement("li");n.classList.add("car-list__item","car-item");const r=document.createElement("ul");r.classList.add("car-item__list");const i=document.createElement("li");i.classList.add("car-item__item");const o=i.cloneNode(!0),c=document.createElement("button");c.classList.add("car-item__btn");const s=c.cloneNode(!0),d=document.createElement("p");d.classList.add("car-item__model");const l=c.cloneNode(!0),u=c.cloneNode(!0);c.classList.add("car-item__btn_type_select"),s.classList.add("car-item__btn_type_remove"),l.classList.add("car-item__btn_type_start"),u.classList.add("car-item__btn_type_back");const g=document.createElement("div");g.classList.add("car-item__car-img-box");const m=document.createElement("div");m.classList.add("car-item__finish-img-box"),m.insertAdjacentHTML("beforeend",(0,a.getFinishIgm)()),g.append(l,u),(0,a.carItemSetting)(c,s,l,u,d,g,e),i.append(c,s,d),o.append(g,m),r.append(i,o),n.append(r),t.append(n);return{car:n,select:c,remove:s,start:l,return:u}}}},524:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NavigationView=void 0;t.NavigationView=class{constructor(){this.target=document.querySelector(".header-box")}render(){const e=document.createElement("ul");e.classList.add("header-box__list");const t=document.createElement("li");t.classList.add("header-box__item");const n=t.cloneNode(!0);t.classList.add("header-box__item_type_garage"),n.classList.add("header-box__item_type_winners"),t.innerText="to garage",n.innerText="to winners",t.setAttribute("data-type","garage"),n.setAttribute("data-type","winners"),e.append(t,n),this.target.append(e)}}},747:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RootView=void 0;t.RootView=class{constructor(){this.target=document.querySelector("body")}render(){const e=document.createElement("header");e.className="header";const t=document.createElement("div");t.classList.add("header__box","header-box"),e.append(t);const n=document.createElement("main");n.className="main";const a=document.createElement("div");a.classList.add("main__box","main-box"),n.append(a),this.target.append(e,n)}}},627:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPageNavBox=t.settingTable=t.carItemSetting=t.renderControl=t.getFinishIgm=t.getCarImg=void 0;const a=n(410);t.getCarImg=(e,t,n)=>`\n<svg data-id="${t}" class="${"win"===e?"car-item__win-car-img":"car-item__car-img"} car-image" version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="1280.000000pt" height="640.000000pt" viewBox="0 0 1280.000000 640.000000"\n preserveAspectRatio="xMidYMid meet">\n<metadata>\nCreated by potrace 1.15, written by Peter Selinger 2001-2017\n</metadata>\n<g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"\nfill="${n}" stroke="none">\n<path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6\n-10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91\n-250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340\n-49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3\n-150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418\n0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64\n-126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622\n756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302\n140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263\nl-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22\n259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239\n-63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1\n-116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45\n525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50\n680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0\n-226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332\n-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341\n10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66\n-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36\n-485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83\n54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12\n-67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134\n274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11\n-27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>\n<path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262\n-467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493\n-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23\n86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50\n-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220\n1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360\n0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>\n<path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120\n-114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>\n<path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28\n22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>\n<path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0\n165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>\n<path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0\n165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>\n<path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29\n58 -13 0 -29 -8 -34 -18z"/>\n<path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57\n9 153 -71 153 -27 0 -44 -8 -66 -29z"/>\n<path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16\n-54 -2z"/>\n<path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67\n-62 36z"/>\n<path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123\n113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>\n<path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71\n195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>\n<path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25\n-70 0z"/>\n<path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7\n0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>\n<path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223\n232 -230 231 -3 0 -11 -3 -17 -6z"/>\n<path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24\n-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118\n380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86\n-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96\n33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176\n238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207\n81 364 77 109 -3 143 -7 210 -30z"/>\n<path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80\n119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>\n<path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20\n-163 84 -207 91 l-43 7 0 -162z"/>\n<path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0\n165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>\n<path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45\n-88 241 -108 241 -4 0 -57 -51 -119 -112z"/>\n<path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64\n-10 68 -14 2 -31 -3 -38 -10z"/>\n<path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0\n-44 -6 -64 -31z"/>\n<path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20\n-54 2z"/>\n<path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13\n-24 13 -3 0 -14 -6 -24 -13z"/>\n<path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120\n109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>\n<path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177\n79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>\n<path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43\n-67 12z"/>\n<path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108\n10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115\n-113z"/>\n<path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186\n61 239 98 16 10 -216 242 -234 235z"/>\n</g>\n</svg>\n`;t.getFinishIgm=()=>'\n<svg class="car-item__finish-img" version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"\n preserveAspectRatio="xMidYMid meet">\n\n<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"\nfill="#000000" stroke="none">\n<path d="M77 634 c-4 -4 -7 -148 -7 -321 0 -307 0 -313 20 -313 20 0 20 5 18\n317 -3 301 -7 341 -31 317z"/>\n<path d="M330 595 c-36 -8 -98 -14 -137 -14 l-73 -1 0 -55 c0 -54 0 -55 30\n-55 29 0 30 -1 30 -50 l0 -49 -30 6 -30 6 0 -56 0 -56 38 -7 c23 -5 88 1 175\n15 126 21 177 22 223 4 12 -4 14 20 14 155 0 157 0 160 -22 166 -37 10 -149 5\n-218 -9z m140 -40 c0 -43 -1 -45 -29 -45 -16 0 -36 -3 -45 -6 -13 -5 -16 2\n-16 38 0 25 3 48 7 51 3 4 24 7 45 7 l38 0 0 -45z m-190 -30 l0 -45 -40 0 -40\n0 0 45 0 45 40 0 40 0 0 -45z m258 -31 c18 -5 22 -13 22 -50 0 -47 -1 -47 -49\n-38 -29 6 -31 9 -31 50 0 47 7 51 58 38z m-168 -49 c0 -41 -2 -45 -27 -51 -16\n-3 -34 -7 -40 -10 -9 -2 -13 11 -13 46 0 52 -2 50 68 59 8 1 12 -14 12 -44z\nm100 -90 c0 -32 -4 -45 -14 -45 -7 0 -28 -3 -45 -6 l-31 -6 0 45 c0 48 6 53\n63 56 26 1 27 -1 27 -44z m-190 -29 c0 -45 -12 -55 -62 -56 -26 0 -26 86 0 93\n53 14 62 9 62 -37z"/>\n</g>\n</svg>\n';t.renderControl=()=>{const e=document.createElement("ul");e.classList.add("main-box__list","manage-list");const t=document.createElement("li");t.classList.add("main-box__item","manage-list__item","manage-item");const n=t.cloneNode(!0),r=t.cloneNode(!0),i=document.createElement("input");i.type="text",i.classList.add("manage-item__input");const o=i.cloneNode(!0);o.type="color";const c=document.createElement("button");c.classList.add("manage-item__button"),i.classList.add("manage-item__input_type_text"),o.classList.add("manage-item__input_type_color");const s=i.cloneNode(!0),d=o.cloneNode(!0),l=c.cloneNode(!0),u=c.cloneNode(!0),g=c.cloneNode(!0),m=c.cloneNode(!0);var p,_,h,v,b;return i.classList.add("input-name_create"),s.classList.add("input-name_update"),o.classList.add("input-color_create"),d.classList.add("input-color_update"),c.classList.add("btn__car_create"),l.classList.add("btn__car_update"),u.classList.add("btn__cars_race"),g.classList.add("btn__cars_reset"),m.classList.add("btn__cars_generate"),(0,a.disableButton)(g),_=l,h=u,v=g,b=m,(p=c).classList.add("manage-item__button_type_manage"),_.classList.add("manage-item__button_type_manage"),h.classList.add("manage-item__button_type_control"),v.classList.add("manage-item__button_type_control"),b.classList.add("manage-item__button_type_generate"),p.innerText="create",p.setAttribute("data-type","create"),_.innerText="update",_.setAttribute("data-type","update"),h.innerText="race",h.setAttribute("data-type","race"),v.innerText="reset",v.setAttribute("data-type","reset"),b.innerText="generate cars",b.setAttribute("data-type","generate"),t.append(i,o,c),n.append(s,d,l),r.append(u,g,m),e.append(t,n,r),e};t.carItemSetting=(e,n,a,r,i,o,c)=>{e.setAttribute("data-type","select"),n.setAttribute("data-type","remove"),a.setAttribute("data-type","start"),r.setAttribute("data-type","back"),e.innerText="select",n.innerText="remove",a.innerText="a",r.innerText="b",i.innerText=`${c.name}`,o.setAttribute("data-id",String(c.id)),o.insertAdjacentHTML("beforeend",(0,t.getCarImg)("garage",c.id,c.color))};t.settingTable=e=>{e.classList.add("main-box__table","win-table");const t=document.createElement("thead");t.classList.add("win-table__header");const n=document.createElement("tbody");n.classList.add("win-table__body");const a=document.createElement("tr"),r=document.createElement("th"),i=r.cloneNode(!0),o=r.cloneNode(!0),c=r.cloneNode(!0),s=r.cloneNode(!0);r.classList.add("win-table__table-header","win-table__header-number"),i.classList.add("win-table__table-header"),o.classList.add("win-table__table-header","win-table__header-name"),c.classList.add("win-table__table-header","win-table__header-wins"),s.classList.add("win-table__table-header","win-table__header-time"),r.innerText="number",i.innerText="car",o.innerText="name",c.innerText="wins",s.innerText="best time (seconds)",a.append(r,i,o,c,s),t.append(a),e.append(t,n)};t.getPageNavBox=()=>{const e=document.createElement("div");e.classList.add("main-box__page-nav-box");const t=document.createElement("button");t.classList.add("main-box__page-nav-btn");const n=t.cloneNode(!0);return t.classList.add("page-nav_prev"),n.classList.add("page-nav_next"),t.setAttribute("data-type","prev"),n.setAttribute("data-type","next"),t.innerText="prev",n.innerText="next",e.append(t,n),e}},525:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WinnersView=void 0;const a=n(627);t.WinnersView=class{constructor(){this.target=document.querySelector(".main-box")}render(e,t){const n=document.createElement("div");n.classList.add("main__box","main-box");const r=document.createElement("h3");r.classList.add("main-box__header"),r.innerText=`Garage (${e})`;const i=document.createElement("p");i.classList.add("main-box__page-num"),i.innerText=`Page #${t}`;const o=document.createElement("table");(0,a.settingTable)(o);const c=(0,a.getPageNavBox)();n.append(r,i,o,c),this.target.replaceWith(n)}addWinner(e,t){const n=document.querySelector(".win-table__body"),r=document.createElement("tr"),i=document.createElement("td"),o=i.cloneNode(!0),c=i.cloneNode(!0),s=i.cloneNode(!0),d=i.cloneNode(!0);i.classList.add("win-table__data-number"),o.classList.add("win-table__data-car"),c.classList.add("win-table__data-name"),s.classList.add("win-table__data-wins"),d.classList.add("win-table__data-time"),i.innerText="1",o.insertAdjacentHTML("beforeend",(0,a.getCarImg)("win",t.id,t.color)),c.innerText=`${t.name}`,s.innerText=`${e.wins}`,d.innerText=`${e.time}`,r.append(i,o,c,s,d),n.append(r)}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};n(659),n(508)})();