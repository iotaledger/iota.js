#!/bin/bash

out=bazel-bin/mobile/android 

if [ ! -d entangled ]; then
  git clone https://github.com/iotaledger/entangled && cd entangled && git submodule update --init --recursive
else
  cd entangled
  
  if [ "$1" == "clean" ]; then
    bazel clean
  fi

  cleaned=$?
  
  if [ $cleaned ]; then
    git pull https://github.com/iotaledger/entangled && git submodule update --recursive
  fi
fi

fetched=$?

if [ $fetched ]; then
  bazel build -c opt --fat_apk_cpu='armeabi-v7a,arm64-v8a,x86,x86_64' //mobile/android:dummy && echo A | unzip $out/dummy.apk -d $out/dummy && cp -r $out/dummy/lib/ ../android/src/main/jniLibs
fi
