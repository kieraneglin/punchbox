require 'punchbox/attribute_helper'

module Punchbox
  module Rails
    class Engine < ::Rails::Engine
      initializer 'attribute.helper' do
        ActionView::Base.send :include, AttributeHelper
      end
    end
  end
end
