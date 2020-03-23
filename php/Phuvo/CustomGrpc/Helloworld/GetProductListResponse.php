<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: helloworld.proto

namespace Phuvo\CustomGrpc\Helloworld;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>phuvo.customGrpc.helloworld.GetProductListResponse</code>
 */
class GetProductListResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string message = 1;</code>
     */
    protected $message = '';
    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.Product products = 2;</code>
     */
    private $products;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $message
     *     @type \Phuvo\CustomGrpc\Helloworld\Product[]|\Google\Protobuf\Internal\RepeatedField $products
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Helloworld::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string message = 1;</code>
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Generated from protobuf field <code>string message = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setMessage($var)
    {
        GPBUtil::checkString($var, True);
        $this->message = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.Product products = 2;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.Product products = 2;</code>
     * @param \Phuvo\CustomGrpc\Helloworld\Product[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setProducts($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Phuvo\CustomGrpc\Helloworld\Product::class);
        $this->products = $arr;

        return $this;
    }

}
