<?php

namespace AppBundle\Services;

class FormErrorsToJson
{
  private $errors = [];

  public function getErrors($formErrors) {
    foreach($formErrors as $error) {
      $this->errors[] = $error->getMessage();
    }

    return json_encode($this->errors);
  }
}
