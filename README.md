# Favorites management

Using channels response from `channels.json` implement favorites management UI
similar to [example](https://zattoo-abox-staging.zattoo.com/?login=00007733&password=12345)
results of your work please share via private GitHub repo (my GitHub username pverkhovskyi)

Please use technologies you are the most comfortable with.

You can access favorites management following steps below:
Menu (press Left arrow key) -> Settings -> Manage favorites


## Requirements
- filter duplicated channels from the response
- use best available quality (`uhd` > `hd` > `sd`)
- only channels with availability === available should be in the list
- render all channels in two columns
- Each rendered channel item should have number, logo, title, quality and display inFavorites status
- enable keyboard navigation
- highlight selected item
- on Enter key add item to favorites list / or remove when it is already in the list



## Hints
To get channel logo use `logo_token` from the response (example `https://images.zattic.com/logos/93b42a0d35defc25ca42/white/240x135.png`)


# Zattoo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


