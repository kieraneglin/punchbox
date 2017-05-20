module AttributeHelper
  def punchbox_attributes
    "data-punchbox-controller=#{controller_path} " \
      "data-punchbox-action=#{action_name}"
  end
end
