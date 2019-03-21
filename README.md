# Punchbox 👊
## Page-specific JavaScript in Rails

Punchbox is a dead-simple way to add page-specific JavaScript to your Rails project.

The goal for this project is to have a focused scope (page-specific JS and nothing else), be as lightweight as possible, have no dependencies, and to run on <sup><sup>almost</sup></sup> any browser that runs JS.

Punchbox's syntax is a spiritual successor to [Paloma](https://github.com/kbparagua/paloma) and is otherwise inspired by a project I've contributed to in the past, [seed_tray](https://github.com/LoamStudios/seed_tray).

**Looking for a friendly walkthrough?  [Check here](https://medium.com/kierancodes/page-specific-javascript-in-rails-4-a48c17efa580)**

## Compatibility

Punchbox should work on Rails 4+ and really any Ruby version that's supported by your version of Rails.  There's really nothing fancy happening Ruby-side.

The JavaScript is pure without any dependencies (no jQuery! 🎉).  It should work down to IE9, thereby working on 98% of browsers.

Punchbox works with or without Turbolinks.

The JavaScript is only ~840 *bytes* minified and gzipped.

## Installation

You know the drill. Add this line to your application's Gemfile:

```ruby
gem 'punchbox'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install punchbox
```

Once you've done that, require Punchbox before tree in your main JavaScript file.

```javascript
// ...
//= require punchbox
//= require_tree .
```

Finally, include the `punchbox_attributes` hooks in your main `<body>` tag.

```html
<body <%= punchbox_attributes %>>
  <%= yield %>
</body>
```

You might also include the attributes with `punchbox_data`, which returns a plain ruby `data:` object. Useful for using with templating languages like Erb, Haml and Slim.

```slim
body *punchbox_data
  == yield
```

## Usage

Punchbox's syntax is very similar to that of Paloma's.  To run JS on a certain page, you call Punchbox like so:

```javascript
Punchbox.on(<controller: string>, <callable>);
```

**Important**

Punchbox automatically runs your code after your document is ready, negating the need for `$(document).ready` and the like.  If this is a problem, please make an issue and I'll consider changing this behaviour.

### Controller

`controller` should be a string or a function that returns a string.  It should be the exact name of the controller (plus namespace) that you want your code to run on.  It should be ClassCase (PascalCase) only.

For example, if your controller is `PostsController`, you'd enter `Posts`.  If your controller is `AdminPanelsController`, you'd enter `AdminPanels`.

#### Namespacing

Namespacing is accomplished via forward slashes.  

If your controller is `AdminPanel::Settings::UserManagersController`, you'd enter `AdminPanel/Settings/UserManagers`.

### Callable (read this part)

`callable` can be a function, class, or object.  Classes are the preferred convention, but of course you can use whatever is compatible with your current workflow.

#### Function names

Functions should be named after the actions on which they should run.  A function `index` would run when the `index` action is invoked.

The exception is `controller`.  Punchbox treats functions named `controller` in a special way and runs them on every action in a given Rails controller.

### Examples

In all examples I'll be targeting the `Posts` controller. *Remember that the name of your `callable` or your JS filepath don't have anything to do with Punchbox's functionality. However, I'll be naming the callables after the controllers to keep up with the preferred convention.*

**ES2015+ (class syntax)**

```javascript
class Posts {
  controller() {
    console.log('Hello from every action on a controller!');
  }

  index() {
    console.log('Hello from just the index action!');
  }

  // ...
}

Punchbox.on('Posts', Posts); // Notice that you don't instantiate the class
```

**Function syntax**

```javascript
function Posts() {
  // ...
};

Posts.prototype.controller = function() {
  console.log('Hello from every action on a controller!');
};

Posts.prototype.index = function() {
  console.log('Hello from just the index action!');
};

Punchbox.on('Posts', Posts); // Notice that you don't instantiate the function
```

**Object syntax**

```javascript
var Posts = {
  controller: function() {
    console.log('Hello from every action on a controller!');
  },

  index: function() {
    console.log('Hello from just the index action!');
  }
}

Punchbox.on('Posts', Posts);
```

**CoffeeScript**

```coffeescript
class Posts
  controller: ->
    console.log 'Hello from every action on a controller!'

  index: ->
    console.log 'Hello from just the index action!'

Punchbox.on('Posts', Posts) # Notice that you don't instantiate the class
```

### Events

Every time a controller or action function is run, some events on `document` fire.

These events are `punchbox:<controller>:run` and `punchbox:<controller>:<action>:run`.  These both run when their respective functions would run.

Keep in mind that the events are `snake_case` with slashes preserved.

For example, you would listen to the `Posts` controller trigger like so:

```javascript
document.addEventListener('punchbox:posts:run', () => {
  console.log('Posts controller ran!');
})
```

and you'd listen to the `Posts` `index` trigger like so:

```javascript
document.addEventListener('punchbox:posts:index:run', () => {
  console.log('Posts index ran!');
})
```

## Contributing

If you want to contribute, don't hesitate to create an issue or PR!  Since this project is in it's infancy, your input could help shape the project as a whole!

Please note that the magic happens inside `app/assets/javascripts/punchbox.es6`.  `punchbox.js` is then created via Babel before deployment.  If you make a PR, please only edit `punchbox.es6`.

Bug reports and pull requests are welcome on GitHub at https://github.com/kieraneglin/punchbox/. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
