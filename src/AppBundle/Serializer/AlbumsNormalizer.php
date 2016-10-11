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
    $images = $object->getImages();

    return [
        'id'     => $object->getId(),
        'name'   => $object->getName(),
        'imageCount' => sizeof($images),
        'featuredImage' => (sizeof($images) > 0) ? $images[0]->getSrc() : null
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
