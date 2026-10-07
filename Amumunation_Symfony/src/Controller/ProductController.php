<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'app_products')]
    public function index(): Response
    {
        // Données temporaires - seront remplacées par la base de données
        $products = [
            [
                'id' => 1,
                'name' => 'Munitions 9mm',
                'price' => 15.99,
                'description' => 'Munitions de qualité pour 9mm',
                'category' => 'Munitions de poing'
            ],
            [
                'id' => 2,
                'name' => 'Munitions 5.56mm',
                'price' => 25.50,
                'description' => 'Munitions pour fusil d\'assaut',
                'category' => 'Munitions de fusil'
            ],
            [
                'id' => 3,
                'name' => 'Munitions .45 ACP',
                'price' => 18.99,
                'description' => 'Munitions de grosse puissance',
                'category' => 'Munitions de poing'
            ],
        ];

        return $this->render('product/index.html.twig', [
            'products' => $products,
            'title' => 'Produits',
        ]);
    }

    #[Route('/product/{id}', name: 'app_product_show', requirements: ['id' => '\d+'])]
    public function show(int $id): Response
    {
        // Données temporaires - seront remplacées par la base de données
        $product = [
            'id' => $id,
            'name' => 'Munitions 9mm',
            'price' => 15.99,
            'description' => 'Munitions de qualité supérieure pour pistolets 9mm',
            'category' => 'Munitions de poing',
            'stock' => 250,
            'reviews' => 4.5,
        ];

        return $this->render('product/show.html.twig', [
            'product' => $product,
        ]);
    }
}
