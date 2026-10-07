<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\ProduitRepository;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/cart')]
class CartController extends AbstractController
{
    #[Route('', name: 'app_cart')]
    public function index(SessionInterface $session, ProduitRepository $produitRepository): Response
    {
        $cart = $session->get('cart', []); // [idProduit => quantity]

        $cartItems = [];
        $total = 0;

        foreach ($cart as $idProduit => $quantity) {
            $produit = $produitRepository->find($idProduit);

            if (!$produit) {
                continue;
            }

            $itemTotal = $produit->getPrix() * $quantity;
            $total += $itemTotal;

            $cartItems[] = [
                'id' => $produit->getIdProduit(),
                'name' => $produit->getNom(),
                'price' => $produit->getPrix(),
                'quantity' => $quantity,
                'total' => $itemTotal,
            ];
        }

        return $this->render('cart/index.html.twig', [
            'cartItems' => $cartItems,
            'total' => $total,
            'title' => 'Panier',
        ]);
    }

    #[Route('/add/{id}', name: 'app_cart_add', requirements: ['id' => '\\d+'], methods: ['POST'])]
    public function add(int $id, Request $request, SessionInterface $session): Response
    {
        $cart = $session->get('cart', []);
        $quantity = max(1, (int) $request->request->get('quantity', 1));

        if (isset($cart[$id])) {
            $cart[$id] += $quantity;
        } else {
            $cart[$id] = $quantity;
        }

        $session->set('cart', $cart);

        $this->addFlash('success', 'Produit ajouté au panier');

        return $this->redirectToRoute('app_cart');
    }

    #[Route('/remove/{id}', name: 'app_cart_remove', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function remove(int $id, SessionInterface $session): Response
    {
        $cart = $session->get('cart', []);

        if (isset($cart[$id])) {
            unset($cart[$id]);
        }

        $session->set('cart', $cart);

        $this->addFlash('success', 'Produit supprimé du panier');

        return $this->redirectToRoute('app_cart');
    }

    #[Route('/clear', name: 'app_cart_clear', methods: ['POST'])]
    public function clear(SessionInterface $session): Response
    {
        $session->remove('cart');

        $this->addFlash('success', 'Panier vidé');

        return $this->redirectToRoute('app_cart');
    }

    #[Route('/checkout', name: 'app_checkout', methods: ['GET', 'POST'])]
    public function checkout(
        Request $request,
        SessionInterface $session,
        ProduitRepository $produitRepository,
        UtilisateurRepository $utilisateurRepository,
        EntityManagerInterface $entityManager
    ): Response {
        $cart = $session->get('cart', []);

        if (empty($cart)) {
            $this->addFlash('error', 'Votre panier est vide');
            return $this->redirectToRoute('app_cart');
        }

        $userSession = $request->getSession()->get('user_connected');
        if (!$userSession) {
            $this->addFlash('error', 'Vous devez être connecté pour passer une commande');
            return $this->redirectToRoute('auth');
        }

        if ($request->isMethod('POST')) {
            $acheteur = $utilisateurRepository->find($userSession['id_user'] ?? null);

            if (!$acheteur) {
                $this->addFlash('error', "Utilisateur introuvable");
                return $this->redirectToRoute('auth');
            }

            $commande = new Commande();
            $commande->setDateCommande(new \DateTime());
            $commande->setStatut('En cours');
            $commande->setAcheteur($acheteur);

            foreach ($cart as $idProduit => $quantity) {
                $produit = $produitRepository->find($idProduit);
                if (!$produit) {
                    continue;
                }

                for ($i = 0; $i < $quantity; $i++) {
                    $commande->addProduit($produit);
                }
            }

            $entityManager->persist($commande);
            $entityManager->flush();

            $session->remove('cart');

            $this->addFlash('success', 'Commande enregistrée avec succès');

            return $this->redirectToRoute('accueil');
        }

        return $this->render('cart/checkout.html.twig', [
            'title' => 'Passer la commande',
        ]);
    }
}
