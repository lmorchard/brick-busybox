# brick-input

> A [Brick](https://github.com/mozbrick/brick/) custom element starter-kit.

## Demo

[Check it live!](http://mozbrick.github.io/brick-input)

## Usage

1. Import Web Components polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/brick-input.html">
    ```

3. Start using it:

    ```html
    <brick-input name="Name" label="Name" pattern="[A-Z]" error="Only letters, please!">
    ```

## Options

Attribute     | Type       | Default       | Description
---           | ---        | ---           | ---
`label`       | *string*   | -             | The name for the associated field's label.
`name`        | *string*   | -             | Equivalent to the `name` attribute on regular HTML input elements.
`placeholder` | *string*   | -             | Placeholder text when nothing is input.
`aria-label`  | *string*   | -             | The `aria-label` attribute will default to the value of the `placeholder` attribute if not provided.
`error`       | *string*   | -             | Text to display when the user has entered invalid input.
`pattern`     | *regex*    | -             | A regular expression that represents valid characters for this input.
`multiline`   | *boolean*  | -             | Adding `multiline` will use a `<textarea>` internally.  Default is `input`.

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
