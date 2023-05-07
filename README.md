# Rely - Patient-App
A tele consultation platform where patients can have a video consultation with the doctor
This project is a part of Healthcare Application Development Course in IIIT Bangalore taken in Jan - May 2023 

Generate APK


npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android && ./gradlew assembleDebug

