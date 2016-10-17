<?php

namespace AppBundle\Serializer;

use AppBundle\Entity\Album;
use AppBundle\Entity\Image;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Album page normalizer
 */
class AlbumPageNormalizer implements NormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id' => $object->getId(),
            'name' => $object->getName(),
            'images' => array_map(
                function (Image $image) {
                    return [
                        'id' => $image->getId(),
                        'name' => $image->getName(),
                        'src' => $image->getSrc()
                    ];
                },
                $object->pageImages
            )
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
