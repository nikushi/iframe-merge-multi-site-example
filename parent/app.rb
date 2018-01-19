require 'sinatra'

CHILD_URL = 'http://localhost:5000'

get '/' do
	erb :top
end

get '/proxy' do
	path = params[:path] || ''
  src = CHILD_URL + '/' + path
	erb :proxy, locals: { src: src }
end
