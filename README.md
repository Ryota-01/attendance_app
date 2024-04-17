### ■アプリ名
JOBPLAT  

### ■主な機能
勤怠管理アプリとして、以下の機能を実装しております。  
・打刻  
・ユーザー作成   
・ログイン・ログアウト機能   
・出勤簿のPDF出力  
・休暇申請  

### ■技術選定
フロントエンド：React  
データベース：Cloud Firestore  
<img src="https://img.shields.io/badge/-react-61DAFB.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-reacthookform-EC5990.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-createreactapp-09D3AC.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-firebase-FFCA28.svg?logo=react&style=flat">

### 画面イメージ
<div width="{100px}">
  <img src="https://github.com/Ryota-01/attendance_app/assets/118597802/3e7133d9-485b-4ecf-bb85-436249487c0e" width="250">
  <p align="center">ホーム</p>
</div>
<div>
  <img src="https://github.com/Ryota-01/attendance_app/assets/118597802/505c9257-3a37-4d51-b1c6-c6c530143890" width="250">  
  <p>勤怠実績</p>
</div>
<div>
  <img src="https://github.com/Ryota-01/attendance_app/assets/118597802/041b75cd-5408-4130-a384-6c48bc1d83df" width="250">
  <p>休暇申請</p>
</div>
<div>
  <img src="https://github.com/Ryota-01/attendance_app/assets/118597802/e408d664-3ef9-4c1f-8058-f7a6484d0a0a" width="250">
  <p>PDF出力</p>
</div>

### ■開発背景
・勤怠に関する記録(打刻・休暇管理)を一元で管理したい。  
・Excelで勤怠管理をするのにかかる時間を短縮（現状手入力のため、正確な労働時間を管理できていない）  
・勤務先が小規模事業のため、システム導入にあまりリソースを割けないため自作しました。  

### ■アピールポイント
・MUIを使ってシンプルですがモダンな感じを意識しました。  
・Cloud Firestoreのリアルタイム同期の機能により、常に最新の勤怠情報を確認できます。  
・またiOSやAndroid端末からの打刻も可能。  

### ■今後の実装・改修予定
・TypeScriptの導入  
・カレンダーの祝日の表示  
・お知らせ機能画面の作成  
・休暇申請の管理者へのメール通知機能  
・経費申請などの機能追加  
・有休日数のカウント機能追加  
・管理者画面の作成（管理者画面からユーザー作成や管理をできるようにする）  
