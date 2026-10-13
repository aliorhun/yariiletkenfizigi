'use strict';
// Dependency-free numerical and integration checks. Run:
// node tests/solid-state-foundations.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(base, 'assets/solid-state-foundations.js'), 'utf8');
const page = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
new vm.Script(source, {filename:'solid-state-foundations.js'});
const win = {};
vm.runInNewContext(source, {window:win, document:{}, getComputedStyle(){return {getPropertyValue(){return '';}};}});
const f = win.SolidStateFoundations._test;
const close = (got, expected, tolerance=1e-10) =>
  assert.ok(Number.isFinite(got) && Math.abs(got-expected) <= tolerance,
    'Expected '+got+' ≈ '+expected+' (tolerance '+tolerance+')');

// In the interior, an infinite periodic Gaussian-orbital sum obeys the Bloch phase relation.
for(const reducedK of [-1, -0.5, 0, 0.35, 1]){
  for(const sigma of [0.16,0.29,0.45]){
    const k=Math.PI*reducedK, p=f.blochAt(4.12,k,sigma), q=f.blochAt(5.12,k,sigma);
    const re=p.re*Math.cos(k)-p.im*Math.sin(k);
    const im=p.re*Math.sin(k)+p.im*Math.cos(k);
    const residual=Math.hypot(q.re-re,q.im-im)/Math.max(1e-9,Math.hypot(p.re,p.im));
    assert.ok(residual<1e-10,'Bloch translation residual '+residual);
  }
}
// For a two-orbital open chain there are N levels per effective orbital family.
for(const [key,referenceEg] of [['si',1.12],['ge',0.66],['gaas',1.42]]){
  const pair=f.tightBindingSpectrum(key,2,1);
  const small=f.tightBindingSpectrum(key,16,1);
  const large=f.tightBindingSpectrum(key,160,1);
  const separated=f.tightBindingSpectrum(key,160,1.8);
  assert.equal(pair.valence.length,2);
  assert.equal(large.conduction.length,160);
  assert.ok(pair.gap>small.gap && small.gap>large.gap);
  assert.ok(pair.bandwidth<large.bandwidth);
  assert.ok(separated.bandwidth<large.bandwidth);
  assert.ok(separated.gap>large.gap);
  close(large.gap,referenceEg,1e-3);
  close(large.gapBulk,referenceEg,1e-10);
}
// Density-of-states exponents for an isotropic parabolic single valley.
for(const d of [1,2,3]){
  const ratio=f.numericDOS(0.4,0.33,d)/f.numericDOS(0.1,0.33,d);
  close(ratio,Math.pow(4,d/2-1));
  // g_d scales as m*^(d/2).
  const massRatio=f.numericDOS(0.2,0.4,d)/f.numericDOS(0.2,0.2,d);
  close(massRatio,Math.pow(2,d/2));
}
// Nearly-free electron 2-wave Bragg gap Δ=2|V_G|.
for(const coupling of [0,.05,.17,.5]){
  const bands=f.braggBands(coupling);
  close(bands.gap,2*coupling);
  close(bands.upper[110]-bands.lower[110],2*coupling);
  for(let i=0;i<bands.q.length;i++)assert.ok(bands.upper[i]>=bands.lower[i]);
}
// Verify that the actual course template wires the new charts for both languages.
for(const expected of [
  'assets/solid-state-foundations.js',
  'assets/solid-state-foundations.css',
  'window.SolidStateFoundations.mount(main, LANG)',
  'window.SolidStateFoundations.render()',
  'window.SemiconductorCourseOutline.mountLesson(main, LANG)'
])assert.ok(page.includes(expected), 'Missing integration: '+expected);
console.log('PASS — Bloch, Bragg, 2-band tight binding, dimensional DOS and page integration');
