source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby ">= 3.1"

# Exclude problematic versions of cocoapods and activesupport that causes build failures.
gem 'cocoapods', '>= 1.16.2'
# activesupport 7.1+ requires logger itself, so the old concurrent-ruby
# < 1.3.4 cap from the RN template is no longer needed (Dependabot alerts).
gem 'activesupport', '>= 7.2.3.1'
# xcodeproj is deliberately NOT capped at < 1.26.0 like the RN template:
# 1.28.1 is needed for the rexml security fixes (see #138).
gem 'concurrent-ruby', '>= 1.3.8'

# Ruby 3.4.0 has removed some libraries from the standard library.
gem 'bigdecimal'
gem 'logger'
gem 'benchmark'
gem 'mutex_m'
gem 'nkf'
