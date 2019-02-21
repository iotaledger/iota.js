#!/bin/bash

out=bazel-bin/mobile/android
entangled_branch=develop

if [ ! -d entangled ]; then
  git clone https://github.com/iotaledger/entangled && cd entangled && git submodule update --init --recursive
else
  cd entangled

  if [ "$1" == "clean" ]; then
    bazel clean
  fi

  git fetch origin $entangled_branch:latest && git checkout latest && git submodule update --recursive
fi

fetched=$?

if [ $fetched ]; then
  # Checkout to previous version as temporary workaround
  git checkout 3c2eb5cd39b7b591d7389432229ec25e2a4dd167

  bazel build -c opt --fat_apk_cpu='armeabi-v7a,arm64-v8a,x86,x86_64' //mobile/android:dummy && echo A | unzip $out/dummy.apk -d $out/dummy && cp -r $out/dummy/lib/ ../android/src/main/jniLibs
fi
