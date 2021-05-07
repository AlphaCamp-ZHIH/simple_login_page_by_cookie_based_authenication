# 登入系統
使用node.js、express、express-handlebars、body-parser和cookie-parser所做的信箱與密碼驗證網站，cookie有經過signed處理。

## 環境建置與需求
node.js v10.15.0 -執行環境  
express v4.17.1 -框架 (framework)  
express-handlebars v5.3.0 -模板引擎(template engine)  
body-parser v1.19.0 -中介軟體(middleware)  
express-session v^1.17.1 -中介軟體(middleware)  
安裝與使用
## 下載專案
git clone https://github.com/zhihdd/simple_login_page_by_cookie_based_authenication.git
## 安裝package
npm install
## 使用nodemon啟動伺服器
node app.js
## 功能
根據已設定好的使用者信箱與密碼，可進入使用者的頁面  
若信箱輸入錯誤，會出現'account don't exist'之提示
若密碼輸入錯誤，會出現'your password is wrong"'之提示    
登入之後點擊log out，可回到登入頁面  
若沒有登出，下次進入頁面時會回到使用者的頁面  
## 測試的使用者帳號 
firstName：Tony / email：tony@stark.com / password：iamironman  
firstName：Steve / email：captain@hotmail.com / password：icandothisallday  
firstName: Peter / email：peter@parker.com / password：enajyram  
firstName：Natasha / email：natasha@gamil.com / password：*parol#@$!  
firstName：Nick / email：nick@shield.com / password：password  
