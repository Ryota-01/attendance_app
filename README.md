### WHAT
勤怠管理系アプリ  
・打刻  
・ユーザー作成   
・ログイン・ログアウト機能   
・出勤簿のPDF出力  
・休暇申請  
  
フロントエンド：React  
データベース：firestore  
<img src="https://img.shields.io/badge/-react-61DAFB.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-reacthookform-EC5990.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-createreactapp-09D3AC.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-firebase-FFCA28.svg?logo=react&style=flat">

### WHY
・勤怠に関する記録(打刻・休暇管理)を一元で管理したい。 
・エクセルで勤怠管理をするのにかかる時間を短縮（現状手入力のため、正確な労働時間を管理できていない）  
・勤務先が小規模事業のため、システム導入にあまりリソースを割けないため自作しました。  

### APPEAL
・MUIを使ってシンプルですがモダンな感じを意識しました。  

### TECH
Cloud Firestoreのリアルタイム同期の機能により、常に最新の勤怠情報を確認できます。  
またiosやAndroid端末からの打刻も可能。

### FUTURE
・Typescriptの導入  
・経費申請などの機能追加  
・有休日数のカウント機能追加  
・管理者画面の作成（管理者画面からユーザー作成や管理をできるようにする）  