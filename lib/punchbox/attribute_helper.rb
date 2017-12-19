module AttributeHelper
  def punchbox_attributes
    "data-punchbox-controller=#{controller_path} " \
      "data-punchbox-action=#{action_name}"
  end

  def punchbox_data
    'data' => {
      'punchbox-controller' => controller_path,
      'punchbox-action' => action_name
    }
  end
end
