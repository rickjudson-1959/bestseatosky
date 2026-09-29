import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PriceLevel from '../components/PriceLevel';

test('a missing price renders no price label', () => {
  for (const level of [0, null, undefined, 5, 'Free']) {
    const html = renderToStaticMarkup(createElement(PriceLevel, { level }));
    assert.equal(html, '');
  }
});

test('levels 1 to 4 render the same four-dollar label as before', () => {
  const html = renderToStaticMarkup(createElement(PriceLevel, { level: 2, size: 'sm' }));
  assert.equal(html.includes('Free'), false);
  assert.equal((html.match(/text-slate-800 font-bold/g) || []).length, 2);
  assert.equal((html.match(/text-slate-300/g) || []).length, 2);
  assert.match(html, /^<span class="text-sm">/);

  const one = renderToStaticMarkup(createElement(PriceLevel, { level: 1 }));
  assert.equal((one.match(/text-slate-800 font-bold/g) || []).length, 1);
  assert.equal((one.match(/text-slate-300/g) || []).length, 3);
  assert.match(one, /^<span class="text-xs">/);

  const four = renderToStaticMarkup(createElement(PriceLevel, { level: 4 }));
  assert.equal((four.match(/text-slate-800 font-bold/g) || []).length, 4);
  assert.equal(four.includes('text-slate-300'), false);
});
