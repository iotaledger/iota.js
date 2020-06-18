#!/bin/bash

out=bazel-bin/mobile/ios
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
  bazel build --ios_multi_cpus='i386,x86_64,armv7,arm64' --copt=-fembed-bitcode --copt=-O3 //mobile/ios:ios_bindings && echo A | unzip $out/ios_bindings.zip -d $out/ios_bindings
fi
