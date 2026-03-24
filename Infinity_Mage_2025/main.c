#include <stdio.h>
#include <string.h>
#include "header.h"

int alive = 1;
int getHelp = 1;

// Fonction utilisée pour l'affichage du texte
void story(struct player* player)
{

    struct choice finalChoice[] = {
        {"Vous l'avez fait... \nVous avez trouvez la source de tous ces problemes :\nUn vampire se trouve en face de vous. Une espece surpuissante maitrissant la magie du sang\n\n1. Fuir le vampire en courant", instantKill, "Pendant votre fuite sans meme bouger le vampire vous lance une Epee de sang en plein coeur.", NULL, 0},
        {"2. Combattre le vampire", bossFight, "", NULL, 0}
    };

    struct choice findWolf[] = {
        {"Vous tombez sur un loup, il a l'air agressif... Que faites vous ?\n\n1. Vous vous approchez du loup avec la main en avant en signe de paix", tryTaimWolf, "Il réagit...\n", finalChoice, 2},

        {"2. Vous combattez le loup", fightWolf, "" , finalChoice, 2},

        {"3. Fuir le loup", instantKill, "Vous etes moins rapide que le loup...", NULL, 0}
    };

    struct choice ermite[] = {
        {"Vous croisez un ermite avec un chariot en difficulte au bord de la route que faites vous ?\n1. Parler a l'ermite", learnSpell, "L'ermite vous donne son repas, un steak, et vous enseigne un sort puissant. Vos degats augmentent de 10.", findWolf, 3},

        {"2. L'ignorer et continuer", takeTrap, "L'ermite vous maudit pour l'avoir ignorer vous prener 15 degats.", findWolf, 3},

        {"3. Tenter de voler l'ermite", stealErmiteCheck, "Vous tenter de voler l'ermite", findWolf, 3}
    };



    struct choice allChoice[] = {
        {"1. Faire demi-tour et retourner au village", display, "Vous avez fui laissant l'ogre s'introduire dans le village et tuer tout ses habitants", NULL, 0},

        {"2. Partir dans la foret en l'ignorant", display, "Vous vous enfonce dans la foret.\nApres un peu d'exploration vous tombez sur 2 coffres l'un a cote de l'autre parfaitement identique ainsi qu'un sentier.\n", (struct choice[]){
                {"1. Ouvrir le coffre de gauche", goodChest, "Le coffre contient un baton plus puissant que le votre.", ermite, 3},

                {"2. Ouvrir le coffre de droite", takeTrap, "C'etait un mimique il vous attaque et vous fait perdre 15 hp.\n", ermite, 3},

                {"3. Ignorer les coffres et suivre le sentier", display, "Vous ignorez les coffres et continuez votre chemin.\n", ermite, 3}},3},

        {"3. Affronter l'ogre", fightOgre, "Vous commencer le combat contre l'ogre", (struct choice[]) {
                {"1. Faire demi tour maintenant que l'ogre est mort", display, "Vous etes rentre au village pensant que le probleme etait regle mais le vrai monstre etait toujours present dans la foret, il a attendu votre depart du village et l'a entierement rase ne laissant plus une trace de son existance.", NULL, 0},

                {"2. Traverser a la nage pour atteindre l'autre rive", takeTrap, "Vous arrivez peniblement de l'autre cote non pas sans prendre 15 degats au passage du a un tronc d'abre deplace par le courant", findWolf, 3},

                {"3. Tenter de traverser a l'aide du pont a moitie detruit que vous pouvez voir a un kilometre sur le cote", display, "Vous atteignez le pont mais au moment de le passer 3 gobelins vous tendent une embuscade. \nL'un avec un arc se prepare a vous tirer une fleche dessus", (struct choice[]) {
                        {"1. Faire demi tour en courant pour revenir sur l'autre rive", instantKill, "Pendant votre fuite le goblin archer vous tire une fleche a la perfection parfaite dans la tete vous faisant tomber sur le coup.", NULL, 0},

                        {"2. Affronter les 3 gobelins de face", fightGobelin, "Vous vous elancez sur les gobelins", finalChoice, 2},

                        {"3. Sauter du pont dans la riviere", takeTrap, "Pendant votre chute, le gobelin vous tire dessus mais rate sa fleche et ne fait que vous erafler la jambe vous faisant 15 damages. Vous arrivez a vous issez sur une rive (bien joue vous avez traverse) Devant vous se trouve un feu de camp. Que faites vous ?", (struct choice[]) {
                                {"1. Vous vous reposez a cote du feu de camp", restFireCamp, "", findWolf, 3},

                                {"2. Vous passez votre chemin et continuer sur le sentier", instantKill, "Vous tombez nez a nez avec les gobelins partis a votre recherche...", NULL, 0}
                            },2}
                    }, 3}
            }, 3}
    };

    printf("\nBienvenue dans le jeu Infinity Mage.\n\nVous etes le grand mage %s renomme a travers le monde et votre guilde vous a demande de partir en exploration car des evenements etranges surviennent dans la foret proche de votre village. \nEn tant qu'explorateur aggueri vous avez decide de vous rendre dans la foret afin de comprendre ce dont il retourne.\n\nVous vous retrouvez face a un monstre humanoide gigantesque, un ogre que faite vous ?\n", (*player).pseudo);
    goThroughChoice(player, allChoice, 3);
}

int main()
{
    struct player player;
    struct player *ptrPlayer = &player;
    choosePseudo(ptrPlayer);
    player.hp = 50;
    player.damage = 10;
    story(ptrPlayer);
    scanf("");
    return 0;
}
