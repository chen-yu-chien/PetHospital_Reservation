# PetHospital_Reservation
## 開發環境使用
* 前端：Eclipse
* 後端：VSCode
## 專案啟動
* 後端
1. 開啟 Eclipse 後，從檔案系統匯入 Gradle 專案
> [!WARNING]
> 匯入時須進入到放有 src 資料夾的目錄層
2. 執行 /src/main/java/VethospitalApplication.java
   
* 前端   
1. 進入專案根目錄，開啟 cmd，執行指令啟動前端專案
   ````shell
    npm run dev
   ````
2. 到步驟 1 建立的捷徑輸入 cmd 顯示的 url 開啟網站

* 資料庫
1. 開啟瀏覽器後，輸入 localhost:8080/h2-console
2. 登入介面開啟後，修改 JDBC URL 欄位為 jdbc:h2:mem:testdb
   
