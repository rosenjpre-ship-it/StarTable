const data = require('../data/restaurants.json');

const checks = {
  address: x => !!x.address,
  phone: x => !!x.phone,
  officialOrReservation: x => !!(x.links && (x.links.official || x.links.reservation)),
  stationInfo: x => !!(x.transport && x.transport.stations && x.transport.stations.length),
  tabelogScore: x => !!(x.ratings && x.ratings.tabelogScore),
  courseInfo: x => !!((x.lunch && x.lunch.length) || (x.dinner && x.dinner.length)),
  dressVerified: x => !!(x.dressCode && x.dressCode.verified === true),
  childVerified: x => !!(x.childPolicy && x.childPolicy.verified === true),
  badScore: x => !!(x.ratings && x.ratings.tabelogScore && !/^\d+(\.\d+)?$/.test(String(x.ratings.tabelogScore))),
  michelinLinkResidue: x => !!(x.links && x.links.michelin),
  googleResidue: x => !!((x.links && x.links.googleMaps) || (x.ratings && x.ratings.googleMapsScore))
};

const pct = n => `${(n / data.length * 100).toFixed(1)}%`;

for (const [name, check] of Object.entries(checks)) {
  const count = data.filter(check).length;
  console.log(`${name}: ${count} / ${data.length} = ${pct(count)}`);
}

const missingCore = data.filter(x =>
  !checks.officialOrReservation(x) ||
  !checks.tabelogScore(x) ||
  !checks.courseInfo(x) ||
  !checks.dressVerified(x) ||
  !checks.childVerified(x)
);

console.log(`\nremainingCoreIncomplete: ${missingCore.length}`);
console.log(missingCore.slice(0, 80).map(x => [
  x.id,
  x.nameZh || x.nameJa || x.name,
  !checks.officialOrReservation(x) ? 'link' : '',
  !checks.tabelogScore(x) ? 'score' : '',
  !checks.courseInfo(x) ? 'course' : '',
  !checks.dressVerified(x) ? 'dress' : '',
  !checks.childVerified(x) ? 'child' : ''
].filter(Boolean).join('\t')).join('\n'));
