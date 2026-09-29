import assert from 'node:assert/strict';
import test from 'node:test';
import {
  hasRealPriceLevel,
  priceDollarMarks,
  priceRangeLabel,
  withoutUnpricedPriceRange,
} from './price';

const FILLED = 'text-slate-800 font-bold';
const MUTED = 'text-slate-300';

test('price levels 1 to 4 keep the existing dollar labels', () => {
  assert.equal(priceRangeLabel(1), '$');
  assert.equal(priceRangeLabel(2), '$$');
  assert.equal(priceRangeLabel(3), '$$$');
  assert.equal(priceRangeLabel(4), '$$$$');

  assert.deepEqual(priceDollarMarks(1), [FILLED, MUTED, MUTED, MUTED]);
  assert.deepEqual(priceDollarMarks(2), [FILLED, FILLED, MUTED, MUTED]);
  assert.deepEqual(priceDollarMarks(3), [FILLED, FILLED, FILLED, MUTED]);
  assert.deepEqual(priceDollarMarks(4), [FILLED, FILLED, FILLED, FILLED]);
});

test('missing price levels render no label and omit priceRange', () => {
  for (const level of [0, null, undefined, 5, -1, 1.5, '2', '', Number.NaN]) {
    assert.equal(hasRealPriceLevel(level), false);
    assert.equal(priceRangeLabel(level), null);
    assert.equal(priceDollarMarks(level), null);

    const schema = withoutUnpricedPriceRange(
      { name: 'The Healing Space', priceRange: 'Free', isAccessibleForFree: true },
      level,
    );
    assert.equal('priceRange' in schema, false);
    assert.equal(schema.name, 'The Healing Space');
    assert.equal(schema.isAccessibleForFree, true);
  }
});

test('a real price level keeps an existing priceRange', () => {
  const schema = withoutUnpricedPriceRange({ name: 'Example', priceRange: '$$' }, 2);
  assert.equal(schema.priceRange, '$$');
});
