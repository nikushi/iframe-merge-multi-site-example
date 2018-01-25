# iframe-merge-multi-site-example

複数サイト(CORS) を iframe を使って1サイトとして表示するトリックのサンプルアプリ

ref [複数の管理画面を iframe を使って1つにマージするときのパターンまとめ](https://tech.raksul.com/?p=2410)

親サイト: http://localhost:4000/
子サイト: http://localhost:5000/

の2サイトがあり、小サイトのページを親サイト側に埋め込んで表示する例となっています。

## 動かし方

Download

    $ git clone git@github.com:nikushi/iframe-merge-multi-site-example.git
    
Install

    $ cd iframe-merge-multi-site-example/
    $ bundle install
    
Run 

    $ bundle exec foreman start
    
localhost ポート 4000, 5000 で親・子それぞれのサイトが起動します。    

## 確認

例えば、小サイトの[注文一覧画面](http://localhost:5000/orders) が [親サイト上](http://localhost:4000/proxy?path=orders) で表示されていることを確認できます。 
