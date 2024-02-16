#include<stdio.h>
int main()
{
    int val[27] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101};
    int ans[27];
    for(int i=0;i<27;i++)
    {
        scanf("%d",&ans[i]);
    }
    for(int i=0;i<27;i++)
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