import java.util.Scanner;

abstract class Personnage {
    protected String nom;
    protected int pv, attaque, defense;

    public Personnage(String nom, int pv, int attaque, int defense) {
        this.nom = nom;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
    }

    public void attaquer(Personnage cible) {
        int degats = Math.max(0, this.attaque - cible.defense);
        cible.subirDommages(degats);
        System.out.println(this.nom + " attaque " + cible.nom + " et inflige " + degats + " dégâts !");
    }

    public void subirDommages(int degats) {
        this.pv -= degats;
        if (this.pv <= 0) {
            System.out.println(this.nom + " est vaincu !");
        } else {
            System.out.println(this.nom + " a encore " + this.pv + " PV.");
        }
    }
}


class Hero extends Personnage {
    private int potions;

    public Hero(String nom) {
        super(nom, 100, 20, 5);
        this.potions = 3;
    }

    public void utiliserPotion() {
        if (potions > 0) {
            this.pv += 30;
            this.potions--;
            System.out.println(nom + " utilise une potion ! PV : " + this.pv);
        } else {
            System.out.println("Plus de potions !");
        }
    }

    public void fuir() {
        System.out.println(nom + " prend la fuite !");
    }
}


class Monstre extends Personnage {
    private int niveau;

    public Monstre(String nom, int niveau) {
        super(nom, 50 + 10 * niveau, 15 + 5 * niveau, 3);
        this.niveau = niveau;
    }

    public int getNiveau() {
        return this.niveau;
    }
}


class Donjon {
    public void lancerCombat(Hero hero, Monstre monstre, Scanner scanner) {
        System.out.println("Un " + monstre.nom + " apparaît !");
        while (hero.pv > 0 && monstre.pv > 0) {
            System.out.println("\nQue voulez-vous faire ? (1: Attaquer, 2: Potion, 3: Fuir)");
            int choix = scanner.nextInt();
            switch (choix) {
                case 1:
                    hero.attaquer(monstre);
                    if (monstre.pv > 0) {
                        monstre.attaquer(hero);
                    }
                    break;
                case 2:
                    hero.utiliserPotion();
                    break;
                case 3:
                    hero.fuir();
                    return;
                default:
                    System.out.println("Choix invalide !");
            }
        }
    }
}


public class Main {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Bienvenue dans le donjon ! Quel est votre nom ?");
            String nomJoueur = scanner.nextLine();

            Hero hero = new Hero(nomJoueur);
            Donjon donjon = new Donjon();
            Monstre monstre = new Monstre("Gobelin", 1);

            donjon.lancerCombat(hero, monstre, scanner);
        }
    }
}
