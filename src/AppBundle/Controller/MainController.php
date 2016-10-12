<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Form\Extension\HttpFoundation\HttpFoundationExtension;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use AppBundle\Entity\Image;
use AppBundle\Entity\Album;
use AppBundle\Repository\ImageRepository;
use AppBundle\Repository\AlbumRepository;

class MainController extends Controller
{
    /**
     * @Route("/", name="gallery")
     */
    public function indexAction(Request $request)
    {
        return $this->render('index.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/images", name="getImages", condition="request.isXmlHttpRequest()")
     * @Method({"GET"})
     */
    public function getImagesAction()
    {
        $normalizer = $this->get('app.image_normalizer');
        $encoder = new JsonEncoder();
        $serializer = new Serializer(array($normalizer), array($encoder));

        $images = $this->getDoctrine()
            ->getRepository('AppBundle:Image')
            ->findAll();

        $json = $serializer->serialize($images, 'json');

        return new JsonResponse($json);
    }

    /**
     * @Route("/image/{id}", name="getImage", condition="request.isXmlHttpRequest()")
     * @Method({"GET"})
     */
    public function getImageAction($id)
    {
        $normalizer = $this->get('app.image_normalizer');
        $encoder = new JsonEncoder();
        $serializer = new Serializer(array($normalizer), array($encoder));

        $image = $this->getDoctrine()
            ->getRepository('AppBundle:Image')
            ->findOneById($id);

        if ($image !== null) {
            return new JsonResponse($serializer->serialize($image, 'json'));
        } else {
            return new JsonResponse('No album with id: ' . $id, 400);
        }
    }

    /**
     * @Route("/image", name="postImage", condition="request.isXmlHttpRequest()")
     * @Method({"POST"})
     */
    public function postImageAction()
    {
        $request = $this->get('request');

        $albumId = $request->request->get('album');
        $name = $request->request->get('name');
        $file = $request->files->get('file');

//        var_dump($albumId);
//        var_dump($name);
//        var_dump($file);

        if ($name !== null && $albumId !== null && $file !== null && strlen($name) > 0 && strlen($albumId) > 0) {
            $album = $this->getDoctrine()
                ->getRepository('AppBundle:Album')
                ->findOneById($albumId);

            if ($album !== null ) {
                $image = new Image();

                $uploader = $this->get('app.image_uploader');
                $fileName = $uploader->upload($file);

                $image->setName($name);
                $image->setAlbum($album);
                $image->setSrc($uploader->getFolder() . '/' . $fileName);

                $em = $this->getDoctrine()->getManager();
                $em->persist($image);
                $em->flush();

                $normalizer = $this->get('app.image_normalizer');
                $encoder = new JsonEncoder();
                $serializer = new Serializer(array($normalizer), array($encoder));

                return new JsonResponse($serializer->serialize($image, 'json'));
            }
        }

        return new JsonResponse(($file == null) ? 'OXI LEME' : 'NAI', 400);
    }

    /**
     * @Route("/image/{id}", name="putImage", condition="request.isXmlHttpRequest()")
     * @Method({"PUT"})
     */
    public function putImageAction($id)
    {
        $normalizer = $this->get('app.image_normalizer');
        $encoder = new JsonEncoder();
        $serializer = new Serializer(array($normalizer), array($encoder));

        $name = $this->get('request')->request->get('name');

        $image = $this->getDoctrine()
            ->getRepository('AppBundle:Image')
            ->findOneById($id);

        $image->setName($name);
        $em = $this->getDoctrine()->getManager();
        $em->persist($image);
        $em->flush();

        $json = $serializer->serialize($image, 'json');

        return new JsonResponse($json);
    }

    /**
     * @Route("/image/{id}", name="deleteImage", condition="request.isXmlHttpRequest()")
     * @Method({"DELETE"})
     */
    public function deleteImageAction($id)
    {
        $image = $this->getDoctrine()
            ->getRepository('AppBundle:Image')
            ->findOneById($id);

        if ($image !== null) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($image);
            $em->flush();

            return new JsonResponse('Image with id: '. $id . ' successfully deleted');

        } else {
            return new JsonResponse('No image with id: ' . $id, 400);
        }
    }

    /**
     * @Route("/albums", name="getAlbums", condition="request.isXmlHttpRequest()")
     * @Method({"GET"})
     */
    public function getAlbumsAction()
    {
        $normalizer = $this->get('app.albums_normalizer');
        $encoder = new JsonEncoder();
        $serializer = new Serializer(array($normalizer), array($encoder));

        $albums = $this->getDoctrine()
            ->getRepository('AppBundle:Album')
            ->findAll();

        return new JsonResponse($serializer->serialize($albums, 'json'));
    }

    /**
     * @Route("/album/{id}", name="getAlbum", condition="request.isXmlHttpRequest()")
     * @Method({"GET"})
     */
    public function getAlbumAction($id)
    {
        $album = $this->getDoctrine()->getRepository('AppBundle:Album')->findOneById($id);

        if ($album !== null) {
            $normalizer = $this->get('app.album_normalizer');
            $encoder = new JsonEncoder();
            $serializer = new Serializer(array($normalizer), array($encoder));

            return new JsonResponse($serializer->serialize($album, 'json'));
        } else {
            return new JsonResponse('No album with id: ' . $id, 400);
        }
    }

    /**
     * @Route("/album", name="postAlbum", condition="request.isXmlHttpRequest()")
     * @Method({"POST"})
     */
    public function postAlbumAction()
    {
        $name = $this->get('request')->request->get('name');

        if ($name !== null && strlen($name) > 0) {
            $em = $this->getDoctrine()->getManager();
            $album = new Album();
            $album->setName($name);
            $em->persist($album);
            $em->flush();

            $normalizer = $this->get('app.albums_normalizer');
            $encoder = new JsonEncoder();
            $serializer = new Serializer(array($normalizer), array($encoder));

            return new JsonResponse($serializer->serialize($album, 'json'));

        } else {
            return new JsonResponse('Name cannot be empty', 400);
        }
    }

    /**
     * @Route("/album/{id}", name="putAlbum", condition="request.isXmlHttpRequest()")
     * @Method({"PUT"})
     */
    public function putAlbumAction($id)
    {
        $name = $this->get('request')->request->get('name');

        if ($name !== null && strlen($name) > 0) {
            $album = $this->getDoctrine()
                ->getRepository('AppBundle:Album')
                ->findOneById($id);

            $album->setName($name);
            $em = $this->getDoctrine()->getManager();
            $em->persist($album);
            $em->flush();

            $normalizer = $this->get('app.albums_normalizer');
            $encoder = new JsonEncoder();
            $serializer = new Serializer(array($normalizer), array($encoder));

            return new JsonResponse($serializer->serialize($album, 'json'));

        } else {
            return new JsonResponse('Name cannot be empty', 400);
        }
    }

    /**
     * @Route("/album/{id}", name="deleteAlbum", condition="request.isXmlHttpRequest()")
     * @Method({"DELETE"})
     */
    public function deleteAlbumAction($id)
    {
        $album = $this->getDoctrine()
            ->getRepository('AppBundle:Album')
            ->findOneById($id);

        if ($album) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($album);
            $em->flush();

            return new JsonResponse('Album with id: '. $id . ' successfully deleted');

        } else {
            return new JsonResponse('No album with id: ' . $id, 400);
        }
    }
}
