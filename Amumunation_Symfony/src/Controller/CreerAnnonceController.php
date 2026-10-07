<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Entity\Utilisateur;
use App\Repository\CategorieRepository;
use App\Repository\UtilisateurRepository;
use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CreerAnnonceController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UtilisateurRepository $utilisateurRepo,
        private CategorieRepository $categorieRepo,
        private ProduitRepository $produitRepo
    ) {}

    #[Route('/creer-annonce', name: 'creer_annonce')]
    public function creer(Request $request): Response
    {
        $userSession = $request->getSession()->get('user_connected');
        if (!$userSession) {
            $this->addFlash('error', 'Vous devez être connecté pour créer une annonce');
            return $this->redirectToRoute('auth');
        }
        
        $utilisateur = $this->utilisateurRepo->find($userSession['id_user']);
        if (!$utilisateur) {
            $this->addFlash('error', 'Utilisateur non trouvé');
            return $this->redirectToRoute('auth');
        }
        
        if ($request->isMethod('POST')) {
            $nom = $request->request->get('nom');
            $description = $request->request->get('description');
            $prix = (float)$request->request->get('prix');
            $rarete = $request->request->get('rarete');
            $idCat = (int)$request->request->get('id_cat');
            $files = $request->files->get('image');
            
            $imageNom = null;
            if ($files) {
                $ext = $files->guessExtension();
                
                if (!in_array($ext, ['jpg', 'jpeg', 'png'])) {
                    $this->addFlash('error', 'Format d\'image non accepté. Utilisez JPG ou PNG');
                    return $this->redirectToRoute('creer_annonce');
                }
                
                $imageNom = uniqid() . '.' . $ext;
                $files->move($this->getParameter('kernel.project_dir') . '/public/img_armes', $imageNom);
            }
            
            $categorie = $this->categorieRepo->find($idCat);
            if (!$categorie) {
                $this->addFlash('error', 'Catégorie invalide');
                return $this->redirectToRoute('creer_annonce');
            }
            
            $maxId = $this->em->createQuery('SELECT MAX(p.idProduit) FROM App\Entity\Produit p')->getSingleScalarResult();
            
            $produit = new Produit();
            $produit->setIdProduit(($maxId ?? 0) + 1);
            $produit->setNom($nom);
            $produit->setDescription($description);
            $produit->setPrix($prix);
            $produit->setRarete($rarete);
            $produit->setCategorie($categorie);
            $produit->setVendeur($utilisateur);
            if ($imageNom !== null) {
                $produit->setImage($imageNom);
            }
            
            $this->em->persist($produit);
            $this->em->flush();
            
            $this->addFlash('success', 'Annonce créée avec succès !');
            return $this->redirectToRoute('annonces');
        }
        
        $categories = $this->categorieRepo->findAll();
        
        return $this->render('creer_annonce/index.html.twig', [
            'categories' => $categories
        ]);
    }
}
