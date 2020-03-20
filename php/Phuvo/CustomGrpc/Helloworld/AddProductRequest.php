<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: helloworld.proto

namespace Phuvo\CustomGrpc\Helloworld;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>phuvo.customGrpc.helloworld.AddProductRequest</code>
 */
class AddProductRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string id = 1;</code>
     */
    protected $id = '';
    /**
     * Generated from protobuf field <code>string name = 2;</code>
     */
    protected $name = '';
    /**
     * Generated from protobuf field <code>string price = 3;</code>
     */
    protected $price = '';
    /**
     * Generated from protobuf field <code>.phuvo.customGrpc.helloworld.FileUpload image = 4;</code>
     */
    protected $image = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $id
     *     @type string $name
     *     @type string $price
     *     @type \Phuvo\CustomGrpc\Helloworld\FileUpload $image
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Helloworld::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string id = 1;</code>
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Generated from protobuf field <code>string id = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setId($var)
    {
        GPBUtil::checkString($var, True);
        $this->id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string name = 2;</code>
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Generated from protobuf field <code>string name = 2;</code>
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
     * Generated from protobuf field <code>string price = 3;</code>
     * @return string
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Generated from protobuf field <code>string price = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setPrice($var)
    {
        GPBUtil::checkString($var, True);
        $this->price = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.phuvo.customGrpc.helloworld.FileUpload image = 4;</code>
     * @return \Phuvo\CustomGrpc\Helloworld\FileUpload
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Generated from protobuf field <code>.phuvo.customGrpc.helloworld.FileUpload image = 4;</code>
     * @param \Phuvo\CustomGrpc\Helloworld\FileUpload $var
     * @return $this
     */
    public function setImage($var)
    {
        GPBUtil::checkMessage($var, \Phuvo\CustomGrpc\Helloworld\FileUpload::class);
        $this->image = $var;

        return $this;
    }

}

