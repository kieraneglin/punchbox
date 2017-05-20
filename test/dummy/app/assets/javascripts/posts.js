Punchbox.posts = class {
  // This is a rough-draft for the DSL I'd like to create.
  // Things will change, especially when it comes to declaring a class

  constructor() {
    this._namespace = 'admin/posts';
    console.log('CON');
    // Class setup.  Not strictly related to PunchBox
  }

  _controller() {
    console.log('FORM CONTROLLER');
    // Code for every action of this controller
  }

  // _namespace() {
  //   return 'admin/posts'
  // }

  index() {
    console.log('INDEX');
    // Code for Index
  }
};
