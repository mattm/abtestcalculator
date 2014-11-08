require 'rack/coffee'
require 'sass/plugin/rack'
use Sass::Plugin::Rack

Sass::Plugin.options[:template_location] = './public/stylesheets/sass'
Sass::Plugin.options[:css_location] = './public/stylesheets/compiled'

use Rack::Coffee,
	:urls => '/js',
	:root => 'public',
	:join => 'all'

use Rack::Static,
	:urls => ["/images", "/js", "/stylesheets"],
	:root => "public"

run lambda { |env|
	[
		200,
		{
			'Content-Type'  => 'text/html',
			'Cache-Control' => 'public, max-age=86400'
		},
		File.open('public/index.html', File::RDONLY)
	]
}