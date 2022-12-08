# 
web view 4.2.1
<!-- if you give permmision of system top edit project -->
sudo chown -R YourUsername .
<!-- //to make android gradle build  -->
cd platforms/android

<!-- Make local.properties file in platform/android folder -->
than write this "sdk.dir=/Users/{{USERNAME}}/Library/Android/sdk

./gradlew bundle   
<!-- gradle bundle -->
 <!-- If getting err in gradle build than  -->
1)change the gradle (com.android.tools.build:gradle:3.4.2'}) to 3.4.2 in build.gradle file
2)change gradle
distributionUrl=https\://services.gradle.org/distributions/gradle-5.5.1-all.zip
 with 5.5.1

<!-- After complete -->
cd ../../

 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/bundle/release/app-release.aab elitelife
 password: elitelife

 <!-- for ios in case reject build  -->
 update plugin version from pod file.
	pod 'Firebase/Analytics', '~> 6.25.0'
	pod 'OneSignal', '2.12.0'