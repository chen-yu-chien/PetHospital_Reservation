# PetHospital_Reservation
## 開發環境使用
* 前端：Eclipse
* 後端：VSCode
## 專案啟動
* 後端
1. 開啟 Eclipse 後，從檔案系統匯入 Gradle 專案
   > [!WARNING]
   > 匯入時須進入到放有 bin 資料夾的目錄層
2. 執行 /src/main/java/VethospitalApplication.java
   
* 前端
1. 建立一個 Chrome 捷徑（避開 CORS 問題）

        1. 找到 Chrome 原始檔案，點選右鍵建立捷徑
        2. 開啟捷徑檔案內容，設定目標為 "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
        3. 點選確認儲存
   
2. 進入專案根目錄，開啟 cmd，執行指令啟動前端專案
   ````shell
    npm run dev
   ````
3. 到步驟 1 建立的捷徑輸入 cmd 顯示的 url 開啟網站

* 資料庫
1. 開啟瀏覽器後，輸入 localhost:8080/h2-console
2. 登入介面開啟後，修改 JDBC URL 欄位為 jdbc:h2:mem:testdb
   
