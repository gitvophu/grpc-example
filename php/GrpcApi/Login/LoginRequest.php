<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: login.proto

namespace GrpcApi\Login;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>grpcApi.login.LoginRequest</code>
 */
class LoginRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>int32 user_id = 1;</code>
     */
    protected $user_id = 0;
    /**
     * Generated from protobuf field <code>string FLPNo = 2;</code>
     */
    protected $FLPNo = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int $user_id
     *     @type string $FLPNo
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Login::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>int32 user_id = 1;</code>
     * @return int
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Generated from protobuf field <code>int32 user_id = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setUserId($var)
    {
        GPBUtil::checkInt32($var);
        $this->user_id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string FLPNo = 2;</code>
     * @return string
     */
    public function getFLPNo()
    {
        return $this->FLPNo;
    }

    /**
     * Generated from protobuf field <code>string FLPNo = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setFLPNo($var)
    {
        GPBUtil::checkString($var, True);
        $this->FLPNo = $var;

        return $this;
    }

}

