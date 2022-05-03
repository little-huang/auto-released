
<h1 align="center">auto-released</h1>

<p align="center">
    <b>Automatic release and git-related operations and webhook</b>
</p>

- Interactive selection of version numbers.
- Execute commands such as git push , tag.
- Support for custom build commands or other commands to publish actions prior to commit.
- Support for Webhook notifications.

![image](images/auto-release.gif)

# Installation

## Global installation

```bash
npm i -g auto-released
```

## Use anywhere
```bash
npx auto-released
```


# Usage

You need to execute this command at the root of your project

```bash
auto-released
```

In CI mode, each function is determined based on the configuration of the configuration file

```bash
auto-released -ci
```
or 
```bash
auto-released -CI
```


# Configuration

You can create the configuration file and directories by running `auto-released --int`. <br>
Will be in the current directory `auto.released.config.js` 

The config file is a simple:

```javascript
module.exports = {
  git: {
    checkClean: true,
    push: true,
    tag: true
  },
  npm: {
    build: true,
    publish: true
  },
  webhook: {
    enabled: false,
    url: '',
    body: {
      msgtype: 'text',
      text: {
        content: ''
      }
    }
  },
}
```

## Options

|                    Name                     |           Type            |                    Default                    | Description                                                                                                          |
| :-----------------------------------------: | :-----------------------: | :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------- |
|          **[`npm`](#npm)**            | `Object` |  `{ buildCommand: undefined, build: undefined, publish: undefined, versionType: undefined }` | Npm-related configuration.                                            |
|          **[`git`](#git)**            | `Object` |   `{ tag: undefined, push: undefined, checkClean: undefined }`  | Git related configuration.                                           |
|            **[`webhook`](#webhook)**  | `Object` |    `{ enabled: false, url: '', body: {} }`                      | Configuration for webhooks                                              | |

### npm
> Npm-related configuration.

Type: `Object`  
Default: `{ buildCommand: undefined, build: undefined, publish: undefined, versionType: undefined }`

#### npm.buildCommand

A command to run before a release is committed

Type: `String`  
Default: `undefined`

#### npm.build

Determines whether to enable a pre-build, Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

#### npm.publish

Whether to publish to the NPM repository, Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

#### npm.versionType

The type of version that needs to be published locally by NPM.
Upgrade Version type, Only CI mode is supported.

Type: `String`  
Default: `patch`   
Values: `'patch' | 'minor' | 'major' | 'prepatch' | 'preminor' | 'premajor' | 'prerelease'`

### git
> Git related configuration.

Type: `Object`  
Default: `{ tag: undefined, push: undefined, checkClean: undefined }`

#### git.tag

Whether to use the git tag. The tag name is the current release version, Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

#### git.push

Whether git is required to submit push code, Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

#### git.checkClean

Whether you need to check that your workspace is clean before starting, Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

### webhook
> Configuration for webhooks

Type: `Object`  
Default: `{ enabled: false, url: '', body: {} }`

#### webhook.enabled

To enable the Webhook function, you need to configure the webhook.url. Disabled if the value is false.

Type: `Boolean`  
Default: `undefined`

#### webhook.url

Webhook notification link.

Type: `String`  
Default: `undefined`

#### webhook.body

webhook The request body for the corresponding link.

Type: `Object`  
Default: `{}`


# LICENSE

MIT
