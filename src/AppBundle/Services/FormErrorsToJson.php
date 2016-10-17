<?php

namespace AppBundle\Services;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class FormErrorsToJson
{
    private $errors = [];
    private $serializer;

    public function __construct()
    {
        $encoder = new JsonEncoder();
        $normalizer = new ObjectNormalizer();
        $this->serializer = new Serializer(array($normalizer), array($encoder));
    }

    public function getErrors($formErrors)
    {
        foreach ($formErrors as $error) {
            $this->errors[] = $error->getMessage();
        }

        return $this->serializer->serialize($this->errors, 'json');
    }
}
