<?php

namespace AppBundle\Serializer;

use AppBundle\Entity\Image;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Image normalizer
 */
class ImageNormalizer implements NormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id' => $object->getId(),
            'name' => $object->getName(),
            'src' => $object->getSrc(),
            'album' => [
                'id' => ($object->getAlbum()) ? $object->getAlbum()->getId() : null,
                'name' => ($object->getAlbum()) ? $object->getAlbum()->getName() : null,
            ]
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Image;
    }
}