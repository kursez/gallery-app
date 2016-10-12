<?php

namespace AppBundle\Serializer;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

/**
 * Album serializer
 */
class AlbumSerializer
{
  private $normalizer;

  private function __construct($normalizer) {
    $this->normalizer = $normalizer;
  }

  public function serialize($obj) {
    $encoder = new JsonEncoder();
    $serializer = new Serializer(array($this->normalizer), array($encoder));

    return $serializer->serialize($obj, 'json');
  }
}
