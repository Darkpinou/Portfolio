<?php

namespace App\Controller;

use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AnnoncesController extends AbstractController
{
    #[Route('/annonces', name: 'annonces')]
    public function index(ProduitRepository $produitRepo): Response
    {
        $annonces = $produitRepo->findAll();
        
        return $this->render('annonces/index.html.twig', [
            'annonces' => $annonces,
        ]);
    }

    #[Route('/annonce/{idProduit}', name: 'detail_annonce', requirements: ['idProduit' => '\d+'])]
    public function detail(int $idProduit, ProduitRepository $produitRepo): Response
    {
        $annonce = $produitRepo->find($idProduit);
        
        if (!$annonce) {
            throw $this->createNotFoundException('Annonce non trouvée');
        }
        
        return $this->render('annonces/detail.html.twig', [
            'annonce' => $annonce,
        ]);
    }
}
