/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const axios = require('axios')

module.exports = async function oldestPackageName() {
  // TODO

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  })
  // console.log(res.data.content)
  const allPackages = res.data.content
  const sortedPackages = allPackages.sort((packageA, packageB) => {
    // console.log('PACKAGE A DATE', packageA.package.date)
    const packageADateTimestamp = new Date(packageA.package.date).getTime()
    const packageBDateTimestamp = new Date(packageB.package.date).getTime()
    return packageADateTimestamp - packageBDateTimestamp 
  })
  // console.log('SORTED', sortedPackages)
  return sortedPackages[0].package.name
};
