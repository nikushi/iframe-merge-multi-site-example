require 'sinatra'

# iframe内でレンダリングできるよう X-Frame-Options を消す
set :protection, :except => :frame_options

ORDERS = [
  { id: 1, product: 'フライヤー', price: 10000, username: 'ラクスル太郎' },
	{ id: 2, product: '名刺', price: 30000, username: 'ラクスル太郎' },
	{ id: 3, product: 'ポスター', price: 50000, username: 'ラクスル太郎' },
]

get '/' do
	erb :top
end

get '/orders' do
	erb :orders, locals: { orders: ORDERS }
end

get '/orders/:id' do
	order = ORDERS.find { |order| order[:id] == params['id'].to_i }
	erb :order, locals: { order: order }
end
