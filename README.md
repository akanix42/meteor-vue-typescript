# Integrate TypeScript with vue single-file components for Meteor

This meteor package adds [TypeScript](https://www.typescriptlang.org/) support in your single-file `.vue` components.

## Prerequisites
This package is an add-on for [akryum:vue-component](https://github.com/Akryum/vue-meteor). You must first have that package installed.

## Installation

    meteor add nathantreid:vue-typescript


## Usage

Set your script's `lang` attribute to `ts` or `typescript`:
```html
<script lang="ts">
  let message: string;

  export default {
    mounted() {
      message = 'world';
      console.log(`Hello, ${message}!`);
    }
  }
</script>
```

Or with `vue-class-component`:
```html
<script lang="typescript">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  let message: string;

  @Component
  export default class MyButton extends Vue {
    mounted() {
      message = 'world';
      console.log(`Hello, ${message}!`);
    }
  }
</script>
```

## Importing TypeScript files
This plugin only handles compilation of TypeScript within .vue files. To import other TypeScript files, you must install a .ts compiler such as [barbatus:typescript](https://github.com/barbatus/typescript).

## TypeScript compilation notes
Compilation is handled by [barbatus:typescript-compiler](https://github.com/barbatus/typescript-compiler) and therefore supports the same options as [barbatus/typescript](https://github.com/barbatus/typescript).
For more information about compiler options, please see the above link.


LICENCE ISC - Created by Nathan Reid (@nathantreid)
