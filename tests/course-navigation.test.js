'use strict';
// Run with: node tests/course-navigation.test.js
// Dependency-free checks for the two-step course menu and physics lesson anchors.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'..');
const script=fs.readFileSync(path.join(repo,'assets/course-structure.js'),'utf8');
const html=fs.readFileSync(path.join(repo,'index.html'),'utf8');
new vm.Script(script);

function element(tag) {
  const el={
    tagName:tag.toUpperCase(),children:[],dataset:{},attributes:{},events:{},
    className:'',id:'',href:'',textContent:'',
    classList:{values:new Set(),add(v){this.values.add(v)},remove(v){this.values.delete(v)},contains(v){return this.values.has(v)}},
    appendChild(child){this.children.push(child);return child},
    insertBefore(child){this.children.unshift(child);return child},
    setAttribute(name,value){this.attributes[name]=String(value)},
    removeAttribute(name){delete this.attributes[name]},
    addEventListener(name,fn){this.events[name]=fn},
    querySelector(){return null},
    querySelectorAll(){return []}
  };
  Object.defineProperty(el,'innerHTML',{get(){return this.html||''},set(value){this.html=value;if(value==='')this.children=[]}});
  return el;
}
const sections=element('section'),main=element('main'),nav=element('nav');
const document={createElement:element,getElementById(id){return id==='courseSections'?sections:null}};
const window={};
vm.runInNewContext(script,{window,document});
const course=window.SemiconductorCourseOutline;
const weeks=Array.from({length:20},(_,n)=>({n:n+1,ready:true,modern:n>=14}));
let selected=null,topic=null,selectedWeek=null,backs=0;

// Landing screen must show only two course cards, not mixed lessons.
course.renderHome(main,'tr',id=>{selected=id});
assert.equal(main.children.length,2);
const homeCards=main.children[1].children;
assert.equal(homeCards.length,2);
assert.equal(homeCards[0].children[1].children[0].textContent,'Yarıiletken Fiziği');
assert.equal(homeCards[1].children[1].children[0].textContent,'Yarıiletken Cihazları');
homeCards[0].events.click();
assert.equal(selected,'physics');

course.renderNavigation(nav,weeks,w=>w.n+' · Example','tr','physics',1,'crystal',
  n=>{selectedWeek=n},id=>{topic=id},()=>{backs++});
assert.equal(sections.children.length,2); // back + selected chapter heading
assert.equal(sections.children[1].children[1].textContent,'Yarıiletken Fiziği');
const buttons=nav.children.filter(el=>el.tagName==='BUTTON');
const topics=buttons.filter(el=>el.dataset.topic);
const extras=buttons.filter(el=>el.dataset.week);
assert.equal(topics.length,10);
assert.equal(extras.length,3);
assert.deepEqual(extras.map(el=>el.dataset.week),['5','19','20']);
assert.equal(topics.filter(el=>el.attributes['aria-current']==='location').length,1);
assert.equal(topics[0].dataset.topic,'crystal');
assert.equal(topics[4].dataset.topic,'dos');
topics[4].events.click();
assert.equal(topic,'dos');
extras[0].events.click();
assert.equal(selectedWeek,5);
sections.children[0].events.click();
assert.equal(backs,1);

course.renderHome(main,'en',id=>{selected=id});
assert.equal(main.children[0].children[1].textContent,'What would you like to study?');
assert.equal(main.children[1].children[0].children[1].children[0].textContent,'Semiconductor Physics');
course.renderNavigation(nav,weeks,w=>'Week '+w.n,'en','devices',2,null,
  n=>{selectedWeek=n},id=>{topic=id},()=>{backs++});
const devices=nav.children.filter(el=>el.tagName==='BUTTON');
assert.equal(devices.length,16);
assert.equal(sections.children[1].children[1].textContent,'Semiconductor Devices');
assert.equal(devices[0].attributes['aria-current'],'location');
devices[4].events.click();
assert.equal(selectedWeek,7);

// No in-content roadmap; lesson anchors and explanations must still be mounted.
assert.ok(!script.includes("prose.insertBefore(guide,prose.firstChild)"));
for(const id of ['crystal','bloch-electron','bands','edges','dos','holes','fermi','equilibrium','doping','transport']){
  assert.ok(script.includes("'"+id+"'")||script.includes("['"+id+"'"),'Missing '+id);
}
for(const required of [
  'SemiconductorCourseOutline.renderHome(main, LANG, setCourse)',
  'SemiconductorCourseOutline.renderNavigation(',
  'function showHome(',
  'function showTopic(',
  "target.scrollIntoView(",
  "showHome(false);",
  'window.SolidStateFoundations.mount(main, LANG)',
  'window.SemiconductorFundamentals.render()'
])assert.ok(html.includes(required),'Missing page integration: '+required);
console.log('PASS — home, back, physics topics, device chapters, i18n and page hooks');
