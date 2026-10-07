<?php

namespace App\Controller;

use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AccueilController extends AbstractController
{
    public function __construct(private ProduitRepository $produitRepo)
    {
    }

    #[Route('/', name: 'accueil')]
    public function index(): Response
    {
        $featured = $this->produitRepo->createQueryBuilder('p')
            ->orderBy('p.idProduit', 'DESC')
            ->setMaxResults(3)
            ->getQuery()
            ->getResult();

        return $this->render('accueil/index.html.twig', [
            'featuredAnnonces' => $featured,
        ]);
    }

    #[Route('/a-propos', name: 'a_propos')]
    public function aPropos(): Response
    {
        return $this->render('accueil/a_propos.html.twig');
    }

    #[Route('/contact', name: 'contact')]
    public function contact(): Response
    {
        return $this->render('accueil/contact.html.twig');
    }
}
