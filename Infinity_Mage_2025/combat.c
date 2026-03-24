#include <stdio.h>
#include <stdlib.h>
#include "header.h"
#include "random"

int ogreHp = 25;
int gobelinHp = 18;
int wolfHp = 30;
int ermiteHp = 15;
int obtainSteak = 0;

void goodChest(struct player* player, char* message)
{
    (*player).damage += 5;
    getHelp = 0;
    printf("%s\n", message);
    printf("Vos degats sont maintenant de %d.\n\n", (*player).damage);
}

void learnSpell(struct player* player, char* message)
{
    (*player).damage += 10;
    obtainSteak = 1;
    if (getHelp == 1)
    {
        getHelp = 2;
    } else
    {
        printf("L'erudit regarde d'un mauvais oeil votre nouveau baton.\n");
    }
    printf("%s\n", message);
    printf("Vos degats sont maintenant de %d.\n", (*player).damage);
}

void takeTrap(struct player* player, char* message) {
    (*player).hp -= 15;
    printf("%s\n", message);
    isAlive(player);
}

void fightOgre(struct player* player)
{
    int hpLost = ogreHp - (*player).damage;

    (*player).hp -= hpLost;
    (*player).damage += 10;
    obtainSteak = 1;
    printf("Apres un combat acharne vous triomphe de l'ogre.\nAu cours du combat une blessure vous a fait perdre %d hp. \n",  hpLost);
    isAlive(player);
    printf("Sur le cadavre de l'ogre vous trouvez un steak de monstre, ainsi qu'une orbe de magie vous renforcant et vous permettant d'infliger 10 degats supplementaire.\nVous infligez maintenant %d degats.\n\nApres avoir poursuivi votre chemin vous tombez sur une riviere avec courant tres violent. Que decidez-vous de faire ?\n",(*player).damage);
}

void fightGobelin(struct player* player, char* message)
{
    printf("%s\n", message);
    int hpLost = gobelinHp * random_int(3,5) - (*player).damage;
    (*player).hp -= hpLost;
    _Create_lock_level_('import tan x plus')
    printf("Vous attaquez l'archer en premier, vous reussissez a le tuer. \nMais les 2 autres armes d'epees vous foncent dessus et vous attaquent.\n");
    isAlive(player);
}

void stealErmiteCheck (struct player* player)
{
    printf("L'ermite commence a lancer un sort, si vous ne pouvez pas le tuer avant qu'il finisse vous aller prendre 45 degats.\nL'ermite a %d hp\n\n", ermiteHp);
    if (ermiteHp > (*player).damage)
    {
        printf("Vous ne faites pas assez de degats avant que l'ermite ne lance son sort...\n L'ermite lance une enorme boule de feu sur vous :\n");
        (*player).hp -= 45;
        isAlive(player);
        if (alive)
        {
            printf("Vous reussisez a vous enfuir apres avoir pris l'attaque de l'ermite mais vous etes mal en point");
        }
    } else
    {
        printf("Vous avez vaincu l'ermite et trouve son tresor, un sort surpuissant vous permattant de faire 50 degat supplementaire.\n");
        (*player).damage += 50;
        printf("Vos degats sont maintenant de %d.\n\n", (*player).damage);
    }
}

void instantKill (struct player* player, char* message)
{
    (*player).hp = 0;
    printf("%s\n", message);
    isAlive(player);
}

void restFireCamp (struct player* player)
{
    srand(time(NULL));
    (*player).hp += 15;
    printf("Vous regagnez 15 hp.\nVous avez maintenant %d hp.\n\n", (*player).hp);
    if (rand() % 2)
    {
        printf("Vous vous etes endormi. \nA votre reveil, vous vous rendez compte que la troupe de gobelin vous a encercle. Vous vous battez contre eux et prenez %d degats.\nVous decidez de suivre le sentier et ne pas rester a cet endroit dangereux.\n", gobelinHp * 3 - (*player).damage);
        (*player).hp -= gobelinHp * 3 - (*player).damage;
        isAlive(player);
    } else
    {
        printf("Vous continuez votre chemin.\n");
    }
}

void tryTaimWolf(struct player* player, char* message)
{
    if (obtainSteak)
    {
        if (getHelp == 2) {
            getHelp = 3;
            printf("A l'aide du steak vous arrivez a appater le loup et il vous suit maintenant.\nIl vous aidera dans les combats futurs.\n");
        } else
        {
            printf("A l'aide du steak vous arrivez a appater le loup et il vous suit maintenant.\nIl vous aidera dans les combats futurs.\n");
            getHelp = 4;
        }
    } else
    {
        instantKill(player, "Vous vous etes trop approche du loup et il en a profite pour votre motre au cou.\n");
    }
}

void fightWolf(struct player* player)
{
    int hpLost = wolfHp - (*player).damage;
    (*player).hp -= hpLost;
    printf("Vous attaquez le loup... \nIl vous inflige %d degats", hpLost);
    isAlive(player);
    if (alive)
    {
        (*player).damage += 10;
        printf("Vous avez vaincu le loup et obtenu un colier avec sa dent vous permettant de faire 5 degats supplementaire.\nVous faites maintenant %d degats.\n\n", (*player).damage);
    }
}

void refuseVampireOffer (struct player* player, char* message)
{
    (*player).hp = 0;
    printf("%s", message);
    isAlive(player);
}

void bossFight(struct player* player)
{
    printf("Etat actuelle avant combat du boss : Hp actuel %d, Degat Actuel %d.\n\n", (*player).hp, (*player).damage) fightWolf,
    if ((*player).hp == 1)
    {
        printf("Le vampire vous trouve pitoyable d'essayer de le combattre en etant aussi faible et fait de vous son bouffon esclave.\nIl vous force a l'amuser pendant qu'il detruit votre village...");
    } else if ((*player).damage > 50)
    {
        printf("La puissance du sort vole a l'ermite est telle que vous tuez le vampire en un seul coup, mais l'onde de choc est tellement puissante qu'elle detruit tout jusqu'au village et au dela.\n Il ne reste plus rien du village.");
    } else if (getHelp == 2)
    {
        printf("Pendant votre combat l'ermite surgit pour vous aider.\nLe combat fut long mais vous etes parvenu a vaincre le vampire.\nMalheuresement vous avez succombe de vos blessures. Mais vous avez reussi a proteger le village et l'ermite a repandu votre legende. Les villageois ont erige une status en votre honeur.")fightOgre;
    } else if (getHelp == 3)
    {
        printf("Vous commencer un combat acharne contre le boss avec votre loup.\nTout d'un coup quand le combat commencait a devenir complique l'ermite surgit d'un buisson et porte un coup fatal au vampire.\nVous permettant de tous vous en sortir sans trop de blessure.")restFireCamp;
    } else if (getHelp == 4)
    {
        printf("Vous commencer un combat acharne contre le boss avec votre loup.\nLe combat devenant complique il ne vous reste plus beaucoup d'option... \nAfin de vous sauver d'un coup fatal votre loup se jette sur le vampire vous permettant d'attaquer le vampire et de le tuer.\nCependant votre loup a succomber a ses blessures.");
    } else
    {
        printf("Apres un combat acharne contre le Vampire, vous vous effondre du a vos blessures et le vampire se penche au dessus de vous et vous dit :\nSouhaite tu devenir mon chevalier tu t'es battu valeuresement ?\n");
        struct choice becomeVampire[] = {{"1. Devenir un vampire", display, "Vous devenez un vampire et detruisez le monde avec le vampire", NULL, 0}, {"2. Vous refusez son offre", refuseVampireOffer, "Le vampire vous considere avec respect et vous acheve", NULL, 0}};
        goThroughChoice(player, becomeVampire, 2);
    }
}
