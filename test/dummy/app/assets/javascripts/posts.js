// const posts = {
//   // This is a rough-draft for the DSL I'd like to create.
//   // Things will change, especially when it comes to declaring a class
//   //
//   // constructor:() {
//   //   // this._namespace = 'admin/posts';
//   //   console.log('CON');
//   //   // Class setup.  Not strictly related to PunchBox
//   // }
//
//   controller: () => {
//     console.log('FROM CONTROLLER');
//     // Code for every action of this controller
//   },
//
//
//   index: () => {
//     console.log('INDEX');
//     // Code for Index
//   }
// };
document.addEventListener('punchbox:admin/pages:run', () => {
  console.log('posts run');
})
document.addEventListener('punchbox:admin/pages:index:run', () => {
  console.log('posts index run');
})

function posts() {
}

posts.prototype.controller = function () {
  console.log('controller!');
};

posts.prototype.index = function () {
  console.log('index!');
};

Punchbox.on('Admin/Pages', posts);
