# iframe-merge-multi-site-example

複数サイト(CORS) を iframe を使って1サイトとして表示するトリックのサンプルアプリ

実行すると以下の2サイトが起動します

* 親サイト: [http://localhost:4000/](http://localhost:4000/)
* 子サイト: [http://localhost:5000/](http://localhost:5000/)

小サイトのページは親サイト内の iframe の中で表示されるサンプルアプリです。

[複数の管理画面を iframe で1つの統一されたサイトに見せるパターンのまとめ](https://tech.raksul.com/?p=2410) 
紹介されたパターンの動作確認用です。

以下の動作を確認することができます。

* iframeの高さpxの自動調整
* ページ遷移時のアドレスバー自動更新
* パーマリンクの挿げ替え
* 小サイトのヘッダ消し


## 起動方法

Download

    $ git clone git@github.com:nikushi/iframe-merge-multi-site-example.git
    
Install

    $ cd iframe-merge-multi-site-example/
    $ bundle install
    
Run 

    $ bundle exec foreman start
    
localhost ポート 4000, 5000 で親・子それぞれのサイトが起動します。    

* 親サイト: [http://localhost:4000/](http://localhost:4000/)
* 子サイト: [http://localhost:5000/](http://localhost:5000/)

それぞれブラウザでアクセスできることを確認してください。

## 確認

(http://localhost:5000/orders) が [親サイト上](http://localhost:4000/proxy?path=orders) で表示されていることを確認できます。 
例えば、小サイトの[注文一覧画面](http://localhost:5000/orders) が [親サイト上](http://localhost:4000/proxy?path=orders) で表示されていることを確認できます。 
