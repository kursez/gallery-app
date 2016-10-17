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
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/images", name="getImages")
     * @Method({"GET"})
     */
    public function getImagesAction(Request $request)
    {
        $images = $this->getDoctrine()
            ->getRepository('AppBundle:Image')
            ->findAll();

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $images,
            $request->query->getInt('page', 1),
            $request->query->getInt('limit', 10)
        );

        return new JsonResponse($this->get('app.image_serializer')->serialize($pagination->getItems()));
    }

    /**
     * @Route("/image/{id}", name="getImage")
     * @Method({"GET"})
     */
    public function getImageAction(Image $image)
    {
        return new JsonResponse($this->get('app.image_serializer')->serialize($image));
    }

    /**
     * @Route("/image", name="postImage")
     * @Method({"POST"})
     */
    public function postImageAction(Request $request)
    {
        $image = new Image();
        $form = $this->createForm($this->get('app.create_image_type'), $image);
        $form->submit($request);

        if ($form->isValid()) {
            $uploader = $this->get('app.image_uploader');
            $fileName = $uploader->upload($form->get('src')->getData());

            $image->setSrc($uploader->getFolder() . '/' . $fileName);

            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();

            return new JsonResponse($this->get('app.image_serializer')->serialize($image));
        }

        return new JsonResponse($this->get('app.form_errors_to_json')->getErrors($form->getErrors(true)), 400);
    }

    /**
     * @Route("/image/{id}", name="putImage")
     * @Method({"PUT"})
     */
    public function putImageAction(Image $image, Request $request)
    {
        $form = $this->createForm($this->get('app.edit_image_type'), $image);
        $form = $form->submit($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($image);
            $em->flush();

            return new JsonResponse($this->get('app.image_serializer')->serialize($image));
        } else {
            return new JsonResponse($this->get('app.form_errors_to_json')->getErrors($form->getErrors(true)), 400);
        }
    }

    /**
     * @Route("/image/{id}", name="deleteImage")
     * @Method({"DELETE"})
     */
    public function deleteImageAction(Image $image)
    {
        $id = $image->getId();
        $em = $this->getDoctrine()->getManager();
        $em->remove($image);
        $em->flush();

        return new JsonResponse('Image with id: ' . $id . ' successfully deleted');
    }

    /**
     * @Route("/albums", name="getAlbums")
     * @Method({"GET"})
     */
    public function getAlbumsAction()
    {
        $albums = $this->getDoctrine()
            ->getRepository('AppBundle:Album')
            ->findAll();

        return new JsonResponse($this->get('app.albums_serializer')->serialize($albums));
    }

    /**
     * @Route("/album/{id}", name="getAlbum")
     * @Method({"GET"})
     */
    public function getAlbumAction(Album $album, Request $request)
    {
        return new JsonResponse($this->get('app.album_serializer')->serialize($album));
    }

    /**
     * @Route("/album/{id}/page/{page}", name="getAlbumPage")
     * @Method({"GET"})
     */
    public function getAlbumPageAction(Album $album, $page, Request $request)
    {
        $images = $album->getImages();

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $images,
            $request->query->getInt('page', $page),
            $request->query->getInt('limit', 10)
        );

        $pageCount = ceil($pagination->getTotalItemCount() / 10);

        $album->pageImages = $pagination->getItems();
        $json = $this->get('app.album_page_serializer')->serialize([$album, $pageCount]);

        return new JsonResponse($json);
    }

    /**
     * @Route("/album", name="postAlbum")
     * @Method({"POST"})
     */
    public function postAlbumAction(Request $request)
    {
        $album = new Album();
        $form = $this->createForm($this->get('app.create_album_type'), $album);
        $form = $form->submit($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($album);
            $em->flush();

            return new JsonResponse($this->get('app.albums_serializer')->serialize($album));
        } else {
            return new JsonResponse($this->get('app.form_errors_to_json')->getErrors($form->getErrors(true)), 400);
        }
    }

    /**
     * @Route("/album/{id}", name="putAlbum")
     * @Method({"PUT"})
     */
    public function putAlbumAction(Album $album, Request $request)
    {
        $form = $this->createForm($this->get('app.create_album_type'), $album);
        $form = $form->submit($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($album);
            $em->flush();

            return new JsonResponse($this->get('app.albums_serializer')->serialize($album));

        } else {
            return new JsonResponse('Name cannot be empty', 400);
        }
    }

    /**
     * @Route("/album/{id}", name="deleteAlbum")
     * @Method({"DELETE"})
     */
    public function deleteAlbumAction(Album $album)
    {
        $id = $album->getId();
        $em = $this->getDoctrine()->getManager();
        $images = $album->getImages();

        foreach ($images as $image) {
            $em->remove($image);
        }
        $em->remove($album);
        $em->flush();

        return new JsonResponse('Album with id: ' . $id . ' successfully deleted');
    }
}
