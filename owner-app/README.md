# 카타르시스 예약 알림

결제가 완료된 예약을 매장 안드로이드 장치에서 확인하는 운영자용 앱입니다.

## 동작

- 최초 실행 시 운영 키와 장치 이름으로 한 번만 연결합니다.
- 운영 키는 저장하지 않으며 서버가 발급한 장치 토큰만 Android Keystore로 암호화해 보관합니다.
- Firebase Cloud Messaging으로 새 예약·취소 신호를 즉시 받고 인증된 서버에서 상세 내용을 동기화합니다.
- 푸시에는 고객명·전화번호·예약번호가 포함되지 않으며, 백그라운드 WorkManager와 30초 연결은 누락 복구용으로 작동합니다.
- 예약 이력은 SQLite에 저장되며 최신순 목록, 읽음 상태, 상세 정보와 예약번호 복사를 지원합니다.
- Android 13 이상에서는 처음 연결할 때 알림 권한을 요청합니다.

## Android Studio

- JDK 17
- Gradle 8.9
- Android SDK 35 및 Build Tools 35.0.0

`owner-app` 폴더를 프로젝트로 열고 Gradle 8.9를 선택한 뒤 `app` 구성을 실행합니다.

Firebase Android 앱의 공개 설정값은 다음 Gradle 속성 또는 환경변수로 전달합니다. 패키지명은 `kr.co.catharsis.owner`입니다.

- `OWNER_FIREBASE_APP_ID`
- `OWNER_FIREBASE_PROJECT_ID`
- `OWNER_FIREBASE_SENDER_ID`
- `OWNER_FIREBASE_API_KEY`

서버 서비스 계정의 개인키는 Android 프로젝트나 GitHub에 넣지 않습니다.

## 자동 빌드

`main` 브랜치의 `owner-app` 변경사항을 푸시하거나 GitHub Actions에서 `Build owner APK`를 실행하면 단위 테스트 후 `Catharsis-Owner-unsigned.apk`를 만듭니다. 결과 파일은 Actions 실행 화면의 `Catharsis-Owner-Unsigned-APK` artifact에서 받을 수 있습니다.

최종 설치 파일은 이 unsigned APK를 외부에 노출되지 않은 고정 keystore로 서명해 만듭니다. 이후 업데이트도 반드시 같은 keystore를 사용해야 합니다.
