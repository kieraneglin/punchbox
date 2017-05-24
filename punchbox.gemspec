$:.push File.expand_path('../lib', __FILE__)

require 'punchbox/version'

Gem::Specification.new do |s|
  s.name        = 'punchbox'
  s.version     = Punchbox::VERSION
  s.authors     = ['Kieran Eglin']
  s.email       = ['kieran.eglin@gmail.com']
  s.homepage    = 'https://github.com/kieraneglin/punchbox'
  s.summary     = 'Dead simple page-specific Javascript for Rails'
  s.description = 'Defining page-specific Javascript shouldn\'t be hard.  That\'s what Punchbox is looking to fix'
  s.license     = 'MIT'
  s.required_ruby_version = '>= 1.9.3'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 4.0.0'

  s.add_development_dependency 'sqlite3'
end
