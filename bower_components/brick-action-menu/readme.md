# brick-action-menu

> An action menu for [Brick](https://github.com/mozbrick/brick/).

## Demo

[Check it live!](http://mozbrick.github.io/brick-action-menu)

## Usage

1. Import Web Components polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/brick-action-menu.html">
    ```

3. Start using it:

    ```html
    <brick-action-menu id="menu-ex1">
      <menu>
        <button>Action 1</button>
        <button id="action2">Action 2</button>
        <button>Action 3</button>
      </menu>
    </brick-action-menu>
    ```

    ```javascript
    // Click events on menu buttons work like usual
    var action2 = document.getElementById('action2');
    action2.addEventListener('click', function (ev) {
      var button = ev.target;
      // Handle clicked menu item button here.
    });

    var menu = document.getElementById('menu-ex1');

    // Optional event handler
    menu.addEventListener('pick', function (ev) {
      var button = ev.target;
      // Handle clicked menu item button here.
    });

    // Optional callback on show()
    menu.show(function (button) {
      // Handle clicked menu item button here.
    });
    ```

## Options

None.

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`show([cb])`  | Optional callback, receives the menu item clicked | Nothing. | Reveals and activates the menu.
`hide()`      | None.        | Nothing.    | Hide and deactivate the menu. 

## Events

Event         | Description
---           | ---
`pick`        | Triggered when an item is chosen from the menu.

## Development

Brick components use [Stylus](http://learnboost.github.com/stylus/) to generate their CSS.

This repository comes outfitted with a set of tools to ease the development process.

To get started:

* Install [Bower](http://bower.io/) & [Gulp](http://gulpjs.com/):

    ```sh
    $ npm install -g bower gulp
    ```

* Install local dependencies:

    ```sh
    $ npm install && bower install
    ```

While developing your component, there is a development server that will watch your files for changes and automatically re-build your styles and re-lint your code.

To run the development server:

* Run `gulp server`
* Navigate to `http://localhost:3001`

To simply build and lint your code, run `gulp build`.

You can also push your code to GitHub Pages by running `gulp deploy`.
