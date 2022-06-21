# Cypress básico V2

Descrição básica do projeto

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v16.13.2` and `8.1.2` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

You can run testes simulating desktop or mobile viewport

### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.
Or, run `npm run cy:open` to open cypress in interactive desktop mode

### Mobile

Run `npm test:mobile` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.
Or, run `npm run cy:open:mobile` to open cypress in interactive mode

Or, run `npm run cy:open` to open Cypress in interactive mobile mode.