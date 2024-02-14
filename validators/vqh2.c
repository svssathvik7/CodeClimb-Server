#include<stdio.h>
int main()
{
    int val[20] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181};
    int ans[20];
    for(int i=0;i<20;i++)
    {
        scanf("%d",&ans[i]);
    }
    for(int i=0;i<20;i++)
    {
        if(ans[i] != val[i])
        {
            printf("false");
            break;
        }
    }
    printf("true");
    return 0;
}