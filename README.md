[![Build Status](https://travis-ci.org/af-fujimoto/matsushima.svg?branch=develop)](https://travis-ci.org/af-fujimoto/matsushima)

# Webでオセロするヤーツ

教材用にざかざか作った奴。  
とりあえずフレームワークなどは使わず、ごりごり実装したものを一旦共有します。

使用しているライブラリはjQueryのみ。

HTML, SCSS, TypeScriptで実装したものをWebpackで纏めてます。


## 開発時環境

最低限、以下だけインストールすればいけるはず。

[node](https://nodejs.org/)  
`node version v12.9.1`

[ruby](https://www.ruby-lang.org/)  
`ruby version 2.6.0`

Node.jsとRubyをインストールしたら、このリポジトリをクローンしたローカルディレクトリで下記コマンドを実行してください。

`npm init`

多分、諸々インストールしていくと思うんで、終了するまで少々お待ちください。（Warningが出ると思いますが、一旦は気にしなくていいです）  
初期化が終了したら、次に以下のコマンドを実行してください。

`npm ruhn start`

これで開発サーバが立ち上がって、コンパイル結果を確認できるようになります。  
CLIに表示されているURL（他と衝突していなければ、 `http://localhost:8080/`）にアクセスすれば実際の表示が確認できます。

`src/`配下のファイルを編集後保存した結果、CLIで再コンパイルが行われれば問題ないはずです。  
ざかざかファイルを弄るなり、改修するなりして遊んでください。


## faq

_Q. Node、Rubyがないって言われる_  
A. 環境変数に設定して、CLI再起動して


_Q. ビルドに失敗する_  
A. `npm run clean`を実行して、各種モジュールを再インストールしてから、再度ビルドしてみてください。