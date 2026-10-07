import assert from 'node:assert/strict';
import test from 'node:test';
import { isListingDetailPath } from './listingRoutes';

test('listing detail routes are only business listing URLs', () => {
  assert.equal(isListingDetailPath('/play/black-diamond-bike-rentals-whistler'), true);
  assert.equal(isListingDetailPath('/eat/some-cafe-squamish'), true);
  assert.equal(isListingDetailPath('/services/a-guide'), true);

  assert.equal(isListingDetailPath('/'), false);
  assert.equal(isListingDetailPath('/contact'), false);
  assert.equal(isListingDetailPath('/about'), false);
  assert.equal(isListingDetailPath('/get-listed'), false);
  assert.equal(isListingDetailPath('/advertise'), false);
  assert.equal(isListingDetailPath('/privacy'), false);
  assert.equal(isListingDetailPath('/terms'), false);
  assert.equal(isListingDetailPath('/eat'), false);
  assert.equal(isListingDetailPath('/play'), false);
  assert.equal(isListingDetailPath('/eat/squamish'), false);
  assert.equal(isListingDetailPath('/eat/whistler'), false);
  assert.equal(isListingDetailPath('/eat/pemberton'), false);
  assert.equal(isListingDetailPath('/stay/squamish'), false);
  assert.equal(isListingDetailPath('/stay/whistler'), false);
  assert.equal(isListingDetailPath('/eat/cuisine/thai'), false);
  assert.equal(isListingDetailPath('/eat/with/takeout'), false);
  assert.equal(isListingDetailPath(null), false);
});
