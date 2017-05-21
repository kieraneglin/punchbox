PostsClass = {
  controller: function() {
    document.getElementById('container').append('Posts Controller Punchbox Test');
  },

  index: function() {
    document.getElementById('container').append('Posts Index Punchbox Test');
  }
};

Punchbox.on('Posts', PostsClass);
