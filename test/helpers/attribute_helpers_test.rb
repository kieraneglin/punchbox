require 'test_helper'

class PostsControllerTest < ActionController::TestCase
  test 'helper should return data attribute for controller' do
    get :index

    expected_attributes = 'data-punchbox-controller=posts data-punchbox-action=index'
    assert_equal expected_attributes, @controller.view_context.punchbox_attributes
  end
end
