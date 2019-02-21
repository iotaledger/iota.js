#!/bin/bash

out=bazel-bin/mobile/ios
pull=26
branch=iota-js-ios

if [ ! -d entangled ]; then
  git clone https://github.com/iotaledger/entangled && cd entangled && git fetch origin pull/$pull/head:$branch && git checkout $branch && git submodule update --init --recursive
else
  cd entangled

  if [ "$1" == "clean" ]; then
    bazel clean
  fi

  git fetch origin pull/$pull/head:$branch && git checkout $branch && git submodule update --recursive
fi

fetched=$?

if [ $fetched ]; then
  bazel build --ios_multi_cpus='i386,x86_64,armv7,arm64' --copt=-fembed-bitcode --copt=-Ofast //mobile/ios:ios_bindings && echo A | unzip $out/ios_bindings.zip -d $out/ios_bindings
fi
