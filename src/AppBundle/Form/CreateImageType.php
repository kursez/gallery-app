<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;


class CreateImageType extends AbstractType
{
  /**
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder->add('name', "text", ['constraints' =>
        [
            new NotBlank(['message' => 'Name cannot be empty']),
            new Length([
                'min' => 2,
                'minMessage' => 'Name must have more than 2 characters',
                'max' => 250,
                'maxMessage' => 'Name must have no more than 250 characters'
            ])
        ]])
    ->add('album', EntityType::class, [
        'class' => 'AppBundle:Album',
        'constraints' =>
        [
            new NotBlank(['message' => 'Album id cannot be empty']),
        ]])
    ->add('src',  FileType::class, ['constraints' =>
      [
          new NotBlank(['message' => 'File cannot be empty']),
      ]]);
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
        'data_class'      => 'AppBundle\Entity\Image',
        'csrf_protection' => false
    ));
  }

  public function getName()
  {
    return 'create_image';
  }
}