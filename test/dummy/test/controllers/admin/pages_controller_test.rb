require 'test_helper'

class Admin::PagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_page = admin_pages(:one)
  end

  test "should get index" do
    get admin_pages_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_page_url
    assert_response :success
  end

  test "should create admin_page" do
    assert_difference('Admin::Page.count') do
      post admin_pages_url, params: { admin_page: { body: @admin_page.body, title: @admin_page.title } }
    end

    assert_redirected_to admin_page_url(Admin::Page.last)
  end

  test "should show admin_page" do
    get admin_page_url(@admin_page)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_page_url(@admin_page)
    assert_response :success
  end

  test "should update admin_page" do
    patch admin_page_url(@admin_page), params: { admin_page: { body: @admin_page.body, title: @admin_page.title } }
    assert_redirected_to admin_page_url(@admin_page)
  end

  test "should destroy admin_page" do
    assert_difference('Admin::Page.count', -1) do
      delete admin_page_url(@admin_page)
    end

    assert_redirected_to admin_pages_url
  end
end
