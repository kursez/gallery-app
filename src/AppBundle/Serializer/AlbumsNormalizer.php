<?php

namespace AppBundle\Serializer;

use AppBundle\Entity\Album;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Album normalizer
 */
class AlbumsNormalizer implements NormalizerInterface
{
  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = null, array $context = array())
  {
    return [
        'id'     => $object->getId(),
        'name'   => $object->getName()
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function supportsNormalization($data, $format = null)
  {
    return $data instanceof Album;
  }
}
