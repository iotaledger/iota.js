#!/bin/bash

out=bazel-bin/mobile/android
branch=master

if [ ! -d iota_common ]; then
  git clone https://github.com/iotaledger/iota_common && cd iota_common && git submodule update --init --recursive
else
  cd iota_common
  
  if [ "$1" == "clean" ]; then
    bazel clean
  fi

  git fetch origin $branch:latest && git checkout latest && git submodule update --recursive
fi

fetched=$?

if [ $fetched ]; then
  bazel build -c opt --fat_apk_cpu='armeabi-v7a,arm64-v8a,x86,x86_64' //mobile/android:dummy && echo A | unzip $out/dummy.apk -d $out/dummy && cp -r $out/dummy/lib/ ../android/src/main/jniLibs
fi
