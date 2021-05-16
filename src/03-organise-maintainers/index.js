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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const axios = require('axios')

module.exports = async function organiseMaintainers() {
  // TODO

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  })
  
  const allPackages = res.data.content


  const maintainerArray = allPackages.reduce((maintainers, currentPackage) => {
    currentPackage.package.maintainers.forEach((maintainerObject) => {
      // We need to check if we've already added the maintainer to the maintainersArray
      // If we have, we need to add the oackagename to the existing entry (and sort it) instead of making a new one
      const existingMaintainer = maintainers.find(maintainerItem => {
        return maintainerItem.username === maintainerObject.username
       })
      if (existingMaintainer) {
        existingMaintainer.packageNames.push(currentPackage.package.name)
        existingMaintainer.packageNames = existingMaintainer.packageNames.sort()

      } else {
      // If the maintainer hasn't already been added, we need to create a new entry for them
        maintainers.push({ username: maintainerObject.username, packageNames: [currentPackage.package.name] })

      } 

    })
    return maintainers
  }, [])

  const sortedMaintainerArray = maintainerArray.sort((a, b) => {
    if (a.username < b.username) {
      return -1
    }
    if (a.username > b.username) {
      return +1
    }
    return 0
  })
  // get the username of every maintainer, create an object for eadch maintainer, with a key for their username, and another key
  // which is an array of the package names that they are listed under
  // use a reduce to do this for every package

  return sortedMaintainerArray
};
