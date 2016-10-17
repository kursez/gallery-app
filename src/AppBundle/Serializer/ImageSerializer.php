<?php

namespace AppBundle\Serializer;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

/**
 * Image serializer
 */
class ImageSerializer
{
    private $normalizer;

    public function __construct($normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function serialize($obj)
    {
        $encoder = new JsonEncoder();
        $serializer = new Serializer(array($this->normalizer), array($encoder));

        return $serializer->serialize($obj, 'json');
    }
}
