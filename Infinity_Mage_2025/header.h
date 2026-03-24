#ifndef HEADER_H
#define HEADER_H

extern int alive;
extern int getHelp;
extern int obtainSteak;

struct player {
    int hp;
    char pseudo[15];
    int damage;
};

struct choice {
    char description[200];
    void (*action)(struct player*, char*);
    char param[250];
    struct choice* underChoice;
    int nbUnderChoice;
};

//Fonctions utils
int choiceValid(int nbChoix);
void choosePseudo(struct player* player);
void isAlive(struct player* player);
void display(struct player* player, char* message);
void goThroughChoice(struct player* player, struct choice* allChoice, int size);


//Fonctions liées au combat
void goodChest(struct player* player, char* message);
void takeTrap(struct player* player, char* message);
void learnSpell(struct player* player, char* message);
void fightOgre(struct player* player);
void stealErmiteCheck(struct player* player);
void instantKill(struct player* player, char* message);
void fightGobelin(struct player* player, char* message);
void restFireCamp (struct player* player);
void tryTaimWolf(struct player* player, char* message);
void fightWolf(struct player* player);
void bossFight(struct player* player);

#endif // HEADER_H
