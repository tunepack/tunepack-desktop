# Tunepack 

## Getting started

```shell
npm install
cp .env.example .env
```

## Development

```shell
npm run dev
```

## Creating a component

To easily create a scaffolds of components etc. we use Plop.

Please make sure you install Plop first: `npm install plop --g`

```shell
plop component
```

## Packaging

To package the app for the local platform:

```shell
GA_TRACKING_ID=x npm run package
```

## Packaging and publishing

To package the app for the local platform:

```shell
GA_TRACKING_ID=x npm run package:ci
```

The packaged app will be inside the `release` directory.

## Building to Multiple Platforms

```shell
GA_TRACKING_ID=x npm run package:all
```

## Uploading a draft release to Github automatically

First generate an Github access token here: https://github.com/settings/tokens

Then add an env var called `GH_TOKEN` with that token value to your env vars so:

```shell
sudo nano ~/.bash_profile
```

Then run

```
npm run package:ci
```

Debugging:

```
DEBUG=tunepack:* npm run dev
```

Debugging soulseek:

```
DEBUG=slsk:* npm run dev
```
