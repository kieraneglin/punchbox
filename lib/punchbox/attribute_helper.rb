module AttributeHelper
  def punchbox_attributes
    "data-punchbox-controller=#{controller_path} " \
      "data-punchbox-action=#{action_name}"
  end

  def punchbox_data
    {
      punchbox_controller: controller_path,
      punchbox_action: action_name
    }
  end
end
