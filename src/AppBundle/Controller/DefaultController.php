<?php

namespace AppBundle\Controller;

use AppBundle\Document\User;
use DateTime;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppBundle::base.html.twig');

    }

    /**
     * @Route("/create-user")
     * @Method("POST")
     */
    public function createUserAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        try {
            $user = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:User')
                ->findOneBy(['email' => $request->request->get('email')]);
            if(is_null($user)){
                $user = new User();
                $user->setEmail($request->request->get('email'));
                $user->setBirthday($request->request->get('birthday'));
                $user->setPassword($request->request->get('password'));

                $dm = $this->get('doctrine_mongodb')->getManager();
                $dm->persist($user);
                $dm->flush();

                return new JsonResponse(['email' => $user->getEmail()]);
            } else {
                return new JsonResponse(['message' => 'Sorry, email already in use'], 409);
            }

        } catch (Exception $e){

            return new JsonResponse(['message' => $e], 500);
        }

    }
}
