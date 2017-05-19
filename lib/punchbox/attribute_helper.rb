module AttributeHelper
  def punchbox_attributes
    "data-punchbox-controller=#{controller_name} " \
      "data-punchbox-action=#{action_name}"
  end
end
