#include<stdio.h>
int main()
{
    int val[16] = {1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,16};
    int ans[16];
    for(int i=0;i<16;i++)
    {
        scanf("%d",&ans[i]);
    }
    for(int i=0;i<16;i++)
    {
        if(ans[i] != val[i])
        {
            printf("false");
            return 0;
        }
    }
    printf("true");
    return 0;
}