#include <stdio.h>
#include "header.h"

// Fonction utilisée pour la récupération et la validation des choix de l'utilisateur
int choiceValid(int nbChoix)
{
    int choice;
    scanf("%d", &choice);
    printf("\n");
    if (choice <= nbChoix && choice > 0)
    {
        return choice;
    } else
    {
        printf("Ce n'est pas un choix valable, choisissez a nouveau : ");
        return choiceValid(nbChoix);
    }
}

void choosePseudo(struct player* player)
{
    printf("Veuillez rentrer votre pseudo (seul les 15 premiers caracteres seront comptes) : ");
    scanf("%15s", &(*player).pseudo);
}

void display(struct player* player, char* message)
{
    printf("%s\n", message);
}

void isAlive(struct player* player)
{
    if ((*player).hp <= 0)
    {
        alive = 0;
        display(player, "Vous etes mort...\nLes forces presentes dans la foret ont profite de votre mort pour detruire le village.\n");
    } else
    {
        printf("Il vous reste %d hp.\n\n", (*player).hp);
    }
}

void goThroughChoice(struct player* player, struct choice* allChoice, int size)
{
    if (alive)
    {
        for (int i = 0; i < size; i++)
        {
            printf("%s\n", allChoice[i].description);
        }
        struct choice selectChoice = allChoice[choiceValid(sizeof(allChoice)) -1 ];
        selectChoice.action(player, selectChoice.param);
        if (selectChoice.underChoice != NULL)
        {
            goThroughChoice(player, selectChoice.underChoice, selectChoice.nbUnderChoice);
        }
    }
}
