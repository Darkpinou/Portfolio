<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
#[ORM\Table(name: 'utilisateurs')]
class Utilisateur
{
    #[ORM\Id]
    #[ORM\Column(name: 'id_user')]
    private ?int $idUser = null;

    #[ORM\Column(length: 80)]
    private ?string $email = null;

    #[ORM\Column(length: 50)]
    private ?string $pseudo = null;

    #[ORM\Column(name: 'mot_de_passe', length: 255)]
    private ?string $motDePasse = null;

    #[ORM\OneToMany(mappedBy: 'vendeur', targetEntity: Produit::class)]
    private Collection $produitsVendus;

    #[ORM\OneToMany(mappedBy: 'acheteur', targetEntity: Commande::class)]
    private Collection $commandes;

    public function __construct()
    {
        $this->produitsVendus = new ArrayCollection();
        $this->commandes = new ArrayCollection();
    }

    public function getIdUser(): ?int
    {
        return $this->idUser;
    }

    public function setIdUser(int $idUser): static
    {
        $this->idUser = $idUser;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): static
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->motDePasse;
    }

    public function setMotDePasse(string $motDePasse): static
    {
        $this->motDePasse = $motDePasse;

        return $this;
    }

    public function getProduitsVendus(): Collection
    {
        return $this->produitsVendus;
    }

    public function addProduitVendu(Produit $produit): static
    {
        if (!$this->produitsVendus->contains($produit)) {
            $this->produitsVendus->add($produit);
            $produit->setVendeur($this);
        }

        return $this;
    }

    public function removeProduitVendu(Produit $produit): static
    {
        if ($this->produitsVendus->removeElement($produit)) {
            if ($produit->getVendeur() === $this) {
                $produit->setVendeur(null);
            }
        }

        return $this;
    }

    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commande $commande): static
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes->add($commande);
            $commande->setAcheteur($this);
        }

        return $this;
    }

    public function removeCommande(Commande $commande): static
    {
        if ($this->commandes->removeElement($commande)) {
            if ($commande->getAcheteur() === $this) {
                $commande->setAcheteur(null);
            }
        }

        return $this;
    }
}
