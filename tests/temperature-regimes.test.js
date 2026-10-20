'use strict';
// node tests/temperature-regimes.test.js
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const js=fs.readFileSync(path.join(__dirname,'../assets/temperature-regimes.js'),'utf8');
new vm.Script(js);
const win={};
vm.runInNewContext(js,{window:win});
const {solve,scenario,intrinsic,bandgap}=win.SemiconductorTemperatureRegimes._test;
function close(actual,expected,tol=.01){
  assert.ok(Math.abs(actual-expected)<=tol*Math.max(Math.abs(expected),1e-300),
    actual+' should be close to '+expected);
}
for(const T of [50,100,300,500,700,1000,1100]){
  const i=solve(0,0,T);
  assert.equal(i.type,'i','intrinsic Si is never majority-electron/hole doped');
  close(i.n,i.p,1e-9);
  close(i.n,intrinsic(T),1e-9);
  close(i.net,0);
}
assert.ok(bandgap(1000)<bandgap(300),'Varshni gap narrows as temperature increases');
assert.ok(intrinsic(1000)>intrinsic(300)*1e6,'thermal generation rises strongly');
for(const [nd,na,expectedType] of [[1e16,0,'n'],[0,1e16,'p'],[1e16,9e15,'n'],[9e15,1e16,'p']]){
  const room=solve(nd,na,300),cold=solve(nd,na,50),hot=solve(nd,na,1000);
  assert.equal(room.type,expectedType);
  assert.ok(cold.major<room.major*.8,'freeze-out should lower majority carriers');
  assert.ok(hot.minor>room.minor*1e6,'thermal pairs should dominate at high T');
  for(const T of [50,100,300,700,1000]){
    const state=solve(nd,na,T);
    close(state.n*state.p,Math.pow(state.ni,2),1e-9);
    close(state.major-state.minor,state.net,1e-7);
    assert.ok(state.NDp>=0&&state.NDp<=nd&&state.NAm>=0&&state.NAm<=na);
  }
}
const phosphorus=solve(1e16,0,300),boron=solve(0,1e16,300);
assert.ok(phosphorus.n>phosphorus.p&&boron.p>boron.n);
close(phosphorus.major,phosphorus.net+phosphorus.minor,1e-8);
close(boron.major,boron.net+boron.minor,1e-8);
assert.ok(solve(1e16,0,50).NDp<1e16*.2,'few donors ionize at 50 K');
assert.ok(solve(0,1e16,50).NAm<1e16*.2,'few acceptors ionize at 50 K');
// Equal compensation exposes floating-point cancellation at low T if the
// solver subtracts two ~1e16 ion densities directly.
for(const T of [50,100,300,700,1000]){
  const state=solve(1e16,1e16,T);
  close(state.major-state.minor,state.net,1e-6);
}
assert.equal(scenario('donor',16).ND,1e16);
assert.equal(scenario('acceptor',16).NA,1e16);
assert.equal(scenario('balanced',16).ND,scenario('balanced',16).NA);
assert.equal(scenario('intrinsic',16).ND,0);
assert.equal(scenario('heavy',16).heavy,true,'high doping must explicitly mark the validity limit');
console.log('PASS: P/B donors and acceptors, freeze-out, extrinsic and intrinsic, compensation, charge neutrality and limits');
