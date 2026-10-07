<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UtilisateurRepository $utilisateurRepo
    ) {}

    #[Route('/auth', name: 'auth', methods: ['GET', 'POST'])]
    public function auth(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            $mode = $request->request->get('mode');
            
            if ($mode === 'connexion') {
                return $this->handleConnexion($request);
            } elseif ($mode === 'inscription') {
                return $this->handleInscription($request);
            }
        }
        
        return $this->render('auth/auth.html.twig');
    }

    private function handleConnexion(Request $request): Response
    {
        $email = $request->request->get('email');
        $motDePasse = $request->request->get('mot_de_passe');
        
        $utilisateur = $this->utilisateurRepo->findOneBy(['email' => $email]);
        
        if ($utilisateur && password_verify($motDePasse, $utilisateur->getMotDePasse())) {
            $request->getSession()->set('user_connected', [
                'id_user' => $utilisateur->getIdUser(),
                'email' => $utilisateur->getEmail(),
                'pseudo' => $utilisateur->getPseudo()
            ]);
            $this->addFlash('success', 'Bienvenue ' . $utilisateur->getPseudo());
            return $this->redirectToRoute('accueil');
        }
        
        $this->addFlash('error', 'Email ou mot de passe incorrect');
        return $this->redirectToRoute('auth');
    }

    private function handleInscription(Request $request): Response
    {
        $email = $request->request->get('email');
        $pseudo = $request->request->get('pseudo');
        $motDePasse = $request->request->get('mot_de_passe');
        $confirmMdp = $request->request->get('confirmer_mot_de_passe');
        
        if ($motDePasse !== $confirmMdp) {
            $this->addFlash('error', 'Les mots de passe ne correspondent pas');
            return $this->redirectToRoute('auth');
        }
        
        if ($this->utilisateurRepo->findOneBy(['email' => $email])) {
            $this->addFlash('error', 'Cet email est déjà utilisé');
            return $this->redirectToRoute('auth');
        }
        
        $utilisateur = new Utilisateur();
        $utilisateur->setEmail($email);
        $utilisateur->setPseudo($pseudo);
        $utilisateur->setMotDePasse(password_hash($motDePasse, PASSWORD_DEFAULT));
        
        $maxId = $this->em->createQuery('SELECT MAX(u.idUser) FROM App\Entity\Utilisateur u')->getSingleScalarResult();
        $utilisateur->setIdUser(($maxId ?? 0) + 1);
        
        $this->em->persist($utilisateur);
        $this->em->flush();
        
        $request->getSession()->set('user_connected', [
            'id_user' => $utilisateur->getIdUser(),
            'email' => $utilisateur->getEmail(),
            'pseudo' => $utilisateur->getPseudo()
        ]);
        
        $this->addFlash('success', 'Inscription réussie ! Vous êtes connecté');
        return $this->redirectToRoute('accueil');
    }

    #[Route('/deconnexion', name: 'deconnexion')]
    public function deconnexion(Request $request): Response
    {
        $request->getSession()->remove('user_connected');
        $this->addFlash('success', 'Vous avez été déconnecté');
        return $this->redirectToRoute('accueil');
    }
}
