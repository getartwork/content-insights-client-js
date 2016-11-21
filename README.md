# Content Insights API Client

## Getting started

### Install

#### with Npm

```
npm install --save @zalando-fcp/content-insights-client
```

### Usage

```
import ContentInsightsApi from 'content-insights-client'
...

const client = new ContentInsightsApi('http://contents-insights-api-host/', 'MY_FCP_TENANT_ID')
...
```

## Development

2. Building
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version.
3. Development mode
  * Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `npm run test`

## Scripts

* `npm run build` - produces production version under the `lib` folder
* `npm run dev` - produces development version and runs a watcher
* `npm run test` - well ... it runs the tests :)
