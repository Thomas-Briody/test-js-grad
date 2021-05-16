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

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  })
  const sortedPackages = res.data.content.sort((packageA, packageB) => {
    const packageADTstamp = new Date(packageA.package.date).getTime()
    const packageBDTstamp = new Date(packageB.package.date).getTime()

    return packageADTstamp - packageBDTstamp 
  })
  
  return sortedPackages[0].package.name
}
