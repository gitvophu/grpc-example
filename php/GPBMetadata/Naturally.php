<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: naturally.proto

namespace GPBMetadata;

class Naturally
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Login::initOnce();
        $pool->internalAddGeneratedFile(hex2bin(
            "0ab0010a0f6e61747572616c6c792e70726f746f12076772706341706932" .
            "540a0c4e61747572616c6c7941706912440a054c6f67696e121b2e677270" .
            "634170692e6c6f67696e2e4c6f67696e526571756573741a1c2e67727063" .
            "4170692e6c6f67696e2e4c6f67696e526573706f6e7365220042360a1b69" .
            "6f2e677270632e6578616d706c65732e68656c6c6f776f726c64420f4865" .
            "6c6c6f576f726c6450726f746f5001a20203484c57620670726f746f33"
        ), true);

        static::$is_initialized = true;
    }
}
