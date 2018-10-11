
# @iota/pearl-diver-react-native

IOTA transaction nonce searcher for react native apps.

## Installation

`npm install @iota/pearl-diver-react-native`

### Automatic linking:
`react-native link @iota/pearl-diver-react-native`

---

## Usage
```js
import { composeAPI } from '@iota/core'
import { attachToTangle } from '@iota/pearl-diver-react-native';

const iota = composeAPI({ 
    provider: 'http://...',
    attachToTangle
})

const seed = 'SOME9GOOD9RANDOM9SEED...'
const transfers = [{
    address: '9'.repeat(81),
    value: 0
}]

const depth = 3
const minWeightMagnitude = 14

iota.prepareTransfers(seed, transfers)
    .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))

```

---

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@iota/pearl-diver-react-native` and add `PearlDiver.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libPearlDiver.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import org.iota.PearlDiver.PearlDiverPackage;` to the imports at the top of the file
  - Add `new PearlDiverPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':@iota/pearl-diver-react-native'
  	project(':@iota/pearl-diver-react-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/@iota/pearl-diver-react-native/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':@iota/pearl-diver-react-native')
  	```


