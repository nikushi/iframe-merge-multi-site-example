require 'sinatra'
require 'sinatra/reloader'

CHILD_URL = 'http://localhost:5000'

# disable cache for development environment
configure do
  set :static_cache_control, [:public, :no_cache]
end

get '/' do
  erb :top
end

get '/proxy' do
  path = params[:path] || ''
  src = CHILD_URL + '/' + path
  erb :proxy, locals: { src: src }
end
