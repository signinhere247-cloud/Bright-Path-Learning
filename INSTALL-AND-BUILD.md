# BrightPath Learning — reproducible install and build

Run these commands from the `BrightPath-Playable-3D` project folder on a computer or CI service that can reach https://registry.npmjs.org/.

## First successful installation

```sh
npm install
npm run check:build
npm test
npm run audit
npm run build
npm run check:output
```

`npm install` should generate `package-lock.json`. Keep that file with the project so later installs can use `npm ci`.

## Repeatable installation after lockfile exists

```sh
npm ci
npm run release:gate
```

The release gate deliberately reports browser and live-cloud checks as unverified. For browser testing, install Chromium with `npx playwright install chromium` and run `npm run test:browser`. Test the separate preview deployment before making any changes to live V3.

## Troubleshooting `EAI_AGAIN`

An `EAI_AGAIN` error means DNS/network access to the registry failed; it does not mean the JavaScript source failed to compile. Check the machine's internet/DNS, proxy and firewall settings, then retry. Do not fabricate a `package-lock.json` or use `npm ci` without a valid lockfile. Never include `.env` secrets, `node_modules`, or local credentials in the final release archive.

## Release status

Until installation, build, browser gameplay, and staging Supabase checks have actually passed, this project is **not verified for production release**. The existing live V3 must remain untouched.
