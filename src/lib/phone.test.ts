import assert from 'node:assert/strict';
import test from 'node:test';
import { listingPhone, listingTelHref, withListingTelephone } from './phone';

test('listing phone and tel href use only the listing number', () => {
  assert.equal(listingPhone('  +1 604-555-0100  '), '+1 604-555-0100');
  assert.equal(listingTelHref('+1 (604) 555-0100'), 'tel:+16045550100');
  assert.equal(listingTelHref('604.555.0100'), 'tel:+16045550100');
  assert.equal(listingTelHref('778-770-0275'), 'tel:+17787700275');
  assert.equal(listingPhone('   '), null);
  assert.equal(listingPhone(null), null);
  assert.equal(listingTelHref(undefined), null);
  assert.equal(listingTelHref('call the shop'), null);
  assert.equal(listingPhone('+1 (778) 770-2931'), null);
  assert.equal(listingPhone('778-770-2931'), null);
  assert.equal(listingPhone('+17787702931'), null);
  assert.equal(listingTelHref('778.770.2931'), null);
});

test('JSON-LD telephone is the listing phone or omitted', () => {
  const stored = {
    '@type': 'LocalBusiness',
    name: 'Black Diamond Bike Rentals',
    telephone: '+1 (604) 555-0199',
    contactPoint: { '@type': 'ContactPoint', telephone: 'tel:+16045550199' },
  };

  const replaced = withListingTelephone(stored, '+1 604-555-0100');
  assert.equal(replaced.telephone, '+1 604-555-0100');
  assert.equal(
    (replaced.contactPoint as { telephone?: string }).telephone,
    undefined,
  );
  assert.equal(stored.telephone, '+1 (604) 555-0199');

  const omitted = withListingTelephone(stored, '  ');
  assert.equal('telephone' in omitted, false);
  const siteNumber = withListingTelephone(
    { ...stored, telephone: '+1 (778) 770-2931' },
    '+1 (778) 770-2931',
  );
  assert.equal('telephone' in siteNumber, false);
  assert.equal(
    (omitted.contactPoint as { telephone?: string }).telephone,
    undefined,
  );
});
