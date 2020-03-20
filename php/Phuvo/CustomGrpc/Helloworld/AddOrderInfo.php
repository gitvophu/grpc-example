<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: helloworld.proto

namespace Phuvo\CustomGrpc\Helloworld;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>phuvo.customGrpc.helloworld.AddOrderInfo</code>
 */
class AddOrderInfo extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.AddOrderDetailInfo addOrderDetailInfo = 1;</code>
     */
    private $addOrderDetailInfo;
    /**
     * Generated from protobuf field <code>string note = 2;</code>
     */
    protected $note = '';
    /**
     * Generated from protobuf field <code>int32 status = 3;</code>
     */
    protected $status = 0;
    /**
     * Generated from protobuf field <code>string address = 4;</code>
     */
    protected $address = '';
    /**
     * Generated from protobuf field <code>string phone = 5;</code>
     */
    protected $phone = '';
    /**
     * Generated from protobuf field <code>int32 userId = 6;</code>
     */
    protected $userId = 0;
    /**
     * Generated from protobuf field <code>int32 total_price = 7;</code>
     */
    protected $total_price = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Phuvo\CustomGrpc\Helloworld\AddOrderDetailInfo[]|\Google\Protobuf\Internal\RepeatedField $addOrderDetailInfo
     *     @type string $note
     *     @type int $status
     *     @type string $address
     *     @type string $phone
     *     @type int $userId
     *     @type int $total_price
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Helloworld::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.AddOrderDetailInfo addOrderDetailInfo = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getAddOrderDetailInfo()
    {
        return $this->addOrderDetailInfo;
    }

    /**
     * Generated from protobuf field <code>repeated .phuvo.customGrpc.helloworld.AddOrderDetailInfo addOrderDetailInfo = 1;</code>
     * @param \Phuvo\CustomGrpc\Helloworld\AddOrderDetailInfo[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setAddOrderDetailInfo($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Phuvo\CustomGrpc\Helloworld\AddOrderDetailInfo::class);
        $this->addOrderDetailInfo = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string note = 2;</code>
     * @return string
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Generated from protobuf field <code>string note = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setNote($var)
    {
        GPBUtil::checkString($var, True);
        $this->note = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int32 status = 3;</code>
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Generated from protobuf field <code>int32 status = 3;</code>
     * @param int $var
     * @return $this
     */
    public function setStatus($var)
    {
        GPBUtil::checkInt32($var);
        $this->status = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string address = 4;</code>
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Generated from protobuf field <code>string address = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setAddress($var)
    {
        GPBUtil::checkString($var, True);
        $this->address = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string phone = 5;</code>
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Generated from protobuf field <code>string phone = 5;</code>
     * @param string $var
     * @return $this
     */
    public function setPhone($var)
    {
        GPBUtil::checkString($var, True);
        $this->phone = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int32 userId = 6;</code>
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Generated from protobuf field <code>int32 userId = 6;</code>
     * @param int $var
     * @return $this
     */
    public function setUserId($var)
    {
        GPBUtil::checkInt32($var);
        $this->userId = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int32 total_price = 7;</code>
     * @return int
     */
    public function getTotalPrice()
    {
        return $this->total_price;
    }

    /**
     * Generated from protobuf field <code>int32 total_price = 7;</code>
     * @param int $var
     * @return $this
     */
    public function setTotalPrice($var)
    {
        GPBUtil::checkInt32($var);
        $this->total_price = $var;

        return $this;
    }

}

