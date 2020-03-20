<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: helloworld.proto

namespace Phuvo\CustomGrpc\Helloworld;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>phuvo.customGrpc.helloworld.FileUpload</code>
 */
class FileUpload extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string name = 1;</code>
     */
    protected $name = '';
    /**
     * Generated from protobuf field <code>string extension = 2;</code>
     */
    protected $extension = '';
    /**
     * Generated from protobuf field <code>bytes base64 = 3;</code>
     */
    protected $base64 = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $name
     *     @type string $extension
     *     @type string $base64
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Helloworld::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string name = 1;</code>
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Generated from protobuf field <code>string name = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setName($var)
    {
        GPBUtil::checkString($var, True);
        $this->name = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string extension = 2;</code>
     * @return string
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * Generated from protobuf field <code>string extension = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setExtension($var)
    {
        GPBUtil::checkString($var, True);
        $this->extension = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>bytes base64 = 3;</code>
     * @return string
     */
    public function getBase64()
    {
        return $this->base64;
    }

    /**
     * Generated from protobuf field <code>bytes base64 = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setBase64($var)
    {
        GPBUtil::checkString($var, False);
        $this->base64 = $var;

        return $this;
    }

}

