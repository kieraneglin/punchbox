class Admin::PagesController < ApplicationController
  before_action :set_admin_page, only: [:show, :edit, :update, :destroy]

  # GET /admin/pages
  def index
    @admin_pages = Admin::Page.all
  end

  # GET /admin/pages/1
  def show
  end

  # GET /admin/pages/new
  def new
    @admin_page = Admin::Page.new
  end

  # GET /admin/pages/1/edit
  def edit
  end

  # POST /admin/pages
  def create
    @admin_page = Admin::Page.new(admin_page_params)

    if @admin_page.save
      redirect_to @admin_page, notice: 'Page was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /admin/pages/1
  def update
    if @admin_page.update(admin_page_params)
      redirect_to @admin_page, notice: 'Page was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/pages/1
  def destroy
    @admin_page.destroy
    redirect_to admin_pages_url, notice: 'Page was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_page
      @admin_page = Admin::Page.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def admin_page_params
      params.require(:admin_page).permit(:title, :body)
    end
end
